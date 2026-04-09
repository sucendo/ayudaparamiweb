(function () {
  var POSTS = [
    { title: 'Guía SEO para pymes en 2026', url: '/guia-seo-pymes-2026', date: '2026-04-09', tags: ['SEO', 'Pymes', 'Estrategia digital'] },
    { title: 'Checklist de lanzamiento web (marzo 2026)', url: '/checklist-lanzamiento-web-2026', date: '2026-03-12', tags: ['Lanzamiento web', 'SEO'] },
    { title: 'IA generativa y contenidos SEO', url: '/ia-generativa-estrategia-contenidos-seo', date: '2026-02-14', tags: ['IA', 'SEO'] },
    { title: 'SEO técnico en 2026: Core Web Vitals', url: '/seo-tecnico-core-web-vitals-2026', date: '2026-01-18', tags: ['SEO técnico', 'Core Web Vitals'] },
    { title: 'Contenido y SEO', url: '/contenido-y-seo', date: '2019-03-22', tags: ['SEO', 'Contenido'] },
    { title: 'Backlink, ¿Que és?¿Cómo construir una red de enlaces?', url: '/backlink-que-es-como-construir-red-de-enlaces', date: '2019-04-01', tags: ['SEO', 'Backlinks'] },
    { title: 'Entornos Colaborativos', url: '/entornos-colaborativos', date: '2022-02-10', tags: ['Colaboración'] },
    { title: 'Contador de Caracteres SEO', url: '/contador-caracteres-seo', date: '2018-02-14', tags: ['Herramientas', 'SEO', 'Contador'] },
    { title: 'Conversor binario', url: '/conversor-binario', date: '2018-02-14', tags: ['Herramientas', 'SEO', 'Conversor'] },
    { title: 'Mapa de la Guerra de Ucrania y Rusia', url: '/mapa-guerra-ucrania-rusia', date: '2022-02-24', tags: ['Experimentos', 'Guerra'] }
  ];

  function getTag() {
    var params = new URLSearchParams(window.location.search);
    return (params.get('tag') || '').trim();
  }

  function render() {
    var currentTag = getTag();
    var title = document.querySelector('[data-tag-title]');
    var list = document.querySelector('[data-tag-list]');
    if (!title || !list) return;

    title.textContent = currentTag ? 'Tag: ' + currentTag : 'Tag no indicado';

    if (!currentTag) {
      list.innerHTML = '<p>Selecciona un tag desde un artículo para ver contenido relacionado.</p>';
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
      list.innerHTML = '<p>No hay publicaciones asociadas a este tag todavía.</p>';
      return;
    }

    list.innerHTML = matches.map(function (post) {
      return '<article class="ct-box ct-blue"><div class="ct-box-inner"><h3><a href="' + post.url + '">' + post.title + '</a></h3></div></article>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', render);
})();
