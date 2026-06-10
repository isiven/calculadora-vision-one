# ROADMAP.md

## Vision general

Convertir la calculadora actual en un asesor comercial inteligente de Trend
Vision One / TrendAI Flex para Nextcom Systems.

## Fase 0: Contexto y documentacion

### Objetivo

Preparar el repositorio para que Codex y el equipo trabajen con contexto claro
sin modificar todavia la logica funcional.

### Tareas

- Crear `CODEX.md`.
- Crear `PROJECT_BRIEF.md`.
- Crear `DECISIONS.md`.
- Crear `ROADMAP.md`.
- Crear `SECURITY_RULES.md`.
- Crear `.env.example`.
- Documentar arquitectura, riesgos y direccion de producto.

### Riesgos

- Documentacion incompleta puede guiar mal futuras tareas.
- Documentacion desactualizada puede ser peor que no tener documentacion.

### Criterio de finalizacion

- Los archivos existen en la raiz.
- Cubren reglas de trabajo, brief, decisiones, seguridad y roadmap.
- No se modifica logica funcional.

## Fase 1: Seguridad base

### Objetivo

Reducir riesgos antes de exponer la herramienta a uso publico o a datos
sensibles de clientes.

### Tareas

- Reemplazar PIN frontend por autenticacion real.
- Mover autorizacion del modo interno al servidor.
- Proteger endpoints de IA.
- Agregar rate limiting.
- Validar tamanos y tipos de archivos.
- Restringir CORS segun `ALLOWED_ORIGINS`.
- Agregar aviso de uso de IA y consentimiento para archivos.
- Evitar logs con informacion sensible.

### Riesgos

- Romper flujos actuales de cliente o interno.
- Bloquear previews o dominios validos si CORS queda demasiado estricto.
- Agregar friccion excesiva al flujo comercial.

### Criterio de finalizacion

- Cliente no puede acceder a datos internos.
- Endpoints sensibles rechazan llamadas no autorizadas.
- Hay limites contra abuso y costo inesperado.
- El usuario entiende que archivos pueden procesarse con IA.

## Fase 2: Centralizacion de catalogo

### Objetivo

Crear una fuente unica de verdad para productos, SKUs, codigos, creditos,
unidades y aliases.

### Tareas

- Extraer catalogo fuera de `src/App.jsx`.
- Definir estructura de datos versionada.
- Reutilizar catalogo en frontend y endpoints.
- Eliminar mapeos duplicados de parsers.
- Agregar aliases para matching de IA.
- Documentar fuente y fecha de actualizacion de cada producto.

### Riesgos

- Cambiar IDs puede romper datos existentes en UI.
- Un mapeo incorrecto puede producir cotizaciones incorrectas.
- La fuente oficial de creditos puede cambiar.

### Criterio de finalizacion

- Una sola fuente alimenta calculadora, parsers y advisor.
- No hay IDs contradictorios entre endpoints.
- Los calculos existentes siguen produciendo los mismos resultados esperados.

## Fase 3: Refactor de arquitectura

### Objetivo

Reducir el riesgo del monolito `src/App.jsx` y preparar la app para crecer.

### Tareas

- Separar componentes de cliente, interno, advisor, upload, auditoria y PDF.
- Extraer calculos puros a modulos testeables.
- Extraer servicios de API.
- Mover assets base64 a archivos dedicados.
- Considerar migracion gradual a TypeScript o schemas runtime.
- Agregar estructura de carpetas clara.

### Riesgos

- Refactor grande puede introducir regresiones visuales o de calculo.
- Separar demasiado pronto puede crear abstracciones innecesarias.

### Criterio de finalizacion

- La UI mantiene comportamiento actual.
- Los calculos clave viven en funciones independientes.
- Los componentes principales son localizables y revisables.

## Fase 4: Parsers confiables y pruebas

### Objetivo

Hacer que extraccion de consumo, propuestas y cotizaciones sea confiable,
auditable y facil de validar.

### Tareas

- Definir schemas de respuesta para cada parser.
- Validar respuestas de IA antes de usarlas.
- Agregar fixtures anonimizados de screenshots, certificados y cotizaciones.
- Agregar pruebas para matching de productos.
- Agregar pruebas para deteccion de pools y doble conteo.
- Manejar DOCX/XLSX con parsers reales.
- Mostrar campos de baja confianza para revision humana.

### Riesgos

- Documentos reales varian mucho en formato.
- La IA puede alucinar fechas, cantidades o productos.
- Fixtures con datos reales pueden filtrar informacion sensible.

### Criterio de finalizacion

- Parsers tienen contratos claros.
- Hay pruebas automatizadas para casos frecuentes y edge cases.
- La app no aplica automaticamente datos de baja confianza sin visibilidad.

## Fase 5: Advisor comercial inteligente

### Objetivo

Evolucionar el advisor de chat informativo a copiloto comercial contextual para
Nextcom.

### Tareas

- Separar knowledge base y prompts de `api/advisor.js`.
- Versionar playbooks comerciales.
- Agregar modo de recomendacion estructurada.
- Usar contexto de consumo, propuesta y cotizacion para sugerir siguiente accion.
- Generar argumentos de valor por industria.
- Preparar respuestas a objeciones.
- Distinguir estrictamente respuestas cliente vs internas.
- Evaluar retrieval o carga controlada de conocimiento.

### Riesgos

- El advisor puede revelar informacion interna si no hay permisos reales.
- Recomendaciones incorrectas pueden afectar confianza comercial.
- Base de conocimiento desactualizada puede causar errores de licenciamiento.

### Criterio de finalizacion

- Advisor responde con estructura comercial util.
- No expone datos internos en modo cliente.
- Sus recomendaciones indican supuestos y dependencias.
- La knowledge base puede actualizarse sin tocar logica principal.

## Fase 6: Integraciones comerciales futuras

### Objetivo

Conectar la herramienta con procesos comerciales reales de Nextcom.

### Tareas

- Definir captura de leads con consentimiento.
- Generar resumen para comercial.
- Preparar email o WhatsApp sugerido.
- Exportar propuesta preliminar estructurada.
- Evaluar integracion CRM.
- Evaluar historial por oportunidad.
- Definir estados de oportunidad y handoff comercial.

### Riesgos

- Integrar CRM sin modelo de datos claro puede crear deuda.
- Guardar datos de clientes requiere controles de seguridad y retencion.
- Automatizar demasiado puede reducir revision humana necesaria.

### Criterio de finalizacion

- Hay flujo claro desde estimacion hasta siguiente accion comercial.
- Los datos capturados tienen consentimiento y proposito.
- Nextcom puede dar seguimiento sin copiar datos manualmente.

## Fase 7: Observabilidad, costos y gobierno

### Objetivo

Operar la herramienta con control de calidad, costo y riesgo.

### Tareas

- Medir errores de endpoints.
- Medir latencia de IA.
- Medir consumo de tokens/costo.
- Agregar alertas de fallo o abuso.
- Auditar cambios de catalogo.
- Definir revision periodica de knowledge base.
- Definir politica de retencion y borrado.
- Documentar proceso de release.

### Riesgos

- Falta de observabilidad puede ocultar costos o errores.
- Logs mal disenados pueden capturar informacion sensible.
- Gobierno excesivo puede frenar mejoras pequenas.

### Criterio de finalizacion

- El equipo puede ver salud y costo de la herramienta.
- Hay proceso para actualizar catalogo y conocimiento.
- Hay controles de retencion, seguridad y auditoria razonables.
