---
title: "Accesibilidad web: principios básicos"
description: "Principios de accesibilidad web en 2021: HTML semántico, teclado, foco, contraste, imágenes, formularios, ARIA, zoom, multimedia y pruebas manuales."
author: "Sucender"
canonical: "/accesibilidad-web-principios-basicos"
category: "tutoriales"
tags: ["Accesibilidad", "Desarrollo web", "UX"]
publishedDate: "2021-07-08"
featuredImage: "/img/articulo/accesibilidad-web-principios-basicos-featured.svg"
heroClass: "bg-blue"
themeColor: "#47a3da"
excerpt: "Una web accesible permite completar las mismas tareas con distintas formas de navegación, percepción e interacción."
robots: "index,follow"
---
La accesibilidad web consiste en diseñar y desarrollar páginas que puedan utilizar el mayor número posible de personas, incluidas aquellas que navegan con teclado, lectores de pantalla, ampliadores, controles alternativos o configuraciones de alto contraste. No es un añadido decorativo: afecta a la estructura, al contenido y a la forma en que una persona completa una tarea.

## Estructura y navegación

### Empieza por una estructura HTML clara
Una página accesible comienza con HTML semántico. Los encabezados deben seguir un orden lógico, los botones deben ser botones reales y los enlaces deben describir adónde llevan. Cuando la estructura está bien construida, los navegadores y las tecnologías de apoyo pueden interpretar mejor la página.

Evita utilizar elementos visuales como sustitutos de la estructura. Un texto grande no se convierte en encabezado solo por tener un tamaño mayor, y un `div` con un evento de clic no ofrece por sí mismo el comportamiento de un botón.

### Comprueba que todo funciona con teclado
Una prueba muy sencilla consiste en guardar el ratón y recorrer la página con la tecla `Tab`. Debe ser posible llegar a enlaces, botones, formularios y controles interactivos siguiendo un orden comprensible.

El foco debe verse con claridad. Si un usuario no sabe qué elemento está seleccionado, resulta muy difícil navegar. También conviene evitar trampas de teclado: un componente no debería capturar el foco de forma que impida continuar por el resto de la página.

## Presentación y contenido alternativo

### Cuida el contraste, el tamaño y la legibilidad
El color no debería ser la única forma de comunicar información. Un error de formulario, por ejemplo, puede mostrarse en rojo, pero también necesita un texto o un icono que explique qué ocurre.

Revisa el contraste entre texto y fondo, utiliza tamaños cómodos y deja suficiente espacio entre bloques. La lectura mejora cuando las líneas no son excesivamente largas y cuando la jerarquía visual coincide con la jerarquía del contenido.

### Las imágenes necesitan una alternativa útil
Las imágenes informativas deben incluir un texto alternativo que explique su función o su contenido esencial. En cambio, una imagen puramente decorativa no necesita repetir información que ya aparece en el texto.

El objetivo no es describir cada píxel, sino transmitir la información que una persona perdería si no pudiera ver la imagen.

## Formularios y ARIA

### Formularios: etiquetas, instrucciones y errores
Cada campo debería tener una etiqueta asociada y comprensible. Los mensajes de error tienen que indicar qué campo necesita atención y cómo corregirlo. No confíes únicamente en el texto de ejemplo dentro del campo, porque desaparece al empezar a escribir.

Cuando un formulario tiene requisitos especiales —por ejemplo, un formato concreto de contraseña o fecha— conviene explicarlos antes de que se produzca el error.

### Usa ARIA solo cuando sea necesario
ARIA puede aportar información adicional a las tecnologías de apoyo, pero no sustituye una estructura HTML correcta. Siempre que exista un elemento HTML nativo capaz de realizar la función, suele ser preferible utilizarlo antes que recrear el comportamiento desde cero.

Los atributos ARIA son especialmente útiles en componentes personalizados, estados dinámicos y regiones que cambian sin recargar la página. Deben revisarse con cuidado porque una etiqueta incorrecta también puede empeorar la experiencia.

