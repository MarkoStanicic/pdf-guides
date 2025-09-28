module.exports = {
  apps: [{
    name: 'simplestepsguides',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/simplestepsguides', // Update this path to your actual deployment directory
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s',
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 8000,
    // Environment-specific configurations
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      // Add production-specific environment variables here
    },
    env_staging: {
      NODE_ENV: 'staging',
      PORT: 3001,
      // Add staging-specific environment variables here
    }
  }],

  // Deployment configuration (optional - for PM2 deploy feature)
  deploy: {
    production: {
      user: 'root', // Update with your server user
      host: 'your-server-ip', // Update with your server IP
      ref: 'origin/main', // Git branch to deploy
      repo: 'https://github.com/yourusername/simplestepsguides.git', // Update with your repo
      path: '/var/www/simplestepsguides', // Server deployment path
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}
