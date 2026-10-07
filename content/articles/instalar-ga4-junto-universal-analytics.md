---
title: "Cómo instalar GA4 junto a Universal Analytics y medir en paralelo"
description: "Tutorial de abril de 2022 para mantener Universal Analytics y Google Analytics 4 funcionando a la vez con gtag.js o Google Tag Manager."
excerpt: "La forma más segura de migrar a GA4 es medir durante un tiempo con ambos sistemas y comprobar que la nueva propiedad recibe datos correctamente."
author: "Sucender"
canonical: "/instalar-ga4-junto-universal-analytics"
category: "tutoriales"
tags: ["GA4", "Universal Analytics", "Google Tag Manager", "Analítica web"]
publishedDate: "2022-04-21"
featuredImage: "/img/articulo/instalar-ga4-junto-universal-analytics-featured.svg"
heroClass: "bg-blue"
themeColor: "#47a3da"
robots: "index,follow"
---
En la [primera parte de esta serie](/universal-analytics-desaparece-preparar-web-ga4) vimos por qué conviene empezar ya la transición a Google Analytics 4 sin apagar Universal Analytics.

Ahora vamos a hacer la parte delicada: **tener las dos mediciones funcionando a la vez sin duplicar datos ni perder la referencia que ya tenemos**.

Si todavía no has creado una propiedad GA4, puedes repasar antes [Google Analytics 4: primeros pasos](/ga4-primeros-pasos).

## Antes de tocar código, identifica tu instalación actual

No empieces pegando etiquetas nuevas.

Primero averigua cómo está instalado Universal Analytics.

Las situaciones más habituales son:

- analytics.js pegado directamente en el HTML;
- gtag.js con un identificador UA-;
- Google Tag Manager;
- un plugin o módulo del CMS;
- código insertado por el tema;
- varias instalaciones a la vez.

El último caso es más frecuente de lo que parece.

Abre el código fuente y busca:

```text
UA-
```

Después busca también:

```text
googletagmanager.com
```

y:

```text
gtag(
```

Si ves varias implementaciones, documenta cuál está enviando datos antes de añadir GA4.

## Si ya usas gtag.js, puedes configurar las dos propiedades

Supongamos que tu web ya utiliza la etiqueta global con Universal Analytics.

Una configuración simplificada puede tener este aspecto:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-12345678-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', 'UA-12345678-1');
</script>
```

Para enviar también la medición básica a GA4 puedes añadir la configuración de la nueva propiedad:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABCDEFGHIJ"></script>
<script>
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());

  gtag('config', 'UA-12345678-1');
  gtag('config', 'G-ABCDEFGHIJ');
</script>
```

Lo importante no es copiar exactamente estos identificadores, sino entender que ambos destinos pueden convivir.

Sustituye:

```text
UA-12345678-1
```

por tu propiedad Universal Analytics y:

```text
G-ABCDEFGHIJ
```

por tu Measurement ID de GA4.

## No cargues dos veces la librería sin necesidad

Si ya utilizas gtag.js, no hace falta mantener dos fragmentos completos independientes que vuelvan a inicializar todo.

Puedes utilizar una única carga de la librería y configurar ambos destinos.

La idea es evitar algo como:

```html
<!-- Primer bloque completo de gtag.js -->
...

<!-- Segundo bloque completo de gtag.js -->
...
```

cuando una única implementación puede gestionar las dos propiedades.

Menos código duplicado significa menos posibilidades de enviar dos veces la misma página vista por error.

## Si utilizas analytics.js, no mezcles sin entender qué envía cada cosa

Muchas instalaciones antiguas todavía utilizan analytics.js.

Puedes encontrarte código con este aspecto:

```javascript
ga('create', 'UA-12345678-1', 'auto');
ga('send', 'pageview');
```

No tienes obligación de reescribir toda la implementación de Universal Analytics el mismo día que añades GA4.

Una estrategia prudente es:

- mantener analytics.js para UA;
- instalar GA4 con gtag.js;
- comprobar que cada sistema recibe sus propios datos;
- migrar eventos después.

