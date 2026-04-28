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
  { path: '/codigo-traductor-google-blog', view: 'content/render', contentType: 'article', contentSlug: 'codigo-traductor-google-blog' },
  { path: '/problemas-canon-digital-ecommerce', view: 'content/render', contentType: 'article', contentSlug: 'problemas-canon-digital-ecommerce' },
  { path: '/que-es-bluetooth', view: 'content/render', contentType: 'article', contentSlug: 'que-es-bluetooth' },
  { path: '/google-shopping-actions', view: 'content/render', contentType: 'article', contentSlug: 'google-shopping-actions' },
  { path: '/auditoria-seo-paso-a-paso', view: 'content/render', contentType: 'article', contentSlug: 'auditoria-seo-paso-a-paso' },
  { path: '/prestashop-que-es-y-cuando-usarlo', view: 'content/render', contentType: 'article', contentSlug: 'prestashop-que-es-y-cuando-usarlo' },
  { path: '/teletrabajo-y-productividad-digital', view: 'content/render', contentType: 'article', contentSlug: 'teletrabajo-y-productividad-digital' },
  { path: '/herramientas-para-videollamadas-y-colaboracion', view: 'content/render', contentType: 'article', contentSlug: 'herramientas-para-videollamadas-y-colaboracion' },
  { path: '/seguridad-basica-en-wordpress', view: 'content/render', contentType: 'article', contentSlug: 'seguridad-basica-en-wordpress' },
  { path: '/como-mejorar-la-velocidad-de-tu-web', view: 'content/render', contentType: 'article', contentSlug: 'como-mejorar-la-velocidad-de-tu-web' },
  { path: '/checklist-seo-de-fin-de-ano', view: 'content/render', contentType: 'article', contentSlug: 'checklist-seo-de-fin-de-ano' },
  { path: '/javascript-basico-para-principiantes', view: 'content/render', contentType: 'article', contentSlug: 'javascript-basico-para-principiantes' },
  { path: '/que-es-una-api-y-para-que-sirve', view: 'content/render', contentType: 'article', contentSlug: 'que-es-una-api-y-para-que-sirve' },
  { path: '/vue-js-que-es', view: 'content/render', contentType: 'article', contentSlug: 'vue-js-que-es' },
  { path: '/git-y-github-para-principiantes', view: 'content/render', contentType: 'article', contentSlug: 'git-y-github-para-principiantes' },
  { path: '/seo-y-core-web-vitals', view: 'content/render', contentType: 'article', contentSlug: 'seo-y-core-web-vitals' },
  { path: '/como-planificar-una-migracion-web', view: 'content/render', contentType: 'article', contentSlug: 'como-planificar-una-migracion-web' },
  { path: '/checklist-seo-antes-de-redisenar-una-web', view: 'content/render', contentType: 'article', contentSlug: 'checklist-seo-antes-de-redisenar-una-web' },
  { path: '/automatizacion-de-tareas-en-la-empresa', view: 'content/render', contentType: 'article', contentSlug: 'automatizacion-de-tareas-en-la-empresa' },
  { path: '/entornos-colaborativos', view: 'content/render', contentType: 'article', contentSlug: 'entornos-colaborativos' },
  { path: '/comunicacion-interna-y-herramientas-digitales', view: 'content/render', contentType: 'article', contentSlug: 'comunicacion-interna-y-herramientas-digitales' },
  { path: '/microsoft-365-para-pymes', view: 'content/render', contentType: 'article', contentSlug: 'microsoft-365-para-pymes' },
  { path: '/herramientas-seo-gratuitas', view: 'content/render', contentType: 'article', contentSlug: 'herramientas-seo-gratuitas' },
  { path: '/productividad-digital-en-equipos-pequenos', view: 'content/render', contentType: 'article', contentSlug: 'productividad-digital-en-equipos-pequenos' },
  { path: '/optimizacion-de-fichas-de-producto', view: 'content/render', contentType: 'article', contentSlug: 'optimizacion-de-fichas-de-producto' },
  { path: '/plan-digital-para-pymes-2023', view: 'content/render', contentType: 'article', contentSlug: 'plan-digital-para-pymes-2023' },
  { path: '/chatgpt-y-marketing-digital', view: 'content/render', contentType: 'article', contentSlug: 'chatgpt-y-marketing-digital' },
  { path: '/ia-y-seo-primeros-usos-practicos', view: 'content/render', contentType: 'article', contentSlug: 'ia-y-seo-primeros-usos-practicos' },
  { path: '/automatizacion-de-respuestas-y-procesos', view: 'content/render', contentType: 'article', contentSlug: 'automatizacion-de-respuestas-y-procesos' },
  { path: '/como-crear-briefings-web-mas-claros', view: 'content/render', contentType: 'article', contentSlug: 'como-crear-briefings-web-mas-claros' },
  { path: '/guias-y-tutoriales-como-organizar-tu-contenido', view: 'content/render', contentType: 'article', contentSlug: 'guias-y-tutoriales-como-organizar-tu-contenido' },
  { path: '/landings-que-convierten', view: 'content/render', contentType: 'article', contentSlug: 'landings-que-convierten' },
  { path: '/seo-para-categorias-de-ecommerce', view: 'content/render', contentType: 'article', contentSlug: 'seo-para-categorias-de-ecommerce' },
  { path: '/balance-web-y-seo-del-ano', view: 'content/render', contentType: 'article', contentSlug: 'balance-web-y-seo-del-ano' },
  { path: '/tendencias-seo-y-contenidos-2024', view: 'content/render', contentType: 'article', contentSlug: 'tendencias-seo-y-contenidos-2024' },
  { path: '/mi-web-wordpress-ha-sido-hackeada', view: 'content/render', contentType: 'article', contentSlug: 'mi-web-wordpress-ha-sido-hackeada' },
  { path: '/ia-generativa-estrategia-contenidos-seo', view: 'content/render', contentType: 'article', contentSlug: 'ia-generativa-estrategia-contenidos-seo' },
  { path: '/primeros-pasos-python', view: 'content/render', contentType: 'article', contentSlug: 'primeros-pasos-python' },
  { path: '/automatizaciones-con-python-para-seo', view: 'content/render', contentType: 'article', contentSlug: 'automatizaciones-con-python-para-seo' },
  { path: '/scraping-web-etico-y-util', view: 'content/render', contentType: 'article', contentSlug: 'scraping-web-etico-y-util' },
  { path: '/error-500-wordpress-solucion-paso-a-paso', view: 'content/render', contentType: 'article', contentSlug: 'error-500-wordpress-solucion-paso-a-paso' },
  { path: '/prompts-para-redactar-mejor-con-ia', view: 'content/render', contentType: 'article', contentSlug: 'prompts-para-redactar-mejor-con-ia' },
  { path: '/ga4-y-bigquery-primer-enfoque', view: 'content/render', contentType: 'article', contentSlug: 'ga4-y-bigquery-primer-enfoque' },
  { path: '/como-mejorar-la-velocidad-de-wordpress', view: 'content/render', contentType: 'article', contentSlug: 'como-mejorar-la-velocidad-de-wordpress' },
  { path: '/copilots-y-agentes-para-pymes', view: 'content/render', contentType: 'article', contentSlug: 'copilots-y-agentes-para-pymes' },
  { path: '/prestashop-va-lento-como-optimizarlo', view: 'content/render', contentType: 'article', contentSlug: 'prestashop-va-lento-como-optimizarlo' },
  { path: '/programacion-asistida-por-ia', view: 'content/render', contentType: 'article', contentSlug: 'programacion-asistida-por-ia' },
  { path: '/auditoria-seo-con-ia', view: 'content/render', contentType: 'article', contentSlug: 'auditoria-seo-con-ia' },
  { path: '/error-country-module-list-xml-prestashop', view: 'content/render', contentType: 'article', contentSlug: 'error-country-module-list-xml-prestashop' },
  { path: '/pipelines-de-contenido-con-ia', view: 'content/render', contentType: 'article', contentSlug: 'pipelines-de-contenido-con-ia' },
  { path: '/checklist-ia-y-seo-para-2025', view: 'content/render', contentType: 'article', contentSlug: 'checklist-ia-y-seo-para-2025' },
  { path: '/seo-local-avanzado-para-pymes', view: 'content/render', contentType: 'article', contentSlug: 'seo-local-avanzado-para-pymes' },
  { path: '/optimizacion-de-google-business-profile', view: 'content/render', contentType: 'article', contentSlug: 'optimizacion-de-google-business-profile' },
  { path: '/automatizar-informes-seo', view: 'content/render', contentType: 'article', contentSlug: 'automatizar-informes-seo' },
  { path: '/error-500-solucion-rapida-5-pasos', view: 'content/render', contentType: 'article', contentSlug: 'error-500-solucion-rapida-5-pasos' },
  { path: '/contenidos-utiles-y-eeat', view: 'content/render', contentType: 'article', contentSlug: 'contenidos-utiles-y-eeat' },
  { path: '/arquitectura-web-para-catalogos-grandes', view: 'content/render', contentType: 'article', contentSlug: 'arquitectura-web-para-catalogos-grandes' },
  { path: '/analisis-de-logs-para-seo', view: 'content/render', contentType: 'article', contentSlug: 'analisis-de-logs-para-seo' },
  { path: '/estrategias-de-captacion-b2b', view: 'content/render', contentType: 'article', contentSlug: 'estrategias-de-captacion-b2b' },
  { path: '/accesibilidad-y-seo', view: 'content/render', contentType: 'article', contentSlug: 'accesibilidad-y-seo' },
  { path: '/auditoria-tecnica-rapida-de-una-web', view: 'content/render', contentType: 'article', contentSlug: 'auditoria-tecnica-rapida-de-una-web' },
  { path: '/dashboard-ga4-para-direccion', view: 'content/render', contentType: 'article', contentSlug: 'dashboard-ga4-para-direccion' },
  { path: '/mantenimiento-web-proactivo', view: 'content/render', contentType: 'article', contentSlug: 'mantenimiento-web-proactivo' },
  { path: '/plan-seo-y-contenidos-para-2026', view: 'content/render', contentType: 'article', contentSlug: 'plan-seo-y-contenidos-para-2026' },
  { path: '/seo-tecnico-core-web-vitals-2026', view: 'content/render', contentType: 'article', contentSlug: 'seo-tecnico-core-web-vitals-2026' },
  { path: '/seo-local-y-visibilidad-para-pymes-2026', view: 'content/render', contentType: 'article', contentSlug: 'seo-local-y-visibilidad-para-pymes-2026' },
  { path: '/checklist-lanzamiento-web-2026', view: 'content/render', contentType: 'article', contentSlug: 'checklist-lanzamiento-web-2026' },
  { path: '/editores-con-ia-y-agentes-de-desarrollo', view: 'content/render', contentType: 'article', contentSlug: 'editores-con-ia-y-agentes-de-desarrollo' },
  { path: '/mi-web-no-carga-que-hacer-10-minutos', view: 'content/render', contentType: 'article', contentSlug: 'mi-web-no-carga-que-hacer-10-minutos' },
  { path: '/wordpress-lento-diagnostico-real-paso-a-paso', view: 'content/render', contentType: 'article', contentSlug: 'wordpress-lento-diagnostico-real-paso-a-paso' },
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
