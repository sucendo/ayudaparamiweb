const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const routes = require('../routes');

test('Laboratorio separa ficha editorial y experimento ejecutable', () => {
  const quantumArticle = routes.find((route) => route.path === '/laboratorio/quantum-pacific-group');
  const opeArticle = routes.find((route) => route.path === '/laboratorio/calculo-posicion-provisional-ope-medico-familia-2019');
  const quantumExperiment = routes.find((route) => route.path === '/quantum-pacific-group');
  const opeExperiment = routes.find((route) => route.path === '/calculo-posicion-provisional-pruebas-selectivas-comunidad-de-madrid-medico-familia-atencion-primaria-2019');

  assert.equal(quantumArticle.contentType, 'laboratory');
  assert.equal(opeArticle.contentType, 'laboratory');
  assert.equal(quantumExperiment.catalog, false);
  assert.equal(opeExperiment.catalog, false);
});

test('las fichas de laboratorio documentan hipótesis, montaje, expectativas y experiencia', () => {
  const quantum = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'lab', 'quantum-pacific-group.json'), 'utf8'));
  const ope = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'lab', 'calculo-posicion-provisional-ope-medico-familia-2019.json'), 'utf8'));

  [quantum, ope].forEach((lab) => {
    assert.ok(lab.hypothesis);
    assert.ok(lab.experimentUrl);
    assert.ok(Array.isArray(lab.sections));
    assert.ok(Array.isArray(lab.resultsSections));
    assert.ok(lab.sections.some((section) => /esperaba/i.test(section.title)));
    assert.ok(lab.resultsSections.some((section) => /experiencia/i.test(section.title)));
  });
});

test('el layout de laboratorio incluye una llamada visible al experimento', () => {
  const layout = fs.readFileSync(path.join(__dirname, '..', 'views', 'layouts', 'lab.ejs'), 'utf8');
  const page = fs.readFileSync(path.join(__dirname, '..', 'views', 'pages', 'laboratorio.ejs'), 'utf8');

  assert.match(layout, /lab-experiment-button/);
  assert.match(layout, /Hipótesis del experimento/);
  assert.match(layout, /resultsSections/);
  assert.match(page, /qué esperábamos/i);
  assert.match(page, /experiencia real/i);
});

test('la publicación Quantum ya no contiene el tutorial legado de Pieces Slider', () => {
  const experiment = fs.readFileSync(path.join(__dirname, '..', 'views', 'experiments', '0001-quantum-pacific-group.ejs'), 'utf8');
  assert.match(experiment, /prueba de inmediatez/i);
  assert.doesNotMatch(experiment, /Pieces Slider/i);
  assert.doesNotMatch(experiment, /anime\.js/i);
});


test('las fechas históricas de actualización son coherentes con cada experimento', () => {
  const quantum = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'lab', 'quantum-pacific-group.json'), 'utf8'));
  const ope = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'lab', 'calculo-posicion-provisional-ope-medico-familia-2019.json'), 'utf8'));

  assert.equal(quantum.publishedDate, '2018-02-21');
  assert.equal(quantum.modifiedDate, '2018-11-06');
  assert.equal(ope.publishedDate, '2022-05-05');
  assert.equal(ope.modifiedDate, '2023-05-29');
});

test('la portada de Laboratorio conserva el mismo archivo visual que el resto de la web', () => {
  const page = fs.readFileSync(path.join(__dirname, '..', 'views', 'pages', 'laboratorio.ejs'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, '..', 'public', 'css', 'lab-pages.css'), 'utf8');

  assert.match(page, /archive-page\.ejs/);
  assert.doesNotMatch(page, /lab-archive-grid/);
  assert.doesNotMatch(css, /lab-archive-grid/);
});

test('los artículos de Laboratorio reutilizan la jerarquía editorial moderna y su CSS específico', () => {
  const layout = fs.readFileSync(path.join(__dirname, '..', 'views', 'layouts', 'lab.ejs'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, '..', 'public', 'css', 'lab-pages.css'), 'utf8');

  assert.match(layout, /article-v2-card lab-v2-card/);
  assert.match(layout, /ct-post-featured-img article-v2-featured lab-featured/);
  assert.match(layout, /article-v2-content lab-content/);
  assert.match(css, /page-type-laboratory \.lab-v2-card/);
  assert.match(css, /page-type-laboratory \.ct-main-post/);
  assert.match(css, /page-type-laboratory \.ct-post-featured-img\.lab-featured/);
});


test('los experimentos se publican como carpetas independientes y sin layout de Ayuda para mi Web', () => {
  const quantumIndex = fs.readFileSync(path.join(__dirname, '..', 'public', 'experimento', 'quantum-pacific-group', 'index.html'), 'utf8');
  const quantumCss = fs.readFileSync(path.join(__dirname, '..', 'public', 'experimento', 'quantum-pacific-group', 'style.css'), 'utf8');
  const quantumJs = fs.readFileSync(path.join(__dirname, '..', 'public', 'experimento', 'quantum-pacific-group', 'app.js'), 'utf8');
  const opeIndex = fs.readFileSync(path.join(__dirname, '..', 'public', 'experimento', 'ope-medico-familia-2019', 'index.html'), 'utf8');
  const opeCss = fs.readFileSync(path.join(__dirname, '..', 'public', 'experimento', 'ope-medico-familia-2019', 'style.css'), 'utf8');
  const opeJs = fs.readFileSync(path.join(__dirname, '..', 'public', 'experimento', 'ope-medico-familia-2019', 'app.js'), 'utf8');

  assert.match(quantumIndex, /\.\/style\.css/);
  assert.match(quantumIndex, /\.\/app\.js/);
  assert.doesNotMatch(quantumIndex, /partials\/header|class="ct-footer"/);
  assert.match(quantumCss, /\.masthead/);
  assert.match(quantumJs, /readingTime/);

  assert.match(opeIndex, /id="resultsTable"/);
  assert.match(opeIndex, /\.\/style\.css/);
  assert.match(opeIndex, /\.\/app\.js/);
  assert.doesNotMatch(opeIndex, /partials\/header|class="ct-footer"/);
  assert.match(opeCss, /\.results-table/);
  assert.match(opeJs, /searchInput/);
});

test('las fichas de laboratorio enlazan a las carpetas independientes de los experimentos', () => {
  const quantum = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'lab', 'quantum-pacific-group.json'), 'utf8'));
  const ope = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'lab', 'calculo-posicion-provisional-ope-medico-familia-2019.json'), 'utf8'));

  assert.equal(quantum.experimentUrl, '/experimento/quantum-pacific-group/');
  assert.equal(ope.experimentUrl, '/experimento/ope-medico-familia-2019/');
});


test('las páginas independientes se presentan como contenido real y solo remiten al Laboratorio al final', () => {
  const quantum = fs.readFileSync(path.join(__dirname, '..', 'public', 'experimento', 'quantum-pacific-group', 'index.html'), 'utf8');
  const ope = fs.readFileSync(path.join(__dirname, '..', 'public', 'experimento', 'ope-medico-familia-2019', 'index.html'), 'utf8');

  const quantumBeforeNote = quantum.split('<aside class="lab-note">')[0];
  const opeBeforeFooter = ope.split('<footer class="project-footer">')[0];

  assert.doesNotMatch(quantumBeforeNote, /experimento/i);
  assert.match(quantum, /Ver el artículo del Laboratorio/);
  assert.doesNotMatch(opeBeforeFooter, /experimento/i);
  assert.match(ope, /Ver cómo se construyó esta herramienta y la experiencia en el Laboratorio/);
});
