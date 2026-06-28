#!/bin/bash
# One-time server setup for alayay.trasealla.com (Alayay Maintenance)
# - Generates self-signed cert (Cloudflare Full mode — self-signed is fine)
# - Writes nginx vhost alayay.trasealla.com -> 127.0.0.1:3012
# - Installs prod deps, starts PM2 app `alayay`
#
# Safe to re-run. Does NOT touch other vhosts.

set -euo pipefail

APP_DIR=/var/www/trasealla/alayay
DOMAIN=alayay.trasealla.com
PORT=3012
PM2_APP=alayay
CERT_DIR=/etc/ssl/alayay
NGX_AVAIL=/etc/nginx/sites-available/alayay.trasealla.com
NGX_ENABLED=/etc/nginx/sites-enabled/alayay.trasealla.com

echo "==> 1. Generate self-signed cert"
mkdir -p "$CERT_DIR"
openssl req -x509 -nodes -newkey rsa:2048 -days 825 \
  -keyout "$CERT_DIR/self.key" \
  -out    "$CERT_DIR/self.crt" \
  -subj "/CN=${DOMAIN}" \
  -addext "subjectAltName=DNS:${DOMAIN}"
chmod 600 "$CERT_DIR/self.key"
echo "   wrote $CERT_DIR/self.crt"

echo "==> 2. Write nginx vhost"
cat > "$NGX_AVAIL" <<NGINX
# Alayay Maintenance (Next.js on 127.0.0.1:${PORT})
# Domain: alayay.trasealla.com
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

    ssl_certificate     ${CERT_DIR}/self.crt;
    ssl_certificate_key ${CERT_DIR}/self.key;
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

ln -sf "$NGX_AVAIL" "$NGX_ENABLED"
nginx -t
systemctl reload nginx
echo "   nginx vhost installed & reloaded"

echo "==> 3. Install production deps"
cd "$APP_DIR"
npm install --omit=dev --no-audit --no-fund

echo "==> 4. Build Next.js"
NEXT_PUBLIC_SITE_URL="https://${DOMAIN}" npm run build

echo "==> 5. Start / restart PM2"
mkdir -p "$APP_DIR/logs"
if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
  pm2 restart "$PM2_APP" --update-env
else
  pm2 start ecosystem.config.js
fi
pm2 save

echo "==> Done. Check: pm2 logs $PM2_APP --nostream"
