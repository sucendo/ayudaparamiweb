---
title: "Mi web WordPress ha sido hackeada: cómo solucionarlo paso a paso"
description: "Cómo recuperar una web WordPress hackeada: aislar el sitio, conservar una copia, cambiar accesos, limpiar archivos y base de datos y comprobar que no reaparece."
excerpt: "Una recuperación fiable no consiste solo en borrar el archivo sospechoso: hay que cerrar el acceso utilizado, limpiar la instalación y verificar después que la infección no vuelve."
author: "Sucender"
canonical: "/mi-web-wordpress-ha-sido-hackeada"
category: "tutoriales"
tags: ["WordPress", "Seguridad web", "Web hackeada", "Malware", "Errores web"]
publishedDate: "2024-02-02"
featuredImage: "/img/articulo/mi-web-wordpress-ha-sido-hackeada-featured.svg"
heroClass: "bg-red"
themeColor: "#d25565"
robots: "index,follow"
---
<p>Una de las peores sensaciones cuando gestionas una web es darte cuenta de que algo no va bien: redirecciones extrañas, contenido que no has creado, usuarios desconocidos o incluso la web completamente caída. En muchos casos, estos síntomas indican que el sitio ha sido comprometido.</p>

<p>WordPress es un sistema muy extendido y dispone de un ecosistema enorme de temas y plugins. Precisamente por eso conviene reaccionar con método: recuperar el control, conservar pruebas suficientes para entender qué ha ocurrido y cerrar la vía de entrada antes de volver a dar la web por limpia.</p>

<blockquote>
<p>Una web hackeada se puede recuperar, pero borrar únicamente el síntoma visible no garantiza que el acceso utilizado por el atacante haya quedado cerrado.</p>
</blockquote>

<h2>Cómo saber si tu web ha sido hackeada</h2>

<p>Antes de actuar, conviene confirmar el alcance. Algunos síntomas habituales son:</p>

<ul>
<li>Redirecciones a páginas externas sospechosas.</li>
<li>Aparición de contenido, enlaces o páginas que no has creado.</li>
<li>Usuarios administradores desconocidos.</li>
<li>Alertas del navegador, Google, Search Console o el proveedor de hosting.</li>
<li>Archivos modificados sin una actualización conocida.</li>
<li>Caídas repentinas, errores inesperados o un aumento extraño de consumo.</li>
</ul>

<p>Un único error no demuestra por sí solo que exista malware. Revisa también los registros del servidor y los cambios recientes para diferenciar una intrusión de un fallo normal de la aplicación.</p>

<h2>1. Aísla el problema sin destruir pruebas</h2>

<p>Si la web está sirviendo contenido malicioso, puedes activar temporalmente mantenimiento o limitar el acceso mientras investigas. El objetivo es reducir el impacto sobre visitantes sin empezar a borrar archivos a ciegas.</p>

<p>Antes de limpiar, guarda una copia de los archivos y de la base de datos tal como están. Esa copia no debe utilizarse después como respaldo limpio, pero puede ser útil para comparar modificaciones, identificar la vía de entrada o recuperar información que se borre por error durante la reparación.</p>

<p>Si la web gestiona pedidos, formularios o cuentas, anota también la hora aproximada en la que detectaste el problema para saber qué datos recientes podrían necesitar una revisión especial.</p>

<h2>2. Cambia credenciales y cierra sesiones</h2>

<p>No cambies únicamente la contraseña de WordPress. Si un atacante obtuvo acceso a otra capa, podría volver a entrar aunque el panel quede protegido.</p>

<ul>
<li>Usuarios administradores de WordPress.</li>
<li>Panel de hosting.</li>
<li>FTP o, preferiblemente, SFTP/SSH si lo utilizas.</li>
<li>Base de datos.</li>
<li>Correo asociado a recuperación de contraseñas.</li>
<li>Claves de servicios externos vinculados a la web, cuando exista riesgo de exposición.</li>
</ul>

<p>Revisa además los usuarios administradores y elimina o bloquea cualquier cuenta que no reconozcas. En WordPress también puedes renovar las claves y salts de autenticación de <code>wp-config.php</code> para invalidar sesiones existentes.</p>

<h2>3. Localiza la posible vía de entrada</h2>

<p>Una limpieza fiable necesita responder a una pregunta: ¿cómo pudo modificarse la web? Entre los orígenes frecuentes están plugins o temas vulnerables, software desactualizado, contraseñas comprometidas, cuentas antiguas o permisos incorrectos.</p>

<p>Revisa qué se instaló o actualizó recientemente, las fechas de modificación de archivos y los logs disponibles. Si identificas un plugin abandonado o una extensión que ya no necesitas, no la reinstales después de limpiar.</p>

<h2>4. Sustituye archivos del núcleo por copias limpias</h2>

<p>En lugar de intentar reconocer manualmente cada fichero del núcleo de WordPress, suele ser más seguro sustituirlo por una copia limpia de la misma versión o actualizar a una versión compatible una vez controlado el incidente.</p>

