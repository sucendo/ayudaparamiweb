const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const routes = require('../routes');

test('el buscador usa el footer normal y no carga el antiguo bloque social', () => {
  const search = fs.readFileSync(path.join(__dirname, '..', 'views', 'pages', 'search.ejs'), 'utf8');

  assert.match(search, /<footer class="ct-footer">/);
  assert.doesNotMatch(search, /partials\/shared\.ejs/);
});

test('el footer no conserva el antiguo hueco de logo por sprite', () => {
  const footer = fs.readFileSync(path.join(__dirname, '..', 'views', 'partials', 'footer.ejs'), 'utf8');

  assert.doesNotMatch(footer, /ct-items|ct-copyright/);
  assert.match(footer, /ct-footer-meta/);
  assert.match(footer, /Preferencias de cookies/);
  assert.match(footer, /\/privacidad/);
});

test('las preferencias separan analítica de publicidad', () => {
  const cookieJs = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'cookie-consent.js'), 'utf8');
  const head = fs.readFileSync(path.join(__dirname, '..', 'views', 'partials', 'head.ejs'), 'utf8');

  assert.match(cookieJs, /analytics_storage: analyticsGranted \? 'granted' : 'denied'/);
  assert.match(cookieJs, /ad_storage: 'denied'/);
  assert.match(cookieJs, /ad_user_data: 'denied'/);
  assert.match(cookieJs, /ad_personalization: 'denied'/);
  assert.match(cookieJs, /loadGoogleTagManager/);
  assert.match(cookieJs, /googletagmanager\.com\/gtm\.js/);
  assert.match(cookieJs, /if \(analyticsGranted\)/);
  assert.match(head, /GTM-PBP42JBF/);
  assert.match(head, /G-KGPLL97FCZ/);
});

test('existe una página pública de privacidad', () => {
  const route = routes.find((item) => item.path === '/privacidad');
  assert.ok(route);
  assert.equal(route.view, 'pages/privacidad');
});


test('la página de privacidad identifica GTM y GA4 como analítica opcional', () => {
  const privacy = fs.readFileSync(path.join(__dirname, '..', 'views', 'pages', 'privacidad.ejs'), 'utf8');

  assert.match(privacy, /Google Tag Manager/);
  assert.match(privacy, /Google Analytics 4/);
  assert.match(privacy, /no se carga/);
});
