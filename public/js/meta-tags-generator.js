(function () {
  var mount = document.getElementById('meta-tags-generator-app');
  if (!mount) return;

  mount.innerHTML = [
    '<div class="meta-tool">',
    '  <section class="meta-tool__form" aria-label="Datos de las metaetiquetas">',
    '    <div class="meta-field">',
    '      <div class="meta-field__head"><label for="meta-title">Title</label><span id="meta-title-count"></span></div>',
    '      <input id="meta-title" type="text" value="Guía completa de SEO para mejorar tu web" maxlength="140">',
    '    </div>',
    '    <div class="meta-field">',
    '      <div class="meta-field__head"><label for="meta-description">Meta description</label><span id="meta-description-count"></span></div>',
    '      <textarea id="meta-description" rows="4" maxlength="320">Aprende a mejorar el SEO de tu web con recomendaciones prácticas y ejemplos claros.</textarea>',
    '    </div>',
    '    <div class="meta-field">',
    '      <label for="meta-url">URL canónica</label>',
    '      <input id="meta-url" type="url" value="https://www.ejemplo.com/guia-seo" autocomplete="url">',
    '    </div>',
    '    <div class="meta-grid">',
    '      <div class="meta-field">',
    '        <label for="meta-robots-index">Indexación</label>',
    '        <select id="meta-robots-index"><option value="index">index</option><option value="noindex">noindex</option></select>',
    '      </div>',
    '      <div class="meta-field">',
    '        <label for="meta-robots-follow">Enlaces</label>',
    '        <select id="meta-robots-follow"><option value="follow">follow</option><option value="nofollow">nofollow</option></select>',
    '      </div>',
    '    </div>',
    '    <h3>Redes sociales</h3>',
    '    <div class="meta-field">',
    '      <label for="meta-site">Nombre del sitio</label>',
    '      <input id="meta-site" type="text" value="Ejemplo">',
    '    </div>',
    '    <div class="meta-grid">',
    '      <div class="meta-field">',
    '        <label for="meta-og-type">Tipo Open Graph</label>',
    '        <select id="meta-og-type"><option value="website">website</option><option value="article">article</option><option value="product">product</option><option value="profile">profile</option></select>',
    '      </div>',
    '      <div class="meta-field">',
    '        <label for="meta-twitter-card">Twitter Card</label>',
    '        <select id="meta-twitter-card"><option value="summary_large_image">summary_large_image</option><option value="summary">summary</option></select>',
    '      </div>',
    '    </div>',
    '    <div class="meta-field">',
    '      <label for="meta-image">URL de imagen social</label>',
    '      <input id="meta-image" type="url" placeholder="https://www.ejemplo.com/imagen.jpg">',
    '    </div>',
    '    <div class="meta-field">',
    '      <label for="meta-twitter-site">Cuenta X/Twitter <span class="meta-optional">(opcional)</span></label>',
    '      <input id="meta-twitter-site" type="text" placeholder="@usuario">',
    '    </div>',
    '  </section>',
    '  <section class="meta-tool__output" aria-label="Código generado">',
    '    <div class="meta-tool__tabs" role="tablist" aria-label="Bloques de código">',
    '      <button type="button" class="is-active" data-meta-tab="all">Todo</button>',
    '      <button type="button" data-meta-tab="seo">SEO</button>',
    '      <button type="button" data-meta-tab="social">Social</button>',
    '    </div>',
    '    <pre><code id="meta-code"></code></pre>',
    '    <div class="meta-tool__actions">',
    '      <button type="button" id="meta-copy">Copiar código</button>',
    '      <button type="button" id="meta-reset" class="meta-tool__secondary">Restablecer</button>',
    '    </div>',
    '    <p id="meta-status" class="meta-tool__status" aria-live="polite"></p>',
    '  </section>',
    '</div>'
  ].join('');

  var defaults = {
    title: 'Guía completa de SEO para mejorar tu web',
    description: 'Aprende a mejorar el SEO de tu web con recomendaciones prácticas y ejemplos claros.',
    url: 'https://www.ejemplo.com/guia-seo',
    site: 'Ejemplo'
  };

  var title = document.getElementById('meta-title');
  var description = document.getElementById('meta-description');
  var url = document.getElementById('meta-url');
  var robotsIndex = document.getElementById('meta-robots-index');
  var robotsFollow = document.getElementById('meta-robots-follow');
  var site = document.getElementById('meta-site');
  var ogType = document.getElementById('meta-og-type');
  var twitterCard = document.getElementById('meta-twitter-card');
  var image = document.getElementById('meta-image');
  var twitterSite = document.getElementById('meta-twitter-site');
  var code = document.getElementById('meta-code');
  var status = document.getElementById('meta-status');
  var titleCount = document.getElementById('meta-title-count');
  var descriptionCount = document.getElementById('meta-description-count');
  var activeTab = 'all';

  function escapeAttribute(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function normalizeTwitter(value) {
    var text = String(value || '').trim();
    if (!text) return '';
    return text.charAt(0) === '@' ? text : '@' + text;
  }

  function seoLines() {
    var lines = [];
    var titleValue = title.value.trim();
    var descriptionValue = description.value.trim();
    var urlValue = url.value.trim();
    var robotsValue = robotsIndex.value + ', ' + robotsFollow.value;

    if (titleValue) lines.push('<title>' + titleValue.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</title>');
    if (descriptionValue) lines.push('<meta name="description" content="' + escapeAttribute(descriptionValue) + '">');
    if (urlValue) lines.push('<link rel="canonical" href="' + escapeAttribute(urlValue) + '">');
    lines.push('<meta name="robots" content="' + robotsValue + '">');

    return lines;
  }

  function socialLines() {
    var lines = [];
    var titleValue = title.value.trim();
    var descriptionValue = description.value.trim();
    var urlValue = url.value.trim();
    var siteValue = site.value.trim();
    var imageValue = image.value.trim();
    var twitterValue = normalizeTwitter(twitterSite.value);

    lines.push('<meta property="og:type" content="' + escapeAttribute(ogType.value) + '">');
    if (titleValue) lines.push('<meta property="og:title" content="' + escapeAttribute(titleValue) + '">');
    if (descriptionValue) lines.push('<meta property="og:description" content="' + escapeAttribute(descriptionValue) + '">');
    if (urlValue) lines.push('<meta property="og:url" content="' + escapeAttribute(urlValue) + '">');
    if (siteValue) lines.push('<meta property="og:site_name" content="' + escapeAttribute(siteValue) + '">');
    if (imageValue) lines.push('<meta property="og:image" content="' + escapeAttribute(imageValue) + '">');

    lines.push('');
    lines.push('<meta name="twitter:card" content="' + escapeAttribute(twitterCard.value) + '">');
    if (twitterValue) lines.push('<meta name="twitter:site" content="' + escapeAttribute(twitterValue) + '">');
    if (titleValue) lines.push('<meta name="twitter:title" content="' + escapeAttribute(titleValue) + '">');
    if (descriptionValue) lines.push('<meta name="twitter:description" content="' + escapeAttribute(descriptionValue) + '">');
    if (imageValue) lines.push('<meta name="twitter:image" content="' + escapeAttribute(imageValue) + '">');

    return lines;
  }

  function generatedLines() {
    if (activeTab === 'seo') return seoLines();
    if (activeTab === 'social') return socialLines();
    return seoLines().concat([''], socialLines());
  }

  function update() {
    titleCount.textContent = title.value.length + ' caracteres';
    descriptionCount.textContent = description.value.length + ' caracteres';
    titleCount.classList.toggle('is-warning', title.value.length > 60);
    descriptionCount.classList.toggle('is-warning', description.value.length > 160);
    code.textContent = generatedLines().join('\n');
    status.textContent = '';
  }

  mount.querySelectorAll('input, textarea, select').forEach(function (element) {
    element.addEventListener('input', update);
    element.addEventListener('change', update);
  });

  mount.querySelectorAll('[data-meta-tab]').forEach(function (button) {
    button.addEventListener('click', function () {
      activeTab = button.getAttribute('data-meta-tab');
      mount.querySelectorAll('[data-meta-tab]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      update();
    });
  });

  document.getElementById('meta-copy').addEventListener('click', function () {
    navigator.clipboard.writeText(code.textContent).then(function () {
      status.textContent = 'Código copiado al portapapeles.';
    }).catch(function () {
      status.textContent = 'No se pudo copiar automáticamente. Selecciona el código y cópialo manualmente.';
    });
  });

  document.getElementById('meta-reset').addEventListener('click', function () {
    title.value = defaults.title;
    description.value = defaults.description;
    url.value = defaults.url;
    site.value = defaults.site;
    robotsIndex.value = 'index';
    robotsFollow.value = 'follow';
    ogType.value = 'website';
    twitterCard.value = 'summary_large_image';
    image.value = '';
    twitterSite.value = '';
    activeTab = 'all';

    mount.querySelectorAll('[data-meta-tab]').forEach(function (item) {
      item.classList.toggle('is-active', item.getAttribute('data-meta-tab') === 'all');
    });

    update();
  });

  update();
})();