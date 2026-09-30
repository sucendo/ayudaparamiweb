(function () {
  var mount = document.getElementById('heading-analyzer-app');
  if (!mount) return;

  mount.innerHTML = [
    '<div class="heading-tool">',
    '  <section class="heading-tool__input">',
    '    <label class="heading-label" for="heading-html">HTML de la página</label>',
    '    <textarea id="heading-html" rows="14" placeholder="Pega aquí el HTML completo o el contenido principal de la página..."></textarea>',
    '    <div class="heading-actions">',
    '      <button type="button" id="heading-analyze">Analizar encabezados</button>',
    '      <button type="button" id="heading-example" class="heading-secondary">Cargar ejemplo</button>',
    '      <button type="button" id="heading-clear" class="heading-secondary">Limpiar</button>',
    '    </div>',
    '  </section>',
    '  <section class="heading-tool__result">',
    '    <div class="heading-summary">',
    '      <div><strong id="heading-total">0</strong><span>Total</span></div>',
    '      <div><strong id="heading-h1">0</strong><span>H1</span></div>',
    '      <div><strong id="heading-levels">0</strong><span>Niveles usados</span></div>',
    '      <div><strong id="heading-issues-count">0</strong><span>Avisos</span></div>',
    '    </div>',
    '    <div id="heading-state" class="heading-state">Pega un HTML y pulsa “Analizar encabezados”.</div>',
    '    <div id="heading-tree-panel" class="heading-panel" hidden>',
    '      <div class="heading-panel__head"><h3>Estructura H1-H6</h3><button type="button" id="heading-copy">Copiar esquema</button></div>',
    '      <ol id="heading-tree" class="heading-tree"></ol>',
    '    </div>',
    '    <div id="heading-issues-panel" class="heading-panel" hidden>',
    '      <h3>Avisos encontrados</h3>',
    '      <ul id="heading-issues" class="heading-issues"></ul>',
    '    </div>',
    '    <p id="heading-copy-status" class="heading-copy-status" aria-live="polite"></p>',
    '  </section>',
    '</div>'
  ].join('');

  var htmlInput = document.getElementById('heading-html');
  var totalEl = document.getElementById('heading-total');
  var h1El = document.getElementById('heading-h1');
  var levelsEl = document.getElementById('heading-levels');
  var issueCountEl = document.getElementById('heading-issues-count');
  var stateEl = document.getElementById('heading-state');
  var treePanel = document.getElementById('heading-tree-panel');
  var treeEl = document.getElementById('heading-tree');
  var issuesPanel = document.getElementById('heading-issues-panel');
  var issuesEl = document.getElementById('heading-issues');
  var copyStatus = document.getElementById('heading-copy-status');
  var lastOutline = [];

  function normalizeText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function issue(type, text) {
    return { type: type, text: text };
  }

  function analyze() {
    var raw = htmlInput.value.trim();
    copyStatus.textContent = '';

    if (!raw) {
      totalEl.textContent = '0';
      h1El.textContent = '0';
      levelsEl.textContent = '0';
      issueCountEl.textContent = '0';
      stateEl.textContent = 'No hay HTML que analizar.';
      treePanel.hidden = true;
      issuesPanel.hidden = true;
      lastOutline = [];
      return;
    }

    var doc = new DOMParser().parseFromString(raw, 'text/html');
    var nodes = Array.prototype.slice.call(doc.querySelectorAll('h1,h2,h3,h4,h5,h6'));
    var issues = [];
    var seenTexts = Object.create(null);
    var usedLevels = Object.create(null);
    var h1Count = 0;
    var previousLevel = null;

    lastOutline = nodes.map(function (node, index) {
      var level = Number(node.tagName.slice(1));
      var text = normalizeText(node.textContent);
      usedLevels[level] = true;
      if (level === 1) h1Count += 1;

      if (!text) {
        issues.push(issue('error', 'El encabezado ' + (index + 1) + ' (' + node.tagName + ') está vacío.'));
      } else {
        var key = text.toLowerCase();
        if (seenTexts[key]) {
          issues.push(issue('warning', 'Texto de encabezado repetido: “' + text + '”.'));
        }
        seenTexts[key] = true;

        if (text.length > 90) {
          issues.push(issue('info', node.tagName + ' muy largo (' + text.length + ' caracteres): “' + text.slice(0, 65) + '…”'));
        }
      }

      if (previousLevel !== null && level > previousLevel + 1) {
        issues.push(issue('warning', 'Salto de jerarquía: H' + previousLevel + ' → H' + level + ' en “' + (text || 'sin texto') + '”.'));
      }
      previousLevel = level;

      return { level: level, text: text || '(encabezado vacío)', tag: node.tagName };
    });

    if (nodes.length === 0) {
      issues.push(issue('error', 'No se ha encontrado ningún encabezado H1-H6.'));
    }

    if (h1Count === 0) {
      issues.push(issue('warning', 'No se ha encontrado ningún H1.'));
    } else if (h1Count > 1) {
      issues.push(issue('warning', 'Se han encontrado ' + h1Count + ' encabezados H1. Revisa si todos son necesarios.'));
    }

    totalEl.textContent = String(nodes.length);
    h1El.textContent = String(h1Count);
    levelsEl.textContent = String(Object.keys(usedLevels).length);
    issueCountEl.textContent = String(issues.length);

    treeEl.innerHTML = '';
    lastOutline.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'heading-tree__item heading-tree__item--h' + item.level;
      var badge = document.createElement('span');
      badge.className = 'heading-tree__badge';
      badge.textContent = item.tag;
      var text = document.createElement('span');
      text.className = 'heading-tree__text';
      text.textContent = item.text;
      li.appendChild(badge);
      li.appendChild(text);
      treeEl.appendChild(li);
    });
    treePanel.hidden = lastOutline.length === 0;

    issuesEl.innerHTML = '';
    issues.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'heading-issue heading-issue--' + item.type;
      li.textContent = item.text;
      issuesEl.appendChild(li);
    });
    issuesPanel.hidden = issues.length === 0;

    var errorCount = issues.filter(function (item) { return item.type === 'error'; }).length;
    var warningCount = issues.filter(function (item) { return item.type === 'warning'; }).length;
    stateEl.textContent = errorCount ? 'Hay errores estructurales que conviene revisar.' : (warningCount ? 'La estructura es utilizable, pero tiene aspectos mejorables.' : 'La estructura de encabezados no presenta avisos relevantes.');
    stateEl.setAttribute('data-state', errorCount ? 'error' : (warningCount ? 'warning' : 'ok'));
  }

  document.getElementById('heading-analyze').addEventListener('click', analyze);

  document.getElementById('heading-example').addEventListener('click', function () {
    htmlInput.value = [
      '<main>',
      '  <h1>Guía de posicionamiento SEO</h1>',
      '  <h2>SEO on-page</h2>',
      '  <h3>Title y meta description</h3>',
      '  <h3>Encabezados HTML</h3>',
      '  <h2>SEO técnico</h2>',
      '  <h4>Canonical y hreflang</h4>',
      '  <h2>Conclusiones</h2>',
      '</main>'
    ].join('\n');
    analyze();
  });

  document.getElementById('heading-clear').addEventListener('click', function () {
    htmlInput.value = '';
    analyze();
    stateEl.textContent = 'Campos limpiados.';
  });

  document.getElementById('heading-copy').addEventListener('click', function () {
    var outline = lastOutline.map(function (item) {
      return new Array(item.level).join('  ') + item.tag + ': ' + item.text;
    }).join('\n');

    navigator.clipboard.writeText(outline).then(function () {
      copyStatus.textContent = 'Esquema copiado al portapapeles.';
    }).catch(function () {
      copyStatus.textContent = 'No se pudo copiar automáticamente.';
    });
  });
})();