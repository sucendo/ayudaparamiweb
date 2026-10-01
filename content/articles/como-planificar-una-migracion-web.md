---
title: "Cómo planificar una migración web"
description: "Cómo planificar una migración web con inventario de URLs, redirecciones, entorno de pruebas, copias, SEO, lanzamiento, validación y seguimiento."
excerpt: "Una migración segura documenta lo que cambia, prepara equivalencias y comprueba la nueva versión antes y después de publicarla."
author: "Sucender"
canonical: "/como-planificar-una-migracion-web"
category: "tutoriales"
tags: ["Migración web", "SEO técnico", "Desarrollo web"]
publishedDate: "2021-11-11"
featuredImage: "/img/articulo/como-planificar-una-migracion-web-featured.svg"
heroClass: "bg-orange"
themeColor: "#ee9e2d"
robots: "index,follow"
---
Una migración web puede significar cambiar dominio, plataforma, estructura de URLs, servidor o varias cosas a la vez. Cuantos más elementos cambian simultáneamente, más importante es preparar un inventario y un plan de comprobación.

## Alcance e inventario

### Define exactamente qué cambia
Documenta dominio, protocolo, CMS, alojamiento, estructura de URLs, diseño y contenido. Separar los cambios ayuda a identificar riesgos y facilita encontrar la causa si aparece un problema.

Siempre que sea posible, evita modificar demasiadas variables sin necesidad.

### Haz inventario de la web actual
Guarda un listado de URLs, títulos, canónicas, códigos de respuesta y páginas importantes. Añade datos de tráfico y enlaces si están disponibles.

Este inventario permite comprobar después si alguna página valiosa ha desaparecido o cambiado de destino.

## Redirecciones y pruebas

### Prepara las redirecciones
Cuando una URL cambia, define su equivalente más cercano. Las redirecciones deben llevar a una página que responda a la misma intención, no de forma genérica a la portada.

El mapa debe estar preparado y revisado antes del lanzamiento.

### Monta un entorno de pruebas
Comprueba plantillas, formularios, navegación, búsqueda interna, recursos, canonical, robots y sitemap. El entorno de pruebas no debería quedar abierto a indexación pública.

Haz también una revisión desde móvil y distintos navegadores.

## Plan de lanzamiento

### Planifica copias y reversión
Guarda base de datos, archivos y configuraciones. Define qué pasos permitirían volver a la versión anterior si aparece un problema grave.

Una migración sin plan de reversión obliga a improvisar justo cuando hay más presión.

### Lanza en un momento controlable
Elige una franja en la que el equipo pueda comprobar la web y reaccionar. Evita publicar justo antes de un periodo sin soporte.

Después del cambio, prueba una muestra de URLs antiguas, páginas nuevas y funciones críticas.

### Rastrea la versión publicada
Busca errores de servidor, páginas no encontradas, cadenas de redirección, recursos bloqueados y metadatos incorrectos. Verifica sitemap y robots.

También conviene comprobar manualmente las páginas que más negocio o tráfico aportan.

### Supervisa después de la migración
Durante las siguientes semanas observa errores de rastreo, tráfico orgánico y comportamiento de páginas clave. No todos los problemas aparecen el primer día.

Una buena migración no es la que nunca cambia nada, sino la que conoce cada cambio, conserva equivalencias y puede demostrar que la nueva versión mantiene lo que ya funcionaba.
## Prioridad y evidencia previa

### Clasifica las URLs por importancia
No todas las páginas requieren el mismo nivel de atención. Identifica cuáles reciben tráfico, enlaces, conversiones o tienen una función comercial importante.

Marca también PDFs, imágenes o recursos que reciben enlaces externos. Una migración puede perder activos valiosos aunque las páginas principales parezcan funcionar.

### Conserva una copia del rastreo anterior
Guarda códigos de respuesta, títulos, H1, canonical, indexabilidad y enlaces internos antes del cambio. Esa información permite comparar de forma objetiva con la nueva versión.

Si algo cae después, podrás comprobar si cambió una redirección, una etiqueta o la profundidad de enlazado.

## Mapa de redirecciones y recursos

### Construye el mapa de redirecciones con destino equivalente
Cada URL antigua debe apuntar al contenido que mejor cumple la misma intención. Si una página se ha fusionado, redirige al recurso que la sustituye.

Evita cadenas del tipo antigua → intermedia → nueva. Redirige directamente al destino final siempre que sea posible.

### Comprueba recursos, no solo páginas HTML
CSS, JavaScript, imágenes y fuentes pueden romperse por cambios de rutas o permisos. Revisa consola del navegador y pestaña de red en el entorno de pruebas.

Un error en un recurso común puede afectar a todas las plantillas aunque las URLs respondan con código 200.

## Control del entorno y checklist

### Mantén controlada la indexación del entorno de pruebas
El staging no debería competir con la web pública. Utiliza restricciones de acceso y las medidas adecuadas para evitar que sea indexado.

Antes del lanzamiento, comprueba que esas restricciones no pasan accidentalmente a producción. Es un error sencillo y con consecuencias importantes.

### Prepara una checklist de lanzamiento
Incluye DNS si cambia el dominio, certificados, redirecciones, robots, sitemap, canonicals, analítica, formularios, búsqueda interna y funciones de negocio.

Asigna responsable a cada punto. Una lista sin propietario puede dar una falsa sensación de control.

### Valida muestras de cada tipo de página
No pruebes solo la portada. Revisa categorías, artículos, productos, filtros, formularios y páginas especiales.

Selecciona ejemplos de URLs antiguas y confirma que llegan al destino previsto en un solo salto. Comprueba también páginas que no cambian para detectar regresiones.

## Enlaces, coordinación y seguimiento

### Actualiza enlaces internos al destino final
Aunque una redirección funcione, no conviene mantener enlaces internos apuntando a URLs antiguas. Corrige menús, contenidos y plantillas para enlazar directamente.

Esto reduce saltos, facilita mantenimiento y evita depender indefinidamente de una capa de redirecciones.

### Informa a los equipos implicados
Marketing, atención al cliente y ventas pueden detectar problemas que el equipo técnico no ve. Comunica fecha, alcance y forma de reportar incidencias.

Si cambia una URL utilizada en campañas, firmas o documentos, prepara también esas modificaciones.

### Observa señales durante varias semanas
Rastreo, errores, indexación y tráfico necesitan seguimiento después del día de lanzamiento. Compara por tipos de página y no reacciones a una única variación diaria.

Si aparece un problema, utiliza el inventario anterior para localizar diferencias antes de hacer más cambios simultáneos.

La guía [auditoría SEO paso a paso](/auditoria-seo-paso-a-paso) puede ayudarte a preparar parte de las comprobaciones, y [enlazado interno para SEO](/enlazado-interno-para-seo) resulta útil al revisar rutas internas.

Una migración controlada reduce incertidumbre porque cada URL importante tiene una decisión, cada cambio puede comprobarse y existe una forma clara de volver atrás si algo crítico falla.
