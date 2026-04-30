// Vercel Serverless Function — /api/parse-proposal
// Receives a previous Trend Micro proposal/quote (PDF, image, text)
// Extracts: total credits purchased + per-product breakdown if available

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "32mb",
    },
  },
  maxDuration: 60,  // Permitir hasta 60s (default de Vercel es 10s, no alcanza para procesar PDF con IA)
};

const CATALOG_FOR_MATCHING = `
CATÁLOGO TREND MICRO VISION ONE (Jan 2026):

ENDPOINT SECURITY:
- "Endpoint Security Core" → r (45 cr/endpoint)
- "Endpoint Security Essentials" → s (65 cr/endpoint)
- "Endpoint Security Pro" → t (300 cr/endpoint)
- "Endpoint Security SAP" → u (4800 cr/endpoint)
- "Mobile Security" → v (5 cr/dispositivo)

EMAIL & COLLABORATION:
- "Email and Collaboration Security - Core" → x (25 cr/usuario)
- "Email and Collaboration Security - Essentials" → y (50 cr/usuario)
- "Email and Collaboration Security - Pro" → z (105 cr/usuario)

CYBER RISK EXPOSURE MANAGEMENT:
- "Cyber Risk Exposure Management - Core" → A (20 cr/dispositivo)
- "Cyber Risk Exposure Management - Essentials" → B (50 cr/dispositivo)
- "Cyber Risk Exposure Management - Pro" → C (100 cr/dispositivo)

CLOUD RISK MANAGEMENT (por rango):
- "Cloud Risk Management 1-500" → D (1000 cr)
- "Cloud Risk Management 501-1000" → E (2000 cr)
- "Cloud Risk Management 1001-1500" → F (3000 cr)
- "Cloud Risk Management 1501-2000" → G (4000 cr)
- "Cloud Risk Management 2001-2500" → H (5000 cr)
- "Cloud Risk Management 2501-3000" → I (6000 cr)
- "Cloud Risk Management 3001-3500" → J (7000 cr)
- "Cloud Risk Management 3501-4000" → K (8000 cr)

SECURITY OPERATIONS:
- "Agentic SIEM" / "SIEM" → L (5 cr/GB/mes)
- "Sandbox Analysis - Manual" → M (3 cr)
- "Sandbox Analysis - Automated" → N (5 cr)
- "XDR for Endpoints" / "EDR" → P (20 cr/endpoint)
- "XDR for Email" / "EmDR" → Q (5 cr/usuario)
- "XDR for Cloud" / "CDR" → R (3 cr/GB/año)
- "XDR for Network" / "NDR" → S (10 cr/Gbps)
- "XDR for Identity" → T (10 cr/identidad)
- "XDR for Servers" → U (50 cr/servidor)
- "Forensics" → V (400 cr/GB)

THREAT INTELLIGENCE:
- "Threat Intelligence Core" → X (50 cr/usuario)
- "Threat Intelligence Essentials" → Y (100 cr/usuario)
- "Threat Intelligence Pro" → Z (200 cr/usuario)
- "Companion AI" → a (1500 cr/mes)
- "Threat Hunting" → b (200 cr/hunt)
- "Attack Surface Discovery" → c (10 cr/asset)

CLOUD SECURITY:
- "Server & Workload Protection" → d (40 cr/server)
- "Container Security" → e (30 cr/container)
- "File Storage Security" → f (5 cr/file)

ZTSA:
- "ZTSA Internet Access" → AA (60 cr/usuario)
- "ZTSA Private Access" → AB (50 cr/usuario)
- "ZTSA Internet + Private Access" → AC (110 cr/usuario)
- "AI Service Access" → AD (50 cr/usuario)
- "ZTSA Internet + AI Secure Access" → AE (110 cr/usuario)
- "Outbound Static IP Add-on" → AF

DATA SECURITY:
- "Data Security Posture Management" / "DSPM" → AG (30 cr/data source)

AI SECURITY:
- "AI Application Security" → AH
- "AI Guard" → AI
- "AI Risk Posture" → AJ

VISION ONE CREDITS POOL:
- "Vision One Credits" / "Pool de créditos" → AK (1 cr/crédito - este es el TOTAL del pool)

NOTAS SOBRE SKUs DE TREND MICRO:
- Los SKUs pueden tener prefijo "VORN" (renovación) o "VONN" (new purchase). Son el MISMO producto, solo cambia si es nueva compra o renovación.
- Mapping de SKUs comunes:
  * VONN0000 / VORN0232 / VORN0309 / VONN0309 / VONN0358 → Vision One Credits Pool (matched_id="AK")
    ESTOS SON CRÉDITOS PUROS, NO un producto individual.
  * VORN0033 / VONN0034 / VONN0035 → Endpoint Security Core (r) — distintos rangos de pricing
  * VORN0051 / VONN0051 / VONN0052 → Endpoint Security Pro (t) — distintos rangos de pricing
  * VORN0174 / VONN0175 / VONN0186 → Email and Collaboration Core (x) — distintos rangos
  * VORN0150 / VONN0150 / VONN0159 / VONN0161 → Cyber Risk Exposure Management Core (A)
  * VORN0256 / VONN0256 / VONN0305 → Cloud Risk Management 1001-1500 (F) o el rango que aplique (D=1-500, E=501-1000, F=1001-1500, G=1501-2000, H=2001-2500, I=2501-3000)

⚠️⚠️⚠️ REGLA #1 — LA MÁS IMPORTANTE — LEE CON CUIDADO ⚠️⚠️⚠️

EN LOS ENTITLEMENT CERTIFICATES DE TREND MICRO, EL CAMPO "Volume:" ES LA ÚNICA FUENTE DE VERDAD PARA LA CANTIDAD.

NUNCA, JAMÁS, BAJO NINGUNA CIRCUNSTANCIA uses los números que aparecen en el NOMBRE del producto como cantidad. Los números en el nombre son RANGOS DE PRICING TIER, no cantidades.

Ejemplos PROHIBIDOS de mala interpretación:

❌ MAL: "Endpoint Security (Core) Normal 51-250 Devices, Volume: 230"
   La IA NO debe leer "51-250" como rango y poner quantity=250 o promediarlo.
   Tampoco debe tomar 51 ni 250.

✅ BIEN: quantity = 230 (del campo Volume)
   El "Normal 51-250 Devices" significa: "este SKU aplica para clientes que compran entre 51 y 250 dispositivos"
   Es solo el TIER comercial. La cantidad real comprada es 230.

❌ MAL: "Cyber Risk Exposure Management - Core Normal 251-500, Volume: 295"
   La IA NO debe leer "251-500" como cantidad ni 500 ni 251.
   Tampoco debe sumarlos.

✅ BIEN: quantity = 295 (del campo Volume)

❌ MAL: "Email and Collaboration Security - Core Normal 251-500 Users, Volume: 460"
   La IA NO debe usar 500 como qty.

✅ BIEN: quantity = 460 (del campo Volume)

EJEMPLOS DE TIERS COMERCIALES TÍPICOS (estos son SIEMPRE rangos, NUNCA cantidades):
- "Normal 1-100"
- "Normal 1-250"
- "Normal 1-500"
- "Normal 51-250"
- "Normal 251-500"
- "Normal 501-1000"
- "Normal 1001-1500"
- "Normal 1501-2000"
- "Normal 2001-2500"
- "Normal 1+" (capacidad ilimitada)

Cuando veas cualquier patrón "Normal X-Y" o "Normal X+" en el nombre del producto, IGNÓRALO para efectos de cantidad. Solo usa el campo "Volume:" del bloque del Entitlement Certificate.

═══════════════════════════════════════════════════════════════════

OTRAS REGLAS CRÍTICAS PARA ENTITLEMENT CERTIFICATES:

1. CUANDO EL SKU ES VONN0000 / VORN0232 / VORN0309 / VONN0309 / VONN0358:
   → Es un POOL puro de créditos, NO un producto regular.
   → Debe ir en el campo "total_credits_purchased" del JSON raíz.
   → NO ponerlo dentro del array "products".
   → El "Volume" ES directamente el número de créditos comprados.
   → matched_id NO se usa para el pool.

2. PARA PRODUCTOS REGULARES (no pool):
   → quantity = Volume (NUNCA del rango del nombre)
   → credits_per_unit = los créditos del catálogo:
     * Email & Collaboration Core = 25 cr/usuario
     * Email & Collaboration Essentials = 50 cr/usuario
     * Email & Collaboration Pro = 105 cr/usuario
     * Endpoint Core = 45 cr/dispositivo
     * Endpoint Essentials = 65 cr/dispositivo
     * Endpoint Pro = 300 cr/dispositivo
     * CREM Core = 20 cr/dispositivo
     * CREM Essentials = 50 cr/dispositivo
     * CREM Pro = 100 cr/dispositivo
     * Cloud Risk Mgmt 1-500 = 1000 cr (la unidad ES la suscripción a ese rango)
     * Cloud Risk Mgmt 501-1000 = 2000 cr
     * Cloud Risk Mgmt 1001-1500 = 3000 cr
     * Cloud Risk Mgmt 1501-2000 = 4000 cr
   → total_credits = quantity × credits_per_unit
   → unit: para todos los productos regulares la unidad es "seat" / "usuario" / "dispositivo" / "endpoint" según corresponda. SOLO Vision One Credits Pool usa "crédito" como unidad.

3. EJEMPLO COMPLETO DE INTERPRETACIÓN CORRECTA:

   Documento muestra:
     "Trend Vision One Email and Collaboration Security - Core Normal 251-500 Users Renew"
     SKU: VORN0174
     Volume: 460
     Start Date: 04/30/25
     End Date: 04/29/26

   Respuesta correcta:
   {
     "name_in_proposal": "Email and Collaboration Security - Core",
     "sku": "VORN0174",
     "matched_id": "x",
     "quantity": 460,           ← del campo Volume, NO del rango "251-500"
     "unit": "usuarios",
     "credits_per_unit": 25,    ← Email Core son 25 cr/usuario
     "total_credits": 11500,    ← 460 × 25 = 11,500
     "start_date": "2025-04-30",
     "end_date": "2026-04-29",
     "dates_confidence": "explicit",
     "match_confidence": "high"
   }

4. EJEMPLO PARA POOL:
   Documento: "Trend Vision One Credits Normal 1+ Credits New, Volume: 2135, SKU: VONN0000"
   Resultado correcto:
   {
     "total_credits_purchased": 2135,
     "products": []  ← NO se pone aquí, va en total_credits_purchased
   }

5. SI UN PDF TIENE MÚLTIPLES CERTIFICADOS (varias páginas):
   → Cada página es un certificado independiente
   → Cada producto regular va al array "products" con su propio Volume
   → Cada certificado de pool standalone se SUMA al total_credits_purchased
   → Ejemplo: si hay un certificado de pool de 2,135 cr y 5 certificados de productos regulares:
     total_credits_purchased = 2135
     products = [los 5 productos individuales, cada uno con SU PROPIO Volume]

VERIFICACIÓN ANTES DE RESPONDER:
Antes de devolver el JSON, REVISA cada producto:
- ¿quantity coincide con el campo "Volume" del documento? ← SÍ DEBE
- ¿quantity coincide con algún rango del nombre del producto (51, 250, 500, 1000)? ← NO DEBE
- ¿total_credits = quantity × credits_per_unit? ← SÍ DEBE

Si una respuesta no pasa estas 3 verificaciones, está MAL.
`;

