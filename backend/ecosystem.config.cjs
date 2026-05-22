module.exports = {
  apps: [
    {
      name: 'ute-job-backend',
      script: 'src/server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      max_memory_restart: '300M',
      time: true,
    },
  ],
};
