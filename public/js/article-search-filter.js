(function() {
  var params = new URLSearchParams(window.location.search);
  var rawQuery = (params.get('q') || params.get('s') || '').trim();

  if (!rawQuery) {
    return;
  }

  var normalizedQuery = rawQuery.toLowerCase();
  var archiveContainer = document.querySelector('.ct-archive-container');

  if (!archiveContainer) {
    return;
  }

  var resultTitle = document.querySelector('.ct-archive h1');
  if (resultTitle) {
    resultTitle.textContent = 'Resultados de búsqueda';
  }

  var articleCards = Array.prototype.slice.call(archiveContainer.querySelectorAll('article.ct-box'));
  var visibleArticles = 0;

  articleCards.forEach(function(card) {
    var text = (card.textContent || '').toLowerCase();
    var matches = text.indexOf(normalizedQuery) !== -1;

    card.style.display = matches ? '' : 'none';

    if (matches) {
      visibleArticles += 1;
    }
  });

  var rows = Array.prototype.slice.call(archiveContainer.querySelectorAll('.ct-row'));
  rows.forEach(function(row) {
    var hasVisibleArticle = Array.prototype.slice
      .call(row.querySelectorAll('article.ct-box'))
      .some(function(card) {
        return card.style.display !== 'none';
      });

    row.style.display = hasVisibleArticle ? '' : 'none';
  });

  var info = document.createElement('div');
  info.className = 'ct-cat-desc';

  if (visibleArticles > 0) {
    info.innerHTML = '<p>Mostrando <strong>' + visibleArticles + '</strong> resultado(s) para <strong>"' + rawQuery + '"</strong>.</p>';
  } else {
    info.innerHTML = '<p>No se encontraron artículos para <strong>"' + rawQuery + '"</strong>.</p>';
  }

  archiveContainer.parentNode.insertBefore(info, archiveContainer);

  var searchInput = document.getElementById('s');
  if (searchInput) {
    searchInput.value = rawQuery;
  }
})();
