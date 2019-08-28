const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/v1', { target: 'http://localhost:8011' }));
  // app.use(proxy('/api', { target: 'http://localhost:8080' }));
  app.use(proxy('/triple', { target: 'http://localhost:4000' }));
};