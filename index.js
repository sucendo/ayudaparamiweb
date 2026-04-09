var opbeat = require('opbeat').start();

var express = require('express');
var path = require('path');
var routes = require('./routes');
var app = express();

var appMode = process.env.APP_MODE || 'node';
app.set('port', (process.env.PORT || 5000));

var searchableRoutes = routes
  .filter(function(route) {
    return route.path !== '/';
  })
  .map(function(route) {
    var normalizedPath = route.path.replace(/^\//, '');
    var generatedTitle = normalizedPath
      .split('-')
      .filter(Boolean)
      .map(function(part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(' ');

    return {
      path: route.path,
      title: generatedTitle || 'Inicio'
    };
  });

if (appMode === 'static') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.listen(app.get('port'), function() {
    console.log('Static mode running on port', app.get('port'));
  });
} else {
  app.use(express.static(__dirname + '/public'));
  app.use(opbeat.middleware.express());

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.get('/buscar', function(request, response) {
    var query = (request.query.q || '').trim();
    var normalizedQuery = query.toLowerCase();

    var results = normalizedQuery
      ? searchableRoutes.filter(function(route) {
          return route.title.toLowerCase().indexOf(normalizedQuery) !== -1 ||
            route.path.toLowerCase().indexOf(normalizedQuery) !== -1;
        })
      : [];

    response.render('pages/search', {
      query: query,
      results: results
    });
  });

  routes.forEach(function(route) {
    app.get(route.path, function(request, response) {
      response.render(route.view);
    });
  });

  app.listen(app.get('port'), function() {
    console.log('Node mode running on port', app.get('port'));
  });
}
