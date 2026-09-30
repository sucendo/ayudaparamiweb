---
title: "Código traductor google en tu blog"
description: "Código sencillo para añadir accesos de traducción con Google Translate a un blog o web pequeña."
excerpt: "¿Deseas tener un traductor en tu blog?"
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

Si te interesa, en un siguiente tutorial puedo compartir una versión más moderna con diseño responsive y mejores métricas de usabilidad.
