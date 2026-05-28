// PM2 Ecosystem Configuration — ANA Candles (ana.trasealla.com)
// Sibling app to `trasealla-landing` on the same VPS; uses a distinct port.
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [{
    name: 'ana-gift',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/trasealla/ana-gift',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',

    env: {
      NODE_ENV: 'production',
      // Port 3011 — 3010 is used by trasealla-landing, 3000 by traseallo-landing
      PORT: 3011,
      // Primary branded domain; ana.trasealla.com still works as alias.
      NEXT_PUBLIC_SITE_URL: 'https://anagift.ae',
    },

    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    merge_logs: true,
  }]
};
