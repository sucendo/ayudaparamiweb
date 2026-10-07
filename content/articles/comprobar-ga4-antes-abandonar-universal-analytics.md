---
title: "Cómo comprobar que GA4 mide bien antes de abandonar Universal Analytics"
description: "Tutorial de junio de 2022 para validar Google Analytics 4: tiempo real, DebugView, conversiones, dominios, referencias, consentimiento y comparación con Universal Analytics."
excerpt: "Antes de depender de GA4 para tus decisiones conviene validar la instalación completa y mantener Universal Analytics como referencia durante un tiempo."
author: "Sucender"
canonical: "/comprobar-ga4-antes-abandonar-universal-analytics"
category: "tutoriales"
tags: ["GA4", "Universal Analytics", "Analítica web", "Medición"]
publishedDate: "2022-06-23"
featuredImage: "/img/articulo/comprobar-ga4-antes-abandonar-universal-analytics-featured.svg"
heroClass: "bg-purple"
themeColor: "#7a45e8"
robots: "index,follow"
---
En las tres entregas anteriores hemos preparado la migración desde Universal Analytics, instalado GA4 en paralelo y convertido los eventos y objetivos importantes al nuevo modelo.

Puedes repasar la serie desde el principio en [Universal Analytics desaparecerá: cómo preparar tu web para GA4](/universal-analytics-desaparece-preparar-web-ga4), continuar con [la instalación en paralelo](/instalar-ga4-junto-universal-analytics) y revisar [la migración de objetivos y eventos](/migrar-objetivos-eventos-universal-analytics-ga4).

Ahora toca comprobar que todo está funcionando de verdad.

No conviene retirar Universal Analytics simplemente porque GA4 ya muestra números. Antes necesitamos verificar que páginas, eventos, conversiones y recorridos importantes están llegando correctamente.

## Empieza por una prueba controlada

Haz una navegación que puedas reconocer.

Por ejemplo:

1. abre la web en una ventana privada;
2. acepta analítica si corresponde;
3. entra por una URL concreta;
4. visita dos o tres páginas;
5. pulsa un teléfono o CTA;
6. envía un formulario de prueba;
7. llega a la página de confirmación.

Anota la hora aproximada.

Después busca ese recorrido en GA4.

No intentes validar toda la propiedad mirando únicamente el tráfico agregado del día.

## Comprueba primero Realtime

El informe en tiempo real permite confirmar que la propiedad recibe actividad reciente.

Durante la prueba revisa:

- páginas visitadas;
- eventos;
- origen aproximado;
- dispositivo;
- conversiones si ya están configuradas.

Si la primera página aparece y el resto no, probablemente existe una diferencia entre plantillas.

Si no aparece nada, vuelve a la etiqueta antes de revisar informes más complejos.

## Utiliza DebugView para ver el orden de los eventos

DebugView es especialmente útil para comprobar la secuencia.

Durante una prueba puedes activar debug_mode:

```javascript
gtag('config', 'G-ABCDEFGHIJ', {
  debug_mode: true
});
```

Después reproduce el recorrido.

Deberías ver eventos como:

```text
page_view
contact_click
contact_form_submit
```

en el orden esperado.

No mantengas debug_mode activado para todos los visitantes después de terminar la prueba.

## Comprueba los parámetros, no solo el nombre

Que aparezca contact_form_submit no significa que todo esté bien.

Revisa también sus parámetros.

Por ejemplo:

```text
event_name = contact_form_submit
form_name = presupuesto
```

Si tienes varios formularios, comprueba que cada uno envía el identificador correcto.

Un error habitual es que todos terminen enviando:

```text
form_name = contacto
```

porque la variable quedó escrita de forma fija en la etiqueta.

## Busca eventos duplicados

Realiza una sola acción y cuenta cuántos eventos aparecen.

Un formulario enviado una vez no debería generar:

```text
contact_form_submit
contact_form_submit
contact_form_submit
```

Si lo hace, revisa:

- listeners JavaScript duplicados;
- dos etiquetas de Tag Manager;
- código manual más Tag Manager;
- una página de gracias que se recarga;
- activadores demasiado amplios.

Las conversiones duplicadas son especialmente peligrosas porque pueden hacer que una campaña parezca mejor de lo que realmente es.

## Prueba el rechazo del consentimiento

Si tu web solicita consentimiento para Analytics, valida también el caso contrario.

Haz una prueba nueva:

1. borra cookies o abre otra sesión privada;
2. rechaza las cookies analíticas;
3. navega por la web;
4. revisa si tu configuración respeta esa elección.

No basta con comprobar únicamente el caso en el que todo está aceptado.

La migración a GA4 no debería alterar las reglas de privacidad que ya aplicabas.

## Revisa todas las plantillas principales

No pruebes solo la portada.

Prepara una lista como:

```text
[ ] Inicio
[ ] Artículo
[ ] Categoría
[ ] Servicio
[ ] Contacto
[ ] Gracias
[ ] Producto
[ ] Carrito
[ ] Checkout
```

Marca únicamente las que existan en tu web.

El objetivo es descubrir plantillas que no incluyen la etiqueta o que cargan una configuración distinta.

