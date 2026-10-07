---
title: "Cómo crear una web desde cero con HTML y CSS, sin CMS"
description: "Tutorial de 2018 para crear una web sencilla desde cero con HTML y CSS, sin WordPress, CMS ni constructores visuales."
excerpt: "Una web pequeña puede construirse a mano con unos pocos archivos. En esta primera parte crearemos la estructura, el diseño y varias páginas sin depender de un CMS."
author: "Sucender"
canonical: "/crear-web-desde-cero-html-css-sin-cms"
category: "tutoriales"
tags: ["Desarrollo web", "CSS", "Web"]
publishedDate: "2018-10-25"
featuredImage: "/img/articulo/crear-web-desde-cero-html-css-sin-cms-featured.svg"
heroClass: "bg-green"
themeColor: "#58b391"
robots: "index,follow"
---
Hace unos meses publiqué [¿Cómo crear una página web?](/como-crear-una-pagina-web), una guía general para decidir qué tipo de web necesitas, elegir dominio, alojamiento y valorar soluciones como WordPress.

Pero no todas las páginas necesitan un gestor de contenidos.

Si quieres aprender cómo funciona una web por dentro, hacer una página pequeña o simplemente tener el control de cada línea, también puedes construirla tú mismo con **HTML y CSS**, sin instalar WordPress, Joomla, Drupal ni ningún constructor visual.

En esta serie vamos a hacerlo paso a paso. Empezaremos con una web sencilla y, en las siguientes entregas, iremos ordenando el proyecto, añadiendo pequeñas herramientas con JavaScript y preparando todo para publicarlo correctamente.

## Qué vamos a construir

Nuestro ejemplo será una pequeña web llamada **Mi Caja Web**.

Tendrá inicialmente cuatro páginas:

- Inicio.
- Acerca de.
- Herramientas.
- Contacto.

No vamos a utilizar base de datos. Cada página será un archivo HTML y el diseño estará en una hoja CSS común.

La estructura inicial será esta:

~~~text
mi-caja-web/
├── index.html
├── acerca.html
├── herramientas.html
├── contacto.html
├── css/
│   └── estilos.css
└── img/
    └── logo.png
~~~

Puedes crear estas carpetas con el explorador de archivos y editar los documentos con cualquier editor de texto. Conviene utilizar un editor que destaque HTML y CSS para detectar errores con más facilidad.

Si todavía estás empezando con programación, antes puede ayudarte repasar [los conceptos básicos de programación](/conceptos-basicos-programacion).

## Crea la primera página HTML

HTML define la estructura del documento.

Crea un archivo llamado `index.html` y escribe:

~~~html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mi Caja Web</title>
  <meta name="description" content="Una pequeña web creada desde cero con HTML y CSS.">
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>

  <header class="cabecera">
    <a class="marca" href="index.html">Mi Caja Web</a>

    <nav>
      <a href="index.html">Inicio</a>
      <a href="acerca.html">Acerca de</a>
      <a href="herramientas.html">Herramientas</a>
      <a href="contacto.html">Contacto</a>
    </nav>
  </header>

  <main class="contenido">
    <h1>Mi primera web hecha a mano</h1>

    <p>
      Este sitio está construido únicamente con HTML, CSS
      y, más adelante, un poco de JavaScript.
    </p>

    <a class="boton" href="herramientas.html">Ver herramientas</a>
  </main>

  <footer class="pie">
    <p>Mi Caja Web</p>
  </footer>

</body>
</html>
~~~

Guarda el archivo y haz doble clic sobre él. El navegador debería abrir la página directamente.

No hace falta tener todavía un servidor para trabajar con este ejemplo. HTML y CSS pueden probarse localmente desde tu ordenador.

## Entiende qué hace cada parte

### El DOCTYPE

Esta primera línea:

~~~html
<!DOCTYPE html>
~~~

indica al navegador que el documento utiliza HTML5.

### El head

Dentro de `head` colocamos información sobre la página que no forma parte directamente del contenido visible.

Ahí aparecen:

- la codificación UTF-8;
- el viewport para móviles;
- el título;
- la descripción;
- el enlace a la hoja de estilos.

### El body

Dentro de `body` está lo que verá el visitante.

En nuestro caso tenemos tres grandes zonas:

~~~html
<header>...</header>
<main>...</main>
<footer>...</footer>
~~~

Utilizar etiquetas que describen la función de cada bloque hace el código más fácil de leer y mantener.

## Añade una hoja de estilos común

Ahora crea `css/estilos.css`.

Empieza con algo sencillo:

~~~css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f4f5f7;
}

.cabecera {
  background: #263238;
  padding: 18px 5%;
}

.marca {
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
}

nav {
  margin-top: 12px;
}

nav a {
  color: #fff;
  margin-right: 18px;
  text-decoration: none;
}

.contenido {
  max-width: 960px;
  margin: 35px auto;
  padding: 30px;
  background: #fff;
}

.boton {
  display: inline-block;
  padding: 10px 16px;
  color: #fff;
  background: #2f8f5b;
  text-decoration: none;
}

.pie {
  padding: 20px 5%;
  text-align: center;
  color: #666;
}
~~~

Actualiza la página en el navegador.

