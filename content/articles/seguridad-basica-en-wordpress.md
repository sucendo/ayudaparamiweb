---
title: "Seguridad básica en WordPress: medidas que conviene aplicar"
description: "Medidas básicas para reducir riesgos en WordPress: actualizaciones, usuarios, copias, HTTPS, permisos y control de cambios."
excerpt: "La seguridad de WordPress mejora mucho cuando actualizaciones, accesos, copias y permisos se gestionan de forma constante."
author: "Sucender"
canonical: "/seguridad-basica-en-wordpress"
category: "tutoriales"
tags: ["WordPress", "Seguridad", "Mantenimiento"]
publishedDate: "2020-05-14"
featuredImage: "/img/articulo/seguridad-basica-en-wordpress-featured.svg"
heroClass: "bg-red"
themeColor: "#d25565"
robots: "index,follow"
---
WordPress puede mantenerse de forma segura si se trata como cualquier otra aplicación: necesita actualizaciones, control de accesos, copias de seguridad y una configuración coherente. Muchos incidentes no empiezan con un ataque sofisticado, sino con software antiguo, credenciales débiles o permisos mal gestionados.

## Mantén WordPress, temas y plugins actualizados

Las actualizaciones corrigen errores y, en ocasiones, vulnerabilidades. Antes de actualizar una web importante conviene disponer de una copia y probar cambios sensibles cuando sea posible.

Elimina plugins y temas que ya no se utilizan. Aunque estén desactivados, siguen siendo código almacenado en el servidor y pueden necesitar mantenimiento.

## Instala solo lo necesario

Cada plugin añade código y una nueva dependencia. Utiliza extensiones mantenidas, con una procedencia clara y adecuadas para la versión de WordPress que utilizas.

Evita descargar plugins o temas de fuentes dudosas para conseguir funciones de pago de forma gratuita.

## Protege las cuentas de administración

Cada persona debería tener su propia cuenta y el nivel de permisos que necesita. No compartas una única contraseña de administrador entre todo el equipo.

Utiliza contraseñas largas y únicas. Cuando sea viable, añade autenticación de dos factores mediante una solución compatible.

## Haz copias de seguridad verificables

Una copia solo es útil si puede restaurarse. Incluye base de datos y archivos necesarios, guarda copias fuera del mismo servidor y define una frecuencia acorde al ritmo de cambios.

Prueba periódicamente el procedimiento de restauración.

## Utiliza HTTPS correctamente

El sitio y el acceso de administración deberían funcionar mediante HTTPS. Revisa que no queden recursos cargados por HTTP y renueva los certificados antes de que caduquen.

HTTPS protege la comunicación, pero no sustituye actualizaciones ni control de accesos.

## Revisa permisos y archivos sensibles

Los permisos del sistema de archivos no deben ser más amplios de lo necesario. Protege ficheros de configuración y evita dejar copias de bases de datos o archivos temporales accesibles públicamente.

Deshabilitar funciones innecesarias también reduce superficie de exposición.

## Limita intentos y vigila cambios

Una herramienta de seguridad puede ayudar a detectar accesos sospechosos, cambios de archivos o intentos repetidos de inicio de sesión. Configúrala con cuidado para no bloquear usuarios legítimos ni consumir recursos excesivos.

## Protege también el hosting y el correo

La seguridad de WordPress depende del entorno. La cuenta del hosting, el dominio y el correo asociado a recuperación de contraseñas deben estar igualmente protegidos.

## Ten un procedimiento para incidentes

Si la web se ve comprometida, evita limitarte a borrar el síntoma visible. Cambia credenciales, identifica el origen, revisa archivos y usuarios, corrige la vulnerabilidad y restaura desde una copia limpia cuando sea necesario.

La seguridad básica funciona como mantenimiento continuo: pequeñas medidas constantes reducen mucho el riesgo de un problema grave.
