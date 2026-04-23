const fs = require('fs');
const path = require('path');


const migratedContentRoutes = [
  { path: '/guia-seo-pymes-2026', view: 'content/render', contentType: 'article', contentSlug: 'guia-seo-pymes-2026' },
  { path: '/analizador-seo-url', view: 'content/render', contentType: 'tool', contentSlug: 'analizador-seo-url' },
  { path: '/mapa-guerra-ucrania-rusia', view: 'content/render', contentType: 'laboratory', contentSlug: 'mapa-guerra-ucrania-rusia' }
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
  { path: '/historia', view: 'historia/historia' },
  { path: '/rusia-ataca-ucrania', view: 'experiments/0002-rusia-ataca-ucrania' },
  { path: '/quantum-pacific-group', view: 'experiments/0001-quantum-pacific-group' },
  {
    path: '/calculo-posicion-provisional-pruebas-selectivas-comunidad-de-madrid-medico-familia-atencion-primaria-2019',
    view: 'experiments/0004-comunidad-de-madrid-pruebas-selectivas-medico-familia-atencion-primaria-2019-2022'
  },
  { path: '/contador-caracteres-seo', view: 'tools/0002-contador-caracteres-seo' },
  { path: '/conversor-binario', view: 'tools/0001-conversor-binario' },
];

function getNewsRoutes() {
  const newsDir = path.join(__dirname, 'views', 'news');

  return fs.readdirSync(newsDir)
    .filter((filename) => /^\d{4}-.+\.ejs$/.test(filename))
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => {
      const viewName = filename.replace(/\.ejs$/, '');
      const slug = viewName.replace(/^\d{4}-/, '');

      return {
        path: `/${slug}`,
        view: `news/${viewName}`
      };
    });
}

const routes = [...migratedContentRoutes, ...staticRoutes, ...getNewsRoutes().filter((route) => !migratedContentRoutes.some((item) => item.path === route.path))];

module.exports = routes;
module.exports.publishedRoutes = routes.filter(function(route) {
  return route.published !== false;
});