Ya tenemos algo importante: **el contenido y el diseño están separados**.

HTML describe qué contiene la página. CSS decide cómo se presenta.

## Crea las páginas internas

Ahora copia `index.html` y crea:

- `acerca.html`;
- `herramientas.html`;
- `contacto.html`.

Después cambia el contenido de cada `main`.

Por ejemplo, en `acerca.html`:

~~~html
<main class="contenido">
  <h1>Acerca de esta web</h1>

  <p>
    Mi Caja Web es un proyecto pequeño para aprender
    HTML, CSS y JavaScript construyendo cosas útiles.
  </p>

  <h2>Qué encontrarás aquí</h2>

  <ul>
    <li>Ejemplos de código.</li>
    <li>Pequeñas herramientas.</li>
    <li>Notas sobre desarrollo web.</li>
  </ul>
</main>
~~~

En `herramientas.html` podemos dejar preparado el espacio que utilizaremos más adelante:

~~~html
<main class="contenido">
  <h1>Herramientas</h1>

  <section class="tarjeta">
    <h2>Contador de caracteres</h2>
    <p>Próximamente añadiremos aquí nuestra primera herramienta.</p>
  </section>

  <section class="tarjeta">
    <h2>Generador sencillo</h2>
    <p>Esta zona también funcionará directamente en el navegador.</p>
  </section>
</main>
~~~

Añade al CSS:

~~~css
.tarjeta {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  background: #fff;
}

.tarjeta h2 {
  margin-top: 0;
}
~~~

Todavía no hacen nada. El objetivo ahora es disponer de una estructura sobre la que podamos trabajar.

## Utiliza enlaces relativos

En una web pequeña no necesitas escribir la dirección completa cada vez.

Desde `index.html` puedes enlazar otra página así:

~~~html
<a href="contacto.html">Contacto</a>
~~~

Y para cargar la hoja de estilos:

~~~html
<link rel="stylesheet" href="css/estilos.css">
~~~

Estas son rutas relativas: el navegador busca el archivo respecto a la ubicación del documento actual.

Cuando el proyecto crezca tendremos que cuidar mucho esta estructura para que mover archivos no rompa los enlaces.

## Haz que se adapte a pantallas pequeñas

Una web hecha a mano también debe poder leerse desde un teléfono.

Nuestro diseño ya incluye:

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1">
~~~

Ahora podemos añadir una media query sencilla:

~~~css
@media (max-width: 650px) {
  .cabecera {
    padding: 15px 20px;
  }

  nav a {
    display: block;
    margin: 8px 0;
  }

  .contenido {
    margin: 0;
    padding: 22px;
  }
}
~~~

Reduce el ancho de la ventana del navegador y observa cómo cambia el menú.

No estamos creando una versión móvil diferente. Estamos haciendo que la misma página se adapte al espacio disponible.

## Añade una página de contacto sin servidor

Sin PHP ni otro lenguaje de servidor, un formulario HTML no puede enviar por sí mismo el contenido a tu correo.

Pero podemos dejar preparada la interfaz:

~~~html
<main class="contenido">
  <h1>Contacto</h1>

  <form>
    <p>
      <label for="nombre">Nombre</label><br>
      <input id="nombre" name="nombre" type="text">
    </p>

    <p>
      <label for="correo">Correo electrónico</label><br>
      <input id="correo" name="correo" type="email">
    </p>

    <p>
      <label for="mensaje">Mensaje</label><br>
      <textarea id="mensaje" name="mensaje" rows="6"></textarea>
    </p>

    <button type="submit">Enviar</button>
  </form>
</main>
~~~

Más adelante, si necesitamos recibir esos datos, tendremos que añadir una parte de servidor o utilizar un servicio externo.

Es importante distinguir estas dos capas: HTML puede crear el formulario, pero hace falta algún sistema que procese realmente el envío.

## No olvides title y description

Aunque todavía estamos construyendo, cada página debería tener su propio título y descripción.

Por ejemplo, para herramientas:

~~~html
<title>Herramientas | Mi Caja Web</title>
<meta
  name="description"
  content="Pequeñas herramientas web creadas con JavaScript.">
~~~

No copies exactamente el mismo `title` en todas las páginas.

Si quieres entender mejor por qué merece la pena pensar en buscadores desde el principio, puedes leer [SEO ¿Qué es?](/seo-que-es).

## Mantén el proyecto pequeño al principio

Cuando construimos una web sin CMS es fácil caer en dos extremos.

Uno es intentar reproducir desde el primer día todo lo que hace WordPress.

El otro es meter todos los estilos y scripts en el propio HTML hasta crear un archivo imposible de mantener.

Para esta primera versión nos basta con:

- cuatro documentos HTML;
- una hoja CSS;
- una carpeta de imágenes;
- navegación común;
- una estructura que funciona en escritorio y móvil.

Ya tenemos una web real, aunque todavía sea sencilla.

La siguiente tarea será aprender a **organizarla para que pueda crecer sin convertir cada cambio en un trabajo repetitivo**.

**Siguiente tutorial de la serie:** [Cómo organizar una web HTML para poder ampliarla sin CMS](/organizar-web-html-sin-cms).
