---
title: "Rich Snippets Y Datos Estructurados"
description: "Guía práctica sobre rich snippets y datos estructurados, con pasos aplicables, errores frecuentes y recomendaciones para mejorar resultados."
author: "Sucender"
canonical: "/rich-snippets-y-datos-estructurados"
category: "tutoriales"
tags: ["SEO", "Web", "Estrategia digital"]
publishedDate: "2019-07-04"
featuredImage: "/img/articulo/rich-snippets-y-datos-estructurados-featured.svg"
heroClass: "bg-orange"
themeColor: "#ee9e2d"
robots: "index,follow"
---
Los datos estructurados permiten describir de forma explícita qué representa una página: un producto, un artículo, una receta, un evento, una organización o una ruta de navegación. Los buscadores pueden utilizar esa información para entender mejor el contenido y, en algunos casos, mostrar resultados enriquecidos.

## Datos estructurados y rich snippets no son lo mismo

El marcado describe entidades y propiedades. Un **rich snippet** es una posible presentación enriquecida en los resultados. Añadir marcado correcto no garantiza que el buscador muestre un formato especial.

La prioridad debe ser representar fielmente el contenido visible de la página.

## Schema.org aporta un vocabulario común

Schema.org define tipos y propiedades que distintos buscadores pueden interpretar. Algunos tipos habituales son `Article`, `Product`, `Recipe`, `Event`, `Organization` y `BreadcrumbList`.

Elige el tipo más específico que corresponda a la página y evita declarar información que el usuario no puede encontrar en ella.

## JSON-LD facilita separar datos y presentación

JSON-LD permite incluir el marcado en un bloque de datos sin mezclar cada propiedad con el HTML visible. Esto suele simplificar el mantenimiento, especialmente cuando una plantilla genera muchas páginas del mismo tipo.

Un ejemplo mínimo para una organización podría describir nombre, URL y logotipo, siempre con valores reales del sitio.

## Los productos necesitan datos consistentes

Si marcas un producto, precio, moneda, disponibilidad y nombre deben coincidir con la página. No uses el marcado para enviar al buscador valores diferentes de los que ve el usuario.

## Las migas de pan ayudan a expresar jerarquía

`BreadcrumbList` puede representar la ruta de navegación y complementar una arquitectura clara. El marcado no sustituye a una navegación útil; debería reflejarla.

## Valida antes de publicar

Comprueba sintaxis, propiedades requeridas y advertencias. Después de publicar, vuelve a verificar el HTML final, porque plantillas o módulos pueden alterar el resultado.

## Evita el marcado engañoso

No marques reseñas que no existen, información oculta o entidades que la página no trata realmente. El objetivo es aportar contexto, no intentar forzar una apariencia concreta en los resultados.

## Mantén el marcado junto con el contenido

Cuando cambia un precio, una fecha o una disponibilidad, el dato estructurado debe cambiar también. Automatizarlo desde la misma fuente de datos reduce inconsistencias.

Los datos estructurados son más útiles cuando forman parte de la plantilla y del modelo de contenido, no cuando se añaden como una capa aislada al final del proyecto.
