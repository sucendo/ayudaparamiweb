---
title: "Universal Analytics desaparecerá: cómo preparar tu web para GA4"
description: "Qué hacer en marzo de 2022 tras el anuncio del fin de Universal Analytics: inventario, nueva propiedad GA4, medición paralela y plan de migración."
excerpt: "Google ha puesto fecha al final de Universal Analytics. No hace falta apagarlo hoy, pero sí empezar a recoger datos en GA4 cuanto antes."
author: "Sucender"
canonical: "/universal-analytics-desaparece-preparar-web-ga4"
category: "tutoriales"
tags: ["GA4", "Analítica web", "Universal Analytics", "Google Analytics"]
publishedDate: "2022-03-24"
featuredImage: "/img/articulo/universal-analytics-desaparece-preparar-web-ga4-featured.svg"
heroClass: "bg-orange"
themeColor: "#ee9e2d"
robots: "index,follow"
---
Hace pocos días Google ha anunciado un cambio que afecta a prácticamente cualquier web que todavía mida con Universal Analytics: **las propiedades estándar dejarán de procesar nuevos datos el 1 de julio de 2023**.

Eso no significa que hoy tengas que borrar Universal Analytics ni cambiar todos tus informes de golpe.

Significa algo más importante: si quieres llegar a esa fecha con histórico suficiente en Google Analytics 4, **conviene empezar ahora**.

El año pasado vimos [los primeros pasos con Google Analytics 4](/ga4-primeros-pasos). Ahora la situación ha cambiado: GA4 deja de ser simplemente una alternativa que podemos ir probando y pasa a convertirse en la dirección en la que Google está llevando Analytics.

En esta serie vamos a preparar una migración ordenada sin perder la referencia que todavía nos proporciona Universal Analytics.

## No apagues Universal Analytics todavía

La primera decisión es precisamente no precipitarse.

Si tu propiedad Universal Analytics funciona correctamente, mantenla recogiendo datos mientras configuras GA4 en paralelo.

Durante los próximos meses resulta útil tener las dos propiedades porque permiten:

- conservar tus informes habituales;
- aprender el nuevo modelo sin trabajar a ciegas;
- detectar mediciones que todavía faltan en GA4;
- acumular histórico en la nueva propiedad;
- comparar tendencias generales;
- revisar eventos y objetivos antes de depender de ellos.

La migración no debería consistir en sustituir una etiqueta por otra un viernes y esperar que el lunes todos los informes sean iguales.

No lo serán.

## Entiende qué está cambiando

Universal Analytics y Google Analytics 4 no son dos interfaces distintas sobre el mismo modelo.

### Universal Analytics gira alrededor de sesiones y tipos de hit

En Universal Analytics estamos acostumbrados a trabajar con elementos como:

- páginas vistas;
- eventos;
- transacciones;
- sesiones;
- usuarios;
- objetivos.

Los eventos suelen describirse mediante categoría, acción y etiqueta.

Un ejemplo habitual con gtag.js podría ser:

```javascript
gtag('event', 'click', {
  event_category: 'CTA',
  event_label: 'Solicitar presupuesto'
});
```

### GA4 trata las interacciones como eventos

En GA4 el modelo se simplifica alrededor de eventos y parámetros.

En lugar de intentar reconstruir siempre la combinación categoría + acción + etiqueta, podemos enviar un nombre de evento que describa la acción y parámetros que añadan contexto.

Por ejemplo:

```javascript
gtag('event', 'contact_request', {
  form_name: 'presupuesto',
  form_location: 'servicios'
});
```

No significa que debas convertir hoy todos tus eventos a este formato.

Significa que antes de migrarlos conviene preguntarse qué estás intentando medir.

## El histórico no aparecerá mágicamente en GA4

Crear una propiedad de Google Analytics 4 hoy no traslada los años anteriores de Universal Analytics.

La nueva propiedad empieza a construir su propio histórico desde que recibe datos.

Este es uno de los motivos para no esperar hasta 2023.

Si activas GA4 ahora, dentro de un año tendrás una base mucho mejor para hacer comparaciones estacionales y analizar tendencias.

Si esperas hasta el último momento, el nuevo sistema empezará prácticamente desde cero.

## Haz un inventario de tu medición actual

Antes de tocar etiquetas abre Universal Analytics y anota qué utilizas realmente.

No hace falta documentar todos los menús de Analytics. Documenta lo que influye en decisiones.

Puedes preparar una tabla como esta:

| Elemento en UA | ¿Se usa? | Importancia | Acción |
| --- | --- | --- | --- |
| Páginas vistas | Sí | Alta | Replicar |
| Formulario enviado | Sí | Alta | Rediseñar como evento |
| Clic en teléfono | Sí | Media | Replicar |
| Descarga de catálogo | Sí | Media | Revisar medición mejorada |
| Scroll antiguo | No | Baja | No migrar |
| Objetivo de gracias | Sí | Alta | Convertir a evento/conversión |

El objetivo es descubrir cuánto de tu configuración sigue siendo útil.

Una migración es una buena oportunidad para dejar de medir cosas que nadie consulta.

## Localiza cómo está instalado Analytics

Antes de crear etiquetas nuevas necesitas saber cómo está llegando Universal Analytics a la web.

Busca si utilizas:

- analytics.js;
- gtag.js;
- Google Tag Manager;
- un plugin de WordPress;
- integración del CMS;
- código insertado por el tema;
- una combinación de varios métodos.

Puedes inspeccionar el código fuente y buscar:

```text
UA-
```

También puedes revisar las peticiones desde las herramientas de desarrollo del navegador.

