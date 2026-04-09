(function () {
  function slugTag(value) {
    return encodeURIComponent((value || '').trim());
  }

  function rewriteTagLinks() {
    var tagLinks = document.querySelectorAll('.ct-tags a[rel="tag"]');
    tagLinks.forEach(function (link) {
      var tag = link.textContent || '';
      if (!tag.trim()) return;
      link.setAttribute('href', '/tags?tag=' + slugTag(tag));
    });
  }

  function rewriteAuthorLinks() {
    var authorLinks = document.querySelectorAll('a[rel="author"], .ct-subline a');
    authorLinks.forEach(function (link) {
      var text = (link.textContent || '').trim().toLowerCase();
      if (text === 'sucender') {
        link.setAttribute('href', '/sucender');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    rewriteTagLinks();
    rewriteAuthorLinks();
  });
})();
