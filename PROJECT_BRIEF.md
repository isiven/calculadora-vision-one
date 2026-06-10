# PROJECT_BRIEF.md

## Proyecto

Herramienta comercial de Nextcom Systems para Trend Vision One / TrendAI Flex.

## Proposito

Ayudar a clientes, prospectos y equipo interno de Nextcom a entender, estimar y
preparar conversaciones comerciales sobre creditos de Trend Vision One.

La herramienta permite calcular creditos, analizar consumo, interpretar
propuestas/certificados y explicar el valor de Vision One con lenguaje
consultivo.

## Usuarios objetivo

### Cliente externo

Cliente o prospecto que quiere:

- estimar cuantos creditos necesita
- entender productos de Vision One
- subir un reporte de consumo o propuesta anterior
- recibir un PDF preliminar
- contactar a Nextcom para una cotizacion formal

Esta experiencia no debe mostrar precios internos, costos, margen, rentabilidad
ni estrategia comercial privada.

### Equipo interno Nextcom

Comerciales, preventa, ingenieros y gerencia de Nextcom que quieren:

- preparar una cotizacion
- analizar rentabilidad
- importar cotizaciones
- entender consumo vs contrato
- preparar argumentos de renovacion o upsell
- responder objeciones de clientes

## Problema que resuelve

Trend Vision One / TrendAI Flex puede ser dificil de explicar porque combina
productos, creditos, tiers, consumo mensual, contratos previos y necesidades de
seguridad del cliente.

La herramienta reduce esa complejidad al:

- convertir productos y cantidades en creditos
- estimar consumo anual desde drawdown mensual
- comparar consumo real contra creditos contratados
- detectar brechas, sobrantes y posibles oportunidades
- generar documentos preliminares para conversaciones comerciales
- responder preguntas contextuales con un advisor de IA

## Funciones actuales

- Pantalla inicial con dos modos: cliente e interno Nextcom.
- Catalogo de productos Trend Vision One con creditos por unidad.
- Calculadora manual de creditos.
- Vista cliente sin precios.
- Vista interna con precio por credito, costo, soporte Platinum y margen.
- Upload de screenshots de consumo.
- Upload de propuestas o certificados.
- Importacion interna de cotizaciones.
- Extraccion asistida por IA usando Claude via Anthropic.
- Auditoria de consumo vs propuesta.
- Unificacion/prorrateo de fechas.
- Generacion de PDFs preliminares.
- Solicitud por WhatsApp.
- Advisor flotante con modo cliente e interno.

## Vision futura

Evolucionar de calculadora a asesor comercial inteligente para Nextcom.

La vision es que el sistema pueda:

- entender el contexto del cliente
- calificar oportunidad comercial
- identificar brechas de seguridad y licenciamiento
- recomendar modulos y tiers
- preparar discurso comercial y tecnico
- generar resumen ejecutivo
- proponer siguiente accion
- asistir renovaciones y upsells
- integrarse eventualmente con CRM o pipeline comercial

## Stack tecnico actual

- React 18
- Vite
- JavaScript ES modules
- lucide-react
- Funciones serverless de Vercel en `api/`
- Anthropic Claude para advisor y parsers
- Generacion de PDF en navegador con html2canvas y jsPDF cargados por CDN
- Sin base de datos
- Sin autenticacion real de servidor
- Sin tests automatizados configurados

## Limitaciones actuales detectadas

- `src/App.jsx` es monolitico y concentra UI, estado, calculos y PDF.
- El catalogo esta duplicado entre frontend y prompts/mapeos de parsers.
- Hay riesgo de IDs, SKUs o creditos contradictorios entre endpoints.
- El modo interno depende de un PIN en frontend.
- Los endpoints de IA no tienen proteccion robusta.
- No hay rate limiting.
- No hay politica formal de consentimiento para archivos enviados a IA.
- No hay tests para calculos, parsers o auditoria.
- El advisor tiene base de conocimiento embebida en codigo.
- La generacion de PDF depende de scripts externos cargados en runtime.
- README es minimo y no documenta despliegue, seguridad ni variables.

## Principios de producto

- Primero claridad comercial, luego automatizacion.
- El cliente debe entender el resultado sin ver informacion interna.
- El equipo Nextcom debe poder defender la recomendacion con datos.
- Toda recomendacion debe ser trazable a consumo, propuesta o catalogo.
- La IA asiste, no reemplaza la validacion humana.
- No prometer seguridad total ni resultados garantizados.
- Ser transparente cuando falta informacion o depende del contrato.
- Mantener una separacion fuerte entre contexto cliente e interno.
- Proteger datos comerciales y datos de clientes desde el diseno.
