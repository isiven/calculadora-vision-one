import { useState, useRef, useEffect } from "react";

const TRENDAI_LOGO = "data:image/jpeg;base64,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";

const CATALOG = [
  { cat:"Vision One Credits", id:"VC", name:"Vision One Credits", credits:1, unit:"crédito", sku:"VORN0309" },
  { cat:"Endpoint Security", id:"r", name:"Endpoint Security — Core", credits:45, unit:"endpoint", sku:"VORN0034" },
  { cat:"Endpoint Security", id:"s", name:"Endpoint Security — Essentials", credits:65, unit:"endpoint" },
  { cat:"Endpoint Security", id:"t", name:"Endpoint Security — Pro", credits:300, unit:"endpoint", sku:"VORN0051" },
  { cat:"Endpoint Security", id:"v", name:"Mobile Security", credits:5, unit:"dispositivo" },
  { cat:"Email & Collaboration", id:"x", name:"Email & Collaboration — Core", credits:25, unit:"usuario", sku:"VORN0175" },
  { cat:"Email & Collaboration", id:"y", name:"Email & Collaboration — Essentials", credits:50, unit:"usuario" },
  { cat:"Email & Collaboration", id:"z", name:"Email & Collaboration — Pro", credits:105, unit:"usuario" },
  { cat:"Cyber Risk & Cloud", id:"A", name:"Cyber Risk Exposure Mgmt — Core", credits:20, unit:"dispositivo", sku:"VORN0150" },
  { cat:"Cyber Risk & Cloud", id:"B", name:"Cyber Risk Exposure Mgmt — Essentials", credits:50, unit:"dispositivo" },
  { cat:"Cyber Risk & Cloud", id:"D", name:"Cloud Risk Mgmt — 1–500 recursos", credits:1000, unit:"cuenta cloud", sku:"VORN0256" },
  { cat:"Cyber Risk & Cloud", id:"E", name:"Cloud Risk Mgmt — 501–1000 recursos", credits:2000, unit:"cuenta cloud" },
  { cat:"Cyber Risk & Cloud", id:"F", name:"Cloud Risk Mgmt — 1001–1500 recursos", credits:3000, unit:"cuenta cloud" },
  { cat:"Cyber Risk & Cloud", id:"G", name:"Cloud Risk Mgmt — 1501–2000 recursos", credits:4000, unit:"cuenta cloud" },
  { cat:"Cyber Risk & Cloud", id:"H", name:"Cloud Risk Mgmt — 2001–2500 recursos", credits:5000, unit:"cuenta cloud" },
  { cat:"XDR / Security Ops", id:"R", name:"XDR for Endpoints (EDR)", credits:20, unit:"endpoint" },
  { cat:"XDR / Security Ops", id:"S", name:"XDR for Email (EmDR)", credits:5, unit:"usuario" },
  { cat:"XDR / Security Ops", id:"V", name:"XDR for Cloud (CDR)", credits:3, unit:"GB/año" },
  { cat:"XDR / Security Ops", id:"P", name:"Forensics", credits:400, unit:"GB" },
  { cat:"Network Security", id:"AA", name:"ZTSA — Internet + Private Access", credits:110, unit:"usuario" },
  { cat:"Network Security", id:"AB", name:"ZTSA — Internet Access", credits:60, unit:"usuario" },
  { cat:"Network Security", id:"AC", name:"ZTSA — Private Access", credits:50, unit:"usuario" },
  { cat:"Network Security", id:"AD", name:"ZTSA — AI Service Access", credits:50, unit:"usuario" },
  { cat:"Data Security", id:"AG", name:"Data Security — Endpoint", credits:30, unit:"endpoint" },
];

const fmt  = n => n.toLocaleString("en-US");
const fmtU = n => "$" + n.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 });
const mono = { fontFamily:"'JetBrains Mono','SF Mono','Fira Mono',monospace" };

const C = {
  bg:"#FAFAF9", surface:"#FFFFFF", panel:"#F5F5F4", border:"#E7E5E4",
  text:"#0C0A09", text2:"#57534E", text3:"#A8A29E",
  accent:"#D71921",
  blue:"#1E40AF", blueBg:"#EFF6FF",
  green:"#047857", greenBg:"#ECFDF5",
  red:"#DC2626",
  amber:"#B45309", amberBg:"#FFFBEB",
};

