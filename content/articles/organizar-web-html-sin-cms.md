---
title: "Cómo organizar una web HTML para poder ampliarla sin CMS"
description: "Tutorial de 2019 para ordenar una web hecha a mano con HTML, CSS y JavaScript, evitando duplicaciones y preparando una estructura fácil de mantener."
excerpt: "Una web estática puede crecer sin convertirse en un caos si separas bien páginas, estilos, scripts, imágenes y elementos comunes."
author: "Sucender"
canonical: "/organizar-web-html-sin-cms"
category: "tutoriales"
tags: ["Desarrollo web", "CSS", "JavaScript"]
publishedDate: "2019-01-31"
featuredImage: "/img/articulo/organizar-web-html-sin-cms-featured.svg"
heroClass: "bg-blue"
themeColor: "#47a3da"
robots: "index,follow"
---
En la [primera parte de esta serie](/crear-web-desde-cero-html-css-sin-cms) construimos una pequeña web con varias páginas HTML y una hoja de estilos común.

Funciona, pero en cuanto añadimos más secciones aparece un problema: **mantener una web hecha a mano exige orden**.

Si copiamos y pegamos la cabecera, el menú y el pie en veinte documentos, cualquier cambio obligará a revisar veinte archivos. Si mezclamos estilos, scripts e imágenes sin criterio, será difícil saber qué pertenece a cada cosa.

En esta segunda parte vamos a preparar el proyecto para que pueda crecer sin necesidad de instalar un CMS.

## Ordena primero las carpetas

Una estructura sencilla puede ser suficiente:

~~~text
mi-caja-web/
├── index.html
├── acerca.html
├── herramientas.html
├── contacto.html
├── css/
│   ├── estilos.css
│   └── herramientas.css
├── js/
│   └── app.js
├── img/
│   ├── logo.png
│   └── iconos/
└── docs/
~~~

No hace falta crear carpetas por crear.

La idea es que, cuando busques algo dentro de unos meses, puedas adivinar dónde está.

### Separa estilos generales de estilos muy específicos

La hoja `estilos.css` puede contener:

- tipografía;
- cabecera;
- navegación;
- botones;
- contenedores;
- tarjetas;
- footer;
- reglas responsive comunes.

Si una sección empieza a necesitar muchas reglas propias, puedes darle su propio archivo.

Por ejemplo:

~~~html
<link rel="stylesheet" href="css/estilos.css">
<link rel="stylesheet" href="css/herramientas.css">
~~~

No conviertas cada componente en un archivo distinto. En una web pequeña eso puede complicar más de lo que ayuda.

## Usa nombres de clases que describan su función

Evita nombres como:

~~~css
.caja1 { }
.caja2 { }
.texto-rojo-grande { }
~~~

Funcionan al principio, pero dejan de tener sentido cuando cambia el diseño.

Es mejor utilizar nombres relacionados con la función:

~~~css
.tarjeta-herramienta { }
.resultado-herramienta { }
.aviso-error { }
.navegacion-principal { }
~~~

Así puedes cambiar el aspecto sin tener que renombrar media web.

## Crea una base común para todas las páginas

Todas las páginas deberían compartir al menos:

- codificación;
- viewport;
- hoja de estilos;
- cabecera;
- navegación;
- footer.

Una plantilla básica puede quedar así:

~~~html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Título de la página | Mi Caja Web</title>
  <meta name="description" content="Descripción específica de esta página.">

  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>

  <header class="cabecera">
    <a class="marca" href="index.html">Mi Caja Web</a>

    <nav class="navegacion-principal">
      <a href="index.html">Inicio</a>
      <a href="acerca.html">Acerca de</a>
      <a href="herramientas.html">Herramientas</a>
      <a href="contacto.html">Contacto</a>
    </nav>
  </header>

  <main class="contenido">
    <!-- contenido de cada página -->
  </main>

  <footer class="pie">
    <p>Mi Caja Web</p>
  </footer>

  <script src="js/app.js"></script>
</body>
</html>
~~~

