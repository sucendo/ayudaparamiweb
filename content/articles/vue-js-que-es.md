---
title: "¿Qué es Vue.js y para qué sirve? Guía práctica"
description: "Introducción a Vue.js 3 en 2021: componentes, reactividad, Options API, Composition API, props, eventos, rutas y consumo de APIs."
excerpt: "Vue 3 permite construir interfaces por componentes y adoptar el framework de forma progresiva, desde una parte de una página hasta una aplicación completa."
author: "Sucender"
canonical: "/vue-js-que-es"
category: "tutoriales"
tags: ["JavaScript", "Desarrollo web"]
publishedDate: "2021-04-07"
featuredImage: "/img/articulo/vue-js-que-es-featured.svg"
heroClass: "bg-blue"
themeColor: "#47a3da"
robots: "index,follow"
---
Vue.js es un framework progresivo de JavaScript para construir interfaces. Su principal ventaja es que puede introducirse de forma gradual: desde un componente pequeño dentro de una página existente hasta una aplicación completa organizada en componentes.

## Fundamentos de Vue 3

### Vue 3 y su modelo de componentes
Vue 3 mantiene una estructura basada en componentes reutilizables. Cada componente puede agrupar plantilla, comportamiento y estilos relacionados, lo que ayuda a dividir una interfaz grande en piezas con responsabilidades más claras.

### Reactividad: actualizar la interfaz desde el estado
En lugar de manipular manualmente cada elemento del DOM, defines datos reactivos y Vue actualiza la parte de la interfaz que depende de ellos. Esto simplifica formularios, filtros, contadores y vistas que cambian con datos dinámicos.

### Options API y Composition API
Vue 3 permite organizar un componente con la API tradicional basada en opciones o con **Composition API**, que facilita agrupar lógica por funcionalidad y reutilizarla entre componentes.

No hay una única forma correcta para todos los proyectos; equipos pequeños pueden empezar con una estructura sencilla y adoptar composables cuando la lógica crece.

## Comunicación y navegación

### Props y eventos para comunicar componentes
Los datos suelen bajar desde un componente padre mediante `props`, mientras que los eventos permiten comunicar acciones hacia arriba. Mantener este flujo explícito reduce dependencias difíciles de seguir.

### Rutas para aplicaciones con varias vistas
Vue Router permite asociar URLs con componentes y construir navegación sin recargar toda la página. Es útil en aplicaciones internas, paneles o proyectos donde varias vistas comparten estado y estructura.

### Estado compartido
En aplicaciones pequeñas, el estado puede mantenerse en componentes y módulos propios. Cuando crece la cantidad de información compartida, una solución de gestión centralizada ayuda a evitar cadenas largas de props y eventos.

### Consumo de APIs
Vue no obliga a utilizar un backend concreto. Puede consumir APIs HTTP creadas con Node, PHP, Java u otras tecnologías. Conviene separar llamadas de red, estados de carga y tratamiento de errores de la presentación visual.

## Cuándo usar Vue

### Cuándo tiene sentido usar Vue
- Interfaces con mucha interacción.
- Paneles y herramientas internas.
- Formularios complejos.
- Aplicaciones que consumen APIs.
- Proyectos que quieren adoptar componentes de forma gradual.

Para una web principalmente estática, añadir un framework completo puede ser innecesario. La decisión debe depender de la interacción y del mantenimiento esperado.

### Empieza pequeño
Crea primero uno o dos componentes, comprende reactividad, props y eventos, y después introduce rutas o estado global cuando el proyecto lo necesite. Esa progresión encaja con la filosofía de Vue y evita añadir complejidad antes de tiempo.

Vue.js resulta atractivo porque combina una curva de entrada accesible con herramientas suficientes para aplicaciones más grandes, sin obligar a utilizar toda la pila desde el primer día.
## Componentes y directivas

### Single File Components
En proyectos organizados con herramientas de compilación, Vue permite utilizar archivos `.vue` que agrupan plantilla, script y estilos relacionados con un componente.

Esta estructura facilita localizar qué comportamiento pertenece a cada pieza de la interfaz sin obligar a tener todo el proyecto en un único archivo.

### Directivas frecuentes
Vue incorpora directivas para tareas habituales. `v-if` permite mostrar contenido según una condición, `v-for` recorre listas y `v-model` simplifica la relación entre un campo de formulario y su estado.

Aprender unas pocas directivas cubre gran parte de los primeros casos prácticos.

### Eventos de interfaz
Puedes escuchar acciones como clics o envíos de formulario directamente desde la plantilla y ejecutar métodos del componente.

Mantén la lógica compleja fuera del HTML siempre que sea posible. La plantilla debería mostrar con claridad qué evento dispara cada acción.

## Estado y componentes

### Computed y watch
Las propiedades calculadas sirven para derivar un valor a partir del estado, por ejemplo una lista filtrada o un total.

Los observadores son útiles cuando necesitas reaccionar a un cambio y ejecutar una acción adicional. No utilices `watch` como sustituto de una propiedad calculada cuando solo necesitas obtener otro valor.

### Componentes pequeños, pero con sentido
Dividir absolutamente cada etiqueta en un componente añade ruido. Crea componentes cuando una pieza tenga responsabilidad propia, se reutilice o resulte más fácil de comprender de forma aislada.

Un botón genérico puede ser reutilizable; una sección sencilla que solo aparece una vez quizá no necesite separarse.

### Props de solo entrada
Las props permiten que un padre pase información a un hijo. El componente hijo debería tratar ese dato como entrada y comunicar cambios mediante eventos en lugar de modificar directamente el estado del padre.

Este flujo ayuda a localizar de dónde viene cada valor.

## Formularios y datos externos

### Formularios
Vue facilita sincronizar campos con datos reactivos, pero todavía debes validar entradas y mostrar errores de forma comprensible.

La validación del navegador no sustituye la comprobación en el servidor cuando los datos terminan almacenándose o ejecutando acciones sensibles.

### Peticiones a APIs
Puedes utilizar `fetch` u otras bibliotecas para obtener datos. Controla estados de carga, error y resultado vacío.

No asumas que la red siempre responderá correctamente. Una interfaz debe explicar qué ocurre cuando una petición falla.

## Rutas y adopción gradual

### Vue Router cuando existen varias vistas
Si una aplicación necesita URLs diferenciadas sin recargar toda la página, Vue Router permite asociar rutas con componentes.

No lo añadas a un widget pequeño que vive dentro de una página tradicional. La adopción progresiva es precisamente una de las fortalezas de Vue.

### Empieza con una necesidad real
Un filtro de productos, un formulario dinámico o un pequeño panel son buenos ejercicios porque permiten practicar estado, eventos y componentes.

Si primero quieres consolidar JavaScript, consulta [JavaScript básico para principiantes](/javascript-basico-para-principiantes) y [HTML, CSS y JavaScript: por dónde empezar](/html-css-y-javascript-por-donde-empezar).

Vue resulta útil cuando la interfaz tiene suficiente interacción para beneficiarse de un modelo reactivo. No es obligatorio convertir cada web en una aplicación completa para aprovecharlo.
