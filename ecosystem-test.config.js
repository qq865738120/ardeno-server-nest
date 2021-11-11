module.exports = {
  apps: [
    {
      name: 'ardeno-server-test',
      cwd: './',
      script: 'yarn',
      args: 'start:prod',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/app.error.log',
      out_file: './logs/app.out.log',
      instances: 1,
      min_uptime: '120s',
      max_restarts: 10,
      cron_restart: '1 0 * * *',
      merge_logs: true,
      exec_interpreter: 'node',
      exec_mode: 'fork',
      autorestart: true,
      vizion: false,
      restart_delay: 60,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],

  deploy: {
    development: {
      user: 'root',
      host: 'frp.ddnszwj.top',
      port: '6004',
      ref: 'origin/develop',
      repo: 'git@github.com:qq865738120/ardeno-server-nest.git',
      path: '/root/projects/ardeno/server/development',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      'pre-deploy': 'git pull',
      'post-deploy':
        'npm install && yarn build && pm2 startOrGracefulReload ecosystem-test.config.js',
    },
  },
};
