---
title: "Cómo optimizar y publicar una web hecha por ti mismo"
description: "Tutorial de 2019 para preparar y publicar una web hecha a mano: rendimiento, SEO básico, robots.txt, sitemap, HTTPS, errores y revisión final."
excerpt: "La última parte de la serie convierte una web local en un sitio preparado para publicarse, rastrearse y mantenerse sin CMS."
author: "Sucender"
canonical: "/optimizar-publicar-web-hecha-a-mano"
category: "tutoriales"
tags: ["Desarrollo web", "SEO", "Rendimiento web"]
publishedDate: "2019-10-03"
featuredImage: "/img/articulo/optimizar-publicar-web-hecha-a-mano-featured.svg"
heroClass: "bg-purple"
themeColor: "#7a45e8"
robots: "index,follow"
---
En la [primera parte](/crear-web-desde-cero-html-css-sin-cms) construimos una web desde cero con HTML y CSS. Después vimos [cómo organizarla para que pudiera crecer](/organizar-web-html-sin-cms) y añadimos [pequeñas herramientas con JavaScript](/crear-herramientas-javascript-web).

Ya tenemos algo funcional.

Ahora toca una fase menos vistosa pero imprescindible: **preparar la web para publicarla de verdad**.

Vamos a revisar archivos, velocidad, títulos, enlaces, sitemap, robots.txt, HTTPS y algunos errores que conviene detectar antes de subir el proyecto al servidor.

## Limpia el proyecto antes de subirlo

Durante el desarrollo es normal acumular archivos de prueba.

Busca cosas como:

```text
index-viejo.html
pruebas.html
estilos-copia.css
app-final2.js
imagen-original-4000px.jpg
```

No deberían acabar en la web pública si ya no sirven.

Mantén únicamente los archivos necesarios.

Una estructura razonable podría quedar así:

```text
mi-caja-web/
├── index.html
├── acerca.html
├── herramientas.html
├── contacto.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── css/
│   ├── estilos.css
│   └── herramientas.css
├── js/
│   ├── app.js
│   └── herramientas.js
└── img/
    └── ...
```

Cuanto más sencilla sea la estructura, más fácil será detectar después un enlace roto o un archivo que falta.

## Revisa cada `<title>` y cada `<meta name="description">`

Cada página debería describirse por sí misma.

No copies esto en todo el sitio:

```html
<title>Mi Caja Web</title>
<meta name="description" content="Mi página web">
```

Para la sección de herramientas podríamos utilizar:

```html
<title>Herramientas web sencillas | Mi Caja Web</title>
<meta
  name="description"
  content="Pequeñas herramientas de texto y utilidades creadas con JavaScript.">
```

Y para contacto:

```html
<title>Contacto | Mi Caja Web</title>
<meta
  name="description"
  content="Formulario y datos de contacto de Mi Caja Web.">
```

El título ayuda al usuario a identificar la página en el navegador y también es una de las señales que utiliza Google para entender el contenido.

Si quieres profundizar en esta parte, puedes repasar [SEO on-page: aspectos técnicos](/seo-on-page-aspectos-tecnicos).

## Mantén un solo H1 principal por página

La estructura de encabezados debería seguir una lógica sencilla.

Por ejemplo:

```html
<h1>Herramientas web</h1>

<section>
  <h2>Contador de caracteres</h2>
  ...
</section>

<section>
  <h2>Generador de slug</h2>
  ...
</section>
```

No utilices un H2 solo porque visualmente te gusta su tamaño.

Si necesitas que un texto parezca más grande o más pequeño, hazlo con CSS.

## Añade una URL canonical

En una web pequeña puede parecer innecesario, pero ayuda a indicar cuál es la dirección preferida de una página.

En el `<head>`:

```html
<link
  rel="canonical"
  href="https://www.ejemplo.com/herramientas.html">
```

Utiliza siempre la URL definitiva.

Si tu web responde con y sin `www`, o con HTTP y HTTPS, procura que todas las variantes redirijan a una única versión.

## Comprueba todos los enlaces internos

Haz clic en todo.

No solo en el menú principal.

Revisa:

- enlaces dentro de textos;
- botones;
- imágenes enlazadas;
- navegación;
- `<footer>`;
- enlaces entre herramientas;
- enlaces hacia páginas antiguas.

Un error muy común en una web estática es renombrar un archivo y olvidar actualizar todos los enlaces que apuntaban al nombre anterior.

Si cambias:

```text
acerca.html
```

por:

```text
sobre-mi.html
```

