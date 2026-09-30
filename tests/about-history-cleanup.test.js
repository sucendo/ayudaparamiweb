const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const routes = require('../routes');

test('Historia ha sido retirada y Acerca de está publicada', () => {
  const paths = routes.map((route) => route.path);

  assert.ok(!paths.includes('/historia'));
  assert.ok(paths.includes('/acerca-de'));

  const footer = fs.readFileSync(path.join(__dirname, '..', 'views', 'partials', 'footer.ejs'), 'utf8');
  assert.doesNotMatch(footer, /\/historia/i);
  assert.match(footer, /\/acerca-de/);
  assert.match(footer, />Acerca de</);
});
