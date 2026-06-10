# CODEX.md

## Proposito

Este archivo da contexto operativo para futuros agentes Codex que trabajen en
`isiven/calculadora-vision-one`.

Antes de modificar codigo, leer tambien:

- `PROJECT_BRIEF.md`
- `DECISIONS.md`
- `SECURITY_RULES.md`
- `ROADMAP.md`
- `README.md`
- `package.json`
- `api/advisor.js`
- `src/App.jsx`

## Resumen tecnico

La aplicacion es una SPA React creada con Vite. La mayor parte de la logica vive
en `src/App.jsx`, incluyendo:

- catalogo de productos Trend Vision One
- vista cliente
- vista interna Nextcom
- calculo de creditos
- auditoria de consumo vs propuesta
- importacion de archivos mediante IA
- generacion de PDF
- widget `Vision One Advisor`

El backend esta compuesto por funciones serverless de Vercel en `api/`:

- `api/advisor.js`: chat consultivo con Anthropic para modo cliente o interno
- `api/parse-usage.js`: extraccion de consumo mensual desde screenshots
- `api/parse-proposal.js`: extraccion de certificados/propuestas anteriores
- `api/parse-quote.js`: importador interno de cotizaciones
- `api/rates.js`: proxy de tasas USD/VES

No hay base de datos. El estado vive en memoria del navegador. No hay
autenticacion real; el modo interno usa un PIN en frontend y debe tratarse como
proteccion temporal, no como seguridad.

## Reglas para Codex

- No cambiar logica existente sin pedido explicito.
- Mantener cambios pequenos, revisables y alineados al objetivo del usuario.
- Antes de tocar calculos, revisar todas las apariciones del catalogo y de los
  IDs de productos en frontend y endpoints.
- No agregar precios reales, secretos, credenciales ni datos de clientes al repo.
- No enviar informacion sensible en logs.
- Si se edita el advisor, revisar `SECURITY_RULES.md` por riesgo de prompt
  injection, fuga de datos internos y respuestas comerciales incorrectas.
- Si se agrega una dependencia, justificarla y actualizar `package.json` y el
  lockfile correspondiente.
- Si se introduce una nueva API, documentar contrato de entrada/salida.

## Comandos conocidos

```bash
npm install
npm run dev
npm run build
```

Actualmente no hay scripts de test ni lint configurados.

## Variables de entorno

La variable requerida para funciones de IA es:

```bash
ANTHROPIC_API_KEY=
```

Ver `.env.example`.

## Areas delicadas

- `src/App.jsx` es monolitico y contiene mucho estado compartido.
- Los IDs de productos no estan centralizados entre UI y parsers.
- El modo interno muestra datos comerciales y no debe exponerse a clientes.
- Los parsers dependen de respuestas de LLM y requieren validacion humana cuando
  la confianza sea baja.
- La generacion de PDF carga librerias desde CDN en runtime.

## Criterios de entrega

Para cambios futuros, una entrega correcta debe incluir:

- resumen de archivos modificados
- explicacion del impacto funcional
- verificacion ejecutada, como `npm run build`, o razon clara si no se ejecuto
- riesgos residuales si aplica
