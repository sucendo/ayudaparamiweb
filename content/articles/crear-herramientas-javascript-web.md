---
title: "Cómo crear herramientas útiles con JavaScript para tu propia web"
description: "Tutorial de 2019 para añadir pequeñas herramientas a una web HTML usando JavaScript y el DOM, sin CMS, base de datos ni servidor."
excerpt: "Una web hecha a mano puede hacer mucho más que mostrar contenido. En esta parte añadiremos herramientas que funcionan directamente en el navegador."
author: "Sucender"
canonical: "/crear-herramientas-javascript-web"
category: "tutoriales"
tags: ["Desarrollo web", "JavaScript", "HTML", "Herramientas"]
publishedDate: "2019-06-13"
featuredImage: "/img/articulo/crear-herramientas-javascript-web-featured.svg"
heroClass: "bg-yellow"
themeColor: "#f1c40f"
robots: "index,follow"
---
En la [primera parte](/crear-web-desde-cero-html-css-sin-cms) construimos una web desde cero con HTML y CSS. Después vimos [cómo organizarla para poder ampliarla sin CMS](/organizar-web-html-sin-cms).

Ahora vamos a dar un paso más.

Hasta aquí nuestra web solo muestra información. En esta tercera parte vamos a añadir **herramientas que respondan a lo que hace el usuario**, utilizando JavaScript y el DOM del navegador.

No necesitaremos base de datos ni servidor. Todo funcionará en el propio equipo del visitante.

## Prepara una página para las herramientas

En `herramientas.html` podemos crear dos bloques:

- un contador de caracteres;
- un pequeño generador de slug.

La estructura inicial puede ser:

~~~html
<main class="contenido">
  <h1>Herramientas</h1>

  <section class="tarjeta-herramienta">
    <h2>Contador de caracteres</h2>

    <textarea id="texto-contador" rows="8"></textarea>

    <p>
      Caracteres:
      <strong id="resultado-caracteres">0</strong>
    </p>
  </section>

  <section class="tarjeta-herramienta">
    <h2>Generador de slug</h2>

    <input
      id="texto-slug"
      type="text"
      placeholder="Escribe un título">

    <button id="generar-slug" type="button">
      Generar
    </button>

    <p id="resultado-slug"></p>
  </section>
</main>

<script src="js/herramientas.js"></script>
~~~

Crea ahora:

~~~text
js/herramientas.js
~~~

y empezaremos con la primera utilidad.

## Crea un contador de caracteres

Un contador es un buen ejemplo porque permite aprender a:

- seleccionar elementos;
- escuchar eventos;
- leer valores;
- actualizar la página.

El HTML ya contiene:

~~~html
<textarea id="texto-contador" rows="8"></textarea>

<p>
  Caracteres:
  <strong id="resultado-caracteres">0</strong>
</p>
~~~

El JavaScript puede ser:

~~~javascript
var campoTexto = document.getElementById('texto-contador');
var salidaCaracteres = document.getElementById('resultado-caracteres');

if (campoTexto && salidaCaracteres) {
  campoTexto.addEventListener('input', function () {
    salidaCaracteres.textContent = campoTexto.value.length;
  });
}
~~~

Cada vez que cambia el contenido del textarea, JavaScript cuenta la longitud del texto y actualiza el resultado.

## Añade también palabras y líneas

Podemos aprovechar el mismo evento para mostrar más información.

Cambia el HTML:

~~~html
<div class="resultados-texto">
  <p>Caracteres: <strong id="resultado-caracteres">0</strong></p>
  <p>Palabras: <strong id="resultado-palabras">0</strong></p>
  <p>Líneas: <strong id="resultado-lineas">0</strong></p>
</div>
~~~

Y amplía el JavaScript:

~~~javascript
var campoTexto = document.getElementById('texto-contador');
var salidaCaracteres = document.getElementById('resultado-caracteres');
var salidaPalabras = document.getElementById('resultado-palabras');
var salidaLineas = document.getElementById('resultado-lineas');

