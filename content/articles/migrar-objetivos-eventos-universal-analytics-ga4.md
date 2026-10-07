---
title: "Cómo pasar tus objetivos y eventos de Universal Analytics a GA4"
description: "Tutorial de mayo de 2022 para replantear objetivos y eventos de Universal Analytics como eventos, parámetros y conversiones en Google Analytics 4."
excerpt: "Migrar eventos a GA4 no consiste en copiar categoría, acción y etiqueta: primero hay que decidir qué interacción merece seguir midiéndose."
author: "Sucender"
canonical: "/migrar-objetivos-eventos-universal-analytics-ga4"
category: "tutoriales"
tags: ["GA4", "Universal Analytics", "Eventos", "Analítica web"]
publishedDate: "2022-05-19"
featuredImage: "/img/articulo/migrar-objetivos-eventos-universal-analytics-ga4-featured.svg"
heroClass: "bg-green"
themeColor: "#58b391"
robots: "index,follow"
---
En la [primera parte](/universal-analytics-desaparece-preparar-web-ga4) preparamos el cambio de Universal Analytics a Google Analytics 4 y en la [segunda](/instalar-ga4-junto-universal-analytics) dejamos ambas mediciones funcionando en paralelo.

Ahora llega la parte que más trabajo suele dar: **migrar eventos y objetivos sin limitarse a copiar nombres antiguos**.

Universal Analytics y GA4 no organizan las interacciones de la misma forma. Aprovechar el cambio para revisar qué estamos midiendo suele ser mejor que reproducir años de configuración tal cual.

## Haz una lista de eventos y objetivos actuales

Abre Universal Analytics y apunta las interacciones que de verdad utilizas.

Por ejemplo:

| Medición actual | Tipo en UA | ¿Sigue siendo útil? |
| --- | --- | --- |
| Solicitud de presupuesto | Objetivo de destino | Sí |
| Clic en teléfono | Evento | Sí |
| Descarga de catálogo | Evento | Sí |
| Reproducción de vídeo | Evento | Quizá |
| Scroll 25 % | Evento | No |
| Visita de más de 3 páginas | Objetivo | Quizá |

No migres todavía.

Primero decide qué merece existir en el nuevo sistema.

## Recuerda cómo se estructura un evento de Universal Analytics

En UA es habitual trabajar con:

- categoría;
- acción;
- etiqueta;
- valor.

Por ejemplo:

```javascript
gtag('event', 'click', {
  event_category: 'Contacto',
  event_label: 'Telefono cabecera',
  value: 1
});
```

Otra implementación antigua puede usar analytics.js:

```javascript
ga(
  'send',
  'event',
  'Contacto',
  'click',
  'Telefono cabecera'
);
```

Esta estructura ha funcionado durante años, pero no es la forma natural de organizar GA4.

## En GA4 piensa primero en el nombre del evento

En GA4 el nombre del evento describe la acción.

Los parámetros añaden contexto.

Un clic de contacto puede plantearse así:

```javascript
gtag('event', 'contact_click', {
  contact_method: 'phone',
  link_location: 'header'
});
```

El nombre principal es:

```text
contact_click
```

y los parámetros responden a preguntas adicionales:

```text
contact_method = phone
link_location = header
```

Esta estructura suele ser más fácil de ampliar.

## No conviertas categoría, acción y etiqueta en tres parámetros por costumbre

Es técnicamente posible enviar parámetros que imiten el sistema antiguo.

Pero si estás diseñando una medición nueva, pregúntate si tiene sentido conservar esa estructura.

En lugar de:

```javascript
gtag('event', 'event', {
  event_category: 'Formularios',
  event_action: 'Enviar',
  event_label: 'Presupuesto'
});
```

puede ser más claro:

```javascript
gtag('event', 'contact_form_submit', {
  form_name: 'presupuesto'
});
```

La diferencia parece pequeña, pero dentro de unos meses será más fácil entender qué significa cada evento.

## Usa nombres sencillos y consistentes

Evita terminar con eventos como:

```text
Click boton
click_boton
boton-click
BTN_CONTACT
contactoBoton
```

Elige una convención.

Por ejemplo:

```text
contact_click
contact_form_submit
catalog_download
quote_start
quote_complete
```

Usar minúsculas y guiones bajos ayuda a mantener una nomenclatura estable.

Documenta los nombres antes de crear veinte eventos.

## Revisa primero los eventos automáticos y la medición mejorada

GA4 puede recoger algunas interacciones sin que tengas que crear una etiqueta personalizada.

Antes de migrar eventos antiguos de:

- scroll;
- clic saliente;
- descarga;
- búsqueda interna;
- determinados vídeos;

