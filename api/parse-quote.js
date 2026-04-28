// Vercel Serverless Function — /api/parse-quote
// Receives a file (PDF, image, text) and uses Claude API to extract quote data
// Returns structured JSON with lines, client, dates, etc.

// Increase body size limit for file uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "32mb",
    },
  },
};

const CATALOG_REFERENCE = `
CATÁLOGO OFICIAL TREND MICRO VISION ONE (Jan 2026):

Vision One Credits:
- VORN0309 / VONN0309: Vision One Credits — 1 cr/crédito (es el pool de créditos)

Endpoint Security:
- VORN0034 / VONN0034: Endpoint Security Core — 45 cr/endpoint
- VORN0051 / VONN0051: Endpoint Security Pro — 300 cr/endpoint
- Endpoint Security Essentials — 65 cr/endpoint
- Mobile Security — 5 cr/dispositivo

Email & Collaboration:
- VORN0175 / VONN0175: Email & Collaboration Core — 25 cr/usuario
- Email & Collaboration Essentials — 50 cr/usuario
- Email & Collaboration Pro — 105 cr/usuario

Cyber Risk & Cloud:
- VORN0150 / VONN0150: Cyber Risk Exposure Management (CREM) Core — 20 cr/dispositivo
- CREM Essentials — 50 cr/dispositivo
- VORN0256 / VONN0256: Cloud Risk Management 1–500 recursos — 1000 cr/cuenta cloud
- Cloud Risk Management 501–1000 recursos — 2000 cr/cuenta cloud
- Cloud Risk Management 1001–1500 recursos — 3000 cr/cuenta cloud
- Cloud Risk Management 1501–2000 recursos — 4000 cr/cuenta cloud
- Cloud Risk Management 2001–2500 recursos — 5000 cr/cuenta cloud

XDR / Security Ops:
- XDR for Endpoints (EDR) — 20 cr/endpoint
- XDR for Email (EmDR) — 5 cr/usuario
- XDR for Cloud (CDR) — 3 cr/GB/año
- Forensics — 400 cr/GB

Network Security:
- ZTSA Internet + Private Access — 110 cr/usuario
- ZTSA Internet Access — 60 cr/usuario
- ZTSA Private Access — 50 cr/usuario
- ZTSA AI Service Access — 50 cr/usuario

Data Security:
- Data Security Endpoint — 30 cr/endpoint
`;

// Mapping from SKU to our internal product IDs (matches CATALOG in App.jsx)
const SKU_TO_ID = {
  "VORN0309": "AK", "VONN0309": "AK",   // Vision One Credits
  "VORN0034": "r",  "VONN0034": "r",     // Endpoint Core
  "VORN0051": "t",  "VONN0051": "t",     // Endpoint Pro
  "VORN0175": "x",  "VONN0175": "x",     // Email Core
  "VORN0150": "A",  "VONN0150": "A",     // CREM Core
  "VORN0256": "D",  "VONN0256": "D",     // Cloud Risk Mgmt 1-500
};

