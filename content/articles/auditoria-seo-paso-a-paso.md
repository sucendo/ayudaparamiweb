---
title: "Auditoría SEO paso a paso"
description: "Cómo hacer una auditoría SEO en 2019 revisando rastreo, indexación, estados HTTP, canonicals, contenido, móvil, HTTPS, enlaces y datos de Search Console."
excerpt: "Una auditoría SEO útil conecta cada problema con una URL, una evidencia y una prioridad antes de empezar a aplicar cambios."
author: "Sucender"
canonical: "/auditoria-seo-paso-a-paso"
category: "tutoriales"
tags: ["SEO", "Auditoría SEO", "SEO técnico"]
publishedDate: "2019-11-14"
featuredImage: "/img/articulo/auditoria-seo-paso-a-paso-featured.svg"
heroClass: "bg-red"
themeColor: "#d25565"
robots: "index,follow"
---
Una auditoría SEO sirve para descubrir problemas que impiden que una web sea rastreada, indexada o entendida correctamente, y para ordenar las mejoras según su impacto. El objetivo no es generar una lista interminable de avisos, sino separar los errores críticos de los cambios que pueden esperar.

## Rastreo e indexación

### 1. Comprueba rastreo e indexación
Empieza revisando qué páginas puede rastrear un buscador y cuáles están apareciendo en el índice. Comprueba `robots.txt`, el sitemap XML y las directivas `noindex` antes de buscar problemas más pequeños.

Revisa también si existen páginas importantes que no reciben enlaces internos o se encuentran a demasiados clics de la portada.

### 2. Revisa códigos de estado y redirecciones
Localiza errores 404, respuestas 5xx, cadenas de redirecciones y URLs que redirigen varias veces antes de llegar a su destino. Una migración antigua puede dejar muchos saltos innecesarios.

Las redirecciones deberían llevar a la alternativa más relevante y evitar bucles.

### 3. Comprueba canonicalización y duplicados
Busca páginas accesibles mediante varias URLs, parámetros o versiones con y sin `www`. Las etiquetas canonical ayudan a señalar la versión preferida, pero deben ser coherentes con los enlaces internos y con las redirecciones.

También conviene revisar títulos, descripciones y contenidos excesivamente repetidos.

## Contenido, rendimiento y seguridad

### 4. Analiza títulos, encabezados y contenido
Cada página importante necesita un propósito claro. Revisa que el título describa el tema, que exista una jerarquía lógica de encabezados y que el contenido responda a la búsqueda que intenta cubrir.

No optimices por repetir una palabra clave. Busca claridad, contexto y una estructura fácil de leer.

### 5. Comprueba rendimiento y móvil
Prueba las páginas principales desde conexiones y dispositivos distintos. Imágenes muy pesadas, JavaScript innecesario o un servidor lento pueden afectar tanto a usuarios como al rastreo.

Comprueba que el diseño responsive no oculte contenido importante y que formularios, menús y botones sigan siendo utilizables en pantallas pequeñas.

### 6. Revisa HTTPS y aspectos básicos de seguridad
Asegúrate de que la web carga correctamente por HTTPS y que las versiones antiguas redirigen a una única versión segura. Busca recursos mixtos que todavía se soliciten por HTTP.

Los certificados y las redirecciones deben funcionar en todo el sitio, no solo en la portada.

## Autoridad y datos

### 7. Examina enlazado interno y backlinks
Identifica páginas huérfanas, enlaces rotos y páginas importantes que reciben muy pocos enlaces internos. Después revisa el perfil de enlaces externos para detectar menciones relevantes y posibles patrones artificiales.

No juzgues un backlink únicamente por una métrica. Importan el contexto, la temática y la naturalidad del enlace.

### 8. Contrasta los hallazgos con datos reales
Search Console y Analytics ayudan a distinguir un error teórico de un problema que realmente afecta al tráfico. Revisa páginas que pierden impresiones, consultas relevantes y secciones con comportamiento anómalo.

Una auditoría gana valor cuando conecta el problema técnico con una página y un objetivo concretos.

## Priorización y seguimiento

