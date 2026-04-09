(function () {
  var POSTS = [
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
