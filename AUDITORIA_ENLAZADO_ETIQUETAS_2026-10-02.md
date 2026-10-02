# Auditoría de enlazado interno y etiquetas — 02/10/2026

## Alcance

Se han revisado los **117 artículos** de `content/articles`, sus etiquetas y los enlaces internos contextuales incluidos en el cuerpo de los contenidos. También se ha comprobado el sistema automático de artículos relacionados.

## Estado previo

- 117 artículos.
- 45 etiquetas normalizadas.
- 0 etiquetas singleton.
- 0 variantes duplicadas por mayúsculas, acentos o escritura.
- 0 enlaces internos rotos detectados por el auditor.
- 1 artículo sin ningún enlace contextual entrante: `/que-es-bluetooth`.
- El sistema `lib/article-context.js` ya genera artículos relacionados por coincidencia de etiquetas y categoría, además de navegación anterior/siguiente. Por tanto, la ausencia de enlaces manuales en el cuerpo no equivale necesariamente a una página huérfana.

## Ajustes aplicados

Se han afinado las etiquetas de 12 artículos que conservaban etiquetas demasiado genéricas para su tema real. Entre otros cambios:

- rendimiento y Core Web Vitals se refuerzan con `Rendimiento web` y `SEO técnico`;
- contenidos de ecommerce pasan a `Ecommerce` y, cuando corresponde, `Arquitectura web`;
- SEO local se conecta explícitamente con `SEO local` y `Pymes`;
- Schema.org y rich snippets comparten la nueva etiqueta `Datos estructurados`;
- teletrabajo deja de clasificarse como SEO/Web y pasa a `Productividad`, `Colaboración` y `Tecnología`;
- el artículo de UX deja de usar `Backlinks` como etiqueta temática.

Tras estos cambios hay **46 etiquetas normalizadas y ninguna queda aislada**.

También se añade un enlace contextual hacia `/que-es-bluetooth` desde `/que-es-una-api-y-para-que-sirve`, eliminando el único caso con cero enlaces contextuales entrantes.

## Automatización existente

El proyecto ya dispone de:

- `scripts/normalize-article-tags.js`, que normaliza aliases y formatos de etiquetas;
- `scripts/audit-internal-links.js`, que genera `content/generated/internal-link-audit.json`;
- ejecución automática de ambos procesos en GitHub Actions antes de tests, validación y build.

No se ha creado un sistema paralelo: se mantiene esta arquitectura como fuente única de control.

## Criterio editorial

No se han añadido enlaces de forma masiva solo para aumentar cifras. Los artículos relacionados automáticos ya cubren descubrimiento y conexión temática; los enlaces dentro del texto deben reservarse para relaciones que aporten contexto real al lector.
