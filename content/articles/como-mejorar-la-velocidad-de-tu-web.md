---
title: "Cómo mejorar la velocidad de tu web"
description: "Cómo mejorar la velocidad de una web en 2020 revisando servidor, imágenes, CSS, JavaScript, caché, fuentes, terceros y páginas representativas."
excerpt: "Mide primero, identifica el cuello de botella y optimiza servidor y recursos sin sacrificar funciones necesarias."
author: "Sucender"
canonical: "/como-mejorar-la-velocidad-de-tu-web"
category: "tutoriales"
tags: ["Rendimiento web", "Desarrollo web", "Optimización"]
publishedDate: "2020-06-11"
featuredImage: "/img/articulo/como-mejorar-la-velocidad-de-tu-web-featured.svg"
heroClass: "bg-blue"
themeColor: "#47a3da"
robots: "index,follow"
---
Una web rápida no depende de un único ajuste. El tiempo de carga es el resultado del servidor, el peso de los recursos, el código que ejecuta el navegador y el orden en que se solicita cada elemento. Por eso conviene medir antes de empezar a instalar soluciones.

## Medición inicial

### Mide una página representativa
Prueba la portada y, sobre todo, las páginas que realmente utilizan los clientes: categorías, productos, artículos o formularios. Haz varias mediciones porque una sola prueba puede verse afectada por la red o la caché.

Observa qué recursos pesan más y cuáles bloquean la visualización inicial.

## Imágenes y servidor

### Optimiza imágenes
Las imágenes suelen representar una parte importante del peso total. Ajusta sus dimensiones al tamaño real de visualización y comprímelas antes de subirlas.

Evita cargar una fotografía enorme para mostrarla como una miniatura. También es útil diferir la carga de imágenes que están muy por debajo del primer bloque visible.

### Revisa el servidor
Si el HTML tarda demasiado en empezar a llegar, el navegador no puede compensarlo. Revisa alojamiento, consultas lentas, extensiones innecesarias y procesos que se ejecutan en cada petición.

La caché del servidor puede reducir mucho el trabajo repetitivo cuando el contenido no cambia en cada visita.

## CSS, JavaScript y caché

### Reduce CSS y JavaScript innecesarios
Cada archivo adicional necesita descargarse y procesarse. Elimina librerías que ya no se utilizan y evita cargar scripts en páginas donde no hacen falta.

Minificar puede ayudar, pero antes de comprimir un archivo enorme conviene preguntarse si realmente debe existir.

### Aprovecha la caché del navegador
Los recursos estáticos como imágenes, hojas de estilo y scripts pueden guardarse durante un tiempo para no descargarse en cada visita. Configura cabeceras adecuadas y utiliza nombres versionados cuando necesites forzar una actualización.

## Prioridad y terceros

### Carga primero lo importante
El contenido inicial debería aparecer sin esperar a widgets secundarios, mapas, vídeos o herramientas externas. Retrasa lo que no sea imprescindible para que la página sea utilizable cuanto antes.

### Vigila servicios de terceros
Analítica, chat, publicidad, fuentes y otros servicios pueden añadir peticiones y JavaScript. Revisa periódicamente si cada integración sigue aportando suficiente valor para justificar su coste de rendimiento.

### Optimiza de forma progresiva
Haz un cambio, mide de nuevo y registra el resultado. Así sabrás qué optimizaciones tienen impacto real y podrás evitar combinaciones difíciles de mantener.

La velocidad mejora más con una web sencilla y disciplinada que acumulando plugins de optimización sobre una base demasiado pesada.
## Caché e imágenes reales

### Comprueba la primera visita y las siguientes
La caché puede hacer que una segunda carga parezca mucho más rápida. Prueba también una visita sin recursos guardados para conocer la experiencia de alguien que llega por primera vez.

Después compara con una visita repetida. Si la diferencia es mínima, quizá los recursos estáticos no estén aprovechando bien la caché del navegador.

### Ajusta el tamaño real de las imágenes
No basta con comprimir. Una fotografía de 2000 píxeles sigue siendo excesiva si se muestra a 400. Genera tamaños acordes con las plantillas y evita descargar el original para reducirlo únicamente con CSS.

En imágenes fotográficas puedes utilizar una compresión mayor que en capturas con texto. Comprueba siempre el resultado visual antes de sustituir los archivos.

## Carga diferida y fuentes

### Carga diferida para contenido fuera de pantalla
Imágenes y recursos situados muy por debajo del primer bloque no necesitan competir con el contenido inicial. Puedes retrasar su carga hasta que el usuario se acerque a ellos.

Prueba el comportamiento en navegadores y dispositivos que utilice tu público. Una optimización no debe dejar espacios vacíos o impedir que se cargue una imagen al desplazarse.

### Revisa las fuentes web
Cada familia y cada peso puede implicar otra descarga. Si utilizas regular, semibold, bold, italic y varias familias, el coste puede crecer rápidamente.

Limita las variantes a las que realmente aparecen en el diseño y define fuentes de respaldo para que el texto siga siendo legible mientras se descarga la tipografía principal.

## Dependencias y orden de carga

### Evita cargar bibliotecas completas para una función pequeña
Un carrusel, un efecto o un selector pueden introducir una biblioteca grande en todas las páginas. Revisa si esa dependencia sigue siendo necesaria.

No cambies una librería solo por ahorrar unos kilobytes sin probar compatibilidad. Prioriza recursos que realmente tengan peso o tiempo de ejecución significativo.

### Cuida el orden de CSS y JavaScript
El navegador necesita determinados estilos para dibujar la parte inicial. Scripts que no intervienen en ese momento pueden cargarse de forma que no bloqueen el renderizado.

Haz los cambios gradualmente: alterar el orden de scripts puede romper funcionalidades que dependen unas de otras.

## Hosting, medición y cambios

### Hosting compartido y recursos disponibles
En un alojamiento compartido, otros procesos del servidor pueden influir en los tiempos. Si el rendimiento varía mucho entre mediciones sin cambios en la web, revisa recursos y límites del plan.

Antes de migrar, comprueba que la aplicación está razonablemente optimizada. Un servidor más potente puede ocultar temporalmente un problema de código o base de datos.

### Mide páginas reales
No optimices solo una página de prueba. Revisa una entrada larga, una categoría, una ficha de producto o un formulario si forman parte del sitio.

Cada plantilla puede cargar recursos distintos. Una portada rápida no garantiza que el proceso de compra tenga el mismo rendimiento.

### Registra cada cambio
Anota fecha, página probada y resultado aproximado. Si después aparece un problema, podrás relacionarlo con una modificación concreta.

Este hábito es especialmente útil cuando intervienen plugins, caché o servicios externos, porque varias optimizaciones simultáneas pueden ser difíciles de deshacer.

### No sacrifiques claridad por unos milisegundos
El rendimiento sirve para que la web sea más fácil de usar. No elimines imágenes informativas, confirmaciones o funciones necesarias solo para reducir una puntuación.

Puedes relacionar estas mejoras con [responsive design: buenas prácticas](/responsive-design-buenas-practicas), ya que tamaño de pantalla y forma de cargar recursos deben trabajar juntos.

La optimización más mantenible consiste en medir, simplificar y volver a medir. Una página con pocos recursos bien elegidos suele necesitar menos trucos para seguir siendo rápida.