Lo que debes evitar es mantener analytics.js enviando a UA y, además, configurar el mismo UA otra vez en una segunda implementación de gtag.js.

Eso puede duplicar páginas vistas y eventos.

## Comprueba el identificador de GA4

El identificador de un flujo web de GA4 utiliza el formato:

```text
G-XXXXXXXXXX
```

No confundas el Measurement ID con otros identificadores de Analytics o Tag Manager.

En una implementación manual, ese G- es el que utilizarás en la configuración:

```javascript
gtag('config', 'G-ABCDEFGHIJ');
```

Copia el identificador directamente desde el flujo de datos de tu propiedad.

## Empieza por páginas vistas

Antes de migrar clics, formularios y descargas, comprueba que GA4 recibe navegación básica.

Haz una prueba con varias páginas:

```text
/
 /servicios
 /contacto
 /gracias
```

Entra en ellas tú mismo y observa el informe en tiempo real.

No necesitas esperar a los informes consolidados para saber si la etiqueta está funcionando.

Si no aparece actividad, revisa primero:

- que el identificador G- sea correcto;
- que la etiqueta se cargue;
- que el consentimiento permita analítica;
- que no haya errores JavaScript;
- que un bloqueador no esté impidiendo tu propia prueba.

## Utiliza la pestaña Network del navegador

Las herramientas de desarrollo ayudan a comprobar si el navegador está enviando peticiones.

Abre Network y filtra por términos relacionados con Analytics.

Lo que quieres confirmar es que al navegar se producen solicitudes de medición.

Esta comprobación es muy útil porque separa dos problemas diferentes:

- la etiqueta no se ejecuta;
- la etiqueta envía datos, pero todavía no los ves donde esperabas.

No cambies cinco cosas a la vez. Averigua en qué punto se rompe el recorrido.

## Revisa la medición mejorada

Al crear un flujo web de GA4 puedes activar la medición mejorada.

Puede recoger automáticamente varias interacciones comunes, como determinadas vistas de página, desplazamientos, clics salientes, búsquedas internas, descargas o interacción con vídeos compatibles.

Eso significa que antes de recrear un evento antiguo debes mirar si GA4 ya lo está recogiendo.

Por ejemplo, si Universal Analytics tenía un evento personalizado para cada descarga de PDF, comprueba primero qué está registrando GA4.

No quieres terminar con:

```text
file_download
descarga_pdf
download
pdf_click
```

para describir prácticamente la misma acción.

## Si usas Google Tag Manager, crea una configuración GA4 separada

Con Google Tag Manager la lógica es similar, pero las etiquetas se gestionan desde el contenedor.

Una estructura habitual puede quedar así:

```text
Etiqueta 1
Google Analytics: Universal Analytics
Activador: All Pages

Etiqueta 2
Google Analytics: GA4 Configuration
Measurement ID: G-ABCDEFGHIJ
Activador: All Pages
```

No desactives la etiqueta UA todavía.

Publica GA4 como una medición adicional y comprueba el resultado.

## Usa el modo de vista previa de Tag Manager

Antes de publicar cambios en el contenedor, entra en Preview.

Navega por la web y comprueba:

- que la etiqueta UA sigue activándose;
- que la configuración GA4 se activa una vez;
- que no se dispara dos veces en la misma carga;
- que el activador es el esperado;
- que las páginas especiales también están cubiertas.

Si la etiqueta se dispara dos veces en una misma página, no lo ignores aunque los informes parezcan razonables.

Corrígelo antes de seguir.

## Separa configuración de eventos

En Tag Manager, una configuración básica de GA4 debería quedar separada de las etiquetas de eventos que añadiremos después.

Piensa en dos niveles:

```text
GA4 Configuration
└── se activa en todas las páginas

GA4 Event
├── clic teléfono
├── formulario
├── descarga
└── otras acciones
```

No conviertas la etiqueta de configuración en una colección de reglas difíciles de mantener.

## Crea una señal de prueba sencilla

Antes de migrar eventos de negocio puedes crear un evento temporal para comprobar el envío.

Con gtag.js:

```javascript
gtag('event', 'migration_test', {
  test_area: 'contacto'
});
```

