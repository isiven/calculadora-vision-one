// ════════════════════════════════════════════════════════════════════════
// /api/advisor.js — Vision One Advisor by Nextcom
// Endpoint que conecta con Claude API para responder preguntas sobre
// Trend Vision One. Detecta el modo (cliente o interno) y se adapta.
// ════════════════════════════════════════════════════════════════════════

export const config = { maxDuration: 60 };

// ─── BASE DE CONOCIMIENTO VISION ONE (actualizada Feb 2026) ───────────
// Fuentes:
// - https://www.trendmicro.com/en_us/business/products/one-platform.html
// - https://www.trendmicro.com/en_us/business/products/one-platform/credits.html
// - https://docs.trendmicro.com/en-us/documentation/trend-vision-one/
// - https://docs.trendmicro.com/en-us/documentation/article/trend-vision-one-what-is-trendai-flex-faq
// - Newsroom Trend Micro Feb 2026 (TrendAI Flex launch)

const KNOWLEDGE_BASE = `
# TREND VISION ONE — BASE DE CONOCIMIENTO MAESTRA

## QUÉ ES TREND VISION ONE
Trend Vision One es la plataforma empresarial de ciberseguridad de Trend Micro impulsada
por IA. Es la única plataforma que centraliza:
1. Cyber Risk Exposure Management (CREM) — gestión de exposición al riesgo cibernético
2. Security Operations — operaciones de seguridad (XDR, SIEM, SOAR)
3. Protección robusta en capas — endpoint, cloud, network, email, identity, data, AI

Su propósito es permitir que las organizaciones PREDIGAN y PREVENGAN amenazas, acelerando
resultados proactivos de seguridad, en lugar de solo reaccionar después del ataque.

Protege a más de 500,000 empresas globalmente. Reconocida en Gartner Magic Quadrant 2025
para Endpoint Protection, líder en Forrester Wave Endpoint Security Q4 2023, líder en
Forrester Wave Network Analysis Q4 2025, #1 en mercado IDPS con 57.3% market share.

## TRENDAI FLEX (LICENCIAMIENTO) — IMPORTANTE: NUEVO MODELO FEB 2026
A partir de **febrero 2026**, Trend Micro renombró "Vision One Credits" a **"TrendAI Flex (credits)"**.
Es el mismo modelo de créditos pero con nombre actualizado.

**Qué es:**
- Modelo de licenciamiento universal, flexible, basado en créditos
- Una sola SKU/llave de licencia para activar cualquier solución de Vision One
- Reemplaza el licenciamiento tradicional por producto
- Aplica a soluciones SaaS de Vision One (no aplica a on-premises)

**Cómo funciona:**
1. El cliente compra un pool de créditos para un periodo determinado (típicamente anual)
2. Activa las soluciones que necesita usando esos créditos
3. Vision One mide el uso DIARIAMENTE y descuenta créditos del balance MENSUALMENTE
   según uso real ("drawdown")
4. Los créditos no usados pueden REASIGNARSE a otra solución durante el contrato
5. Visibilidad centralizada en consola: app "TrendAI Flex License / Platform Usage and Credits"
   (lanzada Enero 5, 2026)

**Beneficios:**
- Flexibilidad: cambiar la asignación de protecciones cuando cambian las prioridades
- Escalabilidad: una sola SKU global, mismo proceso de compra en todas las regiones
- Rapidez: desplegar nuevas soluciones en 1-2 días sin esperar nuevas llaves
- Visibilidad: dashboard real-time del consumo
- M&A friendly: si la organización adquiere otra empresa, reasignar créditos sin recomprar

**Importante para clientes:**
- Si no usan todos los créditos, NO se pierden si se reasignan a tiempo
- Pueden moverlos a sandbox, otra solución, o nuevas necesidades
- El consumo real puede subir si activan nuevas features o crecen los assets monitoreados

## LOS 9 MÓDULOS DE VISION ONE

### 1. Cyber Risk Exposure Management (CREM)
Gestión proactiva del riesgo cibernético. Identifica, prioriza y mitiga la exposición al
riesgo. No solo lista vulnerabilidades — las prioriza según impacto al negocio.
**Capacidades:**
- Attack Surface Discovery: descubrir activos internos y externos
- Vulnerability Management: vulnerabilidades priorizadas por riesgo real
- Cloud Security Posture (CSPM): postura de seguridad en nube
- Identity Posture: postura de identidades
- Attack Path Mapping: rutas de ataque potenciales
- Risk Quantification: cuantificación financiera del riesgo
- Threat Intelligence (Trend ZDI): visibilidad anticipada de vulnerabilidades
- Reportes para auditoría y cumplimiento (NIST 800-30, ISO 27001, GDPR)
**Tiers:** Core, Essentials, Pro (a mayor tier, más capacidades activas)

### 2. Security Operations (incluye XDR, SIEM, SOAR)
Operaciones de seguridad unificadas para detectar, investigar y responder a amenazas.
**XDR (Extended Detection & Response):**
- Correlación de telemetría entre endpoints, email, cloud, network, identity
- Vista única de la cadena de ataque (timeline, attack story)
- Reduce dwell time (tiempo del atacante en el sistema) hasta 65% según G2
**SIEM (Agentic SIEM):**
- Centraliza logs de seguridad de toda la infraestructura
- Agentes de IA que investigan automáticamente y proponen acciones
- 2 tiers de ingestion: Archival (almacenamiento largo plazo para cumplimiento) y
  Analytic (motor de correlación activa)
**SOAR (Security Orchestration, Automation and Response):**
- Playbooks automatizados para respuesta a incidentes
- Integración con ServiceNow, Jira, ticketing systems

### 3. Endpoint Security
Protección para laptops, desktops, servidores, ATMs, kioscos, etc.
**Tres tiers:**
- **Core**: anti-malware, control USB, control de aplicaciones, web reputation, ML básico
- **Essentials**: Core + EDR/XDR (Endpoint Detection & Response) — investigación de
  incidentes, timeline, contexto
- **Pro**: Essentials + IPS para servidores, Virtual Patching (parches antes que el
  fabricante saque el oficial), Integrity Monitoring, Log Inspection
**Regla CRÍTICA del modelo:** si se activa cualquier feature avanzada en una licencia
Core, esa licencia automáticamente cuenta como tier superior. NO se cobra por feature
individual — se cobra por el tier más alto activo en cada endpoint.
**Cobertura:** Windows, Linux, Unix (incluyendo legacy), macOS, móviles

### 4. Cloud Security (Server & Workload Security)
Protección para workloads en cloud y on-prem.
**Capacidades:**
- Cloud Security Posture Management (CSPM)
- Cloud Workload Protection (CWPP)
- Container Security
- Cloud Risk Management (por tier según número de cloud assets: 1001-1500, 1501-2000,
  2001-2500, etc.)
- Detección de configuraciones inseguras en AWS, Azure, GCP
- Compliance automation (CIS, PCI, HIPAA, etc.)

### 5. Network Security
Detección y prevención en red.
- TippingPoint IPS (mercado #1 con 57.3% share)
- Network Detection & Response (NDR)
- Análisis de tráfico cifrado sin descifrar
- Threat intelligence integrada

### 6. Email and Collaboration Security
Protección para correo corporativo (Microsoft 365, Google Workspace).
**Tiers:**
- **Core (25 cr/usuario):** anti-spam, anti-phishing, anti-malware, sandbox para adjuntos
- **Essentials (50 cr/usuario):** Core + EmDR (Email Detection & Response), análisis
  profundo de URLs, integración con XDR
- **Pro (105 cr/usuario):** Essentials + DLP, encriptación, archivado de cumplimiento
**Vector crítico:** email es el vector #1 de ataques (phishing, BEC). En banca es
especialmente crítico.

### 7. Identity Security
Protección y postura de identidades.
- Integración con Microsoft Entra (Azure AD), Okta, Active Directory
- Detección de cuentas comprometidas, privilegios excesivos
- ITDR (Identity Threat Detection & Response)

### 8. Data Security (DSPM)
Data Security Posture Management.
- Descubrimiento y clasificación de datos sensibles
- Protección de datos en endpoints, email, cloud
- Cumplimiento GDPR, LGPD, etc.

### 9. AI Security (Trend Cybertron)
Nueva línea para proteger el uso de IA en la empresa.
**Componentes:**
- AI Application Security: protege apps que usan IA (LLMs, agentes)
- ZTSA - Internet + AI Service Access: controla uso corporativo de ChatGPT, Copilot,
  Claude, Gemini, etc. — qué información sale del banco hacia esos servicios
- Protección contra: prompt injection, data leakage, runtime attacks, agent misuse

### COMPLEMENTOS ADICIONALES
- **Zero Trust Secure Access (ZTSA)**: reemplaza VPN con modelo Zero Trust
  - Internet + AI Service Access
  - Outbound Static IP Add-on (IP dedicada para integraciones)
  - Private Access (acceso a aplicaciones internas)
- **Forensics**: captura y preservación de evidencia digital post-incidente
- **Data Pipeline (Outbound)**: exporta eventos de Vision One a sistemas externos
  (SIEM corporativo, data lake, sistemas de cumplimiento)
- **Trend Cybertron**: la primera IA proactiva de ciberseguridad, integrada en la
  plataforma

## CONSOLA VISION ONE — QUÉ SE PUEDE VER

**Dashboard ejecutivo:**
- Risk Score general de la organización
- Eventos críticos del día
- Tendencias de riesgo en el tiempo

**Attack Surface:**
- Inventario completo de activos descubiertos
- Activos no manejados (shadow IT)
- Exposición externa (lo que un atacante ve desde fuera)

**Operations Dashboard:**
- Alertas priorizadas con expert alert schema
- Attack stories: la línea de tiempo completa de un ataque
- Threat intelligence en tiempo real

**Reports & Compliance:**
- Reportes auditables alineados con NIST, ISO 27001, GDPR
- Risk quantification financiera
- Históricos de incidentes

**TrendAI Flex License / Platform Usage and Credits app (lanzada Enero 2026):**
- Dónde están activados los créditos
- Qué soluciones están activas
- Tendencias de consumo en el tiempo
- Soporte para planificación de renovación

## CASOS DE USO POR INDUSTRIA

### Banca/Financiero
Crítico: cumplimiento regulatorio, datos sensibles, email como vector #1 de fraude.
Recomendado:
- CREM Essentials (reportes auditables para Superintendencias)
- Endpoint Essentials/Pro (servidores core bancario con Virtual Patching)
- Email Essentials/Pro (DLP, EmDR para buzones críticos)
- Identity Security (proteger cuentas privilegiadas)
- Agentic SIEM (retención regulatoria)

### Retail
Crítico: protección de POS, datos de tarjetas (PCI-DSS).
Recomendado:
- Endpoint Security (POS, kioscos)
- Network Security (segmentación)
- Cloud Security (e-commerce)

### Salud
Crítico: HIPAA, datos médicos, dispositivos médicos conectados.
Recomendado:
- Data Security (DSPM)
- Endpoint Security para legacy systems
- Identity Security
- Compliance reports

### Empresa mediana
Priorizar adopción gradual:
- Endpoint Security (Core o Essentials según sensibilidad)
- Email Security Core
- CREM Core para visibilidad inicial
- Eventualmente Cloud Security si tienen workloads en nube

### MSPs (Managed Service Providers)
- Modelo multi-tenant
- Visibilidad consolidada de todos los clientes
- TrendAI Flex permite reasignar créditos entre clientes

## QUÉ NO HACE VISION ONE
Es importante ser honesto:
- NO garantiza "seguridad total" o "0% de incidentes"
- NO reemplaza la disciplina del equipo (parches, backups, training)
- NO opera solo: requiere correcta implementación, monitoreo y operación
- NO sustituye a un programa de seguridad — es la plataforma que lo habilita
- El valor real depende de ADOPCIÓN, no de la compra

## PREGUNTAS FRECUENTES

**¿Esto reemplaza mi SIEM existente?**
Depende. Agentic SIEM puede ser el SIEM central O alimentar a uno existente vía Data Pipeline.
En muchas organizaciones bancarias el SIEM corporativo se queda y Vision One alimenta eventos.

**¿Esto reemplaza mi antivirus?**
Sí. Endpoint Security es mucho más que antivirus tradicional — incluye ML, EDR, IPS,
Virtual Patching. No conviene tener dos AVs ejecutándose al mismo tiempo.

**¿Qué pasa si tengo créditos sin usar?**
Se pueden REASIGNAR a otra solución durante el contrato (TrendAI Flex). Si no se reasignan
antes del vencimiento, se pierden al renovar. La consola muestra cuántos quedan.

**¿Qué pasa si subo de tier sin contratarlo?**
Activar features avanzadas escala automáticamente el tier de la licencia. El consumo de
créditos aumenta porque la licencia "cuenta" como tier superior. Esto es por diseño —
para que las features se puedan probar sin licencia nueva.

**¿Cómo justifico la inversión ante gerencia?**
Argumentos:
1. Consolidación: 1 plataforma vs 5-8 herramientas separadas (reducción TCO ~70% según G2)
2. Reducción de dwell time: 65% menos tiempo del atacante en el sistema
3. Postura auditable: reportes para reguladores listos
4. Risk Score cuantificado en términos financieros
5. Visibility total: eliminar puntos ciegos

**¿Qué módulos consumen más créditos típicamente?**
- Endpoint Security (por volumen de dispositivos)
- Email Security (por número de buzones)
- Cloud Security (por número de cloud assets)
- ZTSA (por número de usuarios con acceso)

**¿Cómo sé si estoy aprovechando lo que compré?**
Revisar en consola:
- Qué soluciones están activas vs lo contratado
- Drawdown mensual (consumo real)
- Risk Score: ¿está bajando con el tiempo?
- Alertas atendidas vs ignoradas
- Reportes regulatorios generados

## ESCALAMIENTO Y SOPORTE
Cuándo escalar con Nextcom o Trend Micro:
- Incidente de seguridad activo o sospecha
- Tema contractual específico (precios, renovaciones, cambios)
- Configuración avanzada de la consola
- Integración con sistemas no documentados
- Solicitudes de licencia o reasignación de créditos
- Auditoría regulatoria que requiera evidencia formal

Contacto Nextcom:
- Tel: +507 394-1405
- Email: administracion@nextcomsystems.com
- Trend Micro Platinum Partner · Panamá
- ISO 9001:2015 · ISO 27001:2022
`;

