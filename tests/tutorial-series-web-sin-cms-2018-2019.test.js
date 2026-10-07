const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const contentLoader = require('../lib/content/loader');

const ROOT = path.join(__dirname, '..');
const ARTICLES = path.join(ROOT, 'content', 'articles');

const series = [
  { slug: 'crear-web-desde-cero-html-css-sin-cms', date: '2018-10-25', links: ['como-crear-una-pagina-web', 'organizar-web-html-sin-cms'] },
  { slug: 'organizar-web-html-sin-cms', date: '2019-01-31', links: ['crear-web-desde-cero-html-css-sin-cms', 'motores-de-busqueda', 'herramientas-seo', 'crear-herramientas-javascript-web'] },
  { slug: 'crear-herramientas-javascript-web', date: '2019-06-13', links: ['crear-web-desde-cero-html-css-sin-cms', 'organizar-web-html-sin-cms', 'seo-on-page-aspectos-tecnicos', 'investigacion-palabras-clave', 'optimizar-publicar-web-hecha-a-mano'] },
  { slug: 'optimizar-publicar-web-hecha-a-mano', date: '2019-10-03', links: ['crear-web-desde-cero-html-css-sin-cms', 'organizar-web-html-sin-cms', 'crear-herramientas-javascript-web', 'como-crear-una-pagina-web', 'seo-on-page-aspectos-tecnicos', 'motores-de-busqueda', 'herramientas-seo'] }
];

test('la serie web sin CMS mantiene fechas, categoría, código y navegación interna', () => {
  series.forEach((item) => {
    const article = contentLoader.loadArticle(item.slug);
    const source = fs.readFileSync(path.join(ARTICLES, item.slug + '.md'), 'utf8');

    assert.equal(article.publishedDate, item.date, item.slug);
    assert.equal(article.category, 'tutoriales', item.slug);
    assert.match(source, /```(?:html|css|javascript|text|xml|http|apache)/, item.slug + ' debería incluir bloques de código Prism');
    assert.match(article.bodyHtml, /<pre><code class="language-(?:html|css|javascript|text|xml|http|apache)">/, item.slug + ' debería renderizar clases language-* para Prism');

    item.links.forEach((target) => {
      assert.ok(source.includes('](/' + target + ')'), item.slug + ' debería enlazar a ' + target);
    });
  });
});

test('la serie web sin CMS evita referencias tecnológicas posteriores a 2019', () => {
  const forbidden = ['GA4', 'Google Analytics 4', 'INP', 'Interaction to Next Paint', 'Vite', 'React 18'];

  series.forEach((item) => {
    const source = fs.readFileSync(path.join(ARTICLES, item.slug + '.md'), 'utf8');
    forbidden.forEach((term) => {
      assert.ok(!source.includes(term), item.slug + ' contiene una referencia posterior: ' + term);
    });
  });
});

test('Prism aporta toolbar y resaltado por tokens a los bloques de código', () => {
  const head = fs.readFileSync(path.join(ROOT, 'views', 'partials', 'head.ejs'), 'utf8');
  const prismCss = fs.readFileSync(path.join(ROOT, 'public', 'css', 'prism.css'), 'utf8');
  const prismJs = fs.readFileSync(path.join(ROOT, 'public', 'js', 'prism.js'), 'utf8');

  assert.match(head, /\/css\/prism\.css/);
  assert.match(head, /\/js\/prism\.js/);
  assert.match(prismCss, /div\.code-toolbar/);
  assert.match(prismCss, /\.token\.tag/);
  assert.match(prismJs, /code-toolbar/);
});
