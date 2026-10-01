const test = require('node:test');
const assert = require('node:assert/strict');
const contentLoader = require('../lib/content/loader');

const hierarchyBatch1 = [
  'errores-de-usabilidad-que-bajan-conversiones',
  'errores-comunes-en-webs-corporativas',
  'errores-frecuentes-al-crear-una-web',
  'dashboard-ga4-para-direccion',
  'auditoria-tecnica-rapida-de-una-web',
  'seguridad-basica-en-wordpress',
  'comunicacion-interna-y-herramientas-digitales',
  'optimizacion-de-google-business-profile',
  'rendimiento-web-que-medir',
  'seo-para-tiendas-online',
  'auditoria-seo-paso-a-paso',
  'automatizaciones-con-python-para-seo',
  'automatizar-informes-seo',
  'balance-web-y-seo-del-ano',
  'como-planificar-una-migracion-web',
  'plan-digital-para-pymes-2023',
  'prestashop-que-es-y-cuando-usarlo',
  'seo-para-ecommerce',
  'velocidad-web-y-experiencia-de-pagina',
  'vue-js-que-es'
];

test('heading hierarchy batch 1 uses H2 for main blocks and H3 for subsections', () => {
  hierarchyBatch1.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const h2Count = (article.bodyHtml.match(/<h2\b/gi) || []).length;
    const h3Count = (article.bodyHtml.match(/<h3\b/gi) || []).length;

    assert.ok(h2Count >= 5 && h2Count <= 9, `${slug} has ${h2Count} H2 headings`);
    assert.ok(h3Count >= 15, `${slug} has only ${h3Count} H3 headings`);
  });
});