comprueba qué está generando ya la medición mejorada de tu flujo web.

Si GA4 ya recoge una descarga como un evento propio, quizá solo necesites añadir contexto o convertir una descarga concreta en conversión.

No dupliques por inercia.

## Migra una solicitud de contacto

Supongamos que en Universal Analytics el envío correcto del formulario llevaba al usuario a:

```text
/gracias-presupuesto
```

y teníamos un objetivo de destino.

En GA4 podemos mantener una lógica equivalente disparando un evento al llegar correctamente a esa página.

Por ejemplo:

```javascript
if (window.location.pathname === '/gracias-presupuesto') {
  gtag('event', 'contact_form_submit', {
    form_name: 'presupuesto'
  });
}
```

Después, en GA4, podemos marcar ese evento como conversión.

La ventaja es que el mismo nombre podría utilizarse también si más adelante el formulario se envía sin recargar la página.

## Evita medir el clic si necesitas medir el resultado

Este error es importante.

Un botón puede recibir un clic aunque el formulario falle.

Por tanto:

```javascript
boton.addEventListener('click', function () {
  gtag('event', 'contact_form_submit');
});
```

no demuestra necesariamente que el formulario se haya enviado.

Si puedes, envía el evento cuando tengas confirmación de éxito.

Por ejemplo:

```javascript
function formularioEnviadoCorrectamente() {
  gtag('event', 'contact_form_submit', {
    form_name: 'presupuesto'
  });
}
```

La condición exacta dependerá de cómo funcione tu formulario.

## Migra clics de teléfono

Para enlaces de teléfono puedes escuchar los enlaces tel:.

HTML:

```html
<a
  href="tel:+34910000000"
  class="js-phone-link">
  Llamar
</a>
```

JavaScript:

```javascript
var phoneLinks = document.querySelectorAll('.js-phone-link');

phoneLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    gtag('event', 'contact_click', {
      contact_method: 'phone'
    });
  });
});
```

En una web antigua quizá prefieras una implementación compatible con los navegadores que realmente utiliza tu público. No cambies toda tu base de JavaScript solo por la analítica.

## Migra clics de correo electrónico

El mismo principio puede aplicarse a mailto:.

```html
<a
  href="mailto:info@ejemplo.com"
  class="js-email-link">
  Escribir por correo
</a>
```

```javascript
var emailLinks = document.querySelectorAll('.js-email-link');

emailLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    gtag('event', 'contact_click', {
      contact_method: 'email'
    });
  });
});
```

Podemos medir ambos con el mismo evento y distinguir el método mediante un parámetro.

Eso evita crear eventos separados para cada pequeño caso.

## Migra una descarga importante

Si GA4 ya recoge file_download mediante medición mejorada, quizá no necesitas otra etiqueta.

Pero supongamos que quieres distinguir específicamente el catálogo comercial.

Puedes enviar un evento propio:

```javascript
gtag('event', 'catalog_download', {
  file_name: 'catalogo-2022.pdf'
});
```

O utilizar el evento automático y crear una conversión basada en una descarga concreta.

La elección depende de cómo quieras analizarlo después.

## Utiliza parámetros para añadir contexto

Un evento puede necesitar información adicional.

Por ejemplo:

```javascript
gtag('event', 'cta_click', {
  cta_name: 'solicitar_presupuesto',
  cta_location: 'hero',
  page_type: 'servicio'
});
```

No añadas parámetros porque sí.

Cada parámetro debería responder a una pregunta real.

Si nunca vas a distinguir hero de footer, quizá no necesitas cta_location.

## Recuerda registrar definiciones personalizadas cuando sean necesarias

Enviar un parámetro no significa que vaya a aparecer automáticamente como dimensión disponible en todos los informes.

Si necesitas utilizar un parámetro personalizado de forma habitual en los informes, tendrás que configurarlo como definición personalizada en GA4.

Por ejemplo, si envías:

```text
form_name
```

y quieres analizar resultados por formulario, registra ese parámetro con el ámbito correspondiente.

Documenta qué definiciones has creado para no alcanzar límites con campos que ya no se utilizan.

## Si utilizas Tag Manager, separa dataLayer de la etiqueta de Analytics

Una forma limpia de trabajar consiste en hacer que la aplicación comunique lo ocurrido mediante dataLayer.

Por ejemplo:

```javascript
dataLayer.push({
  event: 'contact_form_submit',
  form_name: 'presupuesto'
});
```

Después, en Google Tag Manager:

```text
Activador
Tipo: Custom Event
Nombre: contact_form_submit
```

y una etiqueta GA4 Event:

