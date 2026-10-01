const test = require('node:test');
const assert = require('node:assert/strict');
const contentLoader = require('../lib/content/loader');

const hierarchyBatch2 = [
  'rich-snippets-y-datos-estructurados',
  'pipelines-de-contenido-con-ia',
  'microsoft-365-para-pymes',
  'checklist-seo-de-fin-de-ano',
  'wordpress-lento-diagnostico-real-paso-a-paso',
  'html-css-y-javascript-por-donde-empezar',
  'enlazado-interno-para-seo',
  'seo-local-avanzado-para-pymes',
  'copywriting-web-para-vender-mas',
  'herramientas-seo',
  'seo-local-y-visibilidad-para-pymes-2026',
  'clusters-de-contenido-y-seo',
  'automatizacion-de-respuestas-y-procesos',
  'email-marketing-para-pymes',
  'que-es-una-api-y-para-que-sirve',
  'ga4-primeros-pasos',
  'estrategias-de-captacion-b2b',
  'error-country-module-list-xml-prestashop',
  'contenido-que-ayuda-a-captar-clientes',
  'responsive-design-buenas-practicas'
];

test('heading hierarchy batch 2 uses H2 for main blocks and H3 for subsections', () => {
  hierarchyBatch2.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const h2Count = (article.bodyHtml.match(/<h2\b/gi) || []).length;
    const h3Count = (article.bodyHtml.match(/<h3\b/gi) || []).length;

    assert.ok(h2Count >= 5 && h2Count <= 9, `${slug} has ${h2Count} H2 headings`);
    assert.ok(h3Count >= 15, `${slug} has only ${h3Count} H3 headings`);
  });
});
