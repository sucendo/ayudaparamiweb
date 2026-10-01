---
title: "Código para añadir Google Translate a tu blog"
description: "Cómo añadir accesos de traducción con Google Translate a un blog mediante enlaces por idioma, banderas, URL actual y unas comprobaciones básicas."
excerpt: "Un ejemplo sencillo para ofrecer traducción automática desde tu blog sin crear una versión independiente para cada idioma."
author: "Sucender"
canonical: "/codigo-traductor-google-blog"
category: "tutoriales"
tags: ["Desarrollo web", "Google", "Tutorial"]
publishedDate: "2018-02-21"
featuredImage: "/img/articulo/codigo-traductor-google-blog-featured.svg"
heroClass: "bg-blue"
themeColor: "#47a3da"
robots: "index,follow"
---
Si tu blog recibe visitas de varios países, añadir un traductor visible puede ayudarte a mejorar la experiencia del usuario en segundos.

En este artículo te dejo un ejemplo sencillo para colocar un selector de idiomas con banderas que abre Google Translate con la URL actual de tu página.

Es una solución rápida y fácil de mantener, ideal para blogs personales o webs pequeñas que todavía no tienen una estrategia de internacionalización completa.

## ¿Cómo funciona este método?

La idea es crear varios enlaces, uno por idioma. Cada enlace ejecuta `window.open()` con una URL de Google Translate que incluye:

`u`: la dirección de la página que se está visitando.

`langpair`: combinación idioma automático a idioma destino (por ejemplo, `auto|en` para inglés).

Así, cuando el usuario pulsa una bandera, se abre la versión traducida sin tocar tu estructura de contenidos original.

## Cuándo usarlo (y cuándo no)

Este enfoque es útil cuando necesitas una mejora rápida para visitantes internacionales.

Si tu proyecto depende mucho del SEO internacional, de la precisión legal o de conversiones por país, te conviene crear contenidos nativos por idioma en lugar de depender solo de traducción automática.

Como punto de partida, sin embargo, este widget sigue siendo práctico y fácil de implementar.

## La estructura HTML

A continuación tienes el bloque completo. Incluye estilos básicos para los iconos y los enlaces de idioma listos para copiar y adaptar a tu web.

<pre class="line-numbers" data-start="0"><code class="language-html">&lt;style&gt;
.google_translate img {
filter:alpha(opacity=100);
-moz-opacity: 1.0;
opacity: 1.0;
border:0;
}

.google_translate:hover img {
filter:alpha(opacity=30);
-moz-opacity: 0.30;
opacity: 0.30;
border:0;
}

.google_translatextra:hover img {
filter:alpha(opacity=0.30);
-moz-opacity: 0.30;
opacity: 0.30;
border:0;
}
&lt;/style&gt;

