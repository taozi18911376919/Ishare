module.exports = {
  apps: [{
    script: 'server/index.js',
    watch: '.',
  }],

  deploy: {
    production: {
      user: 'ishare',
      host: '34.210.167.235',
      ref: 'origin/master',
      repo: 'git@github.com:taozi18911376919/Ishare.git',
      path: '/www/movie/production',
      'post-deploy': 'yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
