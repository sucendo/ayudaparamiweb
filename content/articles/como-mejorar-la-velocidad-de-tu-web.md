---
title: "Cómo mejorar la velocidad de tu web"
description: "Cómo diagnosticar una web lenta en 2020 revisando tiempos de respuesta, peso, peticiones, imágenes, CSS, JavaScript y recursos de terceros."
excerpt: "Antes de optimizar una web conviene medirla y localizar el cuello de botella. Esta primera parte ordena el diagnóstico sin aplicar cambios a ciegas."
author: "Sucender"
canonical: "/como-mejorar-la-velocidad-de-tu-web"
category: "tutoriales"
tags: ["Rendimiento web", "Desarrollo web"]
publishedDate: "2020-06-11"
featuredImage: "/img/articulo/como-mejorar-la-velocidad-de-tu-web-featured.svg"
heroClass: "bg-blue"
themeColor: "#47a3da"
robots: "index,follow"
---
Una web lenta rara vez tiene una única causa. Puede tardar el servidor, pueden pesar demasiado las imágenes, puede haber demasiadas peticiones o puede ser el propio navegador el que esté ocupado procesando hojas de estilo y JavaScript.

Por eso, antes de instalar un plugin de caché, cambiar de hosting o comprimir archivos al azar, conviene hacer algo más sencillo: **medir y averiguar dónde se pierde el tiempo**.

Esta es la primera parte de una pequeña serie dedicada a mejorar el rendimiento de una web. En esta entrega vamos a centrarnos en el diagnóstico. Las optimizaciones vendrán después.

## Empieza por una página real

La portada no siempre es la página más importante ni la más pesada.

Si tienes una tienda, prueba una categoría y una ficha de producto. Si tienes un blog, prueba una entrada larga. Si la web recibe contactos, revisa también la página donde está el formulario.

Conviene medir varias plantillas porque cada una puede cargar recursos diferentes.

Haz al menos dos tipos de prueba:

- una primera visita sin caché;
- una segunda visita con recursos ya guardados por el navegador.

Si la segunda carga mejora mucho, la caché está haciendo parte de su trabajo. Si ambas son lentas, probablemente exista un problema más profundo.

## Utiliza más de una herramienta

PageSpeed Insights y Lighthouse son buenos puntos de partida, pero no deberían convertirse en un examen que hay que aprobar con una nota concreta.

También merece la pena abrir las herramientas de desarrollo del navegador y revisar la pestaña **Network**. Ahí puedes ver cada petición, cuánto pesa, cuánto tarda y en qué orden se descarga.

En Chrome DevTools puedes desactivar temporalmente la caché mientras las herramientas están abiertas. Esto ayuda a reproducir la experiencia de una primera visita.

Lo importante es responder preguntas concretas:

- ¿cuánto tarda en empezar a llegar el HTML?;
- ¿qué archivos pesan más?;
- ¿cuántas peticiones se realizan?;
- ¿qué recursos bloquean la visualización?;
- ¿qué scripts tardan más en descargarse o ejecutarse?;
- ¿hay peticiones a servicios externos que retrasan la página?

Una puntuación aislada no responde por sí sola a ninguna de ellas.

## Mira primero el tiempo de respuesta del servidor

Si el navegador tarda demasiado en recibir el primer byte, todavía no hay imagen, CSS o JavaScript que optimizar: el problema está ocurriendo antes.

Un tiempo de respuesta elevado puede venir de:

- alojamiento con pocos recursos;
- consultas lentas a base de datos;
- plugins o módulos que ejecutan demasiado código;
- llamadas externas realizadas desde el servidor;
- páginas generadas de nuevo en cada visita cuando podrían cachearse.

Haz varias mediciones antes de sacar conclusiones. En alojamientos compartidos el resultado puede variar bastante de una prueba a otra.

Si todas las páginas muestran un retraso parecido antes de empezar a descargar contenido, merece la pena investigar esta parte antes que cualquier detalle visual.

## Ordena los recursos por peso

En la pestaña Network puedes ordenar las peticiones por tamaño.

Es habitual encontrar una fotografía de varios megabytes utilizada en un bloque de pocos cientos de píxeles, una fuente con muchos pesos o un archivo JavaScript que se carga en todas las páginas aunque solo se utilice en una.

Haz una lista de los recursos más pesados y anota para qué sirven.

No borres todavía. El objetivo de esta primera fase es distinguir entre:

- recursos necesarios y razonables;
- recursos necesarios pero demasiado pesados;
- recursos que podrían cargarse más tarde;
- recursos que ya no parecen necesarios.

Esta clasificación evita romper funciones por intentar ahorrar unos kilobytes.

## Cuenta peticiones, pero no persigas un número mágico

Cada imagen, hoja de estilo, script, fuente o llamada externa puede generar una petición.

Reducir peticiones sigue siendo útil, especialmente cuando una página carga decenas de archivos pequeños, pero no todas tienen el mismo coste. Con HTTP/2, disponible ya en muchos alojamientos, varias peticiones pueden gestionarse de forma más eficiente que con conexiones HTTP/1.1 tradicionales.

Por eso no merece la pena unir archivos de forma indiscriminada solo para reducir el contador.

Mira el conjunto:

