#!/bin/bash
# Routine redeploy for alayay.com (Alayay Maintenance)
#
# Usage:
#   bash deploy/deploy.sh           # build locally, rsync, restart PM2
#   bash deploy/deploy.sh --init    # first-time setup (nginx vhost, SSL, PM2 start)
#   bash deploy/deploy.sh --no-build
#
# Auth:
#   Prefers SSH key. If no key is set up, export SSHPASS=... and install sshpass
#   (`brew install sshpass`); the script will detect it and use it.

set -euo pipefail

# ---- Config -----------------------------------------------------------------
SERVER_USER=root
SERVER_IP=72.61.177.109
SERVER_PATH=/var/www/trasealla/alayay
PM2_APP=alayay
PM2_CMS_APP=alayay-cms
DOMAIN=alayay.com
CMS_DOMAIN=cms.alayay.com
LOCAL_PATH="$(cd "$(dirname "$0")/.." && pwd)"
SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"

if [ -n "${SSHPASS:-}" ] && command -v sshpass >/dev/null 2>&1; then
  SSH="sshpass -e ssh $SSH_OPTS $SERVER_USER@$SERVER_IP"
  SCP="sshpass -e scp $SSH_OPTS"
  RSYNC_RSH="sshpass -e ssh $SSH_OPTS"
else
  SSH="ssh $SSH_OPTS $SERVER_USER@$SERVER_IP"
  SCP="scp $SSH_OPTS"
  RSYNC_RSH="ssh $SSH_OPTS"
fi

# ---- Args -------------------------------------------------------------------
DO_INIT=false
DO_BUILD=true
for arg in "$@"; do
  case "$arg" in
    --init)     DO_INIT=true ;;
    --no-build) DO_BUILD=false ;;
    -h|--help)  sed -n '2,12p' "$0"; exit 0 ;;
    *) echo "Unknown arg: $arg" >&2; exit 1 ;;
  esac
done

cd "$LOCAL_PATH"

# ---- 1. Build locally -------------------------------------------------------
if [ "$DO_BUILD" = true ]; then
  echo "==> [1/4] Building Next.js + CMS admin UI locally"
  if [ ! -d node_modules ]; then
    echo "   installing deps (node_modules missing)"
    npm install --no-audit --no-fund
  fi
  rm -rf .next
  NEXT_PUBLIC_SITE_URL="https://${DOMAIN}" NEXT_PUBLIC_CMS_URL="https://${CMS_DOMAIN}" npm run build

  # CMS admin UI -> cms/dist (Express serves this in production)
  echo "   building CMS admin UI"
  ( cd cms
    [ -d node_modules ] || npm install --no-audit --no-fund
    rm -rf dist
    npm run build
  )
else
  echo "==> [1/4] Skipping build (--no-build)"
  [ -f .next/BUILD_ID ] || { echo "ERROR: no existing .next build to deploy"; exit 1; }
fi

# ---- 2. Ensure remote dir ---------------------------------------------------
echo "==> [2/4] Ensuring remote directory exists"
$SSH "mkdir -p $SERVER_PATH/logs"

# ---- 3. Rsync source + build -----------------------------------------------
echo "==> [3/4] Rsyncing to $SERVER_USER@$SERVER_IP:$SERVER_PATH"
# NOTE: --delete is destructive. cms/content (client's edited content + password
# hash) and cms/public/uploads (client's uploaded images) live ONLY on the server
# and must never be synced or deleted, or every deploy would wipe the client's work.
rsync -az --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  --exclude 'logs' \
  --exclude '.env.local' \
  --exclude '.next/cache' \
  --exclude 'ana-assets' \
  --exclude 'website-assets' \
  --exclude '*.pdf' \
  --exclude '*.mp4' \
  --exclude 'cms/content' \
  --exclude 'cms/public/uploads' \
  -e "$RSYNC_RSH" \
  ./ "$SERVER_USER@$SERVER_IP:$SERVER_PATH/"

# ---- 4. Install prod deps + (init or restart) PM2 --------------------------
if [ "$DO_INIT" = true ]; then
  echo "==> [4/4] First-time init (nginx vhost, SSL, build, PM2 start)"
  $SCP "$LOCAL_PATH/deploy/setup-server.sh" "$SERVER_USER@$SERVER_IP:/tmp/setup-alayay.sh"
  $SSH "bash /tmp/setup-alayay.sh"
else
  echo "==> [4/4] Installing prod deps + restarting PM2 (site + cms)"
  $SSH "set -e
    cd $SERVER_PATH
    npm install --omit=dev --no-audit --no-fund
    mkdir -p $SERVER_PATH/cms/logs $SERVER_PATH/cms/content $SERVER_PATH/cms/public/uploads
    cd $SERVER_PATH/cms
    npm install --omit=dev --no-audit --no-fund
    cd $SERVER_PATH
    for app in $PM2_APP $PM2_CMS_APP; do
      if pm2 describe \$app >/dev/null 2>&1; then
        pm2 restart \$app --update-env
      else
        pm2 start ecosystem.config.js --only \$app
      fi
    done
    pm2 save >/dev/null
  "
fi

# ---- Verify -----------------------------------------------------------------
echo "==> Verify"
$SSH "pm2 list | grep -E 'name|$PM2_APP|$PM2_CMS_APP' || true"
echo "--- site (3013)"
$SSH "curl -sI --max-time 10 http://127.0.0.1:3013/ | head -3" || true
echo "--- cms api (3014)"
$SSH "curl -s --max-time 10 -o /dev/null -w 'HTTP %{http_code}\n' http://127.0.0.1:3014/api/public/settings" || true
echo
echo "Done. Tail logs:  ssh $SERVER_USER@$SERVER_IP 'pm2 logs $PM2_APP --lines 30 --nostream'"
echo "                  ssh $SERVER_USER@$SERVER_IP 'pm2 logs $PM2_CMS_APP --lines 30 --nostream'"
echo "Public URL:       https://${DOMAIN}"
echo "CMS admin:        https://${CMS_DOMAIN}"
