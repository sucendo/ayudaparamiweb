---
title: "Mi web no carga: qué revisar en los primeros 10 minutos"
description: "Qué hacer cuando una web deja de cargar: comprobar alcance, error, hosting, cambios recientes, plugins, logs, base de datos, .htaccess, dominio y DNS."
excerpt: "Un diagnóstico rápido debe empezar por confirmar si el fallo es global y localizar qué cambió antes de tocar varios componentes a la vez."
author: "Sucender"
canonical: "/mi-web-no-carga-que-hacer-10-minutos"
category: "tutoriales"
tags: []
publishedDate: "2018-01-01"
featuredImage: "/img/articulo/mi-web-no-carga-que-hacer-10-minutos-featured.svg"
heroClass: "bg-red"
themeColor: "#d25565"
robots: "index,follow"
---
<p>Uno de los momentos más incómodos para cualquier persona que gestiona una web es abrirla y comprobar que no carga. Puede quedarse en blanco, mostrar un error o simplemente tardar demasiado en responder.</p>

<p>En ese momento es fácil entrar en pánico, pero lo más importante es actuar con calma y seguir un proceso claro. En muchos casos, el problema se puede detectar en pocos minutos si sabes dónde mirar.</p>

<blockquote>
<p>Cuando una web no carga, lo importante no es reaccionar rápido, sino reaccionar con método.</p>
</blockquote>

<h2>1. Comprueba si la web está caída para todos</h2>

<p>Antes de hacer nada, lo primero es confirmar si el problema es global o solo afecta a tu conexión.</p>

<p>Prueba a acceder desde:</p>

<ul>
<li>Otro dispositivo</li>
<li>Otra red (datos móviles)</li>
<li>Herramientas externas de comprobación</li>
</ul>

<p>Si solo falla en tu equipo, puede ser un problema local.</p>

<h2>2. Revisa el tipo de error</h2>

<p>No es lo mismo un error 500 que un error de conexión o una página en blanco. Cada uno apunta a un problema distinto.</p>

<ul>
<li>Error 500 → fallo interno del servidor</li>
<li>Error 404 → página no encontrada</li>
<li>Timeout → servidor lento o caído</li>
<li>Pantalla en blanco → error de código</li>
</ul>

<p>Identificar el tipo de error te ahorra mucho tiempo.</p>

<h2>3. Comprueba el hosting</h2>

<p>Muchos problemas vienen directamente del servidor. Puede estar caído, saturado o con incidencias.</p>

<p>Accede al panel de tu hosting y revisa:</p>

<ul>
<li>Estado del servidor</li>
<li>Consumo de recursos</li>
<li>Alertas o incidencias</li>
</ul>

<p>Si el problema está ahí, no tiene sentido tocar la web todavía.</p>

<h2>4. Revisa cambios recientes</h2>

<p>En la mayoría de casos, algo ha cambiado antes de que la web deje de funcionar.</p>

<ul>
<li>Actualización de plugins</li>
<li>Cambio de theme</li>
<li>Modificación de código</li>
<li>Instalación de módulos</li>
</ul>

<p>Identificar ese cambio puede darte la solución directamente.</p>

<h2>5. Desactiva plugins o módulos</h2>

<p>Si usas WordPress o PrestaShop, uno de los fallos más comunes está en plugins o módulos.</p>

<p>Desactívalos temporalmente y comprueba si la web vuelve a funcionar.</p>

<pre><code>Checklist rápido:
- Desactivar plugins
- Revisar theme
- Comprobar hosting
- Analizar error
- Revisar logs</code></pre>

<h2>6. Activa modo debug o revisa logs</h2>

<p>Cuando el error no es evidente, los logs son la mejor herramienta.</p>

<p>Ahí puedes ver:</p>

<ul>
<li>Errores de código</li>
<li>Archivos que fallan</li>
<li>Problemas de base de datos</li>
</ul>

<p>Esto te da información real sobre el problema.</p>

<h2>7. Comprueba la base de datos</h2>

<p>Si la base de datos falla, la web no podrá cargar correctamente.</p>

<p>Revisa que:</p>

<ul>
<li>La conexión es correcta</li>
<li>No hay errores en tablas</li>
<li>El servidor responde</li>
</ul>

<h2>8. Revisa el archivo .htaccess</h2>

<p>Un error en este archivo puede bloquear toda la web.</p>

<p>Renómbralo temporalmente y prueba de nuevo.</p>

<h2>9. Comprueba el dominio y DNS</h2>