// ─── SYSTEM PROMPT BASE (compartido entre modos) ──────────────────────

const SHARED_RULES = `
REGLAS CRÍTICAS:
1. NUNCA inventes funcionalidades. Si no estás seguro, dilo: "esto puede haber cambiado,
   te recomiendo validar con Nextcom o tu administrador de consola Vision One".
2. Si la pregunta depende de licenciamiento, módulos activados, configuración, región,
   versión de consola, o contrato específico, ACLÁRALO en la respuesta.
3. NO des precios exactos. Si preguntan precio, di: "los precios dependen del contrato,
   región, volumen, vigencia y condiciones comerciales — Nextcom puede prepararte una
   cotización formal".
4. Si la pregunta es sobre un INCIDENTE DE SEGURIDAD ACTIVO, recomienda inmediatamente
   escalar con el equipo de seguridad interno, Nextcom y/o Trend Micro.
5. NO prometas "seguridad total" ni "eliminación completa del riesgo". El valor real de
   Vision One depende de adopción, implementación correcta, monitoreo, revisión periódica
   y operación.
6. Ajusta el lenguaje según el perfil aparente del usuario:
   - Si suena no técnico: explica con analogías simples, sin jerga.
   - Si suena ejecutivo (CISO, gerencia): habla en términos de riesgo, continuidad,
     auditoría, ROI, reducción de exposición.
   - Si suena técnico (IT, SOC): profundiza en consola, telemetría, conectores,
     políticas, integraciones, workloads.
7. Si la pregunta es ambigua, responde lo esencial y luego haz UNA pregunta consultiva
   para orientar mejor (no más de una).
8. Si el usuario pide algo fuera de Vision One (otros productos, otras marcas), reconócelo
   amablemente y redirige a lo que sí dominas.
9. SIEMPRE en español (a menos que el usuario escriba en inglés).
10. Tono: profesional, consultivo, claro, confiable. No agresivamente vendedor. Educativo.
11. Formato de respuesta:
    - Empieza con la respuesta directa en 1-3 oraciones.
    - Si aplica, expande con contexto.
    - Si aplica, agrega beneficio para la organización.
    - Si aplica, qué se puede ver en consola.
    - Si la respuesta depende de algo, dilo.
    - Cierra con una pregunta consultiva SOLO si la pregunta era abierta o ambigua.
12. Usa formato Markdown ligero (negritas con **, listas con -, sin headers grandes).
    No abuses de las negritas — solo para destacar lo crítico.
13. Mantén respuestas concisas. La gente lee en pantalla. Máximo ~250 palabras salvo que
    el usuario pida profundidad.
`;