Abre la página donde ejecutas la prueba y busca el evento en las herramientas de depuración o en tiempo real.

Cuando termines, elimina el evento temporal.

No lo dejes enviándose indefinidamente solo porque funcionó.

## Comprueba DebugView

GA4 incluye DebugView para observar eventos mientras estás desarrollando o depurando.

Puedes habilitar el modo de depuración durante una prueba:

```javascript
gtag('config', 'G-ABCDEFGHIJ', {
  debug_mode: true
});
```

No dejes esta configuración aplicada indiscriminadamente a todos los usuarios de producción.

Su función es ayudarte a comprobar una implementación.

Si trabajas con Tag Manager, el modo de vista previa también resulta útil para depurar el flujo de eventos.

## No esperes que UA y GA4 den exactamente la misma cifra

Después de unas horas o unos días quizá veas diferencias entre los dos sistemas.

Eso no implica automáticamente que GA4 esté mal instalado.

Universal Analytics y GA4 no calculan todas las métricas de la misma forma.

Utiliza la comparación para detectar anomalías grandes.

Por ejemplo:

```text
UA: 10.000 páginas vistas
GA4: 9.850 vistas
```

merece observación.

Pero:

```text
UA: 10.000 páginas vistas
GA4: 2.300 vistas
```

hace pensar que una parte importante de la web no está enviando datos.

## Comprueba dominios y subdominios

Si el recorrido del usuario pasa por más de un dominio, no des por hecho que la nueva propiedad los está tratando igual que Universal Analytics.

Haz una lista de todos los lugares por los que puede pasar una conversión:

```text
www.ejemplo.com
tienda.ejemplo.com
reservas.otrodominio.com
pago.proveedor.com
```

Después recorre el proceso completo.

Si una sesión se rompe o aparecen referencias inesperadas, tendrás que revisar la configuración antes de dar por terminada la migración.

## Mantén un registro de cada cambio

Anota:

| Fecha | Cambio | UA | GA4 | Validado |
| --- | --- | --- | --- | --- |
| 21/04 | GA4 instalado | Sí | Sí | Sí |
| 22/04 | Dominio tienda | Sí | Sí | Pendiente |
| 25/04 | Consentimiento | Sí | Sí | Pendiente |

La fecha es importante.

Si una métrica cambia bruscamente podrás comprobar si coincide con una modificación de etiquetas.

## No publiques sin revisar consentimiento

Si Analytics solo debe cargarse tras la aceptación de cookies analíticas, verifica el comportamiento en los dos estados.

### Sin consentimiento

No debería activarse una medición que tu configuración ha decidido bloquear.

### Con consentimiento

UA y GA4 deberían recibir datos según lo previsto.

Haz la prueba en una ventana privada o borrando el estado de consentimiento para no quedarte únicamente con tu elección anterior.

## Mantén Universal Analytics como referencia

Durante esta fase, Universal Analytics sigue siendo útil.

No lo mires como un sistema que ya no sirve.

Todavía tenemos tiempo hasta la fecha anunciada para el cese de procesamiento de nuevos hits de las propiedades estándar, el **1 de julio de 2023**.

El objetivo de estos meses es construir un histórico paralelo en GA4 y detectar problemas mientras todavía podemos compararlos con una implementación conocida.

## Qué debería funcionar al terminar

Antes de pasar a eventos y conversiones, asegúrate de que:

- Universal Analytics sigue recogiendo datos;
- GA4 recibe páginas vistas;
- no hay duplicación evidente;
- Realtime muestra tus pruebas;
- DebugView puede mostrar eventos de desarrollo;
- Tag Manager, si lo utilizas, dispara cada etiqueta una sola vez;
- el consentimiento funciona;
- tienes documentado el cambio.

Entonces sí merece la pena migrar las interacciones importantes.

En la siguiente parte transformaremos objetivos y eventos de Universal Analytics al modelo de eventos y parámetros de GA4.

**Siguiente tutorial de la serie:** [Cómo pasar tus objetivos y eventos de Universal Analytics a GA4](/migrar-objetivos-eventos-universal-analytics-ga4).