Si encuentras la etiqueta dos veces, resuelve primero esa duplicación. Añadir GA4 encima de una implementación que ya está duplicada hará el diagnóstico más difícil.

## Identifica tu propiedad y tus vistas

Universal Analytics puede tener varias vistas con filtros diferentes.

Por ejemplo:

```text
Cuenta
└── Propiedad UA
    ├── Todos los datos
    ├── Tráfico sin oficina
    └── Solo tienda
```

GA4 no replica exactamente este sistema de vistas.

Por eso conviene documentar qué filtros utilizas y para qué.

Pregunta especialmente:

- ¿excluyes tráfico interno?;
- ¿filtras hostnames?;
- ¿tienes vistas exclusivas para una sección?;
- ¿usas filtros para limpiar parámetros?;
- ¿hay configuraciones heredadas que nadie recuerda?

No intentes copiar cada ajuste sin entenderlo.

## Revisa objetivos y conversiones importantes

En Universal Analytics quizá tengas objetivos como:

- llegada a una página de gracias;
- envío de formulario;
- compra;
- registro;
- clic en un botón;
- duración;
- número de páginas por sesión.

Clasifícalos en dos grupos.

### Acciones de negocio

Son las que realmente importan: compra, contacto, alta, solicitud, descarga clave.

Estas deben tener prioridad.

### Indicadores secundarios

Scroll, tiempo, visitas a páginas informativas o pequeñas interacciones pueden seguir siendo útiles, pero no deberían bloquear la migración.

Primero asegúrate de que sabes medir el negocio.

## Crea una propiedad GA4 cuanto antes

Si todavía no tienes una propiedad GA4, este es el momento de crearla.

Dentro de la cuenta de Analytics puedes utilizar el asistente de configuración para añadir una propiedad de Google Analytics 4 y crear un flujo de datos web.

Obtendrás un identificador con un formato similar a:

```text
G-ABCDEFGHIJ
```

Universal Analytics utiliza identificadores del tipo:

```text
UA-12345678-1
```

No los confundas.

Durante un tiempo es normal que la misma web tenga ambos.

## No cambies todavía todos los eventos

Una vez creada la propiedad, la tentación es rehacer inmediatamente toda la medición.

Es mejor empezar por la base:

1. confirmar páginas vistas;
2. comprobar usuarios y sesiones;
3. revisar dominios;
4. observar eventos automáticos;
5. entender la medición mejorada;
6. migrar después las acciones importantes.

GA4 puede recoger automáticamente determinadas interacciones mediante la medición mejorada, por lo que algunos eventos personalizados antiguos quizá ya no necesiten código propio.

Antes de duplicar una medición, comprueba qué está llegando.

## Diseña un periodo de convivencia

Podemos trabajar con una transición sencilla.

### Marzo y abril

Instalar GA4 y comprobar la recogida básica.

### Abril y mayo

Replicar eventos y conversiones prioritarios.

### Junio en adelante

Validar datos, corregir diferencias y empezar a utilizar GA4 en informes habituales.

Universal Analytics puede seguir activo durante todo este proceso.

La fecha anunciada por Google para el final del procesamiento de nuevos hits en propiedades estándar es el **1 de julio de 2023**, así que tenemos margen, pero ese margen será mucho más útil si lo empleamos acumulando datos.

## Crea una hoja de migración

Una hoja sencilla puede evitar que la configuración dependa de la memoria.

Por ejemplo:

| Medición | UA | GA4 | Comprobado |
| --- | --- | --- | --- |
| Page view | Sí | Sí | Sí |
| Solicitud de presupuesto | Objetivo | Evento + conversión | Pendiente |
| Clic teléfono | Evento | Evento | Pendiente |
| Descarga PDF | Evento | Revisar automático | Pendiente |
| Compra | Ecommerce | Ecommerce GA4 | Pendiente |

Añade también quién lo ha comprobado y en qué fecha.

En una web pequeña esto puede parecer excesivo, pero cuando algo deja de medir dentro de seis meses agradecerás tenerlo documentado.

## Ten en cuenta consentimiento y privacidad

No aproveches la migración para añadir más seguimiento sin revisar cómo se gestiona el consentimiento.

Si tu web bloquea Analytics hasta que el usuario acepta las cookies de analítica, GA4 debe respetar el mismo criterio.

Comprueba:

- cuándo se carga la etiqueta;
- qué ocurre si se rechaza analítica;
- si el gestor de consentimiento conoce la nueva etiqueta;
- si tus textos de privacidad necesitan actualizarse.

La migración técnica y la configuración de privacidad deben avanzar juntas.

## No compares todavía cifras como si fueran idénticas

Aunque ambas propiedades midan la misma web, no esperes que usuarios, sesiones, conversiones o tiempos coincidan exactamente.

El modelo es diferente.

Utiliza el periodo paralelo para detectar errores grandes:

- GA4 recibe la mitad del tráfico;
- una sección no envía datos;
- un dominio falta;
- un evento se dispara diez veces;
- el formulario nunca registra la conversión.

Las pequeñas diferencias necesitan contexto antes de considerarse un problema.

## Qué deberías tener al terminar esta primera parte

Todavía no hemos migrado todos los eventos.

Eso es intencionado.

Al terminar deberías tener:

- Universal Analytics todavía activo;
- una propiedad GA4 creada;
- el identificador G- localizado;
- un inventario de etiquetas;
- una lista de objetivos y eventos importantes;
- una hoja de migración;
- un plan para medir en paralelo.

El siguiente paso será instalar correctamente ambas mediciones y comprobar que una no está duplicando a la otra.

**Siguiente tutorial de la serie:** [Cómo instalar GA4 junto a Universal Analytics y medir en paralelo](/instalar-ga4-junto-universal-analytics).