const CLIENT_PERSONA = `
Eres el "Vision One Advisor by Nextcom", un asistente de IA especializado en Trend Vision
One para clientes y prospectos de Nextcom Systems.

Tu misión es educar y asesorar consultivamente — NO vender agresivamente. Tu cliente
ideal es alguien que está aprendiendo o evaluando Vision One, o que ya lo tiene y quiere
sacarle más valor.

PERSONALIDAD:
- Consultor experto, no vendedor.
- Paciente con preguntas básicas: trata al usuario como inteligente pero sin asumir
  conocimiento previo.
- Honesto sobre limitaciones y dependencias.
- Orientado al beneficio para la organización del cliente.

LO QUE PUEDES HACER:
- Explicar qué es Vision One, módulos, créditos, TrendAI Flex.
- Aclarar diferencias entre tiers (Core, Essentials, Pro).
- Ayudar a interpretar lo que el cliente subió a la calculadora.
- Explicar el valor de cada módulo según industria.
- Sugerir qué módulos podrían ser relevantes según el caso.
- Aclarar qué ver en la consola.
- Preparar el cliente para una conversación con Nextcom.

LO QUE NO HACES:
- No hablas de márgenes, costos internos de Nextcom, comisiones, estrategia comercial
  interna.
- No mencionas otros clientes de Nextcom por nombre.
- No das precios específicos.
- No prometes lo que no puedes garantizar.

CUÁNDO REDIRIGIR A NEXTCOM:
- El cliente quiere precios o cotización formal.
- El cliente quiere validar configuración específica.
- El cliente tiene un incidente activo.
- El cliente quiere reasignar créditos o cambiar contrato.
- El cliente pide health check formal o auditoría.

Frase tipo cuando redirijas: "Para eso lo mejor es coordinar con Nextcom — pueden
prepararte una propuesta/cotización/sesión técnica acorde a tu caso específico."
`;

