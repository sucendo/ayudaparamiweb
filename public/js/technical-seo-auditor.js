(function () {
  var mount = document.getElementById('technical-seo-auditor-app');
  if (!mount) return;

  mount.innerHTML = [
    '<div class="tsa-tool">',
    '  <section class="tsa-input">',
    '    <div class="tsa-field">',
    '      <label for="tsa-page-url">URL de la página <span>(opcional)</span></label>',
    '      <input id="tsa-page-url" type="url" placeholder="https://www.ejemplo.com/pagina">',
    '      <small>Ayuda a resolver canonical, hreflang, imágenes y enlaces relativos.</small>',
    '    </div>',
    '    <div class="tsa-field">',
    '      <label for="tsa-html">HTML de la página</label>',
    '      <textarea id="tsa-html" rows="15" placeholder="Pega aquí el HTML completo de la página..."></textarea>',
    '    </div>',
    '    <div class="tsa-actions">',
    '      <button type="button" id="tsa-analyze">Auditar SEO técnico</button>',
    '      <button type="button" id="tsa-example" class="tsa-secondary">Cargar ejemplo</button>',
    '      <button type="button" id="tsa-clear" class="tsa-secondary">Limpiar</button>',
    '    </div>',
    '  </section>',
    '  <section class="tsa-result">',
    '    <div class="tsa-overview">',
    '      <div class="tsa-score-card">',
    '        <div class="tsa-score-ring" id="tsa-score-ring"><strong id="tsa-score">—</strong><span>/100</span></div>',
    '        <div><strong id="tsa-verdict">Sin analizar</strong><small>Puntuación orientativa</small></div>',
    '      </div>',
    '      <div class="tsa-kpis">',
    '        <div><strong id="tsa-errors">0</strong><span>Errores</span></div>',
    '        <div><strong id="tsa-warnings">0</strong><span>Avisos</span></div>',
    '        <div><strong id="tsa-ok">0</strong><span>Correctos</span></div>',
    '      </div>',
    '    </div>',
    '    <div id="tsa-state" class="tsa-state">Pega un HTML y pulsa “Auditar SEO técnico”.</div>',
    '    <div id="tsa-sections" class="tsa-sections" hidden></div>',
    '    <div id="tsa-findings-panel" class="tsa-panel" hidden>',
    '      <div class="tsa-panel-head">',
    '        <h3>Comprobaciones</h3>',
    '        <div class="tsa-filter-group" role="group" aria-label="Filtrar comprobaciones">',
    '          <button type="button" class="is-active" data-tsa-filter="all">Todas</button>',
    '          <button type="button" data-tsa-filter="error">Errores</button>',
    '          <button type="button" data-tsa-filter="warning">Avisos</button>',
    '          <button type="button" data-tsa-filter="ok">Correctas</button>',
    '        </div>',
    '      </div>',
    '      <div id="tsa-findings" class="tsa-findings"></div>',
    '    </div>',
    '    <div id="tsa-details-panel" class="tsa-panel" hidden>',
    '      <h3>Datos detectados</h3>',
    '      <div id="tsa-details" class="tsa-details"></div>',
    '    </div>',
    '    <div class="tsa-report-actions" id="tsa-report-actions" hidden>',
    '      <button type="button" id="tsa-copy-report">Copiar informe</button>',
    '    </div>',
    '    <p id="tsa-copy-status" class="tsa-copy-status" aria-live="polite"></p>',
    '  </section>',
    '</div>'
  ].join('');

  var urlInput = document.getElementById('tsa-page-url');
  var htmlInput = document.getElementById('tsa-html');
  var sectionsEl = document.getElementById('tsa-sections');
  var findingsPanel = document.getElementById('tsa-findings-panel');
  var findingsEl = document.getElementById('tsa-findings');
  var detailsPanel = document.getElementById('tsa-details-panel');
  var detailsEl = document.getElementById('tsa-details');
  var reportActions = document.getElementById('tsa-report-actions');
  var stateEl = document.getElementById('tsa-state');
  var copyStatus = document.getElementById('tsa-copy-status');
  var currentFilter = 'all';
  var lastReport = null;

  var sectionDefs = [
    { key: 'metadata', label: 'Metadatos', max: 20 },
    { key: 'indexability', label: 'Indexabilidad', max: 20 },
    { key: 'structure', label: 'Estructura', max: 20 },
    { key: 'linksImages', label: 'Enlaces e imágenes', max: 20 },
    { key: 'socialStructured', label: 'Social y datos estructurados', max: 20 }
  ];

  function clean(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function baseUrl() {
    var raw = urlInput.value.trim();
    if (!raw) return null;
    try { return new URL(raw); } catch (error) { return null; }
  }

  function resolveUrl(value, base) {
    var raw = clean(value);
    if (!raw) return null;
    try { return new URL(raw, base ? base.href : undefined); } catch (error) { return null; }
  }

  function weakAnchor(text) {
    var normalized = clean(text).toLowerCase().replace(/[.!:;?¡¿]+$/g, '');
    return ['aquí','aqui','clic aquí','clic aqui','click aquí','click aqui','leer más','leer mas','más','mas','más información','mas informacion','ver más','ver mas','enlace','link'].indexOf(normalized) !== -1;
  }

  function addFinding(report, section, points, passed, severity, title, detail) {
    report.findings.push({
      section: section,
      points: points,
      passed: passed,
      severity: passed ? 'ok' : severity,
      title: title,
      detail: detail
    });
    if (passed) report.sectionScores[section] += points;
  }

  function scoreTitle(report, doc) {
    var node = doc.querySelector('title');
    var value = clean(node ? node.textContent : '');
    var length = value.length;

    addFinding(report, 'metadata', 5, !!value, 'error', 'Title presente', value ? 'Se ha encontrado un title.' : 'Falta la etiqueta <title>.');
    addFinding(report, 'metadata', 3, !!value && length >= 25 && length <= 65, 'warning', 'Longitud del title', value ? length + ' caracteres.' : 'No se puede medir sin title.');
    report.details.title = value || 'No detectado';
  }

  function scoreDescription(report, doc) {
    var node = doc.querySelector('meta[name="description" i]');
    var value = clean(node ? node.getAttribute('content') : '');
    var length = value.length;

    addFinding(report, 'metadata', 5, !!value, 'error', 'Meta description presente', value ? 'Se ha encontrado meta description.' : 'Falta meta description.');
    addFinding(report, 'metadata', 3, !!value && length >= 70 && length <= 170, 'warning', 'Longitud de la description', value ? length + ' caracteres.' : 'No se puede medir sin description.');
    report.details.description = value || 'No detectada';
  }

  function scoreDocumentBasics(report, doc) {
    var html = doc.documentElement;
    var lang = clean(html.getAttribute('lang'));
    var viewport = doc.querySelector('meta[name="viewport" i]');
    var charset = doc.querySelector('meta[charset]');

    addFinding(report, 'metadata', 2, !!lang, 'warning', 'Idioma del documento', lang ? 'lang="' + lang + '".' : 'Falta el atributo lang en <html>.');
    addFinding(report, 'metadata', 1, !!viewport, 'warning', 'Viewport móvil', viewport ? 'Meta viewport presente.' : 'No se ha encontrado meta viewport.');
    addFinding(report, 'metadata', 1, !!charset, 'warning', 'Charset declarado', charset ? 'Charset presente.' : 'No se ha encontrado meta charset.');

    report.details.lang = lang || 'No detectado';
  }

  function scoreIndexability(report, doc, base) {
    var robotsNodes = Array.prototype.slice.call(doc.querySelectorAll('meta[name="robots" i]'));
    var robotsContent = robotsNodes.map(function (node) { return clean(node.getAttribute('content')).toLowerCase(); }).join(', ');
    var noindex = /(^|[\s,])noindex([\s,]|$)/.test(robotsContent);
    var canonicals = Array.prototype.slice.call(doc.querySelectorAll('link[rel~="canonical"]'));
    var canonicalHref = canonicals.length ? clean(canonicals[0].getAttribute('href')) : '';
    var canonicalUrl = resolveUrl(canonicalHref, base);

    addFinding(report, 'indexability', 5, !noindex, 'error', 'Directiva de indexación', noindex ? 'Se ha detectado noindex.' : 'No se ha detectado noindex.');
    addFinding(report, 'indexability', 2, robotsNodes.length <= 1, 'warning', 'Meta robots única', robotsNodes.length <= 1 ? 'No hay meta robots duplicada.' : 'Hay ' + robotsNodes.length + ' etiquetas meta robots.');
    addFinding(report, 'indexability', 5, canonicals.length === 1, canonicals.length === 0 ? 'warning' : 'error', 'Canonical única', canonicals.length === 1 ? 'Se ha encontrado una canonical.' : 'Se han encontrado ' + canonicals.length + ' etiquetas canonical.');
    addFinding(report, 'indexability', 4, canonicals.length === 1 && !!canonicalUrl, 'error', 'URL canonical válida', canonicalUrl ? canonicalUrl.href : 'La canonical falta o no se puede resolver.');

    var selfCanonical = true;
    if (base && canonicalUrl) {
      selfCanonical = base.href.replace(/#.*$/, '') === canonicalUrl.href.replace(/#.*$/, '');
    }
    addFinding(report, 'indexability', 4, !base || !canonicalUrl || selfCanonical, 'warning', 'Coherencia canonical', !base ? 'No se indicó URL base para comparar.' : (selfCanonical ? 'La canonical coincide con la URL indicada.' : 'La canonical apunta a una URL diferente; revisa que sea intencionado.'));

    report.details.robots = robotsContent || 'Sin meta robots';
    report.details.canonical = canonicalUrl ? canonicalUrl.href : (canonicalHref || 'No detectada');
  }

  function scoreStructure(report, doc) {
    var headings = Array.prototype.slice.call(doc.querySelectorAll('h1,h2,h3,h4,h5,h6'));
    var h1s = headings.filter(function (node) { return node.tagName === 'H1'; });
    var empty = headings.filter(function (node) { return !clean(node.textContent); });
    var skips = 0;
    var previousLevel = null;

    headings.forEach(function (node) {
      var level = Number(node.tagName.slice(1));
      if (previousLevel !== null && level > previousLevel + 1) skips += 1;
      previousLevel = level;
    });

    addFinding(report, 'structure', 7, h1s.length === 1, 'warning', 'Un H1 principal', h1s.length === 1 ? 'Se ha encontrado un único H1.' : 'Se han encontrado ' + h1s.length + ' H1.');
    addFinding(report, 'structure', 5, headings.length > 0, 'warning', 'Encabezados presentes', headings.length ? headings.length + ' encabezados H1-H6.' : 'No se han encontrado encabezados H1-H6.');
    addFinding(report, 'structure', 4, skips === 0, 'warning', 'Jerarquía sin saltos', skips ? 'Hay ' + skips + ' salto' + (skips === 1 ? '' : 's') + ' de nivel.' : 'No se han detectado saltos de nivel.');
    addFinding(report, 'structure', 2, empty.length === 0, 'warning', 'Encabezados con texto', empty.length ? empty.length + ' encabezado' + (empty.length === 1 ? '' : 's') + ' vacío.' : 'No hay encabezados vacíos.');
    addFinding(report, 'structure', 2, !!doc.querySelector('main'), 'warning', 'Elemento main', doc.querySelector('main') ? 'Se ha encontrado <main>.' : 'No se ha encontrado <main>.');

    report.details.headings = headings.length + ' encabezados; ' + h1s.length + ' H1';
  }

  function scoreLinksAndImages(report, doc, base) {
    var links = Array.prototype.slice.call(doc.querySelectorAll('a'));
    var internal = 0;
    var external = 0;
    var weak = 0;
    var javascriptLinks = 0;
    var blankUnsafe = 0;

    links.forEach(function (anchor) {
      var href = clean(anchor.getAttribute('href'));
      var text = clean(anchor.textContent) || clean(anchor.getAttribute('aria-label'));
      var resolved = resolveUrl(href, base);
      var rel = clean(anchor.getAttribute('rel')).toLowerCase();
      var target = clean(anchor.getAttribute('target')).toLowerCase();

      if (/^javascript:/i.test(href)) javascriptLinks += 1;
      if (!text || weakAnchor(text)) weak += 1;
      if (target === '_blank' && rel.indexOf('noopener') === -1 && rel.indexOf('noreferrer') === -1) blankUnsafe += 1;

      if (resolved && /^https?:$/.test(resolved.protocol)) {
        if (base && resolved.hostname === base.hostname) internal += 1;
        else external += 1;
      }
    });

    var images = Array.prototype.slice.call(doc.querySelectorAll('img'));
    var missingAlt = images.filter(function (img) { return !img.hasAttribute('alt'); }).length;
    var emptyAlt = images.filter(function (img) { return img.hasAttribute('alt') && clean(img.getAttribute('alt')) === ''; }).length;
    var lazy = images.filter(function (img) { return clean(img.getAttribute('loading')).toLowerCase() === 'lazy'; }).length;

    addFinding(report, 'linksImages', 5, weak === 0, 'warning', 'Anchor text descriptivo', weak ? weak + ' enlace' + (weak === 1 ? '' : 's') + ' con texto vacío o genérico.' : 'No se han detectado anchors vacíos o genéricos.');
    addFinding(report, 'linksImages', 3, javascriptLinks === 0, 'warning', 'Enlaces sin javascript:', javascriptLinks ? javascriptLinks + ' enlace' + (javascriptLinks === 1 ? '' : 's') + ' utiliza javascript:.' : 'No se han detectado enlaces javascript:.');
    addFinding(report, 'linksImages', 2, blankUnsafe === 0, 'warning', 'Nueva pestaña segura', blankUnsafe ? blankUnsafe + ' enlace' + (blankUnsafe === 1 ? '' : 's') + ' con target="_blank" sin noopener/noreferrer.' : 'No se han detectado enlaces _blank inseguros.');
    addFinding(report, 'linksImages', 6, missingAlt === 0, 'warning', 'Imágenes con atributo alt', missingAlt ? missingAlt + ' imagen' + (missingAlt === 1 ? '' : 'es') + ' sin atributo alt.' : 'Todas las imágenes incluyen atributo alt.');
    addFinding(report, 'linksImages', 2, images.length === 0 || missingAlt + emptyAlt < images.length, 'warning', 'Texto alternativo útil', images.length ? emptyAlt + ' imágenes usan alt vacío (puede ser correcto si son decorativas).' : 'No hay imágenes.');
    addFinding(report, 'linksImages', 2, true, 'ok', 'Inventario de recursos', links.length + ' enlaces; ' + images.length + ' imágenes; ' + lazy + ' imágenes con lazy loading.');

    report.details.links = links.length + ' total; ' + internal + ' internos; ' + external + ' externos';
    report.details.images = images.length + ' total; ' + missingAlt + ' sin alt; ' + lazy + ' lazy';
  }

  function scoreSocialStructured(report, doc, base) {
    var alternates = Array.prototype.slice.call(doc.querySelectorAll('link[rel~="alternate"][hreflang]'));
    var duplicateLang = false;
    var seen = Object.create(null);
    var invalidHref = 0;
    var hasXDefault = false;

    alternates.forEach(function (link) {
      var lang = clean(link.getAttribute('hreflang')).toLowerCase();
      if (seen[lang]) duplicateLang = true;
      seen[lang] = true;
      if (lang === 'x-default') hasXDefault = true;
      if (!resolveUrl(link.getAttribute('href'), base)) invalidHref += 1;
    });

    var hreflangOk = alternates.length === 0 || (!duplicateLang && invalidHref === 0);
    addFinding(report, 'socialStructured', 4, hreflangOk, 'warning', 'Hreflang coherente', alternates.length === 0 ? 'No se han encontrado hreflang.' : (hreflangOk ? alternates.length + ' variantes sin duplicados ni URLs inválidas.' : 'Hay duplicados o URLs hreflang inválidas.'));
    addFinding(report, 'socialStructured', 1, alternates.length === 0 || hasXDefault, 'info', 'x-default', alternates.length === 0 ? 'No aplica sin hreflang.' : (hasXDefault ? 'x-default presente.' : 'No se ha encontrado x-default.'));

    var jsonLdNodes = Array.prototype.slice.call(doc.querySelectorAll('script[type="application/ld+json" i]'));
    var jsonLdValid = 0;
    jsonLdNodes.forEach(function (node) {
      try {
        JSON.parse(node.textContent);
        jsonLdValid += 1;
      } catch (error) {}
    });
    addFinding(report, 'socialStructured', 5, jsonLdNodes.length > 0 && jsonLdValid === jsonLdNodes.length, jsonLdNodes.length ? 'error' : 'info', 'Datos estructurados JSON-LD', jsonLdNodes.length ? jsonLdValid + ' de ' + jsonLdNodes.length + ' bloques JSON-LD son JSON válido.' : 'No se han encontrado bloques JSON-LD.');

    var ogTitle = doc.querySelector('meta[property="og:title" i]');
    var ogDescription = doc.querySelector('meta[property="og:description" i]');
    var ogImage = doc.querySelector('meta[property="og:image" i]');
    var ogUrl = doc.querySelector('meta[property="og:url" i]');
    var ogCount = [ogTitle, ogDescription, ogImage, ogUrl].filter(Boolean).length;
    addFinding(report, 'socialStructured', 6, ogCount === 4, 'warning', 'Open Graph básico', ogCount + ' de 4 etiquetas principales presentes (title, description, image, url).');

    var twitterCard = doc.querySelector('meta[name="twitter:card" i]');
    var twitterTitle = doc.querySelector('meta[name="twitter:title" i]');
    var twitterDescription = doc.querySelector('meta[name="twitter:description" i]');
    var twitterCount = [twitterCard, twitterTitle, twitterDescription].filter(Boolean).length;
    addFinding(report, 'socialStructured', 4, twitterCount >= 1, 'info', 'Twitter/X Card', twitterCount ? twitterCount + ' etiquetas Twitter/X detectadas.' : 'No se han encontrado etiquetas Twitter/X Card.');

    report.details.hreflang = alternates.length + ' variantes';
    report.details.schema = jsonLdNodes.length + ' bloques JSON-LD; ' + jsonLdValid + ' válidos';
    report.details.openGraph = ogCount + ' de 4 principales';
  }

  function createReport(doc, base) {
    var report = {
      sectionScores: {
        metadata: 0,
        indexability: 0,
        structure: 0,
        linksImages: 0,
        socialStructured: 0
      },
      findings: [],
      details: {}
    };

    scoreTitle(report, doc);
    scoreDescription(report, doc);
    scoreDocumentBasics(report, doc);
    scoreIndexability(report, doc, base);
    scoreStructure(report, doc);
    scoreLinksAndImages(report, doc, base);
    scoreSocialStructured(report, doc, base);

    report.score = sectionDefs.reduce(function (sum, section) {
      return sum + Math.min(section.max, report.sectionScores[section.key]);
    }, 0);

    return report;
  }

  function renderSections(report) {
    sectionsEl.innerHTML = '';
    sectionDefs.forEach(function (section) {
      var score = Math.min(section.max, report.sectionScores[section.key]);
      var percent = Math.round(score / section.max * 100);
      var item = document.createElement('div');
      item.className = 'tsa-section-card';
      item.innerHTML = '<div class="tsa-section-card__top"><strong>' + section.label + '</strong><span>' + score + '/' + section.max + '</span></div><div class="tsa-progress"><span style="width:' + percent + '%"></span></div>';
      sectionsEl.appendChild(item);
    });
    sectionsEl.hidden = false;
  }

  function filteredFindings() {
    if (!lastReport) return [];
    if (currentFilter === 'all') return lastReport.findings;
    return lastReport.findings.filter(function (finding) { return finding.severity === currentFilter; });
  }

  function renderFindings() {
    findingsEl.innerHTML = '';
    filteredFindings().forEach(function (finding) {
      var item = document.createElement('div');
      item.className = 'tsa-finding tsa-finding--' + finding.severity;

      var icon = document.createElement('span');
      icon.className = 'tsa-finding__icon';
      icon.textContent = finding.severity === 'ok' ? '✓' : (finding.severity === 'error' ? '!' : (finding.severity === 'warning' ? '△' : 'i'));

      var copy = document.createElement('div');
      var title = document.createElement('strong');
      title.textContent = finding.title;
      var detail = document.createElement('p');
      detail.textContent = finding.detail;
      copy.appendChild(title);
      copy.appendChild(detail);

      item.appendChild(icon);
      item.appendChild(copy);
      findingsEl.appendChild(item);
    });
  }

  function renderDetails(report) {
    detailsEl.innerHTML = '';
    Object.keys(report.details).forEach(function (key) {
      var labels = {
        title: 'Title',
        description: 'Meta description',
        lang: 'Idioma',
        robots: 'Robots',
        canonical: 'Canonical',
        headings: 'Encabezados',
        links: 'Enlaces',
        images: 'Imágenes',
        hreflang: 'Hreflang',
        schema: 'Schema / JSON-LD',
        openGraph: 'Open Graph'
      };
      var row = document.createElement('div');
      var dt = document.createElement('strong');
      var dd = document.createElement('span');
      dt.textContent = labels[key] || key;
      dd.textContent = report.details[key];
      row.appendChild(dt);
      row.appendChild(dd);
      detailsEl.appendChild(row);
    });
  }

  function updateOverview(report) {
    var errors = report.findings.filter(function (item) { return item.severity === 'error'; }).length;
    var warnings = report.findings.filter(function (item) { return item.severity === 'warning'; }).length;
    var oks = report.findings.filter(function (item) { return item.severity === 'ok'; }).length;
    var verdict = report.score >= 85 ? 'Muy sólido' : (report.score >= 70 ? 'Bien, con mejoras' : (report.score >= 50 ? 'Necesita revisión' : 'Prioridad alta'));

    document.getElementById('tsa-score').textContent = String(report.score);
    document.getElementById('tsa-verdict').textContent = verdict;
    document.getElementById('tsa-errors').textContent = String(errors);
    document.getElementById('tsa-warnings').textContent = String(warnings);
    document.getElementById('tsa-ok').textContent = String(oks);

    var ring = document.getElementById('tsa-score-ring');
    ring.style.setProperty('--score', report.score);
    ring.setAttribute('data-state', report.score >= 85 ? 'good' : (report.score >= 70 ? 'fair' : (report.score >= 50 ? 'warning' : 'bad')));
  }

  function analyze() {
    var raw = htmlInput.value.trim();
    copyStatus.textContent = '';

    if (!raw) {
      stateEl.textContent = 'No hay HTML que analizar.';
      document.getElementById('tsa-score').textContent = '—';
      document.getElementById('tsa-verdict').textContent = 'Sin analizar';
      document.getElementById('tsa-errors').textContent = '0';
      document.getElementById('tsa-warnings').textContent = '0';
      document.getElementById('tsa-ok').textContent = '0';
      sectionsEl.hidden = true;
      findingsPanel.hidden = true;
      detailsPanel.hidden = true;
      reportActions.hidden = true;
      lastReport = null;
      return;
    }

    var doc = new DOMParser().parseFromString(raw, 'text/html');
    var base = baseUrl();
    lastReport = createReport(doc, base);

    updateOverview(lastReport);
    renderSections(lastReport);

    currentFilter = 'all';
    mount.querySelectorAll('[data-tsa-filter]').forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute('data-tsa-filter') === 'all');
    });

    renderFindings();
    renderDetails(lastReport);

    findingsPanel.hidden = false;
    detailsPanel.hidden = false;
    reportActions.hidden = false;
    stateEl.textContent = 'Auditoría completada. La puntuación es orientativa y se basa en el HTML pegado.';
  }

  mount.querySelectorAll('[data-tsa-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      currentFilter = button.getAttribute('data-tsa-filter');
      mount.querySelectorAll('[data-tsa-filter]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      renderFindings();
    });
  });

  document.getElementById('tsa-analyze').addEventListener('click', analyze);

  document.getElementById('tsa-example').addEventListener('click', function () {
    urlInput.value = 'https://www.ejemplo.com/es/guia-seo';
    htmlInput.value = [
      '<!doctype html>',
      '<html lang="es">',
      '<head>',
      '  <meta charset="utf-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1">',
      '  <title>Guía de SEO técnico para mejorar una web</title>',
      '  <meta name="description" content="Aprende a revisar los principales elementos de SEO técnico de una página con ejemplos prácticos y comprobaciones fáciles de aplicar.">',
      '  <meta name="robots" content="index,follow">',
      '  <link rel="canonical" href="https://www.ejemplo.com/es/guia-seo">',
      '  <link rel="alternate" hreflang="es" href="https://www.ejemplo.com/es/guia-seo">',
      '  <link rel="alternate" hreflang="en" href="https://www.ejemplo.com/en/seo-guide">',
      '  <link rel="alternate" hreflang="x-default" href="https://www.ejemplo.com/seo-guide">',
      '  <meta property="og:title" content="Guía de SEO técnico">',
      '  <meta property="og:description" content="Revisa el SEO técnico de tu web.">',
      '  <meta property="og:image" content="https://www.ejemplo.com/img/seo.jpg">',
      '  <meta property="og:url" content="https://www.ejemplo.com/es/guia-seo">',
      '  <meta name="twitter:card" content="summary_large_image">',
      '  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Guía de SEO técnico"}</script>',
      '</head>',
      '<body>',
      '<main>',
      '  <h1>Guía de SEO técnico</h1>',
      '  <p><a href="/herramientas">Herramientas SEO</a></p>',
      '  <h2>Indexabilidad</h2>',
      '  <p><a href="https://developer.mozilla.org/" rel="noopener" target="_blank">Documentación web</a></p>',
      '  <h2>Imágenes</h2>',
      '  <img src="/img/ejemplo.jpg" alt="Ejemplo de auditoría SEO" loading="lazy">',
      '</main>',
      '</body>',
      '</html>'
    ].join('\n');
    analyze();
  });

  document.getElementById('tsa-clear').addEventListener('click', function () {
    urlInput.value = '';
    htmlInput.value = '';
    analyze();
    stateEl.textContent = 'Campos limpiados.';
  });

  document.getElementById('tsa-copy-report').addEventListener('click', function () {
    if (!lastReport) return;
    var lines = ['AUDITORÍA SEO TÉCNICA', 'Puntuación: ' + lastReport.score + '/100', ''];
    sectionDefs.forEach(function (section) {
      lines.push(section.label + ': ' + lastReport.sectionScores[section.key] + '/' + section.max);
    });
    lines.push('');
    lastReport.findings.forEach(function (finding) {
      lines.push('[' + finding.severity.toUpperCase() + '] ' + finding.title + ': ' + finding.detail);
    });

    navigator.clipboard.writeText(lines.join('\n')).then(function () {
      copyStatus.textContent = 'Informe copiado al portapapeles.';
    }).catch(function () {
      copyStatus.textContent = 'No se pudo copiar automáticamente.';
    });
  });
})();