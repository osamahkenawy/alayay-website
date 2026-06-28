#!/bin/bash
# Routine redeploy for alayay.trasealla.com (Alayay Maintenance)
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
DOMAIN=alayay.trasealla.com
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
  echo "==> [1/4] Building Next.js locally"
  if [ ! -d node_modules ]; then
    echo "   installing deps (node_modules missing)"
    npm install --no-audit --no-fund
  fi
  rm -rf .next
  NEXT_PUBLIC_SITE_URL="https://${DOMAIN}" npm run build
else
  echo "==> [1/4] Skipping build (--no-build)"
  [ -f .next/BUILD_ID ] || { echo "ERROR: no existing .next build to deploy"; exit 1; }
fi

# ---- 2. Ensure remote dir ---------------------------------------------------
echo "==> [2/4] Ensuring remote directory exists"
$SSH "mkdir -p $SERVER_PATH/logs"

# ---- 3. Rsync source + build -----------------------------------------------
echo "==> [3/4] Rsyncing to $SERVER_USER@$SERVER_IP:$SERVER_PATH"
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
  -e "$RSYNC_RSH" \
  ./ "$SERVER_USER@$SERVER_IP:$SERVER_PATH/"

# ---- 4. Install prod deps + (init or restart) PM2 --------------------------
if [ "$DO_INIT" = true ]; then
  echo "==> [4/4] First-time init (nginx vhost, SSL, build, PM2 start)"
  $SCP "$LOCAL_PATH/deploy/setup-server.sh" "$SERVER_USER@$SERVER_IP:/tmp/setup-alayay.sh"
  $SSH "bash /tmp/setup-alayay.sh"
else
  echo "==> [4/4] Installing prod deps + restarting PM2"
  $SSH "set -e
    cd $SERVER_PATH
    npm install --omit=dev --no-audit --no-fund
    if pm2 describe $PM2_APP >/dev/null 2>&1; then
      pm2 restart $PM2_APP --update-env
    else
      pm2 start ecosystem.config.js
    fi
    pm2 save >/dev/null
  "
fi

# ---- Verify -----------------------------------------------------------------
echo "==> Verify"
$SSH "pm2 list | grep -E 'name|$PM2_APP' || true"
echo "---"
$SSH "curl -sI --max-time 10 http://127.0.0.1:3013/ | head -5" || true
echo
echo "Done. Tail logs:  ssh $SERVER_USER@$SERVER_IP 'pm2 logs $PM2_APP --lines 30 --nostream'"
echo "Public URL:       https://${DOMAIN}"
