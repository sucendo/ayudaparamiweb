(function() {
  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getSearchQuery() {
    var params = new URLSearchParams(window.location.search);
    return (params.get('q') || params.get('s') || '').trim();
  }

  function cardMarkup(item, categories) {
    var categoryLabel = categories[item.category] ? categories[item.category].name.toUpperCase() : (item.category || 'CONTENIDO');
    return '' +
      '<article class="ct-box ' + escapeHtml(item.colorClass || 'ct-red') + ' ct-card-auto">' +
        '<div class="ct-box-inner">' +
          '<h3><a href="' + escapeHtml(item.path || '#') + '">' + escapeHtml(item.title || 'Sin título') + '</a></h3>' +
          '<p class="ct-subline">Por <a href="/sucender">Sucender</a> · Publicado el <time pubdate="pubdate">' + escapeHtml(item.displayPublishedDate || item.displayDate || '') + '</time></p>' +
          '<p class="ct-feat-excerpt">' + escapeHtml(item.excerpt || '') + '</p>' +
          '<p class="ct-card-auto__section">' + escapeHtml(categoryLabel) + '</p>' +
          '<div class="clr"></div>' +
        '</div>' +
      '</article>';
  }

  function renderResults(items, categories, query) {
    var container = document.getElementById('search-results-container');
    var status = document.getElementById('search-status-text');
    if (!container || !status) return;

    if (!query) {
      status.innerHTML = 'Escribe un término para buscar contenido en la web.';
      container.innerHTML = '<div class="ct-row"><article class="ct-box ct-red"><div class="ct-box-inner"><h3>Empieza escribiendo para buscar.</h3></div></article></div>';
      return;
    }

    if (!items.length) {
      status.innerHTML = 'No se han encontrado resultados para <strong>"' + escapeHtml(query) + '"</strong>.';
      container.innerHTML = '<div class="ct-row"><article class="ct-box ct-red"><div class="ct-box-inner"><h3>Sin resultados</h3><p>Prueba con otro término relacionado.</p></div></article></div>';
      return;
    }

    status.innerHTML = 'Mostrando <strong>' + items.length + '</strong> resultado(s) para <strong>"' + escapeHtml(query) + '"</strong>.';

    var html = '';
    items.forEach(function(item, index) {
      if (index % 2 === 0) html += '<div class="ct-row">';
      html += cardMarkup(item, categories);
      if (index % 2 === 1 || index === items.length - 1) html += '</div>';
    });

    container.innerHTML = html;
  }

  function filterItems(items, query) {
    var normalizedQuery = normalize(query).trim();
    if (!normalizedQuery) return [];

    return items.filter(function(item) {
      var haystack = [
        item.title,
        item.excerpt,
        item.path,
        item.category,
        (item.tags || []).join(' ')
      ].map(normalize).join(' ');

      return haystack.indexOf(normalizedQuery) !== -1;
    });
  }

  async function loadIndex() {
    var bootstrap = window.__SEARCH_BOOTSTRAP__ || {};
    var bootstrapResults = Array.isArray(bootstrap.results) ? bootstrap.results : [];
    if (bootstrapResults.length > 0) return bootstrapResults;

    try {
      var staticResponse = await fetch('/data/content-index.json', { credentials: 'same-origin' });
      if (staticResponse.ok) return await staticResponse.json();
    } catch (error) {}

    try {
      var apiResponse = await fetch('/api/content-index', { credentials: 'same-origin' });
      if (apiResponse.ok) return await apiResponse.json();
    } catch (error) {}

    return bootstrapResults;
  }

  function updateUrlQuery(query) {
    var url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    url.searchParams.delete('s');
    window.history.replaceState({}, '', url.toString());
  }

  async function init() {
    var input = document.getElementById('search-page-input');
    if (!input) return;

    var categories = (window.__SEARCH_BOOTSTRAP__ && window.__SEARCH_BOOTSTRAP__.categories) || {};
    var allItems = await loadIndex();
    var initialQuery = input.value || getSearchQuery();
    renderResults(filterItems(allItems, initialQuery), categories, initialQuery);

    input.addEventListener('input', function() {
      var query = input.value.trim();
      updateUrlQuery(query);
      renderResults(filterItems(allItems, query), categories, query);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
