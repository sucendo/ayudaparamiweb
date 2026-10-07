---
title: "Cómo configurar caché, compresión y servidor para acelerar una web"
description: "Tutorial de 2020 para mejorar el rendimiento desde el servidor con caché, Cache-Control, Gzip, Brotli, HTTP/2, CDN y tiempos de respuesta."
excerpt: "La última parte de la serie se centra en reducir trabajo repetido y enviar menos datos desde el servidor."
author: "Sucender"
canonical: "/cache-compresion-servidor-web"
category: "tutoriales"
tags: ["Rendimiento web", "Servidor", "Caché", "Desarrollo web"]
publishedDate: "2020-08-27"
featuredImage: "/img/articulo/cache-compresion-servidor-web-featured.svg"
heroClass: "bg-purple"
themeColor: "#7a45e8"
robots: "index,follow"
---
En la [primera parte de esta serie](/como-mejorar-la-velocidad-de-tu-web) vimos cómo diagnosticar una web lenta. Después trabajamos sobre [imágenes, CSS y JavaScript](/optimizar-imagenes-css-javascript-web).

En esta última entrega vamos a mirar el otro lado de la carga: **servidor, caché y compresión**.

Una web puede tener imágenes bien optimizadas y poco JavaScript, pero seguir siendo lenta si el servidor tarda demasiado en responder o si obliga al navegador a descargar los mismos recursos en cada visita.

## Comprueba de nuevo el tiempo de respuesta

Antes de configurar nada, repite varias pruebas y observa cuánto tarda el servidor en empezar a responder.

Si el retraso ocurre antes de que llegue el HTML, las causas pueden estar en:

- alojamiento saturado;
- consultas lentas a base de datos;
- código ejecutado en cada petición;
- llamadas a servicios externos;
- falta de caché;
- procesos de generación demasiado costosos.

No confundas este tiempo con la descarga completa de la página.

Una fotografía pesada puede hacer lenta la carga total, pero no explica por qué el servidor tarda dos segundos en empezar a enviar el HTML.

## Evita generar una y otra vez el mismo contenido

Muchas webs dinámicas construyen una página cada vez que alguien la solicita.

El servidor puede tener que:

1. arrancar la aplicación;
2. consultar la base de datos;
3. ejecutar plugins o módulos;
4. montar el HTML;
5. devolver el resultado.

Si la página es igual para muchos usuarios, repetir todo ese trabajo en cada visita es innecesario.

La caché de página permite guardar temporalmente una versión ya generada y servirla de nuevo sin reconstruirla completa.

La forma concreta depende del CMS, framework y alojamiento, pero el principio es el mismo: **no recalcular lo que no ha cambiado**.

## No cachees sin pensar qué contenido es dinámico

La caché también puede provocar problemas si se aplica sin criterio.

Hay páginas que no deberían compartirse entre usuarios:

- cesta de compra;
- área privada;
- información personalizada;
- pasos de pago;
- paneles de administración.

Comprueba qué parte del sitio puede cachearse de forma segura y durante cuánto tiempo.

Después de activar caché, prueba también como usuario no identificado y con una sesión iniciada si la web tiene cuentas.

## Configura la caché del navegador para archivos estáticos

Imágenes, CSS, JavaScript y fuentes cambian con mucha menos frecuencia que el HTML.

Puedes indicar al navegador que conserve estos archivos durante un tiempo mediante cabeceras HTTP.

Una respuesta puede incluir, por ejemplo:

```http
Cache-Control: public, max-age=2592000
```

En este ejemplo, el recurso puede mantenerse durante 30 días.

No utilices el mismo tiempo para todo. Un archivo que cambia cada semana necesita una política distinta de un logotipo que permanece igual durante meses.

## Versiona los archivos que puedan cambiar

Una caché larga funciona bien si el navegador puede distinguir una versión nueva.

Una técnica sencilla consiste en cambiar el nombre del archivo cuando cambia su contenido:

```html
<link rel="stylesheet" href="/css/app.20200827.css">
```

o utilizar una versión en la URL:

```html
<link rel="stylesheet" href="/css/app.css?v=4">
```

