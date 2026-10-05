const test = require('node:test');
const assert = require('node:assert/strict');
const contentLoader = require('../lib/content/loader');
const contentCatalog = require('../content');

const expectedCategories = {
  'editores-con-ia-y-agentes-de-desarrollo': 'articulos',
  'seo-local-y-visibilidad-para-pymes-2026': 'articulos',
  'accesibilidad-y-seo': 'articulos',
  'estrategias-de-captacion-b2b': 'articulos',
  'arquitectura-web-para-catalogos-grandes': 'articulos',
  'contenidos-utiles-y-eeat': 'articulos',
  'checklist-lanzamiento-web-2026': 'tutoriales'
};

test('las categorías auditadas se leen del frontmatter y no de overrides antiguos', async () => {
  const catalog = await contentCatalog.buildCatalog();

  Object.entries(expectedCategories).forEach(([slug, expectedCategory]) => {
    const article = contentLoader.loadArticle(slug);
    const item = catalog.find((entry) => entry.slug === slug);

    assert.ok(item, 'Falta en el catálogo: ' + slug);
    assert.equal(article.category, expectedCategory, 'Frontmatter incorrecto en ' + slug);
    assert.equal(item.category, expectedCategory, 'Categoría visible incorrecta en ' + slug);
  });
});
