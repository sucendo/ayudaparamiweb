---
title: "Google Analytics 4: primeros pasos"
description: "Primeros pasos con Google Analytics 4: propiedad, flujo web, etiqueta, eventos, conversiones, adquisición, privacidad y validación de datos."
author: "Sucender"
canonical: "/ga4-primeros-pasos"
category: "tutoriales"
tags: ["Analítica web", "GA4"]
publishedDate: "2021-10-14"
featuredImage: "/img/articulo/ga4-primeros-pasos-featured.svg"
heroClass: "bg-green"
themeColor: "#58b391"
excerpt: "Una configuración inicial pequeña, comprobada y documentada es más útil que medir decenas de eventos sin una pregunta clara."
robots: "index,follow"
---
Google Analytics 4 propone un modelo de medición basado en eventos. Para empezar no necesitas configurar decenas de informes: primero asegúrate de que los datos llegan correctamente y de que la propiedad responde a preguntas concretas del negocio.

## Configuración inicial

### Crea o revisa la propiedad
Comprueba zona horaria, moneda y accesos. Una configuración incorrecta puede complicar comparaciones e informes posteriores.

Añade el flujo de datos web y guarda el identificador de medición que utilizará la implementación.

### Instala la etiqueta
La etiqueta puede añadirse directamente al sitio o mediante un gestor de etiquetas. Evita instalarla dos veces, porque duplicaría mediciones.

Después de publicar el cambio, visita la web y utiliza los informes en tiempo real para comprobar que la sesión aparece.

## Eventos y acciones importantes

### Entiende los eventos
En GA4 muchas interacciones se registran como eventos. Algunos se recopilan de forma automática y otros pueden configurarse para representar acciones importantes.

Antes de crear eventos personalizados, define qué preguntas quieres responder. Un nombre consistente ayuda a mantener la medición ordenada.

### Identifica acciones importantes
Formulario enviado, compra, registro o solicitud pueden ser más relevantes que una simple visita. Configura y prueba estas acciones de forma que luego puedan utilizarse para evaluar campañas y páginas.

No marques como importante cualquier clic; reserva esa clasificación para comportamientos ligados a objetivos reales.

## Análisis y documentación

### Revisa adquisición y contenido
Empieza con preguntas sencillas: de dónde llegan las visitas, qué páginas reciben más entradas y qué canales participan en acciones importantes.

Los informes tienen más valor cuando se relacionan con decisiones: mejorar una página, cambiar una campaña o revisar un canal.

### Documenta la configuración
Anota qué etiquetas están instaladas, qué eventos se han creado y qué significan sus nombres. Esta documentación evita confusiones cuando otra persona revise la cuenta.

## Privacidad y validación

### Respeta privacidad y consentimiento
La medición debe ajustarse a la normativa y a la configuración de consentimiento de la web. Evita enviar información personal identificable como parte de URLs o eventos.

### Comprueba antes de confiar en el dato
Prueba formularios, navegación y eventos desde distintos escenarios. Si una cifra cambia de forma extraña, revisa primero la implementación antes de extraer conclusiones.

Una configuración inicial pequeña y bien documentada es más útil que una cuenta llena de eventos que nadie sabe interpretar.
## Preguntas y flujo de datos

### Parte de preguntas de negocio
Antes de configurar informes, escribe qué necesitas saber. ¿Qué canales generan solicitudes? ¿Qué contenidos atraen visitas? ¿Cuántas compras o registros se completan?

Estas preguntas ayudan a decidir qué eventos son importantes y evitan convertir la propiedad en una colección de datos que nadie utiliza.

### Comprueba el flujo de datos
Revisa URL del sitio, identificador de medición y opciones de medición mejorada. Activa únicamente aquello que entiendas y comprueba qué eventos genera.

Después navega por varias páginas y observa tiempo real. La primera prueba debe confirmar algo muy básico: una visita produce los datos esperados una sola vez.

## Implementación y eventos

### Evita instalaciones duplicadas
Una web puede tener la etiqueta insertada por el tema, por un plugin y por un gestor de etiquetas al mismo tiempo. Esto puede duplicar páginas vistas y eventos.

Documenta dónde se carga Analytics y elimina vías redundantes. Cada cambio en la web debería respetar esa única fuente de implementación.

### Diseña nombres de eventos antes de crearlos
Utiliza nombres consistentes y comprensibles. Si dos formularios representan acciones distintas, decide si necesitas un mismo evento con parámetros o eventos separados.

El criterio debe poder explicarse a otra persona. Una hoja con evento, disparador, parámetros y objetivo evita confusiones meses después.

## Conversiones y modelo de datos

### Prueba conversiones de principio a fin
No basta con pulsar el botón de un formulario. Comprueba que la acción ha terminado correctamente y que el evento no se dispara ante errores.

En una compra, contrasta con el pedido real. En un formulario, verifica la recepción o el mensaje de éxito. La analítica debe representar el resultado, no solo la intención de hacer clic.

### Entiende usuario, sesión y evento
GA4 se organiza alrededor de eventos, pero todavía necesitas comprender el contexto en que ocurren. Una persona puede generar múltiples eventos dentro de una sesión y volver otro día.

No compares métricas con modelos anteriores suponiendo que tienen exactamente la misma definición. Antes de explicar una diferencia, revisa cómo calcula GA4 cada dato.

## Campañas y accesos

### Revisa adquisición con etiquetas de campaña
Cuando utilices enlaces en campañas, mantén una nomenclatura consistente para origen, medio y campaña. Variantes de mayúsculas, espacios o nombres distintos pueden fragmentar informes.

Crea una pequeña convención interna para que todas las personas del equipo etiqueten de la misma manera.

### Configura accesos por necesidad
No todos los usuarios necesitan permisos de administración. Asigna el nivel adecuado y revisa cuentas antiguas cuando alguien deja de trabajar en el proyecto.

Evita compartir una misma cuenta entre varias personas. Los accesos individuales facilitan seguridad y trazabilidad.

## Mantenimiento

### Crea una rutina de revisión
Una vez configurado, revisa periódicamente si siguen llegando datos, si las conversiones funcionan y si han aparecido cambios técnicos en la web.

No esperes a descubrir un problema al preparar un informe importante. Una comprobación corta después de publicar formularios, cambios de URL o nuevas campañas evita perder semanas de información.

Si quieres profundizar en el diseño de medición, consulta [GA4: eventos y conversiones](/ga4-eventos-y-conversiones).

La primera configuración de GA4 debe ser comprensible. Empieza con pocos eventos y objetivos bien definidos, valida cada uno y amplía la medición cuando exista una pregunta que lo justifique.

**Para seguir profundizando:** después de configurar la base puedes definir [eventos y conversiones en GA4](/ga4-eventos-y-conversiones), preparar un [dashboard de GA4 para dirección](/dashboard-ga4-para-direccion) y valorar un primer enfoque de [GA4 con BigQuery](/ga4-y-bigquery-primer-enfoque).
