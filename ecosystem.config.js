module.exports = {
  apps: [{
    script: 'server/index.js',
    watch: '.',
  }],

  // deploy: {
  //   production: {
  //     user: 'ishare', // Nginx服务器上的username
  //     host: '34.210.167.235', // 服务器地址
  //     ref: 'origin/master',
  //     repo: 'git@github.com:taozi18911376919/Ishare.git',
  //     path: '', // 发布到服务器指定的目录下
  //     'post-deploy': 'yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
  //   },
  // },
};