cualquier enlace antiguo a `acerca.html` dejará de funcionar.

## Crea una página 404 sencilla

Si tu alojamiento permite una página de error personalizada, prepara `404.html`.

Por ejemplo:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Página no encontrada | Mi Caja Web</title>
  <meta name="robots" content="noindex">
  <link rel="stylesheet" href="/css/estilos.css">
</head>
<body>

  <main class="contenido">
    <h1>Página no encontrada</h1>

    <p>
      La dirección que has abierto no existe
      o ha cambiado.
    </p>

    <p>
      <a href="/">Volver al inicio</a>
    </p>
  </main>

</body>
</html>
```

El servidor debe devolver realmente un código 404. No basta con mostrar una página que diga "no encontrada" si técnicamente responde como una página normal.

## Prepara robots.txt

En la raíz del sitio puedes crear:

```text
User-agent: *
Allow: /

Sitemap: https://www.ejemplo.com/sitemap.xml
```

Este archivo no sirve para ocultar información privada.

Su función es dar instrucciones de rastreo a los robots que deciden respetarlas.

Si una página no debe ser pública, no confíes en robots.txt como sistema de seguridad.

## Crea un sitemap XML básico

Para una web pequeña podemos escribirlo a mano.

Por ejemplo:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://www.ejemplo.com/</loc>
  </url>

  <url>
    <loc>https://www.ejemplo.com/acerca.html</loc>
  </url>

  <url>
    <loc>https://www.ejemplo.com/herramientas.html</loc>
  </url>

  <url>
    <loc>https://www.ejemplo.com/contacto.html</loc>
  </url>

</urlset>
```

Guárdalo como:

```text
sitemap.xml
```

y colócalo en la raíz.

Cada vez que añadas o elimines una página importante, recuerda actualizarlo.

Para entender mejor por qué rastreo e indexación son cosas distintas, puedes leer [cómo funcionan los motores de búsqueda](/motores-de-busqueda).

## Comprueba las imágenes

Antes de subirlas, revisa:

- dimensiones;
- peso;
- formato;
- nombre de archivo;
- atributo alt.

Una imagen:

```text
IMG_8248.JPG
```

puede convertirse en:

```text
contador-caracteres.jpg
```

si ese nombre describe realmente su contenido.

En HTML:

```html
<img
  src="img/contador-caracteres.jpg"
  alt="Ejemplo del contador de caracteres">
```

No llenes el atributo alt de palabras clave.

Debe describir la imagen cuando esa descripción sea útil.

## Reduce el peso de CSS y JavaScript

Nuestra web no utiliza demasiados archivos, pero aun así conviene revisar si hay reglas y funciones que ya no se utilizan.

No minifiques mientras todavía estás desarrollando.

Primero guarda una versión legible:

```text
css/estilos.css
js/herramientas.js
```

y después, si quieres publicar una versión comprimida, puedes generar algo como:

```text
css/estilos.min.css
js/herramientas.min.js
```

Entonces actualizarías el HTML:

```html
<link rel="stylesheet" href="css/estilos.min.css">
<script src="js/herramientas.min.js"></script>
```

No borres los archivos fuente legibles. Los necesitarás cuando quieras modificar algo.

## Carga JavaScript al final o con cuidado

En nuestro ejemplo hemos colocado los `<script>` al final de `<body>`:

```html
<script src="js/app.js"></script>
<script src="js/herramientas.js"></script>
```

Así el navegador puede procesar primero buena parte del HTML.

También puedes utilizar el atributo `defer` directamente en `<script>`:

```html
<script src="js/app.js" defer></script>
```

pero no cambies la forma de carga sin comprobar que tus scripts siguen encontrando los elementos y ejecutándose en el orden esperado.

## Revisa la web en móvil

No basta con reducir la ventana del ordenador.

Si puedes, abre la web desde un teléfono real.

Comprueba:

- menú;
- textos;
- botones;
- formularios;
- herramientas;
- campos de entrada;
- imágenes;
- espacios laterales.

Una herramienta que funciona perfectamente con ratón puede resultar incómoda en una pantalla táctil si los botones son demasiado pequeños.

## Comprueba formularios y herramientas

Prueba datos normales y datos extraños.

En el contador:

- texto vacío;
- varias líneas;
- espacios;
- caracteres acentuados.

En el generador de slug:

- mayúsculas;
- ñ;
- tildes;
- varios espacios;
- símbolos.

En el formulario:

- correo vacío;
- correo incorrecto;
- mensaje muy largo.

No des por terminada una función solo porque el caso perfecto funciona.

