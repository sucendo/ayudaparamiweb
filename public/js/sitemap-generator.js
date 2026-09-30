(function () {
  var mount = document.getElementById('sitemap-generator-app');
  if (!mount) return;

  mount.innerHTML = [
    '<div class="sitemap-tool">',
    '  <section class="sitemap-tool__editor">',
    '    <div class="sitemap-import">',
    '      <label for="sitemap-bulk"><strong>Añadir varias URLs</strong></label>',
    '      <textarea id="sitemap-bulk" rows="5" placeholder="https://www.ejemplo.com/\nhttps://www.ejemplo.com/articulos\nhttps://www.ejemplo.com/contacto"></textarea>',
    '      <div class="sitemap-import__actions">',
    '        <button type="button" id="sitemap-import">Añadir URLs</button>',
    '        <button type="button" id="sitemap-add-one" class="sitemap-secondary">+ Una URL</button>',
    '      </div>',
    '    </div>',
    '    <div class="sitemap-entries-head">',
    '      <strong>Entradas del sitemap</strong>',
    '      <span id="sitemap-count">0 URLs</span>',
    '    </div>',
    '    <div id="sitemap-entries" class="sitemap-entries"></div>',
    '  </section>',
    '  <section class="sitemap-tool__output">',
    '    <div class="sitemap-output-head">',
    '      <strong>sitemap.xml generado</strong>',
    '      <span id="sitemap-validation" class="sitemap-validation"></span>',
    '    </div>',
    '    <pre><code id="sitemap-code"></code></pre>',
    '    <div class="sitemap-actions">',
    '      <button type="button" id="sitemap-copy">Copiar XML</button>',
    '      <button type="button" id="sitemap-download" class="sitemap-secondary-dark">Descargar sitemap.xml</button>',
    '    </div>',
    '    <ul id="sitemap-warnings" class="sitemap-warnings"></ul>',
    '    <p id="sitemap-status" class="sitemap-status" aria-live="polite"></p>',
    '  </section>',
    '</div>'
  ].join('');

  var entries = document.getElementById('sitemap-entries');
  var bulk = document.getElementById('sitemap-bulk');
  var code = document.getElementById('sitemap-code');
  var count = document.getElementById('sitemap-count');
  var validation = document.getElementById('sitemap-validation');
  var warnings = document.getElementById('sitemap-warnings');
  var status = document.getElementById('sitemap-status');

  function escapeXml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function isHttpUrl(value) {
    try {
      var parsed = new URL(value);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (error) {
      return false;
    }
  }

  function createEntry(values) {
    values = values || {};
    var row = document.createElement('div');
    row.className = 'sitemap-entry';
    row.innerHTML = [
      '<div class="sitemap-entry__url">',
      '  <label>URL</label>',
      '  <input type="url" data-sitemap="loc" placeholder="https://www.ejemplo.com/pagina">',
      '</div>',
      '<div class="sitemap-entry__meta">',
      '  <label>Última modificación<input type="date" data-sitemap="lastmod"></label>',
      '  <label>Frecuencia<select data-sitemap="changefreq"><option value="">—</option><option>always</option><option>hourly</option><option>daily</option><option>weekly</option><option>monthly</option><option>yearly</option><option>never</option></select></label>',
      '  <label>Prioridad<select data-sitemap="priority"><option value="">—</option><option value="1.0">1.0</option><option value="0.9">0.9</option><option value="0.8">0.8</option><option value="0.7">0.7</option><option value="0.6">0.6</option><option value="0.5">0.5</option><option value="0.4">0.4</option><option value="0.3">0.3</option><option value="0.2">0.2</option><option value="0.1">0.1</option><option value="0.0">0.0</option></select></label>',
      '</div>',
      '<button type="button" class="sitemap-entry__remove" aria-label="Eliminar URL">×</button>'
    ].join('');

    row.querySelector('[data-sitemap="loc"]').value = values.loc || '';
    row.querySelector('[data-sitemap="lastmod"]').value = values.lastmod || '';
    row.querySelector('[data-sitemap="changefreq"]').value = values.changefreq || '';
    row.querySelector('[data-sitemap="priority"]').value = values.priority || '';

    row.querySelectorAll('input,select').forEach(function (field) {
      field.addEventListener('input', update);
      field.addEventListener('change', update);
    });

    row.querySelector('.sitemap-entry__remove').addEventListener('click', function () {
      row.remove();
      update();
    });

    entries.appendChild(row);
  }

  function collect() {
    var list = [];
    entries.querySelectorAll('.sitemap-entry').forEach(function (row) {
      var item = {
        loc: row.querySelector('[data-sitemap="loc"]').value.trim(),
        lastmod: row.querySelector('[data-sitemap="lastmod"]').value,
        changefreq: row.querySelector('[data-sitemap="changefreq"]').value,
        priority: row.querySelector('[data-sitemap="priority"]').value
      };
      if (item.loc) list.push(item);
    });
    return list;
  }

  function buildXml(list) {
    var lines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ];

    list.forEach(function (item) {
      lines.push('  <url>');
      lines.push('    <loc>' + escapeXml(item.loc) + '</loc>');
      if (item.lastmod) lines.push('    <lastmod>' + item.lastmod + '</lastmod>');
      if (item.changefreq) lines.push('    <changefreq>' + item.changefreq + '</changefreq>');
      if (item.priority) lines.push('    <priority>' + item.priority + '</priority>');
      lines.push('  </url>');
    });

    lines.push('</urlset>');
    return lines.join('\n') + '\n';
  }

  function validate(list) {
    var issues = [];
    var seen = Object.create(null);

    list.forEach(function (item) {
      if (!isHttpUrl(item.loc)) {
        issues.push('URL no válida: ' + item.loc);
        return;
      }

      var normalized = item.loc.replace(/#.*$/, '');
      if (seen[normalized]) issues.push('URL duplicada: ' + normalized);
      seen[normalized] = true;

      if (/#/.test(item.loc)) {
        issues.push('La URL contiene un fragmento (#): ' + item.loc);
      }
    });

    if (list.length > 50000) {
      issues.push('Un sitemap estándar no debería superar las 50.000 URLs.');
    }

    warnings.innerHTML = '';
    issues.forEach(function (issue) {
      var li = document.createElement('li');
      li.textContent = issue;
      warnings.appendChild(li);
    });

    validation.textContent = issues.length
      ? issues.length + ' aviso' + (issues.length === 1 ? '' : 's')
      : 'Sin avisos';

    validation.classList.toggle('has-warnings', issues.length > 0);
  }

  function update() {
    var list = collect();
    code.textContent = buildXml(list);
    count.textContent = list.length + ' URL' + (list.length === 1 ? '' : 's');
    validate(list);
    status.textContent = '';
  }

  document.getElementById('sitemap-import').addEventListener('click', function () {
    var urls = bulk.value
      .split(/\r?\n/)
      .map(function (value) { return value.trim(); })
      .filter(Boolean);

    urls.forEach(function (url) {
      createEntry({ loc: url });
    });

    bulk.value = '';
    update();
  });

  document.getElementById('sitemap-add-one').addEventListener('click', function () {
    createEntry({});
    update();
  });

  document.getElementById('sitemap-copy').addEventListener('click', function () {
    navigator.clipboard.writeText(code.textContent).then(function () {
      status.textContent = 'XML copiado al portapapeles.';
    }).catch(function () {
      status.textContent = 'No se pudo copiar automáticamente. Selecciona el XML y cópialo manualmente.';
    });
  });

  document.getElementById('sitemap-download').addEventListener('click', function () {
    var blob = new Blob([code.textContent], { type: 'application/xml;charset=utf-8' });
    var link = document.createElement('a');
    var objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 0);
    status.textContent = 'Archivo sitemap.xml preparado.';
  });

  createEntry({ loc: 'https://www.ejemplo.com/', changefreq: 'weekly', priority: '1.0' });
  createEntry({ loc: 'https://www.ejemplo.com/articulos', changefreq: 'weekly', priority: '0.8' });
  update();
})();