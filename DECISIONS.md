# DECISIONS.md

## Proposito

Registro de decisiones actuales del proyecto y criterios que deben guiar cambios
futuros.

## Decisiones actuales

### La app tiene dos modos: cliente e interno

La experiencia cliente esta pensada para estimar creditos y explicar Vision One
sin exponer informacion sensible.

La experiencia interna Nextcom incluye datos comerciales como precio por credito,
costo, soporte Platinum, margen y rentabilidad.

Implicacion: cualquier cambio debe preservar la separacion entre cliente e
interno.

### El endpoint advisor usa Claude via Anthropic

`api/advisor.js` actua como proxy serverless hacia la API de Anthropic. Recibe
mensajes, modo y contexto de la sesion, y devuelve una respuesta textual.

Implicacion: la API key debe vivir solo en variables de entorno del servidor.

### La base de conocimiento esta actualmente embebida

La informacion de Vision One, reglas de respuesta y personas del advisor estan
incluidas directamente en `api/advisor.js`.

Implicacion: esto facilita despliegue inicial, pero dificulta versionado,
auditoria y actualizacion. Debe migrarse a una base de conocimiento versionada.

### El catalogo debe centralizarse en una sola fuente

Hoy el catalogo y los mapeos aparecen en varios lugares, incluyendo frontend y
prompts/mapeos de parsers.

Decision: el catalogo de productos, SKUs, codigos, creditos, unidades y aliases
debe vivir en una fuente unica reutilizable.

### Los parsers no deben tener codigos/SKUs duplicados o contradictorios

Los endpoints `parse-usage`, `parse-proposal` y `parse-quote` no deben mantener
tablas divergentes del catalogo.

Decision: todo parser debe resolver productos contra la misma fuente de verdad y
devolver confianza de matching.

### El modo interno no debe depender de PIN en frontend en una version seria

El PIN en frontend es una barrera de UX, no una medida de seguridad real.

Decision: para uso serio o publico, el modo interno requiere autenticacion y
autorizacion de servidor.

### Los endpoints de IA deben protegerse antes de produccion

Los endpoints que llaman modelos pueden generar costo, procesar datos sensibles y
exponer capacidades internas.

Decision: antes de uso publico amplio, agregar autenticacion/autorizacion,
rate limit, validacion de body, limites de archivo y logs seguros.

### Archivos de clientes/propuestas/certificados son informacion sensible

Screenshots, certificados, propuestas y cotizaciones pueden contener nombres de
clientes, contratos, volumenes, SKUs, vigencias y datos comerciales.

Decision: tratarlos como datos sensibles, minimizar envio a modelos y evitar
guardarlos sin consentimiento.

### El proyecto debe evolucionar hacia asesor comercial inteligente

La calculadora es la base. La direccion de producto es construir un advisor que
ayude a Nextcom a calificar, explicar, recomendar, preparar renovaciones y
detectar oportunidades comerciales.

Decision: futuras funcionalidades deben alinearse con ese camino, no solo agregar
pantallas aisladas.

### La futura consola interna usara shadcn/ui, Tailwind y Radix

La evolucion visual de la Calculadora Vision One debe apuntar a una experiencia
SaaS empresarial moderna, controlable y compatible con React + Vite, sin meter
frameworks pesados ni romper la calculadora actual.

Decision: usar shadcn/ui + Tailwind + Radix como base principal para la futura
consola interna de Nextcom.

Para dashboards y analitica:

- Recharts sera la primera opcion para graficas simples.
- Tremor se estudiara como referencia o para uso selectivo.
- TanStack Table sera la opcion recomendada para tablas, filtros y reportes.

No instalar todavia:

- Material UI
- Ant Design
- React-admin
- AG Grid
- OpenHands
- Continue
- Aider
- Cline

Implicacion: cualquier adopcion visual debe hacerse en rama separada, con cambios
incrementales y sin reemplazar la calculadora actual hasta tener equivalencia
funcional clara.

## Decisiones pendientes recomendadas

- Proveedor y flujo de autenticacion interna.
- Fuente oficial y versionada del catalogo.
- Politica de retencion de archivos subidos.
- Modelo de rate limiting y control de costos.
- Estructura de knowledge base del advisor.
- Estrategia de tests y fixtures anonimizados.
- Integraciones comerciales futuras, como CRM o pipeline.
