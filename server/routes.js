const routes = require('next-routes');

const myRoutes = routes()
  .add('/', '/')
  .add('/author/:id', 'author')
  .add('/account/:pageType(contributes|favorites|notification)?', 'account')
  .add('/topics/:id', 'topics');

module.exports = myRoutes;
