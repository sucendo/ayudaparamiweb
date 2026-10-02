---
title: "Rendimiento web: qué medir y cómo interpretar los datos"
excerpt: "Las métricas de rendimiento sirven para localizar el origen de una mala experiencia, no para perseguir una puntuación aislada."
description: "Qué medir en rendimiento web en 2021: TTFB, LCP, FID, CLS, peso, peticiones, JavaScript, caché y diferencias entre laboratorio y usuarios reales."
author: "Sucender"
canonical: "/rendimiento-web-que-medir"
category: "tutoriales"
tags: ["Rendimiento web", "Analítica web", "SEO técnico"]
publishedDate: "2021-08-12"
featuredImage: "/img/articulo/rendimiento-web-que-medir-featured.svg"
heroClass: "bg-yellow"
themeColor: "#f1c40f"
robots: "index,follow"
---
Medir rendimiento web no consiste en perseguir una única puntuación. Cada métrica describe una parte distinta de la experiencia: cuánto tarda el servidor en responder, cuándo aparece el contenido principal, si la página se mueve mientras carga y cuánto tarda en reaccionar al usuario.

## Métricas principales

### Empieza por el tiempo de respuesta del servidor
El **TTFB** ayuda a detectar retrasos antes de que el navegador pueda empezar a construir la página. Un valor alto puede indicar problemas de hosting, aplicación, base de datos, caché o red.

No lo interpretes aislado: una respuesta rápida no garantiza que la página termine de cargar bien.

### Observa cuándo aparece el contenido principal
**Largest Contentful Paint (LCP)** mide el momento en que se muestra el elemento de contenido más grande visible en la zona inicial. Imágenes hero pesadas, fuentes, CSS bloqueante o una respuesta lenta del servidor pueden empeorarlo.

Mide varias páginas y no solo la portada, porque cada plantilla puede tener cuellos de botella diferentes.

### Controla la estabilidad visual
**Cumulative Layout Shift (CLS)** refleja movimientos inesperados durante la carga. Reservar espacio para imágenes, anuncios y componentes dinámicos ayuda a evitar que botones o textos cambien de posición mientras el usuario intenta interactuar.

### Ten en cuenta la capacidad de respuesta
En el contexto de Core Web Vitals de 2021, **First Input Delay (FID)** ayuda a observar el retraso entre la primera interacción y la respuesta del navegador. Un exceso de JavaScript ejecutándose en el hilo principal puede aumentar ese retraso.

## Métricas de diagnóstico

### No olvides métricas de diagnóstico
Tiempo total de carga, peso transferido, número de peticiones, uso de caché, tiempo de ejecución de JavaScript y tamaño de imágenes permiten explicar por qué una métrica de experiencia es mala.

Estas métricas son especialmente útiles durante el desarrollo, aunque el usuario final no vea sus nombres.

## Cómo medir y comparar

### Laboratorio y datos reales no son lo mismo
Las pruebas de laboratorio se ejecutan en condiciones controladas y sirven para reproducir problemas. Los datos de usuarios reales dependen de dispositivos, redes y comportamiento variados.

Utiliza ambos: el laboratorio para diagnosticar y los datos reales para comprobar si el cambio mejora la experiencia de verdad.

### Compara páginas equivalentes
Agrupa por plantilla: home, categorías, fichas, artículos o checkout. Comparar páginas con funciones muy distintas puede ocultar el origen del problema.

### Relaciona rendimiento con negocio
Si mejoras una página, observa también rebote, conversión, finalización de formularios o ventas cuando corresponda. La velocidad es un medio para ofrecer una experiencia mejor, no un objetivo aislado.

Un cuadro de rendimiento útil contiene pocas métricas, mediciones repetibles y contexto suficiente para saber qué cambiar cuando aparece una regresión.
## Diseña la muestra

### Define una muestra de páginas
No necesitas medir cada URL para empezar. Elige ejemplos de las plantillas principales: portada, artículo, categoría, producto y formulario.

Si una plantilla presenta resultados muy distintos, amplía la muestra dentro de ese grupo.

## Diagnóstico por métrica

### TTFB: separa backend y red
Un tiempo alto antes del primer byte puede venir del servidor, la aplicación, la base de datos o la distancia de red.

Haz varias pruebas y compara páginas estáticas y dinámicas. Si solo determinadas páginas tardan, busca consultas o procesos específicos.

### LCP: identifica el elemento concreto
La métrica mejora más cuando sabes qué elemento la provoca. Puede ser una imagen principal, un bloque de texto o un banner.

Si es una imagen, revisa dimensiones y prioridad. Si es texto, observa fuentes y CSS que puedan retrasar su pintura.

### FID: busca tareas largas
El retraso de interacción suele relacionarse con JavaScript que mantiene ocupado el hilo principal.

Revisa scripts de terceros, librerías y componentes que ejecutan mucho trabajo al inicio. Dividir tareas o retrasar funciones secundarias puede liberar el navegador.

### CLS: reserva espacio
Define dimensiones para imágenes, anuncios y elementos que llegan de forma asíncrona.

Comprueba también banners y mensajes que aparecen por encima del contenido. Si empujan la página cuando el usuario ya está leyendo, aumentan la inestabilidad.

## Recursos y caché

### Peso total y número de peticiones
Estas cifras no describen por sí solas la experiencia, pero ayudan a explicar problemas.

Una web puede tener muchas peticiones pequeñas y funcionar bien, mientras otra carga pocos archivos enormes. Utiliza el dato como diagnóstico, no como objetivo independiente.

### JavaScript ejecutado
No basta con medir kilobytes descargados. Un script comprimido puede consumir bastante tiempo de CPU.

Prueba en dispositivos menos potentes, especialmente si tu público navega desde móvil. Un ordenador rápido puede ocultar el coste real.

### Caché
Compara primera visita y visita repetida. Recursos estáticos deberían poder reutilizarse cuando no han cambiado.

Si todo se descarga de nuevo, revisa cabeceras y estrategia de versionado.

## Laboratorio y usuarios reales

### Datos de laboratorio
Son útiles para reproducir una condición y comparar antes y después. Mantén el mismo dispositivo y configuración cuando quieras evaluar una optimización.

Una sola ejecución puede variar, así que repite y busca patrones.

### Datos de usuarios reales
Reflejan diversidad de redes, dispositivos y ubicaciones. Su ventaja es representar experiencia real; su limitación es que necesitan volumen y tiempo para mostrar cambios.

Combina ambos enfoques con [SEO y Core Web Vitals](/seo-y-core-web-vitals) para profundizar en LCP, FID y CLS.

Medir rendimiento sirve para responder “qué está frenando esta página” y “ha mejorado después del cambio”. Si una métrica no ayuda a tomar una decisión, probablemente no necesita ocupar el centro del informe.
