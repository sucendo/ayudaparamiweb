var opbeat = require('opbeat').start();

var express = require('express');
var path = require('path');
var routeCatalog = require('./routes');
var contentCatalog = require('./content');
var routes = routeCatalog.publishedRoutes || routeCatalog;
var seoAnalyzeHandler = require('./services/seo/seo-analyze-handler');
var app = express();

var appMode = process.env.APP_MODE || 'node';
app.set('port', (process.env.PORT || 5000));

function buildSearchableRoutes(contentItems) {
  var itemTitlesByPath = contentItems.reduce(function(acc, item) {
    acc[item.path] = item.title;
    return acc;
  }, {});

  return routes
    .filter(function(route) {
      return route.path !== '/' && route.path !== '/404';
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
        title: itemTitlesByPath[route.path] || generatedTitle || 'Inicio'
      };
    });
}

function resolvePageContext(route, allContent) {
  var categories = contentCatalog.CATEGORY_DEFINITIONS;
  var sectionByPath = {
    '/': allContent,
    '/guias': contentCatalog.filterByCategory(allContent, 'guias'),
    '/tutoriales': contentCatalog.filterByCategory(allContent, 'tutoriales'),
    '/herramientas': contentCatalog.filterByCategory(allContent, 'herramientas'),
    '/laboratorio': contentCatalog.filterByCategory(allContent, 'laboratorio'),
    '/analisis': contentCatalog.filterByCategory(allContent, 'analisis'),
    '/articulos': contentCatalog.filterByCategory(allContent, 'guias'),
    '/experimentos': contentCatalog.filterByCategory(allContent, 'laboratorio'),
    '/tags': allContent,
    '/sucender': allContent
  };

  return {
    contentItems: sectionByPath[route.path] || [],
    categories: categories
  };
}

async function bootstrap() {
  var allContent = await contentCatalog.buildCatalog();
  var searchableRoutes = buildSearchableRoutes(allContent);

  if (appMode === 'static') {
    app.use(express.static(path.join(__dirname, 'dist')));

    app.listen(app.get('port'), function() {
      console.log('Static mode running on port', app.get('port'));
    });
    return;
  }

  app.use(express.static(__dirname + '/public'));
  app.use(opbeat.middleware.express());

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.get('/api/seo-analyze', seoAnalyzeHandler.handleSeoAnalyzeRequest);
  app.get('/api/content-index', function(request, response) {
    response.json(allContent);
  });

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
      response.render(route.view, resolvePageContext(route, allContent));
    });
  });

  app.use(function(request, response) {
    response.status(404).render('pages/404', {
      contentItems: [],
      categories: contentCatalog.CATEGORY_DEFINITIONS
    });
  });

  app.listen(app.get('port'), function() {
    console.log('Node mode running on port', app.get('port'));
  });
}

bootstrap();
