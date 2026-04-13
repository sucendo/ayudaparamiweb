(function () {
  var POSTS = [
    { title: 'Primeros pasos en Python: guía completa con ejemplos', url: '/primeros-pasos-python', dateLabel: '9 de abril de 2026', date: '2026-04-09', excerpt: 'Guía extensa para empezar Python desde cero con ejercicios y código.', tags: ['Python', 'Programación', 'Backend'] },
    { title: 'Google Shopping Actions: qué fue y qué aprendimos', url: '/google-shopping-actions', dateLabel: '20 de mayo de 2018', date: '2018-05-20', excerpt: 'Lecciones de Google Shopping Actions para ecommerce y marketplaces.', tags: ['Ecommerce', 'Google Shopping', 'Marketing digital'] },
    { title: 'Conceptos básicos de programación', url: '/conceptos-basicos-programacion', dateLabel: '24 de junio de 2018', date: '2018-06-24', excerpt: 'Variables, condicionales, funciones y lógica para empezar a programar.', tags: ['Programación', 'Fundamentos', 'Desarrollo web'] },
    { title: 'Problemas del canon digital en ecommerce', url: '/problemas-canon-digital-ecommerce', dateLabel: '5 de julio de 2018', date: '2018-07-05', excerpt: 'Impacto legal y operativo del canon digital en tiendas online.', tags: ['Ecommerce', 'Legal', 'España'] },
    { title: 'Experiencia de usuario (UX) y SEO', url: '/experiencia-de-usuario-ux-y-seo', dateLabel: '12 de enero de 2019', date: '2019-01-12', excerpt: 'Cómo UX y SEO se complementan para mejorar conversiones y ranking.', tags: ['SEO', 'UX'] },
    { title: 'Herramientas SEO', url: '/herramientas-seo', dateLabel: '15 de enero de 2019', date: '2019-01-15', excerpt: 'Set base de herramientas para keyword research, auditoría y seguimiento.', tags: ['SEO', 'Herramientas', 'Marketing digital'] },
    { title: 'Autoridad de dominio', url: '/autoridad-de-dominio', dateLabel: '20 de enero de 2019', date: '2019-01-20', excerpt: 'Qué es la autoridad de dominio y cómo mejorarla con enlaces de calidad.', tags: ['SEO', 'Autoridad de dominio', 'Link building'] },
    { title: '¿Qué es Node.js y para qué sirve en 2026?', url: '/node-js-que-es', dateLabel: '5 de marzo de 2026', date: '2026-03-05', excerpt: 'Fundamentos de Node.js, arquitectura y casos reales.', tags: ['Node.js', 'Backend', 'JavaScript'] },
    { title: 'Express.js: para qué sirve', url: '/express-js-para-que-sirve', dateLabel: '6 de marzo de 2026', date: '2026-03-06', excerpt: 'Cómo crear APIs con Express.js de forma segura y escalable.', tags: ['Node.js', 'Express', 'JavaScript'] },
    { title: '¿Qué es Vue.js?', url: '/vue-js-que-es', dateLabel: '7 de marzo de 2026', date: '2026-03-07', excerpt: 'Introducción a Vue.js para aplicaciones frontend modernas.', tags: ['Vue.js', 'JavaScript', 'Frontend'] },
    { title: '20 herramientas SEO gratuitas', url: '/herramientas-seo-gratuitas', dateLabel: '8 de marzo de 2026', date: '2026-03-08', excerpt: 'Listado práctico de herramientas SEO sin coste para empezar hoy.', tags: ['SEO', 'Herramientas', 'Marketing digital'] },
    { title: 'Guía SEO para pymes en 2026', url: '/guia-seo-pymes-2026', dateLabel: '9 de abril de 2026', date: '2026-04-09', excerpt: 'Plan SEO orientado a negocio para pymes.', tags: ['SEO', 'Pymes', 'Estrategia digital'] },
    { title: 'Checklist de lanzamiento web (marzo 2026)', url: '/checklist-lanzamiento-web-2026', dateLabel: '12 de marzo de 2026', date: '2026-03-12', excerpt: 'Checklist para lanzar una web sin errores críticos.', tags: ['Lanzamiento web', 'SEO'] },
    { title: 'IA generativa y contenidos SEO', url: '/ia-generativa-estrategia-contenidos-seo', dateLabel: '14 de febrero de 2026', date: '2026-02-14', excerpt: 'Uso práctico de IA en estrategia editorial SEO.', tags: ['IA', 'SEO'] },
    { title: 'SEO técnico en 2026: Core Web Vitals', url: '/seo-tecnico-core-web-vitals-2026', dateLabel: '18 de enero de 2026', date: '2026-01-18', excerpt: 'Buenas prácticas de rendimiento e indexabilidad.', tags: ['SEO técnico', 'Core Web Vitals'] },
    { title: 'Contenido y SEO', url: '/contenido-y-seo', dateLabel: '22 de marzo de 2019', date: '2019-03-22', excerpt: 'Cómo alinear contenido y posicionamiento orgánico.', tags: ['SEO', 'Contenido'] },
    { title: 'Backlink, ¿Que és?¿Cómo construir una red de enlaces?', url: '/backlink-que-es-como-construir-red-de-enlaces', dateLabel: '1 de abril de 2019', date: '2019-04-01', excerpt: 'Introducción a backlinks y estrategia de enlaces.', tags: ['SEO', 'Backlinks'] },
    { title: 'Entornos Colaborativos', url: '/entornos-colaborativos', dateLabel: '10 de febrero de 2022', date: '2022-02-10', excerpt: 'Qué son y cómo ayudan a tu empresa.', tags: ['Colaboración'] },
    { title: 'Contador de Caracteres SEO', url: '/contador-caracteres-seo', dateLabel: '14 de febrero de 2018', date: '2018-02-14', excerpt: 'Herramienta para títulos y metadescripciones.', tags: ['Herramientas', 'SEO', 'Contador'] },
    { title: 'Conversor binario', url: '/conversor-binario', dateLabel: '14 de febrero de 2018', date: '2018-02-14', excerpt: 'Conversión de binario a decimal.', tags: ['Herramientas', 'SEO', 'Conversor'] },
    { title: 'Mapa de la Guerra de Ucrania y Rusia', url: '/mapa-guerra-ucrania-rusia', dateLabel: '24 de febrero de 2022', date: '2022-02-24', excerpt: 'Seguimiento visual del conflicto.', tags: ['Experimentos', 'Guerra'] }
  ];

  var COLORS = ['ct-blue', 'ct-purple', 'ct-green', 'ct-red', 'ct-orange', 'ct-yellow'];

  function getTag() {
    var params = new URLSearchParams(window.location.search);
    return (params.get('tag') || '').trim();
  }

  function buildCard(post, index) {
    var article = document.createElement('article');
    article.className = 'ct-box ' + COLORS[index % COLORS.length];
    article.innerHTML = '<div class="ct-box-inner">'
      + '<h3><a href="' + post.url + '">' + post.title + '</a></h3>'
      + '<p class="ct-subline">Por <a href="/sucender">Sucender</a> el <time pubdate="pubdate">' + post.dateLabel + '</time></p>'
      + '<p class="ct-feat-excerpt">' + post.excerpt + '</p>'
      + '<div class="clr"></div>'
      + '</div>';
    return article;
  }

  function renderGrid(posts, list) {
    list.innerHTML = '';
    for (var i = 0; i < posts.length; i += 2) {
      var row = document.createElement('div');
      row.className = 'ct-row';
      row.appendChild(buildCard(posts[i], i));
      if (posts[i + 1]) {
        row.appendChild(buildCard(posts[i + 1], i + 1));
      }
      list.appendChild(row);
    }
  }

  function render() {
    var currentTag = getTag();
    var title = document.querySelector('[data-tag-title]');
    var list = document.querySelector('[data-tag-list]');
    if (!title || !list) return;

    title.textContent = currentTag ? 'Tag: ' + currentTag : 'Tag no indicado';

    if (!currentTag) {
      list.innerHTML = '<div class="ct-row"><article class="ct-box ct-blue"><div class="ct-box-inner"><p>Selecciona un tag desde un artículo para ver contenido relacionado.</p></div></article></div>';
      return;
    }

    var matches = POSTS.filter(function (post) {
      return post.tags.some(function (tag) {
        return tag.toLowerCase() === currentTag.toLowerCase();
      });
    }).sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    if (!matches.length) {
      list.innerHTML = '<div class="ct-row"><article class="ct-box ct-blue"><div class="ct-box-inner"><p>No hay publicaciones asociadas a este tag todavía.</p></div></article></div>';
      return;
    }

    renderGrid(matches, list);
  }

  document.addEventListener('DOMContentLoaded', render);
})();
