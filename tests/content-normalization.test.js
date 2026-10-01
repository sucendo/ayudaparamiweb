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
  'ia-generativa-estrategia-contenidos-seo',
  'accesibilidad-web-principios-basicos',
  'backlink-que-es-como-construir-red-de-enlaces',
  'seo-local-que-es-y-como-empezar',
  'investigacion-palabras-clave',
  'html-css-y-javascript-por-donde-empezar',
  'ia-y-seo-primeros-usos-practicos',
  'seo-para-ecommerce',
  'herramientas-seo',
  'auditoria-seo-paso-a-paso',
  'seo-on-page-aspectos-tecnicos'
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


const featuredImages = {
  'checklist-lanzamiento-web-2026': '/img/articulo/checklist-lanzamiento-web-2026-featured.svg',
  'codigo-traductor-google-blog': '/img/articulo/codigo-traductor-google-blog-featured.svg',
  'herramientas-seo-gratuitas': '/img/articulo/herramientas-seo-gratuitas-featured.svg',
  'ia-generativa-estrategia-contenidos-seo': '/img/articulo/ia-generativa-estrategia-contenidos-seo-featured.svg',
  'accesibilidad-web-principios-basicos': '/img/articulo/accesibilidad-web-principios-basicos-featured.svg',
  'backlink-que-es-como-construir-red-de-enlaces': '/img/articulo/backlink-red-de-enlaces-featured.svg',
  'seo-local-que-es-y-como-empezar': '/img/articulo/seo-local-que-es-featured.svg',
  'investigacion-palabras-clave': '/img/articulo/investigacion-palabras-clave-featured.svg',
  'html-css-y-javascript-por-donde-empezar': '/img/articulo/html-css-javascript-featured.svg',
  'ia-y-seo-primeros-usos-practicos': '/img/articulo/ia-seo-primeros-usos-featured.svg',
  'seo-para-ecommerce': '/img/articulo/seo-ecommerce-featured.svg',
  'herramientas-seo': '/img/articulo/herramientas-seo-featured.svg',
  'auditoria-seo-paso-a-paso': '/img/articulo/auditoria-seo-paso-a-paso-featured.svg',
  'seo-on-page-aspectos-tecnicos': '/img/articulo/seo-on-page-aspectos-tecnicos-featured.svg'
};

