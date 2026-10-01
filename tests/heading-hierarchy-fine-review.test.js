const test = require('node:test');
const assert = require('node:assert/strict');
const contentLoader = require('../lib/content/loader');

const hierarchyFineReview = [
  'autoridad-de-dominio',
  'backlink-que-es-como-construir-red-de-enlaces',
  'como-crear-una-pagina-web',
  'como-mejorar-la-velocidad-de-wordpress',
  'copilots-y-agentes-para-pymes',
  'entornos-colaborativos',
  'error-500-wordpress-solucion-paso-a-paso',
  'git-y-github-para-principiantes',
  'google-shopping-actions',
  'guia-seo-pymes-2026',
  'ia-generativa-estrategia-contenidos-seo',
  'mi-web-wordpress-ha-sido-hackeada',
  'problemas-canon-digital-ecommerce',
  'programacion-asistida-por-ia',
  'prompts-para-redactar-mejor-con-ia',
  'puesta-a-punto-web-antes-del-verano'
];

test('fine heading review keeps a balanced H2/H3 hierarchy', () => {
  hierarchyFineReview.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const h2Count = (article.bodyHtml.match(/<h2\b/gi) || []).length;
    const h3Count = (article.bodyHtml.match(/<h3\b/gi) || []).length;

    assert.ok(h2Count >= 5 && h2Count <= 7, `${slug} has ${h2Count} H2 headings`);
    assert.ok(h3Count >= 10, `${slug} has only ${h3Count} H3 headings`);
  });
});
