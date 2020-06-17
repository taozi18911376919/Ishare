const routes = require('next-routes');

const myRoutes = routes()
  .add('/', '/')
  .add('/signin', 'signin')
  .add('/signup', 'signup')
  .add('/author/:id', 'author')
  .add('/account/:pageType(contributes|favorites|notification)?', 'account')
  .add('/topics/:id', 'topics');

module.exports = myRoutes;
