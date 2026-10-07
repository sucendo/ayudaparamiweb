---
title: "Cómo auditar una web antes de empezar a mejorarla"
description: "Tutorial práctico para auditar una web antes de tocar nada: rastreo, indexación, estructura, contenido, rendimiento, enlaces, móvil y medición."
excerpt: "Antes de corregir una web conviene saber qué está fallando, dónde y con qué impacto. Esta auditoría ordena el diagnóstico antes de empezar a cambiar cosas."
author: "Sucender"
canonical: "/auditar-web-antes-de-mejorarla"
category: "tutoriales"
tags: ["SEO", "Auditoría web", "SEO técnico", "Mantenimiento web"]
publishedDate: "2026-09-17"
featuredImage: "/img/articulo/auditar-web-antes-de-mejorarla-featured.svg"
heroClass: "bg-blue"
themeColor: "#47a3da"
robots: "index,follow"
---
Mejorar una web sin haberla revisado antes suele producir un problema muy concreto: empezamos por lo que más se ve, no por lo que más importa. Cambiamos textos, imágenes o diseño mientras una redirección rota, una página bloqueada o un formulario que no envía puede estar causando un daño mayor.

Esta auditoría está pensada como una **primera fotografía del sitio antes de tocar nada**. No pretende sustituir una auditoría SEO exhaustiva ni una revisión de seguridad, sino establecer un orden de trabajo. Al terminar deberías tener tres cosas: una lista de problemas, la evidencia que demuestra cada uno y una idea clara de qué merece atención primero.

## Guarda una referencia antes de cambiar nada

Antes de corregir, documenta el estado actual. Parece burocrático, pero después será la única forma de saber si una mejora realmente funcionó.

Anota al menos:

- fecha de la revisión;
- páginas principales del sitio;
- tráfico orgánico aproximado de las últimas semanas;
- consultas y páginas con más impresiones en Search Console;
- conversiones o acciones importantes;
- rendimiento de algunas URLs representativas;
- errores visibles que ya conozcas.

No necesitas crear un informe enorme. Una hoja con URL, problema, evidencia y observaciones es suficiente para empezar.

Si estás auditando una web de un cliente, añade también el objetivo real del sitio. Una tienda quiere vender; una web de servicios quiere contactos; un medio quiere lectura y recurrencia. Sin ese contexto es fácil priorizar métricas que no tienen relación con el negocio.

## Comprueba que las páginas importantes pueden encontrarse

Empieza por la capa más básica: ¿las páginas que deberían existir están accesibles?

Haz un recorrido manual por la navegación principal y comprueba:

1. que todos los enlaces abren la URL esperada;
2. que no hay secciones importantes escondidas únicamente detrás del buscador interno;
3. que las páginas principales están a una profundidad razonable;
4. que las migas de pan y enlaces contextuales tienen sentido;
5. que el usuario puede volver a categorías o secciones superiores.

Después compara ese recorrido con el sitemap. El sitemap debería contener las URLs canónicas que quieres facilitar a los buscadores, no versiones duplicadas, redirecciones o páginas que ya no deberían indexarse.

Una discrepancia aquí ya es una señal útil: si una URL está en el sitemap pero ningún usuario puede llegar a ella mediante enlaces normales, merece revisión.

## Revisa indexación, robots y canonical antes del contenido

No empieces cambiando títulos si la página ni siquiera puede indexarse correctamente.

Para cada grupo de páginas importante revisa:

- directiva robots;
- presencia de noindex;
- URL canonical;
- código de estado HTTP;
- redirecciones;
- inclusión o exclusión del sitemap.

El objetivo es que todas esas señales cuenten la misma historia. Una página que aparece en el sitemap, declara canonical hacia sí misma y al mismo tiempo incluye noindex está enviando instrucciones contradictorias.

También debes buscar versiones duplicadas: parámetros innecesarios, rutas antiguas, variantes con barra final y cualquier URL alternativa que muestre esencialmente el mismo contenido.

En Ayuda para mi Web ya tenemos utilidades como el [validador de canonical y hreflang](/validador-canonical-hreflang) y el [auditor SEO técnico](/auditor-seo-tecnico), que pueden servir como apoyo en esta parte de la revisión.

## Haz una pasada por títulos, encabezados y propósito de cada URL

Ahora sí entra el contenido.

No revises únicamente si existe un H1. Pregunta qué función cumple cada página y si esa función se entiende al leer su título, encabezado principal y primeros párrafos.

Una revisión práctica consiste en comprobar:

- un propósito principal por URL;
- un título suficientemente descriptivo;
- un H1 coherente con ese propósito;
- H2 y H3 que organicen el contenido de forma lógica;
- ausencia de encabezados utilizados solo por tamaño visual;
- párrafos iniciales que expliquen qué va a encontrar el usuario.

El [analizador de encabezados HTML](/analizador-encabezados-html) puede ayudarte a detectar saltos o jerarquías extrañas, pero la decisión final sigue siendo editorial. Una estructura técnicamente válida puede seguir siendo confusa.

## Busca contenido duplicado, débil o que compite consigo mismo

La siguiente pregunta es si tienes varias páginas intentando resolver lo mismo.

Busca títulos muy parecidos, páginas con la misma intención y contenidos creados en distintos años que se han ido solapando. En esos casos no siempre hay que eliminar. A veces basta con redefinir la intención de cada URL y enlazarlas correctamente.