if (
  campoTexto &&
  salidaCaracteres &&
  salidaPalabras &&
  salidaLineas
) {
  campoTexto.addEventListener('input', function () {
    var texto = campoTexto.value;
    var limpio = texto.trim();

    salidaCaracteres.textContent = texto.length;

    salidaPalabras.textContent = limpio
      ? limpio.split(/\s+/).length
      : 0;

    salidaLineas.textContent = texto
      ? texto.split(/\n/).length
      : 0;
  });
}
~~~

Ya tenemos una herramienta que responde al instante y no envía ningún dato a ningún sitio.

## Mejora la presentación

Añade a `css/herramientas.css`:

~~~css
textarea,
input,
button {
  font: inherit;
}

textarea,
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #bbb;
}

button {
  margin-top: 10px;
  padding: 10px 16px;
  cursor: pointer;
}

.resultados-texto {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
}

.resultados-texto p {
  margin: 0;
}
~~~

No necesitamos un diseño complicado. La herramienta debe ser clara antes que decorativa.

## Crea un generador de slug

Un slug es la parte legible de una URL.

Por ejemplo:

~~~text
Cómo crear una web sin CMS
~~~

puede convertirse en:

~~~text
como-crear-una-web-sin-cms
~~~

Podemos generar uno de forma sencilla.

En JavaScript:

~~~javascript
var textoSlug = document.getElementById('texto-slug');
var botonSlug = document.getElementById('generar-slug');
var resultadoSlug = document.getElementById('resultado-slug');

