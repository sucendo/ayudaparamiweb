(function () {
  'use strict';

  document.addEventListener('click', function (event) {
    var link = event.target.closest('.article-toc a[href*="#"]');
    if (!link) return;

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }

    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) {
      return;
    }

    var id = decodeURIComponent(url.hash.slice(1));
    if (!id) return;

    var target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });

    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search + '#' + encodeURIComponent(id));
    }
  });
})();
