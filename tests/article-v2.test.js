const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const contentLoader = require('../lib/content/loader');
const contentCatalog = require('../content');
const { buildArticleContext } = require('../lib/article-context');

test('Article v2 enriches long articles with reading time, anchors and TOC', () => {
  const article = contentLoader.loadArticle('guia-seo-pymes-2026');

  assert.ok(article.readingTime >= 1);
  assert.ok(article.wordCount > 0);
  assert.ok(Array.isArray(article.toc));
  assert.ok(article.toc.length >= 4);
  assert.match(article.bodyHtml, /<h2[^>]+id="[^"]+"/);
  assert.ok(article.toc.every((item) => item.id && item.text));
});

test('Article v2 builds related and sequential navigation without self-links', async () => {
  const allContent = await contentCatalog.buildCatalog();
  const article = contentLoader.loadArticle('guia-seo-pymes-2026');
  const context = buildArticleContext(article, allContent, 4);

  assert.ok(Array.isArray(context.relatedArticles));
  assert.ok(context.relatedArticles.length <= 4);
  assert.ok(context.relatedArticles.every((item) => item.path !== article.canonical));
  assert.ok(context.previousArticle || context.nextArticle);
});


test('Article v2 featured image exists and theme color drives the article identity', async () => {
  const article = contentLoader.loadArticle('como-crear-una-pagina-web');
  const imagePath = path.join(__dirname, '..', 'public', article.featuredImage.replace(/^\//, ''));

  assert.equal(article.featuredImage, '/img/articulo/como-crear-una-pagina-web-featured.svg');
  assert.ok(fs.existsSync(imagePath));

  const allContent = await contentCatalog.buildCatalog();
  const catalogItem = allContent.find((item) => item.slug === 'como-crear-una-pagina-web');
  const seoGuide = allContent.find((item) => item.slug === 'guia-seo-pymes-2026');

  assert.equal(catalogItem.colorClass, 'ct-green');
  assert.equal(seoGuide.colorClass, 'ct-purple');
});


test('Web creation article does not repeat a stale featured image inside the body', () => {
  const article = contentLoader.loadArticle('como-crear-una-pagina-web');

  assert.doesNotMatch(article.bodyHtml, /como-crear-una-pagina-web\.jpg/i);
  assert.doesNotMatch(article.bodyHtml, /featured\/como-crear-una-pagina-web/i);
});


test('Editorial featured images exist and keep each article ct-color', async () => {
  const cases = [
    ['seo-que-es', '/img/articulo/seo-que-es-featured.svg', 'ct-blue'],
    ['guia-seo-pymes-2026', '/img/articulo/guia-seo-pymes-2026-featured.svg', 'ct-purple'],
    ['autoridad-de-dominio', '/img/articulo/autoridad-de-dominio-featured.svg', 'ct-orange'],
    ['auditoria-seo-con-ia', '/img/articulo/auditoria-seo-con-ia-featured.svg', 'ct-red']
  ];

  const allContent = await contentCatalog.buildCatalog();

  cases.forEach(([slug, expectedImage, expectedColor]) => {
    const article = contentLoader.loadArticle(slug);
    const imagePath = path.join(__dirname, '..', 'public', article.featuredImage.replace(/^\//, ''));
    const catalogItem = allContent.find((item) => item.slug === slug);

    assert.equal(article.featuredImage, expectedImage);
    assert.ok(fs.existsSync(imagePath), `Missing featured image for ${slug}`);
    assert.equal(catalogItem.colorClass, expectedColor);
  });
});

test('SEO guide no longer repeats its former featured image inside the body', () => {
  const article = contentLoader.loadArticle('guia-seo-pymes-2026');

  assert.doesNotMatch(article.bodyHtml, /backlink-que-es-como-construir-red-de-enlaces\.png/i);
});


function assertValidSvg(filePath) {
  const svg = fs.readFileSync(filePath, 'utf8');
  assert.match(svg, /^<svg\\b/);
  assert.match(svg, /width=\"1200\"/);
  assert.match(svg, /height=\"630\"/);
  assert.match(svg, /viewBox=\"0 0 1200 630\"/);
}

test('Editorial SVG assets are valid and complete', () => {
  ['seo-que-es-featured.svg', 'auditoria-seo-con-ia-featured.svg'].forEach((fileName) => {
    assertValidSvg(path.join(__dirname, '..', 'public', 'img', 'articulo', fileName));
  });
});

test('Domain authority vector featured image is valid SVG', () => {
  const filePath = path.join(__dirname, '..', 'public', 'img', 'articulo', 'autoridad-de-dominio-featured.svg');
  const svg = fs.readFileSync(filePath, 'utf8');

  assert.match(svg, /^<svg\b/);
  assert.match(svg, /viewBox="0 0 1200 630"/);
});