function crearSlug(texto) {
  return texto
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

if (textoSlug && botonSlug && resultadoSlug) {
  botonSlug.addEventListener('click', function () {
    resultadoSlug.textContent = crearSlug(textoSlug.value);
  });
}
~~~

Hemos evitado depender de librerías externas.

Para una herramienta tan pequeña, JavaScript nativo es suficiente.

## Permite copiar el resultado manualmente

Podríamos complicar la herramienta intentando acceder al portapapeles, pero no hace falta.

Una solución sencilla y compatible consiste en mostrar el resultado dentro de un campo:

~~~html
<input
  id="resultado-slug"
  type="text"
  readonly>
~~~

Y en JavaScript:

~~~javascript
resultadoSlug.value = crearSlug(textoSlug.value);
~~~

El usuario puede seleccionar el contenido y copiarlo normalmente.

En una web pequeña, una solución simple y predecible suele ser mejor que añadir una dependencia solo para ahorrar un clic.

## Crea una herramienta de conversión de mayúsculas

Podemos añadir una tercera utilidad sin mucho código.

HTML:

~~~html
<section class="tarjeta-herramienta">
  <h2>Convertir mayúsculas y minúsculas</h2>

  <textarea id="texto-convertir" rows="6"></textarea>

  <button id="a-mayusculas" type="button">
    MAYÚSCULAS
  </button>

  <button id="a-minusculas" type="button">
    minúsculas
  </button>
</section>
~~~

JavaScript:

~~~javascript
var textoConvertir = document.getElementById('texto-convertir');
var botonMayusculas = document.getElementById('a-mayusculas');
var botonMinusculas = document.getElementById('a-minusculas');

if (textoConvertir && botonMayusculas && botonMinusculas) {
  botonMayusculas.addEventListener('click', function () {
    textoConvertir.value = textoConvertir.value.toUpperCase();
  });

  botonMinusculas.addEventListener('click', function () {
    textoConvertir.value = textoConvertir.value.toLowerCase();
  });
}
~~~

Con unas pocas líneas ya hemos convertido una página informativa en una pequeña caja de herramientas.

## No cargues todos los scripts en todas las páginas

Nuestra web empieza a tener:

~~~text
js/
├── app.js
└── herramientas.js
~~~

`app.js` puede cargarse en todo el sitio.

Pero `herramientas.js` solo hace falta en `herramientas.html`.

Por tanto, no lo añadas a páginas que no lo necesitan.

Esta costumbre ayuda a mantener el proyecto más ligero a medida que crece.

## Agrupa cada herramienta en una función

Si empiezas a añadir varias utilidades, evita escribir todo el código seguido.

Puedes separar cada una:

~~~javascript
function iniciarContador() {
  var campo = document.getElementById('texto-contador');

  if (!campo) {
    return;
  }

  // Código del contador
}

function iniciarSlug() {
  var campo = document.getElementById('texto-slug');

  if (!campo) {
    return;
  }

  // Código del generador
}

iniciarContador();
iniciarSlug();
~~~

Esto facilita localizar errores y añadir nuevas funciones.

## Valida siempre los datos del usuario

Aunque una herramienta se ejecute solo en el navegador, no debes asumir que el usuario escribirá exactamente lo que esperas.

Si una calculadora espera números:

~~~html
<input id="numero-a" type="number">
<input id="numero-b" type="number">
<button id="sumar" type="button">Sumar</button>
<p id="resultado-suma"></p>
~~~

puedes comprobarlos así:

~~~javascript
var numeroA = document.getElementById('numero-a');
var numeroB = document.getElementById('numero-b');
var botonSumar = document.getElementById('sumar');
var resultadoSuma = document.getElementById('resultado-suma');

if (numeroA && numeroB && botonSumar && resultadoSuma) {
  botonSumar.addEventListener('click', function () {
    var a = parseFloat(numeroA.value);
    var b = parseFloat(numeroB.value);

    if (isNaN(a) || isNaN(b)) {
      resultadoSuma.textContent = 'Introduce dos números válidos.';
      return;
    }

    resultadoSuma.textContent = a + b;
  });
}
~~~

Esta validación no sustituye a la del servidor cuando existen datos sensibles o formularios reales, pero para una herramienta local evita resultados confusos.

## Usa la consola para encontrar errores

Cuando algo no funcione, abre las herramientas de desarrollo del navegador y revisa la consola.

También puedes escribir mensajes temporalmente:

~~~javascript
console.log('Herramientas cargadas correctamente');
~~~

o inspeccionar una variable:

~~~javascript
console.log(campoTexto.value);
~~~

No conviertas la depuración en una sucesión de cambios al azar.

Lee el error, comprueba la línea y verifica que el elemento existe.

## Mantén las herramientas sencillas y útiles

Una utilidad no necesita tener veinte opciones.

Antes de programarla, escribe en una frase qué problema resuelve.

Por ejemplo:

**Contador:** "Quiero saber rápidamente cuántos caracteres tiene un texto."

**Slug:** "Quiero convertir un título en una cadena sencilla para una URL."

**Conversor:** "Quiero cambiar el uso de mayúsculas sin editar el texto a mano."

Si no puedes explicar la función fácilmente, quizá estás intentando construir demasiado de una vez.

## Aprovecha las herramientas para crear contenido relacionado

Una pequeña utilidad puede ir acompañada de una explicación.

Por ejemplo, el generador de slug puede enlazar a contenido sobre SEO y URLs. El contador puede utilizarse al preparar títulos y descripciones.

Ya vimos algunos fundamentos en [SEO on-page: aspectos técnicos](/seo-on-page-aspectos-tecnicos), y también puede ayudarte la guía de [investigación de palabras clave](/investigacion-palabras-clave).

Así la herramienta no queda aislada: forma parte del contenido de la web.

## Qué tenemos al terminar

Nuestra web ya incluye:

- páginas HTML;
- CSS común;
- JavaScript separado;
- navegación;
- contador de caracteres;
- generador de slug;
- conversor de texto;
- estructura para seguir añadiendo herramientas.

Todo funciona sin CMS y sin base de datos.

Eso no significa que debamos programarlo todo nosotros. Si en el futuro necesitamos usuarios, pagos, búsquedas complejas o gestión frecuente de contenidos, probablemente necesitemos una solución más potente.

Pero para utilidades pequeñas, HTML, CSS y JavaScript pueden llegar mucho más lejos de lo que parece.

En la siguiente y última parte prepararemos esta web para publicarla: revisaremos velocidad, SEO básico, errores, sitemap, robots.txt, HTTPS y las comprobaciones finales.

**Siguiente tutorial de la serie:** [Cómo optimizar y publicar una web hecha por ti mismo](/optimizar-publicar-web-hecha-a-mano).
