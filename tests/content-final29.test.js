const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const contentLoader = require('../lib/content/loader');
const contentCatalog = require('../content');

const finalBatch = [
  'checklist-ia-y-seo-para-2025',
  'editores-con-ia-y-agentes-de-desarrollo',
  'el-mundo-del-programador-web',
  'guia-seo-pymes-2026',
  'mantenimiento-web-proactivo',
  'optimizacion-de-google-business-profile',
  'pipelines-de-contenido-con-ia',
  'plan-digital-para-pymes-2023',
  'plan-seo-y-contenidos-para-2026',
  'programacion-asistida-por-ia',
  'prompts-para-redactar-mejor-con-ia',
  'que-es-bluetooth',
  'rendimiento-web-que-medir',
  'rich-snippets-y-datos-estructurados',
  'schema-org-basico-para-pymes',
  'scraping-web-etico-y-util',
  'seo-local-avanzado-para-pymes',
  'seo-local-y-visibilidad-para-pymes-2026',
  'seo-para-categorias-de-ecommerce',
  'seo-para-negocios-locales',
  'seo-para-tiendas-online',
  'seo-tecnico-core-web-vitals-2026',
  'seo-y-core-web-vitals',
  'teletrabajo-y-productividad-digital',
  'tendencias-seo-y-contenidos-2024',
  'velocidad-web-y-experiencia-de-pagina',
  'ventajas-de-tener-una-web',
  'vue-js-que-es',
  'wordpress-lento-diagnostico-real-paso-a-paso'
];

const expectedColors = {
  'checklist-ia-y-seo-para-2025': 'ct-purple',
  'editores-con-ia-y-agentes-de-desarrollo': 'ct-green',
  'el-mundo-del-programador-web': 'ct-blue',
  'guia-seo-pymes-2026': 'ct-purple',
  'mantenimiento-web-proactivo': 'ct-green',
  'optimizacion-de-google-business-profile': 'ct-orange',
  'pipelines-de-contenido-con-ia': 'ct-purple',
  'plan-digital-para-pymes-2023': 'ct-blue',
  'plan-seo-y-contenidos-para-2026': 'ct-orange',
  'programacion-asistida-por-ia': 'ct-red',
  'prompts-para-redactar-mejor-con-ia': 'ct-yellow',
  'que-es-bluetooth': 'ct-blue',
  'rendimiento-web-que-medir': 'ct-yellow',
  'rich-snippets-y-datos-estructurados': 'ct-orange',
  'schema-org-basico-para-pymes': 'ct-green',
  'scraping-web-etico-y-util': 'ct-blue',
  'seo-local-avanzado-para-pymes': 'ct-orange',
  'seo-local-y-visibilidad-para-pymes-2026': 'ct-green',
  'seo-para-categorias-de-ecommerce': 'ct-purple',
  'seo-para-negocios-locales': 'ct-red',
  'seo-para-tiendas-online': 'ct-green',
  'seo-tecnico-core-web-vitals-2026': 'ct-red',
  'seo-y-core-web-vitals': 'ct-blue',
  'teletrabajo-y-productividad-digital': 'ct-purple',
  'tendencias-seo-y-contenidos-2024': 'ct-yellow',
  'velocidad-web-y-experiencia-de-pagina': 'ct-red',
  'ventajas-de-tener-una-web': 'ct-green',
  'vue-js-que-es': 'ct-blue',
  'wordpress-lento-diagnostico-real-paso-a-paso': 'ct-red'
};

function sourceFor(slug) {
  return fs.readFileSync(path.join(__dirname, '..', 'content', 'articles', `${slug}.md`), 'utf8');
}

function frontmatterValue(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)`, 'm'));
  return match ? match[1].trim() : '';
}

test('final 29 articles respect their effective date in visible title, description and body', () => {
  finalBatch.forEach((slug) => {
    const source = sourceFor(slug);
    const article = contentLoader.loadArticle(slug);
    const effectiveDate = article.modifiedDate || article.publishedDate;
    const cutoffYear = Number(String(effectiveDate).slice(0, 4));
    const visible = `${frontmatterValue(source, 'title')}\n${frontmatterValue(source, 'description')}\n${article.bodyHtml}`;
    const years = [...new Set((visible.match(/\b(?:19|20)\d{2}\b/g) || []).map(Number))];
    const futureYears = years.filter((year) => year > cutoffYear);
    assert.deepEqual(futureYears, [], `${slug} contains years later than ${effectiveDate}: ${futureYears.join(', ')}`);
  });
});

test('final 29 use local 1200x630 SVG featured images and no retired ratings', () => {
  finalBatch.forEach((slug) => {
    const source = sourceFor(slug);
    const article = contentLoader.loadArticle(slug);
    assert.equal(article.featuredImage, `/img/articulo/${slug}-featured.svg`, slug);
    const imagePath = path.join(__dirname, '..', 'public', article.featuredImage.replace(/^\//, ''));
    assert.ok(fs.existsSync(imagePath), `Missing featured image for ${slug}`);
    const svg = fs.readFileSync(imagePath, 'utf8');
    assert.match(svg, /<svg\b/i, slug);
    assert.match(svg, /width="1200"/, slug);
    assert.match(svg, /height="630"/, slug);
    assert.match(svg, /viewBox="0 0 1200 630"/, slug);
    assert.doesNotMatch(source, /^ratingCount:/m, slug);
    assert.doesNotMatch(source, /^ratingValue:/m, slug);
    assert.doesNotMatch(article.bodyHtml, new RegExp(`${slug}-featured\\.svg`, 'i'), `${slug} repeats its featured image in body`);
  });
});

test('final 29 no longer contain generic review filler', () => {
  finalBatch.forEach((slug) => {
    const source = sourceFor(slug);
    assert.doesNotMatch(source, /<h2>Contexto y objetivos<\/h2>/i, slug);
    assert.doesNotMatch(source, /En esta guía encontrarás criterios prácticos para tomar decisiones con contexto/i, slug);
    assert.doesNotMatch(source, /Panorama práctico de/i, slug);
  });
});

test('historical performance articles keep period-appropriate metrics', () => {
  const cwv2021 = sourceFor('seo-y-core-web-vitals');
  const perf2021 = sourceFor('rendimiento-web-que-medir');
  assert.match(cwv2021, /LCP/);
  assert.match(cwv2021, /FID/);
  assert.match(cwv2021, /CLS/);
  assert.doesNotMatch(cwv2021, /\bINP\b/);
  assert.doesNotMatch(perf2021, /\bINP\b/);
});

test('final batch ct-colors match the assigned article identity', async () => {
  const allContent = await contentCatalog.buildCatalog();
  finalBatch.forEach((slug) => {
    const item = allContent.find((entry) => entry.slug === slug);
    assert.ok(item, slug);
    assert.equal(item.colorClass, expectedColors[slug], slug);
  });
});

test('revision state is complete: 112 reviewed and 0 pending', () => {
  const state = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'REVISION_ESTADO_2026-09-30.json'), 'utf8'));
  assert.equal(state.totalArticles, 112);
  assert.equal(state.reviewedArticles, 112);
  assert.equal(state.pendingArticles, 0);
  assert.equal(state.reviewed.length, 112);
  assert.equal(state.reviewedThisBatch.length, 29);
  assert.deepEqual(state.pending, []);
  finalBatch.forEach((slug) => assert.ok(state.reviewed.includes(slug), slug));
});
