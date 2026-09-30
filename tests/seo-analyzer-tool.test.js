const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

test('el analizador SEO conserva su formulario y scripts activos', () => {
  const root = path.join(__dirname, '..');
  const layout = fs.readFileSync(path.join(root, 'views', 'layouts', 'tool.ejs'), 'utf8');
  const script = fs.readFileSync(path.join(root, 'public', 'js', 'seo-analyzer-tool.js'), 'utf8');

  [
    'seo-analyzer-form',
    'seo-url',
    'seo-load-url',
    'seo-html-source',
    'seo-state',
    'seo-report'
  ].forEach((id) => assert.match(layout, new RegExp(id)));

  assert.match(script, /DOMParser/);
  assert.match(script, /Analizar SEO on-page|analyzeHtml/);
  assert.match(script, /CORS/);
});

test('la herramienta sigue registrada como contenido gestionado', () => {
  const routes = require('../routes');
  const route = routes.find((item) => item.path === '/analizador-seo-url');

  assert.ok(route);
  assert.equal(route.view, 'content/render');
  assert.equal(route.contentType, 'tool');
  assert.equal(route.contentSlug, 'analizador-seo-url');
});