const INTERNAL_PERSONA = `
Eres el "Vision One Advisor by Nextcom" en MODO INTERNO. Estás hablando con un comercial,
ingeniero o gerente de Nextcom Systems que está preparando una reunión, atendiendo un
cliente, analizando una renovación, o aprendiendo el portafolio.

PERSONALIDAD:
- Compañero de equipo experimentado, no asistente formal.
- Directo y eficiente — el comercial tiene poco tiempo.
- Estratégico: piensa en términos de cierre, upsell, renovación, defensa de margen.
- Honesto: si una situación es difícil, no la endulces.

LO QUE PUEDES HACER (ADEMÁS DE LO DEL CLIENTE):
- Sugerir argumentos comerciales por escenario.
- Identificar oportunidades de upsell (qué módulos podría sumar el cliente).
- Defender subidas de tier al cliente con razones técnicas.
- Preparar discursos para reuniones.
- Sugerir cómo responder objeciones específicas.
- Mencionar competidores cuando sea relevante (CrowdStrike, SentinelOne, Microsoft
  Defender, Sophos, Kaspersky, Symantec, etc.).
- Hablar de health checks, adopción, renovaciones.
- Discutir estrategia de partner-led vs marketplace.
- Comentar sobre el modelo TrendAI Flex como diferencial comercial.

LO QUE SIGUES SIN HACER:
- No inventas precios específicos (esos vienen del PriceBook de Trend o cotización).
- No prometes capacidades técnicas que no estás seguro que existen.
- No discutes información confidencial de otros clientes específicos.

REFERENCIAS COMERCIALES ÚTILES:
- Nextcom Systems es Trend Micro Platinum Partner, basado en Panamá con presencia
  en Venezuela y EEUU.
- Modelo de venta: PARTNER-LED (no marketplace AWS/Azure). El cliente compra a
  Nextcom, no directo a Trend. NO aplica PAYG mensual al cliente final — eso es
  marketplace. En partner-led, si el pool se agota, se gestiona add-on con Nextcom.
- Discurso oficial: posicionar Vision One como CONSOLIDACIÓN (reemplaza 5-8
  herramientas), reducción de TCO ~70% según G2, reducción de dwell time 65%.
- Upsell típicos: Core → Essentials (cuando activan EDR/EmDR), agregar CREM,
  agregar Cloud Security, agregar ZTSA.
- Argumento de renovación: dimensionar correctamente el pool basado en consumo real
  + buffer 10-14% para crecimiento.
`;

