import { useState, useRef, useEffect } from "react";

const TRENDAI_LOGO = "data:image/jpeg;base64,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";

const CATALOG = [
  // Vision One Credits (the credit pool itself)
  { cat:"Vision One Credits", id:"AK", name:"Trend Vision One Credits", credits:1, unit:"crédito", sku:"VORN0309" },

  // Cyber Risk Exposure Management
  { cat:"Cyber Risk Exposure Management", id:"A", name:"Cyber Risk Exposure Management - Core", credits:20, unit:"dispositivo evaluado o activo de red", sku:"VORN0150" },
  { cat:"Cyber Risk Exposure Management", id:"B", name:"Cyber Risk Exposure Management - Essentials (device)", credits:50, unit:"dispositivo evaluado" },
  { cat:"Cyber Risk Exposure Management", id:"C", name:"Cyber Risk Exposure Management - Essentials (network assets)", credits:20, unit:"activo de red evaluado" },

  // Cloud Risk Management
  { cat:"Cloud Risk Management", id:"D", name:"Cloud Risk Management 1-500 Resources or cloud assets", credits:1000, unit:"cuenta cloud", sku:"VORN0256" },
  { cat:"Cloud Risk Management", id:"E", name:"Cloud Risk Management 501-1000 Resources or cloud assets", credits:2000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"F", name:"Cloud Risk Management 1001-1500 Resources or cloud assets", credits:3000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"G", name:"Cloud Risk Management 1501-2000 Resources or cloud assets", credits:4000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"H", name:"Cloud Risk Management 2001-2500 Resources or cloud assets", credits:5000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"I", name:"Cloud Risk Management 2501-3000 Resources or cloud assets", credits:6000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"J", name:"Cloud Risk Management 3001-3500 Resources or cloud assets", credits:7000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"K", name:"Cloud Risk Management 3501+ Resources or cloud assets", credits:8000, unit:"cuenta cloud" },

  // Security Operations
  { cat:"Security Operations", id:"L", name:"Agentic SIEM - Analytic Data Ingestion", credits:3, unit:"GB de datos ingeridos por día" },
  { cat:"Security Operations", id:"M", name:"Agentic SIEM - Archival Data Ingestion", credits:1, unit:"GB de datos ingeridos por día" },
  { cat:"Security Operations", id:"N", name:"Agentic SIEM - Analytic Data Retention", credits:2.4, unit:"GB por mes de retención" },
  { cat:"Security Operations", id:"O", name:"Agentic SIEM - Archival Data Retention", credits:0.6, unit:"GB por mes de retención" },
  { cat:"Security Operations", id:"P", name:"Forensics", credits:400, unit:"GB de almacenamiento" },
  { cat:"Security Operations", id:"Q", name:"Data Pipeline (Outbound)", credits:800, unit:"TB exportado" },
  { cat:"Security Operations", id:"R", name:"XDR for Endpoints (EDR)", credits:20, unit:"endpoint" },
  { cat:"Security Operations", id:"S", name:"XDR for Email (EmDR)", credits:5, unit:"usuario" },
  { cat:"Security Operations", id:"T", name:"XDR for Networks (NDR) - Deep Discovery Inspector", credits:12500, unit:"500Mbps de tráfico" },
  { cat:"Security Operations", id:"U", name:"XDR for Networks (NDR)", credits:12500, unit:"500Mbps de tráfico" },
  { cat:"Security Operations", id:"V", name:"XDR for Cloud (CDR)", credits:3, unit:"GB de datos" },

  // Threat Intelligence
  { cat:"Threat Intelligence", id:"X", name:"Sandbox Analysis - Manual Submission", credits:2, unit:"submission" },
  { cat:"Threat Intelligence", id:"Y", name:"Sandbox Analysis - Auto Submission con ZTSA Internet Access", credits:7, unit:"usuario" },
  { cat:"Threat Intelligence", id:"Z", name:"Sandbox Analysis - Auto Submission con Networks", credits:2000, unit:"500Mbps de tráfico" },
  { cat:"Threat Intelligence", id:"a", name:"Sandbox Analysis - Auto Submission con Endpoint Security", credits:7, unit:"endpoint" },
  { cat:"Threat Intelligence", id:"b", name:"Threat Intelligence", credits:80000, unit:"V1 tenant" },
  { cat:"Threat Intelligence", id:"c", name:"Threat Intelligence for Service Providers (V1 xSP)", credits:500000, unit:"V1 tenant" },

  // Cloud Security
  { cat:"Cloud Security", id:"d", name:"Container Security - Kubernetes node o Amazon ECS instance", credits:1100, unit:"nodo o instancia" },
  { cat:"Cloud Security", id:"e", name:"Container Security - Serverless container pod o task", credits:110, unit:"pod o task serverless" },
  { cat:"Cloud Security", id:"f", name:"Container Security - Custom Rule Detection", credits:3, unit:"GB de datos" },
  { cat:"Cloud Security", id:"g", name:"File Security Virtual Appliance - scans", credits:5000, unit:"500K scans" },
  { cat:"Cloud Security", id:"i", name:"File Security Virtual Appliance - scanner (5TB)", credits:6000, unit:"scanner" },
  { cat:"Cloud Security", id:"j", name:"File Security Containerized Scanning - scans", credits:5000, unit:"500K scans" },
  { cat:"Cloud Security", id:"l", name:"File Security Containerized Scanning - scanner (5TB)", credits:6000, unit:"scanner" },
  { cat:"Cloud Security", id:"m", name:"File Security SDK - scans", credits:5000, unit:"500K scans" },
  { cat:"Cloud Security", id:"o", name:"File Security Storage - scans", credits:5000, unit:"500K scans" },
  { cat:"Cloud Security", id:"q", name:"File Security Storage - bucket", credits:9636, unit:"bucket reservado" },

  // Endpoint Security
  { cat:"Endpoint Security", id:"r", name:"Endpoint Security Core", credits:45, unit:"endpoint", sku:"VORN0034" },
  { cat:"Endpoint Security", id:"s", name:"Endpoint Security Essentials", credits:65, unit:"endpoint" },
  { cat:"Endpoint Security", id:"t", name:"Endpoint Security Pro", credits:300, unit:"endpoint", sku:"VORN0051" },
  { cat:"Endpoint Security", id:"u", name:"SAP Scanner for Endpoint Security Pro", credits:4800, unit:"servidor SAP" },
  { cat:"Endpoint Security", id:"v", name:"Mobile Security", credits:5, unit:"dispositivo móvil" },

  // Email and Collaboration Security
  { cat:"Email and Collaboration Security", id:"x", name:"Email and Collaboration Security Core", credits:25, unit:"usuario", sku:"VORN0175" },
  { cat:"Email and Collaboration Security", id:"y", name:"Email and Collaboration Security Essentials", credits:50, unit:"usuario" },
  { cat:"Email and Collaboration Security", id:"z", name:"Email and Collaboration Security Pro", credits:105, unit:"usuario" },

  // Zero Trust Secure Access (Network Security)
  { cat:"Zero Trust Secure Access", id:"AA", name:"Zero Trust Secure Access - Internet + Private Access", credits:110, unit:"usuario" },
  { cat:"Zero Trust Secure Access", id:"AB", name:"Zero Trust Secure Access - Internet Access", credits:60, unit:"usuario" },
  { cat:"Zero Trust Secure Access", id:"AC", name:"Zero Trust Secure Access - Private Access", credits:50, unit:"usuario" },
  { cat:"Zero Trust Secure Access", id:"AD", name:"Zero Trust Secure Access - AI Service Access", credits:50, unit:"usuario" },
  { cat:"Zero Trust Secure Access", id:"AE", name:"Zero Trust Secure Access - Internet + AI Service Access", credits:85, unit:"usuario" },
  { cat:"Zero Trust Secure Access", id:"AF", name:"Zero Trust Secure Access - Outbound Static IP Add-on", credits:4000, unit:"256Mbps de bandwidth" },

  // Data Security
  { cat:"Data Security", id:"AG", name:"Data Security - Endpoint", credits:30, unit:"endpoint" },

  // AI Security
  { cat:"AI Security", id:"AH", name:"AI Application Security - Private Cloud", credits:7200, unit:"instancia private cloud" },
  { cat:"AI Security", id:"AI", name:"AI Application Security - SaaS", credits:9600, unit:"5,000 API usage diario" },
  { cat:"AI Security", id:"AJ", name:"AI Security Package", credits:1200, unit:"empleado total" },
];

const fmt  = n => n.toLocaleString("en-US");
const fmtU = n => "$" + n.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 });
const mono = { fontFamily:"'JetBrains Mono','SF Mono','Fira Mono',monospace" };

const CATS = [...new Set(CATALOG.map(p => p.cat))];

// Friendly descriptions for client-facing view (id → description in plain Spanish)
const CLIENT_DESC = {
  "AK": "Pool de créditos prepagados que se consumen según los productos activados",
  "A": "Identifica y prioriza riesgos de seguridad en dispositivos y red",
  "B": "Análisis avanzado de exposición al riesgo en dispositivos",
  "C": "Análisis avanzado de exposición al riesgo en infraestructura de red",
  "D": "Análisis de riesgo en cuentas cloud con menos de 500 recursos",
  "E": "Análisis de riesgo en cuentas cloud con 501-1000 recursos",
  "F": "Análisis de riesgo en cuentas cloud con 1001-1500 recursos",
  "G": "Análisis de riesgo en cuentas cloud con 1501-2000 recursos",
  "H": "Análisis de riesgo en cuentas cloud con 2001-2500 recursos",
  "I": "Análisis de riesgo en cuentas cloud con 2501-3000 recursos",
  "J": "Análisis de riesgo en cuentas cloud con 3001-3500 recursos",
  "K": "Análisis de riesgo en cuentas cloud con 3501+ recursos",
  "L": "Ingesta de logs en SIEM para análisis avanzado",
  "M": "Ingesta de logs en SIEM para archivado",
  "N": "Retención de datos analíticos en SIEM",
  "O": "Retención de datos archivados en SIEM",
  "P": "Almacenamiento de paquetes forenses para investigaciones",
  "Q": "Exportación de datos a sistemas externos",
  "R": "Detección y respuesta avanzada en endpoints (EDR)",
  "S": "Detección y respuesta avanzada en correo electrónico",
  "T": "Detección y respuesta en redes con Deep Discovery Inspector",
  "U": "Detección y respuesta en redes basada en bandwidth",
  "V": "Detección y respuesta en infraestructura cloud",
  "X": "Análisis manual de archivos sospechosos en sandbox",
  "Y": "Análisis automático de URLs sospechosas vía ZTSA Internet",
  "Z": "Análisis automático de tráfico de red en sandbox",
  "a": "Análisis automático de archivos desde endpoints en sandbox",
  "b": "Inteligencia de amenazas para tu organización",
  "c": "Inteligencia de amenazas para proveedores de servicios (MSSP)",
  "d": "Protección de nodos Kubernetes y contenedores ECS",
  "e": "Protección de pods y tasks serverless",
  "f": "Detección personalizada en contenedores",
  "g": "Escaneo de archivos vía Virtual Appliance",
  "i": "Scanner dedicado de Virtual Appliance (5TB)",
  "j": "Escaneo de archivos containerizado",
  "l": "Scanner containerizado dedicado (5TB)",
  "m": "Integración SDK para escaneo de archivos en aplicaciones propias",
  "o": "Escaneo de archivos en almacenamiento cloud",
  "q": "Bucket reservado para File Security Storage",
  "r": "Protección antivirus y EDR para equipos y servidores",
  "s": "Endpoint Security con XDR incluido",
  "t": "Endpoint Security empresarial con XDR + funciones avanzadas",
  "u": "Escaneo de servidores SAP con NetWeaver",
  "v": "Protección antivirus para dispositivos móviles (iOS/Android)",
  "x": "Filtro antispam, antiphishing y protección de correo (Microsoft 365 / Google)",
  "y": "Email Security con XDR incluido",
  "z": "Email Security empresarial con XDR + DLP + funciones avanzadas",
  "AA": "Acceso seguro Zero Trust para internet y aplicaciones internas",
  "AB": "Acceso seguro Zero Trust para navegación web",
  "AC": "Acceso seguro Zero Trust para aplicaciones internas (reemplaza VPN)",
  "AD": "Acceso seguro Zero Trust para servicios de IA generativa (ChatGPT, etc.)",
  "AE": "Acceso seguro Zero Trust para internet + servicios de IA",
  "AF": "IPs estáticas dedicadas para tráfico saliente de ZTSA",
  "AG": "Prevención de pérdida de datos (DLP) en endpoints",
  "AH": "Seguridad para aplicaciones de IA en infraestructura privada",
  "AI": "Seguridad para aplicaciones de IA en SaaS",
  "AJ": "Paquete completo de seguridad para IA empresarial",
};

const CAT_ICONS = {
  "Vision One Credits": "🪙",
  "Endpoint Security": "💻",
  "Email and Collaboration Security": "📧",
  "Cyber Risk Exposure Management": "🎯",
  "Cloud Risk Management": "☁️",
  "Security Operations": "🔍",
  "Threat Intelligence": "🛡️",
  "Cloud Security": "🌐",
  "Zero Trust Secure Access": "🔐",
  "Data Security": "🔒",
  "AI Security": "🤖",
};

