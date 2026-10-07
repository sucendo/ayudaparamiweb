---
title: "Cómo mejorar la velocidad de tu web"
description: "Cómo diagnosticar una web lenta en 2020 revisando tiempos de respuesta, peso, peticiones, imágenes, CSS, JavaScript y recursos de terceros."
excerpt: "Antes de optimizar una web conviene medirla y localizar el cuello de botella. Esta primera parte ordena el diagnóstico sin aplicar cambios a ciegas."
author: "Sucender"
canonical: "/como-mejorar-la-velocidad-de-tu-web"
category: "tutoriales"
tags: ["Rendimiento web", "Desarrollo web", "Velocidad web"]
publishedDate: "2020-06-11"
featuredImage: "/img/articulo/como-mejorar-la-velocidad-de-tu-web-featured.svg"
heroClass: "bg-blue"
themeColor: "#47a3da"
robots: "index,follow"
---
Una web lenta rara vez tiene una única causa. Puede tardar el servidor, pueden pesar demasiado las imágenes, puede haber demasiadas peticiones o puede ser el propio navegador el que esté ocupado procesando hojas de estilo y JavaScript.

Por eso, antes de instalar un plugin de caché, cambiar de hosting o comprimir archivos al azar, conviene hacer algo más sencillo: **medir y averiguar dónde se pierde el tiempo**.

Esta es la primera parte de una pequeña serie dedicada a mejorar el rendimiento de una web. En esta entrega vamos a centrarnos en el diagnóstico. Las optimizaciones vendrán después.

## Mide antes de optimizar

### Empieza por una página real

La portada no siempre es la página más importante ni la más pesada.

Si tienes una tienda, prueba una categoría y una ficha de producto. Si tienes un blog, prueba una entrada larga. Si la web recibe contactos, revisa también la página donde está el formulario.

Conviene medir varias plantillas porque cada una puede cargar recursos diferentes.

### Compara una primera visita y una repetida

Haz al menos dos tipos de prueba:

- una primera visita sin caché;
- una segunda visita con recursos ya guardados por el navegador.

Si la segunda carga mejora mucho, la caché está haciendo parte de su trabajo. Si ambas son lentas, probablemente exista un problema más profundo.

### Utiliza más de una herramienta

PageSpeed Insights y Lighthouse son buenos puntos de partida, pero no deberían convertirse en un examen que hay que aprobar con una nota concreta.

También merece la pena abrir las herramientas de desarrollo del navegador y revisar la pestaña **Network**. Ahí puedes ver cada petición, cuánto pesa, cuánto tarda y en qué orden se descarga.

En Chrome DevTools puedes desactivar temporalmente la caché mientras las herramientas están abiertas. Esto ayuda a reproducir la experiencia de una primera visita.

### Haz preguntas concretas a los datos

Lo importante es responder preguntas como estas:

- ¿cuánto tarda en empezar a llegar el HTML?;
- ¿qué archivos pesan más?;
- ¿cuántas peticiones se realizan?;
- ¿qué recursos bloquean la visualización?;
- ¿qué scripts tardan más en descargarse o ejecutarse?;
- ¿hay peticiones a servicios externos que retrasan la página?

Una puntuación aislada no responde por sí sola a ninguna de ellas.

## Revisa servidor y red

### Mira primero el tiempo de respuesta

Si el navegador tarda demasiado en recibir el primer byte, todavía no hay imagen, CSS o JavaScript que optimizar: el problema está ocurriendo antes.

Un tiempo de respuesta elevado puede venir de:

- alojamiento con pocos recursos;
- consultas lentas a base de datos;
- plugins o módulos que ejecutan demasiado código;
- llamadas externas realizadas desde el servidor;
- páginas generadas de nuevo en cada visita cuando podrían cachearse.

Haz varias mediciones antes de sacar conclusiones. En alojamientos compartidos el resultado puede variar bastante de una prueba a otra.

### Distingue servidor lento de página pesada

Si todas las páginas muestran un retraso parecido antes de empezar a descargar contenido, merece la pena investigar el servidor.

Si el HTML empieza a llegar rápido, pero la página tarda mucho en terminar, probablemente el cuello de botella esté en los recursos.

Esa diferencia evita perder tiempo optimizando la parte equivocada.

### Cuenta peticiones sin perseguir un número mágico

Cada imagen, hoja de estilo, script, fuente o llamada externa puede generar una petición.

Reducir peticiones sigue siendo útil, especialmente cuando una página carga decenas de archivos pequeños, pero no todas tienen el mismo coste.

Con HTTP/2, disponible ya en muchos alojamientos, varias peticiones pueden gestionarse de forma más eficiente que con conexiones HTTP/1.1 tradicionales.

Por eso no merece la pena unir archivos de forma indiscriminada solo para reducir el contador.

### Ordena los recursos por peso

En la pestaña Network puedes ordenar las peticiones por tamaño.