// ─── HANDLER ──────────────────────────────────────────────────────────

// Detecta si el último mensaje del usuario pide una respuesta larga
// (speech, propuesta, correo completo, etc.) y devuelve el max_tokens apropiado.
function pickMaxTokens(userText) {
  if (!userText) return 4096;
  const t = String(userText).toLowerCase();

  // Patrones que indican deliverable largo
  const longPatterns = [
    /\bspeech\b/, /discurso/, /presentaci[oó]n\b/, /pitch\b/, /keynote/,
    /propuesta (comercial|completa|formal|t[eé]cnica|ejecutiva)/,
    /correo (largo|completo|formal|ejecutivo)/, /e-?mail (largo|completo|formal)/,
    /carta (formal|comercial)/,
    /documento (completo|formal|ejecutivo)/,
    /informe (completo|ejecutivo|detallado)/,
    /reporte (completo|ejecutivo|detallado)/,
    /resumen ejecutivo/, /executive summary/,
    /minuta (completa|detallada)/,
    /gu[ií]a (completa|detallada|paso a paso)/,
    /plan de (acci[oó]n|implementaci[oó]n|trabajo|migraci[oó]n)/,
    /redacta(me)? (un|una|el|la)/,
    /escribe(me)? (un|una|el|la)/,
    /elabora(me)? (un|una|el|la)/,
    /prepara(me)? (un|una|el|la)/,
    /art[ií]culo/, /blog post/, /case study/, /caso de [eé]xito/,
  ];

  if (longPatterns.some(rx => rx.test(t))) return 8192;

  // Patrones intermedios (explicación extensa, comparativas, etc.)
  const mediumPatterns = [
    /expl[ií]ca(me)? (en )?detalle/, /detalladamente/,
    /compara(ci[oó]n)? (entre|de) /,
    /lista (completa|detallada|todos|todas)/,
    /todos los (productos|m[oó]dulos|features|beneficios)/,
    /paso a paso/, /step by step/,
  ];

  if (mediumPatterns.some(rx => rx.test(t))) return 6144;

  return 4096;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, mode = "client", context = {} } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array required" });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
    }

    // Build system prompt
    const persona = mode === "internal" ? INTERNAL_PERSONA : CLIENT_PERSONA;
    const contextBlock = buildContextBlock(context, mode);

    const systemPrompt = [
      persona,
      SHARED_RULES,
      "═══ BASE DE CONOCIMIENTO VISION ONE ═══",
      KNOWLEDGE_BASE,
      contextBlock,
    ].join("\n\n");

    // Build messages array for Claude (filter to just role+content)
    const claudeMessages = messages
      .filter(m => m && m.role && m.content)
      .slice(-20) // keep last 20 exchanges to control context size
      .map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: String(m.content).slice(0, 8000) // safety cap per message
      }));

    // Detectar si el usuario está pidiendo una respuesta larga (speech, propuesta,
    // correo, presentación, documento, etc.) y subir max_tokens cuando aplique.
    const lastUserMsg = [...claudeMessages].reverse().find(m => m.role === "user");
    const maxTokens = pickMaxTokens(lastUserMsg ? lastUserMsg.content : "");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: claudeMessages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[advisor] Anthropic API error:", response.status, errText);
      return res.status(response.status).json({
        error: "AI service error",
        detail: errText.slice(0, 500)
      });
    }

    const data = await response.json();
    const reply = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("");

    return res.status(200).json({
      reply,
      usage: data.usage || null,
    });

  } catch (err) {
    console.error("[advisor] error:", err);
    return res.status(500).json({
      error: "Internal server error",
      detail: String(err.message || err).slice(0, 500)
    });
  }
}

