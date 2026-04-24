// Vercel Serverless Function — proxy para obtener tasas de cambio USD → VES
// Se ejecuta en el servidor de Vercel (no en el navegador), por eso evita CORS.
// Endpoint: /api/rates

export default async function handler(req, res) {
  // Permitir CORS para nuestro propio dominio (y cualquier preview de Vercel)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600"); // cache 15 min

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const out = { bcv: null, binance: null, paralelo: null, updatedAt: new Date().toISOString(), source: null, error: null };

  // Intento 1: ve.dolarapi.com (array simple)
  try {
    const r = await fetch("https://ve.dolarapi.com/v1/dolares", {
      headers: { "User-Agent": "Nextcom-Calculator/1.0" }
    });
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data)) {
        data.forEach(item => {
          const name = (item.nombre || item.fuente || "").toLowerCase();
          const price = item.promedio || item.venta || item.compra;
          if (!price) return;
          if (name.includes("oficial") || name.includes("bcv")) out.bcv = price;
          else if (name.includes("binance") || name.includes("bitcoin") || name.includes("cripto")) out.binance = price;
          else if (name.includes("paralelo")) out.paralelo = price;
        });
        if (out.bcv || out.binance || out.paralelo) {
          out.source = "ve.dolarapi.com";
          return res.status(200).json(out);
        }
      }
    }
  } catch (e) {
    out.error = "dolarapi: " + e.message;
  }

  // Intento 2: pydolarve
  try {
    const r = await fetch("https://pydolarve.org/api/v1/dollar?page=criptodolar", {
      headers: { "User-Agent": "Nextcom-Calculator/1.0" }
    });
    if (r.ok) {
      const d = await r.json();
      const monitors = d.monitors || {};
      Object.entries(monitors).forEach(([key, m]) => {
        const k = (key + " " + (m.title || m.name || "")).toLowerCase();
        const price = m.price;
        if (!price) return;
        if (k.includes("bcv") || k.includes("oficial")) out.bcv = price;
        else if (k.includes("binance")) out.binance = price;
        else if (k.includes("paralelo") || k.includes("enparalelo")) out.paralelo = price;
      });
      if (out.bcv || out.binance || out.paralelo) {
        out.source = "pydolarve.org";
        return res.status(200).json(out);
      }
    }
  } catch (e) {
    out.error = (out.error || "") + " | pydolarve: " + e.message;
  }

  // Intento 3: bcv-api.rafnixg.dev (solo BCV pero como último recurso)
  try {
    const r = await fetch("https://bcv-api.rafnixg.dev/rates/");
    if (r.ok) {
      const d = await r.json();
      out.bcv = d.dollar || d.rate || null;
      if (out.bcv) {
        out.source = "bcv-api.rafnixg.dev";
        return res.status(200).json(out);
      }
    }
  } catch (e) {
    out.error = (out.error || "") + " | bcv-api: " + e.message;
  }

  // Si todo falla
  return res.status(503).json({ ...out, error: out.error || "Todas las fuentes fallaron" });
}
