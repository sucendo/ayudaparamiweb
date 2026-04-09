(function() {
  var form = document.getElementById('seo-analyzer-form');
  if (!form) {
    return;
  }

  var input = document.getElementById('seo-url');
  var apiInput = document.getElementById('seo-api-endpoint');
  var state = document.getElementById('seo-state');
  var reportContainer = document.getElementById('seo-report');
  var button = form.querySelector('button');
  var defaultApiEndpoint = '/api/seo-analyze';

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function statusBadge(level, text) {
    return '<span class="seo-badge seo-badge--' + level + '">' + escapeHtml(text) + '</span>';
  }

  function renderList(items) {
    if (!items || !items.length) {
      return '<p>Sin elementos detectados.</p>';
    }

    return '<ul class="seo-list">' + items.map(function(item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('') + '</ul>';
  }

  function classifyScore(score) {
    if (score >= 80) return { label: 'Buen estado', type: 'ok' };
    if (score >= 60) return { label: 'Mejorable', type: 'warning' };
    return { label: 'Prioritario', type: 'error' };
  }

  function getApiEndpoint() {
    var fromWindow = window.__SEO_ANALYZER_API_BASE__;
    var fromInput = apiInput ? (apiInput.value || '').trim() : '';
    var fromStorage = window.localStorage ? (window.localStorage.getItem('seoAnalyzerApiEndpoint') || '').trim() : '';
    var endpoint = fromInput || fromWindow || fromStorage || defaultApiEndpoint;

    if (window.localStorage && fromInput) {
      window.localStorage.setItem('seoAnalyzerApiEndpoint', fromInput);
    }

    return endpoint;
  }

  if (apiInput && window.localStorage) {
    var savedEndpoint = window.localStorage.getItem('seoAnalyzerApiEndpoint');
    if (savedEndpoint) {
      apiInput.value = savedEndpoint;
    }
  }

  function renderReport(report) {
    var scoreState = classifyScore(report.scores.overall);
    var blocks = report.scores.byBlock;

    var html = '';
    html += '<section class="seo-card seo-report__header">';
    html += '<div><h2>Resumen ejecutivo</h2><p>URL final: <strong>' + escapeHtml(report.crawl.finalUrl) + '</strong></p><p>Estado HTTP: ' + escapeHtml(report.crawl.status) + ' · Tiempo: ' + escapeHtml(report.crawl.elapsedMs) + ' ms</p></div>';
    html += '<div><div class="seo-score">' + escapeHtml(report.scores.overall) + '/100</div>' + statusBadge(scoreState.type, scoreState.label) + '<p>Puntuación SEO orientativa general.</p></div>';
    html += '<div><h3>Subpuntuaciones</h3><ul class="seo-list"><li>Indexabilidad: ' + escapeHtml(blocks.indexabilidad) + '</li><li>Metadatos: ' + escapeHtml(blocks.metadatos) + '</li><li>Contenido: ' + escapeHtml(blocks.contenido) + '</li><li>Imágenes: ' + escapeHtml(blocks.imagenes) + '</li><li>Enlazado: ' + escapeHtml(blocks.enlazado) + '</li><li>Social/schema: ' + escapeHtml(blocks.socialSchema) + '</li></ul></div>';
    html += '</section>';

    html += '<section class="seo-card"><h3>Recomendaciones priorizadas</h3>';
    html += '<p>' + statusBadge('error', 'Críticas') + statusBadge('warning', 'Importantes') + statusBadge('ok', 'Mejoras recomendadas') + '</p>';
    html += '<div class="seo-grid">';
    html += '<div><strong>Críticas</strong>' + renderList(report.recommendations.critical) + '</div>';
    html += '<div><strong>Importantes</strong>' + renderList(report.recommendations.important) + '</div>';
    html += '<div><strong>Mejoras recomendadas</strong>' + renderList(report.recommendations.recommended) + '</div>';
    html += '</div></section>';

    html += '<details class="seo-card" open><summary>SEO on-page principal</summary>';
    html += '<ul class="seo-list"><li>Title (' + escapeHtml(report.onPage.titleLength) + '): ' + escapeHtml(report.onPage.title || 'No detectado') + '</li><li>Meta description (' + escapeHtml(report.onPage.metaDescriptionLength) + '): ' + escapeHtml(report.onPage.metaDescription || 'No detectada') + '</li><li>Canonical: ' + escapeHtml(report.onPage.canonical || 'No detectada') + '</li><li>Meta robots: ' + escapeHtml(report.onPage.metaRobots || 'No detectada') + '</li><li>Lang: ' + escapeHtml(report.onPage.lang || 'No detectado') + '</li><li>Viewport: ' + escapeHtml(report.onPage.viewport || 'No detectado') + '</li></ul>';
    html += '</details>';

    html += '<details class="seo-card"><summary>Contenido y jerarquía</summary>';
    html += '<ul class="seo-list"><li>H1: ' + escapeHtml(report.content.h1Count) + ' (' + escapeHtml(report.content.h1Main || 'No detectado') + ')</li><li>H2: ' + escapeHtml(report.content.h2.length) + '</li><li>H3: ' + escapeHtml(report.content.h3.length) + '</li><li>Palabras visibles aprox.: ' + escapeHtml(report.content.visibleWordCount) + '</li><li>Keyword sugerida: ' + escapeHtml(report.content.suggestedMainKeyword || 'No estimable') + '</li></ul>';
    html += '<h4>Problemas de jerarquía</h4>' + renderList(report.content.headingIssues);
    html += '<h4>Términos frecuentes</h4>' + renderList((report.content.topTerms || []).map(function(item) { return item.term + ' (' + item.count + ')'; }));
    html += '</details>';

    html += '<details class="seo-card"><summary>Imágenes y enlaces</summary>';
    html += '<ul class="seo-list"><li>Imágenes totales: ' + escapeHtml(report.images.total) + '</li><li>Con alt: ' + escapeHtml(report.images.withAlt) + '</li><li>Sin alt: ' + escapeHtml(report.images.withoutAlt) + '</li><li>Posibles pesadas: ' + escapeHtml(report.images.possibleHeavy) + '</li><li>Enlaces internos: ' + escapeHtml(report.links.internal) + '</li><li>Enlaces externos: ' + escapeHtml(report.links.external) + '</li><li>Anchors débiles: ' + escapeHtml(report.links.weakAnchorCount) + '</li></ul>';
    html += '<h4>Problemas de imágenes</h4>' + renderList(report.images.problems);
    html += '</details>';

    html += '<details class="seo-card"><summary>Social, schema e indexabilidad</summary>';
    html += '<ul class="seo-list"><li>Open Graph title: ' + escapeHtml(report.social.openGraph.title || 'No detectado') + '</li><li>Open Graph description: ' + escapeHtml(report.social.openGraph.description || 'No detectado') + '</li><li>Twitter card: ' + escapeHtml(report.social.twitter.card || 'No detectado') + '</li><li>JSON-LD detectados: ' + escapeHtml(report.social.structuredData.jsonLdCount) + '</li><li>Schema microdata: ' + escapeHtml(report.social.structuredData.schemaOrgMicrodata ? 'Sí' : 'No') + '</li><li>Favicon: ' + escapeHtml(report.social.favicon || 'No detectado') + '</li></ul>';
    html += '<h4>Notas</h4>' + renderList(report.notes);
    html += '</details>';

    reportContainer.innerHTML = html;
    reportContainer.hidden = false;
  }

  function setState(type, message) {
    state.className = 'seo-tool__state';
    if (type) {
      state.classList.add('seo-state--' + type);
    }
    state.textContent = message || '';
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var url = (input.value || '').trim();
    if (!url) {
      setState('error', 'Introduce una URL válida para comenzar el análisis.');
      reportContainer.hidden = true;
      return;
    }

    button.disabled = true;
    reportContainer.hidden = true;
    setState('loading', 'Analizando URL... esto puede tardar unos segundos.');

    var endpoint = getApiEndpoint();
    var requestUrl = endpoint + (endpoint.indexOf('?') === -1 ? '?' : '&') + 'url=' + encodeURIComponent(url);

    fetch(requestUrl, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(function(response) {
        var contentType = (response.headers.get('content-type') || '').toLowerCase();

        if (contentType.indexOf('application/json') === -1) {
          return response.text().then(function(rawBody) {
            var sample = (rawBody || '').slice(0, 80).replace(/\s+/g, ' ');
            var looksLikeHtml = sample.toLowerCase().indexOf('<!doctype') !== -1 || sample.indexOf('<html') !== -1;
            var message = looksLikeHtml
              ? 'El endpoint devolvió HTML en lugar de JSON. Si estás en hosting estático (GitHub Pages), configura un backend/serverless en “Configuración avanzada (API)”.'
              : 'El endpoint no devolvió JSON válido.';

            throw new Error(message + ' Estado HTTP: ' + response.status + '.');
          });
        }

        return response.json().then(function(payload) {
          return { status: response.status, payload: payload };
        });
      })
      .then(function(result) {
        if (!result.payload.ok) {
          throw new Error(result.payload.error || 'No se pudo generar el informe SEO.');
        }

        setState('', 'Análisis completado correctamente.');
        renderReport(result.payload.report);
      })
      .catch(function(error) {
        setState('error', error.message || 'Error inesperado analizando la URL.');
      })
      .finally(function() {
        button.disabled = false;
      });
  });
})();
