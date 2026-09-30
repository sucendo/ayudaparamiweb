---
title: "Schema Org Basico Para Pymes"
description: "Guía práctica sobre schema org basico para pymes, con pasos aplicables, errores frecuentes y recomendaciones para mejorar resultados."
author: "Sucender"
canonical: "/schema-org-basico-para-pymes"
category: "tutoriales"
tags: ["SEO", "Web", "Estrategia digital"]
publishedDate: "2023-11-09"
featuredImage: "/img/articulo/schema-org-basico-para-pymes-featured.svg"
heroClass: "bg-green"
themeColor: "#58b391"
robots: "index,follow"
---
Schema.org puede parecer técnico, pero una pyme suele necesitar solo unos pocos tipos bien implementados. El objetivo es describir claramente el negocio y sus páginas, no llenar el sitio de marcado sin relación con el contenido.

## Empieza por la entidad principal

Para una empresa puede tener sentido `Organization`; para un negocio con atención local, un subtipo de `LocalBusiness` cuando corresponda. Incluye únicamente datos reales como nombre, URL, teléfono o dirección que ya estén disponibles para el usuario.

## Usa el tipo de cada plantilla

Una web puede combinar varios tipos:

- `Article` para contenidos editoriales.
- `Product` para productos reales.
- `BreadcrumbList` para rutas de navegación.
- `FAQPage` solo cuando la página contiene realmente ese formato y el uso es adecuado.
- Tipos locales más específicos cuando describen fielmente la actividad.

No todos los tipos producen resultados enriquecidos; su función principal es aportar significado.

## JSON-LD suele ser fácil de mantener

Un bloque JSON-LD puede generarse desde los mismos datos que la plantilla. Esto evita tener que insertar atributos en cada fragmento de HTML y facilita revisar la salida.

## No dupliques información incoherente

Si el teléfono del marcado es distinto al del pie de página o la dirección no coincide con la ficha local, el problema no es técnico sino de gestión de datos. Define una fuente principal y reutilízala.

## Cuida identificadores y URLs

Utiliza URLs canónicas y consistentes. Para entidades que aparecen en varias páginas, mantener un identificador estable ayuda a expresar que se trata de la misma organización o elemento.

## Valida el resultado final

Comprueba el código después de que el CMS haya renderizado la página. Un plugin puede generar marcado adicional o duplicado sin que sea evidente en el editor.

## Revisa cuando cambie la plantilla

Una migración, rediseño o cambio de plugin puede eliminar propiedades sin avisar. Incluye datos estructurados en la lista de comprobación posterior a cualquier cambio importante.

## Menos tipos, mejor mantenidos

Para una pyme, una implementación pequeña y correcta suele ser más valiosa que una colección de esquemas añadidos por si acaso. Empieza por negocio, navegación y las plantillas que realmente puedan beneficiarse de una descripción estructurada.
