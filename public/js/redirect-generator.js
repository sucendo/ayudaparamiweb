(function () {
  var mount = document.getElementById('redirect-generator-app');
  if (!mount) return;

  mount.innerHTML = [
    '<div class="redirect-tool">',
    '  <section class="redirect-tool__editor">',
    '    <div class="redirect-toolbar">',
    '      <label>Formato<select id="redirect-format"><option value="apache">Apache (.htaccess)</option><option value="nginx">Nginx</option><option value="netlify">Netlify (_redirects)</option><option value="cloudflare">Cloudflare CSV</option></select></label>',
    '      <label>Tipo<select id="redirect-status"><option value="301">301 permanente</option><option value="302">302 temporal</option></select></label>',
    '    </div>',
    '    <div class="redirect-field">',
    '      <label for="redirect-domain">Dominio base <span>(opcional)</span></label>',
    '      <input id="redirect-domain" type="url" placeholder="https://www.ejemplo.com">',
    '      <small>Útil para convertir rutas relativas en URLs completas cuando el formato lo requiere.</small>',
    '    </div>',
    '    <div class="redirect-import">',
    '      <label for="redirect-bulk"><strong>Pegar varias redirecciones</strong></label>',
    '      <textarea id="redirect-bulk" rows="5" placeholder="/url-antigua/ -> /url-nueva/&#10;/servicio-viejo/ -> https://www.ejemplo.com/servicio/"></textarea>',
    '      <button type="button" id="redirect-import">Añadir redirecciones</button>',
    '    </div>',
    '    <div class="redirect-list-head"><strong>Redirecciones</strong><button type="button" id="redirect-add">+ Añadir</button></div>',
    '    <div id="redirect-rows" class="redirect-rows"></div>',
    '  </section>',
    '  <section class="redirect-tool__output">',
    '    <div class="redirect-output-head"><strong id="redirect-output-title">Reglas generadas</strong><span id="redirect-validation"></span></div>',
    '    <pre><code id="redirect-code"></code></pre>',
    '    <div class="redirect-actions">',
    '      <button type="button" id="redirect-copy">Copiar reglas</button>',
    '      <button type="button" id="redirect-download" class="redirect-secondary">Descargar archivo</button>',
    '    </div>',
    '    <ul id="redirect-warnings" class="redirect-warnings"></ul>',
    '    <p id="redirect-status-text" class="redirect-status-text" aria-live="polite"></p>',
    '  </section>',
    '</div>'
  ].join('');

  var rows = document.getElementById('redirect-rows');
  var format = document.getElementById('redirect-format');
  var statusCode = document.getElementById('redirect-status');
  var domain = document.getElementById('redirect-domain');
  var bulk = document.getElementById('redirect-bulk');
  var output = document.getElementById('redirect-code');
  var outputTitle = document.getElementById('redirect-output-title');
  var validation = document.getElementById('redirect-validation');
  var warnings = document.getElementById('redirect-warnings');
  var statusText = document.getElementById('redirect-status-text');

  function normalizePath(value) {
    var raw = String(value || '').trim();
    if (!raw) return '';
    try {
      var parsed = new URL(raw);
      return parsed.pathname + parsed.search + parsed.hash;
    } catch (error) {
      return raw.charAt(0) === '/' ? raw : '/' + raw;
    }
  }

  function normalizeBaseDomain() {
    var raw = domain.value.trim();
    if (!raw) return '';
    try {
      return new URL(raw).origin;
    } catch (error) {
      return '';
    }
  }

  function absoluteUrl(value) {
    var raw = String(value || '').trim();
    if (!raw) return '';
    try {
      return new URL(raw).href;
    } catch (error) {
      var base = normalizeBaseDomain();
      if (!base) return raw;
      return base + normalizePath(raw);
    }
  }

  function createRow(source, target) {
    var row = document.createElement('div');
    row.className = 'redirect-row';
    row.innerHTML = [
      '<label>URL antigua<input type="text" data-redirect="from" placeholder="/url-antigua/"></label>',
      '<span class="redirect-arrow" aria-hidden="true">→</span>',
      '<label>Destino<input type="text" data-redirect="to" placeholder="/url-nueva/"></label>',
      '<button type="button" class="redirect-remove" aria-label="Eliminar redirección">×</button>'
    ].join('');

    row.querySelector('[data-redirect="from"]').value = source || '';
    row.querySelector('[data-redirect="to"]').value = target || '';

    row.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('input', update);
    });

    row.querySelector('.redirect-remove').addEventListener('click', function () {
      row.remove();
      update();
    });

    rows.appendChild(row);
  }

  function collect() {
    var list = [];
    rows.querySelectorAll('.redirect-row').forEach(function (row) {
      var from = row.querySelector('[data-redirect="from"]').value.trim();
      var to = row.querySelector('[data-redirect="to"]').value.trim();
      if (from || to) list.push({ from: from, to: to });
    });
    return list;
  }

  function apacheLine(item) {
    var from = normalizePath(item.from).replace(/^\//, '');
    var target = /^https?:\/\//i.test(item.to) ? item.to : normalizePath(item.to);
    return 'Redirect ' + statusCode.value + ' /' + from + ' ' + target;
  }

  function nginxLine(item) {
    var from = normalizePath(item.from);
    var target = /^https?:\/\//i.test(item.to) ? item.to : normalizePath(item.to);
    return 'location = ' + from + ' { return ' + statusCode.value + ' ' + target + '; }';
  }

  function netlifyLine(item) {
    var target = /^https?:\/\//i.test(item.to) ? item.to : normalizePath(item.to);
    return normalizePath(item.from) + ' ' + target + ' ' + statusCode.value;
  }

  function csvEscape(value) {
    var text = String(value || '');
    return '"' + text.replace(/"/g, '""') + '"';
  }

  function build(list) {
    if (format.value === 'cloudflare') {
      var csv = ['source_url,target_url,status_code'];
      list.forEach(function (item) {
        csv.push([csvEscape(absoluteUrl(item.from)), csvEscape(absoluteUrl(item.to)), statusCode.value].join(','));
      });
      return csv.join('\n') + '\n';
    }

    var lines = list.map(function (item) {
      if (format.value === 'apache') return apacheLine(item);
      if (format.value === 'nginx') return nginxLine(item);
      return netlifyLine(item);
    });

    return lines.join('\n') + (lines.length ? '\n' : '');
  }

  function validate(list) {
    var issues = [];
    var seen = Object.create(null);
    var sourceSet = Object.create(null);

    list.forEach(function (item) {
      if (!item.from || !item.to) {
        issues.push('Hay una redirección incompleta.');
        return;
      }

      var sourceKey = normalizePath(item.from);
      var targetKey = normalizePath(item.to);

      if (sourceKey === targetKey) {
        issues.push('Origen y destino son iguales: ' + item.from);
      }

      if (seen[sourceKey]) {
        issues.push('Origen duplicado: ' + item.from);
      }
      seen[sourceKey] = true;
      sourceSet[sourceKey] = true;
    });

    list.forEach(function (item) {
      if (sourceSet[normalizePath(item.to)] && normalizePath(item.from) !== normalizePath(item.to)) {
        issues.push('Posible cadena de redirecciones: ' + item.from + ' → ' + item.to);
      }
    });

    if (format.value === 'cloudflare' && !normalizeBaseDomain()) {
      var hasRelative = list.some(function (item) {
        return !/^https?:\/\//i.test(item.from) || !/^https?:\/\//i.test(item.to);
      });
      if (hasRelative) issues.push('Para Cloudflare, añade un dominio base si utilizas rutas relativas.');
    }

    warnings.innerHTML = '';
    issues.forEach(function (issue) {
      var li = document.createElement('li');
      li.textContent = issue;
      warnings.appendChild(li);
    });

    validation.textContent = issues.length ? issues.length + ' aviso' + (issues.length === 1 ? '' : 's') : 'Sin avisos';
    validation.classList.toggle('has-warnings', issues.length > 0);
  }

  function fileName() {
    if (format.value === 'apache') return 'htaccess-redirecciones.txt';
    if (format.value === 'nginx') return 'nginx-redirecciones.conf';
    if (format.value === 'netlify') return '_redirects';
    return 'cloudflare-redirects.csv';
  }

  function updateTitle() {
    var names = {
      apache: 'Reglas Apache (.htaccess)',
      nginx: 'Reglas Nginx',
      netlify: 'Archivo _redirects',
      cloudflare: 'CSV para Cloudflare'
    };
    outputTitle.textContent = names[format.value];
  }

  function update() {
    var list = collect();
    updateTitle();
    output.textContent = build(list);
    validate(list);
    statusText.textContent = '';
  }

  document.getElementById('redirect-add').addEventListener('click', function () {
    createRow('', '');
    update();
  });

  document.getElementById('redirect-import').addEventListener('click', function () {
    bulk.value.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean).forEach(function (line) {
      var parts = line.split(/\s*(?:->|=>|,)\s*/);
      if (parts.length >= 2) createRow(parts[0], parts.slice(1).join(','));
    });
    bulk.value = '';
    update();
  });

  [format, statusCode, domain].forEach(function (element) {
    element.addEventListener('input', update);
    element.addEventListener('change', update);
  });

  document.getElementById('redirect-copy').addEventListener('click', function () {
    navigator.clipboard.writeText(output.textContent).then(function () {
      statusText.textContent = 'Reglas copiadas al portapapeles.';
    }).catch(function () {
      statusText.textContent = 'No se pudo copiar automáticamente. Selecciona las reglas y cópialas manualmente.';
    });
  });

  document.getElementById('redirect-download').addEventListener('click', function () {
    var mime = format.value === 'cloudflare' ? 'text/csv;charset=utf-8' : 'text/plain;charset=utf-8';
    var blob = new Blob([output.textContent], { type: mime });
    var objectUrl = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = objectUrl;
    link.download = fileName();
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 0);
    statusText.textContent = 'Archivo preparado.';
  });

  createRow('/pagina-antigua/', '/pagina-nueva/');
  createRow('/servicios/web/', '/servicios/');
  update();
})();