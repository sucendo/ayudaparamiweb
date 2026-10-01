---
title: "Rich snippets y datos estructurados: guía práctica"
excerpt: "Los datos estructurados describen el contenido de una página; un resultado enriquecido es una posible forma de mostrar esa información."
description: "Cómo utilizar datos estructurados y Schema.org con JSON-LD para describir artículos, productos, organizaciones y migas de pan sin marcado engañoso."
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
## Empieza por el contenido visible

Antes de añadir Schema.org, comprueba que la página muestra claramente la información que quieres describir. Un producto necesita nombre, precio y disponibilidad visibles; un evento necesita fecha y detalles reales.

El marcado no debería corregir una página incompleta. Primero mejora el contenido y después representa esos datos de forma estructurada.

## Elige un único tipo principal cuando sea posible

Una página puede contener varias entidades, pero conviene identificar qué representa principalmente. Un artículo puede mencionar una empresa sin convertirse por ello en una página de organización.

Añade tipos secundarios cuando exista una relación clara. Evita incorporar esquemas simplemente porque la herramienta de validación los reconoce.

## JSON-LD generado desde los datos reales

Si una tienda ya guarda precio y stock en su base de datos, utiliza esos mismos valores para crear el marcado. No mantengas una segunda copia manual.

La sincronización es especialmente importante en ecommerce: un precio distinto entre página y datos estructurados puede generar errores y desconfianza.

## Fechas de artículos

En contenido editorial, las fechas deben representar publicación y modificación reales. No cambies una fecha solo para que parezca que el artículo es nuevo.

Si existe una revisión sustancial, la plantilla puede reflejar la fecha correspondiente de forma coherente tanto en la página como en el marcado.

## BreadcrumbList y arquitectura

Las migas de pan expresan una jerarquía que debería existir para el usuario. Si la ruta es Inicio > Tutoriales > SEO, esa estructura debe tener sentido dentro del sitio.

No inventes categorías en el JSON-LD que no forman parte de la navegación real.

## Reseñas y valoraciones

Solo marca reseñas que estén presentes y correspondan al elemento que se está describiendo. No crees puntuaciones automáticas o testimonios inexistentes.

El objetivo de los datos estructurados es aclarar significado, no fabricar señales que la página no puede demostrar.

## Prueba la plantilla con casos distintos

Un bloque puede funcionar en un producto con todos los campos y fallar cuando falta precio o imagen. Prueba variantes reales.

Valida también páginas donde determinados campos son opcionales. La plantilla debe omitir propiedades vacías en lugar de generar valores falsos.

## Evita duplicados entre plugins y código propio

Un CMS puede generar datos estructurados desde el tema, un plugin SEO y un módulo de ecommerce a la vez. Revisa el HTML final para detectar entidades repetidas o contradictorias.

Decide qué componente es responsable de cada tipo y desactiva generaciones redundantes cuando sea posible.

## Valida después de publicar

Una herramienta de desarrollo puede confirmar la sintaxis antes de lanzar, pero la comprobación final debe realizarse sobre la URL pública.

Plantillas, caché y scripts pueden modificar la salida. Revisa varias páginas de cada tipo, no solo un ejemplo.

## Mantén una lista de tipos utilizados

Documenta qué plantillas generan `Article`, `Product`, `Organization` o `BreadcrumbList`. Así sabrás dónde revisar si cambia la web.

Para una implementación básica orientada a empresas, [Schema.org básico para pymes](/schema-org-basico-para-pymes) ofrece un recorrido complementario.

Un buen marcado es pequeño, coherente y mantenible. Los datos estructurados aportan valor cuando describen con precisión lo que ya puede comprobarse en la página.
