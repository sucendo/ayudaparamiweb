const fs = require('fs');
const path = require('path');


const migratedContentRoutes = [
  { path: '/guia-seo-pymes-2026', view: 'content/render', contentType: 'article', contentSlug: 'guia-seo-pymes-2026' },
  { path: '/como-crear-una-pagina-web', view: 'content/render', contentType: 'article', contentSlug: 'como-crear-una-pagina-web' },
  { path: '/ventajas-de-tener-una-web', view: 'content/render', contentType: 'article', contentSlug: 'ventajas-de-tener-una-web' },
  { path: '/conceptos-basicos-programacion', view: 'content/render', contentType: 'article', contentSlug: 'conceptos-basicos-programacion' },
  { path: '/el-mundo-del-programador-web', view: 'content/render', contentType: 'article', contentSlug: 'el-mundo-del-programador-web' },
  { path: '/como-elegir-un-buen-hosting', view: 'content/render', contentType: 'article', contentSlug: 'como-elegir-un-buen-hosting' },
  { path: '/errores-al-elegir-dominio-y-hosting', view: 'content/render', contentType: 'article', contentSlug: 'errores-al-elegir-dominio-y-hosting' },
  { path: '/seo-que-es', view: 'content/render', contentType: 'article', contentSlug: 'seo-que-es' },
  { path: '/motores-de-busqueda', view: 'content/render', contentType: 'article', contentSlug: 'motores-de-busqueda' },
  { path: '/herramientas-seo', view: 'content/render', contentType: 'article', contentSlug: 'herramientas-seo' },
  { path: '/autoridad-de-dominio', view: 'content/render', contentType: 'article', contentSlug: 'autoridad-de-dominio' },
  { path: '/node-js-que-es', view: 'content/render', contentType: 'article', contentSlug: 'node-js-que-es' },
  { path: '/express-js-para-que-sirve', view: 'content/render', contentType: 'article', contentSlug: 'express-js-para-que-sirve' },
  { path: '/seo-on-page-aspectos-tecnicos', view: 'content/render', contentType: 'article', contentSlug: 'seo-on-page-aspectos-tecnicos' },
  { path: '/contenido-y-seo', view: 'content/render', contentType: 'article', contentSlug: 'contenido-y-seo' },
  { path: '/investigacion-palabras-clave', view: 'content/render', contentType: 'article', contentSlug: 'investigacion-palabras-clave' },
  { path: '/backlink-que-es-como-construir-red-de-enlaces', view: 'content/render', contentType: 'article', contentSlug: 'backlink-que-es-como-construir-red-de-enlaces' },
  { path: '/experiencia-de-usuario-ux-y-seo', view: 'content/render', contentType: 'article', contentSlug: 'experiencia-de-usuario-ux-y-seo' },
  { path: '/seo-local-que-es-y-como-empezar', view: 'content/render', contentType: 'article', contentSlug: 'seo-local-que-es-y-como-empezar' },
  { path: '/rich-snippets-y-datos-estructurados', view: 'content/render', contentType: 'article', contentSlug: 'rich-snippets-y-datos-estructurados' },
  { path: '/seo-para-ecommerce', view: 'content/render', contentType: 'article', contentSlug: 'seo-para-ecommerce' },
  { path: '/velocidad-web-y-experiencia-de-pagina', view: 'content/render', contentType: 'article', contentSlug: 'velocidad-web-y-experiencia-de-pagina' },
  { path: '/accesibilidad-web-principios-basicos', view: 'content/render', contentType: 'article', contentSlug: 'accesibilidad-web-principios-basicos' },
  { path: '/auditoria-web-basica-para-pymes', view: 'content/render', contentType: 'article', contentSlug: 'auditoria-web-basica-para-pymes' },
  { path: '/clusters-de-contenido-y-seo', view: 'content/render', contentType: 'article', contentSlug: 'clusters-de-contenido-y-seo' },
  { path: '/contenido-que-ayuda-a-captar-clientes', view: 'content/render', contentType: 'article', contentSlug: 'contenido-que-ayuda-a-captar-clientes' },
  { path: '/copywriting-web-para-vender-mas', view: 'content/render', contentType: 'article', contentSlug: 'copywriting-web-para-vender-mas' },
  { path: '/email-marketing-para-pymes', view: 'content/render', contentType: 'article', contentSlug: 'email-marketing-para-pymes' },
  { path: '/enlazado-interno-para-seo', view: 'content/render', contentType: 'article', contentSlug: 'enlazado-interno-para-seo' },
  { path: '/errores-comunes-en-webs-corporativas', view: 'content/render', contentType: 'article', contentSlug: 'errores-comunes-en-webs-corporativas' },
  { path: '/errores-de-usabilidad-que-bajan-conversiones', view: 'content/render', contentType: 'article', contentSlug: 'errores-de-usabilidad-que-bajan-conversiones' },
  { path: '/errores-frecuentes-al-crear-una-web', view: 'content/render', contentType: 'article', contentSlug: 'errores-frecuentes-al-crear-una-web' },
  { path: '/ga4-eventos-y-conversiones', view: 'content/render', contentType: 'article', contentSlug: 'ga4-eventos-y-conversiones' },
  { path: '/ga4-primeros-pasos', view: 'content/render', contentType: 'article', contentSlug: 'ga4-primeros-pasos' },
  { path: '/google-my-business-para-negocios-locales', view: 'content/render', contentType: 'article', contentSlug: 'google-my-business-para-negocios-locales' },
  { path: '/html-css-y-javascript-por-donde-empezar', view: 'content/render', contentType: 'article', contentSlug: 'html-css-y-javascript-por-donde-empezar' },
  { path: '/rendimiento-web-que-medir', view: 'content/render', contentType: 'article', contentSlug: 'rendimiento-web-que-medir' },
  { path: '/responsive-design-buenas-practicas', view: 'content/render', contentType: 'article', contentSlug: 'responsive-design-buenas-practicas' },
  { path: '/schema-org-basico-para-pymes', view: 'content/render', contentType: 'article', contentSlug: 'schema-org-basico-para-pymes' },
  { path: '/seo-para-negocios-locales', view: 'content/render', contentType: 'article', contentSlug: 'seo-para-negocios-locales' },
  { path: '/seo-para-tiendas-online', view: 'content/render', contentType: 'article', contentSlug: 'seo-para-tiendas-online' },
  { path: '/wordpress-o-desarrollo-a-medida', view: 'content/render', contentType: 'article', contentSlug: 'wordpress-o-desarrollo-a-medida' },
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
