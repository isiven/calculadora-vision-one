# DECISIONS.md

## Registro de decisiones

Este archivo documenta decisiones actuales observadas en el proyecto y decisiones
recomendadas para futuras iteraciones. Agregar entradas nuevas con fecha cuando
se tome una decision relevante.

## 2026-06-10 - SPA React con Vite

La aplicacion actual usa React 18 y Vite. Esto permite desarrollo rapido y
deploy simple en Vercel/Netlify/GitHub Pages para la parte estatica.

Consecuencia: no hay routing servidor tradicional ni backend persistente.

## 2026-06-10 - Funciones serverless en Vercel

Las capacidades sensibles que requieren API keys viven en `api/` como funciones
serverless. Esto evita exponer `ANTHROPIC_API_KEY` en el navegador.

Consecuencia: cada endpoint necesita controles explicitos de autenticacion,
rate limiting, tamanos de archivo y manejo de errores.

## 2026-06-10 - Estado local, sin base de datos

La app no persiste datos en servidor. El estado de cotizacion, consumo y chat se
mantiene en memoria del navegador.

Consecuencia: no hay historial ni auditoria persistente, pero se reduce el
riesgo de almacenar documentos de clientes.

## 2026-06-10 - Dos modos de usuario

La app tiene modo cliente y modo interno Nextcom.

Modo cliente:

- sin precios ni margenes
- estimacion de creditos
- PDF preliminar
- solicitud por WhatsApp

Modo interno:

- precio por credito
- costo proveedor
- soporte Platinum
- margen y rentabilidad
- importacion de cotizaciones

Consecuencia: cualquier cambio futuro debe preservar la separacion de datos
comerciales internos.

## 2026-06-10 - Advisor con base de conocimiento embebida

`api/advisor.js` incluye persona, reglas y base de conocimiento dentro del
codigo.

Consecuencia: es facil de desplegar, pero dificil de versionar, auditar y
mantener actualizado. La siguiente evolucion deberia separar conocimiento,
prompts y reglas comerciales en archivos versionados o una capa de retrieval.

## 2026-06-10 - Catalogo duplicado

El catalogo aparece en `src/App.jsx` y tambien como texto/mapeos en endpoints de
parseo. Los IDs no estan completamente alineados.

Decision recomendada: crear una unica fuente de verdad para catalogo, SKUs,
creditos y unidades, y reutilizarla en frontend y backend.

## 2026-06-10 - PIN interno temporal

El modo interno usa un PIN hardcodeado en frontend.

Decision recomendada: reemplazarlo por autenticacion real antes de exponer datos
comerciales sensibles en produccion.

## 2026-06-10 - PDFs generados en navegador

La app genera PDFs con `html2canvas` y `jsPDF`, cargados desde CDN.

Consecuencia: funciona sin backend adicional, pero depende de red externa y
puede fallar por CDN, CSP o cambios de libreria.

Decision recomendada: fijar dependencias en `package.json` o migrar generacion
de documentos a un servicio controlado.
