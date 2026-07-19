// PM2 Ecosystem Configuration — Alayay Maintenance (alayay.com)
// Sibling app on the same VPS. Port 3013 (3010=trasealla-landing, 3011=ana-gift, 3012=mohamed-fouad).
// The CMS runs as a second app on 3014 — one Express process serving both the
// admin UI (built to cms/dist) and the /api endpoints the site reads.
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
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
        // Where the site reads CMS content from, over loopback.
        CMS_URL: 'http://127.0.0.1:3014',
      },

      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/pm2-error.log',
      out_file:   './logs/pm2-out.log',
      merge_logs: true,
    },
    {
      name: 'alayay-cms',
      script: 'server/index.js',
      cwd: '/var/www/trasealla/alayay/cms',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',

      env: {
        NODE_ENV: 'production',
        CMS_PORT: 3014,
        // Export these in the server shell before `pm2 start` — see deploy/README-CMS.md.
        // ADMIN_PASSWORD_HASH only seeds the initial password; once the client changes
        // it in the UI it persists to cms/content/_auth.json and takes precedence.
        JWT_SECRET: process.env.CMS_JWT_SECRET || 'CHANGE_ME_IN_PRODUCTION',
        ADMIN_PASSWORD_HASH: process.env.CMS_ADMIN_PASSWORD_HASH || '',
      },

      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/pm2-error.log',
      out_file:   './logs/pm2-out.log',
      merge_logs: true,
    },
  ],
};
