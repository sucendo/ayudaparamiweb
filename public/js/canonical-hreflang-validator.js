(function () {
  var mount = document.getElementById('canonical-hreflang-validator-app');
  if (!mount) return;

  mount.innerHTML = [
    '<div class="chv-tool">',
    '  <section class="chv-tool__input">',
    '    <div class="chv-field">',
    '      <label for="chv-page-url">URL de la página <span>(opcional, para resolver rutas relativas)</span></label>',
    '      <input id="chv-page-url" type="url" placeholder="https://www.ejemplo.com/es/pagina">',
    '    </div>',
    '    <div class="chv-field">',
    '      <label for="chv-html">HTML de la página</label>',
    '      <textarea id="chv-html" rows="13" placeholder="Pega aquí el HTML completo o al menos el contenido de &lt;head&gt;..."></textarea>',
    '    </div>',
    '    <div class="chv-actions">',
    '      <button type="button" id="chv-analyze">Analizar etiquetas</button>',
    '      <button type="button" id="chv-example" class="chv-secondary">Cargar ejemplo</button>',
    '      <button type="button" id="chv-clear" class="chv-secondary">Limpiar</button>',
    '    </div>',
    '  </section>',
    '  <section class="chv-tool__result">',
    '    <div class="chv-summary" id="chv-summary">',
    '      <div><strong id="chv-score">—</strong><span>Estado</span></div>',
    '      <div><strong id="chv-canonical-count">0</strong><span>Canonical</span></div>',
    '      <div><strong id="chv-hreflang-count">0</strong><span>Hreflang</span></div>',
    '      <div><strong id="chv-issues-count">0</strong><span>Avisos</span></div>',
    '    </div>',
    '    <div id="chv-state" class="chv-state">Pega un HTML y pulsa “Analizar etiquetas”.</div>',
    '    <div id="chv-canonical-panel" class="chv-panel" hidden>',
    '      <h3>Canonical detectada</h3>',
    '      <div id="chv-canonical-value" class="chv-code"></div>',
    '    </div>',
    '    <div id="chv-hreflang-panel" class="chv-panel" hidden>',
    '      <h3>Variantes hreflang</h3>',
    '      <div class="chv-table-wrap"><table><thead><tr><th>hreflang</th><th>URL</th><th>Estado</th></tr></thead><tbody id="chv-hreflang-body"></tbody></table></div>',
    '    </div>',
    '    <div id="chv-issues-panel" class="chv-panel" hidden>',
    '      <h3>Avisos y comprobaciones</h3>',
    '      <ul id="chv-issues" class="chv-issues"></ul>',
    '    </div>',
    '  </section>',
    '</div>'
  ].join('');

  var htmlInput = document.getElementById('chv-html');
  var pageUrlInput = document.getElementById('chv-page-url');
  var state = document.getElementById('chv-state');
  var score = document.getElementById('chv-score');
  var canonicalCount = document.getElementById('chv-canonical-count');
  var hreflangCount = document.getElementById('chv-hreflang-count');
  var issuesCount = document.getElementById('chv-issues-count');
  var canonicalPanel = document.getElementById('chv-canonical-panel');
  var canonicalValue = document.getElementById('chv-canonical-value');
  var hreflangPanel = document.getElementById('chv-hreflang-panel');
  var hreflangBody = document.getElementById('chv-hreflang-body');
  var issuesPanel = document.getElementById('chv-issues-panel');
  var issuesList = document.getElementById('chv-issues');

  function resolveUrl(value, baseUrl) {
    var raw = String(value || '').trim();
    if (!raw) return { valid: false, value: '' };
    try {
      return { valid: true, value: new URL(raw, baseUrl || undefined).href };
    } catch (error) {
      return { valid: false, value: raw };
    }
  }

  function validHreflang(value) {
    var code = String(value || '').trim();
    if (!code) return false;
    if (code.toLowerCase() === 'x-default') return true;
    return /^[a-zA-Z]{2,3}(?:-[a-zA-Z]{2}|-[A-Za-z]{4})?$/.test(code);
  }

  function addIssue(list, type, text) {
    list.push({ type: type, text: text });
  }

  function analyze() {
    var raw = htmlInput.value.trim();
    if (!raw) {
      state.textContent = 'No hay HTML que analizar.';
      score.textContent = '—';
      canonicalCount.textContent = '0';
      hreflangCount.textContent = '0';
      issuesCount.textContent = '0';
      canonicalPanel.hidden = true;
      hreflangPanel.hidden = true;
      issuesPanel.hidden = true;
      return;
    }

    var parser = new DOMParser();
    var doc = parser.parseFromString(raw, 'text/html');
    var baseUrl = pageUrlInput.value.trim() || undefined;
    var canonicals = Array.prototype.slice.call(doc.querySelectorAll('link[rel~="canonical"]'));
    var alternates = Array.prototype.slice.call(doc.querySelectorAll('link[rel~="alternate"][hreflang]'));
    var issues = [];
    var rows = [];
    var seenLanguages = Object.create(null);

    if (canonicals.length === 0) {
      addIssue(issues, 'warning', 'No se ha encontrado ninguna etiqueta canonical.');
    } else if (canonicals.length > 1) {
      addIssue(issues, 'error', 'Hay más de una etiqueta canonical. Normalmente debería existir una sola.');
    }

    var canonicalResolved = '';
    if (canonicals.length) {
      var canonicalHref = canonicals[0].getAttribute('href') || '';
      var canonicalResult = resolveUrl(canonicalHref, baseUrl);
      canonicalResolved = canonicalResult.value;
      if (!canonicalResult.valid) {
        addIssue(issues, 'error', 'La URL canonical no parece válida.');
      }
    }

    alternates.forEach(function (link) {
      var lang = (link.getAttribute('hreflang') || '').trim();
      var href = (link.getAttribute('href') || '').trim();
      var result = resolveUrl(href, baseUrl);
      var rowIssues = [];

      if (!validHreflang(lang)) {
        rowIssues.push('Código hreflang no reconocido');
        addIssue(issues, 'warning', 'Revisa el código hreflang "' + lang + '".');
      }

      var langKey = lang.toLowerCase();
      if (seenLanguages[langKey]) {
        rowIssues.push('Duplicado');
        addIssue(issues, 'warning', 'El hreflang "' + lang + '" aparece más de una vez.');
      }
      seenLanguages[langKey] = true;

      if (!result.valid) {
        rowIssues.push('URL inválida');
        addIssue(issues, 'error', 'La URL asociada a "' + lang + '" no parece válida.');
      }

      rows.push({
        lang: lang || '—',
        url: result.value || href || '—',
        status: rowIssues.length ? rowIssues.join(' · ') : 'Correcto'
      });
    });

    if (alternates.length && !seenLanguages['x-default']) {
      addIssue(issues, 'info', 'No hay una variante x-default. No siempre es obligatoria, pero puede ser recomendable.');
    }

    if (!alternates.length) {
      addIssue(issues, 'info', 'No se han encontrado etiquetas hreflang.');
    }

    if (baseUrl && canonicalResolved) {
      var baseResult = resolveUrl(baseUrl);
      if (baseResult.valid) {
        try {
          if (new URL(baseResult.value).origin !== new URL(canonicalResolved).origin) {
            addIssue(issues, 'warning', 'La canonical apunta a un dominio distinto al de la URL analizada.');
          }
        } catch (error) {}
      }
    }

    canonicalCount.textContent = String(canonicals.length);
    hreflangCount.textContent = String(alternates.length);
    issuesCount.textContent = String(issues.length);

    var errorCount = issues.filter(function (item) { return item.type === 'error'; }).length;
    var warningCount = issues.filter(function (item) { return item.type === 'warning'; }).length;
    score.textContent = errorCount ? 'Revisar' : (warningCount ? 'Mejorable' : 'Correcto');
    score.setAttribute('data-state', errorCount ? 'error' : (warningCount ? 'warning' : 'ok'));

    canonicalPanel.hidden = canonicals.length === 0;
    canonicalValue.textContent = canonicalResolved || 'No encontrada';

    hreflangBody.innerHTML = '';
    rows.forEach(function (row) {
      var tr = document.createElement('tr');
      var tdLang = document.createElement('td');
      var tdUrl = document.createElement('td');
      var tdStatus = document.createElement('td');
      tdLang.textContent = row.lang;
      tdUrl.textContent = row.url;
      tdStatus.textContent = row.status;
      tdStatus.className = row.status === 'Correcto' ? 'is-ok' : 'is-warning';
      tr.appendChild(tdLang);
      tr.appendChild(tdUrl);
      tr.appendChild(tdStatus);
      hreflangBody.appendChild(tr);
    });
    hreflangPanel.hidden = rows.length === 0;

    issuesList.innerHTML = '';
    issues.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'chv-issue chv-issue--' + item.type;
      li.textContent = item.text;
      issuesList.appendChild(li);
    });
    issuesPanel.hidden = issues.length === 0;

    state.textContent = 'Análisis completado.';
  }

  document.getElementById('chv-analyze').addEventListener('click', analyze);

  document.getElementById('chv-example').addEventListener('click', function () {
    pageUrlInput.value = 'https://www.ejemplo.com/es/servicios';
    htmlInput.value = [
      '<!doctype html>',
      '<html lang="es">',
      '<head>',
      '  <link rel="canonical" href="https://www.ejemplo.com/es/servicios">',
      '  <link rel="alternate" hreflang="es" href="https://www.ejemplo.com/es/servicios">',
      '  <link rel="alternate" hreflang="en" href="https://www.ejemplo.com/en/services">',
      '  <link rel="alternate" hreflang="fr" href="https://www.ejemplo.com/fr/services">',
      '  <link rel="alternate" hreflang="x-default" href="https://www.ejemplo.com/services">',
      '</head>',
      '<body></body>',
      '</html>'
    ].join('\n');
    analyze();
  });

  document.getElementById('chv-clear').addEventListener('click', function () {
    pageUrlInput.value = '';
    htmlInput.value = '';
    analyze();
    state.textContent = 'Campos limpiados.';
  });
})();