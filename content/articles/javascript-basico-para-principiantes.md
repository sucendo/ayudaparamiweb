---
title: "JavaScript básico para principiantes"
description: "Introducción a JavaScript para principiantes: variables, condiciones, funciones, eventos y manipulación básica del DOM."
excerpt: "Los conceptos mínimos para empezar a añadir comportamiento a una página web."
author: "Sucender"
canonical: "/javascript-basico-para-principiantes"
category: "tutoriales"
tags: ["JavaScript", "Programación", "Desarrollo web"]
publishedDate: "2021-01-14"
featuredImage: "/img/articulo/javascript-basico-para-principiantes-featured.svg"
heroClass: "bg-yellow"
themeColor: "#f1c40f"
robots: "index,follow"
---
JavaScript permite añadir comportamiento a una página web: responder a un clic, validar un formulario, cambiar contenido o realizar cálculos. Para empezar conviene dominar unas pocas ideas y practicar con ejemplos pequeños antes de utilizar librerías más complejas.

## Tu primer código

Puedes ejecutar JavaScript desde la consola del navegador o incluir un archivo con una etiqueta `script`. Una instrucción sencilla es:

```js
console.log('Hola desde JavaScript');
```

La consola resulta muy útil para comprobar valores y entender errores.

## Variables y valores

Una variable guarda un valor que utilizarás después:

```js
const nombre = 'Ana';
let visitas = 1;
visitas = visitas + 1;
```

Utiliza `const` cuando no vayas a reasignar la variable y `let` cuando el valor pueda cambiar.

## Condiciones

Las condiciones permiten ejecutar código según una situación:

```js
const edad = 20;
if (edad >= 18) {
  console.log('Acceso permitido');
} else {
  console.log('Acceso restringido');
}
```

Compara valores de forma explícita y evita condiciones demasiado largas.

## Funciones

Una función agrupa una tarea reutilizable:

```js
function saludar(nombre) {
  return `Hola, ${nombre}`;
}

console.log(saludar('Luis'));
```

Las funciones pequeñas suelen ser más fáciles de probar y entender.

## Seleccionar elementos de la página

El DOM representa el documento HTML. Puedes localizar un elemento y modificarlo:

```js
const titulo = document.querySelector('h1');
titulo.textContent = 'Título actualizado';
```

Comprueba que el elemento existe antes de operar con él cuando el script pueda ejecutarse en páginas diferentes.

## Responder a eventos

Los eventos permiten reaccionar a acciones del usuario:

```js
const boton = document.querySelector('#enviar');
boton.addEventListener('click', () => {
  console.log('Botón pulsado');
});
```

Evita mezclar demasiada lógica dentro del manejador; llama a funciones cuando la tarea crezca.

## Arrays y recorridos

Un array almacena una lista de valores:

```js
const colores = ['azul', 'verde', 'rojo'];
colores.forEach((color) => console.log(color));
```

Practicar con listas ayuda a entender gran parte del código de interfaces.

## Aprende leyendo errores

Cuando algo falla, la consola suele indicar archivo y línea. Lee el mensaje, inspecciona valores y reduce el problema a un ejemplo pequeño.

JavaScript se aprende mejor construyendo interacciones sencillas y comprendiendo cada paso antes de copiar fragmentos grandes de código.
## Tipos de datos y comparaciones que conviene entender

Antes de crear interacciones más grandes, acostúmbrate a distinguir cadenas de texto, números, valores booleanos, objetos y valores ausentes. Muchos fallos de principiantes no vienen de una sintaxis complicada, sino de asumir que dos valores son del mismo tipo cuando no lo son. La consola del navegador permite comprobarlos con rapidez.

También es buena práctica utilizar comparaciones estrictas cuando quieras evitar conversiones implícitas difíciles de detectar. Es más importante comprender qué estás comparando que memorizar todas las posibilidades del lenguaje.

## Lee y modifica formularios con cuidado

Una de las primeras tareas reales con JavaScript suele ser leer un campo de formulario. El valor que llega desde un elemento de texto es una cadena, aunque la persona haya escrito un número. Si necesitas hacer cálculos, conviértelo y valida el resultado antes de utilizarlo.

No confíes únicamente en JavaScript para validar información importante. La validación en el navegador mejora la experiencia, pero cualquier dato que termine en un servidor debe comprobarse también allí. El usuario puede desactivar scripts o enviar peticiones de otra forma.

## Separa datos, lógica y cambios visuales

Cuando un ejemplo empieza a crecer, evita mezclar en el mismo bloque la lectura del DOM, los cálculos y los cambios de interfaz. Una función puede obtener datos, otra decidir qué hacer y otra actualizar la página. Esta separación hace más fácil localizar un error y reutilizar código.

No necesitas crear una arquitectura compleja para un ejercicio pequeño. Basta con acostumbrarte a que cada función tenga una responsabilidad reconocible y un nombre que explique qué hace.

## Entiende el ámbito de las variables

Las variables declaradas dentro de una función o un bloque no siempre están disponibles fuera. Este concepto, llamado ámbito o *scope*, evita que todo el programa dependa de variables globales.

Procura declarar cada dato lo más cerca posible del código que lo utiliza. Las variables globales pueden parecer cómodas al principio, pero en una página grande aumentan el riesgo de sobrescribir valores o de que una función dependa de información difícil de localizar.

## Errores frecuentes al empezar

Un selector que no encuentra ningún elemento devuelve un resultado vacío y la siguiente operación puede fallar. Otro error habitual es ejecutar el script antes de que el HTML necesario exista. Colocar el archivo en una posición adecuada o utilizar `defer` puede evitar ese problema.

También conviene vigilar mayúsculas y minúsculas, paréntesis sin cerrar y nombres de variables escritos de forma diferente. Lee siempre el primer error relevante de la consola: muchos mensajes posteriores son solo consecuencia del primero.

## Practica con proyectos pequeños y completos

En lugar de copiar ejemplos aislados, crea algo que tenga principio y final. Un contador, una lista de tareas sencilla, un formulario que calcule un importe o un botón que cambie una parte de la página obligan a combinar variables, funciones, eventos y DOM.

Cuando funcione, intenta una segunda versión: separa funciones, mejora los mensajes de error o añade una opción nueva. Esa repetición enseña más que saltar directamente a una librería sin entender qué está ocurriendo.

Si aún estás ordenando las bases, puede ayudarte la guía [HTML, CSS y JavaScript: por dónde empezar](/html-css-y-javascript-por-donde-empezar). Y para entender mejor variables, condiciones y funciones como conceptos generales, revisa [conceptos básicos de programación](/conceptos-basicos-programacion).

## Qué aprender después

Una vez que controles estas piezas, el siguiente paso puede ser profundizar en objetos, métodos de arrays, módulos, peticiones de red y asincronía. No hace falta aprenderlo todo a la vez. Intenta incorporar cada concepto cuando un proyecto concreto lo necesite.

La mejor señal de progreso no es saber muchas palabras del lenguaje, sino ser capaz de explicar por qué tu código funciona, detectar dónde falla y modificarlo sin tener que sustituirlo entero.
