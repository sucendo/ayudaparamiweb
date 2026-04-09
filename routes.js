const routes = [
  { path: '/', view: 'pages/index' },
  { path: '/articulos', view: 'pages/articles' },
  { path: '/herramientas', view: 'pages/tools' },
  { path: '/experimentos', view: 'pages/experiments' },
  { path: '/tags', view: 'pages/tags' },
  { path: '/sucender', view: 'authors/sucender' },
  { path: '/historia', view: 'historia/historia' },
  { path: '/mapa-guerra-ucrania-rusia', view: 'experiments/0003-mapa-guerra-ucrania-rusia' },
  { path: '/rusia-ataca-ucrania', view: 'experiments/0002-rusia-ataca-ucrania' },
  { path: '/quantum-pacific-group', view: 'experiments/0001-quantum-pacific-group' },
  {
    path: '/calculo-posicion-provisional-pruebas-selectivas-comunidad-de-madrid-medico-familia-atencion-primaria-2019',
    view: 'experiments/0004-comunidad-de-madrid-pruebas-selectivas-medico-familia-atencion-primaria-2019-2022'
  },
  { path: '/contador-caracteres-seo', view: 'tools/0002-contador-caracteres-seo' },
  { path: '/conversor-binario', view: 'tools/0001-conversor-binario' },
  { path: '/analizador-seo-url', view: 'tools/0003-analizador-seo-url' },
  { path: '/entornos-colaborativos', view: 'news/0021-entornos-colaborativos' },
  { path: '/seo-tecnico-core-web-vitals-2026', view: 'news/0023-seo-tecnico-core-web-vitals-2026' },
  { path: '/ia-generativa-estrategia-contenidos-seo', view: 'news/0024-ia-generativa-estrategia-contenidos-seo' },
  { path: '/checklist-lanzamiento-web-2026', view: 'news/0025-checklist-lanzamiento-web-2026' },
  { path: '/guia-seo-pymes-2026', view: 'news/0026-guia-seo-pymes-2026' },
  { path: '/backlink-que-es-como-construir-red-de-enlaces', view: 'news/0013-backlink-que-es-como-construir-red-de-enlaces' },
  { path: '/investigacion-palabras-clave', view: 'news/0012-investigacion-palabras-clave' },
  { path: '/contenido-y-seo', view: 'news/0011-contenido-y-seo' },
  { path: '/seo-on-page-aspectos-tecnicos', view: 'news/0010-seo-on-page-aspectos-tecnicos' },
  { path: '/motores-de-busqueda', view: 'news/0009-motores-de-busqueda' },
  { path: '/seo-que-es', view: 'news/0008-seo-que-es' },
  { path: '/como-crear-una-pagina-web', view: 'news/0007-como-crear-una-pagina-web' },
  { path: '/el-mundo-del-programador-web', view: 'news/0006-el-mundo-del-programador-web' },
  { path: '/que-es-bluetooth', view: 'news/0005-que-es-bluetooth' },
  { path: '/problemas-canon-digital-ecommerce', view: 'news/0004r-problemas-canon-digital-ecommerce', published: false },
  { path: '/codigo-traductor-google-blog', view: 'news/0002-codigo-traductor-google-blog' },
  { path: '/google-shopping-actions', view: 'news/0001r-google-shopping-actions', published: false },
  { path: '/experiencia-de-usuario-ux-y-seo', view: 'news/0014r-experiencia-de-usuario-ux-y-seo', published: false },
  { path: '/herramientas-seo', view: 'news/0015r-herramientas-seo', published: false },
  { path: '/autoridad-de-dominio', view: 'news/0016r-autoridad-de-dominio', published: false },
  { path: '/node-js-que-es', view: 'news/0017r-node-js-que-es' },
  { path: '/express-js-para-que-sirve', view: 'news/0018r-express-js-para-que-sirve', published: false },
  { path: '/vue-js-que-es', view: 'news/0020r-vue-js-que-es', published: false },
  { path: '/herramientas-seo-gratuitas', view: 'news/0022r-herramientas-seo-gratuitas', published: false }
];

module.exports = routes;
module.exports.publishedRoutes = routes.filter(function(route) {
  return route.published !== false;
});
