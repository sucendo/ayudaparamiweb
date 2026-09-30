---
title: "Qué es una API y para qué sirve"
description: "Explicación sencilla de qué es una API, cómo se comunican dos sistemas y conceptos básicos como petición, respuesta y autenticación."
excerpt: "Una API define una forma controlada para que distintas aplicaciones intercambien datos y acciones."
author: "Sucender"
canonical: "/que-es-una-api-y-para-que-sirve"
category: "tutoriales"
tags: ["API", "Programación", "Desarrollo web"]
publishedDate: "2021-03-11"
featuredImage: "/img/articulo/que-es-una-api-y-para-que-sirve-featured.svg"
heroClass: "bg-purple"
themeColor: "#64448f"
robots: "index,follow"
---
Una API es una interfaz que permite que dos programas se comuniquen siguiendo reglas conocidas. En lugar de acceder directamente al interior de otra aplicación, un sistema realiza una petición y recibe una respuesta con los datos o el resultado permitido.

## Un ejemplo sencillo

Una tienda puede necesitar consultar el estado de un envío. En vez de copiar manualmente la información del transportista, la aplicación puede enviar una petición a su API con el identificador del paquete y recibir el estado actualizado.

Cada sistema mantiene su lógica interna y solo expone las operaciones necesarias.

## Peticiones y respuestas

En una API web es habitual trabajar con direcciones concretas llamadas endpoints. Una petición puede pedir información o solicitar una acción.

La respuesta suele incluir un código de estado y datos estructurados. JSON es un formato muy utilizado porque resulta sencillo de procesar desde muchos lenguajes.

## Métodos habituales

En APIs HTTP aparecen métodos como:

- `GET` para consultar información;
- `POST` para crear o enviar datos;
- `PUT` o `PATCH` para modificar;
- `DELETE` para eliminar cuando la API lo permite.

El significado exacto depende de la documentación de cada servicio.

## Autenticación

Muchas APIs no son públicas. Para identificar a la aplicación pueden utilizar claves, tokens u otros mecanismos de autenticación.

Las credenciales no deberían incluirse en código público del navegador si permiten acceder a información sensible o realizar acciones privadas.

## Parámetros y cuerpo

Una petición puede incluir parámetros en la URL, cabeceras y un cuerpo con datos. La documentación explica qué campos son obligatorios, su formato y qué respuesta esperar.

## Errores que debes manejar

La red puede fallar, un dato puede ser inválido o el servicio puede limitar temporalmente las peticiones. El código debe comprobar respuestas y mostrar un comportamiento razonable cuando la API no está disponible.

## Por qué son útiles

Las APIs permiten integrar pagos, mapas, correo, inventario, facturación, analítica y muchos otros servicios sin reconstruir toda su lógica.

También facilitan separar una aplicación en componentes que pueden evolucionar de forma independiente.

## Empieza por la documentación

Antes de programar, busca ejemplos de autenticación, endpoints, límites y errores. Prueba primero una petición pequeña y comprueba la respuesta antes de construir el flujo completo.

Entender una API consiste en conocer el contrato entre sistemas: qué puedes pedir, cómo debes pedirlo y qué recibirás a cambio.