```text
Event name: contact_form_submit

Event parameters:
form_name = {{DLV - form_name}}
```

Así el código de la web describe el evento y Tag Manager decide a qué sistema de medición enviarlo.

## No envíes datos personales

No utilices como parámetros:

- nombre;
- dirección de correo;
- teléfono;
- DNI;
- texto libre de formularios.

Por ejemplo, esto no debería hacerse:

```javascript
gtag('event', 'contact_form_submit', {
  email: document.getElementById('email').value
});
```

No necesitas identificar a la persona para saber que un formulario ha funcionado.

Mide la interacción, no el contenido personal introducido.

## Convierte en conversiones solo las acciones importantes

GA4 permite marcar eventos como conversiones.

No marques todo.

Un evento puede ser interesante sin representar un resultado de negocio.

Por ejemplo:

| Evento | ¿Conversión? |
| --- | --- |
| page_view | No |
| scroll | No |
| menu_click | No |
| contact_click | Quizá |
| contact_form_submit | Sí |
| purchase | Sí |
| account_created | Sí |

Si todo es una conversión, el concepto deja de ayudar a priorizar.

## Migra objetivos de destino con cuidado

En Universal Analytics era común crear un objetivo al visitar una URL como:

```text
/gracias
```

Antes de replicarlo, comprueba que esa página solo puede verse después de completar la acción.

Si cualquiera puede abrirla directamente, seguirá existiendo el mismo problema en GA4.

Cuando puedas, es preferible disparar el evento desde el momento de éxito real del proceso.

## Los objetivos de duración no necesitan una copia literal

Quizá tienes objetivos como:

```text
Sesión superior a 3 minutos
```

o:

```text
Más de 4 páginas por sesión
```

No intentes convertir automáticamente cada uno en una conversión GA4.

Primero pregunta qué decisión tomabas con ese objetivo.

GA4 tiene un enfoque distinto de interacción, por lo que una copia literal puede no aportar el mismo valor.

Si ese objetivo nunca influyó en ninguna decisión, puede ser un buen candidato para desaparecer.

## Ecommerce necesita una revisión específica

Si tienes una tienda online, no migres comercio electrónico como si fuera un clic más.

Nombres de eventos, parámetros de producto, transacciones y estructura de datos necesitan una revisión específica.

Empieza comprobando:

- purchase;
- transaction_id;
- value;
- currency;
- items.

Una compra debe validarse con una transacción real de prueba.

No des por correcto ecommerce porque la página vista aparece en Realtime.

## Utiliza DebugView evento por evento

Mientras migras, comprueba cada interacción.

Un buen orden es:

1. realizar la acción;
2. ver que aparece el evento;
3. revisar el nombre;
4. revisar los parámetros;
5. comprobar que se dispara una sola vez;
6. marcarlo como conversión si corresponde.

No migres veinte eventos y los pruebes todos al final.

Encontrarás mucho más rápido los errores si avanzas de uno en uno.

## Compara con Universal Analytics sin esperar igualdad absoluta

Durante la medición paralela puedes comparar tendencias.

Por ejemplo:

```text
Formulario presupuesto
UA objetivo: 37
GA4 conversión: 36
```

puede ser razonable después de revisar cómo se disparan ambos.

En cambio:

```text
UA objetivo: 37
GA4 conversión: 4
```

indica que necesitamos investigar.

Comprueba dispositivos, páginas, consentimientos y activadores antes de culpar al nuevo modelo.

## Crea un diccionario de eventos

Al terminar, guarda algo así:

| Evento GA4 | Cuándo se dispara | Parámetros | Conversión |
| --- | --- | --- | --- |
| contact_form_submit | Formulario confirmado | form_name | Sí |
| contact_click | Clic teléfono/correo | contact_method | No |
| catalog_download | Catálogo descargado | file_name | Sí |
| cta_click | CTA principal | cta_name, cta_location | No |

Este documento será más útil que recordar cómo configuraste cada etiqueta.

## Qué deberías tener al terminar

Ya no estamos simplemente probando GA4.

Deberías tener:

- eventos importantes migrados;
- nombres consistentes;
- parámetros útiles;
- conversiones definidas;
- objetivos antiguos descartados cuando no aportan;
- eventos comprobados con DebugView;
- Universal Analytics todavía activo como referencia.

En la última parte de esta serie comprobaremos que toda la migración está midiendo de forma coherente antes de depender de GA4 para decisiones importantes.

**Siguiente tutorial de la serie:** [Cómo comprobar que GA4 está midiendo correctamente antes de abandonar Universal Analytics](/comprobar-ga4-antes-abandonar-universal-analytics).