## Pruebas y mejora progresiva

### Prueba con herramientas y también de forma manual
Las herramientas automáticas ayudan a detectar problemas de contraste, etiquetas ausentes o errores estructurales, pero no pueden comprobar por sí solas si una interacción resulta comprensible.

Combina varias pruebas:

- navegación completa con teclado;
- revisión del orden de encabezados;
- comprobación de textos alternativos;
- ampliación de la página sin perder contenido;
- revisión de formularios y mensajes de error;
- una herramienta automática como apoyo, no como única validación.

### Una rutina sencilla para mejorar una web existente
No hace falta reconstruir todo el sitio de una vez. Empieza por las páginas más visitadas o por los procesos más importantes, como contacto, compra o registro. Corrige primero los problemas que impiden completar una tarea y después avanza hacia mejoras de legibilidad y comodidad.

La accesibilidad funciona mejor cuando forma parte del proceso habitual de diseño, contenido y desarrollo. Si se revisa desde el principio, las correcciones suelen ser más sencillas que cuando se dejan para el final.
## Orden, foco y ampliación

### Mantén un orden de lectura lógico
El orden visual y el orden del HTML deberían coincidir de forma razonable.

Mover elementos únicamente con CSS puede crear una experiencia donde la vista muestra una secuencia y el teclado recorre otra distinta.

### No elimines el foco sin alternativa
Ocultar el contorno de foco porque “queda feo” deja sin referencia a quien navega con teclado.

Puedes diseñar un estilo propio, pero debe seguir siendo claramente visible sobre distintos fondos.

### Permite ampliar el contenido
Prueba la página con zoom del navegador y comprueba que texto, botones y formularios siguen siendo utilizables.

Evita diseños rígidos que obligan a desplazarse horizontalmente para leer párrafos normales.

## Multimedia y movimiento

### Vídeo y audio
Cuando un contenido audiovisual transmite información importante, ofrece alternativas adecuadas como subtítulos o transcripción según el caso.

Los controles de reproducción también deberían poder utilizarse mediante teclado.

### Evita animaciones problemáticas
Movimientos rápidos, parpadeos o elementos que no pueden detenerse pueden dificultar el uso.

No utilices animación como única forma de comunicar un cambio y ofrece control cuando el movimiento sea persistente.

## Estados, tablas e idioma

### Mensajes de estado
Si una acción muestra “guardado”, “error” o un resultado nuevo sin recargar la página, asegúrate de que el cambio pueda ser percibido por tecnologías de apoyo.

ARIA puede ayudar en estas situaciones, siempre que se implemente con criterio.

### Tablas
Utiliza tablas para datos tabulares, no para maquetar la página. Define encabezados que permitan relacionar cada dato con su fila o columna.

En móvil, prepara una forma de consultar la información sin perder contexto.

### Idioma de la página
Declara el idioma principal en HTML. Si existe una frase extensa en otro idioma, puede ser útil indicarlo también.

Esto ayuda a tecnologías de lectura a utilizar pronunciación adecuada.

## Componentes y estándares

### Prueba componentes reutilizables
Menús, modales, acordeones y formularios aparecen en muchas páginas. Corregir un componente común mejora todo el sitio.

Incluye pruebas de teclado y foco cuando crees o modifiques estos elementos.

### Utiliza WCAG como referencia
Las pautas WCAG ofrecen criterios que ayudan a evaluar contenido perceptible, operable, comprensible y robusto.

No las trates como una simple lista para marcar. Relaciona cada criterio con tareas reales del sitio.

Para entender cómo estas prácticas se relacionan con estructura y buscadores, consulta [accesibilidad y SEO](/accesibilidad-y-seo).

La accesibilidad mejora cuando forma parte del desarrollo cotidiano. Probar con teclado, zoom y contenido real desde el principio evita muchas correcciones costosas al final.