// Name-based fallback mapping for when SKU isn't recognized
// IMPORTANT: more specific patterns must come BEFORE generic ones
const NAME_HINTS = [
  // Vision One Credits (specific first)
  { match: /vision one credits|trend vision one credits/i, id: "AK" },

  // Endpoint Security
  { match: /sap scanner.*endpoint/i, id: "u" },
  { match: /endpoint.*core/i, id: "r" },
  { match: /endpoint.*essentials/i, id: "s" },
  { match: /endpoint.*pro/i, id: "t" },
  { match: /mobile security/i, id: "v" },

  // Email
  { match: /email.*core|email and collab.*core/i, id: "x" },
  { match: /email.*essentials|email and collab.*essentials/i, id: "y" },
  { match: /email.*pro|email and collab.*pro/i, id: "z" },

  // Cyber Risk Exposure Management
  { match: /crem.*core|cyber risk.*core|exposure management.*core/i, id: "A" },
  { match: /crem.*essentials.*network|exposure management.*essentials.*network/i, id: "C" },
  { match: /crem.*essentials|exposure management.*essentials/i, id: "B" },

  // Cloud Risk Management (specific tiers)
  { match: /cloud risk.*3501|cloud risk.*3500\+/i, id: "K" },
  { match: /cloud risk.*3001|cloud risk.*3500/i, id: "J" },
  { match: /cloud risk.*2501|cloud risk.*3000/i, id: "I" },
  { match: /cloud risk.*2001|cloud risk.*2500/i, id: "H" },
  { match: /cloud risk.*1501|cloud risk.*2000/i, id: "G" },
  { match: /cloud risk.*1001|cloud risk.*1500/i, id: "F" },
  { match: /cloud risk.*501|cloud risk.*1000/i, id: "E" },
  { match: /cloud risk.*1-500|cloud risk.*500/i, id: "D" },
  { match: /cloud risk|cloud assets/i, id: "D" }, // generic fallback

  // XDR
  { match: /xdr.*networks.*deep discovery|deep discovery inspector/i, id: "T" },
  { match: /xdr.*networks|ndr/i, id: "U" },
  { match: /edr|xdr.*endpoint/i, id: "R" },
  { match: /emdr|xdr.*email/i, id: "S" },
  { match: /cdr|xdr.*cloud/i, id: "V" },

  // Forensics & Data Pipeline
  { match: /forensics/i, id: "P" },
  { match: /data pipeline/i, id: "Q" },

  // Agentic SIEM
  { match: /siem.*analytic.*ingestion/i, id: "L" },
  { match: /siem.*archival.*ingestion/i, id: "M" },
  { match: /siem.*analytic.*retention/i, id: "N" },
  { match: /siem.*archival.*retention/i, id: "O" },

  // Sandbox
  { match: /sandbox.*manual/i, id: "X" },
  { match: /sandbox.*ztsa|sandbox.*internet access/i, id: "Y" },
  { match: /sandbox.*networks/i, id: "Z" },
  { match: /sandbox.*endpoint/i, id: "a" },

  // Threat Intelligence
  { match: /threat intelligence.*service provider|threat.*xsp/i, id: "c" },
  { match: /threat intelligence/i, id: "b" },

  // Container Security
  { match: /container.*custom rule/i, id: "f" },
  { match: /container.*serverless/i, id: "e" },
  { match: /container/i, id: "d" },

  // File Security
  { match: /file security.*virtual.*scanner/i, id: "i" },
  { match: /file security.*virtual/i, id: "g" },
  { match: /file security.*containerized.*scanner/i, id: "l" },
  { match: /file security.*containerized/i, id: "j" },
  { match: /file security.*sdk/i, id: "m" },
  { match: /file security.*storage.*bucket/i, id: "q" },
  { match: /file security.*storage/i, id: "o" },

  // ZTSA
  { match: /ztsa.*internet.*private|zero trust.*internet.*private/i, id: "AA" },
  { match: /ztsa.*internet.*ai|zero trust.*internet.*ai/i, id: "AE" },
  { match: /ztsa.*outbound|zero trust.*outbound|static ip/i, id: "AF" },
  { match: /ztsa.*internet|zero trust.*internet/i, id: "AB" },
  { match: /ztsa.*private|zero trust.*private/i, id: "AC" },
  { match: /ztsa.*ai|zero trust.*ai/i, id: "AD" },

  // Data Security
  { match: /data security.*endpoint/i, id: "AG" },

  // AI Security
  { match: /ai.*application.*private/i, id: "AH" },
  { match: /ai.*application.*saas/i, id: "AI" },
  { match: /ai security package/i, id: "AJ" },
];

