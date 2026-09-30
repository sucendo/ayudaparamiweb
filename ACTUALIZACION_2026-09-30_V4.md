# Ayuda para mi web — actualización v4

## Estado

- Artículos totales: 112
- Revisados: 83
- Pendientes: 29
- Nuevos revisados en este lote: 25

## Criterios del lote

- Se conservan slug, canonical, publishedDate y modifiedDate.
- modifiedDate es el límite temporal cuando existe; en caso contrario se usa publishedDate.
- No se han introducido años posteriores a la fecha efectiva del artículo.
- Se eliminan ratingCount/ratingValue en los artículos del lote.
- Se normalizan enlaces internos antiguos al dominio.
- El contenido útil se conserva; el texto genérico se sustituye por contenido específico.
- Cada artículo recibe una nueva imagen destacada SVG 1200×630 en public/img/articulo/.
- Los seis colores ct-* se reparten de forma equilibrada.

## Validación realizada

- `node --test tests/content-normalization.test.js`: 15/15 OK.
- `node scripts/validate-content.js`: OK.
- Comprobación manual/programática de fechas, rutas de imágenes y SVG: OK.
- `node --test tests/**/*.test.js`: los 23 tests que no necesitan servidor pasan; los 3 tests de rutas no pueden arrancar el servidor porque el ZIP no incluye `node_modules` y `npm install` agotó el tiempo de red en este entorno.
- `npm run build` no se ejecutó por la misma falta de dependencias instaladas. En un equipo con acceso a npm: `npm install && npm test && npm run build`.

Consulta `REVISION_LOTE_4_25_ARTICULOS.md` para el detalle del lote y `REVISION_ESTADO_2026-09-30.json` para la lista de pendientes.
