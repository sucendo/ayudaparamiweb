const test = require('node:test');
const assert = require('node:assert/strict');
const contentLoader = require('../lib/content/loader');

const hierarchyBatch5 = [
  'auditoria-contenidos-antes-de-septiembre',
  'codigo-traductor-google-blog',
  'como-elegir-un-buen-hosting',
  'como-medir-rendimiento-web-metricas-utiles',
  'errores-al-elegir-dominio-y-hosting',
  'express-js-para-que-sirve',
  'herramientas-para-videollamadas-y-colaboracion',
  'herramientas-seo-gratuitas',
  'node-js-que-es',
  'productividad-digital-en-equipos-pequenos',
  'seo-estacional-busquedas-de-verano',
  'seo-tecnico-core-web-vitals-2026',
  'ventajas-de-tener-una-web',
  'wordpress-o-desarrollo-a-medida'
];

test('heading hierarchy batch 5 keeps main blocks in H2 and details in H3', () => {
  hierarchyBatch5.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const h2Count = (article.bodyHtml.match(/<h2\b/gi) || []).length;
    const h3Count = (article.bodyHtml.match(/<h3\b/gi) || []).length;

    assert.ok(h2Count >= 6 && h2Count <= 9, `${slug} has ${h2Count} H2 headings`);
    assert.ok(h3Count >= 14, `${slug} has only ${h3Count} H3 headings`);
  });
});