const SYSTEM_PROMPT = `Eres un experto en propuestas, certificados y cotizaciones de Trend Micro Vision One.

Tu tarea: leer un documento (PDF, imagen o texto) que puede ser:
- Un Entitlement Certificate de Trend Micro (oficial, alta confianza)
- Una cotización formal de partner
- Un screenshot del portal Vision One
- Un email/documento informal con productos

Y extraer:
1. El TOTAL de créditos Vision One comprados (el pool)
2. El desglose por producto si está disponible
3. Las FECHAS de inicio y vencimiento (con marca de confianza)

${CATALOG_FOR_MATCHING}

DETECCIÓN DE TIPO DE FUENTE (campo "source_type"):
- "entitlement_certificate": documento oficial de Trend Micro con campos como "Customer No.", "TM Program Number", "Start Date", "End Date", SKU "VONN..." o "VORN...". MÁXIMA CONFIANZA EN DATOS.
- "partner_quote": cotización formal con encabezado de un partner/reseller, totales y términos comerciales
- "screenshot": captura de pantalla del portal Vision One mostrando productos contratados
- "informal": email, chat, documento de Word sin estructura formal

DETECCIÓN DE FECHAS (campo "dates_confidence" por producto):
- "explicit": el documento muestra fechas literales claras (ej. "Start Date: 09/30/25", "End Date: 09/29/26")
- "inferred": las fechas se derivan de un periodo global (ej. "vigencia 2025-2026" → infiero 2025-01-01 a 2026-12-31)
- "unknown": NO HAY información clara de fechas. NO INVENTES — devuelve start_date y end_date como cadenas vacías "".

REGLA CRÍTICA: si no encuentras fechas claras, NO las inventes. Mejor devolver "" (vacío) y dates_confidence: "unknown" para que el cliente las confirme.

Devuelve SOLO un JSON válido (sin markdown, sin explicación) con esta estructura:

{
  "source_type": "entitlement_certificate",
  "client_name": "JVCKENWOOD LATIN AMERICA, S.A.",
  "customer_no": "54663",
  "reseller_name": "NEXTCOM SYSTEMS INC.",
  "proposal_date": "2025-09-30",
  "proposal_period": "2025-2026",
  "proposal_start_date": "2025-09-30",
  "proposal_end_date": "2026-09-29",
  "total_credits_purchased": 300,
  "products": [
    {
      "name_in_proposal": "Cyber Risk Exposure Management - Core (Normal 1-100)",
      "sku": "VONN0159",
      "matched_id": "A",
      "quantity": 15,
      "unit": "endpoints",
      "credits_per_unit": 20,
      "total_credits": 300,
      "start_date": "2025-09-30",
      "end_date": "2026-09-29",
      "dates_confidence": "explicit",
      "match_confidence": "high"
    }
  ],
  "notes": "Entitlement Certificate oficial de Trend Micro"
}

REGLAS IMPORTANTES:
- source_type: usa los criterios arriba
- Para CADA producto, dates_confidence es OBLIGATORIO
- Si dates_confidence es "unknown", start_date y end_date deben ser "" (cadena vacía)
- NUNCA inventes fechas. Si dudas → "unknown"
- total_credits_purchased: pool comprado (suma todos los certificados si hay varios en el mismo PDF)
- Si el documento tiene VARIOS certificados/líneas (como un PDF con múltiples páginas de Entitlement), cada uno es un producto separado con sus propias fechas
- match_confidence: "high" (match exacto), "medium" (similar), "low" (ambiguo)
- Si NO es un documento Vision One, devuelve products: [] y total_credits_purchased: 0
- Los créditos son números enteros, sin comas
- Si la propuesta tiene precios, IGNÓRALOS — solo nos interesan créditos, cantidades y fechas
- sku: si aparece (ej. "VONN0159"), inclúyelo. Es un dato útil para el cliente.
- customer_no: si aparece, inclúyelo
- reseller_name: si aparece, inclúyelo`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fileData, fileType } = req.body;
    if (!fileData || !fileType) {
      return res.status(400).json({ error: "Missing fileData or fileType" });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
    }

    // Build content based on file type
    let content;
    if (fileType === "application/pdf") {
      content = [
        {
          type: "document",
          source: { type: "base64", media_type: "application/pdf", data: fileData },
        },
        {
          type: "text",
          text: "Analiza esta propuesta/cotización anterior de Trend Vision One. Extrae el total de créditos comprados y el desglose por producto si existe. Devuelve solo el JSON.",
        },
      ];
    } else if (fileType.startsWith("image/")) {
      content = [
        {
          type: "image",
          source: { type: "base64", media_type: fileType, data: fileData },
        },
        {
          type: "text",
          text: "Analiza esta propuesta/cotización anterior de Trend Vision One. Extrae el total de créditos comprados y el desglose por producto si existe. Devuelve solo el JSON.",
        },
      ];
    } else if (fileType === "text/plain" || fileType === "application/octet-stream") {
      // Decode base64 to text
      const text = Buffer.from(fileData, "base64").toString("utf-8");
      content = [
        {
          type: "text",
          text: `Analiza este texto de propuesta/cotización anterior de Trend Vision One. Extrae el total de créditos comprados y el desglose por producto si existe. Devuelve solo el JSON.\n\nCONTENIDO:\n${text}`,
        },
      ];
    } else {
      return res.status(400).json({ error: "Tipo de archivo no soportado: " + fileType });
    }

    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 4000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Claude API error:", errText);
      return res.status(500).json({ error: "Error procesando con IA: " + errText });
    }

    const data = await response.json();
    const responseText = data.content[0].text.trim();

    // Clean up potential markdown
    let cleanJson = responseText;
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Failed to parse JSON. Raw:", responseText);
      return res.status(500).json({
        error: "La IA respondió en un formato inesperado. Intenta con un archivo más claro.",
        raw: responseText.substring(0, 500),
      });
    }

    return res.status(200).json(parsed);
  } catch (e) {
    console.error("Server error:", e);
    return res.status(500).json({ error: e.message || "Error interno" });
  }
}
