const test = require('node:test');
const assert = require('node:assert/strict');
const contentLoader = require('../lib/content/loader');

const hierarchyBatch4 = [
  'auditoria-web-basica-para-pymes',
  'como-crear-briefings-web-mas-claros',
  'conceptos-basicos-programacion',
  'error-500-solucion-rapida-5-pasos',
  'ga4-y-bigquery-primer-enfoque',
  'guias-y-tutoriales-como-organizar-tu-contenido',
  'javascript-basico-para-principiantes',
  'plan-seo-y-contenidos-para-2026',
  'prestashop-va-lento-como-optimizarlo',
  'primeros-pasos-python',
  'schema-org-basico-para-pymes',
  'scraping-web-etico-y-util',
  'seo-para-categorias-de-ecommerce',
  'seo-para-negocios-locales',
  'seo-y-core-web-vitals',
  'tendencias-seo-y-contenidos-2024'
];

test('heading hierarchy batch 4 uses H2 for main blocks and H3 for subsections', () => {
  hierarchyBatch4.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const h2Count = (article.bodyHtml.match(/<h2\b/gi) || []).length;
    const h3Count = (article.bodyHtml.match(/<h3\b/gi) || []).length;

    assert.ok(h2Count >= 5 && h2Count <= 9, `${slug} has ${h2Count} H2 headings`);
    assert.ok(h3Count >= 15, `${slug} has only ${h3Count} H3 headings`);
  });
});
