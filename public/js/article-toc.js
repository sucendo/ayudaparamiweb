(function () {
  'use strict';

  document.addEventListener('click', function (event) {
    var link = event.target.closest('.article-toc a[href*="#"]');
    if (!link) return;

    var rawHref = link.getAttribute('href') || '';
    var hashIndex = rawHref.indexOf('#');
    if (hashIndex === -1) return;

    var hash = rawHref.slice(hashIndex + 1);
    if (!hash) return;

    var id;
    try {
      id = decodeURIComponent(hash);
    } catch (error) {
      id = hash;
    }

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
