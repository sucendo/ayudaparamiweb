(function () {
  var COLORS = ['ct-blue', 'ct-purple', 'ct-green', 'ct-red', 'ct-orange', 'ct-yellow'];

  function getTag() {
    var params = new URLSearchParams(window.location.search);
    return (params.get('tag') || '').trim();
  }

  function buildCard(post, index) {
    var article = document.createElement('article');
    article.className = 'ct-box ' + COLORS[index % COLORS.length];
    article.innerHTML = '<div class="ct-box-inner">'
      + '<h3><a href="' + post.path + '">' + post.title + '</a></h3>'
      + '<p class="ct-subline">Por <a href="/' + encodeURIComponent((post.author || 'sucender').toLowerCase()) + '">' + (post.author || 'Sucender') + '</a> el <time pubdate="pubdate">' + (post.displayDate || '') + '</time></p>'
      + '<p class="ct-feat-excerpt">' + (post.excerpt || '') + '</p>'
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
    return fetch('data/content-index.json')
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
    var list = document.querySelector('[data-tag-list]');
    if (!title || !list) return;

    title.textContent = currentTag ? 'Tag: ' + currentTag : 'Tag no indicado';

    if (!currentTag) {
      list.innerHTML = '<div class="ct-row"><article class="ct-box ct-blue"><div class="ct-box-inner"><p>Selecciona un tag desde un artículo para ver contenido relacionado.</p></div></article></div>';
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
      list.innerHTML = '<div class="ct-row"><article class="ct-box ct-blue"><div class="ct-box-inner"><p>No hay publicaciones asociadas a este tag todavía.</p></div></article></div>';
      return;
    }

    renderGrid(matches, list);
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadContentIndex().then(render);
  });
})();
