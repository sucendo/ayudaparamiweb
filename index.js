var opbeat = require('opbeat').start();

var express = require('express');
var path = require('path');
var routeCatalog = require('./routes');
var contentCatalog = require('./content');
var contentLoader = require('./lib/content/loader');
var routes = routeCatalog.publishedRoutes || routeCatalog;
var seoAnalyzeHandler = require('./services/seo/seo-analyze-handler');
var siteData = require('./lib/site-data');
var app = express();

var appMode = process.env.APP_MODE || 'node';
app.set('port', (process.env.PORT || 5000));

function normalizeSearchableText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function searchContent(contentItems, query) {
  var normalizedQuery = normalizeSearchableText(query).trim();
  if (!normalizedQuery) return [];

  return contentItems.filter(function(item) {
    var haystack = [
      item.title,
      item.excerpt,
      item.path,
      item.category,
      (item.tags || []).join(' ')
    ].map(normalizeSearchableText).join(' ');

    return haystack.indexOf(normalizedQuery) !== -1;
  });
}

function resolvePageContext(route, allContent) {
  var topArticles = siteData.loadTopArticles();
  var friendLinks = siteData.loadFriendLinks();
  var topRatedArticles = siteData.loadTopRatedArticles(5);
  if (route.contentType && route.contentSlug) {
    return {
      metadata: contentLoader.loadByType(route.contentType, route.contentSlug),
      contentItems: [],
      categories: contentCatalog.CATEGORY_DEFINITIONS,
      query: '',
      results: [],
      topArticles: topArticles,
      friendLinks: friendLinks,
      topRatedArticles: topRatedArticles
    };
  }

  var categories = contentCatalog.CATEGORY_DEFINITIONS;
  var articles = contentCatalog.filterByCategory(allContent, 'guias').concat(contentCatalog.filterByCategory(allContent, 'analisis'));
  var sectionByPath = {
    '/': allContent,
    '/guias': articles,
    '/tutoriales': contentCatalog.filterByCategory(allContent, 'tutoriales'),
    '/herramientas': contentCatalog.filterByCategory(allContent, 'herramientas'),
    '/laboratorio': contentCatalog.filterByCategory(allContent, 'laboratorio'),
    '/articulos': articles,
    '/experimentos': contentCatalog.filterByCategory(allContent, 'laboratorio'),
    '/tags': allContent,
    '/sucender': allContent
  };

  return {
    contentItems: sectionByPath[route.path] || [],
    categories: categories,
    query: '',
    results: [],
    topArticles: topArticles,
    friendLinks: friendLinks,
    topRatedArticles: topRatedArticles
  };
}

async function bootstrap() {
  var allContent = await contentCatalog.buildCatalog();

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
    var query = (request.query.q || request.query.s || '').trim();
    var results = searchContent(allContent, query);

    response.render('pages/search', {
      query: query,
      results: results,
      contentItems: [],
      categories: contentCatalog.CATEGORY_DEFINITIONS,
      topArticles: siteData.loadTopArticles(),
      friendLinks: siteData.loadFriendLinks(),
      topRatedArticles: siteData.loadTopRatedArticles(5)
    });
  });

  routes.forEach(function(route) {
    app.get(route.path, function(request, response) {
      if (route.path === '/' && typeof request.query.s === 'string' && request.query.s.trim()) {
        response.redirect('/buscar?s=' + encodeURIComponent(request.query.s.trim()));
        return;
      }

      response.render(route.view, resolvePageContext(route, allContent));
    });
  });

  app.use(function(request, response) {
    response.status(404).render('pages/404', {
      contentItems: [],
      categories: contentCatalog.CATEGORY_DEFINITIONS,
      topArticles: siteData.loadTopArticles(),
      friendLinks: siteData.loadFriendLinks(),
      topRatedArticles: siteData.loadTopRatedArticles(5)
    });
  });

  app.listen(app.get('port'), function() {
    console.log('Node mode running on port', app.get('port'));
  });
}

bootstrap();
