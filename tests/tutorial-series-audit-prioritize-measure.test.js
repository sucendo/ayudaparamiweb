const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const contentLoader = require('../lib/content/loader');

const ROOT = path.join(__dirname, '..');
const ARTICLES = path.join(ROOT, 'content', 'articles');

const series = [
  { slug: 'auditar-web-antes-de-mejorarla', date: '2026-09-17', links: ['priorizar-problemas-web-despues-auditoria'] },
  { slug: 'priorizar-problemas-web-despues-auditoria', date: '2026-09-29', links: ['auditar-web-antes-de-mejorarla', 'medir-si-mejoras-web-han-funcionado'] },
  { slug: 'medir-si-mejoras-web-han-funcionado', date: '2026-10-07', links: ['auditar-web-antes-de-mejorarla', 'priorizar-problemas-web-despues-auditoria'] }
];

test('la serie Auditar -> Priorizar -> Medir mantiene fechas y navegación interna', () => {
  series.forEach((item) => {
    const article = contentLoader.loadArticle(item.slug);
    const source = fs.readFileSync(path.join(ARTICLES, item.slug + '.md'), 'utf8');

    assert.equal(article.publishedDate, item.date, item.slug);
    assert.equal(article.category, 'tutoriales', item.slug);

    item.links.forEach((target) => {
      assert.ok(source.includes('](/' + target + ')'), item.slug + ' deberia enlazar a ' + target);
    });
  });
});
