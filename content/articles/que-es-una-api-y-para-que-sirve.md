---
title: "Qué es una API y para qué sirve"
description: "Qué es una API, cómo se comunican dos sistemas y qué conceptos básicos intervienen: endpoints, métodos HTTP, JSON, autenticación, errores y límites."
excerpt: "Una API define un contrato para que dos aplicaciones intercambien datos o ejecuten acciones sin acceder directamente a su lógica interna."
author: "Sucender"
canonical: "/que-es-una-api-y-para-que-sirve"
category: "tutoriales"
tags: ["Programación", "Desarrollo web", "Tecnología"]
publishedDate: "2021-03-11"
featuredImage: "/img/articulo/que-es-una-api-y-para-que-sirve-featured.svg"
heroClass: "bg-purple"
themeColor: "#64448f"
robots: "index,follow"
---
Una API es una interfaz que permite que dos programas se comuniquen siguiendo reglas conocidas. En lugar de acceder directamente al interior de otra aplicación, un sistema realiza una petición y recibe una respuesta con los datos o el resultado permitido.

## Conceptos básicos

### Un ejemplo sencillo
Una tienda puede necesitar consultar el estado de un envío. En vez de copiar manualmente la información del transportista, la aplicación puede enviar una petición a su API con el identificador del paquete y recibir el estado actualizado.

Cada sistema mantiene su lógica interna y solo expone las operaciones necesarias.

### Peticiones y respuestas
En una API web es habitual trabajar con direcciones concretas llamadas endpoints. Una petición puede pedir información o solicitar una acción.

La respuesta suele incluir un código de estado y datos estructurados. JSON es un formato muy utilizado porque resulta sencillo de procesar desde muchos lenguajes.

## Operaciones y autenticación

### Métodos habituales
En APIs HTTP aparecen métodos como:

- `GET` para consultar información;
- `POST` para crear o enviar datos;
- `PUT` o `PATCH` para modificar;
- `DELETE` para eliminar cuando la API lo permite.

El significado exacto depende de la documentación de cada servicio.

### Autenticación
Muchas APIs no son públicas. Para identificar a la aplicación pueden utilizar claves, tokens u otros mecanismos de autenticación.

Las credenciales no deberían incluirse en código público del navegador si permiten acceder a información sensible o realizar acciones privadas.

## Datos y errores

### Parámetros y cuerpo
Una petición puede incluir parámetros en la URL, cabeceras y un cuerpo con datos. La documentación explica qué campos son obligatorios, su formato y qué respuesta esperar.

### Errores que debes manejar
La red puede fallar, un dato puede ser inválido o el servicio puede limitar temporalmente las peticiones. El código debe comprobar respuestas y mostrar un comportamiento razonable cuando la API no está disponible.

## Uso y documentación

### Por qué son útiles
Las APIs permiten integrar pagos, mapas, correo, inventario, facturación, analítica y muchos otros servicios sin reconstruir toda su lógica.

También facilitan separar una aplicación en componentes que pueden evolucionar de forma independiente.

### Empieza por la documentación
Antes de programar, busca ejemplos de autenticación, endpoints, límites y errores. Prueba primero una petición pequeña y comprueba la respuesta antes de construir el flujo completo.

Entender una API consiste en conocer el contrato entre sistemas: qué puedes pedir, cómo debes pedirlo y qué recibirás a cambio.
## Alcance y endpoints

### API no significa necesariamente servicio público
Una empresa puede utilizar APIs únicamente entre sus propios sistemas. También puede ofrecer una API a clientes, proveedores o desarrolladores externos.

Lo importante es que exista un contrato claro: qué operaciones están disponibles, qué datos necesita cada petición y qué respuesta puede devolver el sistema.

### Endpoints y recursos
Un endpoint es una dirección concreta de la API. En una aplicación de pedidos puede existir un endpoint para consultar un pedido, otro para crear uno y otro para listar productos.

Una buena API intenta organizar las rutas alrededor de recursos reconocibles. Esto facilita leer la documentación y comprender qué parte del sistema estás utilizando.

## HTTP y formatos

### Códigos de estado HTTP
Además de los datos, una respuesta HTTP incluye un código que ayuda a interpretar el resultado. Un código de éxito indica que la petición se ha procesado; otros pueden señalar que falta autenticación, que no existe el recurso o que ha ocurrido un error del servidor.

No ignores estos códigos. Un programa robusto diferencia una respuesta correcta de una situación que debe reintentarse, mostrarse al usuario o registrarse.

### JSON como formato de intercambio
Muchas APIs web utilizan JSON porque permite representar objetos, listas, números y textos de forma sencilla.

Antes de utilizar un campo, comprueba que existe y que tiene el tipo esperado. Una API puede añadir información nueva sin romper compatibilidad, por lo que el cliente no debería depender de un orden rígido de propiedades.

## Seguridad y límites

### Claves y tokens
Una clave de API puede identificar la aplicación que realiza la petición. Otros sistemas utilizan tokens que representan un usuario o una sesión.

Nunca publiques secretos en un repositorio abierto ni los incluyas directamente en JavaScript del navegador cuando conceden acceso privado. En esos casos, la llamada debería realizarse desde un entorno seguro controlado por el servidor.

### Límites de uso
Los proveedores pueden limitar cuántas peticiones se realizan por minuto, hora o día. Consulta la documentación y prepara el código para respetar esos límites.

Guardar resultados temporalmente puede reducir peticiones repetidas y acelerar la aplicación. No tiene sentido solicitar el mismo dato en cada carga si apenas cambia.

## Paginación y versionado

### Paginación
Cuando una consulta puede devolver miles de elementos, la API suele dividir la respuesta en páginas. El cliente debe recorrerlas de forma controlada.

Lee cómo indica la documentación que existen más resultados. Algunas APIs utilizan número de página, otras cursores o enlaces a la siguiente respuesta.

### Versionado y cambios
Una integración puede durar años. Documenta qué versión utilizas y revisa avisos del proveedor antes de actualizar.

Evita depender de campos no documentados aunque aparezcan en una respuesta. Pueden cambiar sin las mismas garantías que la interfaz pública.

## Robustez y pruebas

### Diseña pensando en fallos
Una API externa puede estar temporalmente caída. Define qué hará tu aplicación: mostrar un mensaje, utilizar datos recientes guardados o permitir reintentar.

Los tiempos de espera también importan. Una petición que nunca termina puede bloquear una página aunque el resto de la aplicación funcione.

### Prueba una integración paso a paso
Empieza con una petición manual utilizando la documentación. Comprueba autenticación y respuesta antes de escribir toda la lógica.

Después añade validación de errores, límites y registros. Si estás aprendiendo programación, [JavaScript básico para principiantes](/javascript-basico-para-principiantes) y [conceptos básicos de programación](/conceptos-basicos-programacion) pueden ayudarte a entender las piezas que intervienen.

Una API es, sobre todo, un acuerdo entre sistemas. Cuanto mejor conozcas ese acuerdo, más fácil será integrar sin depender de su funcionamiento interno.

Si estás repasando conceptos tecnológicos básicos, también puedes consultar [qué es Bluetooth](/que-es-bluetooth) para entender cómo funciona otra tecnología habitual de conexión entre dispositivos.