&lt;div&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="English" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Cen&hl=en'); return false;"&gt;&lt;img alt="English" border="0" align="absbottom" title="English" height="24" src="http://4.bp.blogspot.com/_5jbh95HruKA/S1YVBORD9bI/AAAAAAAAACs/XkaLmmin4zg/s200/United+Kingdom(Great+Britain).png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="French" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Cfr&hl=en'); return false;"&gt;&lt;img alt="French" border="0" align="absbottom" title="French" height="24" src="http://4.bp.blogspot.com/_5jbh95HruKA/S1YVBrDZLrI/AAAAAAAAAC0/Kc6eDMT9LFI/s200/France.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="German" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Cde&hl=en'); return false;"&gt;&lt;img alt="German" border="0" align="absbottom" title="German" height="24" src="http://1.bp.blogspot.com/_5jbh95HruKA/S1YVBzoFF2I/AAAAAAAAAC8/WgvMK3zP1Rk/s200/Germany.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="Spain" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Ces&hl=en'); return false;"&gt;&lt;img alt="Spain" border="0" align="absbottom" title="Spain" height="24" src="http://3.bp.blogspot.com/_5jbh95HruKA/S1YVCdHp5VI/AAAAAAAAADE/lWHzr5znExU/s200/Spain.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="Italian" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Cit&hl=en'); return false;"&gt;&lt;img alt="Italian" border="0" align="absbottom" title="Italian" height="24" src="http://4.bp.blogspot.com/_5jbh95HruKA/S1YVCskNubI/AAAAAAAAADM/ChdHC6vYT4s/s200/Italy.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="Dutch" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Cnl&hl=en'); return false;"&gt;&lt;img alt="Dutch" border="0" align="absbottom" title="Dutch" height="24" src="http://3.bp.blogspot.com/_5jbh95HruKA/S1YWRkFo9UI/AAAAAAAAADU/4AzKfc6Oyxg/s200/Netherlands.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="Russian" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Cru&hl=en'); return false;"&gt;&lt;img alt="Russian" border="0" align="absbottom" title="Russian" height="24" src="http://4.bp.blogspot.com/_5jbh95HruKA/S1YWR-jg9pI/AAAAAAAAADc/vYZrPOzazHU/s200/Russian+Federation.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="Portuguese" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Cpt&hl=en'); return false;"&gt;&lt;img alt="Portuguese" border="0" align="absbottom" title="Portuguese" height="24" src="http://1.bp.blogspot.com/_5jbh95HruKA/S1YWSGHcxOI/AAAAAAAAADk/ElHZBjDCZn8/s200/Brazil.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="Japanese" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Cja&hl=en'); return false;"&gt;&lt;img alt="Japanese" border="0" align="absbottom" title="Japanese" height="24" src="http://1.bp.blogspot.com/_5jbh95HruKA/S1YWSR2_wYI/AAAAAAAAADs/GtKdPLKUluE/s200/Japan.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="Korean" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Cko&hl=en'); return false;"&gt;&lt;img alt="Korean" border="0" align="absbottom" title="Korean" height="24" src="http://2.bp.blogspot.com/_5jbh95HruKA/S1YWSrlfMyI/AAAAAAAAAD0/_MACsRIW8wg/s200/South+Korea.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="Arabic" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Car&hl=en'); return false;"&gt;&lt;img alt="Arabic" border="0" align="absbottom" title="Arabic" height="24" src="http://3.bp.blogspot.com/_5jbh95HruKA/S1YWq7SrDkI/AAAAAAAAAD8/ZE8A1isEZrw/s200/Saudi+Arabia.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt;
&lt;a class="google_translate" href="#" target="_blank" rel="nofollow" title="Chinese Simplified" onclick="window.open('http://translate.google.com/translate?u='+encodeURIComponent(location.href)+'&langpair=auto%7Czh-CN&hl=en'); return false;"&gt;&lt;img alt="Chinese Simplified" border="0" align="absbottom" title="Chinese Simplified" height="24" src="http://1.bp.blogspot.com/_5jbh95HruKA/S1YWrMQAw9I/AAAAAAAAAEE/r-DEVtWXp50/s200/China.png" style="cursor: pointer;margin-right:8px" width="24"/&gt;&lt;/a&gt; &lt;/div&gt;
&lt;div 0px 0pxâ?? style="â??font-size:10px;margin:8px" 3px&gt;&lt;/div&gt;
&lt;br/&gt;
&lt;a href="http://www.ayudaparamiweb.com/"&gt;&lt;font size="1px"&gt;Widget ofrecido por www.ayudaparamiweb.com&lt;/font&gt;&lt;/a&gt;</code></pre>							

## Consejos antes de publicarlo

Prueba los enlaces desde móvil y escritorio para comprobar que todos los idiomas abren correctamente.

Revisa también que las imágenes de banderas sigan disponibles (en este ejemplo son URLs externas) o, mejor aún, súbelas a tu propio servidor para evitar dependencias.

Si quieres mejorar accesibilidad, añade textos alternativos claros y aumenta el tamaño de los iconos cuando se vean en pantallas pequeñas.

## En conclusión