// Calculate months between two date strings (YYYY-MM-DD), rounded to 1 decimal
function monthsBetween(startDate, endDate) {
  if (!startDate || !endDate) return 12; // default to 1 year
  const s = new Date(startDate);
  const e = new Date(endDate);
  if (isNaN(s) || isNaN(e) || e <= s) return 12;
  // More precise: days / 30.4375 (average month length)
  const days = (e - s) / (1000 * 60 * 60 * 24);
  return Math.round((days / 30.4375) * 10) / 10;
}

// Default fill for lines: start = today, end = today + 1 year
function defaultDates() {
  const today = new Date();
  const nextYear = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);
  const fmt = d => d.toISOString().split("T")[0];
  return { startDate: fmt(today), date: fmt(nextYear) };
}

const C = {
  bg:"#FAFAF9", surface:"#FFFFFF", panel:"#F5F5F4", border:"#E7E5E4",
  text:"#0C0A09", text2:"#57534E", text3:"#A8A29E",
  accent:"#D71921",
  blue:"#1E40AF", blueBg:"#EFF6FF",
  green:"#047857", greenBg:"#ECFDF5",
  red:"#DC2626",
  amber:"#B45309", amberBg:"#FFFBEB",
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    check();
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function ProductPicker({ onPick, onClose, triggerRef, isMobile }) {
  const [q, setQ] = useState("");
  const [coords, setCoords] = useState(null);
  const inpRef = useRef(null);
  const popRef = useRef(null);

  useEffect(() => {
    if (isMobile) {
      // Full screen on mobile
      setCoords({ mobile: true });
    } else if (triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const needed = 360;
      const top = spaceBelow < needed && rect.top > needed
        ? rect.top - needed - 4
        : rect.bottom + 4;
      setCoords({ top, left: rect.left, width: rect.width });
    }
    setTimeout(() => inpRef.current?.focus(), 50);
  }, [triggerRef, isMobile]);

  useEffect(() => {
    if (isMobile) return; // no outside-click close on mobile (has X button)
    const h = e => {
      if (popRef.current && !popRef.current.contains(e.target) && !triggerRef?.current?.contains(e.target)) onClose();
    };
    // Reposition on scroll instead of closing — so you can scroll inside the dropdown
    const onScroll = (e) => {
      // If scroll happens INSIDE the dropdown, ignore (let it scroll normally)
      if (popRef.current && popRef.current.contains(e.target)) return;
      // Otherwise, reposition the dropdown to follow its trigger
      if (triggerRef?.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        // If trigger is off-screen, close the picker
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          onClose();
          return;
        }
        const spaceBelow = window.innerHeight - rect.bottom;
        const needed = 360;
        const top = spaceBelow < needed && rect.top > needed
          ? rect.top - needed - 4
          : rect.bottom + 4;
        setCoords({ top, left: rect.left, width: rect.width });
      }
    };
    document.addEventListener("mousedown", h);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", h);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [onClose, triggerRef, isMobile]);

  const filtered = CATALOG.filter(p => {
    const s = q.toLowerCase();
    return !s || p.name.toLowerCase().includes(s) || p.cat.toLowerCase().includes(s) || (p.sku||"").toLowerCase().includes(s);
  });
  const grouped = {};
  filtered.forEach(p => { if(!grouped[p.cat]) grouped[p.cat]=[]; grouped[p.cat].push(p); });

  if (!coords) return null;

  const wrapStyle = isMobile ? {
    position:"fixed", top:0, left:0, right:0, bottom:0, zIndex:9999,
    background:C.surface, display:"flex", flexDirection:"column"
  } : {
    position:"fixed", top:coords.top, left:coords.left, width:coords.width, zIndex:9999,
    background:C.surface, border:`1px solid ${C.border}`, borderRadius:8,
    boxShadow:"0 10px 40px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)",
    maxHeight:360, overflow:"hidden", display:"flex", flexDirection:"column"
  };

  return (
    <div ref={popRef} style={wrapStyle}>
      <div style={{ padding:isMobile?"14px 14px 10px":"8px 10px", borderBottom:`1px solid ${C.border}`, display:"flex", gap:8, alignItems:"center" }}>
        <input ref={inpRef} type="text" placeholder="Buscar producto, SKU o categoría..." value={q} onChange={e=>setQ(e.target.value)}
          style={{ flex:1, fontSize:isMobile?16:13, padding: isMobile?"11px 13px":"7px 10px", border:`1px solid ${C.border}`, borderRadius:7, outline:"none", background:C.bg }}
          onKeyDown={e => { if(e.key==="Escape") onClose(); if(e.key==="Enter" && filtered.length) { onPick(filtered[0]); onClose(); } }}
        />
        {isMobile && <button onClick={onClose} style={{ fontSize:14, padding:"10px 14px", background:C.panel, border:"none", borderRadius:7, color:C.text2, fontWeight:600 }}>Cancelar</button>}
      </div>
      <div style={{ overflowY:"auto", flex:1, WebkitOverflowScrolling:"touch" }}>
        {Object.entries(grouped).length === 0 ? (
          <div style={{ padding:"20px 14px", textAlign:"center", fontSize:12, color:C.text3 }}>Sin resultados</div>
        ) : Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <div style={{ padding:"8px 14px 4px", fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".06em", background:C.panel, position:"sticky", top:0 }}>{cat}</div>
            {items.map(p => (
              <button key={p.id} onClick={() => { onPick(p); onClose(); }}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, padding: isMobile?"14px 14px":"8px 12px", background:"none", border:"none", borderBottom:`1px solid ${C.border}`, cursor:"pointer", textAlign:"left", minHeight:isMobile?54:"auto" }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:isMobile?14:12, fontWeight:500, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                  <div style={{ fontSize:isMobile?11:10, color:C.text3, marginTop:2, display:"flex", gap:6 }}>
                    <span>por {p.unit}</span>
                    {p.sku && <span style={{ ...mono }}>· {p.sku}</span>}
                  </div>
                </div>
                <span style={{ ...mono, fontSize:isMobile?12:11, fontWeight:600, color:C.blue, background:C.blueBg, padding:"3px 8px", borderRadius:5, whiteSpace:"nowrap" }}>{fmt(p.credits)} cr</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LineRow({ line, onUpdate, onDelete, onDuplicate, idx, isMobile }) {
  const [picking, setPicking] = useState(false);
  const triggerRef = useRef(null);
  const prod = line.prodId ? CATALOG.find(p => p.id === line.prodId) : null;
  const total = prod ? line.qty * prod.credits : 0;
  const active = line.qty > 0 && prod;

  // Compute proration
  const months = monthsBetween(line.startDate, line.date);
  const proratedTotal = prod ? Math.round(line.qty * prod.credits * (months / 12)) : 0;
  const isProrated = prod && line.qty > 0 && Math.abs(months - 12) > 0.1;

  // Mobile card layout
  if (isMobile) {
    return (
      <div style={{
        background: active ? "#FAFCFF" : C.surface,
        border: `1px solid ${active ? "#C7D9EF" : C.border}`,
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
        position: "relative"
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
          <span style={{ ...mono, fontSize:11, color:C.text3, fontWeight:600 }}>#{String(idx+1).padStart(2,"0")}</span>
          <div style={{ display:"flex", gap:4 }}>
            <button onClick={() => onDuplicate(line.rowId)} disabled={!prod} title="Duplicar"
              style={{ width:32,height:32,borderRadius:6,border:`1px solid ${C.border}`,background:C.surface,cursor:prod?"pointer":"not-allowed",fontSize:14,color:C.text2,opacity:prod?1:0.4 }}>⊕</button>
            <button onClick={() => onDelete(line.rowId)} title="Eliminar"
              style={{ width:32,height:32,borderRadius:6,border:`1px solid ${C.border}`,background:C.surface,cursor:"pointer",fontSize:13,color:C.red }}>✕</button>
          </div>
        </div>

        <div ref={triggerRef} style={{ position:"relative", marginBottom:10 }}>
          <button onClick={() => setPicking(!picking)}
            style={{ width:"100%", textAlign:"left", background:C.surface, border:`1px solid ${C.border}`, borderRadius:7, padding:"10px 12px", cursor:"pointer", minHeight:54 }}>
            {prod ? (
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{prod.name}</div>
                <div style={{ fontSize:11, color:C.text3, marginTop:2, display:"flex", gap:6, flexWrap:"wrap" }}>
                  <span>{prod.cat}</span>
                  <span>· {fmt(prod.credits)} cr/año/{prod.unit}</span>
                  {prod.sku && <span style={{ ...mono }}>· {prod.sku}</span>}
                </div>
              </div>
            ) : (
              <div style={{ color:C.text3, fontSize:14, display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:16 }}>⊕</span> Buscar producto...
              </div>
            )}
          </button>
          {picking && <ProductPicker triggerRef={triggerRef} isMobile={true} onPick={p => onUpdate({ ...line, prodId:p.id })} onClose={() => setPicking(false)} />}
        </div>

        {/* Dates: start + end */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
          <div>
            <div style={{ fontSize:10, fontWeight:600, color:C.text3, marginBottom:3, textTransform:"uppercase", letterSpacing:".05em" }}>Inicio</div>
            <input type="date" value={line.startDate || ""} onChange={e=>onUpdate({...line, startDate:e.target.value})}
              style={{ ...mono, fontSize:13, color:C.text2, border:`1px solid ${C.border}`, borderRadius:7, padding:"10px 10px", background:C.surface, width:"100%", boxSizing:"border-box" }} />
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:600, color:C.text3, marginBottom:3, textTransform:"uppercase", letterSpacing:".05em" }}>Vencimiento</div>
            <input type="date" value={line.date} onChange={e=>onUpdate({...line, date:e.target.value})}
              style={{ ...mono, fontSize:13, color:C.text2, border:`1px solid ${isProrated?C.amber:C.border}`, borderRadius:7, padding:"10px 10px", background:C.surface, width:"100%", boxSizing:"border-box" }} />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <div style={{ fontSize:10, fontWeight:600, color:C.text3, marginBottom:3, textTransform:"uppercase", letterSpacing:".05em" }}>Cantidad</div>
          <input type="number" inputMode="numeric" min={0} step={1} value={line.qty||""} placeholder="0" disabled={!prod}
            onChange={e => onUpdate({...line, qty:parseInt(e.target.value)||0})}
            style={{ ...mono, fontSize:16, fontWeight:600, textAlign:"right", padding:"10px 12px", border:`1px solid ${active?C.blue:C.border}`, borderRadius:7, background:active?"#fff":prod?C.surface:C.panel, color:C.text, outline:"none", width:"100%", boxSizing:"border-box" }} />
        </div>

        {/* Proration indicator */}
        {isProrated && (
          <div style={{ marginTop:10, padding:"8px 12px", background:C.amberBg, border:`1px solid #FDE68A`, borderRadius:7, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:11, color:C.amber, fontWeight:600 }}>⚠ Vigencia prorrateada</span>
            <span style={{ ...mono, fontSize:12, fontWeight:700, color:C.amber }}>{months} meses</span>
          </div>
        )}

        {/* Total */}
        {active && (
          <div style={{ marginTop:10, padding:"8px 12px", background:C.blueBg, borderRadius:7, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:11, color:C.text2, fontWeight:500 }}>Total de esta línea</span>
            <div style={{ textAlign:"right" }}>
              <div style={{ ...mono, fontSize:15, fontWeight:700, color:C.blue }}>{fmt(proratedTotal)} créditos</div>
              {isProrated && <div style={{ fontSize:10, color:C.text3, ...mono }}>base anual: {fmt(line.qty * prod.credits)}</div>}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop table-row layout
  return (
    <div style={{
      display:"grid", gridTemplateColumns:"34px 1fr 150px 150px 72px 110px 60px",
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
              <div style={{ fontSize:10, color:C.text3, marginTop:1, display:"flex", gap:8, alignItems:"center" }}>
                <span>{prod.cat}</span>
                <span>· {fmt(prod.credits)} cr/año/{prod.unit}</span>
                {prod.sku && <span style={{ ...mono }}>· {prod.sku}</span>}
                {isProrated && (
                  <span style={{ background:C.amberBg, color:C.amber, padding:"1px 6px", borderRadius:3, fontWeight:700, ...mono }}>
                    {months}m · prorrateado
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div style={{ color:C.text3, fontSize:13, display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:14 }}>⊕</span> Buscar producto...
            </div>
          )}
        </button>
        {picking && <ProductPicker triggerRef={triggerRef} isMobile={false} onPick={p => onUpdate({ ...line, prodId:p.id })} onClose={() => setPicking(false)} />}
      </div>

      <input type="date" value={line.startDate || ""} onChange={e=>onUpdate({...line, startDate:e.target.value})}
        title="Fecha de inicio"
        style={{ ...mono, fontSize:12, color:C.text2, border:`1px solid ${C.border}`, borderRadius:6, padding:"7px 10px", background:"transparent", width:"100%", boxSizing:"border-box" }} />

      <input type="date" value={line.date} onChange={e=>onUpdate({...line, date:e.target.value})}
        title="Fecha de vencimiento"
        style={{ ...mono, fontSize:12, color:C.text2, border:`1px solid ${isProrated?C.amber:C.border}`, borderRadius:6, padding:"7px 10px", background:"transparent", width:"100%", boxSizing:"border-box" }} />

      <input type="number" min={0} step={1} value={line.qty||""} placeholder="0" disabled={!prod}
        onChange={e => onUpdate({...line, qty:parseInt(e.target.value)||0})}
        style={{ ...mono, fontSize:13, fontWeight:500, textAlign:"right", padding:"6px 9px", border:`1px solid ${active?C.blue:C.border}`, borderRadius:5, background:active?"#fff":prod?C.surface:C.panel, color:C.text, outline:"none", width:"100%" }} />

      <div style={{ ...mono, fontSize:13, fontWeight:600, textAlign:"right", color:active?C.blue:C.text3 }}>
        {active ? (
          <div>
            <div>{fmt(proratedTotal)}</div>
            {isProrated && <div style={{ fontSize:9, color:C.text3, fontWeight:400 }}>base: {fmt(line.qty * prod.credits)}</div>}
          </div>
        ) : "—"}
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
  const active = lines.filter(l => l.prodId && l.qty > 0).map(l => {
    const p = CATALOG.find(c => c.id===l.prodId);
    const months = monthsBetween(l.startDate, l.date);
    const prorated = Math.round(l.qty * p.credits * (months / 12));
    return { ...l, prod:p, months, prorated, baseTotal: l.qty * p.credits, isProrated: Math.abs(months - 12) > 0.1 };
  });

  const rowsHTML = active.map((l, i) => `
    <tr>
      <td style="padding:8px 10px;font-size:11px;color:#A8A29E;font-family:'SF Mono',monospace;border-bottom:1px solid #E7E5E4">${String(i+1).padStart(2,"0")}</td>
      <td style="padding:8px 10px;font-size:12px;border-bottom:1px solid #E7E5E4">
        ${l.prod.name}<br>
        <span style="font-size:10px;color:#A8A29E;${l.prod.sku ? "font-family:'SF Mono',monospace" : ""}">${l.prod.sku ? `${l.prod.sku} · ${l.prod.cat}` : l.prod.cat}</span>
        ${l.isProrated ? `<br><span style="font-size:9px;color:#B45309;background:#FFFBEB;padding:1px 5px;border-radius:3px;font-family:'SF Mono',monospace;display:inline-block;margin-top:2px">⚠ ${l.months}m prorrateado</span>` : ""}
      </td>
      <td style="padding:8px 10px;font-size:10px;color:#57534E;border-bottom:1px solid #E7E5E4;font-family:'SF Mono',monospace;line-height:1.4">
        ${l.startDate || "—"}<br>
        <span style="color:#A8A29E">→ ${l.date || "—"}</span>
      </td>
      <td style="padding:8px 10px;font-family:'SF Mono',monospace;text-align:right;border-bottom:1px solid #E7E5E4">${l.qty.toLocaleString()}</td>
      <td style="padding:8px 10px;font-size:11px;font-family:'SF Mono',monospace;text-align:right;color:#A8A29E;border-bottom:1px solid #E7E5E4">${fmt(l.prod.credits)} cr/año</td>
      <td style="padding:8px 10px;font-family:'SF Mono',monospace;font-weight:700;text-align:right;color:#1E40AF;border-bottom:1px solid #E7E5E4">
        ${fmt(l.prorated)}
        ${l.isProrated ? `<br><span style="font-size:9px;color:#A8A29E;font-weight:400">base: ${fmt(l.baseTotal)}</span>` : ""}
      </td>
    </tr>`).join("");

  const sopRow = soporteSale > 0 ? `
    <tr>
      <td style="padding:8px 10px;font-size:11px;color:#A8A29E;font-family:'SF Mono',monospace;border-bottom:1px solid #E7E5E4">${String(active.length+1).padStart(2,"0")}</td>
      <td style="padding:8px 10px;font-size:12px;border-bottom:1px solid #E7E5E4">Soporte Platinum Trend Micro<br><span style="font-size:10px;color:#A8A29E">Servicio profesional · Precio fijo</span></td>
      <td style="padding:8px 10px;font-size:10px;color:#57534E;border-bottom:1px solid #E7E5E4;font-family:'SF Mono',monospace">${soporteDate || "—"}</td>
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
      <thead><tr style="background:#F5F5F4">${["#","Producto","Vigencia (inicio → fin)","Cant.","Rate","Total cr / $"].map((h,i)=>`<th style="padding:8px 10px;text-align:${i>=3?"right":"left"};font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">${h}</th>`).join("")}</tr></thead>
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

function InternalApp() {
  const [lines, setLines] = useState(() => {
    const d = defaultDates();
    return [{ rowId: 1, prodId: null, qty: 0, date: d.date, startDate: d.startDate }];
  });
  const [rc, setRc] = useState(2);
  const [salePrice, setSalePrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [soporteSale, setSoporteSale] = useState(0);
  const [soporteCost, setSoporteCost] = useState(0);
  const [soporteDate, setSoporteDate] = useState("");
  const [clientName, setClientName] = useState("");
  const isMobile = useIsMobile();
  const [settingsOpen, setSettingsOpen] = useState(false);

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

  // --- Import quote modal state ---
  const [importOpen, setImportOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileImport = async (file) => {
    if (!file) return;
    setImporting(true);
    setImportError(null);
    setImportResult(null);
    try {
      // Read file as base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          const b64 = result.split(",")[1]; // strip "data:...;base64,"
          resolve(b64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const resp = await fetch("/api/parse-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileBase64: base64,
          mediaType: file.type || "application/octet-stream",
          fileName: file.name
        })
      });

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || `HTTP ${resp.status}`);
      }
      setImportResult(data);
    } catch (e) {
      console.error("Import error:", e);
      setImportError(e.message || "Error desconocido");
    } finally {
      setImporting(false);
    }
  };

  const applyImportResult = () => {
    if (!importResult) return;
    const newLines = importResult.lines
      .filter(l => l.prodId && l.quantity > 0) // only mappable lines with qty
      .map((l, i) => ({
        rowId: rc + i,
        prodId: l.prodId,
        qty: l.quantity,
        startDate: importResult.startDate || defaultDates().startDate,
        date: importResult.endDate || defaultDates().date
      }));
    if (newLines.length === 0) {
      setImportError("No se encontraron productos reconocidos en el archivo");
      return;
    }
    setRc(c => c + newLines.length);
    setLines(newLines);
    if (importResult.clientName) setClientName(importResult.clientName);
    if (importResult.soportePlatinum?.present) {
      setSoporteSale(importResult.soportePlatinum.price || 0);
      setSoporteDate(importResult.endDate || "");
    }
    setImportOpen(false);
    setImportResult(null);
  };

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
      if (p) {
        const months = monthsBetween(l.startDate, l.date);
        totalCredits += l.qty * p.credits * (months / 12);
      }
    }
  });
  totalCredits = Math.round(totalCredits);
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

  const addLine = () => {
    const d = defaultDates();
    setLines(p => [...p, { rowId:rc, prodId:null, qty:0, date:d.date, startDate:d.startDate }]);
    setRc(c => c+1);
  };
  const updateLine = (row) => setLines(p => p.map(l => l.rowId===row.rowId ? row : l));
  const deleteLine = (id) => setLines(p => {
    if (p.length > 1) return p.filter(l => l.rowId!==id);
    const d = defaultDates();
    return [{ rowId:rc, prodId:null, qty:0, date:d.date, startDate:d.startDate }];
  });
  const duplicateLine = (id) => {
    setLines(p => {
      const idx = p.findIndex(l => l.rowId===id);
      const d = defaultDates();
      const next = [...p];
      next.splice(idx+1, 0, { rowId:rc, prodId:p[idx].prodId, qty:0, date:d.date, startDate:d.startDate });
      return next;
    });
    setRc(c => c+1);
  };
  const clearAll = () => { if(confirm("¿Limpiar todo? Esto incluye los precios configurados.")){ const d = defaultDates(); setLines([{ rowId:rc, prodId:null, qty:0, date:d.date, startDate:d.startDate }]); setRc(c => c+1); setSalePrice(0); setCostPrice(0); setSoporteSale(0); setSoporteCost(0); setSoporteDate(""); setClientName(""); }};

  return (
    <>
      <style>{PRINT_CSS}</style>

      <PrintView data={{ lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, clientName }} />

      <div className="no-print" style={{
        display: isMobile ? "block" : "grid",
        gridTemplateColumns: isMobile ? "none" : "272px 1fr",
        minHeight: "100vh",
        fontFamily: "system-ui,-apple-system,sans-serif",
        background: C.bg,
        color: C.text,
        fontSize: 14,
        paddingBottom: isMobile ? "calc(80px + env(safe-area-inset-bottom, 0px))" : 0
      }}>

      {!isMobile && (
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
      )}

      {/* Mobile top header with logo + currency toggle + settings */}
      {isMobile && (
      <header style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, gap:10 }}>
        <img src={TRENDAI_LOGO} alt="TrendAI" style={{ height:28, width:"auto" }} />
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ display:"flex", background:C.panel, border:`1px solid ${C.border}`, borderRadius:6, padding:2 }}>
            {[
              { code:"USD", label:"🇵🇦" },
              { code:"VES", label:"🇻🇪" },
            ].map(c => (
              <button key={c.code} onClick={() => setCurrency(c.code)}
                style={{ padding:"5px 9px", fontSize:13, background:currency===c.code?C.surface:"transparent", border:"none", borderRadius:4, cursor:"pointer", boxShadow: currency===c.code ? "0 1px 2px rgba(0,0,0,.08)" : "none" }}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={() => setSettingsOpen(true)}
            style={{ width:38, height:38, borderRadius:8, border:`1px solid ${C.border}`, background:C.surface, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
            ⚙
          </button>
        </div>
      </header>
      )}

      <main style={{ padding: isMobile ? "14px 14px 20px" : "28px 34px", overflowY:"auto" }}>

        {/* Warning banner if prices are 0 */}
        {(salePrice === 0 || costPrice === 0) && (
          <div style={{
            background:`linear-gradient(135deg, ${C.amberBg} 0%, #FEF3C7 100%)`,
            border:`1.5px solid #FCD34D`,
            borderRadius:10,
            padding: isMobile ? "12px 14px" : "14px 18px",
            marginBottom: isMobile ? 14 : 18,
            display:"flex",
            alignItems:"center",
            gap:12
          }}>
            <div style={{ fontSize:isMobile?22:24 }}>⚠️</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:isMobile?13:14, fontWeight:700, color:C.amber, marginBottom:2 }}>
                Precios en cero — recuerda configurarlos antes de cotizar
              </div>
              <div style={{ fontSize:isMobile?11:12, color:C.text2, lineHeight:1.4 }}>
                {isMobile
                  ? "Toca el botón ⚙ arriba para ingresar los precios."
                  : "Por seguridad, los precios al cliente y costo proveedor inician en $0.00. Ingrésalos en el panel izquierdo."}
              </div>
            </div>
            {isMobile && (
              <button onClick={() => setSettingsOpen(true)}
                style={{ padding:"8px 12px", background:C.amber, color:"#fff", border:"none", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                ⚙ Ajustes
              </button>
            )}
          </div>
        )}

        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:isMobile?12:18, gap:14, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:isMobile?18:22, fontWeight:700, letterSpacing:"-.025em", marginBottom:3 }}>Nueva cotización</div>
            {!isMobile && <div style={{ fontSize:13, color:C.text3 }}>Busca productos del catálogo y construye la propuesta línea por línea</div>}
          </div>
          {!isMobile && (
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
            <button onClick={() => setImportOpen(true)} style={{ fontSize:12, color:"#fff", background:C.blue, border:"none", borderRadius:6, padding:"7px 12px", cursor:"pointer", fontWeight:600, display:"flex", alignItems:"center", gap:5 }}>
              ✨ Importar cotización
            </button>
            <button onClick={clearAll} style={{ fontSize:12, color:C.text2, background:C.surface, border:`1px solid ${C.border}`, borderRadius:6, padding:"6px 12px", cursor:"pointer" }}>Limpiar</button>
          </div>
          )}
        </div>

        {/* Mobile: client name input */}
        {isMobile && (
          <div style={{ marginBottom:10, display:"flex", flexDirection:"column", gap:8 }}>
            <button onClick={() => setImportOpen(true)}
              style={{ fontSize:14, color:"#fff", background:C.blue, border:"none", borderRadius:9, padding:"12px", cursor:"pointer", fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              ✨ Importar cotización con IA
            </button>
            <input type="text" placeholder="Nombre del cliente (opcional)" value={clientName} onChange={e=>setClientName(e.target.value)}
              style={{ fontSize:15, padding:"11px 13px", border:`1px solid ${C.border}`, borderRadius:8, background:C.surface, color:C.text, width:"100%", outline:"none", boxSizing:"border-box" }} />
          </div>
        )}

        {/* FX panel — only when VES */}
        {currency === "VES" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding: isMobile?"12px":"14px 16px", marginBottom:16, boxShadow:"0 1px 2px rgba(0,0,0,.02)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:13, fontWeight:600 }}>Tasa USD → VES</span>
                {rates.updatedAt && <span style={{ fontSize:10, color:C.text3 }}>{rates.updatedAt.toLocaleTimeString("es-PA", { hour:"2-digit", minute:"2-digit" })}</span>}
              </div>
              <button onClick={fetchRates} disabled={fxLoading}
                style={{ fontSize:11, color:C.text2, background:C.panel, border:`1px solid ${C.border}`, borderRadius:5, padding:"4px 10px", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                {fxLoading ? "⟳ Actualizando..." : "↻ Actualizar tasas"}
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap:8 }}>
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

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap:8, marginBottom:isMobile?14:20 }}>
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

        <div style={{ background: isMobile?"transparent":C.surface, border: isMobile?"none":`1px solid ${C.border}`, borderRadius:10, overflow:"hidden", boxShadow: isMobile?"none":"0 1px 2px rgba(0,0,0,.02)" }}>
          {!isMobile && (
          <>
          <div style={{ padding:"11px 14px", background:C.panel, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ fontSize:13, fontWeight:600 }}>Productos de la cotización</div>
            <div style={{ fontSize:11, color:C.text3 }}>⊕ duplica · ✕ elimina</div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"34px 1fr 150px 150px 72px 110px 60px", gap:10, padding:"6px 14px", background:C.surface, borderBottom:`1px solid ${C.border}` }}>
            {["#","Producto","Inicio","Vencimiento","Cant.","Créditos",""].map((h,i) => (
              <div key={i} style={{ fontSize:10, fontWeight:600, color:C.text3, textAlign:i>=4&&i<6?"right":i===0?"center":"left", textTransform:"uppercase", letterSpacing:".06em" }}>{h}</div>
            ))}
          </div>
          </>
          )}

          {isMobile && (
            <div style={{ fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".06em", marginBottom:8 }}>
              Productos ({lines.length})
            </div>
          )}

          {lines.map((line, idx) => (
            <LineRow key={line.rowId} line={line} idx={idx} onUpdate={updateLine} onDelete={deleteLine} onDuplicate={duplicateLine} isMobile={isMobile} />
          ))}

          <button onClick={addLine} style={{
            width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            padding: isMobile?"14px":"11px", background: isMobile?C.blueBg:C.surface, border: isMobile?`1.5px dashed ${C.blue}`:"none", borderTop: isMobile?`1.5px dashed ${C.blue}`:`1px dashed ${C.border}`,
            borderRadius: isMobile?10:0, marginTop: isMobile?4:0,
            cursor:"pointer", color:C.blue, fontSize: isMobile?14:12, fontWeight:600
          }}>
            <span style={{ fontSize: isMobile?18:14 }}>＋</span> Agregar producto
          </button>
        </div>

        <div style={{ marginTop:14, background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
          <div style={{ padding:"11px 14px", background:C.panel, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:13, fontWeight:600 }}>Soporte Platinum</span>
            <span style={{ fontSize:11, color:C.text3 }}>Precio libre · línea especial sin créditos</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 130px 110px", gap:12, alignItems:"end", padding:"14px", background:soporteSale>0?"#FAFCFF":C.surface }}>
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

      {/* Mobile: fixed bottom bar with totals + PDF button */}
      {isMobile && (
        <div style={{
          position:"fixed", bottom:0, left:0, right:0,
          background:C.surface, borderTop:`1px solid ${C.border}`,
          padding: "10px 14px calc(10px + env(safe-area-inset-bottom, 0px))",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:10,
          boxShadow:"0 -2px 10px rgba(0,0,0,.04)", zIndex:90
        }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:10, color:C.text3, marginBottom:1 }}>{fmt(totalCredits)} créditos · {activeLines} líneas</div>
            <div style={{ ...mono, fontSize:16, fontWeight:700, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
              {fmtMoney(totalRevenue)}
            </div>
            <div style={{ fontSize:10, color:mColor(marginPct), fontWeight:600 }}>
              Margen {fmtU(totalMargin)} · {marginPct.toFixed(1)}%
            </div>
          </div>
          <button onClick={() => downloadReport({ lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, clientName, currency, rateSource, activeRate, vesRate })}
            style={{ padding:"12px 16px", background:C.text, color:"#fff", border:"none", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:6 }}>
            ⬇ PDF
          </button>
        </div>
      )}

      {/* Mobile: settings drawer */}
      {isMobile && settingsOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:9998, background:"rgba(0,0,0,0.5)" }} onClick={() => setSettingsOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            position:"absolute", bottom:0, left:0, right:0,
            background:C.surface, borderRadius:"16px 16px 0 0",
            maxHeight:"85vh", overflowY:"auto",
            padding: "16px 16px calc(16px + env(safe-area-inset-bottom, 0px))",
            boxShadow:"0 -8px 30px rgba(0,0,0,0.2)"
          }}>
            <div style={{ width:40, height:4, background:C.border, borderRadius:2, margin:"0 auto 14px" }} />
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ fontSize:17, fontWeight:700 }}>Ajustes</div>
              <button onClick={() => setSettingsOpen(false)} style={{ width:32, height:32, borderRadius:8, border:`1px solid ${C.border}`, background:C.surface, fontSize:14, cursor:"pointer" }}>✕</button>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".08em", marginBottom:8 }}>Precios por crédito</div>
                {[
                  { label:"Precio al cliente", sub:"Lo que cobra Nextcom", val:salePrice, set:setSalePrice, accent:true },
                  { label:"Costo proveedor",   sub:"Lo que paga Nextcom",  val:costPrice, set:setCostPrice, accent:false },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom:10 }}>
                    <div style={{ fontSize:11, color:C.text3, marginBottom:4, fontWeight:600 }}>{f.label}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, background:C.bg, borderRadius:8, padding:"10px 14px", border:`1px solid ${C.border}` }}>
                      <span style={{ fontSize:14, color:C.text3 }}>$</span>
                      <input type="number" inputMode="decimal" value={f.val} step={0.005} min={0} onChange={e => f.set(parseFloat(e.target.value)||0)}
                        style={{ ...mono, width:"100%", fontSize:17, fontWeight:600, color:f.accent?C.blue:C.text, background:"none", border:"none", outline:"none" }} />
                    </div>
                  </div>
                ))}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:mBg(perCrPct), borderRadius:7, padding:"8px 12px", marginTop:4 }}>
                  <span style={{ fontSize:12, color:C.text2 }}>Margen / crédito</span>
                  <span style={{ ...mono, fontSize:13, fontWeight:700, color:mColor(perCrPct) }}>{fmtU(salePrice-costPrice)} · {perCrPct.toFixed(1)}%</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".08em", marginBottom:8 }}>Resumen del negocio</div>
                <div style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"4px 12px" }}>
                  {[
                    { l:"Créditos totales",   v:fmt(totalCredits), c:C.blue },
                    { l:"Ingresos (cliente)", v:fmtMoney(totalRevenue), c:C.text },
                    { l:"Costo (proveedor)",  v:fmtU(totalCost) + " USD", c:C.text2 },
                    { l:"Margen bruto",       v:fmtU(totalMargin) + " USD", c:mColor(marginPct) },
                    { l:"Rentabilidad",       v:`${marginPct.toFixed(1)}%`, c:mColor(marginPct) },
                  ].map(m => (
                    <div key={m.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ fontSize:12, color:C.text2 }}>{m.l}</span>
                      <span style={{ ...mono, fontSize:13, fontWeight:600, color:m.c }}>{m.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => { clearAll(); setSettingsOpen(false); }} style={{
                fontSize:13, color:C.red, background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"12px", cursor:"pointer", fontWeight:600
              }}>
                Limpiar cotización
              </button>

              <div style={{ fontSize:10, color:C.text3, lineHeight:1.5, textAlign:"center" }}>
                Nextcom Systems, Inc. · Trend Micro Platinum Partner · Panamá
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IMPORT QUOTE MODAL */}
      {importOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:10000, background:"rgba(0,0,0,0.55)", display:"flex", alignItems:"center", justifyContent:"center", padding: isMobile?0:20 }}
          onClick={() => { if (!importing) { setImportOpen(false); setImportResult(null); setImportError(null); } }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: C.surface, borderRadius: isMobile?"16px 16px 0 0":12,
            width: isMobile?"100%":"100%", maxWidth: isMobile?"none":620,
            maxHeight: isMobile?"92vh":"85vh", overflow:"auto",
            position: isMobile?"fixed":"relative", bottom: isMobile?0:"auto", left:0, right:0,
            boxShadow:"0 20px 60px rgba(0,0,0,0.25)"
          }}>
            {isMobile && <div style={{ width:40, height:4, background:C.border, borderRadius:2, margin:"12px auto 0" }} />}
            <div style={{ padding:"20px 22px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:17, fontWeight:700, letterSpacing:"-.01em" }}>✨ Importar cotización</div>
                <div style={{ fontSize:12, color:C.text3, marginTop:3 }}>PDF, Word, Excel, imagen o email. La IA extrae los productos automáticamente.</div>
              </div>
              {!importing && (
                <button onClick={() => { setImportOpen(false); setImportResult(null); setImportError(null); }}
                  style={{ width:32, height:32, borderRadius:8, border:`1px solid ${C.border}`, background:C.surface, fontSize:14, cursor:"pointer" }}>✕</button>
              )}
            </div>

            <div style={{ padding:"20px 22px" }}>
              {!importResult && !importing && (
                <>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = C.blueBg; }}
                    onDragLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; }}
                    onDrop={e => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.background = C.surface;
                      const file = e.dataTransfer.files[0];
                      if (file) handleFileImport(file);
                    }}
                    style={{
                      border:`2px dashed ${C.border}`, borderRadius:10, padding:"36px 20px",
                      textAlign:"center", cursor:"pointer", background:C.surface,
                      transition:"all 0.15s"
                    }}>
                    <div style={{ fontSize:36, marginBottom:10 }}>📎</div>
                    <div style={{ fontSize:14, fontWeight:600, color:C.text, marginBottom:4 }}>
                      {isMobile ? "Toca para seleccionar archivo" : "Arrastra un archivo aquí o haz clic para seleccionar"}
                    </div>
                    <div style={{ fontSize:11, color:C.text3 }}>
                      PDF · JPG · PNG · DOCX · XLSX · TXT (máx. 30 MB)
                    </div>
                  </div>
                  <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.docx,.xlsx,.xls,.txt,.csv,application/pdf,image/*"
                    style={{ display:"none" }}
                    onChange={e => e.target.files[0] && handleFileImport(e.target.files[0])} />

                  {importError && (
                    <div style={{ marginTop:14, padding:"11px 14px", background:"#FEF2F2", border:`1px solid #FCA5A5`, borderRadius:8, fontSize:12, color:C.red }}>
                      ⚠ {importError}
                    </div>
                  )}

                  <div style={{ marginTop:14, padding:"11px 14px", background:C.panel, borderRadius:8, fontSize:11, color:C.text2, lineHeight:1.5 }}>
                    <strong>Funciona con:</strong> cotizaciones de Nextcom, Trend Micro, otros partners, emails con listas de productos, fotos de cotizaciones, etc. La IA reconoce SKUs (VORN0034, VONN0309...) y nombres de productos.
                  </div>
                </>
              )}

              {importing && (
                <div style={{ textAlign:"center", padding:"50px 20px" }}>
                  <div style={{ fontSize:36, marginBottom:14 }}>🤖</div>
                  <div style={{ fontSize:15, fontWeight:600, color:C.text, marginBottom:4 }}>Analizando cotización...</div>
                  <div style={{ fontSize:12, color:C.text3 }}>Claude está leyendo el documento y extrayendo las líneas (puede tardar 5–15 segundos)</div>
                </div>
              )}

              {importResult && !importing && (
                <div>
                  <div style={{ padding:"12px 14px", background: importResult.confidence === "high" ? C.greenBg : importResult.confidence === "medium" ? C.amberBg : "#FEF2F2", borderRadius:8, marginBottom:14 }}>
                    <div style={{ fontSize:13, fontWeight:700, color: importResult.confidence === "high" ? C.green : importResult.confidence === "medium" ? C.amber : C.red, marginBottom:2 }}>
                      {importResult.confidence === "high" ? "✓ Extracción exitosa" : importResult.confidence === "medium" ? "⚠ Revisa los resultados" : "⚠ Confianza baja — verifica manualmente"}
                    </div>
                    {importResult.notes && <div style={{ fontSize:11, color:C.text2 }}>{importResult.notes}</div>}
                  </div>

                  {importResult.clientName && (
                    <div style={{ fontSize:12, marginBottom:8 }}>
                      <span style={{ color:C.text3 }}>Cliente:</span> <strong>{importResult.clientName}</strong>
                      {importResult.quoteNumber && <span style={{ color:C.text3 }}> · Cot. #{importResult.quoteNumber}</span>}
                      {importResult.isRenewal && <span style={{ marginLeft:6, fontSize:10, background:C.blueBg, color:C.blue, padding:"1px 6px", borderRadius:3, fontWeight:700 }}>RENOVACIÓN</span>}
                    </div>
                  )}

                  {(importResult.startDate || importResult.endDate) && (
                    <div style={{ fontSize:12, color:C.text2, marginBottom:12 }}>
                      Vigencia: <span style={{ ...mono }}>{importResult.startDate || "—"} → {importResult.endDate || "—"}</span>
                    </div>
                  )}

                  <div style={{ fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>
                    {importResult.lines.length} líneas detectadas
                  </div>
                  <div style={{ border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden", marginBottom:14, maxHeight:260, overflowY:"auto" }}>
                    {importResult.lines.map((l, i) => (
                      <div key={i} style={{ padding:"10px 12px", borderBottom: i < importResult.lines.length - 1 ? `1px solid ${C.border}` : "none", display:"flex", justifyContent:"space-between", alignItems:"center", gap:8, background: l.prodId ? C.surface : C.panel }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:12, fontWeight:500, color: l.prodId ? C.text : C.text3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                            {l.productName}
                          </div>
                          <div style={{ fontSize:10, color:C.text3, marginTop:1, ...mono }}>
                            {l.sku && <span>{l.sku} · </span>}
                            {l.prodId ? (
                              <span style={{ color:C.green }}>✓ reconocido</span>
                            ) : (
                              <span style={{ color:C.red }}>✗ no mapeado — se omitirá</span>
                            )}
                          </div>
                        </div>
                        <div style={{ ...mono, fontSize:13, fontWeight:700, color:C.blue, whiteSpace:"nowrap" }}>
                          {l.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  {importResult.soportePlatinum?.present && (
                    <div style={{ fontSize:12, color:C.text2, marginBottom:12, padding:"8px 12px", background:C.panel, borderRadius:6 }}>
                      + Soporte Platinum: <strong style={{ ...mono }}>${importResult.soportePlatinum.price?.toLocaleString() || 0}</strong>
                    </div>
                  )}

                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => { setImportResult(null); }}
                      style={{ flex:1, padding:"11px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500, color:C.text2 }}>
                      Probar otro archivo
                    </button>
                    <button onClick={applyImportResult}
                      style={{ flex:2, padding:"11px", background:C.blue, color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:700 }}>
                      Aplicar a la calculadora →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}



// ════════════════════════════════════════════════════════════════════════
// CLIENT APP — Versión simplificada para clientes (sin precios)
// ════════════════════════════════════════════════════════════════════════

const NEXTCOM_LOGO = "data:image/png;base64,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";

const DESC = {
  "AK": "Pool de créditos prepagados que se consumen según los productos activados",
  "A": "Identifica y prioriza riesgos de seguridad en dispositivos y red",
  "B": "Análisis avanzado de exposición al riesgo en dispositivos",
  "C": "Análisis avanzado de exposición al riesgo en infraestructura de red",
  "D": "Análisis de riesgo en cuentas cloud con menos de 500 recursos",
  "E": "Análisis de riesgo en cuentas cloud con 501-1000 recursos",
  "F": "Análisis de riesgo en cuentas cloud con 1001-1500 recursos",
  "G": "Análisis de riesgo en cuentas cloud con 1501-2000 recursos",
  "H": "Análisis de riesgo en cuentas cloud con 2001-2500 recursos",
  "I": "Análisis de riesgo en cuentas cloud con 2501-3000 recursos",
  "J": "Análisis de riesgo en cuentas cloud con 3001-3500 recursos",
  "K": "Análisis de riesgo en cuentas cloud con 3501+ recursos",
  "L": "Ingesta de logs en SIEM para análisis avanzado",
  "M": "Ingesta de logs en SIEM para archivado",
  "N": "Retención de datos analíticos en SIEM",
  "O": "Retención de datos archivados en SIEM",
  "P": "Almacenamiento de paquetes forenses para investigaciones",
  "Q": "Exportación de datos a sistemas externos",
  "R": "Detección y respuesta avanzada en endpoints (EDR)",
  "S": "Detección y respuesta avanzada en correo electrónico",
  "T": "Detección y respuesta en redes con Deep Discovery Inspector",
  "U": "Detección y respuesta en redes basada en bandwidth",
  "V": "Detección y respuesta en infraestructura cloud",
  "X": "Análisis manual de archivos sospechosos en sandbox",
  "Y": "Análisis automático de URLs sospechosas vía ZTSA Internet",
  "Z": "Análisis automático de tráfico de red en sandbox",
  "a": "Análisis automático de archivos desde endpoints en sandbox",
  "b": "Inteligencia de amenazas para tu organización",
  "c": "Inteligencia de amenazas para proveedores de servicios (MSSP)",
  "d": "Protección de nodos Kubernetes y contenedores ECS",
  "e": "Protección de pods y tasks serverless",
  "f": "Detección personalizada en contenedores",
  "g": "Escaneo de archivos vía Virtual Appliance",
  "i": "Scanner dedicado de Virtual Appliance (5TB)",
  "j": "Escaneo de archivos containerizado",
  "l": "Scanner containerizado dedicado (5TB)",
  "m": "Integración SDK para escaneo de archivos en aplicaciones propias",
  "o": "Escaneo de archivos en almacenamiento cloud",
  "q": "Bucket reservado para File Security Storage",
  "r": "Protección antivirus y EDR para equipos y servidores",
  "s": "Endpoint Security con XDR incluido",
  "t": "Endpoint Security empresarial con XDR + funciones avanzadas",
  "u": "Escaneo de servidores SAP con NetWeaver",
  "v": "Protección antivirus para dispositivos móviles (iOS/Android)",
  "x": "Filtro antispam, antiphishing y protección de correo (Microsoft 365 / Google)",
  "y": "Email Security con XDR incluido",
  "z": "Email Security empresarial con XDR + DLP + funciones avanzadas",
  "AA": "Acceso seguro Zero Trust para internet y aplicaciones internas",
  "AB": "Acceso seguro Zero Trust para navegación web",
  "AC": "Acceso seguro Zero Trust para aplicaciones internas (reemplaza VPN)",
  "AD": "Acceso seguro Zero Trust para servicios de IA generativa (ChatGPT, etc.)",
  "AE": "Acceso seguro Zero Trust para internet + servicios de IA",
  "AF": "IPs estáticas dedicadas para tráfico saliente de ZTSA",
  "AG": "Prevención de pérdida de datos (DLP) en endpoints",
  "AH": "Seguridad para aplicaciones de IA en infraestructura privada",
  "AI": "Seguridad para aplicaciones de IA en SaaS",
  "AJ": "Paquete completo de seguridad para IA empresarial",
};


function LineCard({ line, onUpdate, onDelete, idx, isMobile }) {
  const [picking, setPicking] = useState(false);
  const triggerRef = useRef(null);
  const prod = line.prodId ? CATALOG.find(p => p.id === line.prodId) : null;
  const desc = prod ? DESC[prod.id] : null;

  const months = monthsBetween(line.startDate, line.date);
  const proratedTotal = prod ? Math.round(line.qty * prod.credits * (months / 12)) : 0;
  const isProrated = prod && line.qty > 0 && Math.abs(months - 12) > 0.1;
  const active = line.qty > 0 && prod;

  const qtyLabel = prod ? (
    prod.unit.includes("usuario") ? "¿Cuántos usuarios?" :
    prod.unit.includes("endpoint") ? "¿Cuántos endpoints?" :
    prod.unit.includes("dispositivo móvil") ? "¿Cuántos móviles?" :
    prod.unit.includes("dispositivo") ? "¿Cuántos dispositivos?" :
    prod.unit.includes("cuenta cloud") ? "¿Cuántas cuentas cloud?" :
    prod.unit.includes("crédito") ? "¿Cuántos créditos?" :
    prod.unit.includes("nodo") ? "¿Cuántos nodos?" :
    prod.unit.includes("pod") ? "¿Cuántos pods?" :
    prod.unit.includes("scanner") ? "¿Cuántos scanners?" :
    prod.unit.includes("bucket") ? "¿Cuántos buckets?" :
    prod.unit.includes("tenant") ? "¿Cuántos tenants?" :
    prod.unit.includes("submission") ? "¿Cuántas submissions?" :
    prod.unit.includes("servidor") ? "¿Cuántos servidores?" :
    prod.unit.includes("instancia") ? "¿Cuántas instancias?" :
    prod.unit.includes("empleado") ? "¿Cuántos empleados?" :
    prod.unit.includes("GB") ? "¿Cuántos GB?" :
    prod.unit.includes("TB") ? "¿Cuántos TB?" :
    prod.unit.includes("Mbps") ? "¿Cuántos bloques?" :
    "Cantidad"
  ) : "Cantidad";

  return (
    <div style={{
      background: active ? "#FAFCFF" : C.surface,
      border: `1px solid ${active ? "#C7D9EF" : C.border}`,
      borderRadius: 12,
      padding: isMobile ? 14 : 18,
      marginBottom: 10,
      boxShadow: active ? "0 2px 6px rgba(30,64,175,.08)" : "0 1px 2px rgba(0,0,0,.02)"
    }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom: prod ? 14 : 0 }}>
        <div ref={triggerRef} style={{ position:"relative", flex:1 }}>
          <button onClick={() => setPicking(!picking)}
            style={{ width:"100%", textAlign:"left", background:"none", border:`1px solid ${prod ? "transparent" : C.border}`, borderRadius:8, padding:"8px 12px", cursor:"pointer", minHeight:44 }}>
            {prod ? (
              <div>
                <div style={{ fontSize:isMobile?15:16, fontWeight:600, color:C.text, lineHeight:1.3 }}>
                  {CAT_ICONS[prod.cat] || "•"}  {prod.name}
                </div>
                {desc && <div style={{ fontSize:12, color:C.text2, marginTop:4, lineHeight:1.4 }}>{desc}</div>}
              </div>
            ) : (
              <div style={{ color:C.text3, fontSize:14, display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:16 }}>⊕</span> Selecciona un producto...
              </div>
            )}
          </button>
          {picking && <ProductPicker triggerRef={triggerRef} isMobile={isMobile} onPick={p => onUpdate({ ...line, prodId:p.id })} onClose={() => setPicking(false)} />}
        </div>
        <button onClick={() => onDelete(line.rowId)} title="Eliminar"
          style={{ width:32, height:32, borderRadius:7, border:`1px solid ${C.border}`, background:C.surface, cursor:"pointer", fontSize:13, color:C.red, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>✕</button>
      </div>

      {prod && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr", gap:10, marginBottom: active ? 14 : 0 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:C.text3, marginBottom:5, textTransform:"uppercase", letterSpacing:".05em" }}>{qtyLabel}</div>
              <input type="number" inputMode="numeric" min={0} step={1} value={line.qty||""} placeholder="0"
                onChange={e => onUpdate({...line, qty:parseInt(e.target.value)||0})}
                style={{ ...mono, fontSize:18, fontWeight:600, textAlign:"center", padding:"12px", border:`1.5px solid ${active?C.blue:C.border}`, borderRadius:8, background:active?"#fff":C.surface, color:C.text, outline:"none", width:"100%", boxSizing:"border-box" }} />
              <div style={{ fontSize:10, color:C.text3, marginTop:4, textAlign:"center" }}>{prod.unit}</div>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:C.text3, marginBottom:5, textTransform:"uppercase", letterSpacing:".05em" }}>Inicio</div>
              <input type="date" value={line.startDate || ""} onChange={e=>onUpdate({...line, startDate:e.target.value})}
                style={{ ...mono, fontSize:13, color:C.text2, border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 10px", background:C.surface, width:"100%", boxSizing:"border-box" }} />
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:C.text3, marginBottom:5, textTransform:"uppercase", letterSpacing:".05em" }}>Vencimiento</div>
              <input type="date" value={line.date} onChange={e=>onUpdate({...line, date:e.target.value})}
                style={{ ...mono, fontSize:13, color:C.text2, border:`1px solid ${isProrated?C.amber:C.border}`, borderRadius:8, padding:"12px 10px", background:C.surface, width:"100%", boxSizing:"border-box" }} />
            </div>
          </div>

          {isProrated && active && (
            <div style={{ padding:"8px 12px", background:C.amberBg, border:`1px solid #FDE68A`, borderRadius:7, fontSize:11, color:C.amber, marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
              <span>⚠</span> Vigencia de {months} meses (prorrateado)
            </div>
          )}

          {active && (
            <div style={{ padding:"14px 16px", backgroundColor:C.blue, background:`linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`, borderRadius:9, display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 2px 8px rgba(30,64,175,.2)" }}>
              <div>
                <div style={{ fontSize:12, color:"#FFFFFF", fontWeight:600 }}>Esta línea consume</div>
                <div style={{ fontSize:10, color:"#DBEAFE", marginTop:2, fontWeight:500 }}>{fmt(prod.credits)} cr × {line.qty} × {(months/12).toFixed(2)} año(s)</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ ...mono, fontSize:24, fontWeight:800, color:"#FFFFFF", lineHeight:1 }}>{fmt(proratedTotal)}</div>
                <div style={{ fontSize:10, color:"#DBEAFE", fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", marginTop:3 }}>créditos</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function downloadEstimate(data) {
  const { lines, totalCredits, clientName, contactName, contactEmail, contactPhone } = data;
  const today = new Date().toLocaleDateString("es-PA", { year:"numeric", month:"long", day:"numeric" });
  const active = lines.filter(l => l.prodId && l.qty > 0).map(l => {
    const p = CATALOG.find(c => c.id===l.prodId);
    const months = monthsBetween(l.startDate, l.date);
    const prorated = Math.round(l.qty * p.credits * (months / 12));
    return { ...l, prod:p, months, prorated, isProrated: Math.abs(months - 12) > 0.1 };
  });

  const rowsHTML = active.map((l, i) => `
    <tr>
      <td style="padding:10px 12px;font-size:11px;color:#A8A29E;font-family:'SF Mono',monospace;border-bottom:1px solid #E7E5E4;vertical-align:top">${String(i+1).padStart(2,"0")}</td>
      <td style="padding:10px 12px;font-size:12px;border-bottom:1px solid #E7E5E4;vertical-align:top">
        <strong>${l.prod.name}</strong>
        ${DESC[l.prod.id] ? `<br><span style="font-size:10px;color:#57534E">${DESC[l.prod.id]}</span>` : ""}
        ${l.isProrated ? `<br><span style="font-size:9px;color:#B45309;background:#FFFBEB;padding:1px 5px;border-radius:3px;font-family:'SF Mono',monospace;display:inline-block;margin-top:3px">⚠ ${l.months}m vigencia</span>` : ""}
      </td>
      <td style="padding:10px 12px;font-size:11px;color:#57534E;border-bottom:1px solid #E7E5E4;font-family:'SF Mono',monospace;line-height:1.4;vertical-align:top">
        ${l.startDate || "—"}<br><span style="color:#A8A29E">→ ${l.date || "—"}</span>
      </td>
      <td style="padding:10px 12px;font-family:'SF Mono',monospace;text-align:right;border-bottom:1px solid #E7E5E4;vertical-align:top">${l.qty.toLocaleString()}<br><span style="font-size:9px;color:#A8A29E;font-weight:400">${l.prod.unit}</span></td>
      <td style="padding:10px 12px;font-family:'SF Mono',monospace;font-weight:700;text-align:right;color:#1E40AF;border-bottom:1px solid #E7E5E4;vertical-align:top;font-size:14px">${fmt(l.prorated)}</td>
    </tr>`).join("");

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Estimado Vision One${clientName ? " — " + clientName : ""}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,-apple-system,sans-serif;color:#0C0A09;background:#fff;font-size:13px;padding:24px 28px}
  .container{max-width:780px;margin:0 auto}
  @page{margin:14mm 12mm;size:A4}
  @media print{body{padding:0;print-color-adjust:exact;-webkit-print-color-adjust:exact}.container{max-width:none}}
  @media screen{.print-toolbar{display:flex;position:sticky;top:0;background:#0C0A09;color:#fff;padding:12px 20px;margin:-24px -28px 24px;align-items:center;justify-content:space-between;z-index:100}.print-toolbar button{background:#fff;color:#0C0A09;border:none;padding:8px 18px;border-radius:6px;font-weight:600;cursor:pointer;font-size:13px}}
  @media print{.print-toolbar{display:none}}
</style></head>
<body>
<div class="print-toolbar">
  <div style="font-size:13px">📄 Usa <strong>Cmd+P</strong> (Mac) o <strong>Ctrl+P</strong> (Windows) para guardar como PDF</div>
  <button onclick="window.print()">🖨 Imprimir / Guardar PDF</button>
</div>
<div class="container">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #0C0A09">
    <div style="display:flex;align-items:center;gap:14px">
      <img src="${NEXTCOM_LOGO}" alt="Nextcom" style="height:38px;width:auto" />
      <div style="border-left:1px solid #E7E5E4;padding-left:14px">
        <div style="font-size:11px;color:#A8A29E;font-weight:500">Estimado de Créditos</div>
        <div style="font-size:14px;color:#0C0A09;font-weight:700;letter-spacing:-.01em">Trend Vision One${clientName ? ` · ${clientName}` : ""}</div>
      </div>
    </div>
    <div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:6px">
      <img src="${TRENDAI_LOGO}" alt="TrendAI" style="height:26px;width:auto" />
      <div style="font-size:11px;color:#A8A29E">${today}</div>
      <div style="display:inline-block;background:#EFF6FF;color:#1E40AF;font-size:9px;font-weight:700;padding:3px 9px;border-radius:4px;letter-spacing:.04em">ESTIMADO PRELIMINAR</div>
    </div>
  </div>

  <div style="background:linear-gradient(135deg,#1E40AF 0%,#1E3A8A 100%);border-radius:12px;padding:24px;margin-bottom:24px;color:#fff;text-align:center">
    <div style="font-size:12px;color:#BFDBFE;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Total de créditos estimados</div>
    <div style="font-family:'SF Mono',monospace;font-size:48px;font-weight:800;line-height:1;letter-spacing:-.02em">${fmt(totalCredits)}</div>
    <div style="font-size:13px;color:#BFDBFE;margin-top:6px">para ${active.length} producto${active.length !== 1 ? "s" : ""} de Vision One</div>
  </div>

  <div style="font-size:11px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Detalle de productos solicitados</div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #E7E5E4;margin-bottom:24px">
    <thead><tr style="background:#F5F5F4">
      ${["#","Producto","Vigencia","Cantidad","Créditos"].map((h,i)=>`<th style="padding:9px 12px;text-align:${i>=3?"right":"left"};font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">${h}</th>`).join("")}
    </tr></thead>
    <tbody>${rowsHTML}</tbody>
    <tfoot><tr style="background:#EFF6FF;border-top:2px solid #1E40AF">
      <td colspan="4" style="padding:12px;font-size:13px;font-weight:700;color:#1E40AF">TOTAL CRÉDITOS VISION ONE</td>
      <td style="padding:12px;font-size:18px;font-weight:800;font-family:'SF Mono',monospace;text-align:right;color:#1E40AF">${fmt(totalCredits)}</td>
    </tr></tfoot>
  </table>

  <div style="background:#FAFAF9;border-left:4px solid #1E40AF;padding:14px 18px;border-radius:0 8px 8px 0;margin-bottom:18px">
    <div style="font-size:12px;font-weight:700;color:#0C0A09;margin-bottom:6px">📋 Importante</div>
    <div style="font-size:11px;color:#57534E;line-height:1.6">
      Este estimado refleja únicamente la cantidad de créditos Vision One requeridos según los productos seleccionados. <strong>El precio final del licenciamiento será proporcionado por Nextcom Systems</strong> en una cotización formal, considerando volumen, soporte adicional y términos comerciales.
    </div>
  </div>

  ${contactName || contactEmail || contactPhone ? `
  <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:14px 18px;margin-bottom:20px">
    <div style="font-size:12px;font-weight:700;color:#B45309;margin-bottom:6px">📞 Datos de contacto</div>
    <div style="font-size:12px;color:#57534E;line-height:1.6">
      ${contactName ? `<div><strong>Nombre:</strong> ${contactName}</div>` : ""}
      ${contactEmail ? `<div><strong>Email:</strong> ${contactEmail}</div>` : ""}
      ${contactPhone ? `<div><strong>Teléfono:</strong> ${contactPhone}</div>` : ""}
    </div>
  </div>` : ""}

  <div style="margin-top:32px;padding-top:14px;border-top:1px solid #E7E5E4;text-align:center">
    <div style="font-size:11px;color:#0C0A09;font-weight:600;margin-bottom:3px">Nextcom Systems, Inc.</div>
    <div style="font-size:10px;color:#A8A29E;line-height:1.5">
      Trend Micro Platinum Partner · Panamá<br>
      +507 394-1405 · administracion@nextcomsystems.com · ISO 9001:2015 · ISO 27001:2022
    </div>
  </div>
</div>
<script>window.addEventListener("load",function(){setTimeout(function(){window.print();},400);});</script>
</body></html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Estimado_VisionOne_${(clientName || "cliente").replace(/\s+/g,"_")}_${new Date().toISOString().split("T")[0]}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

function ClientApp() {
  const isMobile = useIsMobile();
  const [lines, setLines] = useState(() => {
    const d = defaultDates();
    return [{ rowId: 1, prodId: null, qty: 0, date: d.date, startDate: d.startDate }];
  });
  const [rc, setRc] = useState(2);
  const [clientName, setClientName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // --- Consumo actual (Mi Drawdown) ---
  const [usageOpen, setUsageOpen] = useState(false);     // panel expandido?
  const [usageItems, setUsageItems] = useState([]);      // [{name, monthly, prodId, confidence}]
  const [usageMonth, setUsageMonth] = useState("");      // "April 2026"
  const [usageLoading, setUsageLoading] = useState(false);
  const [usageError, setUsageError] = useState("");
  const usageFileRef = useRef(null);

  const onUsageFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setUsageError("Solo imágenes (PNG, JPG). Toma un screenshot del reporte.");
      return;
    }
    setUsageLoading(true);
    setUsageError("");
    try {
      // Read file as base64
      const reader = new FileReader();
      const b64 = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = () => reject(new Error("Error leyendo archivo"));
        reader.readAsDataURL(file);
      });
      const resp = await fetch("/api/parse-usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileData: b64, fileType: file.type }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setUsageError(data.error || "Error procesando imagen");
        setUsageLoading(false);
        return;
      }
      if (!data.products || data.products.length === 0) {
        setUsageError("No detecté productos Vision One en la imagen. Revisa que sea un reporte de consumo.");
        setUsageLoading(false);
        return;
      }
      // Map detected items to internal structure
      const items = data.products.map((p, idx) => ({
        rowId: `u${idx}`,
        nameInScreenshot: p.name_in_screenshot || "",
        monthly: Number(p.monthly_credits) || 0,
        prodId: p.matched_id || null,
        confidence: p.match_confidence || "low",
      }));
      setUsageItems(items);
      setUsageMonth(data.month_label || "");
      setUsageOpen(true);
    } catch (e) {
      setUsageError("Error de red: " + e.message);
    }
    setUsageLoading(false);
  };

  const updateUsageItem = (rowId, field, value) => {
    setUsageItems(prev => prev.map(it => it.rowId === rowId ? { ...it, [field]: value } : it));
  };
  const deleteUsageItem = (rowId) => {
    setUsageItems(prev => prev.filter(it => it.rowId !== rowId));
  };
  const clearUsage = () => {
    if (confirm("¿Borrar el análisis de consumo?")) {
      setUsageItems([]);
      setUsageMonth("");
      setUsageError("");
      setUsageOpen(false);
    }
  };

  // Compute usage totals
  let usageMonthlyTotal = 0;
  let usageAnnualTotal = 0;
  usageItems.forEach(it => {
    usageMonthlyTotal += Number(it.monthly) || 0;
    usageAnnualTotal += (Number(it.monthly) || 0) * 12;
  });

  let totalCredits = 0;
  lines.forEach(l => {
    if (l.prodId && l.qty > 0) {
      const p = CATALOG.find(c => c.id === l.prodId);
      if (p) {
        const months = monthsBetween(l.startDate, l.date);
        totalCredits += l.qty * p.credits * (months / 12);
      }
    }
  });
  totalCredits = Math.round(totalCredits);
  const activeLines = lines.filter(l => l.prodId && l.qty > 0).length;

  const addLine = () => {
    const d = defaultDates();
    setLines(p => [...p, { rowId:rc, prodId:null, qty:0, date:d.date, startDate:d.startDate }]);
    setRc(c => c+1);
  };
  const updateLine = (row) => setLines(p => p.map(l => l.rowId===row.rowId ? row : l));
  const deleteLine = (id) => setLines(p => {
    if (p.length > 1) return p.filter(l => l.rowId!==id);
    const d = defaultDates();
    return [{ rowId:rc, prodId:null, qty:0, date:d.date, startDate:d.startDate }];
  });

  const sendWhatsApp = () => {
    const summary = lines.filter(l => l.prodId && l.qty > 0).map(l => {
      const p = CATALOG.find(c => c.id === l.prodId);
      return `• ${p.name}: ${l.qty} ${p.unit}`;
    }).join("\n");
    const msg = `Hola Nextcom, vengo desde el estimador de créditos.${clientName ? `\n\nEmpresa: ${clientName}` : ""}${contactName ? `\nNombre: ${contactName}` : ""}\n\nNecesito una cotización para:\n${summary}\n\nTotal estimado: ${fmt(totalCredits)} créditos Vision One.`;
    window.open(`https://wa.me/50763941405?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(180deg, #FAFAF9 0%, #F0F4FF 100%)`,
      fontFamily:"system-ui,-apple-system,sans-serif",
      color:C.text,
      paddingBottom: isMobile ? "calc(120px + env(safe-area-inset-bottom, 0px))" : 40
    }}>
      <header style={{
        background:C.surface, borderBottom:`1px solid ${C.border}`,
        position:"sticky", top:0, zIndex:50,
        boxShadow:"0 1px 3px rgba(0,0,0,.04)"
      }}>
        {/* Top row: brand identity */}
        <div style={{
          maxWidth:980, margin:"0 auto",
          padding: isMobile ? "14px 16px" : "18px 32px",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:12
        }}>
          <img src={NEXTCOM_LOGO} alt="Nextcom Systems" style={{ height:isMobile?32:40, width:"auto" }} />

          <div style={{ display:"flex", alignItems:"center", gap:isMobile?8:12 }}>
            <div style={{
              fontSize: isMobile?9:10, color:C.text3,
              textTransform:"uppercase", letterSpacing:".08em", fontWeight:600,
              textAlign:"right", lineHeight:1.4
            }}>
              {!isMobile && <>Trend Micro<br/></>}Platinum Partner
            </div>
            <div style={{ height: isMobile?24:30, width:1, background:C.border }} />
            <img src={TRENDAI_LOGO} alt="TrendAI" style={{ height:isMobile?22:28, width:"auto" }} />
          </div>
        </div>

        {/* Bottom row: tool title — subtle accent stripe */}
        <div style={{
          background: `linear-gradient(90deg, ${C.blue} 0%, ${C.blueDark} 100%)`,
          color:"#fff",
          padding: isMobile ? "9px 16px" : "10px 32px"
        }}>
          <div style={{ maxWidth:980, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:isMobile?14:15 }}>🪙</span>
              <span style={{ fontSize:isMobile?12:13, fontWeight:600, letterSpacing:".01em" }}>
                Estimador de Créditos · Trend Vision One
              </span>
            </div>
            {!isMobile && (
              <span style={{ fontSize:10, color:"#BFDBFE", fontWeight:500 }}>
                Edición Enero 2026
              </span>
            )}
          </div>
        </div>
      </header>

      <main style={{ maxWidth:980, margin:"0 auto", padding: isMobile ? "16px 14px" : "32px" }}>
        <div style={{ marginBottom: isMobile ? 20 : 32 }}>
          <div style={{ fontSize: isMobile ? 22 : 32, fontWeight:800, letterSpacing:"-.025em", lineHeight:1.15, marginBottom:8 }}>
            {isMobile ? "Estima los créditos Vision One que necesitas" : <>Estima cuántos créditos<br/>Vision One necesita tu empresa</>}
          </div>
          <div style={{ fontSize: isMobile ? 13 : 16, color:C.text2, lineHeight:1.5 }}>
            Selecciona los productos de Trend Micro Vision One que quieres activar e indica las cantidades. La calculadora te dirá cuántos créditos requieres.
          </div>
        </div>

        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding: isMobile ? 14 : 18, marginBottom:18 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".06em", marginBottom:10 }}>Información de contacto (opcional)</div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr 1fr", gap:10 }}>
            <input type="text" placeholder="Empresa" value={clientName} onChange={e=>setClientName(e.target.value)}
              style={{ fontSize:14, padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:7, background:C.surface, outline:"none", boxSizing:"border-box" }} />
            <input type="text" placeholder="Tu nombre" value={contactName} onChange={e=>setContactName(e.target.value)}
              style={{ fontSize:14, padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:7, background:C.surface, outline:"none", boxSizing:"border-box" }} />
            <input type="email" placeholder="Email" value={contactEmail} onChange={e=>setContactEmail(e.target.value)}
              style={{ fontSize:14, padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:7, background:C.surface, outline:"none", boxSizing:"border-box" }} />
            <input type="tel" placeholder="Teléfono" value={contactPhone} onChange={e=>setContactPhone(e.target.value)}
              style={{ fontSize:14, padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:7, background:C.surface, outline:"none", boxSizing:"border-box" }} />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
             PANEL: ¿Ya eres cliente Trend Micro? Sube tu consumo actual
        ═══════════════════════════════════════════════════════════════ */}
        <div style={{
          background: usageItems.length > 0 ? C.blueBg : C.surface,
          border: `1.5px ${usageItems.length > 0 ? "solid" : "dashed"} ${usageItems.length > 0 ? C.blue : C.border}`,
          borderRadius:12, padding: isMobile ? 16 : 20, marginBottom:18, transition:"all .2s"
        }}>
          {/* Header */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom: usageItems.length > 0 ? 14 : 0 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize: isMobile ? 14 : 16, fontWeight:700, color:C.text, marginBottom:4, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:20 }}>📊</span>
                ¿Ya eres cliente Trend Micro Vision One?
              </div>
              <div style={{ fontSize: isMobile ? 12 : 13, color:C.text2, lineHeight:1.5 }}>
                Sube un screenshot de tu reporte de consumo mensual y te calculamos automáticamente tu drawdown anual + cuántas licencias estás usando.
              </div>
            </div>
            {usageItems.length > 0 && (
              <button onClick={clearUsage}
                style={{ padding:"6px 10px", background:"transparent", border:`1px solid ${C.border}`, borderRadius:6, fontSize:11, color:C.text3, cursor:"pointer", fontWeight:600, whiteSpace:"nowrap" }}>
                ✕ Limpiar
              </button>
            )}
          </div>

          {/* Upload area (only show if no items yet) */}
          {usageItems.length === 0 && (
            <div style={{ marginTop:14 }}>
              <input type="file" ref={usageFileRef} accept="image/*" style={{ display:"none" }}
                onChange={e => onUsageFile(e.target.files[0])} />
              <button onClick={() => usageFileRef.current?.click()} disabled={usageLoading}
                style={{
                  width:"100%", padding:"12px 16px",
                  background: usageLoading ? C.text3 : C.blue,
                  color:"#fff", border:"none", borderRadius:9,
                  fontSize:14, fontWeight:700, cursor: usageLoading ? "wait" : "pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:8
                }}>
                {usageLoading ? (
                  <>⏳ Analizando con IA...</>
                ) : (
                  <>📎 Subir imagen del reporte de consumo</>
                )}
              </button>
              {usageError && (
                <div style={{ marginTop:10, padding:"10px 12px", background:"#FEE2E2", border:"1px solid #FCA5A5", borderRadius:7, fontSize:12, color:"#991B1B" }}>
                  ⚠ {usageError}
                </div>
              )}
              <div style={{ marginTop:10, fontSize:11, color:C.text3, lineHeight:1.5 }}>
                💡 Funciona con screenshots del reporte oficial de Vision One. La imagen se procesa con IA para detectar productos y créditos consumidos.
              </div>
            </div>
          )}

          {/* Detected usage table */}
          {usageItems.length > 0 && (
            <>
              <div style={{ fontSize:12, color:C.text2, marginBottom:10, display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                <span>✅ Detectamos <strong style={{ color:C.text }}>{usageItems.length} productos</strong></span>
                {usageMonth && <><span>·</span><span>Mes: <strong style={{ color:C.text }}>{usageMonth}</strong></span></>}
                <span>·</span>
                <span style={{ color:C.text3, fontSize:11 }}>Edita las cantidades si necesitas</span>
              </div>

              {/* Items table - desktop */}
              {!isMobile && (
                <div style={{ background:C.surface, borderRadius:8, overflow:"hidden", border:`1px solid ${C.border}` }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                    <thead>
                      <tr style={{ background:C.panel, borderBottom:`1px solid ${C.border}` }}>
                        <th style={{ padding:"10px 12px", textAlign:"left", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em" }}>Producto</th>
                        <th style={{ padding:"10px 12px", textAlign:"right", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", width:120 }}>Mensual</th>
                        <th style={{ padding:"10px 12px", textAlign:"right", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", width:120 }}>Anual (×12)</th>
                        <th style={{ padding:"10px 12px", textAlign:"right", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", width:140 }}>≈ Licencias</th>
                        <th style={{ width:40 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {usageItems.map(it => {
                        const prod = it.prodId ? CATALOG.find(c => c.id === it.prodId) : null;
                        const annual = (Number(it.monthly) || 0) * 12;
                        const licenses = prod && prod.credits > 0 ? Math.round(annual / prod.credits) : null;
                        const unit = prod ? prod.unit : "";
                        return (
                          <tr key={it.rowId} style={{ borderBottom:`1px solid ${C.border}` }}>
                            <td style={{ padding:"10px 12px" }}>
                              <div style={{ fontSize:13, fontWeight:600, color:C.text }}>
                                {prod ? prod.name : it.nameInScreenshot}
                              </div>
                              {!prod && (
                                <div style={{ fontSize:11, color:"#B45309", marginTop:2 }}>⚠ No matcheado con catálogo</div>
                              )}
                              {prod && it.confidence === "low" && (
                                <div style={{ fontSize:10, color:C.text3, marginTop:2 }}>Detectado: "{it.nameInScreenshot}"</div>
                              )}
                            </td>
                            <td style={{ padding:"6px 12px", textAlign:"right" }}>
                              <input type="number" min="0" value={it.monthly}
                                onChange={e => updateUsageItem(it.rowId, "monthly", Math.max(0, Number(e.target.value) || 0))}
                                style={{ ...mono, width:100, textAlign:"right", padding:"7px 9px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, background:C.surface, outline:"none", boxSizing:"border-box" }} />
                            </td>
                            <td style={{ padding:"10px 12px", textAlign:"right", ...mono, fontSize:13, color:C.text, fontWeight:700 }}>
                              {fmt(annual)}
                            </td>
                            <td style={{ padding:"10px 12px", textAlign:"right" }}>
                              {licenses !== null ? (
                                <div>
                                  <div style={{ ...mono, fontSize:14, fontWeight:800, color:C.blue }}>≈ {fmt(licenses)}</div>
                                  <div style={{ fontSize:10, color:C.text3 }}>{unit}{licenses !== 1 ? "s" : ""}</div>
                                </div>
                              ) : (
                                <div style={{ fontSize:11, color:C.text3 }}>—</div>
                              )}
                            </td>
                            <td style={{ padding:"10px 8px", textAlign:"center" }}>
                              <button onClick={() => deleteUsageItem(it.rowId)} title="Eliminar"
                                style={{ width:24, height:24, border:"none", background:"transparent", cursor:"pointer", color:C.text3, fontSize:14 }}>✕</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr style={{ background:C.panel }}>
                        <td style={{ padding:"12px", fontSize:12, fontWeight:700, color:C.text, textTransform:"uppercase", letterSpacing:".05em" }}>Totales</td>
                        <td style={{ padding:"12px", textAlign:"right", ...mono, fontSize:14, fontWeight:800, color:C.text }}>{fmt(usageMonthlyTotal)}</td>
                        <td style={{ padding:"12px", textAlign:"right", ...mono, fontSize:16, fontWeight:800, color:C.blue }}>{fmt(usageAnnualTotal)}</td>
                        <td colSpan={2} style={{ padding:"12px", fontSize:11, color:C.text3 }}>cr/año estimados</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}

              {/* Items - mobile cards */}
              {isMobile && (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {usageItems.map(it => {
                    const prod = it.prodId ? CATALOG.find(c => c.id === it.prodId) : null;
                    const annual = (Number(it.monthly) || 0) * 12;
                    const licenses = prod && prod.credits > 0 ? Math.round(annual / prod.credits) : null;
                    const unit = prod ? prod.unit : "";
                    return (
                      <div key={it.rowId} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:12 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:8 }}>
                          <div style={{ flex:1, fontSize:13, fontWeight:700, color:C.text, lineHeight:1.3 }}>
                            {prod ? prod.name : it.nameInScreenshot}
                          </div>
                          <button onClick={() => deleteUsageItem(it.rowId)}
                            style={{ width:24, height:24, border:"none", background:"transparent", cursor:"pointer", color:C.text3, fontSize:14 }}>✕</button>
                        </div>
                        {!prod && (
                          <div style={{ fontSize:11, color:"#B45309", marginBottom:8 }}>⚠ No matcheado con catálogo</div>
                        )}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                          <div>
                            <div style={{ fontSize:10, color:C.text3, fontWeight:600, marginBottom:3 }}>Mensual</div>
                            <input type="number" min="0" value={it.monthly}
                              onChange={e => updateUsageItem(it.rowId, "monthly", Math.max(0, Number(e.target.value) || 0))}
                              style={{ ...mono, width:"100%", textAlign:"right", padding:"8px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, background:C.surface, outline:"none", boxSizing:"border-box" }} />
                          </div>
                          <div>
                            <div style={{ fontSize:10, color:C.text3, fontWeight:600, marginBottom:3 }}>Anual (×12)</div>
                            <div style={{ ...mono, fontSize:14, fontWeight:700, color:C.text, padding:"8px 0" }}>{fmt(annual)}</div>
                          </div>
                        </div>
                        {licenses !== null && (
                          <div style={{ background:C.blueBg, borderRadius:6, padding:"8px 10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                            <span style={{ fontSize:11, color:C.text2, fontWeight:600 }}>Licencias estimadas:</span>
                            <span style={{ ...mono, fontSize:14, fontWeight:800, color:C.blue }}>≈ {fmt(licenses)} {unit}{licenses !== 1 ? "s" : ""}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div style={{ background:C.blue, color:"#fff", borderRadius:8, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:4 }}>
                    <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".05em", color:"#DBEAFE" }}>Total anual estimado</div>
                    <div style={{ ...mono, fontSize:18, fontWeight:800 }}>{fmt(usageAnnualTotal)} cr</div>
                  </div>
                </div>
              )}

              <div style={{ marginTop:12, padding:"10px 12px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:7, fontSize:11, color:C.text2, lineHeight:1.5 }}>
                💡 <strong>Importante:</strong> esta proyección asume que tu consumo mensual se mantiene constante durante 12 meses. Las licencias estimadas son aproximadas según los créditos del catálogo Vision One.
              </div>
            </>
          )}
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.text2, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
            <span>Productos seleccionados</span>
            <span style={{ ...mono, fontSize:11, color:C.text3, background:C.panel, padding:"2px 8px", borderRadius:4 }}>{activeLines}</span>
          </div>
          {lines.map((line, idx) => (
            <LineCard key={line.rowId} line={line} idx={idx} onUpdate={updateLine} onDelete={deleteLine} isMobile={isMobile} />
          ))}
          <button onClick={addLine} style={{
            width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            padding:"14px", background:"#fff", border:`2px dashed ${C.blue}`,
            borderRadius:10, cursor:"pointer", color:C.blue, fontSize:14, fontWeight:600
          }}>
            <span style={{ fontSize:18 }}>＋</span> Agregar otro producto
          </button>
        </div>

        {!isMobile && totalCredits > 0 && (
          <div style={{
            backgroundColor:C.blue,
            background:`linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`,
            color:"#FFFFFF", borderRadius:14, padding:24,
            display:"flex", alignItems:"center", justifyContent:"space-between", gap:16,
            boxShadow:"0 10px 30px rgba(30,64,175,.25)", marginBottom:18
          }}>
            <div>
              <div style={{ fontSize:12, color:"#DBEAFE", textTransform:"uppercase", letterSpacing:".08em", fontWeight:700, marginBottom:4 }}>Total estimado</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
                <span style={{ ...mono, fontSize:38, fontWeight:800, letterSpacing:"-.02em", color:"#FFFFFF" }}>{fmt(totalCredits)}</span>
                <span style={{ fontSize:14, color:"#DBEAFE", fontWeight:500 }}>créditos Vision One</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => downloadEstimate({ lines, totalCredits, clientName, contactName, contactEmail, contactPhone })}
                style={{ padding:"12px 18px", background:"#fff", color:C.blue, border:"none", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                ⬇ Descargar PDF
              </button>
              <button onClick={sendWhatsApp}
                style={{ padding:"12px 18px", background:"#25D366", color:"#fff", border:"none", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                💬 Solicitar cotización
              </button>
            </div>
          </div>
        )}

        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 18px", fontSize:12, color:C.text2, lineHeight:1.6 }}>
          <strong style={{ color:C.text }}>📋 ¿Qué son los créditos Vision One?</strong> Trend Micro vende su plataforma de seguridad mediante un modelo de créditos prepagados. Cada producto consume una cantidad de créditos según su uso. Esta calculadora te ayuda a estimar tu requerimiento. <strong style={{ color:C.text }}>Para conocer el precio final</strong>, contacta a Nextcom Systems.
        </div>
      </main>

      {isMobile && totalCredits > 0 && (
        <div style={{
          position:"fixed", bottom:0, left:0, right:0,
          backgroundColor:C.blue,
          background:`linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`, color:"#FFFFFF",
          padding:"14px 16px calc(14px + env(safe-area-inset-bottom, 0px))",
          boxShadow:"0 -4px 16px rgba(0,0,0,.15)", zIndex:90
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:10 }}>
            <div>
              <div style={{ fontSize:10, color:"#DBEAFE", textTransform:"uppercase", letterSpacing:".08em", fontWeight:700 }}>Total estimado</div>
              <div style={{ ...mono, fontSize:24, fontWeight:800, letterSpacing:"-.01em", color:"#FFFFFF" }}>{fmt(totalCredits)}</div>
            </div>
            <div style={{ fontSize:10, color:"#DBEAFE", textAlign:"right", fontWeight:600 }}>créditos<br/>Vision One</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => downloadEstimate({ lines, totalCredits, clientName, contactName, contactEmail, contactPhone })}
              style={{ flex:1, padding:"11px", background:"#fff", color:C.blue, border:"none", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>
              ⬇ PDF
            </button>
            <button onClick={sendWhatsApp}
              style={{ flex:2, padding:"11px", background:"#25D366", color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>
              💬 Solicitar cotización
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// WELCOME SCREEN + PIN GATE
// ════════════════════════════════════════════════════════════════════════

const NEXTCOM_PIN = "Nextcomvzlapty2026";
const PIN_STORAGE_KEY = "nextcom_pin_remembered";

function WelcomeScreen({ onChooseClient, onChooseInternal }) {
  const isMobile = useIsMobile();
  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 50%, #0F172A 100%)`,
      display:"flex", alignItems:"center", justifyContent:"center",
      padding: isMobile ? "20px 16px" : "40px",
      fontFamily:"system-ui,-apple-system,sans-serif"
    }}>
      <div style={{
        background:C.surface,
        borderRadius: 16,
        padding: isMobile ? "32px 24px" : "48px 56px",
        maxWidth: 520, width:"100%",
        boxShadow:"0 20px 60px rgba(0,0,0,.3)"
      }}>
        {/* Header with logos */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:isMobile?24:32, paddingBottom:20, borderBottom:`1px solid ${C.border}` }}>
          <img src={NEXTCOM_LOGO} alt="Nextcom" style={{ height:isMobile?32:38, width:"auto" }} />
          <div style={{ height:30, width:1, background:C.border }} />
          <img src={TRENDAI_LOGO} alt="TrendAI" style={{ height:isMobile?32:38, width:"auto" }} />
        </div>

        {/* Title */}
        <div style={{ textAlign:"center", marginBottom:isMobile?28:36 }}>
          <div style={{ fontSize: isMobile?22:26, fontWeight:800, letterSpacing:"-.02em", marginBottom:8, color:C.text }}>
            Calculadora Vision One
          </div>
          <div style={{ fontSize: isMobile?13:14, color:C.text2, lineHeight:1.5 }}>
            ¿Cómo deseas ingresar?
          </div>
        </div>

        {/* Two buttons */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {/* Cliente */}
          <button onClick={onChooseClient}
            style={{
              padding: isMobile ? "18px 20px" : "20px 24px",
              background:C.surface, color:C.text,
              border:`2px solid ${C.blue}`, borderRadius:12, cursor:"pointer",
              textAlign:"left", display:"flex", alignItems:"center", gap:14,
              boxShadow:"0 4px 14px rgba(30,64,175,.18)",
              transition:"transform .1s, box-shadow .1s"
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(30,64,175,.28)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 14px rgba(30,64,175,.18)"; e.currentTarget.style.transform = "scale(1)"; }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
            <span style={{ fontSize:32 }}>👤</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:isMobile?16:18, fontWeight:700, marginBottom:3, color:C.text }}>Cliente</div>
              <div style={{ fontSize:isMobile?12:13, color:C.text2, lineHeight:1.4 }}>
                Estimar mis créditos Vision One
              </div>
            </div>
            <span style={{ fontSize:18, color:C.blue, fontWeight:700 }}>→</span>
          </button>

          {/* Nextcom interno */}
          <button onClick={onChooseInternal}
            style={{
              padding: isMobile ? "18px 20px" : "20px 24px",
              background:C.surface, color:C.text,
              border:`1.5px solid ${C.border}`, borderRadius:12, cursor:"pointer",
              textAlign:"left", display:"flex", alignItems:"center", gap:14,
              transition:"transform .1s, border-color .1s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.text2}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "scale(1)"; }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
            <span style={{ fontSize:32 }}>🔐</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:isMobile?16:18, fontWeight:700, marginBottom:3, color:C.text }}>Equipo Nextcom</div>
              <div style={{ fontSize:isMobile?12:13, color:C.text2, lineHeight:1.4 }}>
                Acceso interno · requiere clave
              </div>
            </div>
            <span style={{ fontSize:18, color:C.text2, fontWeight:700 }}>→</span>
          </button>
        </div>

        {/* Footer */}
        <div style={{ marginTop:isMobile?28:36, paddingTop:20, borderTop:`1px solid ${C.border}`, textAlign:"center" }}>
          <div style={{ fontSize:10, color:C.text3, lineHeight:1.5 }}>
            Nextcom Systems, Inc. · Trend Micro Platinum Partner · Panamá<br/>
            ISO 9001:2015 · ISO 27001:2022
          </div>
        </div>
      </div>
    </div>
  );
}

function PinModal({ onSuccess, onCancel }) {
  const isMobile = useIsMobile();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [remember, setRemember] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  const submit = () => {
    if (pin.trim().toUpperCase() === NEXTCOM_PIN.toUpperCase()) {
      if (remember) {
        try { localStorage.setItem(PIN_STORAGE_KEY, "1"); } catch (e) {}
      }
      onSuccess();
    } else {
      setError(true);
      setPin("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:10000,
      background:"rgba(0,0,0,0.7)", backdropFilter:"blur(4px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding: isMobile ? 16 : 20
    }}>
      <div style={{
        background:C.surface, borderRadius:14,
        padding: isMobile ? "26px 22px" : "32px 36px",
        maxWidth:420, width:"100%",
        boxShadow:"0 20px 60px rgba(0,0,0,.4)"
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ fontSize:24 }}>🔐</div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:C.text }}>Acceso interno Nextcom</div>
              <div style={{ fontSize:11, color:C.text3, marginTop:2 }}>Solo personal autorizado</div>
            </div>
          </div>
          <button onClick={onCancel}
            style={{ width:30, height:30, borderRadius:7, border:`1px solid ${C.border}`, background:C.surface, fontSize:13, cursor:"pointer" }}>✕</button>
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:600, color:C.text3, marginBottom:6, textTransform:"uppercase", letterSpacing:".06em" }}>Clave de acceso</div>
          <input
            ref={inputRef}
            type="password"
            value={pin}
            onChange={e => { setPin(e.target.value); setError(false); }}
            onKeyDown={e => { if (e.key === "Enter") submit(); }}
            placeholder="Ingresa tu clave"
            autoComplete="off"
            style={{
              width:"100%", boxSizing:"border-box",
              fontSize:16, padding:"13px 15px",
              border:`1.5px solid ${error ? C.red : C.border}`, borderRadius:9,
              outline:"none", background:C.bg,
              ...mono, letterSpacing:"0.1em"
            }}
          />
          {error && (
            <div style={{ fontSize:12, color:C.red, marginTop:6, fontWeight:600 }}>
              ⚠ Clave incorrecta. Intenta de nuevo.
            </div>
          )}
        </div>

        <label style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, cursor:"pointer", userSelect:"none" }}>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
            style={{ width:16, height:16, cursor:"pointer", accentColor:C.blue }} />
          <span style={{ fontSize:13, color:C.text2 }}>Recordar en este dispositivo</span>
        </label>

        <button onClick={submit}
          style={{
            width:"100%", padding:"13px",
            background:C.blue, color:"#fff", border:"none", borderRadius:9,
            fontSize:14, fontWeight:700, cursor:"pointer"
          }}>
          Ingresar →
        </button>

        <div style={{ marginTop:16, padding:"10px 14px", background:C.panel, borderRadius:7, fontSize:11, color:C.text2, lineHeight:1.5 }}>
          💡 ¿No tienes la clave? Contacta a tu coordinador de ventas en Nextcom.
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// ROUTER — Welcome → ClientApp OR (PinModal → InternalApp)
// ════════════════════════════════════════════════════════════════════════

export default function App() {
  // Possible modes: "welcome" | "client" | "pin" | "internal"
  const [mode, setMode] = useState(() => {
    // If PIN was previously remembered, skip straight to internal
    try {
      if (localStorage.getItem(PIN_STORAGE_KEY) === "1") {
        return "internal";
      }
    } catch (e) {}
    return "welcome";
  });

  const goWelcome = () => setMode("welcome");
  const goClient = () => setMode("client");
  const goPin = () => setMode("pin");
  const goInternal = () => setMode("internal");

  // Render
  if (mode === "welcome") {
    return <WelcomeScreen onChooseClient={goClient} onChooseInternal={goPin} />;
  }
  if (mode === "client") {
    return (
      <>
        <ClientApp />
        <BackToWelcomeButton onClick={goWelcome} />
      </>
    );
  }
  if (mode === "pin") {
    return (
      <>
        <WelcomeScreen onChooseClient={goClient} onChooseInternal={() => {}} />
        <PinModal onSuccess={goInternal} onCancel={goWelcome} />
      </>
    );
  }
  if (mode === "internal") {
    return (
      <>
        <InternalApp />
        <LogoutButton onClick={() => {
          try { localStorage.removeItem(PIN_STORAGE_KEY); } catch (e) {}
          goWelcome();
        }} />
      </>
    );
  }
  return null;
}

function BackToWelcomeButton({ onClick }) {
  return (
    <button onClick={onClick} title="Volver a la pantalla de inicio"
      style={{
        position:"fixed", top:12, right:12, zIndex:200,
        padding:"6px 12px", background:"rgba(255,255,255,0.95)", border:`1px solid ${C.border}`,
        borderRadius:7, fontSize:11, color:C.text2, cursor:"pointer", fontWeight:600,
        boxShadow:"0 2px 8px rgba(0,0,0,.1)", display:"flex", alignItems:"center", gap:5
      }}>
      ← Inicio
    </button>
  );
}

function LogoutButton({ onClick }) {
  return (
    <button onClick={onClick} title="Cerrar sesión interna"
      style={{
        position:"fixed", top:12, right:12, zIndex:200,
        padding:"6px 12px", background:"rgba(255,255,255,0.95)", border:`1px solid ${C.border}`,
        borderRadius:7, fontSize:11, color:C.text2, cursor:"pointer", fontWeight:600,
        boxShadow:"0 2px 8px rgba(0,0,0,.1)", display:"flex", alignItems:"center", gap:5
      }}>
      🚪 Cerrar sesión
    </button>
  );
}
