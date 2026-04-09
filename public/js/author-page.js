(function () {
  var POSTS = [
    { title: 'Guía SEO para pymes en 2026', url: '/guia-seo-pymes-2026', date: '9 de abril de 2026', excerpt: 'Plan SEO orientado a negocio para pymes.' },
    { title: 'Checklist de lanzamiento web (marzo 2026)', url: '/checklist-lanzamiento-web-2026', date: '12 de marzo de 2026', excerpt: 'Checklist para lanzar una web sin errores críticos.' },
    { title: 'IA generativa y contenidos SEO', url: '/ia-generativa-estrategia-contenidos-seo', date: '14 de febrero de 2026', excerpt: 'Uso práctico de IA en estrategia editorial SEO.' },
    { title: 'SEO técnico en 2026: Core Web Vitals', url: '/seo-tecnico-core-web-vitals-2026', date: '18 de enero de 2026', excerpt: 'Buenas prácticas de rendimiento e indexabilidad.' },
    { title: 'Entornos Colaborativos', url: '/entornos-colaborativos', date: '10 de febrero de 2022', excerpt: 'Qué son y cómo ayudan a tu empresa.' },
    { title: 'Backlink, ¿Que és?¿Cómo construir una red de enlaces?', url: '/backlink-que-es-como-construir-red-de-enlaces', date: '1 de abril de 2019', excerpt: 'Introducción a backlinks y estrategia de enlaces.' },
    { title: 'Investigación de palabras clave', url: '/investigacion-palabras-clave', date: '26 de marzo de 2019', excerpt: 'Cómo elegir keywords para posicionar.' },
    { title: 'Contenido y SEO', url: '/contenido-y-seo', date: '22 de marzo de 2019', excerpt: 'Cómo alinear contenido y posicionamiento orgánico.' },
    { title: 'SEO On-Page, aspectos técnicos', url: '/seo-on-page-aspectos-tecnicos', date: '15 de marzo de 2019', excerpt: 'Fundamentos técnicos para mejorar SEO.' },
    { title: 'Motores de búsqueda', url: '/motores-de-busqueda', date: '11 de marzo de 2019', excerpt: 'Cómo funcionan los buscadores.' },
    { title: 'SEO ¿Qué es?', url: '/seo-que-es', date: '1 de marzo de 2019', excerpt: 'Guía introductoria de SEO.' },
    { title: '¿Cómo crear una página Web?', url: '/como-crear-una-pagina-web', date: '7 de febrero de 2019', excerpt: 'Pasos para crear tu web.' },
    { title: 'El mundo del programador Web', url: '/el-mundo-del-programador-web', date: '23 de agosto de 2018', excerpt: 'Experiencia y herramientas de desarrollo.' },
    { title: '¿Que es Bluetooth?', url: '/que-es-bluetooth', date: '21 de agosto de 2018', excerpt: 'Qué es y para qué sirve Bluetooth.' }
  ];

  var COLORS = ['ct-red', 'ct-blue', 'ct-purple', 'ct-green', 'ct-orange', 'ct-yellow'];

  function createCard(post, index) {
    var article = document.createElement('article');
    article.className = 'ct-box ' + COLORS[index % COLORS.length];
    article.innerHTML = '<div class="ct-box-inner">'
      + '<h3><a href="' + post.url + '">' + post.title + '</a></h3>'
      + '<p class="ct-subline">Por <a href="/sucender">Sucender</a> el <time pubdate="pubdate">' + post.date + '</time></p>'
      + '<p class="ct-feat-excerpt">' + post.excerpt + '</p>'
      + '<div class="clr"></div>'
      + '</div>';
    return article;
  }

  function render() {
    var list = document.querySelector('[data-author-list]');
    if (!list) return;

    for (var i = 0; i < POSTS.length; i += 2) {
      var row = document.createElement('div');
      row.className = 'ct-row';
      row.appendChild(createCard(POSTS[i], i));
      if (POSTS[i + 1]) {
        row.appendChild(createCard(POSTS[i + 1], i + 1));
      }
      list.appendChild(row);
    }
  }

  document.addEventListener('DOMContentLoaded', render);
})();
