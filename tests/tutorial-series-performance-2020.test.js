const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const contentLoader = require('../lib/content/loader');

const ROOT = path.join(__dirname, '..');
const ARTICLES = path.join(ROOT, 'content', 'articles');

const series = [
  { slug: 'como-mejorar-la-velocidad-de-tu-web', date: '2020-06-11', links: ['optimizar-imagenes-css-javascript-web'] },
  { slug: 'optimizar-imagenes-css-javascript-web', date: '2020-07-09', links: ['como-mejorar-la-velocidad-de-tu-web', 'cache-compresion-servidor-web'] },
  { slug: 'cache-compresion-servidor-web', date: '2020-08-27', links: ['como-mejorar-la-velocidad-de-tu-web', 'optimizar-imagenes-css-javascript-web'] }
];

test('la serie de rendimiento 2020 mantiene fechas, categoría y navegación interna', () => {
  series.forEach((item) => {
    const article = contentLoader.loadArticle(item.slug);
    const source = fs.readFileSync(path.join(ARTICLES, item.slug + '.md'), 'utf8');

    assert.equal(article.publishedDate, item.date, item.slug);
    assert.equal(article.category, 'tutoriales', item.slug);

    item.links.forEach((target) => {
      assert.ok(source.includes('](/' + target + ')'), item.slug + ' debería enlazar a ' + target);
    });
  });
});

test('la serie de 2020 no incorpora conceptos posteriores en su texto visible', () => {
  const forbidden = ['INP', 'Interaction to Next Paint', 'GA4', 'Google Analytics 4'];

  series.forEach((item) => {
    const source = fs.readFileSync(path.join(ARTICLES, item.slug + '.md'), 'utf8');
    forbidden.forEach((term) => {
      assert.ok(!source.includes(term), item.slug + ' contiene una referencia posterior: ' + term);
    });
  });
});
