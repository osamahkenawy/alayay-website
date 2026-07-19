#!/bin/bash
# One-time server setup for alayay.com (Alayay Maintenance)
# - Generates self-signed certs (Cloudflare Full mode — self-signed is fine)
# - nginx vhost alayay.com     -> 127.0.0.1:3013  (Next.js site)
# - nginx vhost cms.alayay.com -> 127.0.0.1:3014  (CMS admin + API)
# - Proxies /uploads/ on the site domain to the CMS so client-uploaded images resolve
# - Retires the old alayay.trasealla.com vhosts
# - Installs prod deps, builds site + CMS, starts PM2 apps `alayay` and `alayay-cms`
#
# Safe to re-run. Does NOT touch other apps' vhosts, and never deletes cms/content
# or cms/public/uploads (the client's content + images live there).

set -euo pipefail

APP_DIR=/var/www/trasealla/alayay
CMS_DIR="$APP_DIR/cms"
DOMAIN=alayay.com
CMS_DOMAIN=cms.alayay.com
PORT=3013
CMS_PORT=3014
PM2_APP=alayay
PM2_CMS_APP=alayay-cms
CERT_DIR=/etc/ssl/alayay

# Old subdomains this app used to serve — disabled so only alayay.com remains.
OLD_DOMAINS=(alayay.trasealla.com cms.alayay.trasealla.com)

echo "==> 1. Generate self-signed certs"
mkdir -p "$CERT_DIR"
for d in "$DOMAIN" "$CMS_DOMAIN"; do
  openssl req -x509 -nodes -newkey rsa:2048 -days 825 \
    -keyout "$CERT_DIR/${d}.key" \
    -out    "$CERT_DIR/${d}.crt" \
    -subj "/CN=${d}" \
    -addext "subjectAltName=DNS:${d}"
  chmod 600 "$CERT_DIR/${d}.key"
  echo "   wrote $CERT_DIR/${d}.crt"
done

echo "==> 2. Write nginx vhost — site"
cat > "/etc/nginx/sites-available/${DOMAIN}" <<NGINX
# Alayay Maintenance (Next.js on 127.0.0.1:${PORT})
# Cloudflare Full mode — self-signed cert is fine.

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${DOMAIN};

    ssl_certificate     ${CERT_DIR}/${DOMAIN}.crt;
    ssl_certificate_key ${CERT_DIR}/${DOMAIN}.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_conf_command Options -KTLS;

    client_max_body_size 25m;

    access_log /var/log/nginx/${DOMAIN}.access.log;
    error_log  /var/log/nginx/${DOMAIN}.error.log;

    location /_next/static/ {
        proxy_pass http://127.0.0.1:${PORT};
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Images uploaded through the CMS are stored by the CMS process and referenced
    # as /uploads/... in page content, so serve them from this domain.
    location /uploads/ {
        proxy_pass http://127.0.0.1:${CMS_PORT};
        proxy_set_header Host \$host;
        add_header Cache-Control "public, max-age=604800";
    }

    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$server_name;
        proxy_connect_timeout 90s;
        proxy_send_timeout    90s;
        proxy_read_timeout    90s;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

echo "==> 3. Write nginx vhost — CMS admin"
cat > "/etc/nginx/sites-available/${CMS_DOMAIN}" <<NGINX
# Alayay CMS — Express serving admin UI + API on 127.0.0.1:${CMS_PORT}

server {
    listen 80;
    listen [::]:80;
    server_name ${CMS_DOMAIN};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${CMS_DOMAIN};

    ssl_certificate     ${CERT_DIR}/${CMS_DOMAIN}.crt;
    ssl_certificate_key ${CERT_DIR}/${CMS_DOMAIN}.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_conf_command Options -KTLS;

    # Image uploads
    client_max_body_size 25m;

    access_log /var/log/nginx/${CMS_DOMAIN}.access.log;
    error_log  /var/log/nginx/${CMS_DOMAIN}.error.log;

    location / {
        proxy_pass http://127.0.0.1:${CMS_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 90s;
        proxy_send_timeout    90s;
        proxy_read_timeout    90s;
    }
}
NGINX

ln -sf "/etc/nginx/sites-available/${DOMAIN}"     "/etc/nginx/sites-enabled/${DOMAIN}"
ln -sf "/etc/nginx/sites-available/${CMS_DOMAIN}" "/etc/nginx/sites-enabled/${CMS_DOMAIN}"

echo "==> 3b. Retire old alayay.trasealla.com vhosts"
for old in "${OLD_DOMAINS[@]}"; do
  if [ -e "/etc/nginx/sites-enabled/${old}" ]; then
    rm -f "/etc/nginx/sites-enabled/${old}"
    echo "   disabled ${old}"
  fi
  # Keep the sites-available copy around as a backup rather than deleting outright.
  if [ -f "/etc/nginx/sites-available/${old}" ]; then
    mv -f "/etc/nginx/sites-available/${old}" "/etc/nginx/sites-available/${old}.retired"
    echo "   archived /etc/nginx/sites-available/${old}.retired"
  fi
done

nginx -t
systemctl reload nginx
echo "   nginx vhosts installed & reloaded"

echo "==> 4. Install production deps (site + cms)"
cd "$APP_DIR"
npm install --omit=dev --no-audit --no-fund
mkdir -p "$CMS_DIR/logs" "$CMS_DIR/content" "$CMS_DIR/public/uploads"
cd "$CMS_DIR"
npm install --omit=dev --no-audit --no-fund

echo "==> 5. Build Next.js"
cd "$APP_DIR"
NEXT_PUBLIC_SITE_URL="https://${DOMAIN}" NEXT_PUBLIC_CMS_URL="https://${CMS_DOMAIN}" npm run build

# The CMS admin UI (cms/dist) is built locally by deploy.sh and rsynced up. If it
# is missing, build it here — needs devDependencies, so install them first.
if [ ! -f "$CMS_DIR/dist/index.html" ]; then
  echo "==> 5b. Building CMS admin UI on server (cms/dist missing)"
  cd "$CMS_DIR"
  npm install --no-audit --no-fund
  npm run build
  cd "$APP_DIR"
fi

echo "==> 6. Start / restart PM2"
mkdir -p "$APP_DIR/logs"
cd "$APP_DIR"
for app in "$PM2_APP" "$PM2_CMS_APP"; do
  if pm2 describe "$app" >/dev/null 2>&1; then
    pm2 restart "$app" --update-env
  else
    pm2 start ecosystem.config.js --only "$app"
  fi
done
pm2 save

echo "==> Done."
echo "    Site: https://${DOMAIN}   (pm2 logs ${PM2_APP} --nostream)"
echo "    CMS:  https://${CMS_DOMAIN}  (pm2 logs ${PM2_CMS_APP} --nostream)"
echo
echo "    Remember: point DNS A records for ${DOMAIN} and ${CMS_DOMAIN} at this server,"
echo "    and export CMS_JWT_SECRET before the first pm2 start (see deploy/README-CMS.md)."