Guarda una copia limpia de esta estructura para crear futuras páginas.

No es un sistema de plantillas automático, pero evita empezar desde cero cada vez.

## Evita copiar estilos dentro del HTML

Es posible escribir:

~~~html
<p style="color:red;font-size:18px;">Aviso importante</p>
~~~

pero si repites esto muchas veces acabarás teniendo estilos repartidos por todo el proyecto.

Es mejor:

~~~html
<p class="aviso-importante">Aviso importante</p>
~~~

y en CSS:

~~~css
.aviso-importante {
  padding: 12px;
  color: #8b1e1e;
  background: #ffeaea;
  border-left: 4px solid #c0392b;
}
~~~

Si decides cambiar el diseño del aviso, solo modificas una regla.

## Centraliza el JavaScript

Vamos a crear `js/app.js`.

Aunque todavía tengamos pocas funciones, es mejor no llenar cada página de bloques `script`.

Podemos empezar con algo tan sencillo como marcar el año del pie:

~~~html
<footer class="pie">
  <p>Mi Caja Web · <span id="anio"></span></p>
</footer>
~~~

Y en `app.js`:

~~~javascript
var anio = document.getElementById('anio');

if (anio) {
  anio.textContent = new Date().getFullYear();
}
~~~

La comprobación `if (anio)` es importante porque no todas las páginas tienen por qué contener ese elemento.

## No ejecutes código para elementos que no existen

Cuando una web crece, un mismo archivo JavaScript puede cargarse en varias páginas.

Imagina que en herramientas tenemos:

~~~html
<button id="calcular">Calcular</button>
~~~

Si el script intenta acceder a ese botón desde todas las páginas y no comprueba antes si existe, puede producir errores.

Una forma sencilla de evitarlo:

~~~javascript
var boton = document.getElementById('calcular');

if (boton) {
  boton.addEventListener('click', function () {
    alert('Herramienta preparada');
  });
}
~~~

Este patrón nos será útil en la siguiente parte, cuando añadamos herramientas reales.

## Decide una convención para nombres de archivos

No mezcles archivos como:

~~~text
MiPagina.html
mi_pagina2.html
paginaNuevaFINAL.html
pagina-contacto-definitiva.html
~~~

Es mejor elegir una convención y mantenerla.

Por ejemplo:

~~~text
acerca.html
contacto.html
herramientas.html
guia-html.html
guia-css.html
~~~

Minúsculas, sin espacios y con guiones cuando haga falta.

Esto también facilita las URLs cuando publiques la web.

## Crea una navegación coherente

El menú debe ser igual en todas las páginas.

Un error habitual en webs hechas a mano es actualizar el menú de la portada y olvidar una página antigua.

Antes de publicar cambios importantes, busca en todos los archivos una parte común del menú para comprobar que sigue siendo consistente.

Por ejemplo:

~~~html
<nav class="navegacion-principal">
  <a href="index.html">Inicio</a>
  <a href="acerca.html">Acerca de</a>
  <a href="herramientas.html">Herramientas</a>
  <a href="contacto.html">Contacto</a>
</nav>
~~~

Si añades una sección nueva, recuerda actualizar todas las páginas que utilicen esta navegación.

## Añade una clase para la sección activa

Podemos indicar visualmente dónde está el usuario.

En `herramientas.html`:

~~~html
<a href="herramientas.html" class="activo">Herramientas</a>
~~~

Y en CSS:

~~~css
.navegacion-principal a.activo {
  font-weight: bold;
  text-decoration: underline;
}
~~~

Es una mejora pequeña, pero ayuda mucho cuando la navegación empieza a crecer.

## Organiza las herramientas como bloques reutilizables

La página de herramientas puede empezar a tener varias utilidades.

Conviene darles una estructura común:

~~~html
<section class="tarjeta-herramienta">
  <h2>Contador de caracteres</h2>

  <p>
    Escribe un texto y consulta cuántos caracteres contiene.
  </p>

  <div class="zona-herramienta">
    <!-- controles -->
  </div>
