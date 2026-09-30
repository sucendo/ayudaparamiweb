# Ayuda para mi Web

Sitio web de contenidos sobre desarrollo web, SEO, herramientas y experimentos.

## Estado actual

- **117 artículos revisados**.
- **0 artículos pendientes** de la auditoría editorial actual.
- Publicación de artículos Markdown con **rutas automáticas**.
- Tags como sistema principal de agrupación temática.
- Página de autor, contenidos relacionados y navegación anterior/siguiente.
- Metadatos SEO, Open Graph, Twitter Cards, Article JSON-LD y breadcrumbs.
- Sitemap y robots.txt generados para el despliegue estático.
- Despliegue automático mediante GitHub Pages.

## Stack técnico

- **Node.js 24+**
- **Express 4**
- **EJS 3**
- **Markdown** para los artículos en `content/articles/`
- Assets estáticos en `public/`
- Build estático mediante `scripts/build-pages.js`

## Scripts disponibles

- `npm start`: arranca el servidor Node.
- `npm run start:node`: arranca explícitamente con `APP_MODE=node`.
- `npm test`: ejecuta las pruebas con `node:test`.
- `npm run validate:content`: valida la estructura y metadatos del contenido.
- `npm run build`: genera la web estática en `dist/`.
- `npm run build:pages`: alias de `npm run build`.
- `npm run generate:top-articles`: genera los artículos destacados a partir de GA4 cuando existen credenciales.

## Cómo publicar un artículo

Crea un archivo Markdown en:

`content/articles/<slug>.md`

El nombre del fichero se convierte automáticamente en la ruta pública:

`content/articles/mi-articulo.md` → `/mi-articulo`

Ya **no es necesario editar `routes.js`** al publicar un artículo.

El frontmatter debe incluir como mínimo:

```yaml
---
title: "Título del artículo"
description: "Descripción SEO"
author: "Sucender"
canonical: "/mi-articulo"
category: "tutoriales"
tags: ["SEO", "Desarrollo web"]
publishedDate: "2026-09-30"
featuredImage: "/img/articulo/mi-articulo-featured.svg"
heroClass: "bg-blue"
themeColor: "#47a3da"
robots: "index,follow"
---
```

Antes de publicar conviene ejecutar:

```bash
npm test
npm run validate:content
npm run build
```

## Estructura principal

- `index.js`: servidor y routing en modo Node.
- `routes.js`: rutas estáticas, herramientas, legacy y generación automática de artículos.
- `content/articles/`: artículos Markdown.
- `content/index.js`: catálogo y metadatos de contenido.
- `lib/content/`: carga, Markdown y validación.
- `views/`: plantillas EJS activas. Las antiguas copias EJS de artículos migrados ya no se conservan.
- `public/`: CSS, JavaScript, imágenes, fuentes y robots.txt.
- `scripts/`: build, validación auxiliar y generación de datos.
- `tests/`: pruebas automáticas.

## Auditoría editorial

La auditoría vigente está documentada en:

`AUDITORIA_FINAL_117_ARTICULOS.md`

El estado estructurado se mantiene en:

`REVISION_ESTADO_2026-09-30.json`

## Autor

**Sucender**

- Web: <https://www.ayudaparamiweb.com/>
- Email: <mailto:sucender@gmail.com>
- X/Twitter: <https://twitter.com/ayudaparamiweb>
- GitHub: <https://github.com/ayudaparamiweb>

## Limpieza de código legacy

La migración editorial a Markdown permitió retirar las antiguas plantillas duplicadas de `views/news/` y recursos de WordPress que ya no participaban en la web actual. Los recursos gráficos históricos se conservan: esta limpieza no elimina ficheros de `public/img/`, incluidas imágenes y SVG.
