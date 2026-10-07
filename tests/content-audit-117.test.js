const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const contentLoader = require('../lib/content/loader');

const ROOT = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'content', 'articles');

function sourceFor(slug) {
  return fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.md`), 'utf8');
}

test('auditoría global: 129 contenidos editoriales, canonicals e imágenes únicas', () => {
  const slugs = fs.readdirSync(ARTICLES_DIR)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''))
    .sort();

  assert.equal(slugs.length, 129);

  const canonicals = new Set();
  const images = new Set();

  slugs.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const source = sourceFor(slug);

    assert.equal(article.canonical, `/${slug}`, `canonical incoherente en ${slug}`);
    assert.ok(!canonicals.has(article.canonical), `canonical duplicado: ${article.canonical}`);
    canonicals.add(article.canonical);

    assert.ok(article.featuredImage, `featuredImage ausente en ${slug}`);
    assert.ok(!images.has(article.featuredImage), `featuredImage duplicada: ${article.featuredImage}`);
    images.add(article.featuredImage);

    const imagePath = path.join(ROOT, 'public', article.featuredImage.replace(/^\//, ''));
    assert.ok(fs.existsSync(imagePath), `imagen inexistente en ${slug}: ${article.featuredImage}`);

    assert.doesNotMatch(source, /^ratingCount:/m, slug);
    assert.doesNotMatch(source, /^ratingValue:/m, slug);
  });

  assert.equal(canonicals.size, 129);
  assert.equal(images.size, 129);
});

test('auditoría global: ningún artículo contiene años visibles posteriores a su fecha efectiva salvo referencias prospectivas explícitas', () => {
  const allowedProspectiveYears = {
    'checklist-ia-y-seo-para-2025': [2025],
    'universal-analytics-desaparece-preparar-web-ga4': [2023],
    'instalar-ga4-junto-universal-analytics': [2023],
    'migrar-objetivos-eventos-universal-analytics-ga4': [2023],
    'comprobar-ga4-antes-abandonar-universal-analytics': [2023]
  };
  const slugs = fs.readdirSync(ARTICLES_DIR)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''));

  slugs.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const effectiveDate = article.modifiedDate || article.publishedDate;
    const cutoffYear = Number(String(effectiveDate).slice(0, 4));
    const visible = [article.title, article.description, article.bodyHtml].join('\n');
    const years = [...new Set((visible.match(/\b(?:19|20)\d{2}\b/g) || []).map(Number))];
    const allowed = new Set(allowedProspectiveYears[slug] || []);
    const futureYears = years.filter((year) => year > cutoffYear && !allowed.has(year));

    assert.deepEqual(
      futureYears,
      [],
      `${slug} contiene años posteriores a ${effectiveDate}: ${futureYears.join(', ')}`
    );
  });
});

test('auditoría global: todos los SVG destacados declaran 1200x630', () => {
  const slugs = fs.readdirSync(ARTICLES_DIR)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''));

  slugs.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    if (!/\.svg$/i.test(article.featuredImage)) return;

    const imagePath = path.join(ROOT, 'public', article.featuredImage.replace(/^\//, ''));
    const svg = fs.readFileSync(imagePath, 'utf8');

    assert.match(svg, /width="1200"/, slug);
    assert.match(svg, /height="630"/, slug);
    assert.match(svg, /viewBox="0 0 1200 630"/, slug);
  });
});
