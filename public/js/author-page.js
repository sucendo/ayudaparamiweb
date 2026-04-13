(function () {
  var COLORS = ['ct-red', 'ct-blue', 'ct-purple', 'ct-green', 'ct-orange', 'ct-yellow'];

  function normalizeSlug(value) {
    return (value || '').toLowerCase().trim().replace(/\s+/g, '-');
  }

  function createCard(post, index) {
    var article = document.createElement('article');
    article.className = 'ct-box ' + COLORS[index % COLORS.length];
    article.innerHTML = '<div class="ct-box-inner">'
      + '<h3><a href="' + post.path + '">' + post.title + '</a></h3>'
      + '<p class="ct-subline">Por <a href="/' + normalizeSlug(post.author || 'Sucender') + '">' + (post.author || 'Sucender') + '</a> el <time pubdate="pubdate">' + (post.displayDate || '') + '</time></p>'
      + '<p class="ct-feat-excerpt">' + (post.excerpt || '') + '</p>'
      + '<div class="clr"></div>'
      + '</div>';
    return article;
  }

  function inferAuthorFromPath() {
    var path = window.location.pathname.replace(/\/+$/, '');
    var segments = path.split('/').filter(Boolean);
    return segments.length ? segments[segments.length - 1] : 'sucender';
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
    var list = document.querySelector('[data-author-list]');
    if (!list) return;

    var authorSlug = inferAuthorFromPath();
    var authorPosts = posts
      .filter(function (post) {
        return normalizeSlug(post.author || 'sucender') === authorSlug;
      })
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

    if (!authorPosts.length) {
      list.innerHTML = '<div class="ct-row"><article class="ct-box ct-blue"><div class="ct-box-inner"><p>Este autor todavía no tiene publicaciones visibles.</p></div></article></div>';
      return;
    }

    for (var i = 0; i < authorPosts.length; i += 2) {
      var row = document.createElement('div');
      row.className = 'ct-row';
      row.appendChild(createCard(authorPosts[i], i));
      if (authorPosts[i + 1]) {
        row.appendChild(createCard(authorPosts[i + 1], i + 1));
      }
      list.appendChild(row);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadContentIndex().then(render);
  });
})();
