---
title: "Schema.org básico para pymes: qué marcar y cómo validarlo"
excerpt: "Empieza con pocos tipos bien mantenidos y genera el marcado desde los mismos datos que ve el usuario."
description: "Guía básica de Schema.org para pymes: Organization y LocalBusiness, Article, Product, BreadcrumbList, JSON-LD, coherencia y validación."
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

## Entidad y tipo de plantilla

### Empieza por la entidad principal
Para una empresa puede tener sentido `Organization`; para un negocio con atención local, un subtipo de `LocalBusiness` cuando corresponda. Incluye únicamente datos reales como nombre, URL, teléfono o dirección que ya estén disponibles para el usuario.

### Usa el tipo de cada plantilla
Una web puede combinar varios tipos:

- `Article` para contenidos editoriales.
- `Product` para productos reales.
- `BreadcrumbList` para rutas de navegación.
- `FAQPage` solo cuando la página contiene realmente ese formato y el uso es adecuado.
- Tipos locales más específicos cuando describen fielmente la actividad.

No todos los tipos producen resultados enriquecidos; su función principal es aportar significado.

## JSON-LD y coherencia

### JSON-LD suele ser fácil de mantener
Un bloque JSON-LD puede generarse desde los mismos datos que la plantilla. Esto evita tener que insertar atributos en cada fragmento de HTML y facilita revisar la salida.

### No dupliques información incoherente
Si el teléfono del marcado es distinto al del pie de página o la dirección no coincide con la ficha local, el problema no es técnico sino de gestión de datos. Define una fuente principal y reutilízala.

## Identificadores y validación

### Cuida identificadores y URLs
Utiliza URLs canónicas y consistentes. Para entidades que aparecen en varias páginas, mantener un identificador estable ayuda a expresar que se trata de la misma organización o elemento.

### Valida el resultado final
Comprueba el código después de que el CMS haya renderizado la página. Un plugin puede generar marcado adicional o duplicado sin que sea evidente en el editor.

### Revisa cuando cambie la plantilla
Una migración, rediseño o cambio de plugin puede eliminar propiedades sin avisar. Incluye datos estructurados en la lista de comprobación posterior a cualquier cambio importante.

## Selección y modelado

### Menos tipos, mejor mantenidos
Para una pyme, una implementación pequeña y correcta suele ser más valiosa que una colección de esquemas añadidos por si acaso. Empieza por negocio, navegación y las plantillas que realmente puedan beneficiarse de una descripción estructurada.
### Antes del código, define qué entidad describes
Los datos estructurados funcionan mejor cuando la web tiene clara su información básica. Nombre comercial, URL, logotipo, teléfono, ubicación y perfiles oficiales deberían proceder de una fuente coherente.

Si esos datos cambian en varias plantillas de forma independiente, el marcado terminará desactualizado. Primero resuelve el modelo de información y después genera Schema.org desde él.

## Tipos de organización y propiedades

### Organization y LocalBusiness no son intercambiables siempre
`Organization` permite describir una organización de forma general. Para negocios que atienden en una ubicación o área concreta puede encajar un subtipo de `LocalBusiness`.

Elige el tipo más específico que describa de verdad la actividad, pero no fuerces categorías. Un marcado preciso y sencillo es preferible a utilizar un subtipo incorrecto porque parece más detallado.

### Incluye solo propiedades que puedas mantener
Añadir horario, teléfono, dirección o perfiles sociales tiene sentido si la información está actualizada. No rellenes propiedades con valores aproximados para completar un ejemplo.

Cuando un dato no existe o no aplica, es mejor omitirlo que inventarlo. Los datos estructurados no deberían contar una versión distinta de la página visible.

## Generación por plantilla

### Genera JSON-LD desde la plantilla
En un CMS, el bloque puede construirse con los mismos campos que alimentan título, precio, autor o migas de pan. Así se reduce el riesgo de que HTML y JSON-LD diverjan.

Si copias un bloque manual en cada página, cualquier cambio obliga a revisar muchas URLs. Centralizar la lógica en una plantilla facilita mantenimiento y pruebas.

## Tipos específicos

### Product requiere especial cuidado
En una ficha de producto, precio, moneda y disponibilidad deben coincidir con lo que el usuario ve. Si el stock cambia, el marcado debería actualizarse con el mismo proceso.

No marques como producto una página que solo habla de una categoría o servicio diferente. El tipo debe describir el contenido principal de esa URL.

### Article y autoría
En contenidos editoriales, `Article` o un subtipo adecuado puede expresar título, fecha, autor e imagen. Usa fechas reales de publicación y modificación.

No actualices la fecha únicamente para aparentar frescura. Si un artículo se revisa de forma sustancial, entonces sí tiene sentido reflejar la modificación tanto en la página como en los datos estructurados.

### BreadcrumbList debe reflejar navegación real
Las migas de pan ayudan a expresar la posición de una página dentro de la arquitectura. El marcado debería corresponder a una ruta que tenga sentido para el usuario.

Evita inventar niveles solo para insertar palabras clave. Una jerarquía clara se diseña primero en la web y se describe después con Schema.org.

## Validación y documentación

### Valida sintaxis y significado
Una herramienta de validación puede detectar JSON mal formado o propiedades incorrectas, pero no puede decidir si el dato representa fielmente el negocio.

Revisa ambas capas: que el código sea válido y que la información tenga sentido. Prueba también la página renderizada, no solo el fragmento que aparece en el editor.

### Documenta qué plantilla genera cada tipo
Mantén una lista sencilla: portada, artículos, productos, ubicaciones y cualquier otra plantilla con marcado. Indica qué tipo utiliza y de dónde obtiene sus datos.

Esta documentación facilita detectar duplicados cuando se instala un plugin o se cambia de tema. Dos sistemas generando el mismo tipo pueden producir información contradictoria.

Para ampliar la parte local, consulta [SEO para negocios locales](/seo-para-negocios-locales). Si trabajas con ecommerce, [optimización de fichas de producto](/optimizacion-de-fichas-de-producto) ayuda a mantener coherentes los datos que después se marcan.

Schema.org no sustituye contenido, arquitectura ni una ficha bien mantenida. Su función es describir de forma estructurada información que ya existe y que la web puede sostener en el tiempo.
