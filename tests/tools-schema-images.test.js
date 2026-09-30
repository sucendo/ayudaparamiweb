const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const routes = require('../routes');

test('el generador Schema.org está publicado como herramienta gestionada', () => {
  const route = routes.find((item) => item.path === '/generador-schema-org');
  assert.ok(route);
  assert.equal(route.view, 'content/render');
  assert.equal(route.contentType, 'tool');
  assert.equal(route.contentSlug, 'generador-schema-org');
});

test('las fechas históricas de las herramientas no muestran modificación', () => {
  const analyzer = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'tools', 'analizador-seo-url.json'), 'utf8'));
  const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'tools', 'generador-schema-org.json'), 'utf8'));

  assert.equal(analyzer.publishedDate, '2021-09-15');
  assert.equal(Object.prototype.hasOwnProperty.call(analyzer, 'modifiedDate'), false);
  assert.equal(schema.publishedDate, '2022-06-15');
  assert.equal(Object.prototype.hasOwnProperty.call(schema, 'modifiedDate'), false);
});

test('la sección Herramientas no muestra imágenes dentro de las tarjetas', () => {
  const grid = fs.readFileSync(path.join(__dirname, '..', 'views', 'partials', 'content-grid.ejs'), 'utf8');
  assert.doesNotMatch(grid, /ct-tool-card-image/);
});

test('las cuatro herramientas usan imágenes nuevas de la carpeta tools', () => {
  const binary = fs.readFileSync(path.join(__dirname, '..', 'views', 'tools', '0001-conversor-binario.ejs'), 'utf8');
  const counter = fs.readFileSync(path.join(__dirname, '..', 'views', 'tools', '0002-contador-caracteres-seo.ejs'), 'utf8');
  const analyzer = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'tools', 'analizador-seo-url.json'), 'utf8'));
  const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'tools', 'generador-schema-org.json'), 'utf8'));

  assert.match(binary, /\/img\/tools\/conversor-binario\.svg/);
  assert.match(counter, /\/img\/tools\/contador-caracteres-seo\.svg/);
  assert.equal(analyzer.featuredImage, '/img/tools/seo-analyzer-hero.svg');
  assert.equal(schema.featuredImage, '/img/tools/generador-schema-org.svg');
});


test('los colores ct coinciden con la paleta dominante de cada herramienta', async () => {
  const binary = fs.readFileSync(path.join(__dirname, '..', 'views', 'tools', '0001-conversor-binario.ejs'), 'utf8');
  const counter = fs.readFileSync(path.join(__dirname, '..', 'views', 'tools', '0002-contador-caracteres-seo.ejs'), 'utf8');
  const analyzer = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'tools', 'analizador-seo-url.json'), 'utf8'));
  const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'tools', 'generador-schema-org.json'), 'utf8'));

  assert.match(binary, /tool-v2-card ct-green/);
  assert.match(counter, /tool-v2-card ct-purple/);
  assert.equal(analyzer.toolToneClass, 'ct-blue');
  assert.equal(analyzer.themeColor, '#1678f2');
  assert.equal(schema.toolToneClass, 'ct-orange');
  assert.equal(schema.themeColor, '#ee9e2d');

  const catalog = await require('../content').buildCatalog();
  const bySlug = Object.fromEntries(catalog.map((item) => [item.slug, item]));

  assert.equal(bySlug['conversor-binario'].colorClass, 'ct-green');
  assert.equal(bySlug['contador-caracteres-seo'].colorClass, 'ct-purple');
  assert.equal(bySlug['analizador-seo-url'].colorClass, 'ct-blue');
  assert.equal(bySlug['generador-schema-org'].colorClass, 'ct-orange');
});


test('el previsualizador SERP está publicado y funciona como herramienta local', () => {
  const route = routes.find((item) => item.path === '/previsualizador-serp-google');
  assert.ok(route);
  assert.equal(route.view, 'content/render');
  assert.equal(route.contentType, 'tool');

  const meta = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'tools', 'previsualizador-serp-google.json'), 'utf8'));
  const script = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'serp-preview-tool.js'), 'utf8');

  assert.equal(meta.publishedDate, '2022-10-20');
  assert.equal(Object.prototype.hasOwnProperty.call(meta, 'modifiedDate'), false);
  assert.equal(meta.toolToneClass, 'ct-orange');
  assert.equal(meta.featuredImage, '/img/tools/previsualizador-serp-google.svg');
  assert.match(script, /data-serp-device/);
  assert.match(script, /measureText/);
  assert.match(script, /Copiar metadatos|navigator\.clipboard/);
});


test('el generador de metaetiquetas SEO está publicado como herramienta de 2023', () => {
  const route = routes.find((item) => item.path === '/generador-metaetiquetas-seo');
  assert.ok(route);
  assert.equal(route.view, 'content/render');
  assert.equal(route.contentType, 'tool');

  const meta = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'tools', 'generador-metaetiquetas-seo.json'), 'utf8'));
  const script = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'meta-tags-generator.js'), 'utf8');

  assert.equal(meta.publishedDate, '2023-04-18');
  assert.equal(Object.prototype.hasOwnProperty.call(meta, 'modifiedDate'), false);
  assert.equal(meta.toolToneClass, 'ct-blue');
  assert.equal(meta.featuredImage, '/img/tools/generador-metaetiquetas-seo.svg');
  assert.match(script, /Open Graph|og:title|og:description/);
  assert.match(script, /twitter:card/);
  assert.match(script, /canonical/);
  assert.match(script, /navigator\.clipboard/);
});


test('el generador robots.txt está publicado como herramienta de finales de 2023', () => {
  const route = routes.find((item) => item.path === '/generador-robots-txt');
  assert.ok(route);
  assert.equal(route.view, 'content/render');
  assert.equal(route.contentType, 'tool');

  const meta = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'tools', 'generador-robots-txt.json'), 'utf8'));
  const script = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'robots-generator.js'), 'utf8');

  assert.equal(meta.publishedDate, '2023-11-23');
  assert.equal(Object.prototype.hasOwnProperty.call(meta, 'modifiedDate'), false);
  assert.equal(meta.toolToneClass, 'ct-purple');
  assert.equal(meta.themeColor, '#7a45e8');
  assert.equal(meta.featuredImage, '/img/tools/generador-robots-txt.svg');
  assert.match(script, /User-agent/);
  assert.match(script, /Disallow/);
  assert.match(script, /Sitemap/);
  assert.match(script, /robots\.txt/);
  assert.match(script, /navigator\.clipboard/);
});
