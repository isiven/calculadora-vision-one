# CODEX.md

## Proposito

Este archivo define como debe trabajar Codex en este repositorio. El objetivo es
mantener cambios seguros, pequenos y trazables para la calculadora comercial de
Trend Vision One / TrendAI Flex de Nextcom Systems.

## Lectura obligatoria antes de cambiar codigo

Antes de modificar codigo funcional, Codex debe leer siempre:

- `PROJECT_BRIEF.md`
- `DECISIONS.md`
- `ROADMAP.md`
- `SECURITY_RULES.md`
- `README.md`
- `package.json`

Si la tarea toca el advisor, parsers, catalogo, seguridad o autenticacion,
tambien revisar los archivos involucrados antes de proponer o aplicar cambios.

## Reglas de trabajo

- Trabajar siempre en ramas, nunca directamente sobre `main`.
- Hacer cambios pequenos, testeables y faciles de revisar.
- No tocar logica comercial sin explicar impacto.
- No cambiar SKUs, codigos, creditos, unidades o nombres de productos sin una
  fuente verificable o aprobacion explicita.
- No exponer secretos, tokens, API keys, PINs reales ni credenciales.
- No subir datos reales de clientes, propuestas, certificados, screenshots de
  consumo ni informacion comercial sensible.
- No mezclar refactors grandes con cambios funcionales.
- No modificar archivos fuera del alcance solicitado.
- Respetar la separacion entre modo cliente y modo interno Nextcom.

## Cambios que requieren plan previo

Antes de tocar cualquiera de estas areas, Codex debe proponer un plan primero:

- seguridad
- autenticacion o autorizacion
- endpoints de IA
- parsers de archivos
- catalogo de productos
- calculos de creditos
- reglas comerciales
- datos internos de Nextcom
- manejo de archivos de clientes

El plan debe explicar alcance, riesgos, archivos afectados y forma de verificar.

## Arquitectura actual resumida

La aplicacion es una SPA React + Vite. La mayor parte de la logica vive en
`src/App.jsx`.

Funciones principales actuales:

- estimador de creditos para cliente externo
- calculadora interna de rentabilidad para Nextcom
- importacion asistida por IA de reportes, propuestas y cotizaciones
- comparacion de consumo vs propuesta
- generacion de PDFs preliminares
- widget `Vision One Advisor`

Backend serverless en `api/`:

- `api/advisor.js`: proxy a Claude via Anthropic
- `api/parse-usage.js`: analiza screenshots de consumo
- `api/parse-proposal.js`: analiza certificados/propuestas
- `api/parse-quote.js`: analiza cotizaciones internas
- `api/rates.js`: obtiene tasas USD/VES

## Verificacion esperada

Al finalizar una tarea, Codex debe explicar:

- archivos modificados
- razon del cambio
- impacto funcional o comercial
- riesgos introducidos o reducidos
- pruebas o verificaciones realizadas
- pruebas que no se pudieron ejecutar y por que

Cuando aplique, ejecutar:

```bash
npm run build
```

Actualmente no hay scripts de test ni lint configurados.

## Variables y secretos

Usar `.env.example` como referencia. Nunca commitear `.env` con valores reales.

La clave de Anthropic debe vivir en variables de entorno del entorno local o de
Vercel:

```bash
ANTHROPIC_API_KEY=
```

## Criterio para aceptar cambios futuros

Un cambio es aceptable si:

- respeta el contexto comercial de Nextcom
- no rompe la separacion cliente/interno
- mantiene o mejora seguridad
- no altera catalogo ni creditos sin fuente
- es verificable
- deja documentados riesgos relevantes