El nombre versionado suele ser más sencillo de controlar con proxies y CDN.

Así puedes mantener una caché larga para archivos estáticos sin obligar al usuario a conservar una versión antigua después de una actualización.

## Gzip sigue siendo una mejora básica

HTML, CSS, JavaScript, JSON y otros archivos de texto se comprimen muy bien.

Gzip reduce los datos enviados por la red y está ampliamente soportado.

En Apache, una configuración típica con mod_deflate puede ser:

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>
```

No copies una configuración en producción sin comprobar qué módulos tiene habilitados tu servidor.

Después de activarla revisa las cabeceras de respuesta y confirma que aparece algo similar a:

```http
Content-Encoding: gzip
```

## Brotli puede comprimir todavía más

Brotli es otra opción para comprimir recursos de texto.

Los navegadores modernos ya lo soportan ampliamente cuando se sirve correctamente, y en muchos casos consigue archivos algo más pequeños que Gzip.

Una estrategia razonable es ofrecer Brotli cuando el cliente lo acepta y mantener Gzip como alternativa.

El navegador indica los formatos que entiende mediante la cabecera Accept-Encoding.

Una petición puede incluir:

```http
Accept-Encoding: gzip, deflate, br
```

Si el servidor responde con Brotli:

```http
Content-Encoding: br
```

La configuración depende bastante del hosting. En servidores administrados puede estar ya disponible; en otros necesitarás soporte del proveedor o módulos adicionales.

No merece la pena complicar una instalación estable únicamente por sustituir Gzip si el beneficio es mínimo.

## No comprimas de nuevo imágenes ya comprimidas

JPEG, PNG, WebP, vídeo o archivos ZIP ya utilizan compresión propia.

Aplicar Gzip o Brotli sobre ellos normalmente aporta poco y puede consumir CPU sin conseguir un ahorro relevante.

Reserva la compresión HTTP principalmente para recursos de texto:

- HTML;
- CSS;
- JavaScript;
- JSON;
- XML;
- SVG.

La optimización de fotografías debe hacerse sobre el propio archivo de imagen, como vimos en la segunda parte.

## Comprueba si HTTP/2 está activo

HTTP/2 permite gestionar múltiples recursos de forma más eficiente sobre una misma conexión.

A estas alturas muchos proveedores ya lo ofrecen mediante HTTPS, pero no conviene darlo por supuesto.

Puedes comprobar el protocolo utilizado desde las herramientas de desarrollo del navegador o mediante herramientas de diagnóstico.

Si tu servidor sigue utilizando únicamente HTTP/1.1, consulta si el proveedor puede habilitar HTTP/2.

No reconstruyas toda la arquitectura solo para aumentar una puntuación. Primero comprueba si el protocolo está limitando realmente la carga.

## Revisa HTTPS y el coste de redirecciones

Una configuración habitual es que existan varias versiones posibles:

- http con www;
- http sin www;
- https con www;
- https sin www.

Todas deberían terminar en una única versión canónica con el menor número de saltos posible.

Una cadena como:

```text
http://ejemplo.com
→ http://www.ejemplo.com
→ https://www.ejemplo.com
```

puede simplificarse normalmente enviando la primera variante directamente al destino final.

Cada salto añade una petición y complica el rastreo.

## Usa una CDN solo si resuelve un problema real

Una CDN distribuye copias de recursos desde distintos puntos de red.

Puede ser útil cuando los usuarios están repartidos geográficamente o cuando quieres descargar trabajo del servidor principal.

También puede ayudar a servir imágenes, CSS, JavaScript y otros archivos estáticos.

Pero introducir una CDN añade otra capa que tendrás que mantener:

- caché;
- invalidaciones;
- certificados;
- cabeceras;
- DNS;
- posibles errores de configuración.

Si tus usuarios están cerca del servidor y la web ya responde rápido, una CDN no tiene por qué ser la primera optimización.

## Revisa el hosting antes de migrar

Un servidor más potente no corrige automáticamente una aplicación ineficiente.

Antes de cambiar de proveedor comprueba:

- uso de CPU y memoria;
- límites de procesos;
- versión de PHP u otro entorno;
- base de datos;
- caché disponible;
- almacenamiento;
- tiempos de respuesta a distintas horas.

En un hosting compartido puede haber variaciones que no dependen directamente de tu web.

Si el rendimiento cambia mucho sin modificaciones, registra las horas y resultados antes de hablar con el proveedor.

## Reduce consultas repetidas

En webs dinámicas, una página puede ejecutar muchas consultas similares.

No siempre hace falta optimizar la base de datos a mano, pero sí conviene detectar si un plugin, módulo o plantilla está realizando trabajo innecesario.

Si dispones de un modo de depuración o perfilado, utilízalo en un entorno seguro.

Busca:

- consultas repetidas;
- consultas muy lentas;
- llamadas que devuelven más datos de los necesarios;
- operaciones ejecutadas en todas las páginas sin motivo.

Una caché puede ocultar parte del problema, pero entender la causa ayuda a mantener la web estable.

## Comprueba procesos programados y tareas internas

Copias de seguridad, generación de miniaturas, importaciones, envío de correos o tareas programadas pueden competir por recursos con las visitas.

Si observas picos de lentitud a horas concretas, revisa qué procesos se ejecutan en esos momentos.

Mover una tarea pesada a una franja de menos tráfico puede mejorar la experiencia sin cambiar el código de la web.

## Mide una visita nueva y una repetida

Después de configurar la caché, compara ambos escenarios.

### Primera visita

Sirve para comprobar qué recibe alguien que llega sin recursos guardados.

### Visita repetida

Permite verificar si el navegador reutiliza CSS, JavaScript, imágenes y fuentes.

En Network puedes comprobar si un recurso se obtiene desde caché o si vuelve a descargarse.

Si todo se solicita otra vez, revisa las cabeceras.

## Comprueba que la compresión está funcionando

No des por hecho que una opción activada en el panel del hosting se aplica realmente.

Abre una respuesta HTML, CSS o JavaScript y revisa sus cabeceras.

También puedes comparar el tamaño original con el tamaño transferido.

Una hoja JavaScript de 300 KB puede transferir bastante menos si está correctamente comprimida.

Lo importante es medir el resultado en la respuesta real.

## Repite las mismas pruebas de la primera parte

Vuelve a las páginas que utilizaste como referencia en junio:

- portada;
- página o entrada principal;
- categoría;
- ficha de producto si existe;
- formulario o proceso importante.

Utiliza condiciones similares y compara.

Una tabla sencilla puede bastar:

| Métrica | Antes | Después |
| --- | ---: | ---: |
| Peso transferido | | |
| Peticiones | | |
| Tiempo de respuesta | | |
| Primera carga | | |
| Carga repetida | | |

No busques una mejora idéntica en todas las páginas. Una plantilla con muchas imágenes responderá de forma distinta a una página principalmente textual.

## No optimices una cifra a costa de la web

Una web rápida que pierde funciones importantes no está optimizada.

Después de cada cambio revisa:

- navegación;
- formularios;
- inicio de sesión;
- carrito;
- contenido dinámico;
- analítica;
- vídeos;
- mapas;
- versión móvil.

La caché y el cambio de orden de recursos pueden producir fallos que no aparecen en una prueba sintética.

## El método completo

Después de estas tres entregas, el proceso queda así:

1. medir una página real;
2. encontrar el cuello de botella;
3. reducir imágenes, CSS y JavaScript;
4. ordenar la carga de recursos;
5. configurar caché y compresión;
6. revisar el servidor;
7. volver a medir;
8. comprobar que ninguna función se ha roto.

No existe una configuración universal.

Una web pequeña en un buen hosting puede necesitar muy poco. Una tienda con muchas extensiones y usuarios en varios países puede necesitar una estrategia bastante más compleja.

Lo importante es mantener el orden: **primero entender el problema y después aplicar la solución que corresponde**.

**Serie completa:** [Cómo mejorar la velocidad de tu web](/como-mejorar-la-velocidad-de-tu-web) → [Cómo optimizar imágenes, CSS y JavaScript](/optimizar-imagenes-css-javascript-web) → **Cómo configurar caché, compresión y servidor**.
