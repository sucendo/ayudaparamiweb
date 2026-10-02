---
title: "Búsqueda multimodal y SEO visual: cómo preparar tu web para Google Lens y medirlo en Search Console"
description: "Google ya permite medir búsquedas multimodales en Search Console. Aprende a preparar imágenes, HTML, datos estructurados y páginas para Google Lens, Google Imágenes y nuevas búsquedas visuales."
excerpt: "La búsqueda ya no empieza siempre escribiendo. Desde septiembre de 2026, Search Console incorpora datos específicos de búsquedas multimodales. Esta guía explica qué significa y cómo preparar una web para aprovechar mejor el contenido visual."
author: "Sucender"
canonical: "/busqueda-multimodal-seo-visual-google-lens"
category: "tutoriales"
tags: ["SEO", "Search Console"]
publishedDate: "2026-09-25"
featuredImage: "/img/articulo/busqueda-multimodal-seo-visual-google-lens-featured.svg"
heroClass: "bg-purple"
themeColor: "#64448f"
robots: "index,follow"
---

Durante años hemos pensado el SEO principalmente alrededor de palabras escritas en un buscador.

Pero cada vez hay más búsquedas que empiezan de otra manera: una fotografía, una captura de pantalla, la cámara del móvil o una imagen sobre la que el usuario quiere obtener más información.

Eso cambia una parte importante del trabajo.

Ya no basta con preguntarnos si Google entiende el texto de una página. También debemos comprobar si puede descubrir sus imágenes, relacionarlas con el contenido correcto y entender qué representan.

Y septiembre de 2026 ha traído una novedad especialmente interesante para quienes gestionan webs.

El 24 de septiembre, Google [anunció un nuevo filtro de búsqueda multimodal en Search Console](https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc). Este informe permite analizar tráfico procedente de búsquedas realizadas mediante imágenes, incluyendo Google Lens, Circle to Search en Android, imágenes subidas a Google Search y la opción de Chrome para buscar a partir de una imagen.

Es decir: una parte del tráfico visual que antes era difícil de distinguir empieza a ser medible.

La pregunta práctica es evidente:

**¿está nuestra web preparada para que sus imágenes sean descubiertas, entendidas y utilizadas en este tipo de búsquedas?**

## Concepto y medición

### Qué es una búsqueda multimodal
Una búsqueda tradicional parte normalmente de texto.

Una búsqueda multimodal puede combinar distintos tipos de información.

Por ejemplo, una persona puede:

- hacer una fotografía de un producto;
- seleccionar un objeto que aparece en una imagen;
- subir una captura;
- señalar una parte concreta de una fotografía;
- añadir después una pregunta escrita.

El buscador intenta interpretar la imagen y el contexto de la consulta para encontrar información relacionada.

Esto resulta especialmente útil en sectores donde lo visual tiene mucho peso:

- ecommerce;
- moda;
- decoración;
- turismo;
- restauración;
- automoción;
- plantas y jardinería;
- bricolaje;
- arquitectura;
- arte;
- productos tecnológicos.

Pero no se limita a tiendas.

Un diagrama, una captura de un programa, una pieza mecánica, un edificio o una infografía también pueden convertirse en el punto de partida de una búsqueda.

### La gran novedad de septiembre de 2026: ya podemos medirlo mejor
Hasta ahora, una de las dificultades del SEO visual era separar determinados comportamientos dentro de los datos generales.

Google ha empezado a desplegar un nuevo filtro de búsqueda multimodal en los informes de rendimiento de Search Console.

Según el anuncio de Google, los datos incluyen búsquedas originadas desde:

- Google Lens;
- Circle to Search en Android;
- imágenes subidas a Google Search;
- la función de Chrome para buscar esta imagen.

El despliegue comenzó globalmente el 24 de septiembre de 2026.

Si tu sitio recibe tráfico desde este tipo de consultas, el nuevo filtro puede ayudarte a detectar qué páginas aparecen y cómo evoluciona su rendimiento.

Esto no convierte el SEO visual en una disciplina completamente nueva.

En realidad, refuerza algo que Google lleva tiempo recomendando: **hacer que las imágenes sean descubribles, comprensibles y estén dentro de páginas relevantes**.

## Fundamentos de imagen HTML

### No existe una optimización mágica para Lens
La búsqueda visual puede parecer muy sofisticada, pero las bases técnicas siguen siendo bastante conocidas.