También localiza páginas que apenas aportan información. No uses un número mínimo de palabras como único criterio. Una página corta puede resolver perfectamente una duda concreta, mientras que otra de dos mil palabras puede repetir lo mismo sin aportar nada.

Marca como candidatos a revisión los contenidos que:

- no tienen una intención clara;
- repiten otro contenido mejor;
- reciben impresiones para consultas distintas de su tema;
- no reciben enlaces internos;
- llevan tiempo sin utilidad aparente;
- incluyen información que ya no representa el servicio o producto actual.

## Comprueba los enlaces internos y los destinos rotos

Los enlaces internos dicen qué páginas consideras relacionadas e importantes. También son una de las formas más fáciles de crear problemas cuando una web lleva años creciendo.

Haz una revisión de:

- enlaces hacia 404;
- redirecciones internas que podrían apuntar ya al destino final;
- anchors poco descriptivos;
- páginas relevantes con muy pocos enlaces entrantes;
- bloques automáticos que enlazan contenidos sin relación real.

Puedes utilizar el [analizador de enlaces HTML](/analizador-enlaces-html) para revisar páginas concretas. Si el sitio es grande, conviene además generar un listado global de enlaces para encontrar patrones.

Un error habitual es arreglar una URL con una redirección y dejar cientos de enlaces internos apuntando a la dirección antigua. La redirección evita el error, pero no corrige la arquitectura.

## Prueba la experiencia móvil como usuario, no solo con una herramienta

Abre el sitio desde un móvil real y completa las acciones importantes.

No te limites a comprobar si "es responsive". Intenta:

- abrir el menú;
- utilizar el buscador;
- completar formularios;
- pulsar botones pequeños;
- cerrar modales;
- cambiar orientación;
- leer una tabla o un bloque de código;
- llegar desde una página de contenido hasta la acción final.

Muchas incidencias móviles no aparecen en un análisis automático porque dependen de interacción, superposición de elementos o decisiones de diseño.

Anota cada problema con una captura o una descripción reproducible. "En móvil se ve mal" no es una tarea accionable; "el botón de enviar queda debajo del aviso de cookies a 390 px de ancho" sí lo es.

## Mide rendimiento en páginas representativas

No midas únicamente la portada. Elige distintos tipos de página: una entrada, una herramienta, una categoría y una página comercial si existe.

Observa especialmente:

- imágenes demasiado pesadas;
- recursos que bloquean el renderizado;
- saltos visuales;
- JavaScript que se carga sin necesidad;
- fuentes y terceros;
- comportamiento en conexión móvil.

El objetivo no es perseguir una puntuación perfecta. Es detectar cuellos de botella que afectan a usuarios reales y saber si se repiten en todo el sitio o solo en una plantilla.

Si una incidencia aparece en cien páginas porque pertenece al layout común, tendrá más prioridad que un detalle menor en una única URL.

## Verifica formularios, búsquedas y funciones que generan valor

Esta parte suele olvidarse en auditorías demasiado centradas en SEO.

Envía un formulario real. Haz una búsqueda. Copia un resultado de una herramienta. Descarga un archivo si existe esa opción. Comprueba que el correo llega y que el usuario recibe una confirmación comprensible.

Una web puede estar perfectamente indexada y aun así perder todo su valor si la acción principal está rota.

Documenta cada flujo con tres estados:

- funciona correctamente;
- funciona con fricción;
- no funciona.

Eso te permitirá separar fallos críticos de mejoras de experiencia.

## Contrasta los problemas con datos antes de priorizar

Hasta aquí has reunido observaciones. Ahora comprueba cuáles tienen impacto real.

Search Console puede ayudarte a detectar páginas con impresiones que pierden clics, consultas inesperadas o URLs que han dejado de aparecer. Analytics puede mostrar entradas con mucho tráfico y poca interacción, caídas de conversión o recorridos que se interrumpen.

No conviertas una métrica aislada en una conclusión. Una página con poco tráfico puede ser crítica si genera contactos de alto valor. Una página con mucho tráfico puede ser secundaria si no ayuda al objetivo del sitio.

## Cierra la auditoría con una lista que se pueda ejecutar

No termines con un documento de cincuenta páginas sin orden. Convierte cada hallazgo en una tarea.

Una fila útil puede incluir:

| URL o área | Problema | Evidencia | Alcance | Esfuerzo estimado |
| --- | --- | --- | --- | --- |
| /servicios | Formulario no confirma envío | Prueba manual | Alto | Bajo |
| Plantilla de artículos | H1 duplicado | Revisión HTML | Global | Medio |
| /guia-antigua | Enlaces a URLs redirigidas | Rastreo interno | Bajo | Bajo |

Todavía no necesitas decidir el orden definitivo. El objetivo de esta primera parte es **diagnosticar sin mezclar diagnóstico y solución**.

## Qué debería quedar al terminar

Una buena auditoría inicial no necesita encontrar absolutamente todo. Necesita permitirte responder con seguridad a cuatro preguntas:

1. ¿Qué está roto?
2. ¿Qué está funcionando pero podría mejorar?
3. ¿Qué afecta a muchas páginas?
4. ¿Qué problemas tienen relación con objetivos reales?

Con esa información ya puedes dejar de trabajar por intuición.

En una próxima entrega veremos el paso que suele resultar más difícil: **cómo convertir esta lista de problemas en un orden de trabajo realista**, para no dedicar una semana a detalles pequeños mientras los problemas de mayor impacto siguen esperando.
