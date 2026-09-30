(function () {
  var mount = document.getElementById('link-analyzer-app');
  if (!mount) return;

  mount.innerHTML = [
    '<div class="link-tool">',
    '  <section class="link-tool__input">',
    '    <div class="link-field">',
    '      <label for="link-base-url">URL de la página</label>',
    '      <input id="link-base-url" type="url" value="https://www.ejemplo.com/articulo" placeholder="https://www.ejemplo.com/pagina">',
    '      <small>Se utiliza para resolver rutas relativas y distinguir enlaces internos y externos.</small>',
    '    </div>',
    '    <div class="link-field">',
    '      <label for="link-html">HTML de la página</label>',
    '      <textarea id="link-html" rows="14" placeholder="Pega aquí el HTML completo o el contenido que quieras revisar..."></textarea>',
    '    </div>',
    '    <div class="link-actions">',
    '      <button type="button" id="link-analyze">Analizar enlaces</button>',
    '      <button type="button" id="link-example" class="link-secondary">Cargar ejemplo</button>',
    '      <button type="button" id="link-clear" class="link-secondary">Limpiar</button>',
    '    </div>',
    '  </section>',
    '  <section class="link-tool__result">',
    '    <div class="link-summary">',
    '      <div><strong id="link-total">0</strong><span>Total</span></div>',
    '      <div><strong id="link-internal">0</strong><span>Internos</span></div>',
    '      <div><strong id="link-external">0</strong><span>Externos</span></div>',
    '      <div><strong id="link-issues-count">0</strong><span>Con avisos</span></div>',
    '    </div>',
    '    <div id="link-state" class="link-state">Pega un HTML y pulsa “Analizar enlaces”.</div>',
    '    <div id="link-results-panel" class="link-panel" hidden>',
    '      <div class="link-panel__head">',
    '        <div class="link-filters" role="group" aria-label="Filtrar enlaces">',
    '          <button type="button" class="is-active" data-link-filter="all">Todos</button>',
    '          <button type="button" data-link-filter="internal">Internos</button>',
    '          <button type="button" data-link-filter="external">Externos</button>',
    '          <button type="button" data-link-filter="issues">Avisos</button>',
    '        </div>',
    '        <button type="button" id="link-copy-csv" class="link-copy">Copiar CSV</button>',
    '      </div>',
    '      <div class="link-table-wrap">',
    '        <table class="link-table">',
    '          <thead><tr><th>Tipo</th><th>Anchor</th><th>Destino</th><th>rel</th><th>Avisos</th></tr></thead>',
    '          <tbody id="link-table-body"></tbody>',
    '        </table>',
    '      </div>',
    '    </div>',
    '    <div id="link-issues-panel" class="link-panel" hidden>',
    '      <h3>Resumen de avisos</h3>',
    '      <ul id="link-issues" class="link-issues"></ul>',
    '    </div>',
    '    <p id="link-copy-status" class="link-copy-status" aria-live="polite"></p>',
    '  </section>',
    '</div>'
  ].join('');

  var baseInput = document.getElementById('link-base-url');
  var htmlInput = document.getElementById('link-html');
  var body = document.getElementById('link-table-body');
  var resultsPanel = document.getElementById('link-results-panel');
  var issuesPanel = document.getElementById('link-issues-panel');
  var issuesList = document.getElementById('link-issues');
  var state = document.getElementById('link-state');
  var copyStatus = document.getElementById('link-copy-status');
  var currentFilter = 'all';
  var lastRows = [];

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function parseBase() {
    try { return new URL(baseInput.value.trim()); } catch (error) { return null; }
  }

  function resolveHref(href, base) {
    try { return new URL(href, base ? base.href : undefined); } catch (error) { return null; }
  }

  function classify(href, resolved, base) {
    var raw = String(href || '').trim().toLowerCase();
    if (!raw) return 'invalid';
    if (raw.charAt(0) === '#') return 'anchor';
    if (/^(mailto:|tel:|sms:)/.test(raw)) return 'contact';
    if (/^javascript:/.test(raw)) return 'javascript';
    if (!resolved) return 'invalid';
    if (!/^https?:$/.test(resolved.protocol)) return 'other';
    if (base && resolved.hostname === base.hostname) return 'internal';
    return 'external';
  }

  function weakAnchor(text) {
    var normalized = cleanText(text).toLowerCase().replace(/[.!:;?¡¿]+$/g, '');
    return [
      'aquí','aqui','clic aquí','clic aqui','click aquí','click aqui',
      'leer más','leer mas','más','mas','más información','mas informacion',
      'ver más','ver mas','saber más','saber mas','enlace','link'
    ].indexOf(normalized) !== -1;
  }

  function analyzeRows() {
    var raw = htmlInput.value.trim();
    var base = parseBase();
    if (!raw) return [];

    var doc = new DOMParser().parseFromString(raw, 'text/html');
    return Array.prototype.slice.call(doc.querySelectorAll('a')).map(function (anchor, index) {
      var href = anchor.getAttribute('href') || '';
      var text = cleanText(anchor.textContent);
      var aria = cleanText(anchor.getAttribute('aria-label'));
      var imageAlt = cleanText(Array.prototype.map.call(anchor.querySelectorAll('img[alt]'), function (img) {
        return img.getAttribute('alt') || '';
      }).join(' '));
      var effectiveText = text || aria || imageAlt;
      var rel = cleanText(anchor.getAttribute('rel')).toLowerCase();
      var target = cleanText(anchor.getAttribute('target')).toLowerCase();
      var resolved = resolveHref(href, base);
      var type = classify(href, resolved, base);
      var notices = [];

      if (!href.trim()) notices.push('href vacío');
      if (type === 'javascript') notices.push('javascript: en href');
      if (!effectiveText) notices.push('anchor sin texto descriptivo');
      else if (weakAnchor(effectiveText)) notices.push('anchor poco descriptivo');

      if (target === '_blank' && rel.indexOf('noopener') === -1 && rel.indexOf('noreferrer') === -1) {
        notices.push('target=_blank sin noopener/noreferrer');
      }

      return {
        index: index + 1,
        type: type,
        anchor: effectiveText || '(sin texto)',
        href: href,
        destination: resolved ? resolved.href : href || '(vacío)',
        rel: rel || '—',
        nofollow: /(^|\s)nofollow(\s|$)/.test(rel),
        sponsored: /(^|\s)sponsored(\s|$)/.test(rel),
        ugc: /(^|\s)ugc(\s|$)/.test(rel),
        notices: notices
      };
    });
  }

  function buildGlobalIssues(rows) {
    var items = [];
    var destinations = Object.create(null);
    var weak = rows.filter(function (row) {
      return row.notices.indexOf('anchor poco descriptivo') !== -1 || row.notices.indexOf('anchor sin texto descriptivo') !== -1;
    }).length;
    var blankSecurity = rows.filter(function (row) {
      return row.notices.indexOf('target=_blank sin noopener/noreferrer') !== -1;
    }).length;
    var javascriptLinks = rows.filter(function (row) { return row.type === 'javascript'; }).length;

    rows.forEach(function (row) {
      if (row.type === 'internal' || row.type === 'external') {
        destinations[row.destination] = (destinations[row.destination] || 0) + 1;
      }
    });

    var repeated = Object.keys(destinations).filter(function (url) { return destinations[url] > 1; }).length;
    if (weak) items.push(weak + ' enlace' + (weak === 1 ? '' : 's') + ' con anchor vacío o poco descriptivo.');
    if (blankSecurity) items.push(blankSecurity + ' enlace' + (blankSecurity === 1 ? '' : 's') + ' abre nueva pestaña sin noopener/noreferrer.');
    if (javascriptLinks) items.push(javascriptLinks + ' enlace' + (javascriptLinks === 1 ? '' : 's') + ' utiliza javascript: en href.');
    if (repeated) items.push(repeated + ' destino' + (repeated === 1 ? '' : 's') + ' aparece repetido en la página.');
    return items;
  }

  function visibleRows() {
    return lastRows.filter(function (row) {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'issues') return row.notices.length > 0;
      return row.type === currentFilter;
    });
  }

  function typeLabel(type) {
    var labels = {
      internal: 'Interno',
      external: 'Externo',
      anchor: 'Ancla',
      contact: 'Contacto',
      javascript: 'JavaScript',
      invalid: 'Inválido',
      other: 'Otro'
    };
    return labels[type] || type;
  }

  function renderTable() {
    body.innerHTML = '';
    visibleRows().forEach(function (row) {
      var tr = document.createElement('tr');
      tr.setAttribute('data-type', row.type);

      var typeTd = document.createElement('td');
      var badge = document.createElement('span');
      badge.className = 'link-badge link-badge--' + row.type;
      badge.textContent = typeLabel(row.type);
      typeTd.appendChild(badge);

      var anchorTd = document.createElement('td');
      anchorTd.textContent = row.anchor;

      var destTd = document.createElement('td');
      destTd.textContent = row.destination;

      var relTd = document.createElement('td');
      relTd.textContent = row.rel;

      var issuesTd = document.createElement('td');
      issuesTd.textContent = row.notices.length ? row.notices.join(' · ') : '—';
      if (row.notices.length) issuesTd.className = 'has-issues';

      tr.appendChild(typeTd);
      tr.appendChild(anchorTd);
      tr.appendChild(destTd);
      tr.appendChild(relTd);
      tr.appendChild(issuesTd);
      body.appendChild(tr);
    });
  }

  function analyze() {
    copyStatus.textContent = '';
    lastRows = analyzeRows();

    if (!htmlInput.value.trim()) {
      document.getElementById('link-total').textContent = '0';
      document.getElementById('link-internal').textContent = '0';
      document.getElementById('link-external').textContent = '0';
      document.getElementById('link-issues-count').textContent = '0';
      state.textContent = 'No hay HTML que analizar.';
      resultsPanel.hidden = true;
      issuesPanel.hidden = true;
      return;
    }

    var internal = lastRows.filter(function (row) { return row.type === 'internal'; }).length;
    var external = lastRows.filter(function (row) { return row.type === 'external'; }).length;
    var withIssues = lastRows.filter(function (row) { return row.notices.length > 0; }).length;
    var globalIssues = buildGlobalIssues(lastRows);

    document.getElementById('link-total').textContent = String(lastRows.length);
    document.getElementById('link-internal').textContent = String(internal);
    document.getElementById('link-external').textContent = String(external);
    document.getElementById('link-issues-count').textContent = String(withIssues);

    currentFilter = 'all';
    mount.querySelectorAll('[data-link-filter]').forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute('data-link-filter') === 'all');
    });

    renderTable();
    resultsPanel.hidden = lastRows.length === 0;

    issuesList.innerHTML = '';
    globalIssues.forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      issuesList.appendChild(li);
    });
    issuesPanel.hidden = globalIssues.length === 0;

    if (!lastRows.length) {
      state.textContent = 'No se han encontrado enlaces <a> en el HTML.';
    } else if (withIssues) {
      state.textContent = 'Análisis completado: hay ' + withIssues + ' enlace' + (withIssues === 1 ? '' : 's') + ' que conviene revisar.';
      state.setAttribute('data-state', 'warning');
    } else {
      state.textContent = 'Análisis completado sin avisos relevantes en los enlaces.';
      state.setAttribute('data-state', 'ok');
    }
  }

  mount.querySelectorAll('[data-link-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      currentFilter = button.getAttribute('data-link-filter');
      mount.querySelectorAll('[data-link-filter]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      renderTable();
    });
  });

  document.getElementById('link-analyze').addEventListener('click', analyze);

  document.getElementById('link-example').addEventListener('click', function () {
    baseInput.value = 'https://www.ejemplo.com/blog/seo';
    htmlInput.value = [
      '<main>',
      '  <p><a href="/guia-seo">Guía de SEO</a></p>',
      '  <p><a href="/herramientas">Aquí</a></p>',
      '  <p><a href="https://developer.mozilla.org/" target="_blank">Documentación web</a></p>',
      '  <p><a href="https://ejemplo-externo.com/" rel="nofollow sponsored">Patrocinador</a></p>',
      '  <p><a href="mailto:info@ejemplo.com">Escríbenos</a></p>',
      '  <p><a href="#faq">Preguntas frecuentes</a></p>',
      '  <p><a href="/contacto"><img src="contacto.svg" alt="Contacto"></a></p>',
      '</main>'
    ].join('\n');
    analyze();
  });

  document.getElementById('link-clear').addEventListener('click', function () {
    htmlInput.value = '';
    analyze();
    state.textContent = 'Campos limpiados.';
  });

  document.getElementById('link-copy-csv').addEventListener('click', function () {
    function csv(value) {
      return '"' + String(value || '').replace(/"/g, '""') + '"';
    }
    var lines = [['tipo','anchor','destino','rel','nofollow','sponsored','ugc','avisos'].join(',')];
    visibleRows().forEach(function (row) {
      lines.push([
        csv(typeLabel(row.type)),
        csv(row.anchor),
        csv(row.destination),
        csv(row.rel === '—' ? '' : row.rel),
        row.nofollow ? '1' : '0',
        row.sponsored ? '1' : '0',
        row.ugc ? '1' : '0',
        csv(row.notices.join(' | '))
      ].join(','));
    });

    navigator.clipboard.writeText(lines.join('\n')).then(function () {
      copyStatus.textContent = 'CSV copiado al portapapeles.';
    }).catch(function () {
      copyStatus.textContent = 'No se pudo copiar automáticamente.';
    });
  });
})();