<p>A veces el problema no es la web, sino el dominio.</p>

<ul>
<li>DNS mal configurado</li>
<li>Dominio caducado</li>
<li>Propagación incorrecta</li>
</ul>

<p>Esto puede hacer que la web no cargue aunque el servidor funcione.</p>

<h2>10. Actúa con orden y sin tocar todo a la vez</h2>

<p>Uno de los errores más comunes es hacer múltiples cambios sin control. Esto complica el diagnóstico.</p>

<p>Ve paso a paso y comprueba cada cambio.</p>

<blockquote>
<p>Resolver rápido no significa hacer muchas cosas, sino hacer las correctas en orden.</p>
</blockquote>

<h2>En resumen</h2>

<p>Cuando una web no carga, la situación puede parecer crítica, pero en muchos casos se puede resolver en poco tiempo si se sigue un proceso claro.</p>

<p>Revisar hosting, errores, cambios recientes y logs suele ser suficiente para detectar el problema.</p>

<p>Si no quieres perder tiempo o necesitas una solución rápida, puedes <a href="/contacto">contactar conmigo</a> y reviso tu web para solucionarlo cuanto antes.</p>

<p>En <a href="/">Ayuda para mi Web</a> puedes encontrar más guías prácticas para resolver errores reales.</p>
<h2>Antes de tocar archivos, guarda una copia</h2>

<p>Si todavía puedes acceder al hosting, descarga los archivos que vayas a modificar y evita sobrescribir configuraciones sin posibilidad de volver atrás.</p>

<p>Una reparación urgente no debería crear un segundo problema por no conservar el estado anterior.</p>

<h2>Comprueba si afecta a una página o a toda la web</h2>

<p>Prueba la portada, una URL interna y, si existe, el panel de administración. Esta diferencia ayuda a reducir el diagnóstico.</p>

<p>Si solo falla una página, puede tratarse de una plantilla, contenido o regla concreta. Si todo falla, hosting, configuración o aplicación ganan importancia.</p>

<h2>Mira la hora exacta en que empezó</h2>

<p>Relaciona el inicio con actualizaciones, cambios de DNS, despliegues o tareas realizadas poco antes.</p>

<p>Revisar primero lo que cambió suele ser más efectivo que probar soluciones genéricas.</p>

<h2>No muestres errores detallados a visitantes</h2>

<p>La depuración puede aportar información útil, pero los mensajes técnicos no deberían permanecer visibles públicamente.</p>

<p>Activa el modo de diagnóstico solo durante la investigación y vuelve a la configuración normal al terminar.</p>

<h2>Comprueba espacio y límites del alojamiento</h2>

<p>Un servidor sin espacio puede dejar de escribir sesiones, caché o registros. Revisa también límites de recursos si el panel los muestra.</p>

<p>Si existe una incidencia general del proveedor, espera su resolución antes de modificar la aplicación.</p>

<h2>DNS requiere paciencia y comprobación</h2>

<p>Si has cambiado recientemente registros o servidores de nombres, verifica que los valores sean correctos y que no exista una configuración antigua mezclada.</p>

<p>No hagas cambios sucesivos cada pocos minutos: puedes dificultar saber qué configuración es la correcta.</p>

<h2>Documenta lo que pruebas</h2>

<p>Anota cada cambio y resultado. Si renombrar un plugin no cambia nada, vuelve al estado anterior antes de probar el siguiente paso.</p>

<p>Este método permite avanzar sin acumular modificaciones y facilita pedir ayuda aportando información concreta.</p>

<h2>Cuándo restaurar una copia</h2>

<p>Si identificas que un cambio reciente ha dañado archivos o base de datos y dispones de una copia fiable, restaurar puede ser más seguro que reparar manualmente muchas piezas.</p>

<p>Comprueba la fecha de la copia para no perder pedidos, formularios o contenido reciente sin saberlo.</p>

<h2>Después de recuperar la web</h2>

<p>No cierres la incidencia en cuanto vuelva a cargar. Revisa logs, identifica la causa y comprueba las funciones principales.</p>

<p>Una web que vuelve a responder pero mantiene el origen del fallo puede caer de nuevo.</p>

<p>Si el servidor devuelve específicamente un fallo interno, consulta también <a href="/error-500-solucion-rapida-5-pasos">Error 500: solución rápida en 5 pasos</a>.</p>

<p>Los primeros diez minutos sirven para reducir posibilidades, no para probar todo. Confirmar alcance, revisar cambios recientes y leer el error correcto suele llevar mucho más rápido al origen.</p>
