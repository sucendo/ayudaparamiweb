# Actualización editorial e imágenes — 29/09/2026

Este ZIP parte del `main` de `sucendo/ayudaparamiweb` y añade la revisión editorial e imágenes destacadas solicitadas.

## Cuatro imágenes pendientes ya integradas

- `checklist-lanzamiento-web-2026` → `ct-yellow`
- `codigo-traductor-google-blog` → `ct-blue`
- `herramientas-seo-gratuitas` → `ct-green`
- `ia-generativa-estrategia-contenidos-seo` → `ct-purple`

Todas usan imágenes locales WebP de 1200×630 en `/public/img/articulo/`.

## Diez artículos adicionales revisados

- `accesibilidad-web-principios-basicos` → `ct-blue`
- `backlink-que-es-como-construir-red-de-enlaces` → `ct-purple`
- `seo-local-que-es-y-como-empezar` → `ct-purple`
- `investigacion-palabras-clave` → `ct-blue`
- `html-css-y-javascript-por-donde-empezar` → `ct-green`
- `ia-y-seo-primeros-usos-practicos` → `ct-red`
- `seo-para-ecommerce` → `ct-orange`
- `herramientas-seo` → `ct-blue`
- `auditoria-seo-paso-a-paso` → `ct-red`
- `seo-on-page-aspectos-tecnicos` → `ct-green`

### Criterios aplicados

- Se conserva cada `canonical` y cada slug.
- No se inventan fechas de actualización.
- El contexto temporal se limita a `modifiedDate` cuando existe y, si no, a `publishedDate`.
- No se permiten referencias a años posteriores a la fecha efectiva del artículo.
- Se eliminan `ratingCount` y `ratingValue` de los artículos revisados.
- El HTML heredado se pasa a Markdown cuando es seguro, conservando bloques de código y contenido especial.
- Los artículos genéricos de relleno se sustituyen por contenido específico de su tema y coherente con su fecha.
- Las nuevas imágenes no incluyen conceptos visuales posteriores a la fecha del artículo cuando eso podía resultar anacrónico.

## Validación

- `node --test tests/article-v2.test.js tests/content-normalization.test.js` → OK.
- `node scripts/validate-content.js` → OK.
- 14 nuevos WebP verificados como archivos completos, no truncados.
- 10 nuevos artículos verificados contra referencias temporales futuras.

El test completo que levanta el servidor requiere instalar las dependencias (`npm install`). En el entorno de preparación del ZIP no había acceso al registro npm, por lo que se validaron las partes de contenido, Article v2 e integridad de imágenes de forma local.

## Segundo lote: 20 artículos adicionales revisados

- `auditoria-web-basica-para-pymes` → `blue`
- `automatizacion-de-tareas-en-la-empresa` → `purple`
- `chatgpt-y-marketing-digital` → `red`
- `checklist-seo-antes-de-redisenar-una-web` → `yellow`
- `clusters-de-contenido-y-seo` → `green`
- `como-crear-briefings-web-mas-claros` → `orange`
- `como-mejorar-la-velocidad-de-tu-web` → `blue`
- `como-planificar-una-migracion-web` → `orange`
- `comunicacion-interna-y-herramientas-digitales` → `purple`
- `contenido-que-ayuda-a-captar-clientes` → `green`
- `copywriting-web-para-vender-mas` → `red`
- `email-marketing-para-pymes` → `blue`
- `enlazado-interno-para-seo` → `yellow`
- `errores-comunes-en-webs-corporativas` → `red`
- `errores-de-usabilidad-que-bajan-conversiones` → `orange`
- `ga4-primeros-pasos` → `green`
- `google-my-business-para-negocios-locales` → `purple`
- `javascript-basico-para-principiantes` → `yellow`
- `prestashop-que-es-y-cuando-usarlo` → `blue`
- `que-es-una-api-y-para-que-sirve` → `purple`

### Criterios de este segundo lote

- Se mantienen slug, canonical y fechas originales.
- No se añade `modifiedDate` para justificar cambios editoriales.
- El contenido nuevo evita referencias temporales posteriores a la fecha efectiva del artículo.
- Se eliminan `ratingCount` y `ratingValue`.
- Se sustituye el texto genérico por contenido específico del tema.
- Cada artículo recibe una imagen SVG 1200×630 propia, local y coherente con los seis colores `ct-*`.
- Las imágenes no contienen títulos del artículo, para no duplicar el H1.

### Estado global

- Artículos totales en `content/articles`: **112**.
- Revisados antes de este lote: **18**.
- Revisados en este lote: **20**.
- Total revisado tras esta versión: **38**.
- Pendientes de la misma revisión editorial/visual: **74**.
