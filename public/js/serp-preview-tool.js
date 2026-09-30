(function () {
  var mount = document.getElementById('serp-preview-app');
  if (!mount) return;

  mount.innerHTML = [
    '<div class="serp-tool">',
    '  <div class="serp-tool__editor">',
    '    <div class="serp-field">',
    '      <label for="serp-url">URL</label>',
    '      <input id="serp-url" type="url" value="https://www.ejemplo.com/guia-seo" autocomplete="url">',
    '    </div>',
    '    <div class="serp-field">',
    '      <label for="serp-site-name">Nombre del sitio <span class="serp-optional">(opcional)</span></label>',
    '      <input id="serp-site-name" type="text" value="Ejemplo" maxlength="60">',
    '    </div>',
    '    <div class="serp-field">',
    '      <div class="serp-field__head"><label for="serp-title">Title SEO</label><span id="serp-title-count"></span></div>',
    '      <input id="serp-title" type="text" value="Guía completa de SEO para mejorar tu web" maxlength="140">',
    '      <div class="serp-meter"><span id="serp-title-meter"></span></div>',
    '      <small id="serp-title-note"></small>',
    '    </div>',
    '    <div class="serp-field">',
    '      <div class="serp-field__head"><label for="serp-description">Meta description</label><span id="serp-description-count"></span></div>',
    '      <textarea id="serp-description" rows="5" maxlength="320">Aprende a mejorar el posicionamiento de tu web con una guía práctica de SEO, ejemplos claros y recomendaciones útiles.</textarea>',
    '      <div class="serp-meter"><span id="serp-description-meter"></span></div>',
    '      <small id="serp-description-note"></small>',
    '    </div>',
    '    <div class="serp-tool__controls">',
    '      <div class="serp-device" role="group" aria-label="Vista previa por dispositivo">',
    '        <button type="button" class="is-active" data-serp-device="desktop">Escritorio</button>',
    '        <button type="button" data-serp-device="mobile">Móvil</button>',
    '      </div>',
    '      <button type="button" id="serp-copy" class="serp-copy">Copiar metadatos</button>',
    '    </div>',
    '    <p id="serp-copy-status" class="serp-copy-status" aria-live="polite"></p>',
    '  </div>',
    '  <div class="serp-tool__preview-wrap">',
    '    <div class="serp-preview" data-device="desktop">',
    '      <div class="serp-preview__searchbar"><span class="serp-preview__logo">G</span><span class="serp-preview__query">resultado de búsqueda</span><span aria-hidden="true">⌕</span></div>',
    '      <div class="serp-preview__result">',
    '        <div class="serp-preview__source">',
    '          <span class="serp-preview__favicon" id="serp-favicon">E</span>',
    '          <span><strong id="serp-preview-site">Ejemplo</strong><small id="serp-preview-domain">www.ejemplo.com</small></span>',
    '        </div>',
    '        <div class="serp-preview__breadcrumb" id="serp-preview-breadcrumb">https://www.ejemplo.com › guia-seo</div>',
    '        <a class="serp-preview__title" id="serp-preview-title" href="#" tabindex="-1">Guía completa de SEO para mejorar tu web</a>',
    '        <p class="serp-preview__description" id="serp-preview-description">Aprende a mejorar el posicionamiento de tu web con una guía práctica de SEO, ejemplos claros y recomendaciones útiles.</p>',
    '      </div>',
    '    </div>',
    '    <p class="serp-preview__disclaimer">Vista orientativa: Google puede modificar el title, la descripción y la presentación final.</p>',
    '  </div>',
    '</div>'
  ].join('');

  var urlInput = document.getElementById('serp-url');
  var siteInput = document.getElementById('serp-site-name');
  var titleInput = document.getElementById('serp-title');
  var descriptionInput = document.getElementById('serp-description');
  var preview = mount.querySelector('.serp-preview');
  var previewSite = document.getElementById('serp-preview-site');
  var previewDomain = document.getElementById('serp-preview-domain');
  var previewBreadcrumb = document.getElementById('serp-preview-breadcrumb');
  var previewTitle = document.getElementById('serp-preview-title');
  var previewDescription = document.getElementById('serp-preview-description');
  var favicon = document.getElementById('serp-favicon');
  var titleCount = document.getElementById('serp-title-count');
  var descriptionCount = document.getElementById('serp-description-count');
  var titleMeter = document.getElementById('serp-title-meter');
  var descriptionMeter = document.getElementById('serp-description-meter');
  var titleNote = document.getElementById('serp-title-note');
  var descriptionNote = document.getElementById('serp-description-note');
  var copyStatus = document.getElementById('serp-copy-status');

  var measureCanvas = document.createElement('canvas');
  var measureContext = measureCanvas.getContext('2d');

  function normalizeUrl(raw) {
    var value = String(raw || '').trim();
    if (!value) return null;
    if (!/^https?:\/\//i.test(value)) value = 'https://' + value;
    try { return new URL(value); } catch (error) { return null; }
  }

  function estimatedWidth(text, font) {
    if (!measureContext) return String(text || '').length * 8;
    measureContext.font = font;
    return Math.round(measureContext.measureText(String(text || '')).width);
  }

  function setMeter(element, ratio, state) {
    element.style.width = Math.min(100, Math.max(0, ratio * 100)) + '%';
    element.setAttribute('data-state', state);
  }

  function updateLimits() {
    var title = titleInput.value.trim();
    var description = descriptionInput.value.trim();
    var titleWidth = estimatedWidth(title, '20px Arial');
    var descriptionWidth = estimatedWidth(description, '14px Arial');

    titleCount.textContent = title.length + ' caracteres · ~' + titleWidth + ' px';
    descriptionCount.textContent = description.length + ' caracteres · ~' + descriptionWidth + ' px';

    var titleState = titleWidth > 600 ? 'over' : (titleWidth < 300 ? 'short' : 'ok');
    var descriptionState = descriptionWidth > 920 ? 'over' : (descriptionWidth < 430 ? 'short' : 'ok');

    setMeter(titleMeter, titleWidth / 600, titleState);
    setMeter(descriptionMeter, descriptionWidth / 920, descriptionState);

    titleNote.textContent = titleState === 'over'
      ? 'Puede truncarse: prueba a acortarlo.'
      : (titleState === 'short' ? 'Todavía tienes bastante espacio orientativo.' : 'Longitud orientativa razonable.');

    descriptionNote.textContent = descriptionState === 'over'
      ? 'Es probable que no se muestre completa.'
      : (descriptionState === 'short' ? 'Puedes aportar algo más de contexto si lo necesitas.' : 'Longitud orientativa razonable.');
  }

  function updatePreview() {
    var url = normalizeUrl(urlInput.value);
    var title = titleInput.value.trim() || 'Título de ejemplo';
    var description = descriptionInput.value.trim() || 'Añade una meta description para ver aquí la previsualización.';
    var site = siteInput.value.trim();

    previewTitle.textContent = title;
    previewDescription.textContent = description;

    if (url) {
      var hostname = url.hostname.replace(/^www\./, '');
      var pathParts = url.pathname.split('/').filter(Boolean);
      var breadcrumb = url.origin + (pathParts.length ? ' › ' + pathParts.join(' › ') : '');

      previewDomain.textContent = url.hostname;
      previewBreadcrumb.textContent = breadcrumb;
      previewSite.textContent = site || hostname;
      favicon.textContent = (site || hostname || 'W').charAt(0).toUpperCase();
    } else {
      previewDomain.textContent = 'Introduce una URL válida';
      previewBreadcrumb.textContent = 'https://www.ejemplo.com';
      previewSite.textContent = site || 'Sitio web';
      favicon.textContent = (site || 'S').charAt(0).toUpperCase();
    }

    updateLimits();
  }

  [urlInput, siteInput, titleInput, descriptionInput].forEach(function (field) {
    field.addEventListener('input', updatePreview);
  });

  mount.querySelectorAll('[data-serp-device]').forEach(function (button) {
    button.addEventListener('click', function () {
      mount.querySelectorAll('[data-serp-device]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      preview.setAttribute('data-device', button.getAttribute('data-serp-device'));
    });
  });

  document.getElementById('serp-copy').addEventListener('click', function () {
    var url = normalizeUrl(urlInput.value);
    var lines = [
      '<title>' + titleInput.value.trim() + '</title>',
      '<meta name="description" content="' + descriptionInput.value.trim().replace(/"/g, '&quot;') + '">'
    ];
    if (url) lines.push('<link rel="canonical" href="' + url.href + '">');

    navigator.clipboard.writeText(lines.join('\n')).then(function () {
      copyStatus.textContent = 'Metadatos copiados al portapapeles.';
    }).catch(function () {
      copyStatus.textContent = 'No se pudo copiar automáticamente. Puedes seleccionar los campos y copiarlos manualmente.';
    });
  });

  updatePreview();
})();