### Prioriza antes de implementar
Clasifica los hallazgos por impacto, alcance y esfuerzo. Un bloqueo accidental de indexación debe resolverse antes que una descripción mejorable en una página secundaria.

Una lista práctica puede dividirse en:

- crítico: impide rastreo, indexación o acceso;
- alto: afecta a muchas páginas o a una sección importante;
- medio: mejora relevancia, enlazado o experiencia;
- bajo: ajustes menores sin impacto inmediato.

### Repite la auditoría después de los cambios
Una auditoría no termina al entregar un documento. Vuelve a rastrear la web después de implementar cambios y comprueba que no aparecieron nuevos errores.

El resultado útil es una web más fácil de rastrear, entender y utilizar, no un informe con más páginas.
## Sitemaps, robots y parámetros

### 9. Revisa el sitemap con criterio
El sitemap debería contener URLs que realmente quieres facilitar a los buscadores.

Busca redirecciones, errores, páginas bloqueadas o URLs duplicadas. Un sitemap no debe convertirse en un inventario de todo lo que puede generar el servidor.

### 10. Comprueba robots.txt con cuidado
Una regla demasiado amplia puede impedir el rastreo de secciones importantes.

Antes de modificarlo, identifica qué rutas afecta y recuerda que bloquear rastreo no es lo mismo que eliminar una página del índice.

### 11. Revisa parámetros y filtros
En tiendas y catálogos, ordenaciones, filtros y parámetros pueden crear muchas URLs parecidas.

Comprueba cuáles están enlazadas, cuáles reciben rastreo y si existe una versión principal clara. No bloquees todas las variantes sin entender primero para qué sirven.

## Contenido y arquitectura

### 12. Analiza páginas con poco contenido útil
No midas calidad únicamente por número de palabras. Busca URLs que apenas aportan información, páginas duplicadas o listados vacíos.

Decide si deben mejorarse, combinarse o dejar de ser indexables según su función real.

### 13. Revisa las páginas que ya reciben impresiones
Search Console puede mostrar URLs que aparecen en resultados aunque todavía reciban pocos clics.

Estas páginas son buenas candidatas para revisar título, contenido y enlazado antes de crear nuevas URLs sobre el mismo tema.

### 14. Comprueba la arquitectura
Dibuja cómo se relacionan portada, categorías, servicios y contenidos.

Las páginas importantes deberían poder alcanzarse mediante enlaces normales y no depender únicamente del sitemap o del buscador interno.

## Enlaces e imágenes

### 15. Busca enlaces internos hacia errores
Un 404 puede existir por muchas razones, pero si tu propia web sigue enlazándolo estás enviando usuarios y rastreadores a un callejón sin salida.

Corrige el enlace o redirígelo cuando exista un destino equivalente.

### 16. Revisa imágenes
Comprueba tamaño, peso y texto alternativo cuando la imagen transmite información.

No utilices el atributo alt como una lista de palabras clave. Debe describir la función o el contenido de la imagen.

## Documentación y segunda pasada

### 17. Documenta cada cambio
Anota URL, problema, acción y fecha. Si modificas varias cosas a la vez sin registro, será difícil saber qué produjo el resultado.

Conserva una exportación del rastreo inicial para comparar después.

### 18. Haz una segunda pasada
Cuando se implementen correcciones, repite las pruebas principales y comprueba que no se crearon nuevos errores.

Puedes ampliar la parte de enlaces con [enlazado interno para SEO](/enlazado-interno-para-seo).

Una auditoría SEO no termina cuando se detecta un problema. Termina cuando la corrección se verifica y el equipo puede explicar por qué se realizó.

**Para seguir profundizando:** puedes complementar esta revisión con una [auditoría técnica rápida de una web](/auditoria-tecnica-rapida-de-una-web), explorar una [auditoría SEO con IA](/auditoria-seo-con-ia), revisar el estado de [SEO técnico y Core Web Vitals](/seo-tecnico-core-web-vitals-2026) y utilizar el [checklist de lanzamiento web](/checklist-lanzamiento-web-2026) antes de publicar cambios importantes.
