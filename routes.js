const fs = require('fs');
const path = require('path');

function getArticleRoutes() {
  const articlesDir = path.join(__dirname, 'content', 'articles');

  if (!fs.existsSync(articlesDir)) return [];

  return fs.readdirSync(articlesDir)
    .filter((filename) => filename.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');

      return {
        path: `/${slug}`,
        view: 'content/render',
        contentType: 'article',
        contentSlug: slug
      };
    });
}

const managedContentRoutes = [
  { path: '/analizador-seo-url', view: 'content/render', contentType: 'tool', contentSlug: 'analizador-seo-url' },
  { path: '/generador-schema-org', view: 'content/render', contentType: 'tool', contentSlug: 'generador-schema-org' },
  { path: '/previsualizador-serp-google', view: 'content/render', contentType: 'tool', contentSlug: 'previsualizador-serp-google' },
  { path: '/generador-metaetiquetas-seo', view: 'content/render', contentType: 'tool', contentSlug: 'generador-metaetiquetas-seo' },
  { path: '/generador-robots-txt', view: 'content/render', contentType: 'tool', contentSlug: 'generador-robots-txt' },
  { path: '/generador-sitemap-xml', view: 'content/render', contentType: 'tool', contentSlug: 'generador-sitemap-xml' },
  { path: '/generador-redirecciones-301', view: 'content/render', contentType: 'tool', contentSlug: 'generador-redirecciones-301' },
  { path: '/validador-canonical-hreflang', view: 'content/render', contentType: 'tool', contentSlug: 'validador-canonical-hreflang' },
  { path: '/analizador-encabezados-html', view: 'content/render', contentType: 'tool', contentSlug: 'analizador-encabezados-html' },
  { path: '/analizador-enlaces-html', view: 'content/render', contentType: 'tool', contentSlug: 'analizador-enlaces-html' },
  { path: '/auditor-seo-tecnico', view: 'content/render', contentType: 'tool', contentSlug: 'auditor-seo-tecnico' },
  { path: '/laboratorio/quantum-pacific-group', view: 'content/render', contentType: 'laboratory', contentSlug: 'quantum-pacific-group' },
  { path: '/laboratorio/calculo-posicion-provisional-ope-medico-familia-2019', view: 'content/render', contentType: 'laboratory', contentSlug: 'calculo-posicion-provisional-ope-medico-familia-2019' },
];

const staticRoutes = [
  { path: '/', view: 'pages/index' },
  { path: '/guias', view: 'pages/articles' },
  { path: '/tutoriales', view: 'pages/tutoriales' },
  { path: '/herramientas', view: 'pages/herramientas' },
  { path: '/laboratorio', view: 'pages/laboratorio' },
  { path: '/articulos', view: 'pages/articles' },
  { path: '/experimentos', view: 'pages/laboratorio' },
  { path: '/404', view: 'pages/404' },
  { path: '/buscar', view: 'pages/search' },
  { path: '/tags', view: 'pages/tags' },
  { path: '/sucender', view: 'authors/sucender' },
  { path: '/acerca-de', view: 'pages/acerca-de' },
  { path: '/privacidad', view: 'pages/privacidad' },
  { path: '/quantum-pacific-group', view: 'experiments/0001-quantum-pacific-group', catalog: false },
  {
    path: '/calculo-posicion-provisional-pruebas-selectivas-comunidad-de-madrid-medico-familia-atencion-primaria-2019',
    view: 'experiments/0004-comunidad-de-madrid-pruebas-selectivas-medico-familia-atencion-primaria-2019-2022',
    catalog: false
  },
  { path: '/contador-caracteres-seo', view: 'tools/0002-contador-caracteres-seo' },
  { path: '/conversor-binario', view: 'tools/0001-conversor-binario' },
];

function assertUniquePaths(routes) {
  const seen = new Set();

  routes.forEach((route) => {
    if (seen.has(route.path)) {
      throw new Error(`Ruta duplicada: ${route.path}`);
    }
    seen.add(route.path);
  });

  return routes;
}

const articleRoutes = getArticleRoutes();
const preferredRoutes = [...articleRoutes, ...managedContentRoutes, ...staticRoutes];
const preferredPaths = new Set(preferredRoutes.map((route) => route.path));
const routes = assertUniquePaths(preferredRoutes);

module.exports = routes;
module.exports.publishedRoutes = routes.filter(function(route) {
  return route.published !== false;
});
module.exports.getArticleRoutes = getArticleRoutes;