Es habitual encontrar una fotografía de varios megabytes utilizada en un bloque de pocos cientos de píxeles, una fuente con muchos pesos o un archivo JavaScript que se carga en todas las páginas aunque solo se utilice en una.

Haz una lista de los recursos más pesados y anota para qué sirven.

## Analiza imágenes y fuentes

### Comprueba las dimensiones reales

No cargues una fotografía de 2500 píxeles para mostrarla a 500.

Si el diseño utiliza varios tamaños, genera versiones adecuadas para cada caso en lugar de depender únicamente de CSS para reducirlas visualmente.

### Revisa formato y compresión

JPEG sigue siendo una opción razonable para fotografías y PNG para gráficos que necesitan transparencia o una reproducción muy limpia.

WebP puede reducir bastante el peso en muchos casos y ya tiene buen soporte en varios navegadores, pero todavía conviene comprobar compatibilidad antes de utilizarlo como única versión.

No mires solo el tamaño del archivo. Comprueba también si la pérdida de calidad es visible.

### Detecta imágenes que se cargan fuera de pantalla

Una página larga no necesita descargar con la misma prioridad todas las imágenes que están varios desplazamientos por debajo.

La carga diferida puede ayudar, pero en esta primera fase simplemente identifica cuántas imágenes se cargan sin ser visibles al entrar.

### Revisa las fuentes web

Las tipografías también son recursos.

Una familia con regular, medium, semibold, bold, italic y varias variantes puede generar muchas descargas.

Comprueba cuántos archivos de fuente se solicitan realmente y si todos se usan.

También observa qué ocurre mientras llegan. Si el texto permanece invisible demasiado tiempo, el usuario percibirá la página como lenta aunque el resto de elementos ya esté disponible.

## Revisa CSS, JavaScript y terceros

### Separa el coste del CSS

El CSS necesario para dibujar la página puede retrasar la visualización si está fragmentado o contiene mucho código que no se utiliza.

Busca hojas añadidas por plugins, temas o componentes que aparezcan incluso en páginas donde no hacen falta.

### Separa el coste del JavaScript

JavaScript no solo se descarga: también debe analizarse y ejecutarse.

Un archivo relativamente pequeño puede causar más trabajo que una imagen mayor.

En DevTools fíjate en scripts que se cargan desde terceros, bibliotecas completas utilizadas para una función pequeña y plugins que añaden sus archivos en todas las páginas.

### No cambies el orden sin conocer dependencias

Un script puede necesitar que otro se haya ejecutado antes.

Por eso, aunque detectes JavaScript que bloquea, no cambies todo de posición de una sola vez.

Haz pequeñas pruebas y comprueba que menús, formularios, sliders y otros componentes continúan funcionando.

### Vigila los servicios de terceros

Analítica, publicidad, chats, vídeos incrustados, mapas, redes sociales y herramientas de seguimiento añaden recursos que no siempre controlas.

Pregunta por cada integración:

- ¿es imprescindible en todas las páginas?;
- ¿puede cargarse solo cuando se necesita?;
- ¿sigue utilizándose?;
- ¿su coste de rendimiento está justificado?

No se trata de eliminar cualquier servicio externo. Se trata de saber cuánto cuesta antes de seguir añadiendo más.

## Usa las nuevas Web Vitals como una referencia más

### Qué acaba de presentar Google

Google presentó en mayo de este año la iniciativa **Web Vitals**, con la intención de simplificar algunas métricas relacionadas con la experiencia de usuario.

Entre las métricas principales aparecen LCP para la carga del contenido principal, FID para la respuesta a la primera interacción y CLS para la estabilidad visual.

### No reduzcas el diagnóstico a tres cifras

Las métricas son una referencia interesante porque obligan a mirar aspectos que una simple medición de tiempo total no explica.

Aun así, si un formulario no funciona, una imagen aparece tarde o el servidor responde de forma irregular, el usuario seguirá teniendo un problema aunque una herramienta muestre una buena puntuación.

## Cierra el diagnóstico antes de hacer cambios

### Crea una pequeña ficha

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

### Agrupa el problema principal

Al terminar esta revisión deberías poder colocar el cuello de botella principal en uno de estos grupos:

- servidor;
- imágenes;
- CSS;
- JavaScript;
- fuentes;
- terceros;
- caché;
- una combinación de varios.

### Decide por dónde empezar

Si el peso está concentrado en imágenes y recursos de la parte visible, no tiene sentido empezar migrando el servidor.

Si el HTML tarda varios segundos en llegar, comprimir un icono tampoco resolverá el problema.

La regla más útil es sencilla: **mide, cambia una cosa y vuelve a medir**.

En la siguiente parte vamos a trabajar sobre los recursos que descarga el navegador: imágenes, CSS y JavaScript.

**Siguiente tutorial de la serie:** [Cómo optimizar imágenes, CSS y JavaScript para acelerar una web](/optimizar-imagenes-css-javascript-web).
