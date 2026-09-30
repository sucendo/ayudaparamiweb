const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const routeCatalog = require('../routes');

test('cada Markdown de content/articles tiene una ruta automática', () => {
  const articlesDir = path.join(__dirname, '..', 'content', 'articles');
  const slugs = fs.readdirSync(articlesDir)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''))
    .sort();

  const articleRoutes = routeCatalog
    .filter((route) => route.contentType === 'article')
    .map((route) => route.contentSlug)
    .sort();

  assert.deepEqual(articleRoutes, slugs);
});

test('las rutas publicadas no contienen paths duplicados', () => {
  const paths = routeCatalog.map((route) => route.path);
  assert.equal(new Set(paths).size, paths.length);
});

test('un artículo nuevo no necesita editar routes.js manualmente', () => {
  const routes = routeCatalog.getArticleRoutes();
  const september = routes.find((route) => route.contentSlug === 'busqueda-multimodal-seo-visual-google-lens');

  assert.ok(september);
  assert.equal(september.path, '/busqueda-multimodal-seo-visual-google-lens');
  assert.equal(september.view, 'content/render');
});
