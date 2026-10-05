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
  { path: '/publicar-una-noticia-bomba-antes-que-nadie', view: 'content/render', contentType: 'laboratory', contentSlug: 'quantum-pacific-group' },
  { path: '/posicionar-palabra-poca-competencia-bluetooth', view: 'content/render', contentType: 'laboratory', contentSlug: 'experimento-seo-bluetooth-2018' },
  { path: '/calculo-posicion-provisional-ope-medico-familia-2019', view: 'content/render', contentType: 'laboratory', contentSlug: 'calculo-posicion-provisional-ope-medico-familia-2019' },
  { path: '/como-descubre-google-pagina-nueva-2019', view: 'content/render', contentType: 'laboratory', contentSlug: 'como-descubre-google-pagina-nueva-2019' },
  { path: '/un-ano-de-pandemia-en-movimiento', view: 'content/render', contentType: 'laboratory', contentSlug: 'covid-19-mapa-mundial-2020' },
];

const staticRoutes = [
  { path: '/', view: 'pages/index' },
  { path: '/guias', view: 'pages/articles' },
  { path: '/tutoriales', view: 'pages/tutoriales' },
  { path: '/herramientas', view: 'pages/herramientas' },
  { path: '/laboratorio', view: 'pages/laboratorio' },
  { path: '/articulos', view: 'pages/articles' },
  { path: '/404', view: 'pages/404' },
  { path: '/buscar', view: 'pages/search' },
  { path: '/tags', view: 'pages/tags' },
  { path: '/sucender', view: 'authors/sucender' },
  { path: '/acerca-de', view: 'pages/acerca-de' },
  { path: '/privacidad', view: 'pages/privacidad' },
  { path: '/quantum-pacific-group-atletico-de-madrid', view: 'standalone', catalog: false, staticOnly: true, staticSource: 'experimento/quantum-pacific-group' },
  { path: '/que-es-bluetooth', view: 'standalone', catalog: false, staticOnly: true, staticSource: 'experimento/que-es-bluetooth' },
  { path: '/ope-medico-familia-2019', view: 'standalone', catalog: false, staticOnly: true, staticSource: 'experimento/ope-medico-familia-2019' },
  { path: '/optimizar-imagenes-web', view: 'standalone', catalog: false, staticOnly: true, staticSource: 'experimento/indexacion-google-2019/optimizar-imagenes-web' },
  { path: '/meta-description-seo', view: 'standalone', catalog: false, staticOnly: true, staticSource: 'experimento/indexacion-google-2019/meta-description-seo' },
  { path: '/enlaces-internos-seo', view: 'standalone', catalog: false, staticOnly: true, staticSource: 'experimento/indexacion-google-2019/enlaces-internos-seo' },
  { path: '/pagina-web-rapida', view: 'standalone', catalog: false, staticOnly: true, staticSource: 'experimento/indexacion-google-2019/pagina-web-rapida' },
  { path: '/covid-19-mapa-mundial-2020', view: 'standalone', catalog: false, staticOnly: true, staticSource: 'experimento/covid-19-mapa-mundial-2020' },

  { path: '/laboratorio/quantum-pacific-group', redirectTo: '/publicar-una-noticia-bomba-antes-que-nadie', catalog: false, sitemap: false },
  { path: '/laboratorio/calculo-posicion-provisional-ope-medico-familia-2019', redirectTo: '/calculo-posicion-provisional-ope-medico-familia-2019', catalog: false, sitemap: false },
  { path: '/laboratorio/como-descubre-google-pagina-nueva-2019', redirectTo: '/como-descubre-google-pagina-nueva-2019', catalog: false, sitemap: false },
  { path: '/laboratorio/covid-19-mapa-mundial-2020', redirectTo: '/un-ano-de-pandemia-en-movimiento', catalog: false, sitemap: false },
  { path: '/experimentos', redirectTo: '/laboratorio', catalog: false, sitemap: false },

  { path: '/experimento/quantum-pacific-group', redirectTo: '/quantum-pacific-group-atletico-de-madrid', catalog: false, sitemap: false },
  { path: '/experimento/ope-medico-familia-2019', redirectTo: '/ope-medico-familia-2019', catalog: false, sitemap: false },
  { path: '/experimento/indexacion-google-2019/optimizar-imagenes-web', redirectTo: '/optimizar-imagenes-web', catalog: false, sitemap: false },
  { path: '/experimento/indexacion-google-2019/meta-description-seo', redirectTo: '/meta-description-seo', catalog: false, sitemap: false },
  { path: '/experimento/indexacion-google-2019/enlaces-internos-seo', redirectTo: '/enlaces-internos-seo', catalog: false, sitemap: false },
  { path: '/experimento/indexacion-google-2019/pagina-web-rapida', redirectTo: '/pagina-web-rapida', catalog: false, sitemap: false },
  { path: '/experimento/covid-19-mapa-mundial-2020', redirectTo: '/covid-19-mapa-mundial-2020', catalog: false, sitemap: false },

  { path: '/quantum-pacific-group', redirectTo: '/quantum-pacific-group-atletico-de-madrid', catalog: false, sitemap: false },
  {
    path: '/calculo-posicion-provisional-pruebas-selectivas-comunidad-de-madrid-medico-familia-atencion-primaria-2019',
    redirectTo: '/ope-medico-familia-2019',
    catalog: false,
    sitemap: false
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