<p>No sobrescribas <code>wp-content</code> ni <code>wp-config.php</code> sin revisar, porque ahí viven contenido, configuración y extensiones. Comprueba especialmente:</p>

<ul>
<li><code>wp-content/plugins/</code> y <code>wp-content/themes/</code>.</li>
<li>Archivos PHP inesperados dentro de <code>uploads</code>.</li>
<li>Modificaciones recientes en <code>.htaccess</code>.</li>
<li>Código ofuscado o inclusiones hacia dominios desconocidos.</li>
<li>Ficheros que reaparecen después de borrarlos.</li>
</ul>

<p>Siempre que sea posible, reinstala plugins y temas desde su fuente legítima en lugar de conservar archivos dudosos.</p>

<h2>5. Revisa también la base de datos</h2>

<p>El malware no tiene por qué vivir únicamente en archivos. Puede haber usuarios creados, JavaScript insertado en entradas, opciones modificadas o redirecciones almacenadas en la base de datos.</p>

<p>Revisa usuarios, contenido reciente y opciones relacionadas con la URL del sitio, widgets o código añadido por plugins. No ejecutes reemplazos masivos sin una copia: una consulta incorrecta puede dañar contenido legítimo.</p>

<h2>6. Busca mecanismos de persistencia</h2>

<p>Uno de los motivos por los que una infección vuelve es que se elimina el archivo visible pero queda otra puerta preparada para regenerarlo. Comprueba usuarios, tareas programadas, archivos cargados automáticamente y extensiones que no reconozcas.</p>

<p>Si un archivo malicioso reaparece a los pocos minutos, deja de borrarlo repetidamente y busca qué proceso lo está creando.</p>

<h2>7. Actualiza y reduce superficie de ataque</h2>

<p>Cuando tengas una instalación limpia, actualiza WordPress, plugins y tema a versiones compatibles y mantenidas. Elimina extensiones desactivadas que no vayas a utilizar y temas antiguos innecesarios.</p>

<p>Utiliza contraseñas únicas, activa autenticación en dos pasos cuando tu solución de acceso lo permita y limita los permisos de cada usuario a lo que realmente necesita.</p>

<h2>8. Comprueba Search Console y el impacto SEO</h2>

<p>Si Google ha detectado contenido engañoso, páginas inyectadas o descargas peligrosas, revisa los avisos de seguridad de Search Console después de limpiar. Comprueba también si se han creado URLs extrañas que todavía aparecen indexadas.</p>

<p>No solicites una revisión hasta estar razonablemente seguro de que la causa está solucionada. Si las páginas maliciosas ya no existen, devuelve el estado HTTP adecuado y corrige enlaces o redirecciones que el ataque pudiera haber añadido.</p>

<h2>9. Verifica la recuperación antes de cerrar el incidente</h2>

<p>No des por terminada la limpieza porque la portada vuelva a cargar. Durante los días siguientes revisa:</p>

<ul>
<li>Logs y nuevos errores.</li>
<li>Usuarios y cambios inesperados.</li>
<li>Formularios, correo, carrito o funciones críticas.</li>
<li>Archivos que vuelvan a aparecer.</li>
<li>Alertas del hosting o de Search Console.</li>
<li>Copias de seguridad generadas después de confirmar que la instalación está limpia.</li>
</ul>

<p>Haz una nueva copia cuando el sitio ya esté validado. Esa sí podrá servir como punto de recuperación conocido para futuras incidencias.</p>

<h2>Cuándo restaurar una copia de seguridad</h2>

<p>Restaurar puede ser la opción más segura si conoces una copia anterior al compromiso. Antes de hacerlo, valora cuánto contenido o cuántos pedidos se perderían y conserva aparte los datos recientes que necesites recuperar.</p>

<p>Una restauración por sí sola tampoco cierra la vulnerabilidad. Después tendrás que actualizar, cambiar credenciales y corregir la causa que permitió el acceso.</p>

<h2>Cuándo merece la pena pedir ayuda</h2>

<p>Si la web gestiona ventas, datos de clientes o procesos importantes y no puedes determinar cómo entró el atacante, es mejor evitar experimentos sobre la única copia disponible. Un profesional puede ayudar a conservar datos, revisar logs y confirmar que la limpieza no se limita al síntoma visible.</p>

<p>Para prevenir problemas similares una vez recuperado el sitio, puedes continuar con <a href="/seguridad-basica-en-wordpress">Seguridad básica en WordPress</a> y <a href="/mantenimiento-web-proactivo">Mantenimiento web proactivo</a>.</p>

<h2>En resumen: recuperar, cerrar la entrada y comprobar</h2>

<p>Una recuperación completa tiene tres partes: devolver la web a un estado limpio, cerrar la vía que permitió el acceso y observar después que la infección no reaparece. Saltarse cualquiera de ellas aumenta el riesgo de volver al mismo punto pocos días después.</p>

<p>Actuar rápido es importante, pero actuar de forma ordenada lo es todavía más. Guarda una copia antes de tocar, cambia los accesos, reinstala desde fuentes limpias, revisa archivos y base de datos y valida la web durante los días siguientes.</p>
