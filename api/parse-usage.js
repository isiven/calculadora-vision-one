// Vercel Serverless Function — /api/parse-usage
// Receives a screenshot (image) of monthly usage report from Trend Vision One
// and uses Claude API to extract products + monthly credit consumption.
// Returns structured JSON: { products: [{ name, monthly_credits, matched_id }] }

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "32mb",
    },
  },
  maxDuration: 60,  // Permitir hasta 60s (default de Vercel es 10s, no alcanza para procesar imagen con IA)
};

// Compact catalog for product matching (id + name + cr/unit + unit type)
const CATALOG_FOR_MATCHING = `
CATÁLOGO TREND MICRO VISION ONE (Jan 2026) — para matching de productos:

ENDPOINT SECURITY:
- "Endpoint Security Core" → r (45 cr/endpoint)
- "Endpoint Security Essentials" → s (65 cr/endpoint)
- "Endpoint Security Pro" → t (300 cr/endpoint)
- "Endpoint Security SAP" → u (4800 cr/endpoint)
- "Mobile Security" → v (5 cr/dispositivo móvil)

EMAIL & COLLABORATION:
- "Email and Collaboration Security - Core" → x (25 cr/usuario)
- "Email and Collaboration Security - Essentials" → y (50 cr/usuario)
- "Email and Collaboration Security - Pro" → z (105 cr/usuario)

CYBER RISK EXPOSURE MANAGEMENT (CREM):
- "Cyber Risk Exposure Management - Core" → A (20 cr/dispositivo)
- "Cyber Risk Exposure Management - Essentials" → B (50 cr/dispositivo)
- "Cyber Risk Exposure Management - Pro" → C (100 cr/dispositivo)

CLOUD RISK MANAGEMENT (por rango de recursos):
- "Cloud Risk Management 1-500 Resources" → D (1000 cr/cuenta cloud)
- "Cloud Risk Management 501-1000 Resources" → E (2000 cr)
- "Cloud Risk Management 1001-1500 Resources" → F (3000 cr)
- "Cloud Risk Management 1501-2000 Resources" → G (4000 cr)
- "Cloud Risk Management 2001-2500 Resources" → H (5000 cr)
- "Cloud Risk Management 2501-3000 Resources" → I (6000 cr)
- "Cloud Risk Management 3001-3500 Resources" → J (7000 cr)
- "Cloud Risk Management 3501-4000 Resources" → K (8000 cr)

SECURITY OPERATIONS:
- "Agentic SIEM" / "SIEM" → L (5 cr/GB/mes)
- "Agentic SIEM - Analytic Data Ingestion" → L (5 cr/GB/mes)
- "XDR for Endpoints" / "EDR" → P (20 cr/endpoint)
- "XDR for Email" / "EmDR" → Q (5 cr/usuario)
- "XDR for Cloud" / "CDR" → R (3 cr/GB/año)
- "XDR for Network" / "NDR" → S (10 cr/Gbps)
- "XDR for Identity" → T (10 cr/identidad)
- "XDR for Servers" → U (50 cr/servidor)
- "Forensics" → V (400 cr/GB)
- "Sandbox Analysis - Manual Submission" → M (3 cr/análisis)
- "Sandbox Analysis - Automated" → N (5 cr/análisis)

THREAT INTELLIGENCE:
- "Threat Intelligence Core" → X (50 cr/usuario)
- "Threat Intelligence Essentials" → Y (100 cr/usuario)
- "Threat Intelligence Pro" → Z (200 cr/usuario)
- "Companion AI" → a (1500 cr/mes)
- "Threat Hunting" → b (200 cr/hunt)
- "Attack Surface Discovery" → c (10 cr/asset)

CLOUD SECURITY (Workload):
- "Server & Workload Protection - Standard" → d (40 cr/server)
- "Container Security" → e (30 cr/container)
- "File Storage Security" → f (5 cr/file)

ZERO TRUST SECURE ACCESS (ZTSA):
- "Zero Trust Secure Access - Internet Access" → AA (60 cr/usuario)
- "Zero Trust Secure Access - Private Access" → AB (50 cr/usuario)
- "Zero Trust Secure Access - Internet + Private Access" → AC (110 cr/usuario)
- "AI Service Access" / "AI Secure Access" → AD (50 cr/usuario)
- "Zero Trust Secure Access - Internet Access + AI Secure Access" → AE (110 cr/usuario)
- "Outbound Static IP Add-on" → AF (varies cr/256Mbps)

DATA SECURITY:
- "Data Security Posture Management" / "DSPM" → AG (30 cr/data source)

AI SECURITY:
- "AI Security" / "AI Application Security" → AH (varies)
- "AI Guard" → AI (varies)
- "AI Risk Posture" → AJ (varies)

INSTRUCCIONES DE MATCHING:
1. Lee CADA fila del screenshot (producto + número de créditos a la derecha)
2. Para cada fila, busca el producto en el catálogo arriba que mejor coincida
3. Devuelve el "matched_id" (la letra: r, s, t, AC, etc.) que mejor matchea
4. Si no estás seguro del match (texto ambiguo), pon matched_id: null
5. Los créditos en el screenshot son CONSUMO MENSUAL (un mes específico)
6. Si ves cantidades como "1,701" o "1.701" o "1701", interpretarlo como 1701
`;

