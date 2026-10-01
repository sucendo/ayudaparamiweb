const test = require('node:test');
const assert = require('node:assert/strict');
const contentLoader = require('../lib/content/loader');

const hierarchyBatch3 = [
  'accesibilidad-web-principios-basicos',
  'accesibilidad-y-seo',
  'analisis-de-logs-para-seo',
  'arquitectura-web-para-catalogos-grandes',
  'automatizacion-de-tareas-en-la-empresa',
  'busqueda-multimodal-seo-visual-google-lens',
  'chatgpt-y-marketing-digital',
  'checklist-ia-y-seo-para-2025',
  'checklist-seo-antes-de-redisenar-una-web',
  'como-mejorar-la-velocidad-de-tu-web',
  'contenidos-utiles-y-eeat',
  'ga4-eventos-y-conversiones',
  'google-my-business-para-negocios-locales',
  'ia-y-seo-primeros-usos-practicos',
  'landings-que-convierten',
  'mantenimiento-web-proactivo',
  'mi-web-no-carga-que-hacer-10-minutos',
  'optimizacion-de-fichas-de-producto',
  'seo-local-que-es-y-como-empezar',
  'teletrabajo-y-productividad-digital'
];

test('heading hierarchy batch 3 uses H2 for main blocks and H3 for subsections', () => {
  hierarchyBatch3.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const h2Count = (article.bodyHtml.match(/<h2\b/gi) || []).length;
    const h3Count = (article.bodyHtml.match(/<h3\b/gi) || []).length;

    assert.ok(h2Count >= 5 && h2Count <= 9, `${slug} has ${h2Count} H2 headings`);
    assert.ok(h3Count >= 15, `${slug} has only ${h3Count} H3 headings`);
  });
});
