(function () {
  var RELATED_LIMIT = 4;
  var SUPPORTED_TONES = ['ct-purple', 'ct-blue', 'ct-green', 'ct-red', 'ct-orange', 'ct-yellow'];

  function normalize(text) {
    return (text || '').toString().trim().toLowerCase();
  }

  function getCurrentPath() {
    var path = window.location.pathname || '/';
    return path.length > 1 ? path.replace(/\/+$/, '') : path;
  }

  function extractTagAnchors() {
    return Array.prototype.slice.call(document.querySelectorAll('.ct-tags a[rel="tag"]'));
  }

  function rewriteTagLinks() {
    extractTagAnchors().forEach(function (anchor) {
      var tag = (anchor.textContent || '').trim();
      if (!tag) return;
      anchor.setAttribute('href', '/tags?tag=' + encodeURIComponent(tag));
    });
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

  function buildRelated(currentPost, posts) {
    var currentTags = (currentPost.tags || []).map(normalize).filter(Boolean);

    return posts
      .filter(function (post) {
        return post.path !== currentPost.path;
      })
      .map(function (post) {
        var tags = (post.tags || []).map(normalize);
        var commonTags = tags.filter(function (tag) {
          return currentTags.indexOf(tag) !== -1;
        }).length;
        var sameCategory = post.category === currentPost.category ? 1 : 0;
        var score = commonTags * 3 + sameCategory;
        return { post: post, score: score, commonTags: commonTags };
      })
      .filter(function (item) {
        return item.score > 0;
      })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.post.date) - new Date(a.post.date);
      })
      .slice(0, RELATED_LIMIT)
      .map(function (item) {
        return item.post;
      });
  }

  function resolveArticleToneClass() {
    var mainPost = document.querySelector('.ct-main.ct-main-post');
    var toneFromData = mainPost && mainPost.getAttribute('data-article-tone');
    if (SUPPORTED_TONES.indexOf(toneFromData) !== -1) return toneFromData;

    var authorBox = document.querySelector('.ct-author-info.ct-box');
    if (!authorBox) return 'ct-purple';

    var classNames = authorBox.className.split(/\s+/);
    for (var i = 0; i < classNames.length; i += 1) {
      if (SUPPORTED_TONES.indexOf(classNames[i]) !== -1) return classNames[i];
    }

    return 'ct-purple';
  }

  function createRelatedSection(relatedPosts, toneClass) {
    var wrapper = document.createElement('div');
    wrapper.className = 'ct-row';

    var box = document.createElement('article');
    box.className = 'ct-box ' + toneClass;

    var items = relatedPosts.map(function (post) {
      return '<li><a href="' + post.path + '">' + post.title + '</a></li>';
    }).join('');

    box.innerHTML = '<div class="ct-box-inner">'
      + '<h3>Artículos relacionados</h3>'
      + '<p class="ct-feat-excerpt">Lecturas recomendadas por temática y categoría:</p>'
      + '<ul class="ct-related-links">' + items + '</ul>'
      + '</div>';

    wrapper.appendChild(box);
    return wrapper;
  }

  function renderRelated(posts) {
    var currentPath = getCurrentPath();
    var currentPost = posts.find(function (post) {
      return post.path === currentPath;
    });

    if (!currentPost) return;

    var relatedPosts = buildRelated(currentPost, posts);
    if (!relatedPosts.length) return;

    var tagsBlock = document.querySelector('.ct-tags');
    if (!tagsBlock || !tagsBlock.parentNode) return;

    if (document.querySelector('[data-related-posts]')) return;

    var relatedSection = createRelatedSection(relatedPosts, resolveArticleToneClass());
    relatedSection.setAttribute('data-related-posts', 'true');
    tagsBlock.parentNode.insertBefore(relatedSection, tagsBlock.nextSibling);
  }

  document.addEventListener('DOMContentLoaded', function () {
    rewriteTagLinks();
    loadContentIndex().then(renderRelated);
  });
})();