- número de peticiones;
- tamaño transferido;
- tiempo de descarga;
- dependencia entre recursos;
- trabajo que realiza el navegador después de descargarlos.

Una página con 40 peticiones pequeñas puede funcionar mejor que otra con 12 archivos enormes.

## Comprueba si las imágenes son el principal problema

Las imágenes suelen ocupar una parte importante del peso total de una página.

Revisa tres cosas.

### Dimensiones

No cargues una fotografía de 2500 píxeles para mostrarla a 500.

Si el diseño utiliza varios tamaños, genera versiones adecuadas para cada caso en lugar de depender únicamente de CSS para reducirlas visualmente.

### Compresión

JPEG sigue siendo una opción razonable para fotografías y PNG para gráficos que necesitan transparencia o una reproducción muy limpia.

WebP puede reducir bastante el peso en muchos casos y ya tiene buen soporte en varios navegadores, pero no conviene depender de un único formato sin comprobar compatibilidad. En una optimización real, el ahorro debe ir acompañado de una alternativa cuando sea necesaria.

### Imágenes fuera de pantalla

Una página larga no necesita descargar con la misma prioridad todas las imágenes que están varios desplazamientos por debajo.

La carga diferida puede ayudar, pero en esta primera fase simplemente identifica cuántas imágenes se cargan sin ser visibles al entrar.

## Revisa CSS y JavaScript por separado

Una hoja CSS pesada y un JavaScript pesado producen problemas distintos.

El CSS necesario para dibujar la página puede retrasar la visualización si está fragmentado o contiene mucho código que no se utiliza.

JavaScript, además de descargarse, debe analizarse y ejecutarse. Un archivo relativamente pequeño puede causar más trabajo que una imagen mayor.

En DevTools fíjate en:

- scripts cargados desde terceros;
- librerías completas utilizadas para una función pequeña;
- plugins que añaden sus archivos en todas las páginas;
- scripts situados en el encabezado que podrían no ser necesarios al inicio;
- errores de consola que provoquen trabajo adicional.

No cambies todavía el orden de carga si no conoces las dependencias. Un script puede necesitar que otro se haya ejecutado antes.

## No olvides las fuentes web

Las tipografías también son recursos.

Una familia con regular, medium, semibold, bold, italic y varias variantes puede generar muchas descargas.

Comprueba cuántos archivos de fuente se solicitan realmente y si todos se usan.

También observa qué ocurre mientras llegan. Si el texto permanece invisible demasiado tiempo, el usuario percibirá la página como lenta aunque el resto de elementos ya esté disponible.

## Vigila los servicios de terceros

Analítica, publicidad, chats, vídeos incrustados, mapas, redes sociales y herramientas de seguimiento añaden recursos que no siempre controlas.

Haz una prueba sencilla: identifica cuáles pertenecen a tu dominio y cuáles proceden de terceros.

Después pregunta por cada integración:

- ¿es imprescindible en todas las páginas?;
- ¿puede cargarse solo cuando se necesita?;
- ¿sigue utilizándose?;
- ¿su coste de rendimiento está justificado?

No se trata de eliminar Analytics o cualquier servicio útil. Se trata de saber cuánto cuestan antes de seguir añadiendo más.

## Las nuevas Web Vitals sirven como referencia, no como único objetivo

Google presentó en mayo de este año la iniciativa **Web Vitals**, con la intención de simplificar algunas métricas relacionadas con la experiencia de usuario.

Entre las métricas principales aparecen LCP para la carga del contenido principal, FID para la respuesta a la primera interacción y CLS para la estabilidad visual.

Son una referencia interesante, especialmente porque obligan a mirar aspectos que una simple medición de tiempo total no explica.

Aun así, no conviene reducir toda la optimización a tres cifras. Si un formulario no funciona, una imagen aparece tarde o el servidor responde de forma irregular, el usuario seguirá teniendo un problema aunque una herramienta muestre una buena puntuación.

## Crea una pequeña ficha de diagnóstico

Antes de empezar a optimizar, guarda los datos.

Puedes utilizar una tabla sencilla:

| Dato | Resultado |
| --- | --- |
| URL probada | |
| Fecha de prueba | |
| Primera carga | |
| Segunda carga | |
| Peso total aproximado | |
| Número de peticiones | |
| Recurso más pesado | |
| Tiempo de respuesta del servidor | |
| Scripts de terceros detectados | |
| Problema principal sospechado | |

No necesitas precisión de laboratorio. Necesitas una referencia para comparar después.

## Decide por dónde empezar

Al terminar esta revisión deberías poder colocar el problema principal en uno de estos grupos:

- servidor;
- imágenes;
- CSS;
- JavaScript;
- fuentes;
- terceros;
- caché;
- una combinación de varios.

Ese diagnóstico determina el siguiente paso.

Si el peso está concentrado en imágenes y recursos de la parte visible, no tiene sentido empezar migrando el servidor. Si el HTML tarda varios segundos en llegar, comprimir un icono tampoco resolverá el problema.

La regla más útil es sencilla: **mide, cambia una cosa y vuelve a medir**.

En la siguiente parte vamos a trabajar sobre los recursos que descarga el navegador: imágenes, CSS y JavaScript.

**Siguiente tutorial de la serie:** [Cómo optimizar imágenes, CSS y JavaScript para acelerar una web](/optimizar-imagenes-css-javascript-web).
