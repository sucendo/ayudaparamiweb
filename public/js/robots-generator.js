(function () {
  var mount = document.getElementById('robots-generator-app');
  if (!mount) return;

  mount.innerHTML = [
    '<div class="robots-tool">',
    '  <section class="robots-tool__editor">',
    '    <div class="robots-field">',
    '      <label for="robots-agent">User-agent</label>',
    '      <select id="robots-agent">',
    '        <option value="*">Todos los rastreadores (*)</option>',
    '        <option value="Googlebot">Googlebot</option>',
    '        <option value="Bingbot">Bingbot</option>',
    '        <option value="custom">Personalizado…</option>',
    '      </select>',
    '    </div>',
    '    <div class="robots-field" id="robots-custom-wrap" hidden>',
    '      <label for="robots-custom-agent">Nombre del user-agent</label>',
    '      <input id="robots-custom-agent" type="text" placeholder="EjemploBot">',
    '    </div>',
    '    <div class="robots-rules-head">',
    '      <strong>Reglas</strong>',
    '      <button type="button" id="robots-add-rule">+ Añadir regla</button>',
    '    </div>',
    '    <div id="robots-rules" class="robots-rules"></div>',
    '    <div class="robots-field">',
    '      <label for="robots-sitemap">URL del sitemap <span class="robots-optional">(opcional)</span></label>',
    '      <input id="robots-sitemap" type="url" value="https://www.ejemplo.com/sitemap.xml" autocomplete="url">',
    '    </div>',
    '    <div class="robots-field">',
    '      <label for="robots-delay">Crawl-delay <span class="robots-optional">(opcional)</span></label>',
    '      <input id="robots-delay" type="number" min="0" step="1" placeholder="10">',
    '      <small>Algunos rastreadores lo interpretan; otros, como Googlebot, no lo utilizan.</small>',
    '    </div>',
    '    <div class="robots-presets">',
    '      <span>Plantillas rápidas:</span>',
    '      <button type="button" data-robots-preset="basic">Básica</button>',
    '      <button type="button" data-robots-preset="wordpress">WordPress</button>',
    '      <button type="button" data-robots-preset="block">Bloquear todo</button>',
    '      <button type="button" data-robots-preset="clear">Vaciar reglas</button>',
    '    </div>',
    '  </section>',
    '  <section class="robots-tool__output">',
    '    <div class="robots-output-head">',
    '      <strong>robots.txt generado</strong>',
    '      <span id="robots-validation" class="robots-validation"></span>',
    '    </div>',
    '    <pre><code id="robots-code"></code></pre>',
    '    <div class="robots-actions">',
    '      <button type="button" id="robots-copy">Copiar</button>',
    '      <button type="button" id="robots-download" class="robots-secondary">Descargar robots.txt</button>',
    '    </div>',
    '    <ul id="robots-warnings" class="robots-warnings"></ul>',
    '    <p id="robots-status" class="robots-status" aria-live="polite"></p>',
    '  </section>',
    '</div>'
  ].join('');

  var rulesWrap = document.getElementById('robots-rules');
  var agentSelect = document.getElementById('robots-agent');
  var customWrap = document.getElementById('robots-custom-wrap');
  var customAgent = document.getElementById('robots-custom-agent');
  var sitemap = document.getElementById('robots-sitemap');
  var delay = document.getElementById('robots-delay');
  var code = document.getElementById('robots-code');
  var validation = document.getElementById('robots-validation');
  var warnings = document.getElementById('robots-warnings');
  var status = document.getElementById('robots-status');

  function createRule(type, path) {
    var row = document.createElement('div');
    row.className = 'robots-rule';
    row.innerHTML = [
      '<select aria-label="Tipo de regla">',
      '  <option value="Disallow"' + (type === 'Disallow' ? ' selected' : '') + '>Disallow</option>',
      '  <option value="Allow"' + (type === 'Allow' ? ' selected' : '') + '>Allow</option>',
      '</select>',
      '<input type="text" aria-label="Ruta" value="' + String(path || '').replace(/"/g, '&quot;') + '" placeholder="/ruta/">',
      '<button type="button" aria-label="Eliminar regla">×</button>'
    ].join('');

    row.querySelectorAll('select,input').forEach(function (element) {
      element.addEventListener('input', update);
      element.addEventListener('change', update);
    });

    row.querySelector('button').addEventListener('click', function () {
      row.remove();
      update();
    });

    rulesWrap.appendChild(row);
  }

  function selectedAgent() {
    if (agentSelect.value === 'custom') return customAgent.value.trim() || 'MiBot';
    return agentSelect.value;
  }

  function normalizedPath(value) {
    var path = String(value || '').trim();
    if (!path) return '';
    return path;
  }

  function collect() {
    var list = [];
    rulesWrap.querySelectorAll('.robots-rule').forEach(function (row) {
      var type = row.querySelector('select').value;
      var path = normalizedPath(row.querySelector('input').value);
      if (path) list.push({ type: type, path: path });
    });
    return list;
  }

  function build() {
    var lines = ['User-agent: ' + selectedAgent()];
    collect().forEach(function (rule) {
      lines.push(rule.type + ': ' + rule.path);
    });

    var delayValue = delay.value.trim();
    if (delayValue) lines.push('Crawl-delay: ' + delayValue);

    var sitemapValue = sitemap.value.trim();
    if (sitemapValue) {
      lines.push('');
      lines.push('Sitemap: ' + sitemapValue);
    }

    return lines.join('\n') + '\n';
  }

  function validate() {
    var issues = [];
    var rules = collect();
    var seen = Object.create(null);

    rules.forEach(function (rule) {
      var key = rule.type + ':' + rule.path;
      if (seen[key]) issues.push('Hay una regla duplicada: ' + rule.type + ' ' + rule.path);
      seen[key] = true;

      if (rule.path.charAt(0) !== '/' && rule.path.charAt(0) !== '*') {
        issues.push('La ruta "' + rule.path + '" normalmente debería comenzar por /.');
      }
    });

    if (sitemap.value.trim()) {
      try {
        var sitemapUrl = new URL(sitemap.value.trim());
        if (!/^https?:$/.test(sitemapUrl.protocol)) throw new Error('protocol');
      } catch (error) {
        issues.push('La URL del sitemap no parece válida.');
      }
    }

    if (selectedAgent() === 'Googlebot' && delay.value.trim()) {
      issues.push('Googlebot no utiliza la directiva Crawl-delay.');
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

  function update() {
    customWrap.hidden = agentSelect.value !== 'custom';
    code.textContent = build();
    validate();
    status.textContent = '';
  }

  function setRules(rules) {
    rulesWrap.innerHTML = '';
    rules.forEach(function (rule) { createRule(rule.type, rule.path); });
    update();
  }

  document.getElementById('robots-add-rule').addEventListener('click', function () {
    createRule('Disallow', '/');
    update();
  });

  [agentSelect, customAgent, sitemap, delay].forEach(function (element) {
    element.addEventListener('input', update);
    element.addEventListener('change', update);
  });

  mount.querySelectorAll('[data-robots-preset]').forEach(function (button) {
    button.addEventListener('click', function () {
      var preset = button.getAttribute('data-robots-preset');

      if (preset === 'basic') {
        agentSelect.value = '*';
        setRules([{ type: 'Disallow', path: '/privado/' }]);
      }

      if (preset === 'wordpress') {
        agentSelect.value = '*';
        setRules([
          { type: 'Disallow', path: '/wp-admin/' },
          { type: 'Allow', path: '/wp-admin/admin-ajax.php' }
        ]);
      }

      if (preset === 'block') {
        agentSelect.value = '*';
        sitemap.value = '';
        delay.value = '';
        setRules([{ type: 'Disallow', path: '/' }]);
      }

      if (preset === 'clear') {
        setRules([]);
      }

      update();
    });
  });

  document.getElementById('robots-copy').addEventListener('click', function () {
    navigator.clipboard.writeText(code.textContent).then(function () {
      status.textContent = 'robots.txt copiado al portapapeles.';
    }).catch(function () {
      status.textContent = 'No se pudo copiar automáticamente. Selecciona el código y cópialo manualmente.';
    });
  });

  document.getElementById('robots-download').addEventListener('click', function () {
    var blob = new Blob([code.textContent], { type: 'text/plain;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'robots.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 0);
    status.textContent = 'Archivo robots.txt preparado.';
  });

  createRule('Disallow', '/privado/');
  update();
})();