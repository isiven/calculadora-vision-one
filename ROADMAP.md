# ROADMAP.md

## Vision

Convertir la calculadora actual en un asesor comercial inteligente de Trend
Vision One para Nextcom: una herramienta que estime creditos, explique valor,
analice consumo real, detecte oportunidades y prepare acciones comerciales con
seguridad y trazabilidad.

## Fase 1 - Contexto y seguridad base

- Agregar documentacion de contexto del proyecto.
- Crear `.env.example`.
- Documentar riesgos de seguridad.
- Reemplazar PIN frontend por autenticacion real.
- Proteger endpoints con autorizacion y rate limiting.
- Definir politica de datos para archivos subidos.
- Evitar CORS abierto cuando no sea necesario.

## Fase 2 - Catalogo unico y calculos confiables

- Extraer catalogo de `src/App.jsx` a una fuente unica versionada.
- Reutilizar catalogo en frontend y endpoints.
- Corregir inconsistencias de IDs entre parsers y UI.
- Agregar pruebas unitarias para calculo de creditos, prorrateo y auditoria.
- Agregar fixtures reales anonimizados de propuestas, certificados y drawdown.
- Documentar reglas de calculo por producto.

## Fase 3 - Modularizacion de frontend

- Separar `src/App.jsx` en componentes y modulos:
  - catalogo
  - calculadora cliente
  - calculadora interna
  - advisor
  - auditoria
  - importadores
  - PDF
  - autenticacion
- Agregar validacion de tipos o migrar gradualmente a TypeScript.
- Agregar lint, formato y CI.
- Reducir logos base64 embebidos moviendolos a assets.

## Fase 4 - Parsers robustos con IA

- Definir schemas JSON estrictos para cada parser.
- Validar respuestas de LLM antes de usarlas.
- Mostrar estado de confianza y campos que requieren confirmacion.
- Separar extraccion, normalizacion y matching de productos.
- Manejar DOCX/XLSX con parsers reales, no como texto plano.
- Agregar evaluaciones automaticas contra fixtures.

## Fase 5 - Advisor comercial inteligente

- Sacar knowledge base y prompts de `api/advisor.js` a archivos versionados.
- Agregar retrieval o carga controlada de contexto comercial.
- Incorporar playbooks Nextcom:
  - discovery
  - renovacion
  - upsell
  - objeciones
  - banca
  - retail
  - salud
  - empresa mediana
- Generar recomendaciones con estructura:
  - situacion
  - riesgo
  - oportunidad
  - producto recomendado
  - razon de negocio
  - siguiente accion
- Separar respuestas de cliente y respuestas internas con controles de servidor.

## Fase 6 - Flujo comercial Nextcom

- Capturar leads con consentimiento.
- Generar resumen ejecutivo para comercial.
- Generar correo o WhatsApp sugerido.
- Preparar minuta de reunion.
- Exportar propuesta preliminar.
- Integrar CRM o pipeline si Nextcom lo define.
- Agregar historial por oportunidad si se implementa almacenamiento seguro.

## Fase 7 - Operacion y gobierno

- Observabilidad de errores, latencia y costos de IA.
- Control de gasto por endpoint.
- Auditoria de cambios del catalogo.
- Revision trimestral de conocimiento Trend Vision One.
- Roles de acceso para cliente, comercial, preventa y admin.
- Politica de retencion y borrado de archivos.

## Prioridad recomendada

1. Seguridad de acceso interno y endpoints.
2. Catalogo unico.
3. Tests de calculo y parsers.
4. Modularizacion.
5. Advisor con playbooks y knowledge base versionada.
6. Integraciones comerciales.
