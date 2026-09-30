(function() {
  var form = document.getElementById('seo-analyzer-form');
  if (!form) return;

  var urlInput = document.getElementById('seo-url');
  var htmlInput = document.getElementById('seo-html-source');
  var loadButton = document.getElementById('seo-load-url');
  var submitButton = form.querySelector('button[type="submit"]');
  var state = document.getElementById('seo-state');
  var reportContainer = document.getElementById('seo-report');

  var STOPWORDS = {
    de: 1, la: 1, que: 1, el: 1, en: 1, y: 1, a: 1, los: 1, del: 1, se: 1, las: 1, por: 1,
    un: 1, para: 1, con: 1, una: 1, su: 1, al: 1, es: 1, lo: 1, como: 1, más: 1, o: 1,
    the: 1, and: 1, for: 1, this: 1, that: 1, from: 1, with: 1
  };

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function setState(type, message) {
    state.className = 'seo-tool__state';
    if (type) state.classList.add('seo-state--' + type);
    state.textContent = message || '';
  }

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function getMeta(doc, name) {
    var node = doc.querySelector('meta[name="' + name + '"]');
    return normalize(node ? node.getAttribute('content') : '');
  }

  function getTopTerms(text) {
    var terms = (text.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) || []);
    var freq = {};

    terms.forEach(function(term) {
      if (STOPWORDS[term]) return;
      freq[term] = (freq[term] || 0) + 1;
    });

    return Object.keys(freq)
      .map(function(key) { return { term: key, count: freq[key] }; })
      .sort(function(a, b) { return b.count - a.count; })
      .slice(0, 10);
  }

  function analyzeHtml(rawHtml) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(rawHtml, 'text/html');

    var bodyText = normalize(doc.body ? doc.body.innerText : '');
    var h1 = Array.prototype.map.call(doc.querySelectorAll('h1'), function(n) { return normalize(n.textContent); });
    var h2 = Array.prototype.map.call(doc.querySelectorAll('h2'), function(n) { return normalize(n.textContent); });
    var h3 = Array.prototype.map.call(doc.querySelectorAll('h3'), function(n) { return normalize(n.textContent); });
    var images = Array.prototype.slice.call(doc.querySelectorAll('img'));
    var links = Array.prototype.slice.call(doc.querySelectorAll('a[href]'));

    var words = (bodyText.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []).length;
    var topTerms = getTopTerms(bodyText);
    var weakAnchors = links.filter(function(link) {
      var text = normalize(link.textContent).toLowerCase();
      return !text || text === 'haz clic aquí' || text === 'click here' || text === 'leer más';
    });

    return {
      onPage: {
        title: normalize(doc.title),
        titleLength: normalize(doc.title).length,
        metaDescription: getMeta(doc, 'description'),
        metaDescriptionLength: getMeta(doc, 'description').length,
        canonical: normalize((doc.querySelector('link[rel="canonical"]') || {}).href || ''),
        robots: getMeta(doc, 'robots'),
        lang: normalize((doc.documentElement || {}).lang || ''),
        viewport: getMeta(doc, 'viewport')
      },
      content: {
        h1Count: h1.length,
        h1Main: h1[0] || '',
        h2Count: h2.length,
        h3Count: h3.length,
        words: words,
        topTerms: topTerms,
        suggestedKeyword: topTerms[0] ? topTerms[0].term : ''
      },
      images: {
        total: images.length,
        withAlt: images.filter(function(img) { return normalize(img.alt); }).length,
        withoutAlt: images.filter(function(img) { return !normalize(img.alt); }).length
      },
      links: {
        total: links.length,
        weakAnchorCount: weakAnchors.length
      },
      authority: {
        domainAuthority: 'No disponible sin API externa',
        pageAuthority: 'No disponible sin API externa',
        citationFlow: 'No disponible sin API externa',
        trustFlow: 'No disponible sin API externa',
        backlinks: 'No disponible sin API externa'
      }
    };
  }

  function renderList(items) {
    if (!items || !items.length) return '<p>Sin datos.</p>';
    return '<ul class="seo-list">' + items.map(function(item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('') + '</ul>';
  }

  function renderReport(data) {
    var html = '';
    html += '<section class="seo-card seo-report__header">';
    html += '<div><h2>Resumen</h2><p><strong>Title:</strong> ' + escapeHtml(data.onPage.title || 'No detectado') + '</p><p><strong>Description:</strong> ' + escapeHtml(data.onPage.metaDescription || 'No detectada') + '</p></div>';
    html += '<div><h3>Contenido</h3><ul class="seo-list"><li>H1: ' + escapeHtml(data.content.h1Count) + '</li><li>H2: ' + escapeHtml(data.content.h2Count) + '</li><li>H3: ' + escapeHtml(data.content.h3Count) + '</li><li>Palabras: ' + escapeHtml(data.content.words) + '</li><li>Keyword sugerida: ' + escapeHtml(data.content.suggestedKeyword || 'N/A') + '</li></ul></div>';
    html += '<div><h3>Imágenes y enlaces</h3><ul class="seo-list"><li>Imágenes: ' + escapeHtml(data.images.total) + ' (sin alt: ' + escapeHtml(data.images.withoutAlt) + ')</li><li>Enlaces totales: ' + escapeHtml(data.links.total) + '</li><li>Anchors débiles: ' + escapeHtml(data.links.weakAnchorCount) + '</li></ul></div>';
    html += '</section>';

    html += '<section class="seo-card"><h3>Términos frecuentes</h3>';
    html += renderList(data.content.topTerms.map(function(t) { return t.term + ' (' + t.count + ')'; }));
    html += '</section>';

    html += '<section class="seo-card"><h3>Métricas de autoridad/backlinks</h3>';
    html += '<ul class="seo-list">';
    html += '<li>Domain Authority: ' + escapeHtml(data.authority.domainAuthority) + '</li>';
    html += '<li>Page Authority: ' + escapeHtml(data.authority.pageAuthority) + '</li>';
    html += '<li>Citation Flow: ' + escapeHtml(data.authority.citationFlow) + '</li>';
    html += '<li>Trust Flow: ' + escapeHtml(data.authority.trustFlow) + '</li>';
    html += '<li>Backlinks: ' + escapeHtml(data.authority.backlinks) + '</li>';
    html += '</ul></section>';

    reportContainer.innerHTML = html;
    reportContainer.hidden = false;
  }

  loadButton.addEventListener('click', function() {
    var url = normalize(urlInput.value);
    if (!url) {
      setState('error', 'Introduce una URL para intentar cargar su HTML.');
      return;
    }

    loadButton.disabled = true;
    setState('loading', 'Intentando descargar HTML desde la URL...');

    fetch(url)
      .then(function(response) { return response.text(); })
      .then(function(html) {
        htmlInput.value = html;
        setState('', 'HTML cargado correctamente. Ya puedes analizar.');
      })
      .catch(function() {
        setState('error', 'No se pudo cargar la URL por CORS o bloqueo del servidor. Pega el HTML manualmente.');
      })
      .finally(function() {
        loadButton.disabled = false;
      });
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var rawHtml = normalize(htmlInput.value);
    if (!rawHtml) {
      setState('error', 'Pega el HTML para ejecutar el análisis on-page.');
      return;
    }

    submitButton.disabled = true;
    setState('loading', 'Analizando HTML...');

    try {
      var result = analyzeHtml(rawHtml);
      renderReport(result);
      setState('', 'Análisis completado.');
    } catch (error) {
      setState('error', 'No se pudo analizar el HTML proporcionado.');
    } finally {
      submitButton.disabled = false;
    }
  });
})();
