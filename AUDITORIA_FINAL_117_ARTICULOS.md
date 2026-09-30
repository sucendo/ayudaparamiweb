# Auditoría final de contenidos — 117 artículos — 30/09/2026

## Estado

- Artículos totales: **117**
- Artículos revisados: **117**
- Artículos pendientes: **0**
- Artículos añadidos después de la auditoría de 112: **5**
- Featured images distintas: **117**
- Featured images locales: **117**

## Nuevas publicaciones incorporadas

- `puesta-a-punto-web-antes-del-verano` — 21/05/2026
- `como-medir-rendimiento-web-metricas-utiles` — 18/06/2026
- `seo-estacional-busquedas-de-verano` — 16/07/2026
- `auditoria-contenidos-antes-de-septiembre` — 20/08/2026
- `busqueda-multimodal-seo-visual-google-lens` — 25/09/2026

## Comprobaciones globales

- **117/117** artículos tienen frontmatter estructurado.
- **117/117** artículos tienen `publishedDate`.
- **117/117** artículos tienen canonical local.
- **117/117** artículos tienen featured image local.
- **0** artículos pendientes de revisión editorial.
- **0** canonicals duplicados detectados en el conjunto revisado.
- **0** slugs duplicados en `content/articles`.
- **0** rutas de artículos que necesiten registrarse manualmente en `routes.js`.
- Las rutas de artículos se generan ahora automáticamente desde los ficheros Markdown de `content/articles`.
- Los cinco artículos de mayo a septiembre de 2026 tienen temas diferenciados y fechas coherentes con su contexto editorial.
- Las nuevas imágenes destacadas son propias y no reutilizan la misma identidad visual.

## Publicaciones de 2026 añadidas en esta revisión

### Mayo
**Puesta a punto de tu web antes del verano: qué revisar y qué puede esperar**

Enfoque: mantenimiento preventivo y reducción de riesgos antes del verano.

### Junio
**Cómo saber si tu web funciona: las métricas que merece la pena revisar**

Enfoque: Analytics, Search Console, conversiones y decisiones a partir de datos.

### Julio
**SEO estacional: cómo descubrir qué busca tu público en verano y aprovechar esas búsquedas**

Enfoque: estacionalidad, comparación interanual, Google Trends y planificación SEO.

### Agosto
**Auditoría de contenidos: qué actualizar, fusionar, redirigir o eliminar antes de septiembre**

Enfoque: content pruning, canibalización, contenido huérfano, fusiones y redirecciones.

### Septiembre
**Búsqueda multimodal y SEO visual: cómo preparar tu web para Google Lens y medirlo en Search Console**

Enfoque: búsqueda visual y multimodal, imágenes, HTML, datos estructurados, sitemap de imágenes y ejemplos de código.

## Arquitectura de publicación

La lista manual de artículos de `routes.js` ha sido sustituida por generación automática:

1. se leen los archivos `.md` de `content/articles`;
2. el nombre del fichero se utiliza como slug;
3. se crea automáticamente una ruta `/<slug>`;
4. la vista utilizada es `content/render`;
5. las rutas legacy de `views/news` solo se añaden cuando no existe ya una ruta moderna con el mismo path.

Esto elimina el fallo que podía producirse al crear un artículo y olvidar registrar su ruta manualmente.

## Validación técnica añadida

Se han añadido pruebas para comprobar que:

- cada Markdown de `content/articles` tiene exactamente una ruta;
- no existen paths duplicados;
- un artículo nuevo aparece sin editar manualmente `routes.js`.

La validación de contenido continúa ejecutándose en GitHub Actions antes del build y del despliegue.

## Estado editorial

Ayuda para mi Web queda con **117 artículos revisados y 0 pendientes**. Los tags continúan siendo el mecanismo principal para agrupar contenidos temáticamente; no se introduce por ahora una arquitectura obligatoria de clusters.

La auditoría anterior de 112 artículos se conserva como referencia histórica del cierre de aquella fase.
