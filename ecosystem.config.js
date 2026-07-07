// PM2 Ecosystem Configuration — Alayay Maintenance (alayay.trasealla.com)
// Sibling app on the same VPS. Port 3013 (3010=trasealla-landing, 3011=ana-gift, 3012=mohamed-fouad).
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [{
    name: 'alayay',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/trasealla/alayay',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',

    env: {
      NODE_ENV: 'production',
      PORT: 3013,
      NEXT_PUBLIC_SITE_URL: 'https://alayay.com',
    },

    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/pm2-error.log',
    out_file:   './logs/pm2-out.log',
    merge_logs: true,
  }]
};