## Activa HTTPS

Si tu proveedor ofrece certificado SSL, utiliza HTTPS para toda la web.

Después comprueba que:

```text
http://www.ejemplo.com
```

redirige a:

```text
https://www.ejemplo.com
```

y que imágenes, CSS, JavaScript y otros recursos también cargan mediante HTTPS.

Si una página segura intenta cargar recursos HTTP, el navegador puede mostrar avisos o bloquearlos.

## Sube primero una copia de prueba

Si ya tienes una web pública, no reemplaces todo sin comprobarlo.

Puedes subir el proyecto a una carpeta temporal:

```text
https://www.ejemplo.com/pruebas/
```

o utilizar un subdominio de pruebas si tu alojamiento lo permite.

Comprueba allí:

- rutas;
- permisos;
- imágenes;
- JavaScript;
- formularios;
- errores 404.

Cuando estés seguro, mueve la versión definitiva.

Si la zona de pruebas es pública, evita que termine indexándose accidentalmente.

## Da de alta la web en Search Console

Una vez publicada, Google Search Console te permite comprobar cómo Google accede al sitio.

Puedes:

- verificar la propiedad;
- enviar el sitemap;
- comprobar una URL;
- revisar posibles problemas de rastreo;
- observar las consultas que empiezan a generar impresiones.

No esperes que una web nueva aparezca inmediatamente para cualquier búsqueda.

Primero debe ser descubierta, rastreada e indexada.

La guía de [herramientas SEO imprescindibles](/herramientas-seo) puede ayudarte a completar esta parte con Analytics, PageSpeed Insights y otras utilidades.

## Comprueba la búsqueda con site:

Una comprobación sencilla es utilizar:

```text
site:ejemplo.com
```

en Google.

No sustituye a Search Console, pero puede servir para comprobar qué páginas del dominio aparecen en el índice.

Si una página importante no aparece, revisa antes de nada:

- si está enlazada;
- si está en el sitemap;
- si tiene noindex;
- si robots.txt bloquea su ruta;
- si devuelve un error;
- si su canonical apunta a otra URL.

## Haz una lista de comprobación final

Antes de considerar terminada la web, revisa:

```text
[ ] Todas las páginas abren
[ ] No hay enlaces rotos
[ ] Cada página tiene `<title>` propio
[ ] Cada página tiene description
[ ] Los H1 y H2 tienen sentido
[ ] Las imágenes están comprimidas
[ ] La web funciona en móvil
[ ] JavaScript no muestra errores
[ ] Existe una página 404
[ ] robots.txt es correcto
[ ] sitemap.xml está actualizado
[ ] HTTPS funciona
[ ] El sitemap se ha enviado a Search Console
```

Guarda esta lista.

Te servirá cada vez que añadas una nueva sección.

## Una web sin CMS también necesita mantenimiento

No utilizar WordPress ni otro CMS no significa que la web se mantenga sola.

Tendrás que revisar:

- enlaces;
- contenidos;
- archivos antiguos;
- compatibilidad de JavaScript;
- rendimiento;
- copias de seguridad;
- cambios del servidor.

La ventaja es que conoces exactamente qué hay en el proyecto.

No existen plugins desconocidos ni una base de datos que tengas que entender para cambiar un texto.

La desventaja es que **tú eres el sistema de gestión**.

## Lo que hemos construido en estas cuatro partes

Empezamos con unos pocos archivos y hemos terminado con una web que tiene:

- estructura HTML;
- diseño CSS;
- navegación;
- varias páginas;
- JavaScript;
- herramientas interactivas;
- organización de carpetas;
- responsive básico;
- SEO on-page;
- sitemap;
- robots.txt;
- HTTPS;
- comprobaciones de publicación.

Todo sin instalar un CMS.

No es la solución adecuada para todos los proyectos. Una tienda, una web con muchos redactores o un sitio que cambia varias veces al día probablemente necesite herramientas de gestión más avanzadas.

Pero construir una web así tiene una ventaja enorme: **te obliga a entender qué ocurre realmente cuando una página llega al navegador**.

Si prefieres comparar este enfoque con soluciones gestionadas, vuelve a [¿Cómo crear una página web?](/como-crear-una-pagina-web), donde repasamos otras formas de poner en marcha un sitio.

**Serie completa:** [Crear la web](/crear-web-desde-cero-html-css-sin-cms) → [Organizarla](/organizar-web-html-sin-cms) → [Añadir herramientas con JavaScript](/crear-herramientas-javascript-web) → **Optimizarla y publicarla**.