</section>
~~~

Otra herramienta utilizaría la misma clase:

~~~html
<section class="tarjeta-herramienta">
  <h2>Conversor de texto</h2>

  <p>
    Modifica un texto sin enviar datos al servidor.
  </p>

  <div class="zona-herramienta">
    <!-- controles -->
  </div>
</section>
~~~

Y el CSS puede aplicarse a todas:

~~~css
.tarjeta-herramienta {
  margin-bottom: 25px;
  padding: 20px;
  border: 1px solid #ddd;
  background: #fff;
}

.zona-herramienta {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}
~~~

Esta pequeña disciplina nos permitirá añadir nuevas utilidades sin inventar un diseño distinto cada vez.

## Piensa en enlaces internos desde el principio

Cuando una web tenga artículos, guías o herramientas, no dejes cada página aislada.

Desde una herramienta puedes enlazar una explicación relacionada. Desde una guía puedes enviar al usuario a una herramienta.

Los buscadores también utilizan estos enlaces para descubrir contenido y entender cómo se relacionan las páginas.

Si todavía estás aprendiendo SEO, puedes repasar [cómo funcionan los motores de búsqueda](/motores-de-busqueda) y la selección de [herramientas SEO prácticas](/herramientas-seo) que vimos recientemente.

## Evita rutas frágiles

Si desde una página situada en la raíz escribes:

~~~html
<img src="img/logo.png" alt="Mi Caja Web">
~~~

funciona.

Pero si más adelante creas:

~~~text
guias/html.html
~~~

esa misma ruta buscaría:

~~~text
guias/img/logo.png
~~~

y dejaría de funcionar.

Una opción es mantener las páginas principales en la raíz mientras el proyecto sea pequeño.

Otra es aprender bien cómo funcionan `../` y las rutas relativas antes de reorganizar carpetas.

Por ejemplo, desde `guias/html.html`:

~~~html
<img src="../img/logo.png" alt="Mi Caja Web">
~~~

Cuanto más estable sea la estructura, menos enlaces tendrás que corregir después.

## Guarda una copia antes de cambios grandes

Sin un CMS ni un sistema de versiones, sobrescribir un archivo por error puede ser suficiente para perder trabajo.

Como mínimo, guarda copias periódicas del proyecto.

Puedes crear carpetas:

~~~text
copias/
├── 2019-01-10/
├── 2019-01-20/
└── 2019-01-31/
~~~

No es la solución más avanzada, pero es mucho mejor que tener únicamente una copia.

Si empiezas a programar con frecuencia, aprender un sistema de control de versiones será un paso lógico más adelante.

## Prepara una zona para experimentar

No pruebes cambios grandes directamente sobre la página principal.

Puedes crear:

~~~text
pruebas.html
~~~

o una carpeta:

~~~text
pruebas/
~~~

Ahí puedes probar CSS, formularios o scripts sin romper la web pública.

Cuando algo funcione, lo pasas a la página definitiva.

## Comprueba la web como un conjunto

Antes de dar por terminada esta segunda parte, abre todas las páginas y revisa:

- menú;
- enlaces;
- imágenes;
- estilos;
- consola del navegador;
- móvil;
- títulos;
- navegación entre páginas.

Una web pequeña puede revisarse manualmente en pocos minutos.

Aprovecha esa ventaja antes de que el proyecto crezca.

## Qué tenemos ya

Nuestra web empieza a parecer un pequeño proyecto real.

Tenemos:

- varias páginas;
- una hoja de estilos común;
- JavaScript separado;
- nombres coherentes;
- navegación;
- bloques reutilizables;
- espacio preparado para herramientas.

Todavía no hemos necesitado un CMS.

En la siguiente parte vamos a aprovechar esa estructura para añadir algo mucho más interesante: **herramientas que funcionen directamente en el navegador con JavaScript**.

**Siguiente tutorial de la serie:** [Cómo crear herramientas útiles con JavaScript para tu propia web](/crear-herramientas-javascript-web).
