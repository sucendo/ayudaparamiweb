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
