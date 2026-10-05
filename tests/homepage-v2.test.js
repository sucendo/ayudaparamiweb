const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

test('la portada ofrece accesos claros a las cuatro secciones principales', () => {
  const page = fs.readFileSync(path.join(__dirname, '..', 'views', 'pages', 'index.ejs'), 'utf8');

  assert.match(page, /Aprender, resolver y experimentar con la web/);
  assert.match(page, /href="\/articulos"/);
  assert.match(page, /href="\/tutoriales"/);
  assert.match(page, /href="\/herramientas"/);
  assert.match(page, /href="\/laboratorio"/);
  assert.match(page, /Últimas publicaciones/);
});
