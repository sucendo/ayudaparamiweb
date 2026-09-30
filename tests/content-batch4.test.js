const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const contentLoader = require('../lib/content/loader');

const batch4 = [
  'checklist-seo-de-fin-de-ano',
  'copilots-y-agentes-para-pymes',
  'entornos-colaborativos',
  'error-500-solucion-rapida-5-pasos',
  'error-country-module-list-xml-prestashop',
  'errores-frecuentes-al-crear-una-web',
  'estrategias-de-captacion-b2b',
  'express-js-para-que-sirve',
  'ga4-eventos-y-conversiones',
  'ga4-y-bigquery-primer-enfoque',
  'google-shopping-actions',
  'guias-y-tutoriales-como-organizar-tu-contenido',
  'herramientas-para-videollamadas-y-colaboracion',
  'landings-que-convierten',
  'mi-web-no-carga-que-hacer-10-minutos',
  'mi-web-wordpress-ha-sido-hackeada',
  'motores-de-busqueda',
  'node-js-que-es',
  'optimizacion-de-fichas-de-producto',
  'prestashop-va-lento-como-optimizarlo',
  'primeros-pasos-python',
  'problemas-canon-digital-ecommerce',
  'productividad-digital-en-equipos-pequenos',
  'responsive-design-buenas-practicas',
  'wordpress-o-desarrollo-a-medida'
];

function sourceFor(slug) {
  return fs.readFileSync(path.join(__dirname, '..', 'content', 'articles', `${slug}.md`), 'utf8');
}

test('batch 4 respects effective dates and has local 1200x630 SVG featured images', () => {
  batch4.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const effectiveDate = article.modifiedDate || article.publishedDate;
    const cutoffYear = Number(String(effectiveDate).slice(0, 4));
    const years = [...new Set((article.bodyHtml.match(/\b(?:19|20)\d{2}\b/g) || []).map(Number))];
    const futureYears = years.filter((year) => year > cutoffYear);
    assert.deepEqual(futureYears, [], `${slug} contains years later than ${effectiveDate}: ${futureYears.join(', ')}`);

    assert.equal(article.featuredImage, `/img/articulo/${slug}-featured.svg`, slug);
    const imagePath = path.join(__dirname, '..', 'public', article.featuredImage.replace(/^\//, ''));
    assert.ok(fs.existsSync(imagePath), `Missing featured image for ${slug}`);
    const svg = fs.readFileSync(imagePath, 'utf8');
    assert.match(svg, /<svg\b/i, slug);
    assert.match(svg, /width="1200"/, slug);
    assert.match(svg, /height="630"/, slug);
    assert.match(svg, /viewBox="0 0 1200 630"/, slug);
  });
});

test('batch 4 has no retired ratings, generic filler or inline featured duplication', () => {
  batch4.forEach((slug) => {
    const source = sourceFor(slug);
    const article = contentLoader.loadArticle(slug);
    assert.doesNotMatch(source, /^ratingCount:/m, slug);
    assert.doesNotMatch(source, /^ratingValue:/m, slug);
    assert.doesNotMatch(source, /<h2>Contexto y objetivos<\/h2>/i, slug);
    assert.doesNotMatch(source, /En esta guía encontrarás criterios prácticos para tomar decisiones con contexto/i, slug);
    assert.doesNotMatch(article.bodyHtml, new RegExp(`${slug}-featured\\.svg`, 'i'), `${slug} repeats its featured image inside body`);
  });
});

test('Python 2024 article no longer contains a 2026 framing', () => {
  assert.doesNotMatch(sourceFor('primeros-pasos-python'), /2026/);
});

test('batch 4 remains represented after later review batches', () => {
  const state = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'REVISION_ESTADO_2026-09-30.json'), 'utf8'));
  assert.equal(state.totalArticles, 117);
  assert.ok(state.reviewedArticles >= 83);
  assert.ok(state.pendingArticles <= 29);
  batch4.forEach((slug) => assert.ok(state.reviewed.includes(slug), slug));
});