const SYSTEM_PROMPT = `Eres un experto en productos Trend Micro Vision One que analiza reportes de uso mensual.

Tu tarea: leer una imagen (screenshot) de un reporte de consumo mensual de Vision One y extraer cada producto con sus créditos consumidos en el mes mostrado.

${CATALOG_FOR_MATCHING}

Devuelve SOLO un JSON válido (sin markdown, sin explicación, sin texto adicional) con esta estructura exacta:

{
  "month_label": "April 2026",
  "products": [
    {
      "name_in_screenshot": "Endpoint Security Pro",
      "monthly_credits": 1900,
      "matched_id": "t",
      "match_confidence": "high"
    },
    {
      "name_in_screenshot": "XDR for Endpoints (EDR)",
      "monthly_credits": 40,
      "matched_id": "P",
      "match_confidence": "high"
    }
  ],
  "total_monthly_detected": 8932,
  "notes": "Reporte de Trend Vision One mostrando consumo del mes corriente"
}

Reglas:
- match_confidence: "high" (match exacto), "medium" (similar pero variante), "low" (muy ambiguo)
- Si matched_id es null, pon match_confidence: "low"
- Si NO es un reporte de Vision One, devuelve products: [] y notes: "No es un reporte de Vision One"
- Los créditos son números enteros, sin comas ni puntos como separadores
- NO inventes productos que no estén en la imagen
- NO inventes números, lee solo lo que veas claramente`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fileData, fileType } = req.body;

    if (!fileData || !fileType) {
      return res.status(400).json({ error: "Missing fileData or fileType" });
    }

    // Only accept images for usage reports
    if (!fileType.startsWith("image/")) {
      return res.status(400).json({
        error: "Solo imágenes son aceptadas para reportes de uso. Toma un screenshot del reporte.",
      });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
    }

    // Build content with image
    const content = [
      {
        type: "image",
        source: {
          type: "base64",
          media_type: fileType,
          data: fileData,
        },
      },
      {
        type: "text",
        text: "Analiza este reporte de uso mensual de Trend Vision One. Extrae cada producto con sus créditos consumidos en el mes mostrado. Devuelve solo el JSON.",
      },
    ];

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

    // Try to extract JSON (handle case where Claude adds markdown code fences)
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
        error: "La IA respondió en un formato inesperado. Intenta con una imagen más clara.",
        raw: responseText.substring(0, 500),
      });
    }

    return res.status(200).json(parsed);
  } catch (e) {
    console.error("Server error:", e);
    return res.status(500).json({ error: e.message || "Error interno" });
  }
}
