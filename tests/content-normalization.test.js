const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const contentLoader = require('../lib/content/loader');

const normalizedArticles = [
  'seo-que-es',
  'autoridad-de-dominio',
  'auditoria-seo-con-ia',
  'como-crear-una-pagina-web',
  'checklist-lanzamiento-web-2026',
  'codigo-traductor-google-blog',
  'herramientas-seo-gratuitas',
  'ia-generativa-estrategia-contenidos-seo'
];

function sourceFor(slug) {
  return fs.readFileSync(path.join(__dirname, '..', 'content', 'articles', `${slug}.md`), 'utf8');
}

test('normalized articles do not reference years later than their effective date', () => {
  normalizedArticles.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const effectiveDate = article.modifiedDate || article.publishedDate;
    const cutoffYear = Number(String(effectiveDate).slice(0, 4));
    const years = [...new Set((article.bodyHtml.match(/\b(?:19|20)\d{2}\b/g) || []).map(Number))];
    const futureYears = years.filter((year) => year > cutoffYear);

    assert.deepEqual(
      futureYears,
      [],
      `${slug} contains years later than its effective date ${effectiveDate}: ${futureYears.join(', ')}`
    );
  });
});

test('normalized articles no longer carry retired rating frontmatter', () => {
  normalizedArticles.forEach((slug) => {
    const source = sourceFor(slug);
    assert.doesNotMatch(source, /^ratingCount:/m, slug);
    assert.doesNotMatch(source, /^ratingValue:/m, slug);
  });
});

test('repetitive advanced filler blocks were removed from normalized SEO articles', () => {
  ['herramientas-seo-gratuitas', 'ia-generativa-estrategia-contenidos-seo'].forEach((slug) => {
    assert.doesNotMatch(sourceFor(slug), /Bloque avanzado \d+:/i, slug);
  });
});

test('historical SEO article no longer claims a 2019 context before its 2018 publication date', () => {
  const source = sourceFor('seo-que-es');
  assert.doesNotMatch(source, /2019/);
});

test('2022 SEO tools article no longer contains the later 2026 context', () => {
  const source = sourceFor('herramientas-seo-gratuitas');
  assert.doesNotMatch(source, /2026/);
  assert.match(source, /contexto de 2022/i);
});
