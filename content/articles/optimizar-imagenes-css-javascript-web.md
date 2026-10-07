---
title: "Cómo optimizar imágenes, CSS y JavaScript para acelerar una web"
description: "Tutorial de 2020 para reducir el peso del front-end optimizando imágenes, CSS, JavaScript, fuentes y carga diferida sin romper compatibilidad."
excerpt: "Después de medir una web lenta, el siguiente paso es reducir y ordenar los recursos que descarga el navegador."
author: "Sucender"
canonical: "/optimizar-imagenes-css-javascript-web"
category: "tutoriales"
tags: ["Rendimiento web", "Desarrollo web", "Imágenes", "JavaScript"]
publishedDate: "2020-07-09"
featuredImage: "/img/articulo/optimizar-imagenes-css-javascript-web-featured.svg"
heroClass: "bg-orange"
themeColor: "#ee9e2d"
robots: "index,follow"
---
En la [primera parte de esta serie](/como-mejorar-la-velocidad-de-tu-web) vimos cómo medir una web y separar un problema de servidor de uno provocado por los recursos que descarga el navegador.

Ahora vamos a actuar sobre esa segunda parte: **imágenes, CSS, JavaScript y fuentes**.

La idea no es aplicar todas las técnicas posibles, sino reducir aquello que realmente está retrasando la página y comprobar después si el cambio ha servido.

## Empieza por los recursos que más pesan

Abre la pestaña Network de las herramientas de desarrollo y ordena las peticiones por tamaño.

Normalmente las imágenes aparecerán arriba. Después pueden aparecer fuentes, hojas de estilo, JavaScript o vídeos.

No empieces por un icono de 3 KB si tienes una fotografía de 2 MB.

Crea una lista con los cinco o diez recursos más pesados y trabaja primero sobre ellos. Este método es menos llamativo que instalar una herramienta automática, pero suele encontrar las mejoras más fáciles.

## Ajusta las imágenes al tamaño en el que se muestran

Una fotografía de 2400 píxeles no debería descargarse completa si el diseño nunca la muestra a más de 600.

Antes de subir una imagen pregúntate:

- ¿cuál es el tamaño máximo real en la plantilla?;
- ¿se utiliza también en móvil?;
- ¿necesita transparencia?;
- ¿es una fotografía o un gráfico?;
- ¿la calidad actual es mayor de la que se aprecia en pantalla?

Reducir las dimensiones antes de comprimir suele dar un ahorro mayor que cambiar únicamente la calidad.

Para imágenes que se muestran a distintos tamaños puedes utilizar srcset y dejar que el navegador escoja una versión adecuada.

Por ejemplo:

```html
<img
  src="/img/foto-800.jpg"
  srcset="/img/foto-400.jpg 400w,
          /img/foto-800.jpg 800w,
          /img/foto-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Ejemplo de imagen adaptable">
```

Esto evita enviar siempre la versión más grande.

## Elige el formato con criterio

JPEG sigue siendo una opción práctica para fotografías. PNG resulta útil cuando necesitas transparencia o imágenes con texto y bordes muy definidos.

WebP merece una prueba porque puede ofrecer archivos más pequeños manteniendo una calidad similar.

En julio de 2020 su compatibilidad es buena en Chrome, Firefox y Edge. Apple ha anunciado soporte para WebP en Safari 14, pero esa versión todavía no está extendida entre los usuarios, así que no conviene servir WebP como única opción.

El elemento picture permite ofrecer una alternativa:

```html
<picture>
  <source srcset="/img/foto.webp" type="image/webp">
  <img src="/img/foto.jpg" alt="Ejemplo de fotografía">
</picture>
```

Un navegador compatible utilizará WebP. El resto podrá cargar el JPEG.

No conviertas todo el archivo de imágenes de una web sin comprobar antes qué ahorro obtienes y cómo se ve el resultado.

## Comprime antes de subir

Una buena rutina consiste en guardar la imagen original fuera de la web y subir una copia ya preparada.

Para cada imagen:

1. recorta lo que no sea necesario;
2. cambia las dimensiones;
3. aplica una compresión razonable;
4. compara visualmente;
5. revisa el peso final.

Una miniatura no necesita la misma calidad que una fotografía de producto ampliable.

Evita también recomprimir una y otra vez el mismo JPEG. Es mejor volver al original y generar una nueva versión.

## Retrasa las imágenes que todavía no se ven

Si una página contiene veinte imágenes y solo dos aparecen en el primer bloque, cargar las veinte al principio consume ancho de banda que el usuario todavía no necesita.

La carga diferida o lazy loading permite posponer parte de ese trabajo.

Los navegadores están empezando a incorporar soporte nativo mediante el atributo loading:

```html
<img
  src="/img/ejemplo.jpg"
  loading="lazy"
  width="800"
  height="500"
  alt="Imagen situada más abajo en la página">
```

Utilízalo en imágenes situadas fuera de la primera pantalla y prueba siempre el resultado en los navegadores que utilice tu público.

No apliques carga diferida a la imagen principal que el usuario espera ver nada más abrir la página. Retrasarla puede producir justo el efecto contrario.

Si necesitas una solución compatible con más navegadores, todavía puede ser necesario utilizar JavaScript o una librería específica.

## Declara dimensiones para evitar saltos

Cuando el navegador no conoce el espacio que ocupará una imagen, el texto y otros elementos pueden moverse al terminar de cargarla.

Indicar width y height ayuda al navegador a reservar espacio.

