(function () {
  var COLORS = ['ct-blue', 'ct-purple', 'ct-green', 'ct-red', 'ct-orange', 'ct-yellow'];

  function getTag() {
    var params = new URLSearchParams(window.location.search);
    return (params.get('tag') || '').trim();
  }

  function normalizeSlug(value) {
    return (value || '').toLowerCase().trim().replace(/\s+/g, '-');
  }

  function buildCard(post, index) {
    var article = document.createElement('article');
    article.className = 'ct-box ' + (post.colorClass || COLORS[index % COLORS.length]) + ' ct-card-auto';

    var sectionLabel = (post.categoryLabel || post.category || '').toString().toUpperCase();

    article.innerHTML = '<div class="ct-box-inner">'
      + '<h3><a href="' + post.path + '">' + post.title + '</a></h3>'
      + '<p class="ct-subline">Por <a href="/' + normalizeSlug(post.author || 'Sucender') + '">' + (post.author || 'Sucender') + '</a>'
      + ' · Publicado el <time>' + (post.displayPublishedDate || post.publishedDate || post.displayDate || post.date || '') + '</time>'
      + ((post.hasModifiedDate && (post.displayModifiedDate || post.modifiedDate))
        ? ' · Actualizado el <time>' + (post.displayModifiedDate || post.modifiedDate) + '</time>'
        : '')
      + '</p>'
      + '<p class="ct-feat-excerpt">' + (post.excerpt || '') + '</p>'
      + (sectionLabel ? '<p class="ct-card-auto__section">' + sectionLabel + '</p>' : '')
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

  function loadContentIndex() {
    return fetch('/data/content-index.json')
      .then(function (response) {
        if (!response.ok) throw new Error('No se pudo cargar data/content-index.json');
        return response.json();
      })
      .catch(function () {
        return fetch('/api/content-index').then(function (response) {
          if (!response.ok) throw new Error('No se pudo cargar /api/content-index');
          return response.json();
        });
      })
      .catch(function () {
        return [];
      });
  }

  function render(posts) {
    var currentTag = getTag();
    var title = document.querySelector('[data-tag-title]');
    var description = document.querySelector('[data-tag-description]');
    var list = document.querySelector('[data-tag-list]');
    if (!title || !list) return;

    title.textContent = currentTag ? currentTag : 'Explorar por tag';

    if (!currentTag) {
      if (description) description.textContent = 'Selecciona una etiqueta desde cualquier artículo para consultar contenidos relacionados.';
      list.innerHTML = '<div class="ct-row"><article class="ct-box ct-blue ct-card-auto tags-empty-card"><div class="ct-box-inner"><h3>Elige un tema</h3><p class="ct-feat-excerpt">Abre cualquier artículo y utiliza una de sus etiquetas para ver aquí otros contenidos sobre el mismo tema.</p></div></article></div>';
      return;
    }

    var matches = posts.filter(function (post) {
      return Array.isArray(post.tags) && post.tags.some(function (tag) {
        return tag.toLowerCase() === currentTag.toLowerCase();
      });
    }).sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    if (!matches.length) {
      if (description) description.textContent = 'No hemos encontrado publicaciones asociadas a esta etiqueta.';
      list.innerHTML = '<div class="ct-row"><article class="ct-box ct-blue ct-card-auto tags-empty-card"><div class="ct-box-inner"><h3>Sin resultados</h3><p class="ct-feat-excerpt">Todavía no hay contenidos publicados con esta etiqueta.</p></div></article></div>';
      return;
    }

    if (description) {
      description.textContent = matches.length === 1
        ? '1 contenido relacionado con esta etiqueta.'
        : matches.length + ' contenidos relacionados con esta etiqueta.';
    }

    renderGrid(matches, list);
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadContentIndex().then(render);
  });
})();
