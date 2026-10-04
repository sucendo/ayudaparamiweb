---
title: "Seguridad básica en WordPress: medidas que conviene aplicar"
description: "Seguridad básica en WordPress: actualizaciones, plugins, usuarios, contraseñas, copias, HTTPS, permisos, hosting, registros y respuesta ante incidentes."
excerpt: "La mayor parte de la seguridad cotidiana depende de mantener software, accesos y copias bajo control."
author: "Sucender"
canonical: "/seguridad-basica-en-wordpress"
category: "guias"
tags: ["WordPress", "Seguridad web", "Mantenimiento web"]
publishedDate: "2020-05-14"
featuredImage: "/img/articulo/seguridad-basica-en-wordpress-featured.svg"
heroClass: "bg-red"
themeColor: "#d25565"
robots: "index,follow"
---
WordPress puede mantenerse de forma segura si se trata como cualquier otra aplicación: necesita actualizaciones, control de accesos, copias de seguridad y una configuración coherente. Muchos incidentes no empiezan con un ataque sofisticado, sino con software antiguo, credenciales débiles o permisos mal gestionados.

## Actualizaciones y superficie de ataque

### Mantén WordPress, temas y plugins actualizados
Las actualizaciones corrigen errores y, en ocasiones, vulnerabilidades. Antes de actualizar una web importante conviene disponer de una copia y probar cambios sensibles cuando sea posible.

Elimina plugins y temas que ya no se utilizan. Aunque estén desactivados, siguen siendo código almacenado en el servidor y pueden necesitar mantenimiento.

### Instala solo lo necesario
Cada plugin añade código y una nueva dependencia. Utiliza extensiones mantenidas, con una procedencia clara y adecuadas para la versión de WordPress que utilizas.

Evita descargar plugins o temas de fuentes dudosas para conseguir funciones de pago de forma gratuita.

## Accesos, copias y configuración

### Protege las cuentas de administración
Cada persona debería tener su propia cuenta y el nivel de permisos que necesita. No compartas una única contraseña de administrador entre todo el equipo.

Utiliza contraseñas largas y únicas. Cuando sea viable, añade autenticación de dos factores mediante una solución compatible.

### Haz copias de seguridad verificables
Una copia solo es útil si puede restaurarse. Incluye base de datos y archivos necesarios, guarda copias fuera del mismo servidor y define una frecuencia acorde al ritmo de cambios.

Prueba periódicamente el procedimiento de restauración.

### Utiliza HTTPS correctamente
El sitio y el acceso de administración deberían funcionar mediante HTTPS. Revisa que no queden recursos cargados por HTTP y renueva los certificados antes de que caduquen.

HTTPS protege la comunicación, pero no sustituye actualizaciones ni control de accesos.

### Revisa permisos y archivos sensibles
Los permisos del sistema de archivos no deben ser más amplios de lo necesario. Protege ficheros de configuración y evita dejar copias de bases de datos o archivos temporales accesibles públicamente.

Deshabilitar funciones innecesarias también reduce superficie de exposición.

### Limita intentos y vigila cambios
Una herramienta de seguridad puede ayudar a detectar accesos sospechosos, cambios de archivos o intentos repetidos de inicio de sesión. Configúrala con cuidado para no bloquear usuarios legítimos ni consumir recursos excesivos.

## Infraestructura y respuesta a incidentes

### Protege también el hosting y el correo
La seguridad de WordPress depende del entorno. La cuenta del hosting, el dominio y el correo asociado a recuperación de contraseñas deben estar igualmente protegidos.

### Ten un procedimiento para incidentes
Si la web se ve comprometida, evita limitarte a borrar el síntoma visible. Cambia credenciales, identifica el origen, revisa archivos y usuarios, corrige la vulnerabilidad y restaura desde una copia limpia cuando sea necesario.

La seguridad básica funciona como mantenimiento continuo: pequeñas medidas constantes reducen mucho el riesgo de un problema grave.
## Cuentas y recuperación

### Cambia los accesos por defecto cuando sea necesario
No necesitas ocultar WordPress para que sea seguro, pero sí evitar credenciales previsibles y cuentas compartidas.

Si existe un usuario administrador antiguo que ya no debe utilizarse, crea primero una cuenta individual correcta, transfiere contenido si hace falta y elimina el acceso anterior.

### Revisa usuarios periódicamente
Con el tiempo se acumulan cuentas de proveedores, empleados y colaboradores. Comprueba cuáles siguen necesitando acceso.

Asigna roles con el mínimo permiso necesario. Una persona que solo publica entradas no necesita controlar plugins o configuración.

### Protege el correo de recuperación
El correo asociado a la administración puede utilizarse para restablecer contraseñas. Si esa cuenta se ve comprometida, proteger WordPress por separado servirá de poco.

Utiliza una contraseña distinta y autenticación adicional cuando el proveedor lo permita.

## Copias y vigilancia

### Copias fuera del mismo servidor
Si todas las copias están en el mismo alojamiento y el servidor falla o resulta comprometido, puedes perder original y respaldo a la vez.

Mantén al menos una copia en una ubicación diferente y comprueba que el proceso se completa correctamente.

### No dejes copias públicas
Archivos ZIP, exportaciones de base de datos y copias temporales no deberían quedar accesibles desde la web.

Después de una migración o reparación, elimina ficheros que ya no sean necesarios y revisa que no puedan descargarse conociendo su nombre.

### Registros y cambios inesperados
Los logs del servidor y determinadas herramientas pueden ayudar a detectar accesos o modificaciones fuera de lo habitual.

No hace falta vigilar cada petición manualmente. Lo importante es disponer de información suficiente para investigar cuando aparece un problema.

## Funciones y entornos

### XML-RPC y funciones que no utilizas
WordPress incluye funciones que pueden ser necesarias para determinados servicios. Antes de desactivar algo por una recomendación genérica, comprueba si tu web lo utiliza.

La seguridad mejora más con decisiones informadas que aplicando listas de cambios sin entender su efecto.

### Entorno de pruebas
Si haces cambios importantes, un staging permite probar actualizaciones sin afectar a clientes.

Protege también ese entorno. Una copia de la web con contraseñas débiles o acceso público puede convertirse en otro punto de entrada.

## Proveedor y plan de recuperación

### Proveedor de hosting
Pregunta cómo gestiona actualizaciones del servidor, copias, aislamiento de cuentas y soporte ante incidentes.

Una buena configuración de WordPress no puede compensar completamente un entorno de servidor mal mantenido.

### Plan de recuperación
Anota dónde están las copias, quién puede acceder al dominio y hosting y qué pasos permitirían restaurar una versión limpia.

No esperes a una incidencia para descubrir que la única persona con las credenciales está de vacaciones.

Si ya existe un problema, [mi web WordPress ha sido hackeada](/mi-web-wordpress-ha-sido-hackeada) desarrolla un procedimiento de recuperación.

La seguridad efectiva suele ser poco espectacular: actualizar, limitar accesos, guardar copias y revisar cambios. Esa disciplina reduce muchos de los incidentes más comunes.