Este widget de traducción es una forma rápida de hacer tu blog más accesible para lectores de otros idiomas sin una implementación compleja.

No sustituye una estrategia multidioma profesional, pero como solución inicial cumple muy bien su objetivo.
## Adapta los idiomas a tus visitas reales

No es necesario mostrar una bandera para todos los idiomas disponibles. Empieza por revisar de qué países llegan tus lectores y qué idiomas tienen más sentido para el contenido.

Un bloque con demasiadas opciones ocupa espacio y hace más difícil localizar la que interesa. Para un blog en español puede ser suficiente empezar con inglés, francés, alemán o portugués si esos idiomas corresponden con las visitas reales.

## Ten cuidado con el significado de las banderas

Una bandera representa un país, no un idioma. El inglés se utiliza en muchos países y el español también, por lo que conviene acompañar cada icono con un atributo `title` y un texto alternativo comprensible.

Si dispones de espacio, mostrar el nombre del idioma junto a la bandera evita ambigüedades y mejora la accesibilidad.

## Guarda las imágenes en tu propio alojamiento

El ejemplo utiliza imágenes externas. Esto simplifica copiar el código, pero crea una dependencia: si la imagen cambia de ubicación o el servidor externo deja de responder, el icono desaparecerá.

Descargar las banderas que vayas a utilizar y servirlas desde tu propio blog te da más control. Comprueba además que tienes permiso para utilizar las imágenes elegidas.

## Comprueba la URL que se envía

La parte `encodeURIComponent(location.href)` convierte la dirección actual en un formato adecuado para incluirla dentro de otra URL. Es importante porque una dirección puede contener parámetros, símbolos u otros caracteres especiales.

Prueba el widget tanto en la portada como en una entrada concreta. El objetivo es que la traducción se abra sobre la página que el visitante está leyendo, no siempre sobre la página principal.

## Evita que el enlace interfiera con la navegación

El ejemplo devuelve `false` después de abrir la nueva ventana para impedir que el enlace `#` cambie la posición de la página.

Algunos navegadores o configuraciones pueden bloquear ventanas abiertas mediante JavaScript. Por eso conviene comprobar el comportamiento real y no depender del traductor para acceder a información imprescindible.

## Traducción automática no es contenido localizado

Este sistema ofrece una ayuda rápida al lector, pero la traducción automática puede cometer errores con nombres propios, expresiones técnicas o frases ambiguas.

Si una página contiene condiciones legales, instrucciones delicadas o información comercial muy importante, conviene revisar manualmente la traducción antes de presentarla como versión oficial.

## SEO internacional: no confundir el widget con una versión por idioma

Abrir una página a través de Google Translate no crea por sí mismo una arquitectura internacional de tu sitio. Si quieres posicionar contenidos propios en varios idiomas, necesitarás páginas independientes, URLs estables y una estrategia de contenidos específica.

El widget es útil como comodidad para el visitante, especialmente en un blog pequeño, pero no sustituye una web multidioma bien planteada.

## Revisa el aspecto en móvil

Doce iconos de 24 píxeles pueden caber en escritorio y quedar apretados en una pantalla pequeña. Permite que el bloque salte de línea y deja separación suficiente entre enlaces para que puedan pulsarse con el dedo.

También conviene comprobar que el efecto de opacidad no dificulta identificar el idioma cuando se utiliza una pantalla táctil.

## Mantén el código sencillo

El principal atractivo de este método es que no requiere una instalación compleja. Si necesitas añadir dos o tres idiomas, elimina del ejemplo los enlaces que no vayas a utilizar.

Cuanto menos código innecesario mantengas, más fácil será revisar enlaces, imágenes y estilos cuando cambies el diseño de tu blog.

Una pequeña mejora como esta puede facilitar la lectura a visitantes internacionales sin modificar el contenido original. La clave es tratarla como una ayuda adicional, probarla en las páginas reales y no atribuir a una traducción automática la misma precisión que a un contenido redactado expresamente en otro idioma.
