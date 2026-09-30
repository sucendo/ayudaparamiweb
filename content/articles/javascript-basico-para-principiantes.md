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
