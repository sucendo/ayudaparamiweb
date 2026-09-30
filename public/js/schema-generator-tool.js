(function () {
  var mount = document.getElementById('schema-generator-app');
  if (!mount) return;

  var definitions = {
    Article: [
      ['headline', 'Título del artículo', 'text', 'Guía completa de SEO'],
      ['description', 'Descripción', 'textarea', 'Resumen breve del contenido'],
      ['author', 'Autor', 'text', 'Tu nombre o marca'],
      ['datePublished', 'Fecha de publicación', 'date', ''],
      ['url', 'URL canónica', 'url', 'https://www.ejemplo.com/articulo'],
      ['image', 'URL de imagen', 'url', 'https://www.ejemplo.com/imagen.jpg']
    ],
    FAQPage: [
      ['question1', 'Pregunta 1', 'text', '¿Qué es Schema.org?'],
      ['answer1', 'Respuesta 1', 'textarea', 'Schema.org es un vocabulario de datos estructurados.'],
      ['question2', 'Pregunta 2', 'text', '¿Para qué sirve JSON-LD?'],
      ['answer2', 'Respuesta 2', 'textarea', 'Permite describir entidades de una página de forma estructurada.'],
      ['question3', 'Pregunta 3', 'text', '¿Es obligatorio usarlo?'],
      ['answer3', 'Respuesta 3', 'textarea', 'No, pero puede ayudar a los buscadores a comprender mejor el contenido.']
    ],
    Product: [
      ['name', 'Nombre del producto', 'text', 'Producto de ejemplo'],
      ['description', 'Descripción', 'textarea', 'Descripción del producto'],
      ['brand', 'Marca', 'text', 'Marca'],
      ['sku', 'SKU', 'text', 'SKU-001'],
      ['url', 'URL', 'url', 'https://www.ejemplo.com/producto'],
      ['image', 'URL de imagen', 'url', 'https://www.ejemplo.com/producto.jpg'],
      ['price', 'Precio', 'number', '49.90'],
      ['priceCurrency', 'Moneda', 'text', 'EUR']
    ],
    LocalBusiness: [
      ['name', 'Nombre del negocio', 'text', 'Mi negocio'],
      ['url', 'URL', 'url', 'https://www.ejemplo.com'],
      ['telephone', 'Teléfono', 'tel', '+34 910 000 000'],
      ['streetAddress', 'Dirección', 'text', 'Calle Ejemplo, 1'],
      ['addressLocality', 'Localidad', 'text', 'Madrid'],
      ['postalCode', 'Código postal', 'text', '28001'],
      ['addressCountry', 'País', 'text', 'ES']
    ],
    BreadcrumbList: [
      ['name1', 'Nivel 1', 'text', 'Inicio'],
      ['url1', 'URL nivel 1', 'url', 'https://www.ejemplo.com/'],
      ['name2', 'Nivel 2', 'text', 'Artículos'],
      ['url2', 'URL nivel 2', 'url', 'https://www.ejemplo.com/articulos'],
      ['name3', 'Página actual', 'text', 'Guía SEO'],
      ['url3', 'URL actual', 'url', 'https://www.ejemplo.com/guia-seo']
    ]
  };

  mount.innerHTML = [
    '<div class="schema-generator">',
    '  <div class="schema-generator__toolbar">',
    '    <label for="schema-type"><strong>Tipo de schema</strong></label>',
    '    <select id="schema-type">',
    '      <option value="Article">Article</option>',
    '      <option value="FAQPage">FAQPage</option>',
    '      <option value="Product">Product</option>',
    '      <option value="LocalBusiness">LocalBusiness</option>',
    '      <option value="BreadcrumbList">BreadcrumbList</option>',
    '    </select>',
    '  </div>',
    '  <div class="schema-generator__layout">',
    '    <section class="schema-generator__form" aria-label="Campos del schema">',
    '      <div id="schema-fields"></div>',
    '    </section>',
    '    <section class="schema-generator__preview">',
    '      <div class="schema-generator__preview-head">',
    '        <strong>JSON-LD generado</strong>',
    '        <button type="button" id="schema-copy">Copiar JSON-LD</button>',
    '      </div>',
    '      <pre><code id="schema-output"></code></pre>',
    '      <p id="schema-status" class="schema-generator__status" aria-live="polite"></p>',
    '    </section>',
    '  </div>',
    '</div>'
  ].join('');

  var typeSelect = document.getElementById('schema-type');
  var fields = document.getElementById('schema-fields');
  var output = document.getElementById('schema-output');
  var copyButton = document.getElementById('schema-copy');
  var status = document.getElementById('schema-status');

  function value(name) {
    var input = fields.querySelector('[data-schema-field="' + name + '"]');
    return input ? input.value.trim() : '';
  }

  function compact(object) {
    Object.keys(object).forEach(function (key) {
      if (object[key] === '' || object[key] == null) delete object[key];
    });
    return object;
  }

  function buildSchema() {
    var type = typeSelect.value;
    var data = { '@context': 'https://schema.org', '@type': type };

    if (type === 'Article') {
      data = compact({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: value('headline'),
        description: value('description'),
        author: value('author') ? { '@type': 'Person', name: value('author') } : undefined,
        datePublished: value('datePublished'),
        url: value('url'),
        image: value('image') ? [value('image')] : undefined
      });
    }

    if (type === 'FAQPage') {
      var faq = [];
      [1, 2, 3].forEach(function (index) {
        var question = value('question' + index);
        var answer = value('answer' + index);
        if (question && answer) {
          faq.push({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer }
          });
        }
      });
      data.mainEntity = faq;
    }

    if (type === 'Product') {
      data = compact({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: value('name'),
        description: value('description'),
        brand: value('brand') ? { '@type': 'Brand', name: value('brand') } : undefined,
        sku: value('sku'),
        url: value('url'),
        image: value('image') ? [value('image')] : undefined
      });
      if (value('price')) {
        data.offers = compact({
          '@type': 'Offer',
          price: value('price'),
          priceCurrency: value('priceCurrency') || 'EUR',
          availability: 'https://schema.org/InStock',
          url: value('url')
        });
      }
    }

    if (type === 'LocalBusiness') {
      data = compact({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: value('name'),
        url: value('url'),
        telephone: value('telephone'),
        address: {
          '@type': 'PostalAddress',
          streetAddress: value('streetAddress'),
          addressLocality: value('addressLocality'),
          postalCode: value('postalCode'),
          addressCountry: value('addressCountry')
        }
      });
    }

    if (type === 'BreadcrumbList') {
      var items = [];
      [1, 2, 3].forEach(function (index) {
        var name = value('name' + index);
        var url = value('url' + index);
        if (name && url) {
          items.push({
            '@type': 'ListItem',
            position: items.length + 1,
            name: name,
            item: url
          });
        }
      });
      data.itemListElement = items;
    }

    output.textContent = JSON.stringify(data, null, 2);
  }

  function renderFields() {
    var type = typeSelect.value;
    fields.innerHTML = '';

    definitions[type].forEach(function (field) {
      var name = field[0];
      var label = field[1];
      var inputType = field[2];
      var placeholder = field[3];
      var wrapper = document.createElement('div');
      wrapper.className = 'schema-generator__field';

      var labelNode = document.createElement('label');
      labelNode.setAttribute('for', 'schema-' + name);
      labelNode.textContent = label;

      var input;
      if (inputType === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 3;
      } else {
        input = document.createElement('input');
        input.type = inputType;
        if (inputType === 'number') input.step = '0.01';
      }

      input.id = 'schema-' + name;
      input.setAttribute('data-schema-field', name);
      input.placeholder = placeholder || '';
      input.addEventListener('input', buildSchema);

      wrapper.appendChild(labelNode);
      wrapper.appendChild(input);
      fields.appendChild(wrapper);
    });

    buildSchema();
  }

  typeSelect.addEventListener('change', function () {
    renderFields();
    status.textContent = '';
  });

  copyButton.addEventListener('click', function () {
    var text = output.textContent;
    if (!text) return;

    navigator.clipboard.writeText(text).then(function () {
      status.textContent = 'JSON-LD copiado al portapapeles.';
    }).catch(function () {
      status.textContent = 'No se pudo copiar automáticamente. Selecciona el código y cópialo manualmente.';
    });
  });

  renderFields();
})();