## Comprueba rutas con parámetros

Muchas webs generan URLs como:

```text
/producto?id=25
/buscar?q=seo
/categoria?page=2
```

Comprueba cómo aparecen en GA4 y si esos parámetros tienen sentido para tus informes.

No elimines parámetros sin analizar su función.

Algunos identifican campañas o búsquedas útiles; otros solo generan ruido.

## Revisa subdominios y otros dominios

Si el usuario pasa de:

```text
www.ejemplo.com
```

a:

```text
tienda.ejemplo.com
```

o a otro dominio controlado durante el proceso, reproduce ese recorrido.

Observa si la navegación mantiene continuidad o si aparece una nueva sesión inesperada.

También revisa las referencias.

Un proveedor de pago o reserva no debería convertirse automáticamente en el origen aparente de una venta si el usuario llegó originalmente desde otro canal.

## Comprueba campañas con parámetros UTM

Crea una URL de prueba:

```text
https://www.ejemplo.com/?utm_source=prueba&utm_medium=email&utm_campaign=migracion_ga4
```

Ábrela en una sesión de prueba y comprueba que GA4 reconoce la campaña.

Utiliza nombres consistentes.

Evita mezclar:

```text
Email
email
E-mail
newsletter
Newsletter
```

si quieres poder agrupar los datos con facilidad.

## Valida cada conversión importante

Haz una lista de las conversiones configuradas.

Por ejemplo:

| Conversión | Prueba realizada | Resultado |
| --- | --- | --- |
| contact_form_submit | Formulario real | Correcto |
| catalog_download | Descarga PDF | Correcto |
| quote_complete | Solicitud completa | Pendiente |
| purchase | Compra de prueba | Correcto |

No consideres validada una conversión porque aparece en la lista de configuración.

Debes realizar la acción.

## Comprueba valores e ingresos cuando existan

En ecommerce o conversiones con valor, no basta con registrar purchase.

Revisa parámetros como:

```text
transaction_id
value
currency
items
```

Una compra de prueba puede enviar algo parecido a:

```javascript
gtag('event', 'purchase', {
  transaction_id: 'TEST-1001',
  value: 59.90,
  currency: 'EUR',
  items: [
    {
      item_id: 'SKU-01',
      item_name: 'Producto de prueba',
      price: 59.90,
      quantity: 1
    }
  ]
});
```

Comprueba que el importe y la moneda coinciden con la transacción.

Un evento purchase sin valor correcto puede servir para contar compras, pero dará problemas cuando quieras analizar ingresos.

## No compares sesiones de UA y GA4 como una prueba exacta

Durante estos meses tendremos los dos sistemas activos, pero no debemos exigir igualdad absoluta.

El modelo de sesión y el tratamiento de usuarios e interacciones cambian.

Lo que sí podemos buscar son diferencias que revelen fallos.

Por ejemplo:

| Señal | UA | GA4 | Interpretación |
| --- | ---: | ---: | --- |
| Tendencia diaria | Similar | Similar | Bien |
| Página principal | Recibe datos | Recibe datos | Bien |
| Formulario | 42 | 3 | Revisar |
| Tienda móvil | Recibe datos | Casi ninguno | Revisar plantilla |
| Descargas | 120 | 118 | Razonable tras validar |

No fijes un porcentaje universal de diferencia aceptable.

Investiga según la métrica.

## Compara por páginas y dispositivos

El total puede esconder un problema.

Imagina:

```text
UA total: 20.000
GA4 total: 19.200
```

Parece bastante próximo.

Pero al separar dispositivos puedes descubrir:

```text
Escritorio
UA: 10.000
GA4: 9.900

Móvil
UA: 10.000
GA4: 9.300
```

Eso merece revisar si alguna plantilla móvil, gestor de consentimiento o script funciona de forma diferente.

Haz comparaciones segmentadas antes de concluir que todo está correcto.

## Revisa tráfico interno

Si en Universal Analytics excluías las visitas de tu oficina o equipo, comprueba cómo has resuelto ese caso en GA4.

Durante las pruebas es fácil llenar Realtime y DebugView con tu propia actividad.

Eso está bien mientras validas.

Para los informes normales, documenta cómo vas a identificar y tratar el tráfico interno.

No apliques filtros irreversibles sin probar su efecto.

## Revisa definiciones personalizadas

Si registraste parámetros como dimensiones personalizadas, confirma que realmente los necesitas.

Puedes tener:

```text
form_name
cta_location
page_type
contact_method
```

Pregúntate:

- ¿se está enviando el parámetro?;
- ¿el nombre coincide exactamente?;
- ¿aparece donde esperamos?;
- ¿lo estamos utilizando en análisis?;
- ¿es información permitida y no personal?

Elimina la tendencia de registrar todo "por si acaso".

## Comprueba que no envías datos personales

Revisa eventos de formularios y búsquedas.

No deberían viajar valores como:

```text
nombre=Juan
email=juan@ejemplo.com
telefono=600000000
mensaje=Necesito presupuesto...
```

La analítica debe describir la interacción, no copiar el contenido personal.

Es mejor:

