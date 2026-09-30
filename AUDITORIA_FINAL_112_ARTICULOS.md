# Auditoría final de contenidos — 30/09/2026

## Estado

- Artículos totales: **112**
- Artículos revisados: **112**
- Artículos pendientes: **0**
- Featured images distintas: **112**
- Featured images 1200×630: **112**
- Formatos: **96 SVG + 16 WebP**

## Comprobaciones globales

- **0** referencias temporales visibles posteriores a la fecha efectiva del artículo.
- **0** campos `ratingCount` o `ratingValue` en los artículos.
- **0** featured images inexistentes.
- **0** imágenes destacadas repetidas dentro del cuerpo del artículo.
- **0** bloques genéricos de las antiguas plantillas de relleno.
- **0** artículos sin `publishedDate`/`modifiedDate` utilizable.
- **0** slugs incoherentes con su fichero.
- **0** canonicals duplicados o ausentes.

La fecha efectiva utilizada en las comprobaciones es `modifiedDate` cuando existe y, en caso contrario, `publishedDate`.

## Lote final

El lote final contiene los 29 artículos que quedaban pendientes en la v4. Para cuatro artículos cuyo título visible incorporaba un año posterior a su fecha editorial se ha mantenido el slug/canonical histórico, pero se ha reformulado el título para hacerlo temporalmente coherente:

- `checklist-ia-y-seo-para-2025`
- `plan-digital-para-pymes-2023`
- `plan-seo-y-contenidos-para-2026`
- `vue-js-que-es`

No se han alterado sus fechas para justificar contenido posterior.

## Validación técnica

- Tests de Article v2 y contenidos, excluyendo las rutas que requieren Express: **30/30 OK**.
- `node scripts/validate-content.js`: **OK**.
- El conjunto completo de tests incluye tres pruebas de rutas que necesitan arrancar Express; en este entorno no se pudieron ejecutar porque no están instaladas las dependencias y `npm install` agotó el tiempo de red.
- Por el mismo motivo, `npm run build` no se ha ejecutado aquí. En un entorno con dependencias instaladas debe ejecutarse antes de desplegar.
