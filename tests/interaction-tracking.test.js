const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const trackingPath = path.join(__dirname, '..', 'public', 'js', 'interaction-tracking.js');

test('la capa de interacción se carga de forma global', () => {
  const head = fs.readFileSync(path.join(__dirname, '..', 'views', 'partials', 'head.ejs'), 'utf8');
  assert.match(head, /\/js\/interaction-tracking\.js/);
});

test('los eventos respetan el consentimiento analítico', () => {
  const tracking = fs.readFileSync(trackingPath, 'utf8');
  assert.match(tracking, /data-analytics-consent/);
  assert.match(tracking, /analyticsAllowed\(\)/);
  assert.match(tracking, /event: DATA_LAYER_EVENT/);
  assert.match(tracking, /apmw_event_name/);
});

test('se miden herramientas, ejemplos y copias sin enviar el contenido introducido', () => {
  const tracking = fs.readFileSync(trackingPath, 'utf8');
  ['tool_open', 'tool_use', 'tool_result', 'example_view', 'tool_copy', 'code_copy'].forEach((eventName) => {
    assert.match(tracking, new RegExp(eventName));
  });
  assert.doesNotMatch(tracking, /payload\.(value|text|htmlSource|code)\s*=/);
});

test('la lectura comprometida exige profundidad y tiempo visible', () => {
  const tracking = fs.readFileSync(trackingPath, 'utf8');
  assert.match(tracking, /ARTICLE_ENGAGED_SECONDS = 30/);
  assert.match(tracking, /ARTICLE_ENGAGED_DEPTH = 75/);
  assert.match(tracking, /article_end/);
  assert.match(tracking, /article_engaged/);
  assert.match(tracking, /visibilitychange/);
});

test('la privacidad explica las nuevas interacciones medidas', () => {
  const privacy = fs.readFileSync(path.join(__dirname, '..', 'views', 'pages', 'privacidad.ejs'), 'utf8');
  assert.match(privacy, /uso de una herramienta/);
  assert.match(privacy, /apertura de un ejemplo/);
  assert.match(privacy, /30 segundos/);
  assert.match(privacy, /No se envía a Analytics el texto/);
});
