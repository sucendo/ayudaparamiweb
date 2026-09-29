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