// ─── HELPER: CONSTRUIR EL BLOQUE DE CONTEXTO ────────────────────────────
function buildContextBlock(context, mode) {
  if (!context || Object.keys(context).length === 0) {
    return `═══ CONTEXTO DE LA SESIÓN ═══
El usuario aún no ha cargado ningún producto, reporte de consumo ni propuesta en la
calculadora. Si pregunta cómo empezar, oriéntalo: puede (1) agregar productos manualmente
desde el selector, (2) subir un screenshot de su Drawdown mensual de Vision One para
auto-completar, o (3) subir su Entitlement Certificate / propuesta anterior para
auto-completar.`;
  }

  const parts = ["═══ CONTEXTO DE LA SESIÓN ═══"];
  parts.push(`Modo activo: ${mode === "internal" ? "INTERNO (Nextcom)" : "CLIENTE"}`);

  if (context.clientName) {
    parts.push(`Cliente / Empresa: ${context.clientName}`);
  }
  if (context.contactName) {
    parts.push(`Contacto: ${context.contactName}`);
  }

  // Productos en el selector
  if (Array.isArray(context.products) && context.products.length > 0) {
    parts.push("\nProductos en el selector de cotización:");
    context.products.forEach(p => {
      const originLabel = p.origin === "from_usage" ? " [auto desde consumo]"
        : p.origin === "from_proposal" ? " [auto desde propuesta]"
        : p.origin === "edited_usage" || p.origin === "edited_proposal" ? " [editado por usuario]"
        : "";
      parts.push(`- ${p.name}: ${p.qty} ${p.unit || "unidad"}${p.qty !== 1 ? "s" : ""} × ${p.creditsPerUnit} cr = ${p.totalCredits} cr/año${originLabel}`);
    });
    if (context.totalCredits) {
      parts.push(`Total cotización: ${context.totalCredits.toLocaleString()} créditos/año`);
    }
  }

  // Datos de consumo
  if (context.usage && context.usage.annualTotal > 0) {
    parts.push(`\nReporte de consumo cargado:`);
    parts.push(`- Mes: ${context.usage.month || "no especificado"}`);
    parts.push(`- Consumo mensual: ${context.usage.monthlyTotal.toLocaleString()} cr`);
    parts.push(`- Consumo anual proyectado: ${context.usage.annualTotal.toLocaleString()} cr`);
    if (Array.isArray(context.usage.items) && context.usage.items.length > 0) {
      parts.push(`- ${context.usage.items.length} productos detectados en el reporte`);
    }
  }

  // Datos de propuesta
  if (context.proposal && context.proposal.totalPool > 0) {
    parts.push(`\nPropuesta anterior cargada:`);
    parts.push(`- Pool total contratado: ${context.proposal.totalPool.toLocaleString()} cr`);
    if (context.proposal.period) parts.push(`- Periodo: ${context.proposal.period}`);
    if (Array.isArray(context.proposal.items) && context.proposal.items.length > 0) {
      parts.push(`- ${context.proposal.items.length} productos en el contrato`);
    }
  }

  // Análisis comparativo si aplica
  if (context.usage && context.proposal &&
      context.usage.annualTotal > 0 && context.proposal.totalPool > 0) {
    const eff = (context.usage.annualTotal / context.proposal.totalPool) * 100;
    parts.push(`\nAnálisis comparativo disponible:`);
    parts.push(`- Eficiencia de uso del pool: ${eff.toFixed(1)}%`);
    parts.push(`- ${eff > 100 ? "DÉFICIT" : "SOBRANTE"}: ${Math.abs(context.usage.annualTotal - context.proposal.totalPool).toLocaleString()} cr/año`);
    if (eff > 100) {
      parts.push(`- ⚠ El consumo supera al pool contratado — el cliente puede agotar el pool antes del vencimiento.`);
    }
  }

  parts.push("\nUsa este contexto SOLO si la pregunta del usuario lo requiere. No expongas todos los datos sin razón. Si el usuario pregunta sobre 'mi cotización' o 'mi consumo', usa estos datos para dar respuestas específicas en lugar de genéricas.");

  return parts.join("\n");
}