```html
<img
  src="/img/producto.jpg"
  width="640"
  height="480"
  alt="Producto">
```

Además de mejorar la sensación de estabilidad, esta práctica facilita que el diseño se comporte de forma más previsible mientras llegan los recursos.

## Revisa cuántas hojas CSS cargas

Una web puede acumular hojas de estilo del tema, plugins, librerías, widgets y modificaciones antiguas.

Abre Network y filtra por CSS.

Pregúntate:

- ¿todas se utilizan?;
- ¿algún plugin carga su CSS en páginas donde no aparece?;
- ¿hay dos librerías haciendo lo mismo?;
- ¿quedan estilos de componentes eliminados?;
- ¿se descargan fuentes o iconos completos para usar solo unos pocos?

No hace falta obsesionarse con reunir todo en un único archivo. Con HTTP/2 esa estrategia ya no es tan necesaria como hace unos años.

Lo importante es no descargar CSS que no aporta nada.

## Minifica, pero después de limpiar

Minificar elimina espacios, comentarios y caracteres innecesarios.

Puede reducir el tamaño de CSS y JavaScript, pero no soluciona un archivo que contiene cientos de reglas o funciones que nunca se usan.

El orden lógico es:

1. eliminar código innecesario;
2. separar lo que solo pertenece a páginas concretas;
3. minificar;
4. medir de nuevo.

Guarda siempre una versión fuente legible. Trabajar directamente sobre un archivo minificado complica mucho el mantenimiento.

## No cargues JavaScript donde no hace falta

Un formulario avanzado puede necesitar una librería. Eso no significa que la portada, el aviso legal y todos los artículos deban descargarla.

Revisa qué scripts se cargan en cada plantilla.

Especialmente en gestores de contenido, plugins y módulos pueden añadir JavaScript global aunque su función solo aparezca en una página.

Eliminar una petición innecesaria ayuda, pero reducir JavaScript también disminuye el trabajo que tiene que hacer el navegador después de descargarlo.

## Utiliza defer y async cuando corresponda

Los scripts tradicionales colocados en el head pueden detener el análisis del HTML mientras se descargan y ejecutan.

Para scripts que no necesiten ejecutarse inmediatamente puedes valorar defer:

```html
<script src="/js/menu.js" defer></script>
```

Con defer, el navegador puede seguir procesando el documento y ejecutar el script cuando el HTML ya ha sido analizado.

async tiene un comportamiento distinto:

```html
<script src="https://ejemplo.com/estadisticas.js" async></script>
```

Puede ser apropiado para scripts independientes que no dependen del orden de otros archivos.

No cambies todos los scripts a async o defer de golpe. Si existen dependencias entre ellos puedes provocar errores difíciles de detectar.

## Evita bibliotecas grandes para funciones pequeñas

Antes de incluir una librería completa para una animación, un selector o una pequeña interacción, revisa el coste que añade.

Eso no significa que haya que reescribir todo con JavaScript puro.

Una biblioteca bien utilizada puede ahorrar tiempo y errores. El problema aparece cuando el proyecto va acumulando varias dependencias que resuelven funciones parecidas.

Si encuentras una librería grande:

- comprueba cuántas páginas la utilizan;
- revisa si ya existe otra dependencia equivalente;
- valora cargarla solo donde sea necesaria;
- evita sustituirla sin probar todas sus funciones.

## Controla los scripts de terceros

Los recursos de terceros son especialmente delicados porque no controlas su servidor ni siempre su contenido.

Entre ellos pueden estar:

- analítica;
- publicidad;
- chat;
- mapas;
- botones sociales;
- reproductores de vídeo;
- herramientas de seguimiento.

No todos deben eliminarse.

La pregunta útil es si tienen que cargarse al principio y en todas las páginas.

Un mapa, por ejemplo, puede cargarse al interactuar con un botón o cuando el usuario se acerque a la zona donde aparece, en lugar de competir con el contenido inicial.

## Reduce variantes de fuentes

Las fuentes web pueden pasar desapercibidas porque cada archivo parece pequeño por separado.

Pero una familia con muchos pesos y estilos puede acabar añadiendo bastante peso.

Utiliza solo las variantes que aparecen realmente en el diseño.

Si la web usa regular y bold, cargar también light, medium, semibold y tres cursivas no aporta nada.

font-display: swap puede evitar que el texto permanezca invisible durante demasiado tiempo mientras llega la fuente:

```css
@font-face {
  font-family: "MiFuente";
  src: url("/fonts/mifuente.woff2") format("woff2");
  font-display: swap;
}
```

Comprueba el cambio visual cuando se sustituye la fuente de sistema por la definitiva.

## Haz una medición después de cada grupo de cambios

No optimices imágenes, CSS, JavaScript, fuentes y servidor a la vez.

Si todo cambia al mismo tiempo y algo falla, será difícil saber qué lo ha provocado.

Una secuencia razonable puede ser:

1. optimizar las imágenes más pesadas;
2. medir;
3. retirar CSS y JavaScript innecesarios;
4. medir;
5. ajustar orden de carga;
6. medir;
7. revisar fuentes y terceros;
8. medir de nuevo.

Guarda los resultados junto a los de la primera parte.

No hace falta conseguir una puntuación perfecta. El objetivo es que una página real cargue antes y necesite menos recursos para ser útil.

En la última parte de esta serie nos moveremos al otro lado: caché, compresión y servidor.

**Siguiente tutorial de la serie:** [Cómo configurar caché, compresión y servidor para acelerar una web](/cache-compresion-servidor-web).