Google continúa recomendando elementos HTML estándar, páginas accesibles, imágenes de calidad, texto alternativo útil, nombres de archivo descriptivos y contexto alrededor de la imagen.

Además, en páginas de producto, los [datos estructurados de Product](https://developers.google.com/search/docs/appearance/structured-data/product?hl=es) pueden aportar información adicional como precio, disponibilidad o valoraciones, y esa información puede utilizarse en experiencias de Google Imágenes y Google Lens.

No necesitas inventar una nueva etiqueta llamada “Lens”.

Necesitas que la página esté bien construida.

### Primer paso: utiliza una imagen HTML real
Una de las [recomendaciones de Google para SEO de imágenes](https://developers.google.com/search/docs/appearance/google-images?hl=es) es insertar las imágenes importantes mediante elementos HTML de imagen.

Una imagen utilizada únicamente como fondo CSS puede servir para diseño, pero no debería ser la única forma de publicar una imagen que quieres que el buscador descubra.

Código de ejemplo 1:

```html
<img
  src="/img/productos/mochila-atlas-negra.webp"
  alt="Mochila urbana Atlas negra vista de frente"
  width="1200"
  height="800">
```

Aquí tenemos varias señales útiles:

- una URL de imagen real;
- un nombre de archivo comprensible;
- texto alternativo;
- dimensiones declaradas.

Si la imagen forma parte del contenido, este enfoque es preferible a esconderla dentro de una regla CSS.

Por ejemplo, para una imagen relevante no dependeríamos únicamente de esto:

```css
.producto {
  background-image: url("/img/productos/mochila-atlas-negra.webp");
}
```

Los fondos CSS siguen siendo perfectamente válidos para decoración.

La diferencia está en la función de la imagen.

Si queremos que represente información, conviene tratarla como contenido.

### El nombre del archivo también aporta contexto
Un archivo llamado <code>IMG_8472.jpg</code> dice muy poco.

Uno llamado <code>mochila-impermeable-urbana-negra.jpg</code> ofrece bastante más información.

No hace falta convertir los nombres en frases interminables.

Utiliza palabras breves y descriptivas.

Evita nombres como:

- imagen1.jpg;
- foto-final-final2.jpg;
- DSC00231.jpg;
- producto-nuevo.jpg.

Un buen nombre ayuda también a mantener ordenada la biblioteca de medios.

### El atributo alt no es una lista de palabras clave
El texto alternativo debe describir la imagen cuando esa descripción aporta información.

Google explica que utiliza el texto alternativo, el contenido de la página y sistemas de visión artificial para comprender las imágenes.

Por eso no tiene sentido escribir algo como:

```html
<img
  src="/img/zapatilla.jpg"
  alt="zapatilla zapatillas comprar zapatillas baratas zapatillas online">
```

Eso no describe la fotografía.

Un ejemplo más útil sería:

```html
<img
  src="/img/zapatilla-running-trail-roja.webp"
  alt="Zapatilla de trail roja con suela de tacos vista de perfil">
```

La descripción cambia en función del contexto.

Si esa misma fotografía aparece en una ficha de producto, el nombre exacto del modelo puede ser importante.

Si aparece en un artículo que compara tipos de suela, quizá interese destacar precisamente ese detalle visual.

### Las imágenes decorativas no necesitan competir por atención
No toda imagen necesita una descripción SEO.

Iconos decorativos, separadores o elementos puramente estéticos pueden utilizar un atributo alt vacío cuando corresponda.

Por ejemplo:

```html
<img src="/img/decoracion/onda.svg" alt="">
```

El objetivo no es llenar cada etiqueta con texto.

Es describir aquello que realmente transmite información.

## Contexto semántico

### Coloca la imagen cerca del contenido que la explica
Una imagen aislada resulta más difícil de interpretar que una imagen acompañada por contexto.

Supongamos que publicamos una fotografía de una pieza electrónica.

Cerca de la imagen podemos incluir:

- nombre;
- modelo;
- descripción;
- especificaciones;
- aplicación;
- leyenda.

Una estructura sencilla podría ser:

```html
<figure>
  <img
    src="/img/guias/conector-usb-c-placa.webp"
    alt="Conector USB-C soldado sobre una placa electrónica"
    width="1000"
    height="667">

  <figcaption>
    Conector USB-C montado en una placa electrónica.
  </figcaption>
</figure>
```

La etiqueta <code>figcaption</code> no es obligatoria para SEO.

Pero cuando aporta información útil, ayuda al lector y mantiene una relación clara entre imagen y explicación.

## Formatos, tamaños y carga

### Utiliza formatos modernos sin olvidar la compatibilidad
Google admite actualmente varios formatos de imagen, entre ellos JPEG, PNG, WebP, SVG y AVIF.

WebP y AVIF pueden ayudar a reducir peso dependiendo del tipo de imagen y de cómo se hayan generado.

El elemento <code>picture</code> permite ofrecer distintas versiones.

Código de ejemplo 2:

```html
<picture>
  <source
    srcset="/img/productos/silla-nordica.avif"
    type="image/avif">

  <source
    srcset="/img/productos/silla-nordica.webp"
    type="image/webp">

  <img
    src="/img/productos/silla-nordica.jpg"
    alt="Silla nórdica de madera clara con asiento blanco"
    width="1200"
    height="900">
</picture>
```

El elemento <code>img</code> continúa proporcionando una imagen de referencia.

No conviertas la optimización de formato en una obsesión.

Una imagen bien comprimida, suficientemente grande y visualmente clara suele ser más útil que una imagen extremadamente comprimida llena de artefactos.

### Adapta el tamaño a distintas pantallas
Servir una fotografía de 4000 píxeles a un teléfono que la muestra a 360 píxeles de ancho desperdicia transferencia.

Puedes utilizar <code>srcset</code> y <code>sizes</code> para permitir que el navegador seleccione una versión adecuada.

Código de ejemplo 3:

```html
<img
  src="/img/hotel/habitacion-1200.webp"
  srcset="
    /img/hotel/habitacion-480.webp 480w,
    /img/hotel/habitacion-800.webp 800w,
    /img/hotel/habitacion-1200.webp 1200w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Habitación doble con terraza y vistas al mar"
  width="1200"
  height="800">
```

Esto no es una función exclusiva de SEO visual.

También mejora la experiencia de carga.

Y ese equilibrio importa: queremos imágenes suficientemente buenas para ser útiles sin convertir la página en varios megabytes innecesarios.

### No cargues todas las imágenes de la misma forma
Para imágenes que aparecen bastante abajo en una página, la carga diferida puede reducir trabajo inicial.

Por ejemplo:

```html
<img
  src="/img/galeria/detalle-producto.webp"
  alt="Detalle del cierre metálico del bolso"
  width="1000"
  height="750"
  loading="lazy">
```

Sin embargo, no conviene aplicar <code>loading="lazy"</code> indiscriminadamente a cualquier imagen crítica que aparece nada más abrir la página.

La optimización debe considerar dónde está la imagen y cuándo necesita verla el usuario.

## Imágenes de producto

### Una imagen de producto necesita más que una fotografía bonita
En ecommerce, el buscador puede relacionar una imagen con información comercial de la página.

Google indica que los datos estructurados de producto pueden enriquecer cómo aparece la información en Search, Google Imágenes y Google Lens.

Eso permite aportar datos como:

- nombre;
- imagen;
- precio;
- moneda;
- disponibilidad;
- reseñas;
- información de envío, cuando proceda.

Un ejemplo básico de JSON-LD sería:

Código de ejemplo 4:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Mochila urbana Atlas",
  "image": [
    "https://www.ejemplo.com/img/atlas-frontal.jpg",
    "https://www.ejemplo.com/img/atlas-lateral.jpg"
  ],
  "description": "Mochila urbana impermeable de 20 litros.",
  "sku": "ATL-20-BLK",
  "offers": {
    "@type": "Offer",
    "url": "https://www.ejemplo.com/mochila-atlas",
    "priceCurrency": "EUR",
    "price": "69.90",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

No copies este ejemplo sin adaptarlo.

Los datos estructurados deben coincidir con la información visible y real de la página.

Si el precio cambia, la información estructurada también debe cambiar.

### Muestra varias vistas cuando ayuden a reconocer el producto
En una tienda, una única fotografía frontal puede no ser suficiente.

Cuando tenga sentido, ofrece:

- frontal;
- lateral;
- parte trasera;
- detalle;
- producto en uso;
- escala real.

No se trata de generar veinte imágenes casi iguales.

Cada fotografía debería responder una duda visual.

Una persona puede buscar un producto a partir de una forma, un color, un acabado o un pequeño detalle.

Cuanto más clara sea la representación, más útil será también para el usuario.

## Descubrimiento y renderizado

### Un sitemap de imágenes puede ayudar al descubrimiento
Google permite incluir imágenes en un sitemap específico.

Esto puede resultar útil especialmente cuando algunas imágenes son difíciles de descubrir durante el rastreo normal.

Código de ejemplo 5:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>https://www.ejemplo.com/mochila-atlas</loc>

    <image:image>
      <image:loc>
        https://www.ejemplo.com/img/atlas-frontal.jpg
      </image:loc>
    </image:image>
  </url>

</urlset>
```

Google también permite incluir imágenes alojadas en un CDN.

Si utilizas un dominio separado para las imágenes, conviene tener controlado su acceso y su configuración en Search Console.

### Las imágenes generadas por JavaScript necesitan una comprobación real
Una web moderna puede cargar galerías mediante JavaScript, carruseles o componentes dinámicos.

Eso no significa automáticamente que exista un problema.

Pero sí debemos comprobar qué HTML termina viendo el navegador y si la imagen importante dispone de una URL rastreable.

Utiliza las herramientas del navegador y la inspección de URL de Search Console para comprobar páginas reales.

No des por hecho que algo es rastreable simplemente porque tú lo ves en pantalla.

### La calidad importa más en una búsqueda que empieza por una imagen
Cuando una persona busca visualmente, la imagen deja de ser un complemento decorativo.

Es parte de la consulta.

Por eso evita:

- fotografías borrosas;
- miniaturas diminutas;
- recortes que eliminan el objeto importante;
- marcas de agua enormes;
- fondos que dificultan distinguir el producto;
- imágenes duplicadas sin motivo.

En fichas de producto, intenta mostrar el objeto claramente.

En artículos, utiliza diagramas y capturas cuando realmente ayuden a comprender.

## Capturas, texto y metadatos

### Las capturas de pantalla también son contenido visual
Una web tecnológica puede no vender ningún objeto físico y aun así beneficiarse del SEO visual.

Piensa en:

- tutoriales;
- interfaces;
- errores de software;
- configuraciones;
- gráficos;
- esquemas;
- mapas;
- código.

Una captura debe tener contexto.

En lugar de subir <code>captura23.png</code>, podemos utilizar <code>search-console-filtro-busqueda-multimodal.png</code> y acompañarla con un párrafo que explique exactamente lo que muestra.

Eso ayuda al lector y facilita la organización.

### No incrustes texto importante únicamente dentro de la imagen
Una imagen puede incluir texto, pero la información esencial debería existir también en HTML cuando sea posible.

Si publicas una infografía con cinco pasos, incluye esos pasos en el artículo.

Si muestras una tabla como imagen, valora añadir también la tabla en HTML.

Esto mejora:

- accesibilidad;
- búsqueda;
- copia de información;
- adaptación móvil;
- mantenimiento.

La imagen puede resumir.

El HTML debe conservar el significado.

### Añade metadatos cuando la autoría o la licencia sean importantes
Google Imágenes puede utilizar metadatos para mostrar información sobre autor, crédito o licencia.

Esto resulta especialmente interesante para:

- fotógrafos;
- bancos de imágenes;
- medios;
- ilustradores;
- archivos.

Google admite información mediante datos estructurados o metadatos IPTC.

No todas las webs necesitan implementarlo.

Pero si el uso y la atribución de las imágenes forman parte del negocio, merece la pena revisarlo.

## Medición de imágenes y búsquedas multimodales

### Cómo medir el tráfico de imágenes
Search Console ya permitía filtrar el informe de rendimiento por búsqueda de imágenes.

Para verlo:

1. abre Rendimiento;
2. selecciona Tipo de búsqueda;
3. elige Imagen;
4. revisa consultas y páginas.

Ten en cuenta un detalle: Search Console muestra la página de destino asociada al clic, no necesariamente la URL directa del archivo de imagen.

Esto permite descubrir qué contenidos reciben tráfico desde Google Imágenes.

### Cómo medir ahora la búsqueda multimodal
La novedad de septiembre de 2026 añade otra capa.

En sitios que ya reciban este tipo de tráfico, el nuevo filtro multimodal permite analizar búsquedas que utilizan una imagen como parte del proceso.

Empieza comparando:

- páginas;
- clics;
- impresiones;
- dispositivos;
- periodos.

No esperes encontrar grandes volúmenes el primer día.

El valor inicial está en detectar qué tipo de contenido aparece.

Por ejemplo, puedes descubrir que determinadas fichas de producto, tutoriales o páginas con fotografías originales generan más actividad multimodal que el resto.

Eso puede orientar futuras mejoras.

### No optimices solo para el buscador: crea imágenes reconocibles
Una buena imagen para búsqueda visual suele ser también una buena imagen para una persona.

Pregunta:

- ¿se distingue claramente el objeto?;
- ¿el encuadre tiene sentido?;
- ¿hay suficiente resolución?;
- ¿representa de verdad lo que explica la página?;
- ¿aporta algo que el texto no muestra?;
- ¿se entiende sin necesitar cinco párrafos?

El objetivo no es fabricar imágenes para un algoritmo.

Es reducir la ambigüedad.

## Checklist, ejemplo y conclusiones

### Una lista técnica para revisar tus imágenes
Puedes hacer una auditoría rápida seleccionando diez páginas importantes.

Para cada una, comprueba:

- imagen insertada mediante HTML cuando sea contenido;
- URL accesible;
- nombre de archivo descriptivo;
- texto alt útil;
- dimensiones declaradas;
- peso razonable;
- contexto textual cercano;
- versión responsive cuando sea necesaria;
- datos estructurados correctos en productos;
- sitemap si el proyecto lo necesita.

Después mira Search Console.

La parte técnica y la medición deben trabajar juntas.

### Ejemplo completo de una imagen preparada
Podemos reunir varias de estas ideas en una sola pieza de HTML.

Código de ejemplo 6:

```html
<figure class="producto-media">

  <picture>
    <source
      srcset="/img/atlas-frontal.avif"
      type="image/avif">

    <source
      srcset="/img/atlas-frontal.webp"
      type="image/webp">

    <img
      src="/img/atlas-frontal.jpg"
      srcset="
        /img/atlas-frontal-600.jpg 600w,
        /img/atlas-frontal-1200.jpg 1200w"
      sizes="(max-width: 700px) 100vw, 700px"
      alt="Mochila urbana Atlas negra de 20 litros vista de frente"
      width="1200"
      height="900">
  </picture>

  <figcaption>
    Mochila Atlas negra, modelo de 20 litros.
  </figcaption>

</figure>
```

No significa que todas las imágenes necesiten una estructura así.

Pero el ejemplo muestra una idea importante: **la optimización visual se construye con HTML normal y bien utilizado**.

### Qué evitar
Hay algunos errores recurrentes que conviene eliminar.

No conviertas todas las imágenes en fondos CSS si contienen información.

No rellenes el atributo alt con veinte palabras clave.

No publiques fotografías enormes sin optimizar.

No utilices la misma imagen genérica para cincuenta productos distintos.

No añadas datos estructurados que contradigan la página.

No borres imágenes antiguas que reciben tráfico sin comprobar antes su función.

Y no pienses que una nueva función de Google obliga a rehacer toda la web.

Empieza por las páginas que ya tienen valor.

### Qué cambia realmente con la búsqueda multimodal
La principal diferencia no es técnica.

Es conceptual.

Durante mucho tiempo hemos diseñado páginas pensando en una secuencia:

**consulta de texto → resultado → página.**

Ahora una parte de las búsquedas puede comenzar así:

**imagen → reconocimiento → consulta adicional → resultado → página.**

Eso hace que fotografías, ilustraciones y capturas puedan participar más directamente en el descubrimiento.

Para una web con buen contenido visual, esto abre una nueva forma de analizar la visibilidad.

Y gracias al nuevo informe de Search Console, ya podemos empezar a medirla con algo más de precisión.

### Conclusión
El SEO visual no consiste en poner palabras clave en nombres de fotografías.

Consiste en ayudar a los buscadores y a las personas a entender qué representa cada imagen y cómo se relaciona con la página.

Utiliza HTML estándar.

Describe las imágenes importantes.

Optimiza tamaño y formato.

Añade contexto.

Usa datos estructurados cuando correspondan.

Y a partir de septiembre de 2026, presta también atención al nuevo tráfico de búsqueda multimodal en Search Console.

La búsqueda está aprendiendo a mirar.

Nuestras webs deben asegurarse de que aquello que muestran también pueda entenderse.
