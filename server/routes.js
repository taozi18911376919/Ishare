const routes = require('next-routes');

const myRoutes = routes()
  .add('/', '/');

module.exports = myRoutes;