function ProductPicker({ onPick, onClose, triggerRef }) {
  const [q, setQ] = useState("");
  const [coords, setCoords] = useState(null);
  const inpRef = useRef(null);
  const popRef = useRef(null);

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const needed = 360;
      const top = spaceBelow < needed && rect.top > needed
        ? rect.top - needed - 4
        : rect.bottom + 4;
      setCoords({ top, left: rect.left, width: rect.width });
    }
    inpRef.current?.focus();
  }, [triggerRef]);

  useEffect(() => {
    const h = e => {
      if (popRef.current && !popRef.current.contains(e.target) && !triggerRef?.current?.contains(e.target)) onClose();
    };
    const onScroll = () => onClose();
    document.addEventListener("mousedown", h);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", h);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [onClose, triggerRef]);

  const filtered = CATALOG.filter(p => {
    const s = q.toLowerCase();
    return !s || p.name.toLowerCase().includes(s) || p.cat.toLowerCase().includes(s) || (p.sku||"").toLowerCase().includes(s);
  });
  const grouped = {};
  filtered.forEach(p => { if(!grouped[p.cat]) grouped[p.cat]=[]; grouped[p.cat].push(p); });

  if (!coords) return null;

  return (
    <div ref={popRef} style={{
      position:"fixed", top:coords.top, left:coords.left, width:coords.width, zIndex:9999,
      background:C.surface, border:`1px solid ${C.border}`, borderRadius:8,
      boxShadow:"0 10px 40px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)",
      maxHeight:360, overflow:"hidden", display:"flex", flexDirection:"column"
    }}>
      <div style={{ padding:"8px 10px", borderBottom:`1px solid ${C.border}` }}>
        <input ref={inpRef} type="text" placeholder="Buscar producto, SKU o categoría..." value={q} onChange={e=>setQ(e.target.value)}
          style={{ width:"100%", fontSize:13, padding:"7px 10px", border:`1px solid ${C.border}`, borderRadius:6, outline:"none", background:C.bg }}
          onKeyDown={e => { if(e.key==="Escape") onClose(); if(e.key==="Enter" && filtered.length) { onPick(filtered[0]); onClose(); } }}
        />
      </div>
      <div style={{ overflowY:"auto", flex:1 }}>
        {Object.entries(grouped).length === 0 ? (
          <div style={{ padding:"20px 14px", textAlign:"center", fontSize:12, color:C.text3 }}>Sin resultados</div>
        ) : Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <div style={{ padding:"7px 12px 3px", fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".06em", background:C.panel }}>{cat}</div>
            {items.map(p => (
              <button key={p.id} onClick={() => { onPick(p); onClose(); }}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, padding:"8px 12px", background:"none", border:"none", borderBottom:`1px solid ${C.border}`, cursor:"pointer", textAlign:"left" }}
                onMouseEnter={e => e.currentTarget.style.background=C.panel}
                onMouseLeave={e => e.currentTarget.style.background="none"}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:500, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                  <div style={{ fontSize:10, color:C.text3, marginTop:1, display:"flex", gap:6 }}>
                    <span>por {p.unit}</span>
                    {p.sku && <span style={{ ...mono }}>· {p.sku}</span>}
                  </div>
                </div>
                <span style={{ ...mono, fontSize:11, fontWeight:600, color:C.blue, background:C.blueBg, padding:"2px 7px", borderRadius:4, whiteSpace:"nowrap" }}>{fmt(p.credits)} cr</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LineRow({ line, onUpdate, onDelete, onDuplicate, idx }) {
  const [picking, setPicking] = useState(false);
  const triggerRef = useRef(null);
  const prod = line.prodId ? CATALOG.find(p => p.id === line.prodId) : null;
  const total = prod ? line.qty * prod.credits : 0;
  const active = line.qty > 0 && prod;

  return (
    <div style={{
      display:"grid", gridTemplateColumns:"40px 1fr 130px 80px 110px 70px",
      alignItems:"center", gap:10, padding:"10px 14px",
      background: active ? "#FAFCFF" : C.surface,
      borderBottom:`1px solid ${C.border}`, position:"relative"
    }}>
      <div style={{ ...mono, fontSize:11, color:C.text3, textAlign:"center" }}>{String(idx+1).padStart(2,"0")}</div>

      <div style={{ position:"relative" }} ref={triggerRef}>
        <button onClick={() => setPicking(!picking)}
          style={{ width:"100%", textAlign:"left", background:"none", border:`1px solid ${prod ? "transparent" : C.border}`, borderRadius:6, padding:"6px 10px", cursor:"pointer", display:"flex", alignItems:"center", gap:8, minHeight:42 }}>
          {prod ? (
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:500, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{prod.name}</div>
              <div style={{ fontSize:10, color:C.text3, marginTop:1, display:"flex", gap:8 }}>
                <span>{prod.cat}</span>
                <span>· {fmt(prod.credits)} cr / {prod.unit}</span>
                {prod.sku && <span style={{ ...mono }}>· {prod.sku}</span>}
              </div>
            </div>
          ) : (
            <div style={{ color:C.text3, fontSize:13, display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:14 }}>⊕</span> Buscar producto...
            </div>
          )}
        </button>
        {picking && <ProductPicker triggerRef={triggerRef} onPick={p => onUpdate({ ...line, prodId:p.id })} onClose={() => setPicking(false)} />}
      </div>

      <input type="date" value={line.date} onChange={e=>onUpdate({...line, date:e.target.value})}
        style={{ ...mono, fontSize:11, color:C.text2, border:`1px solid ${C.border}`, borderRadius:5, padding:"5px 7px", background:"transparent", width:"100%" }} />

      <input type="number" min={0} step={1} value={line.qty||""} placeholder="0" disabled={!prod}
        onChange={e => onUpdate({...line, qty:parseInt(e.target.value)||0})}
        style={{ ...mono, fontSize:13, fontWeight:500, textAlign:"right", padding:"6px 9px", border:`1px solid ${active?C.blue:C.border}`, borderRadius:5, background:active?"#fff":prod?C.surface:C.panel, color:C.text, outline:"none", width:"100%" }} />

      <div style={{ ...mono, fontSize:13, fontWeight:600, textAlign:"right", color:active?C.blue:C.text3 }}>
        {active ? fmt(total) : "—"}
      </div>

      <div style={{ display:"flex", gap:2, justifyContent:"flex-end" }}>
        <button onClick={() => onDuplicate(line.rowId)} disabled={!prod} title="Duplicar"
          style={{ width:26,height:26,borderRadius:5,border:`1px solid ${C.border}`,background:"none",cursor:prod?"pointer":"not-allowed",fontSize:13,color:prod?C.text2:C.text3,display:"flex",alignItems:"center",justifyContent:"center",opacity:prod?1:0.4 }}>⊕</button>
        <button onClick={() => onDelete(line.rowId)} title="Eliminar"
          style={{ width:26,height:26,borderRadius:5,border:`1px solid ${C.border}`,background:"none",cursor:"pointer",fontSize:12,color:C.red,display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
      </div>
    </div>
  );
}

function PrintView({ data }) {
  const { lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, clientName } = data;
  const mColor = pct => pct >= 20 ? "#047857" : pct > 0 ? "#B45309" : "#DC2626";
  const today = new Date().toLocaleDateString("es-PA", { year:"numeric", month:"long", day:"numeric" });
  const activeRows = lines.filter(l => l.prodId && l.qty > 0).map(l => ({ ...l, prod:CATALOG.find(p => p.id===l.prodId), total:l.qty * (CATALOG.find(p => p.id===l.prodId)?.credits||0) }));

  const kpis = [
    { l:"Precio al cliente", v:fmtU(salePrice), c:"#1E40AF" },
    { l:"Costo proveedor",   v:fmtU(costPrice), c:"#0C0A09" },
    { l:"Margen / crédito",  v:`${fmtU(salePrice-costPrice)} · ${(salePrice>0?(salePrice-costPrice)/salePrice*100:0).toFixed(1)}%`, c:mColor(salePrice>0?(salePrice-costPrice)/salePrice*100:0) },
  ];
  const bigKpis = [
    { l:"Créditos",  v:fmt(totalCredits),           c:"#1E40AF" },
    { l:"Ingresos",  v:fmtU(totalRevenue),          c:"#0C0A09" },
    { l:"Costo",     v:fmtU(totalCost),             c:"#57534E" },
    { l:"Margen",    v:fmtU(totalMargin),           c:mColor(marginPct) },
    { l:"Rentab.",   v:`${marginPct.toFixed(1)}%`,  c:mColor(marginPct) },
  ];
  const pl = [
    { l:"Ingresos por créditos", v:fmtU(totalCredits*salePrice), c:"#0C0A09", bold:false, bg:"#fff" },
    { l:"Ingresos por soporte",  v:fmtU(soporteSale), c:"#0C0A09", bold:false, bg:"#fff" },
    { l:"Total ingresos",        v:fmtU(totalRevenue), c:"#0C0A09", bold:true, bg:"#FAFAF9" },
    { l:"Costo créditos",        v:`(${fmtU(totalCredits*costPrice)})`, c:"#DC2626", bold:false, bg:"#fff" },
    { l:"Costo soporte",         v:`(${fmtU(soporteCost)})`, c:"#DC2626", bold:false, bg:"#fff" },
    { l:"Total costos",          v:`(${fmtU(totalCost)})`, c:"#DC2626", bold:true, bg:"#FEF2F2" },
    { l:"MARGEN BRUTO",          v:fmtU(totalMargin), c:mColor(marginPct), bold:true, bg:marginPct>=20?"#ECFDF5":marginPct>0?"#FFFBEB":"#FEF2F2", big:true },
    { l:"Rentabilidad",          v:`${marginPct.toFixed(1)}%`, c:mColor(marginPct), bold:true, bg:"#fff" },
  ];

  return (
    <div className="print-only" style={{ padding:"24px 32px", maxWidth:780, margin:"0 auto", background:"#fff", color:"#0C0A09", fontFamily:"system-ui,sans-serif", fontSize:13 }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20, paddingBottom:14, borderBottom:"2px solid #0C0A09" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:40, height:40, background:"#D71921", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontSize:23, fontWeight:900, letterSpacing:"-1px", lineHeight:1 }}>T</span>
          </div>
          <div>
            <div style={{ fontSize:17, fontWeight:700, letterSpacing:"-.01em" }}>Vision One Credits</div>
            <div style={{ fontSize:11, color:"#A8A29E" }}>{clientName ? `Cliente: ${clientName} · ` : ""}Análisis de Rentabilidad · Uso Interno</div>
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:11, color:"#A8A29E" }}>Generado</div>
          <div style={{ fontSize:13, fontWeight:600 }}>{today}</div>
          <div style={{ display:"inline-block", marginTop:4, background:"#FEF3C7", color:"#B45309", fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:4, letterSpacing:".04em" }}>CONFIDENCIAL · USO INTERNO</div>
        </div>
      </div>

      {/* Pricing config */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:16 }}>
        {kpis.map(k => (
          <div key={k.l} style={{ background:"#FAFAF9", border:"1px solid #E7E5E4", borderRadius:6, padding:"10px 12px" }}>
            <div style={{ fontSize:10, color:"#A8A29E", marginBottom:3, textTransform:"uppercase", letterSpacing:".05em" }}>{k.l}</div>
            <div style={{ ...mono, fontSize:14, fontWeight:700, color:k.c }}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* Big KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6, marginBottom:20 }}>
        {bigKpis.map(k => (
          <div key={k.l} style={{ border:"1px solid #E7E5E4", borderRadius:6, padding:"9px 11px", background:"#fff" }}>
            <div style={{ fontSize:10, color:"#A8A29E", marginBottom:2 }}>{k.l}</div>
            <div style={{ ...mono, fontSize:13, fontWeight:700, color:k.c }}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* Detail table */}
      <div style={{ fontSize:10, fontWeight:700, color:"#A8A29E", textTransform:"uppercase", letterSpacing:".08em", marginBottom:6 }}>Líneas del negocio</div>
      <table style={{ width:"100%", borderCollapse:"collapse", border:"1px solid #E7E5E4" }}>
        <thead>
          <tr style={{ background:"#F5F5F4" }}>
            {["#","Producto","Vencimiento","Cant.","Rate","Total cr / $"].map((h,i) => (
              <th key={i} style={{ padding:"8px 10px", textAlign:i>=3?"right":"left", fontSize:10, fontWeight:700, color:"#57534E", textTransform:"uppercase", letterSpacing:".05em" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activeRows.map((l, i) => (
            <tr key={i}>
              <td style={{ padding:"8px 10px", fontSize:11, color:"#A8A29E", ...mono, borderBottom:"1px solid #E7E5E4" }}>{String(i+1).padStart(2,"0")}</td>
              <td style={{ padding:"8px 10px", fontSize:12, borderBottom:"1px solid #E7E5E4" }}>
                {l.prod.name}
                <br/>
                <span style={{ fontSize:10, color:"#A8A29E", ...(l.prod.sku ? mono : {}) }}>{l.prod.sku ? `${l.prod.sku} · ${l.prod.cat}` : l.prod.cat}</span>
              </td>
              <td style={{ padding:"8px 10px", fontSize:11, color:"#57534E", borderBottom:"1px solid #E7E5E4", ...mono }}>{l.date || "—"}</td>
              <td style={{ padding:"8px 10px", ...mono, textAlign:"right", borderBottom:"1px solid #E7E5E4" }}>{l.qty.toLocaleString()}</td>
              <td style={{ padding:"8px 10px", fontSize:11, ...mono, textAlign:"right", color:"#A8A29E", borderBottom:"1px solid #E7E5E4" }}>{fmt(l.prod.credits)} cr/u</td>
              <td style={{ padding:"8px 10px", ...mono, fontWeight:700, textAlign:"right", color:"#1E40AF", borderBottom:"1px solid #E7E5E4" }}>{fmt(l.total)}</td>
            </tr>
          ))}
          {soporteSale > 0 && (
            <tr>
              <td style={{ padding:"8px 10px", fontSize:11, color:"#A8A29E", ...mono, borderBottom:"1px solid #E7E5E4" }}>{String(activeRows.length+1).padStart(2,"0")}</td>
              <td style={{ padding:"8px 10px", fontSize:12, borderBottom:"1px solid #E7E5E4" }}>
                Soporte Platinum Trend Micro<br/>
                <span style={{ fontSize:10, color:"#A8A29E" }}>Servicio profesional · Precio fijo</span>
              </td>
              <td style={{ padding:"8px 10px", fontSize:11, color:"#57534E", borderBottom:"1px solid #E7E5E4", ...mono }}>{soporteDate || "—"}</td>
              <td style={{ padding:"8px 10px", ...mono, textAlign:"right", borderBottom:"1px solid #E7E5E4" }}>1</td>
              <td style={{ padding:"8px 10px", fontSize:11, textAlign:"right", color:"#A8A29E", borderBottom:"1px solid #E7E5E4" }}>servicio</td>
              <td style={{ padding:"8px 10px", ...mono, fontWeight:700, textAlign:"right", color:"#1E40AF", borderBottom:"1px solid #E7E5E4" }}>{fmtU(soporteSale)}</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr style={{ background:"#EFF6FF", borderTop:"2px solid #1E40AF" }}>
            <td colSpan={5} style={{ padding:10, fontSize:12, fontWeight:700, color:"#1E40AF" }}>TOTAL CRÉDITOS VISION ONE</td>
            <td style={{ padding:10, fontSize:14, fontWeight:700, ...mono, textAlign:"right", color:"#1E40AF" }}>{fmt(totalCredits)}</td>
          </tr>
        </tfoot>
      </table>

      {/* P&L */}
      <div style={{ marginTop:14, border:"1px solid #E7E5E4", borderRadius:6, overflow:"hidden" }}>
        <div style={{ background:"#0C0A09", padding:"9px 14px" }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#fff", letterSpacing:".01em" }}>Análisis de Rentabilidad (P&L)</div>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <tbody>
            {pl.map(m => (
              <tr key={m.l} style={{ background:m.bg, borderTop:"1px solid #E7E5E4" }}>
                <td style={{ padding:"8px 14px", fontSize:m.big?13:12, fontWeight:m.bold?700:400 }}>{m.l}</td>
                <td style={{ padding:"8px 14px", fontSize:m.big?15:13, fontWeight:m.bold?700:400, ...mono, textAlign:"right", color:m.c }}>{m.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ marginTop:16, paddingTop:10, borderTop:"1px solid #E7E5E4", display:"flex", justifyContent:"space-between" }}>
        <div style={{ fontSize:10, color:"#A8A29E" }}>Nextcom Systems, Inc. · RUC 1253816-1-593861 DV 16 · +507 394-1405</div>
        <div style={{ fontSize:10, color:"#A8A29E" }}>Trend Micro Credit Calculator · Jan 2026</div>
      </div>
    </div>
  );
}

const PRINT_CSS = `
  @media screen {
    .print-only { display: none !important; }
  }
  @media print {
    @page { margin: 14mm 12mm; size: A4; }
    html, body { background: white !important; margin: 0 !important; padding: 0 !important; }
    body * { visibility: hidden !important; }
    .print-only, .print-only * { visibility: visible !important; }
    .print-only { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; display: block !important; }
    .no-print { display: none !important; }
    * { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; }
  }
`;

function downloadReport(data) {
  const { lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, clientName, currency = "USD", rateSource = "bcv", activeRate = 0, vesRate = 1 } = data;
  const isVES = currency === "VES";
  const sym = isVES ? "Bs." : "$";
  const fmtView = usd => `${sym} ${(usd * (isVES ? vesRate : 1)).toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 })}`;
  const fmtUSDsm = usd => `$${usd.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 })}`;
  const mC = pct => pct >= 20 ? "#047857" : pct > 0 ? "#B45309" : "#DC2626";
  const today = new Date().toLocaleDateString("es-PA", { year:"numeric", month:"long", day:"numeric" });
  const active = lines.filter(l => l.prodId && l.qty > 0).map(l => { const p = CATALOG.find(c => c.id===l.prodId); return { ...l, prod:p, total:l.qty * p.credits }; });

  const rowsHTML = active.map((l, i) => `
    <tr>
      <td style="padding:8px 10px;font-size:11px;color:#A8A29E;font-family:'SF Mono',monospace;border-bottom:1px solid #E7E5E4">${String(i+1).padStart(2,"0")}</td>
      <td style="padding:8px 10px;font-size:12px;border-bottom:1px solid #E7E5E4">
        ${l.prod.name}<br>
        <span style="font-size:10px;color:#A8A29E;${l.prod.sku ? "font-family:'SF Mono',monospace" : ""}">${l.prod.sku ? `${l.prod.sku} · ${l.prod.cat}` : l.prod.cat}</span>
      </td>
      <td style="padding:8px 10px;font-size:11px;color:#57534E;border-bottom:1px solid #E7E5E4;font-family:'SF Mono',monospace">${l.date || "—"}</td>
      <td style="padding:8px 10px;font-family:'SF Mono',monospace;text-align:right;border-bottom:1px solid #E7E5E4">${l.qty.toLocaleString()}</td>
      <td style="padding:8px 10px;font-size:11px;font-family:'SF Mono',monospace;text-align:right;color:#A8A29E;border-bottom:1px solid #E7E5E4">${fmt(l.prod.credits)} cr/u</td>
      <td style="padding:8px 10px;font-family:'SF Mono',monospace;font-weight:700;text-align:right;color:#1E40AF;border-bottom:1px solid #E7E5E4">${fmt(l.total)}</td>
    </tr>`).join("");

  const sopRow = soporteSale > 0 ? `
    <tr>
      <td style="padding:8px 10px;font-size:11px;color:#A8A29E;font-family:'SF Mono',monospace;border-bottom:1px solid #E7E5E4">${String(active.length+1).padStart(2,"0")}</td>
      <td style="padding:8px 10px;font-size:12px;border-bottom:1px solid #E7E5E4">Soporte Platinum Trend Micro<br><span style="font-size:10px;color:#A8A29E">Servicio profesional · Precio fijo</span></td>
      <td style="padding:8px 10px;font-size:11px;color:#57534E;border-bottom:1px solid #E7E5E4;font-family:'SF Mono',monospace">${soporteDate || "—"}</td>
      <td style="padding:8px 10px;font-family:'SF Mono',monospace;text-align:right;border-bottom:1px solid #E7E5E4">1</td>
      <td style="padding:8px 10px;font-size:11px;text-align:right;color:#A8A29E;border-bottom:1px solid #E7E5E4">servicio</td>
      <td style="padding:8px 10px;font-family:'SF Mono',monospace;font-weight:700;text-align:right;color:#1E40AF;border-bottom:1px solid #E7E5E4">${fmtU(soporteSale)}</td>
    </tr>` : "";

  const plRows = [
    { l:"Ingresos por créditos", v:fmtU(totalCredits*salePrice), c:"#0C0A09", bold:false, bg:"#fff" },
    { l:"Ingresos por soporte",  v:fmtU(soporteSale), c:"#0C0A09", bold:false, bg:"#fff" },
    { l:"Total ingresos",        v:fmtU(totalRevenue), c:"#0C0A09", bold:true, bg:"#FAFAF9" },
    { l:"Costo créditos",        v:`(${fmtU(totalCredits*costPrice)})`, c:"#DC2626", bold:false, bg:"#fff" },
    { l:"Costo soporte",         v:`(${fmtU(soporteCost)})`, c:"#DC2626", bold:false, bg:"#fff" },
    { l:"Total costos",          v:`(${fmtU(totalCost)})`, c:"#DC2626", bold:true, bg:"#FEF2F2" },
    { l:"MARGEN BRUTO",          v:fmtU(totalMargin), c:mC(marginPct), bold:true, bg:marginPct>=20?"#ECFDF5":marginPct>0?"#FFFBEB":"#FEF2F2", big:true },
    { l:"Rentabilidad",          v:`${marginPct.toFixed(1)}%`, c:mC(marginPct), bold:true, bg:"#fff" },
  ].map(m => `<tr style="background:${m.bg};border-top:1px solid #E7E5E4"><td style="padding:8px 14px;font-size:${m.big?13:12}px;font-weight:${m.bold?700:400}">${m.l}</td><td style="padding:8px 14px;font-size:${m.big?15:13}px;font-weight:${m.bold?700:400};font-family:'SF Mono',monospace;text-align:right;color:${m.c}">${m.v}</td></tr>`).join("");

  const perCrPct = salePrice > 0 ? (salePrice-costPrice)/salePrice*100 : 0;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Análisis Vision One${clientName ? " — " + clientName : ""}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,-apple-system,sans-serif;color:#0C0A09;background:#fff;font-size:13px;padding:24px 28px}
  .container{max-width:780px;margin:0 auto}
  @page{margin:14mm 12mm;size:A4}
  @media print{body{padding:0;print-color-adjust:exact;-webkit-print-color-adjust:exact}.container{max-width:none}}
  .no-print{display:none}
  @media screen{.print-toolbar{display:flex;position:sticky;top:0;background:#0C0A09;color:#fff;padding:12px 20px;margin:-24px -28px 24px;align-items:center;justify-content:space-between;z-index:100}.print-toolbar button{background:#fff;color:#0C0A09;border:none;padding:8px 18px;border-radius:6px;font-weight:600;cursor:pointer;font-size:13px}}
  @media print{.print-toolbar{display:none}}
</style>
</head>
<body>
  <div class="print-toolbar">
    <div style="font-size:13px">📄 Análisis listo para imprimir · Usa <strong>Cmd+P</strong> (Mac) o <strong>Ctrl+P</strong> (Windows) y elige "Guardar como PDF"</div>
    <button onclick="window.print()">🖨 Imprimir / Guardar PDF</button>
  </div>
  <div class="container">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px;padding-bottom:14px;border-bottom:2px solid #0C0A09">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="display:flex;flex-direction:column;gap:4">
          <img src="${TRENDAI_LOGO}" alt="TrendAI" style="height:36px;width:auto" />
          <div style="font-size:11px;color:#A8A29E">${clientName ? `Cliente: ${clientName} · ` : ""}Análisis de Rentabilidad · Uso Interno${isVES ? " · 🇻🇪 Venezuela" : " · 🇵🇦 Panamá"}</div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-size:11px;color:#A8A29E">Generado</div>
        <div style="font-size:13px;font-weight:600">${today}</div>
        <div style="display:inline-block;margin-top:4px;background:#FEF3C7;color:#B45309;font-size:9px;font-weight:700;padding:2px 8px;border-radius:4px;letter-spacing:.04em">CONFIDENCIAL · USO INTERNO</div>
      </div>
    </div>

    ${isVES ? `
    <div style="background:#EFF6FF;border:1px solid #C7D9EF;border-radius:6px;padding:10px 14px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:11px;color:#1E40AF">
        <strong>Tasa aplicada:</strong> ${rateSource.toUpperCase()} · <span style="font-family:'SF Mono',monospace">Bs. ${activeRate.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</span> por USD
      </div>
      <div style="font-size:10px;color:#57534E">Rentabilidad calculada siempre en USD · Ingresos mostrados en Bs. para el cliente</div>
    </div>
    ` : ""}

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
      ${[
        {l:"Precio al cliente",v:fmtU(salePrice),c:"#1E40AF"},
        {l:"Costo proveedor",v:fmtU(costPrice),c:"#0C0A09"},
        {l:"Margen / crédito",v:`${fmtU(salePrice-costPrice)} · ${perCrPct.toFixed(1)}%`,c:mC(perCrPct)}
      ].map(k => `<div style="background:#FAFAF9;border:1px solid #E7E5E4;border-radius:6px;padding:10px 12px"><div style="font-size:10px;color:#A8A29E;margin-bottom:3px;text-transform:uppercase;letter-spacing:.05em">${k.l}</div><div style="font-family:'SF Mono',monospace;font-size:14px;font-weight:700;color:${k.c}">${k.v}</div></div>`).join("")}
    </div>

    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:20px">
      ${[
        {l:"Créditos",v:fmt(totalCredits),c:"#1E40AF"},
        {l:isVES?"Ingresos (Bs.)":"Ingresos",v:fmtView(totalRevenue),c:"#0C0A09",sub:isVES?fmtUSDsm(totalRevenue):null},
        {l:"Costo (USD)",v:fmtUSDsm(totalCost),c:"#57534E"},
        {l:"Margen (USD)",v:fmtUSDsm(totalMargin),c:mC(marginPct)},
        {l:"Rentab.",v:`${marginPct.toFixed(1)}%`,c:mC(marginPct)}
      ].map(k => `<div style="border:1px solid #E7E5E4;border-radius:6px;padding:9px 11px;background:#fff"><div style="font-size:10px;color:#A8A29E;margin-bottom:2px">${k.l}</div><div style="font-family:'SF Mono',monospace;font-size:13px;font-weight:700;color:${k.c}">${k.v}</div>${k.sub?`<div style="font-size:9px;color:#A8A29E;font-family:'SF Mono',monospace;margin-top:2px">${k.sub}</div>`:""}</div>`).join("")}
    </div>

    <div style="font-size:10px;font-weight:700;color:#A8A29E;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Líneas del negocio</div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #E7E5E4">
      <thead><tr style="background:#F5F5F4">${["#","Producto","Vencimiento","Cant.","Rate","Total cr / $"].map((h,i)=>`<th style="padding:8px 10px;text-align:${i>=3?"right":"left"};font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">${h}</th>`).join("")}</tr></thead>
      <tbody>${rowsHTML}${sopRow}</tbody>
      <tfoot><tr style="background:#EFF6FF;border-top:2px solid #1E40AF"><td colspan="5" style="padding:10px;font-size:12px;font-weight:700;color:#1E40AF">TOTAL CRÉDITOS VISION ONE</td><td style="padding:10px;font-size:14px;font-weight:700;font-family:'SF Mono',monospace;text-align:right;color:#1E40AF">${fmt(totalCredits)}</td></tr></tfoot>
    </table>

    <div style="margin-top:14px;border:1px solid #E7E5E4;border-radius:6px;overflow:hidden">
      <div style="background:#0C0A09;padding:9px 14px"><div style="font-size:12px;font-weight:700;color:#fff;letter-spacing:.01em">Análisis de Rentabilidad (P&L)</div></div>
      <table style="width:100%;border-collapse:collapse">${plRows}</table>
    </div>

    <div style="margin-top:16px;padding-top:10px;border-top:1px solid #E7E5E4;display:flex;justify-content:space-between">
      <div style="font-size:10px;color:#A8A29E">Nextcom Systems, Inc. · RUC 1253816-1-593861 DV 16 · +507 394-1405</div>
      <div style="font-size:10px;color:#A8A29E">Trend Micro Credit Calculator · Jan 2026</div>
    </div>
  </div>
  <script>
    // Auto-trigger print dialog after a small delay to let the page render
    window.addEventListener('load', function() {
      setTimeout(function() { window.print(); }, 400);
    });
  </script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const fname = `Analisis_VisionOne_${(clientName || "Nextcom").replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.html`;
  a.href = url;
  a.download = fname;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

export default function App() {
  const [lines, setLines] = useState([{ rowId: 1, prodId: null, qty: 0, date: "" }]);
  const [rc, setRc] = useState(2);
  const [salePrice, setSalePrice] = useState(1.05);
  const [costPrice, setCostPrice] = useState(0.73);
  const [soporteSale, setSoporteSale] = useState(0);
  const [soporteCost, setSoporteCost] = useState(0);
  const [soporteDate, setSoporteDate] = useState("");
  const [clientName, setClientName] = useState("");

  // --- Currency / FX ---
  const [currency, setCurrency] = useState("USD"); // "USD" | "VES"
  const [rateSource, setRateSource] = useState("bcv"); // "bcv" | "binance" | "paralelo" | "manual"
  const [rates, setRates] = useState({ bcv: null, binance: null, paralelo: null, updatedAt: null });
  const [manualRate, setManualRate] = useState(40);
  const [fxLoading, setFxLoading] = useState(false);
  const [fxError, setFxError] = useState(null);

  const fetchRates = async () => {
    setFxLoading(true);
    setFxError(null);
    try {
      const r = await fetch("/api/rates");
      if (!r.ok) {
        const errData = await r.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${r.status}`);
      }
      const d = await r.json();
      setRates({
        bcv: d.bcv,
        binance: d.binance,
        paralelo: d.paralelo,
        updatedAt: new Date()
      });
    } catch (e) {
      console.error("Rate fetch error:", e);
      setFxError(`No se pudieron obtener las tasas: ${e.message}. Usa 'Manual'.`);
    } finally {
      setFxLoading(false);
    }
  };

  useEffect(() => {
    if (currency === "VES" && !rates.updatedAt) fetchRates();
  }, [currency]);

  const activeRate = rateSource === "manual" ? manualRate : (rates[rateSource] || 0);
  const vesRate = currency === "VES" ? activeRate : 1;
  const toView = usd => currency === "VES" ? usd * vesRate : usd;
  const viewSymbol = currency === "VES" ? "Bs." : "$";
  const fmtMoney = (usd, opts = {}) => {
    const val = toView(usd);
    const dec = opts.decimals ?? 2;
    return `${viewSymbol} ${val.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
  };

  let totalCredits = 0;
  lines.forEach(l => {
    if (l.prodId && l.qty > 0) {
      const p = CATALOG.find(c => c.id === l.prodId);
      if (p) totalCredits += l.qty * p.credits;
    }
  });
  const creditRevenue = totalCredits * salePrice;
  const creditCost    = totalCredits * costPrice;
  const totalRevenue  = creditRevenue + soporteSale;
  const totalCost     = creditCost + soporteCost;
  const totalMargin   = totalRevenue - totalCost;
  const marginPct     = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;
  const activeLines   = lines.filter(l => l.prodId && l.qty > 0).length;
  const perCrPct      = salePrice > 0 ? (salePrice - costPrice) / salePrice * 100 : 0;
  const mColor = pct => pct >= 20 ? C.green : pct > 0 ? C.amber : C.red;
  const mBg    = pct => pct >= 20 ? C.greenBg : pct > 0 ? C.amberBg : "#FEF2F2";

  const addLine = () => { setLines(p => [...p, { rowId:rc, prodId:null, qty:0, date:"" }]); setRc(c => c+1); };
  const updateLine = (row) => setLines(p => p.map(l => l.rowId===row.rowId ? row : l));
  const deleteLine = (id) => setLines(p => p.length>1 ? p.filter(l => l.rowId!==id) : [{ rowId:rc, prodId:null, qty:0, date:"" }]);
  const duplicateLine = (id) => {
    setLines(p => {
      const idx = p.findIndex(l => l.rowId===id);
      const next = [...p];
      next.splice(idx+1, 0, { rowId:rc, prodId:p[idx].prodId, qty:0, date:"" });
      return next;
    });
    setRc(c => c+1);
  };
  const clearAll = () => { if(confirm("¿Limpiar todo?")){ setLines([{ rowId:rc, prodId:null, qty:0, date:"" }]); setRc(c => c+1); setSoporteSale(0); setSoporteCost(0); setSoporteDate(""); setClientName(""); }};

  return (
    <>
      <style>{PRINT_CSS}</style>

      <PrintView data={{ lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, clientName }} />

      <div className="no-print" style={{ display:"grid", gridTemplateColumns:"272px 1fr", minHeight:"100vh", fontFamily:"system-ui,-apple-system,sans-serif", background:C.bg, color:C.text, fontSize:14 }}>

      <aside style={{ background:C.surface, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh", overflowY:"auto" }}>
        <div style={{ padding:"22px 22px 18px", borderBottom:`1px solid ${C.border}`, background:"linear-gradient(180deg, #FAFAF9 0%, #fff 100%)" }}>
          <img src={TRENDAI_LOGO} alt="TrendAI" style={{ height:44, width:"auto", display:"block", marginBottom:10 }} />
          <div style={{ fontSize:11, fontWeight:600, color:C.text2, letterSpacing:".02em" }}>Vision One · Credit Calculator</div>
          <div style={{ fontSize:10, color:C.text3, marginTop:1 }}>Jan 2026 edition</div>
        </div>

        <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".08em" }}>Precios por crédito</div>
          {[
            { label:"Precio al cliente", sub:"Lo que cobra Nextcom", val:salePrice, set:setSalePrice, accent:true },
            { label:"Costo proveedor",   sub:"Lo que paga Nextcom",  val:costPrice, set:setCostPrice, accent:false },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize:10, color:C.text3, marginBottom:3, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>{f.label}</div>
              <div style={{ display:"flex", alignItems:"center", gap:4, background:C.bg, borderRadius:6, padding:"6px 10px", border:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12, color:C.text3 }}>$</span>
                <input type="number" value={f.val} step={0.005} min={0} onChange={e => f.set(parseFloat(e.target.value)||0)}
                  style={{ ...mono, width:"100%", fontSize:15, fontWeight:600, color:f.accent?C.blue:C.text, background:"none", border:"none", outline:"none" }} />
              </div>
              <div style={{ fontSize:10, color:C.text3, marginTop:2 }}>{f.sub}</div>
            </div>
          ))}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:mBg(perCrPct), borderRadius:6, padding:"6px 10px" }}>
            <span style={{ fontSize:11, color:C.text2 }}>Margen / crédito</span>
            <span style={{ ...mono, fontSize:12, fontWeight:700, color:mColor(perCrPct) }}>{fmtU(salePrice-costPrice)} · {perCrPct.toFixed(1)}%</span>
          </div>
        </div>

        <div style={{ padding:"14px 20px", flex:1 }}>
          <div style={{ fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".08em", marginBottom:10 }}>Resumen del negocio</div>
          {[
            { l:"Créditos totales",   v:fmt(totalCredits), c:C.blue },
            { l:"Ingresos (cliente)", v:fmtMoney(totalRevenue), c:C.text },
            { l:"Costo (proveedor)",  v:fmtU(totalCost) + " USD", c:C.text2 },
            { l:"Margen bruto",       v:fmtU(totalMargin) + " USD", c:mColor(marginPct) },
            { l:"Rentabilidad",       v:`${marginPct.toFixed(1)}%`, c:mColor(marginPct) },
          ].map(m => (
            <div key={m.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:12, color:C.text2 }}>{m.l}</span>
              <span style={{ ...mono, fontSize:13, fontWeight:600, color:m.c }}>{m.v}</span>
            </div>
          ))}
        </div>

        <div style={{ padding:"12px 20px", borderTop:`1px solid ${C.border}` }}>
          <button onClick={() => downloadReport({ lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, clientName, currency, rateSource, activeRate, vesRate })}
            style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:"10px", background:C.text, color:"#fff", border:"none", borderRadius:7, fontSize:13, fontWeight:600, cursor:"pointer" }}>
            ⬇ Exportar análisis PDF
          </button>
        </div>
        <div style={{ padding:"10px 20px", fontSize:11, color:C.text3, lineHeight:1.5 }}>
          Nextcom Systems, Inc.<br/>Trend Micro Platinum Partner · Panamá
        </div>
      </aside>

      <main style={{ padding:"28px 34px", overflowY:"auto" }}>

        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18, gap:14, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:22, fontWeight:700, letterSpacing:"-.025em", marginBottom:3 }}>Nueva cotización</div>
            <div style={{ fontSize:13, color:C.text3 }}>Busca productos del catálogo y construye la propuesta línea por línea</div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
            {/* Currency toggle */}
            <div style={{ display:"flex", background:C.panel, border:`1px solid ${C.border}`, borderRadius:7, padding:2 }}>
              {[
                { code:"USD", label:"🇵🇦 USD", sub:"Panamá" },
                { code:"VES", label:"🇻🇪 Bs.", sub:"Venezuela" },
              ].map(c => (
                <button key={c.code} onClick={() => setCurrency(c.code)}
                  style={{ padding:"6px 12px", fontSize:12, fontWeight:currency===c.code?700:500, background:currency===c.code?C.surface:"transparent", color:currency===c.code?C.text:C.text2, border:"none", borderRadius:5, cursor:"pointer", boxShadow: currency===c.code ? "0 1px 2px rgba(0,0,0,.06)" : "none" }}>
                  {c.label}
                </button>
              ))}
            </div>
            <input type="text" placeholder="Nombre del cliente (opcional)" value={clientName} onChange={e=>setClientName(e.target.value)}
              style={{ fontSize:12, padding:"7px 12px", border:`1px solid ${C.border}`, borderRadius:6, background:C.surface, color:C.text, width:200, outline:"none" }} />
            <button onClick={clearAll} style={{ fontSize:12, color:C.text2, background:C.surface, border:`1px solid ${C.border}`, borderRadius:6, padding:"6px 12px", cursor:"pointer" }}>Limpiar</button>
          </div>
        </div>

        {/* FX panel — only when VES */}
        {currency === "VES" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 16px", marginBottom:16, boxShadow:"0 1px 2px rgba(0,0,0,.02)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:13, fontWeight:600 }}>Tasa de cambio USD → VES</span>
                {rates.updatedAt && <span style={{ fontSize:10, color:C.text3 }}>Actualizado: {rates.updatedAt.toLocaleTimeString("es-PA", { hour:"2-digit", minute:"2-digit" })}</span>}
              </div>
              <button onClick={fetchRates} disabled={fxLoading}
                style={{ fontSize:11, color:C.text2, background:C.panel, border:`1px solid ${C.border}`, borderRadius:5, padding:"4px 10px", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                {fxLoading ? "⟳ Actualizando..." : "↻ Actualizar tasas"}
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8 }}>
              {[
                { key:"bcv", label:"BCV", sub:"Oficial", value:rates.bcv },
                { key:"binance", label:"Binance P2P", sub:"Cripto", value:rates.binance },
                { key:"paralelo", label:"Paralelo", sub:"Monitor", value:rates.paralelo },
                { key:"manual", label:"Manual", sub:"Ingresar", value:manualRate },
              ].map(t => {
                const sel = rateSource === t.key;
                return (
                  <button key={t.key} onClick={() => setRateSource(t.key)}
                    style={{ textAlign:"left", padding:"10px 12px", background:sel?C.blueBg:C.surface, border:`1.5px solid ${sel?C.blue:C.border}`, borderRadius:7, cursor:"pointer" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:sel?C.blue:C.text3, textTransform:"uppercase", letterSpacing:".06em", marginBottom:3 }}>{t.label}</div>
                    {t.key === "manual" ? (
                      <input type="number" value={manualRate} step={0.01} min={0}
                        onClick={e => { e.stopPropagation(); setRateSource("manual"); }}
                        onChange={e => setManualRate(parseFloat(e.target.value) || 0)}
                        style={{ ...mono, width:"100%", fontSize:15, fontWeight:700, color:sel?C.blue:C.text, background:"transparent", border:"none", outline:"none", padding:0 }} />
                    ) : (
                      <div style={{ ...mono, fontSize:15, fontWeight:700, color:sel?C.blue:(t.value?C.text:C.text3) }}>
                        {t.value ? `Bs. ${t.value.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 })}` : "—"}
                      </div>
                    )}
                    <div style={{ fontSize:10, color:C.text3, marginTop:2 }}>{t.sub}</div>
                  </button>
                );
              })}
            </div>
            {fxError && <div style={{ fontSize:11, color:C.red, marginTop:8 }}>⚠ {fxError}</div>}
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:20 }}>
          {[
            { l:"Créditos totales", v:fmt(totalCredits), c:C.blue, sub:null },
            { l:`Ingresos${currency==="VES"?" (Bs.)":""}`, v:fmtMoney(totalRevenue), c:C.text, sub: currency==="VES" ? `$${totalRevenue.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} USD` : null },
            { l:"Margen bruto", v:fmtMoney(totalMargin), c:mColor(marginPct), sub:`${marginPct.toFixed(1)}% rentabilidad` },
            { l:"Líneas activas", v:activeLines, c:C.text, sub:`de ${lines.length} total` },
          ].map(m => (
            <div key={m.l} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:9, padding:"13px 15px" }}>
              <div style={{ fontSize:11, color:C.text3, marginBottom:3 }}>{m.l}</div>
              <div style={{ ...mono, fontSize:18, fontWeight:700, color:m.c, letterSpacing:"-.01em" }}>{m.v}</div>
              {m.sub && <div style={{ fontSize:11, color:C.text3, marginTop:2 }}>{m.sub}</div>}
            </div>
          ))}
        </div>

        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden", boxShadow:"0 1px 2px rgba(0,0,0,.02)" }}>
          <div style={{ padding:"11px 14px", background:C.panel, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ fontSize:13, fontWeight:600 }}>Productos de la cotización</div>
            <div style={{ fontSize:11, color:C.text3 }}>⊕ duplica · ✕ elimina</div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"40px 1fr 130px 80px 110px 70px", gap:10, padding:"6px 14px", background:C.surface, borderBottom:`1px solid ${C.border}` }}>
            {["#","Producto","Vencimiento","Cant.","Créditos",""].map((h,i) => (
              <div key={i} style={{ fontSize:10, fontWeight:600, color:C.text3, textAlign:i>=3&&i<5?"right":i===0?"center":"left", textTransform:"uppercase", letterSpacing:".06em" }}>{h}</div>
            ))}
          </div>

          {lines.map((line, idx) => (
            <LineRow key={line.rowId} line={line} idx={idx} onUpdate={updateLine} onDelete={deleteLine} onDuplicate={duplicateLine} />
          ))}

          <button onClick={addLine} style={{
            width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            padding:"11px", background:C.surface, border:"none", borderTop:`1px dashed ${C.border}`,
            cursor:"pointer", color:C.blue, fontSize:12, fontWeight:500
          }}
          onMouseEnter={e => e.currentTarget.style.background=C.blueBg}
          onMouseLeave={e => e.currentTarget.style.background=C.surface}>
            <span style={{ fontSize:14 }}>＋</span> Agregar producto
          </button>
        </div>

        <div style={{ marginTop:14, background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
          <div style={{ padding:"11px 14px", background:C.panel, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:13, fontWeight:600 }}>Soporte Platinum</span>
            <span style={{ fontSize:11, color:C.text3 }}>Precio libre · línea especial sin créditos</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 130px 110px", gap:12, alignItems:"end", padding:"14px", background:soporteSale>0?"#FAFCFF":C.surface }}>
            {[
              { l:"Precio al cliente", v:soporteSale, set:setSoporteSale },
              { l:"Costo proveedor",   v:soporteCost, set:setSoporteCost },
            ].map(f => (
              <div key={f.l}>
                <div style={{ fontSize:10, color:C.text3, marginBottom:4, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>{f.l}</div>
                <div style={{ display:"flex", alignItems:"center", gap:4, border:`1px solid ${C.border}`, borderRadius:6, padding:"6px 10px", background:C.surface }}>
                  <span style={{ color:C.text3, fontSize:13 }}>$</span>
                  <input type="number" min={0} step={0.01} value={f.v||""} placeholder="0.00" onChange={e => f.set(parseFloat(e.target.value)||0)}
                    style={{ ...mono, fontSize:13, fontWeight:500, width:"100%", border:"none", outline:"none", background:"transparent", color:C.text }} />
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize:10, color:C.text3, marginBottom:4, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>Vencimiento</div>
              <input type="date" value={soporteDate} onChange={e => setSoporteDate(e.target.value)}
                style={{ ...mono, fontSize:11, color:C.text2, border:`1px solid ${C.border}`, borderRadius:6, padding:"6px 10px", background:C.surface, width:"100%" }} />
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:10, color:C.text3, marginBottom:4, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>Margen</div>
              <div style={{ ...mono, fontSize:15, fontWeight:700, color:soporteSale>soporteCost?C.green:C.text3 }}>
                {soporteSale > 0 ? fmtU(soporteSale - soporteCost) : "—"}
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize:11, color:C.text3, marginTop:12, textAlign:"center" }}>Créditos calculados para 12 meses · Trend Micro Vision One Jan 2026</p>
      </main>
    </div>
    </>
  );
}
