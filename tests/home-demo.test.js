const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const routes = require('../routes');

test('la demo de home es una ruta aislada y no indexable', () => {
  const demo = routes.find((route) => route.path === '/home-demo');
  assert.ok(demo);
  assert.equal(demo.view, 'pages/home-demo');
  assert.equal(demo.catalog, false);
  assert.equal(demo.sitemap, false);

  const html = fs.readFileSync(path.join(__dirname, '..', 'views', 'pages', 'home-demo.ejs'), 'utf8');
  assert.match(html, /noindex,nofollow/);
  assert.match(html, /Aprende, construye y mejora tu web con criterio/);
  assert.match(html, /Herramientas propias/);
  assert.match(html, /Laboratorio/);
});

test('la demo no sustituye la vista actual de la portada', () => {
  const home = routes.find((route) => route.path === '/');
  assert.ok(home);
  assert.equal(home.view, 'pages/index');
});
