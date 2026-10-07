const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const contentLoader = require('../lib/content/loader');

const ROOT = path.join(__dirname, '..');
const ARTICLES = path.join(ROOT, 'content', 'articles');

const series = [
  { slug: 'auditar-web-antes-de-mejorarla', date: '2026-09-17', shouldLink: [], shouldNotLink: ['priorizar-problemas-web-despues-auditoria', 'medir-si-mejoras-web-han-funcionado'] },
  { slug: 'priorizar-problemas-web-despues-auditoria', date: '2026-09-29', shouldLink: ['auditar-web-antes-de-mejorarla'], shouldNotLink: ['medir-si-mejoras-web-han-funcionado'] },
  { slug: 'medir-si-mejoras-web-han-funcionado', date: '2026-10-07', shouldLink: ['auditar-web-antes-de-mejorarla', 'priorizar-problemas-web-despues-auditoria'], shouldNotLink: [] }
];

test('la serie Auditar -> Priorizar -> Medir respeta su cronologia editorial', () => {
  series.forEach((item) => {
    const article = contentLoader.loadArticle(item.slug);
    const source = fs.readFileSync(path.join(ARTICLES, item.slug + '.md'), 'utf8');

    assert.equal(article.publishedDate, item.date, item.slug);
    assert.equal(article.category, 'tutoriales', item.slug);

    item.shouldLink.forEach((target) => {
      assert.ok(source.includes('](/' + target + ')'), item.slug + ' deberia enlazar a ' + target);
    });

    item.shouldNotLink.forEach((target) => {
      assert.ok(!source.includes('](/' + target + ')'), item.slug + ' no debe anticipar ' + target);
    });
  });
});
