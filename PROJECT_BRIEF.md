# PROJECT_BRIEF.md

## Proyecto

Calculadora Vision One para Nextcom Systems.

## Objetivo comercial

Ayudar a clientes, prospectos y equipo interno de Nextcom a estimar, explicar y
preparar conversaciones comerciales sobre creditos de Trend Vision One.

La herramienta busca reducir friccion en tres momentos:

- estimar creditos requeridos para una nueva compra
- interpretar consumo real de Vision One
- comparar consumo actual contra una propuesta o contrato anterior

## Audiencias

### Cliente o prospecto

Usuario externo que quiere entender cuantos creditos necesita, que productos
consume y como preparar una conversacion con Nextcom.

La vista cliente no debe mostrar precios internos, costos, margen, comisiones ni
estrategia comercial privada.

### Equipo Nextcom

Usuario interno comercial, preventa, ingenieria o gerencia. Usa la herramienta
para preparar cotizaciones, analizar rentabilidad, importar cotizaciones y
construir argumentos de renovacion o upsell.

## Propuesta de valor

- Explica el modelo de creditos Vision One / TrendAI Flex de forma simple.
- Convierte productos y cantidades en creditos estimados.
- Usa IA para acelerar lectura de screenshots, certificados y propuestas.
- Genera PDFs preliminares para conversaciones comerciales.
- Permite que el advisor responda con contexto de la sesion.

## Flujos actuales

1. El usuario elige modo cliente o modo interno.
2. En modo cliente, agrega productos manualmente o sube documentos.
3. El frontend envia archivos a funciones serverless que consultan Anthropic.
4. El frontend transforma resultados de IA en lineas de productos.
5. La app calcula creditos anuales y, si hay consumo y propuesta, muestra una
   comparacion.
6. El usuario puede descargar PDF o solicitar cotizacion por WhatsApp.
7. En modo interno, Nextcom configura precio por credito, costo, soporte y ve
   rentabilidad.
8. El widget advisor puede responder preguntas usando el contexto actual.

## Limites actuales

- No reemplaza una cotizacion formal de Nextcom.
- No valida contratos, precios ni descuentos reales.
- No debe prometer seguridad total ni resultados garantizados.
- No debe usarse como fuente unica para decisiones regulatorias o incidentes.
- El resultado de IA debe considerarse asistido, no definitivo.

## Terminologia importante

- Vision One: plataforma de ciberseguridad de Trend Micro.
- TrendAI Flex: modelo flexible de creditos para Vision One.
- Pool de creditos: creditos contratados disponibles para consumo.
- Drawdown: consumo de creditos durante un periodo.
- CREM: Cyber Risk Exposure Management.
- XDR: Extended Detection and Response.
- ZTSA: Zero Trust Secure Access.

## Criterios de exito

- El cliente entiende su estimacion de creditos sin ver datos internos.
- El equipo Nextcom puede preparar mejor una renovacion o upsell.
- Los calculos son trazables y auditables.
- Las respuestas del advisor son consultivas, correctas y prudentes.
- Los documentos generados dejan claro que son preliminares.

## No objetivos actuales

- CRM completo.
- Portal de autenticacion empresarial.
- Cotizacion formal vinculante.
- Sustituto de PriceBook oficial de Trend Micro.
- Operacion SOC o respuesta a incidentes.