function resolveProductId(sku, productName) {
  // Try SKU first (normalize)
  if (sku) {
    const normalized = sku.replace(/[*\s]/g, "").toUpperCase();
    if (SKU_TO_ID[normalized]) return SKU_TO_ID[normalized];
  }
  // Fall back to name matching
  if (productName) {
    for (const hint of NAME_HINTS) {
      if (hint.match.test(productName)) return hint.id;
    }
  }
  return null;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY no configurada en Vercel" });
  }

  try {
    const { fileBase64, mediaType, fileName } = req.body;
    if (!fileBase64) return res.status(400).json({ error: "No se recibió archivo" });

    // Build the content block depending on media type
    let contentBlock;
    if (mediaType === "application/pdf") {
      contentBlock = {
        type: "document",
        source: { type: "base64", media_type: "application/pdf", data: fileBase64 }
      };
    } else if (mediaType.startsWith("image/")) {
      contentBlock = {
        type: "image",
        source: { type: "base64", media_type: mediaType, data: fileBase64 }
      };
    } else {
      // Text-based (Excel, Word extracted, plain text) — decode and send as text
      const text = Buffer.from(fileBase64, "base64").toString("utf8");
      contentBlock = { type: "text", text: `Contenido del archivo "${fileName}":\n\n${text.slice(0, 100000)}` };
    }

    const systemPrompt = `Eres un asistente especializado en analizar cotizaciones de licenciamiento Trend Micro y extraer su contenido estructurado. Tu trabajo es leer el documento que te envían (puede ser una cotización de Nextcom, de Trend Micro directo, de otro partner, o incluso un email) y extraer:

1. Nombre del cliente
2. Fechas de vigencia (inicio y vencimiento) — usualmente un año, puede ser prorrateado
3. Todas las líneas de productos Trend Micro con: SKU (si aparece), nombre del producto, cantidad, precio unitario
4. Si hay línea de Soporte Platinum (precio único, no consume créditos)

${CATALOG_REFERENCE}

IMPORTANTE:
- Los SKUs pueden venir como "VORN0034", "VONN0034", "*VORN0150", etc. Normaliza quitando asteriscos y espacios.
- Vision One Credits (VORN0309) es el pool de créditos — trátalo como una línea normal.
- Ignora líneas que sean solo subtotal, impuesto, o total.
- Para "Soporte Platinum" extrae su precio al cliente (rate × qty).
- Si no puedes determinar las fechas de vigencia del contenido, déjalas vacías (el usuario las llenará).
- Si el documento tiene notas como "vigente hasta X" o "renovación 2026-2027", usa eso para las fechas.
- Retorna TODA la información usando la herramienta extract_quote.`;

    const anthropicReq = {
      model: "claude-sonnet-4-5",
      max_tokens: 4096,
      system: systemPrompt,
      tools: [
        {
          name: "extract_quote",
          description: "Extrae la estructura completa de la cotización",
          input_schema: {
            type: "object",
            properties: {
              clientName: {
                type: "string",
                description: "Nombre del cliente final. Vacío si no es claro."
              },
              quoteNumber: {
                type: "string",
                description: "Número de cotización si aparece (ej: 4196). Vacío si no."
              },
              startDate: {
                type: "string",
                description: "Fecha de inicio de vigencia en formato YYYY-MM-DD. Vacío si no es claro."
              },
              endDate: {
                type: "string",
                description: "Fecha de vencimiento en formato YYYY-MM-DD. Vacío si no es claro."
              },
              isRenewal: {
                type: "boolean",
                description: "true si es renovación, false si es licenciamiento nuevo"
              },
              lines: {
                type: "array",
                description: "Todas las líneas de productos Trend Micro (excluye subtotales, impuestos, soporte)",
                items: {
                  type: "object",
                  properties: {
                    sku: { type: "string", description: "SKU del producto (ej: VORN0034). Vacío si no aparece." },
                    productName: { type: "string", description: "Nombre completo del producto tal como aparece" },
                    quantity: { type: "number", description: "Cantidad del producto" },
                    unitPrice: { type: "number", description: "Precio unitario en USD. 0 si no aparece." }
                  },
                  required: ["productName", "quantity"]
                }
              },
              soportePlatinum: {
                type: "object",
                description: "Línea de Soporte Platinum si existe en la cotización",
                properties: {
                  price: { type: "number", description: "Precio total del soporte al cliente en USD" },
                  present: { type: "boolean", description: "true si existe línea de soporte en la cotización" }
                }
              },
              confidence: {
                type: "string",
                enum: ["high", "medium", "low"],
                description: "Tu nivel de confianza en la extracción"
              },
              notes: {
                type: "string",
                description: "Notas relevantes (ej: 'PDF poco legible en línea 3', 'fechas asumidas'). Vacío si ninguna."
              }
            },
            required: ["lines", "confidence"]
          }
        }
      ],
      tool_choice: { type: "tool", name: "extract_quote" },
      messages: [
        {
          role: "user",
          content: [
            contentBlock,
            { type: "text", text: "Analiza este documento y extrae la estructura completa de la cotización usando la herramienta extract_quote." }
          ]
        }
      ]
    };

    const anthropicResp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(anthropicReq)
    });

    if (!anthropicResp.ok) {
      const errText = await anthropicResp.text();
      console.error("Anthropic API error:", errText);
      return res.status(502).json({
        error: `Error de Claude API: ${anthropicResp.status}`,
        detail: errText.slice(0, 500)
      });
    }

    const data = await anthropicResp.json();

    // Find the tool_use block
    const toolUse = data.content?.find(b => b.type === "tool_use");
    if (!toolUse) {
      return res.status(502).json({ error: "Claude no devolvió estructura esperada", raw: data });
    }

    const extracted = toolUse.input;

    // Map each line to our internal product ID
    const mappedLines = (extracted.lines || []).map(l => ({
      sku: (l.sku || "").replace(/[*\s]/g, "").toUpperCase(),
      productName: l.productName || "",
      quantity: l.quantity || 0,
      unitPrice: l.unitPrice || 0,
      prodId: resolveProductId(l.sku, l.productName)
    }));

    return res.status(200).json({
      ok: true,
      clientName: extracted.clientName || "",
      quoteNumber: extracted.quoteNumber || "",
      startDate: extracted.startDate || "",
      endDate: extracted.endDate || "",
      isRenewal: extracted.isRenewal || false,
      lines: mappedLines,
      soportePlatinum: extracted.soportePlatinum || { present: false, price: 0 },
      confidence: extracted.confidence || "medium",
      notes: extracted.notes || "",
      usage: data.usage || null
    });

  } catch (e) {
    console.error("Parse quote error:", e);
    return res.status(500).json({ error: e.message || "Error interno" });
  }
}