```javascript
gtag('event', 'contact_form_submit', {
  form_name: 'presupuesto'
});
```

que enviar lo que la persona escribió.

## Revisa errores en consola

Abre las herramientas del navegador.

Una implementación puede "medir algo" y al mismo tiempo generar errores JavaScript.

Busca problemas que aparezcan después de:

- aceptar cookies;
- rechazar cookies;
- cambiar de página;
- enviar formularios;
- cargar herramientas externas.

Un error de Analytics no debería romper una función principal de la web.

Y una función rota puede impedir que la conversión ocurra aunque la etiqueta esté perfectamente instalada.

## Guarda una versión de la configuración

Documenta cómo queda la medición en junio.

Por ejemplo:

```text
Propiedad UA
UA-12345678-1
Estado: activa como referencia

Propiedad GA4
G-ABCDEFGHIJ
Estado: activa

Eventos importantes
- contact_form_submit
- contact_click
- catalog_download
- purchase

Conversiones
- contact_form_submit
- catalog_download
- purchase
```

Si utilizas Tag Manager, guarda también una versión publicada con un nombre descriptivo.

Por ejemplo:

```text
Migración GA4 - eventos principales - 23/06/2022
```

Si dentro de tres meses aparece una anomalía, podrás saber qué configuración estaba activa.

## Empieza a utilizar GA4 en tareas reales

La validación no termina cuando los eventos aparecen.

Empieza a responder preguntas reales con GA4:

- ¿qué páginas generan más contactos?;
- ¿qué canales traen conversiones?;
- ¿qué dispositivos convierten peor?;
- ¿qué contenidos llevan a una descarga?;
- ¿qué rutas recorren los usuarios?

Si para responder una pregunta descubres que falta un parámetro, añádelo con una razón concreta.

Así la medición crece por necesidades, no por acumulación.

## Mantén Universal Analytics durante la transición

A día de hoy no hay motivo para apagar una propiedad Universal Analytics estándar que sigue funcionando correctamente.

Google ha anunciado que dejará de procesar nuevos hits el **1 de julio de 2023**.

Hasta entonces puede seguir siendo una referencia útil mientras construimos histórico y experiencia en GA4.

No obstante, no utilices ese margen como excusa para posponer el trabajo.

Cuantos más meses de datos tenga GA4 antes de esa fecha, más útil será la transición.

## Piensa también en conservar el histórico de UA

Los datos históricos de Universal Analytics no se trasladan automáticamente a la propiedad GA4.

Por eso conviene ir pensando qué informes y series históricas necesitarás conservar.

No hace falta exportar absolutamente todo hoy, pero sí identificar:

- informes mensuales importantes;
- conversiones históricas;
- tráfico por canal;
- páginas principales;
- ecommerce;
- campañas;
- comparativas anuales.

Google ha indicado que, después del fin del procesamiento, el acceso a los datos históricos se mantendrá durante un tiempo limitado.

No bases tu archivo histórico en la idea de que Universal Analytics estará disponible para siempre.

## Crea una revisión mensual durante la convivencia

Puedes programar una pequeña auditoría una vez al mes.

Comprueba:

```text
[ ] GA4 recibe datos
[ ] No hay caídas bruscas sin explicación
[ ] Conversiones siguen funcionando
[ ] No aparecen duplicados
[ ] Nuevas páginas tienen etiqueta
[ ] Consentimiento sigue funcionando
[ ] Campañas mantienen nomenclatura
[ ] Eventos nuevos están documentados
```

Una revisión de veinte minutos puede detectar un problema antes de que pierdas semanas de datos.

## Cuándo considerar que la migración está madura

No existe una fecha exacta para todos.

Pero GA4 empieza a estar preparado para convertirse en tu referencia principal cuando:

- lleva meses recogiendo datos;
- todas las plantillas importantes están cubiertas;
- las conversiones se han probado;
- ecommerce, si existe, está validado;
- los eventos tienen nombres coherentes;
- el consentimiento funciona;
- sabes interpretar sus informes;
- tu equipo puede responder preguntas habituales sin volver siempre a UA.

Eso no obliga todavía a borrar Universal Analytics.

Simplemente significa que la dependencia empieza a cambiar de un sistema al otro.

## El resultado de la serie

En estas cuatro partes hemos pasado de la noticia del final de Universal Analytics a una migración comprobable.

El proceso ha sido:

1. inventariar lo que medíamos;
2. crear GA4 sin apagar UA;
3. medir en paralelo;
4. replantear eventos y objetivos;
5. marcar conversiones relevantes;
6. validar datos, parámetros y recorridos;
7. documentar la configuración;
8. acumular histórico antes del cambio definitivo.

La parte más importante no ha sido instalar una etiqueta.

Ha sido **entender qué estamos midiendo y comprobar que sigue representando acciones reales de la web**.

**Serie completa:** [Preparar la migración](/universal-analytics-desaparece-preparar-web-ga4) → [Instalar GA4 en paralelo](/instalar-ga4-junto-universal-analytics) → [Migrar objetivos y eventos](/migrar-objetivos-eventos-universal-analytics-ga4) → **Comprobar la medición antes de abandonar Universal Analytics**.
