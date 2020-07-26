const routes = require('next-routes');

const myRoutes = routes()
  .add('/', '/')
  .add('/redirect', 'redirect')
  .add('/about', 'about')
  .add('/terms', 'terms')
  .add('/privacy-policy', 'privacy-policy')
  .add('/login', 'signin')
  .add('/signup', 'signup')
  .add('/resetpassword', 'resetpassword')
  .add('/author/:id', 'author')
  .add('/account/:pageType(contributes|favorites|notification)?', 'account')
  .add('/topics/:pageType', 'topics')
  .add('/search/:pageType(topics)?', 'search');

module.exports = myRoutes;
