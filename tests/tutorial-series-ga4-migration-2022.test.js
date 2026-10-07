const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const contentLoader = require('../lib/content/loader');

const ROOT = path.join(__dirname, '..');
const ARTICLES = path.join(ROOT, 'content', 'articles');

const series = [
  { slug: 'universal-analytics-desaparece-preparar-web-ga4', date: '2022-03-24', links: ['ga4-primeros-pasos', 'instalar-ga4-junto-universal-analytics'] },
  { slug: 'instalar-ga4-junto-universal-analytics', date: '2022-04-21', links: ['universal-analytics-desaparece-preparar-web-ga4', 'ga4-primeros-pasos', 'migrar-objetivos-eventos-universal-analytics-ga4'] },
  { slug: 'migrar-objetivos-eventos-universal-analytics-ga4', date: '2022-05-19', links: ['universal-analytics-desaparece-preparar-web-ga4', 'instalar-ga4-junto-universal-analytics', 'comprobar-ga4-antes-abandonar-universal-analytics'] },
  { slug: 'comprobar-ga4-antes-abandonar-universal-analytics', date: '2022-06-23', links: ['universal-analytics-desaparece-preparar-web-ga4', 'instalar-ga4-junto-universal-analytics', 'migrar-objetivos-eventos-universal-analytics-ga4'] }
];

test('la serie de migración a GA4 mantiene fechas, categoría, código y enlaces', () => {
  series.forEach((item) => {
    const article = contentLoader.loadArticle(item.slug);
    const source = fs.readFileSync(path.join(ARTICLES, item.slug + '.md'), 'utf8');

    assert.equal(article.publishedDate, item.date, item.slug);
    assert.equal(article.category, 'tutoriales', item.slug);
    assert.match(source, /```(?:html|javascript|text)/, item.slug + ' debería incluir bloques de código');
    assert.match(article.bodyHtml, /<pre><code class="language-(?:html|javascript|text)">/, item.slug + ' debería renderizar clases language-* para Prism');

    item.links.forEach((target) => {
      assert.ok(source.includes('](/' + target + ')'), item.slug + ' debería enlazar a ' + target);
    });
  });
});

test('la serie conserva el contexto de 2022 y el plazo anunciado para Universal Analytics', () => {
  const forbidden = ['eventos clave', 'key events', 'INP', 'Interaction to Next Paint', 'Google Analytics 4 ha sustituido'];

  const deadlineSlugs = new Set([
    'universal-analytics-desaparece-preparar-web-ga4',
    'instalar-ga4-junto-universal-analytics',
    'comprobar-ga4-antes-abandonar-universal-analytics'
  ]);

  series.forEach((item) => {
    const source = fs.readFileSync(path.join(ARTICLES, item.slug + '.md'), 'utf8');
    if (deadlineSlugs.has(item.slug)) {
      assert.match(source, /1 de julio de 2023/, item.slug + ' debería conservar el plazo anunciado para UA');
    }
    forbidden.forEach((term) => {
      assert.ok(!source.toLowerCase().includes(term.toLowerCase()), item.slug + ' contiene terminología posterior: ' + term);
    });
  });
});