test('new normalized articles use complete local SVG featured images', () => {
  Object.entries(featuredImages).forEach(([slug, expectedImage]) => {
    const article = contentLoader.loadArticle(slug);
    assert.equal(article.featuredImage, expectedImage, slug);
    const filePath = path.join(__dirname, '..', 'public', expectedImage.replace(/^\//, ''));
    assert.ok(fs.existsSync(filePath), 'Missing featured image for ' + slug);
    const svg = fs.readFileSync(filePath, 'utf8');
    assert.match(svg, /<svg\b/i, slug);
    assert.match(svg, /width="1200"/, slug);
    assert.match(svg, /height="630"/, slug);
    assert.match(svg, /viewBox="0 0 1200 630"/, slug);
  });
});

test('2018 SEO tools article contains no post-publication or retrospective framing', () => {
  const source = sourceFor('herramientas-seo');
  assert.doesNotMatch(source, /2019/);
  assert.doesNotMatch(source, /contexto de finales de 2018/i);
});


const normalizedBatch2Articles = [
  'auditoria-web-basica-para-pymes',
  'automatizacion-de-tareas-en-la-empresa',
  'chatgpt-y-marketing-digital',
  'checklist-seo-antes-de-redisenar-una-web',
  'clusters-de-contenido-y-seo',
  'como-crear-briefings-web-mas-claros',
  'como-mejorar-la-velocidad-de-tu-web',
  'como-planificar-una-migracion-web',
  'comunicacion-interna-y-herramientas-digitales',
  'contenido-que-ayuda-a-captar-clientes',
  'copywriting-web-para-vender-mas',
  'email-marketing-para-pymes',
  'enlazado-interno-para-seo',
  'errores-comunes-en-webs-corporativas',
  'errores-de-usabilidad-que-bajan-conversiones',
  'ga4-primeros-pasos',
  'google-my-business-para-negocios-locales',
  'javascript-basico-para-principiantes',
  'prestashop-que-es-y-cuando-usarlo',
  'que-es-una-api-y-para-que-sirve',
];

test('second normalized batch respects effective article dates and image files', () => {
  normalizedBatch2Articles.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const effectiveDate = article.modifiedDate || article.publishedDate;
    const cutoffYear = Number(String(effectiveDate).slice(0, 4));
    const years = [...new Set((article.bodyHtml.match(/\b(?:19|20)\d{2}\b/g) || []).map(Number))];
    const futureYears = years.filter((year) => year > cutoffYear);
    assert.deepEqual(futureYears, [], `${slug} contains years later than ${effectiveDate}: ${futureYears.join(', ')}`);
    const imagePath = path.join(__dirname, '..', 'public', article.featuredImage.replace(/^\//, ''));
    assert.ok(fs.existsSync(imagePath), `Missing featured image for ${slug}`);
  });
});

test('second normalized batch no longer carries retired ratings or generic filler', () => {
  normalizedBatch2Articles.forEach((slug) => {
    const source = sourceFor(slug);
    assert.doesNotMatch(source, /^ratingCount:/m, slug);
    assert.doesNotMatch(source, /^ratingValue:/m, slug);
    assert.doesNotMatch(source, /<h2>Contexto y objetivos<\/h2>/i, slug);
  });
});

const normalizedBatch3Articles = [
  'accesibilidad-y-seo',
  'analisis-de-logs-para-seo',
  'arquitectura-web-para-catalogos-grandes',
  'auditoria-tecnica-rapida-de-una-web',
  'automatizacion-de-respuestas-y-procesos',
  'automatizaciones-con-python-para-seo',
  'automatizar-informes-seo',
  'balance-web-y-seo-del-ano',
  'microsoft-365-para-pymes',
  'como-elegir-un-buen-hosting',
  'como-mejorar-la-velocidad-de-wordpress',
  'conceptos-basicos-programacion',
  'contenido-y-seo',
  'contenidos-utiles-y-eeat',
  'dashboard-ga4-para-direccion',
  'error-500-wordpress-solucion-paso-a-paso',
  'errores-al-elegir-dominio-y-hosting',
  'experiencia-de-usuario-ux-y-seo',
  'git-y-github-para-principiantes',
  'seguridad-basica-en-wordpress'
];

test('third normalized batch respects effective dates and uses local 1200x630 SVG featured images', () => {
  normalizedBatch3Articles.forEach((slug) => {
    const article = contentLoader.loadArticle(slug);
    const effectiveDate = article.modifiedDate || article.publishedDate;
    const cutoffYear = Number(String(effectiveDate).slice(0, 4));
    const years = [...new Set((article.bodyHtml.match(/\b(?:19|20)\d{2}\b/g) || []).map(Number))];
    const futureYears = years.filter((year) => year > cutoffYear);

    assert.deepEqual(futureYears, [], `${slug} contains years later than ${effectiveDate}: ${futureYears.join(', ')}`);
    assert.equal(article.featuredImage, `/img/articulo/${slug}-featured.svg`, slug);

    const imagePath = path.join(__dirname, '..', 'public', article.featuredImage.replace(/^\//, ''));
    assert.ok(fs.existsSync(imagePath), `Missing featured image for ${slug}`);
    const svg = fs.readFileSync(imagePath, 'utf8');
    assert.match(svg, /<svg\b/i, slug);
    assert.match(svg, /viewBox="0 0 1200 630"/, slug);
    assert.match(svg, /width="1200"/, slug);
    assert.match(svg, /height="630"/, slug);
  });
});

test('third normalized batch has no retired ratings, generic filler or duplicate inline featured image', () => {
  normalizedBatch3Articles.forEach((slug) => {
    const source = sourceFor(slug);
    const article = contentLoader.loadArticle(slug);
    assert.doesNotMatch(source, /^ratingCount:/m, slug);
    assert.doesNotMatch(source, /^ratingValue:/m, slug);
    assert.doesNotMatch(source, /<h2>Contexto y objetivos<\/h2>/i, slug);
    assert.doesNotMatch(source, /En esta guía encontrarás criterios prácticos para tomar decisiones con contexto/i, slug);
    assert.doesNotMatch(article.bodyHtml, new RegExp(`${slug}-featured\\.svg`, 'i'), `${slug} repeats its featured image inside body`);
  });
});

test('revision state retains batch 3 articles after later review batches', () => {
  const statePath = path.join(__dirname, '..', 'REVISION_ESTADO_2026-09-30.json');
  assert.ok(fs.existsSync(statePath));
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  assert.equal(state.totalArticles, 117);
  assert.ok(state.reviewedArticles >= 58);
  assert.ok(state.pendingArticles <= 54);
  normalizedBatch3Articles.forEach((slug) => assert.ok(state.reviewed.includes(slug), slug));
});
