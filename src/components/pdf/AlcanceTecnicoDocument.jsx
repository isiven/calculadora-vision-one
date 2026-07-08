const emptyValue = "No especificado";

const chunkItems = (items, size) => {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks.length > 0 ? chunks : [[]];
};

const text = (value) => {
  if (value === null || value === undefined || value === "") return emptyValue;
  return String(value);
};

function DocumentFooter({ pageNumber, totalPages, date, final = false }) {
  if (final) {
    return (
      <footer className="document-footer final-footer">
        <div>Nextcom Systems · RUC 1253816-1-593861 DV 16 · +507 394-1405</div>
        <div>Alcance técnico · No incluye precios ni márgenes · Página {pageNumber} de {totalPages}</div>
      </footer>
    );
  }

  return (
    <footer className="document-footer">
      <div>Nextcom Systems / Documento generado por Calculadora Vision One</div>
      <div>Alcance técnico · {date} · Página {pageNumber} de {totalPages}</div>
    </footer>
  );
}

function RunningHeader({ reference }) {
  return (
    <header className="running-header">
      <div>Alcance técnico de la propuesta · Nextcom Systems</div>
      <div>{reference}</div>
    </header>
  );
}

function SectionTitle({ label, title }) {
  return (
    <div className="section-title">
      <div className="eyebrow">{label}</div>
      <h2>{title}</h2>
    </div>
  );
}

function LedgerRow({ label, hint, children }) {
  return (
    <section className="ledger-row">
      <aside>
        <div className="eyebrow">{label}</div>
        <p>{hint}</p>
      </aside>
      <div className="ledger-content">{children}</div>
    </section>
  );
}

function LedgerList({ items }) {
  return (
    <ul className="ledger-list">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

function ProductItem({ item, index }) {
  const specs = [
    ["SKU o módulo", item.sku || item.category],
    ["Cantidad", item.quantity],
    ["Vigencia", `${item.startDate} → ${item.endDate}`],
    ["Créditos", item.credits],
  ];

  return (
    <article className="item-entry">
      <div className="item-number">{String(index + 1).padStart(2, "0")}</div>
      <div className="item-body">
        <h3>{item.name}</h3>
        <div className="item-specs">
          {specs.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{text(value)}</strong>
            </div>
          ))}
        </div>
        <p>{item.summary}</p>
        <ul className="capability-list">
          {item.includes.map((capability, capIndex) => (
            <li key={`${capability}-${capIndex}`}>{capability}</li>
          ))}
        </ul>
        <div className="business-value">
          <strong>Valor para el negocio</strong>
          <span>{item.businessValue}</span>
        </div>
        {item.notes ? <p className="validation-note">{item.notes}</p> : null}
      </div>
    </article>
  );
}

function ProductScopePage({ items, offset, pageNumber, totalPages, date, totalItems }) {
  const first = offset + 1;
  const last = offset + items.length;
  const range = items.length > 0 ? `ÍTEMS ${first}-${last} DE ${totalItems}` : "SIN ÍTEMS";

  return (
    <section className="page">
      <RunningHeader reference={range} />
      <SectionTitle label="ALCANCE POR ÍTEM VENDIDO" title="Detalle técnico de productos y servicios" />
      <div className="item-list">
        {items.length > 0 ? (
          items.map((item, index) => <ProductItem key={`${item.id}-${index}`} item={item} index={offset + index} />)
        ) : (
          <p className="empty-state">No hay productos activos asociados a esta propuesta.</p>
        )}
      </div>
      <DocumentFooter pageNumber={pageNumber} totalPages={totalPages} date={date} />
    </section>
  );
}

function TechnicalPrintStyles({ fonts }) {
  return (
    <style>{`
@font-face{font-family:Inter;src:url("${fonts.inter400}") format("woff2");font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:Inter;src:url("${fonts.inter500}") format("woff2");font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:Inter;src:url("${fonts.inter600}") format("woff2");font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:Inter;src:url("${fonts.inter700}") format("woff2");font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:"IBM Plex Mono";src:url("${fonts.plex400}") format("woff2");font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:"IBM Plex Mono";src:url("${fonts.plex500}") format("woff2");font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:"IBM Plex Mono";src:url("${fonts.plex600}") format("woff2");font-weight:600;font-style:normal;font-display:swap}
:root{
  --ink:#171B21;
  --body:#3A414B;
  --muted:#6B7280;
  --faint:#9AA1AB;
  --line:#E5E8EC;
  --line-strong:#C8CDD4;
  --navy:#0D2B4E;
  --red:#D62828;
  --bg-subtle:#F7F8FA;
}
@page{size:letter;margin:0}
html,body{margin:0;padding:0;background:#fff}
*{box-sizing:border-box}
body{font-family:Inter,Arial,sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.technical-document{width:816px;margin:0 auto;background:#fff}
.page{
  width:816px;
  height:1056px;
  overflow:hidden;
  page-break-after:always;
  position:relative;
  display:flex;
  flex-direction:column;
  padding:56px 64px 0;
  background:#fff;
}
.page:last-child{page-break-after:auto}
.cover-page{padding-top:0}
p{font-size:12.5px;line-height:1.58;color:var(--body);margin:0}
.mono,.item-specs strong,.meta-cell strong,.summary-table td:nth-child(2),.summary-table td:nth-child(4),.item-number,.contact-row strong,.support-sla strong,.cert-tags span,.cert-card strong{font-family:"IBM Plex Mono",ui-monospace,monospace}
.eyebrow{font-size:9.75px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:var(--navy)}
.masthead{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:32px;
  min-height:126px;
  margin:0 -64px;
  padding:30px 64px 28px;
  background:var(--navy);
  border-bottom:0;
}
.brand-lockup{display:flex;align-items:flex-start;gap:14px}
.brand-logo{width:160px;height:42px;object-fit:contain;object-position:left center}
.brand-subtitle{margin-top:8px;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.72)}
.brand-subtitle strong{color:#fff}
.trend-lockup{display:grid;justify-items:end;gap:8px;text-align:right}
.trend-logo{width:132px;height:34px;object-fit:contain;object-position:right center}
.trend-lockup span{display:block;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.68)}
.cover-iso-strip{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:2px}
.cover-iso-strip em{font-style:normal;font-size:8.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.58)}
.cover-iso-logo{
  width:42px;
  height:28px;
  object-fit:contain;
  padding:3px;
  background:rgba(255,255,255,.96);
  border:1px solid rgba(255,255,255,.5);
}
.trend-dot{color:var(--red);padding:0 6px}
.cover-title{margin-top:50px;max-width:660px}
.cover-title h1{margin:12px 0 18px;font-size:36px;line-height:1.04;font-weight:700;letter-spacing:-.025em;color:var(--ink)}
.cover-title p{font-size:13.5px;line-height:1.6;max-width:620px}
.metadata-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:54px;padding:16px 18px;background:var(--bg-subtle)}
.meta-cell{min-height:auto;padding:0}
.meta-cell span{display:block;margin-bottom:10px;font-size:9.5px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)}
.meta-cell strong{display:block;font-size:11.5px;font-weight:500;line-height:1.35;color:var(--ink);word-break:break-word}
.summary-section{margin-top:48px}
.section-title{padding-top:13px;border-top:1px solid var(--ink)}
.section-title h2{margin-top:8px;font-size:18px;line-height:1.22;font-weight:600;letter-spacing:-.015em;color:var(--ink)}
.summary-table{width:100%;margin-top:18px;border-collapse:collapse}
.summary-table th{padding:10px 8px 9px 0;border-bottom:1px solid var(--line-strong);font-size:9.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-align:left}
.summary-table th:nth-child(3),.summary-table th:nth-child(4),.summary-table td:nth-child(3),.summary-table td:nth-child(4){text-align:right}
.summary-table td{padding:10px 8px 10px 0;border-bottom:1px solid var(--line);font-size:12px;line-height:1.35;color:var(--body);vertical-align:top}
.summary-table tfoot td{border-top:1px solid var(--ink);border-bottom:0;font-weight:600;color:var(--ink)}
.summary-table tfoot td:last-child{font-family:"IBM Plex Mono",ui-monospace,monospace;text-align:right}
.validity-note{margin-top:12px;font-size:10.5px;color:var(--muted)}
.contact-row{display:grid;grid-template-columns:1.05fr .8fr 1.1fr .8fr;gap:22px;margin-top:auto;padding:16px 18px 18px;background:var(--bg-subtle)}
.contact-row span{display:block;margin-bottom:6px;font-size:9.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.contact-row strong{display:block;font-size:11px;font-weight:500;color:var(--ink);line-height:1.35;word-break:break-word}
.running-header{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-bottom:12px;border-bottom:1px solid var(--ink);font-size:10.5px;font-weight:600;color:var(--ink)}
.running-header div:last-child{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-align:right}
.ledger-stack{display:grid;gap:34px;margin-top:38px}
.ledger-row{display:grid;grid-template-columns:180px 1fr;gap:40px;padding-top:16px;border-top:1px solid var(--ink)}
.ledger-row aside p{margin-top:10px;font-size:10.5px;line-height:1.5;color:var(--muted)}
.ledger-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.ledger-list li{position:relative;padding:9px 0 9px 28px;border-bottom:1px solid var(--line);font-size:12.6px;line-height:1.56;color:var(--body)}
.ledger-list li:before{content:"-";position:absolute;left:0;top:9px;color:var(--line-strong);font-weight:600}
.item-list{display:grid;gap:34px;margin-top:30px}
.item-entry{display:grid;grid-template-columns:56px 1fr;gap:0;padding-top:21px;border-top:1px solid var(--line)}
.item-entry:first-child{border-top:0;padding-top:0}
.item-number{font-size:11px;font-weight:500;color:var(--faint);letter-spacing:.04em}
.item-body h3{margin:0 0 13px;font-size:16px;line-height:1.28;font-weight:600;color:var(--ink)}
.item-specs{display:grid;grid-template-columns:1.2fr .7fr 1.4fr .7fr;gap:14px;padding:11px 14px;background:var(--bg-subtle)}
.item-specs div{padding:0}
.item-specs div:last-child{text-align:right}
.item-specs span{display:block;margin-bottom:5px;font-size:9.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.item-specs strong{display:block;font-size:11px;font-weight:500;color:var(--ink);line-height:1.3}
.item-body p{margin-top:13px}
.capability-list{list-style:none;margin:13px 0 0;padding:0;display:grid;gap:6px}
.capability-list li{position:relative;padding-left:15px;font-size:12px;line-height:1.5;color:var(--body)}
.capability-list li:before{content:"·";position:absolute;left:0;top:0;color:var(--ink);font-weight:700}
.business-value{margin-top:13px;padding:11px 13px 11px 14px;background:var(--bg-subtle);border-left:2px solid var(--navy)}
.business-value strong{display:block;margin-bottom:5px;font-size:9.5px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:var(--navy)}
.business-value span{display:block;font-size:12px;line-height:1.5;color:var(--body)}
.validation-note{margin-top:9px!important;font-size:10.5px!important;line-height:1.45!important;color:var(--faint)!important}
.empty-state{margin-top:30px;padding-top:20px;border-top:1px solid var(--line);color:var(--muted)}
.support-head{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--ink)}
.support-head h2{font-size:20px;line-height:1.22;font-weight:600;letter-spacing:-.015em;color:var(--ink)}
.policy-badge{display:inline-flex;align-items:center;height:24px;padding:0 8px;border:1px solid var(--navy);border-radius:2px;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--navy)}
.support-sla{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:32px;padding:16px 18px;background:var(--bg-subtle)}
.support-sla div{padding:0}
.support-sla span{display:block;margin-bottom:10px;font-size:9.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.support-sla strong{display:block;font-size:15px;line-height:1.25;font-weight:500;color:var(--ink)}
.platform-note{margin-top:28px;padding-top:14px;border-top:1px solid var(--line);font-size:12px;color:var(--body)}
.platform-note a{font-family:"IBM Plex Mono",ui-monospace,monospace;color:var(--navy);text-decoration:none}
.cert-tags{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:18px}
.cert-card{
  display:grid;
  grid-template-columns:70px 1fr;
  align-items:center;
  gap:14px;
  min-height:82px;
  padding:8px 0;
  border:0;
  background:transparent;
}
.cert-card img{width:64px;height:56px;object-fit:contain}
.cert-card strong{display:block;font-size:11px;font-weight:600;color:var(--ink)}
.cert-card span{display:block;margin-top:4px;font-size:10px;line-height:1.3;color:var(--muted)}
.document-footer{margin-top:auto;padding:12px 0 20px;border-top:1px solid var(--line);display:flex;align-items:flex-start;justify-content:space-between;gap:20px;font-size:9.5px;line-height:1.35;color:var(--muted)}
.document-footer div:last-child{text-align:right}
.final-footer{font-size:9.25px}
@media print{
  html,body{background:#fff!important}
  .page{page-break-after:always}
  .page:last-child{page-break-after:auto}
}
`}</style>
  );
}

export function AlcanceTecnicoDocument({ document, assets }) {
  const items = document.items || [];
  const itemChunks = chunkItems(items, 2);
  const totalPages = 4 + itemChunks.length;
  const supportPageNumber = 3 + itemChunks.length;
  const finalPageNumber = supportPageNumber + 1;

  return (
    <div className="technical-document">
      <TechnicalPrintStyles fonts={assets.fonts} />

      <section className="page cover-page">
        <header className="masthead">
          <div>
            <div className="brand-lockup">
              <img src={assets.nextcomLogoReverse || assets.nextcomLogo} alt="Nextcom Systems" className="brand-logo" />
            </div>
            <div className="brand-subtitle"><strong>Nextcom Systems</strong> · Trend Micro Platinum Partner</div>
          </div>
          <div className="trend-lockup">
            <img src={assets.trendAiLogo} alt="TrendAI" className="trend-logo" />
            <span>Plataforma dimensionada</span>
            <div className="cover-iso-strip" aria-label="Certificaciones Nextcom">
              <em>Certificaciones</em>
              <img src={assets.iso9001Logo} alt="ISO 9001" className="cover-iso-logo" />
              <img src={assets.iso27001Logo} alt="ISO/IEC 27001" className="cover-iso-logo" />
            </div>
          </div>
        </header>

        <div className="cover-title">
          <div className="eyebrow">DOCUMENTO TÉCNICO</div>
          <h1>Alcance técnico de la propuesta</h1>
          <p>
            Documento descriptivo de productos, servicios, soporte y condiciones técnicas consideradas para la propuesta.
            Consolida los créditos dimensionados y el alcance funcional de cada ítem vendido.
          </p>
        </div>

        <section className="metadata-grid">
          <div className="meta-cell">
            <span>Cliente</span>
            <strong>{text(document.clientName)}</strong>
          </div>
          <div className="meta-cell">
            <span>Fecha de emisión</span>
            <strong>{document.issueDate}</strong>
          </div>
          <div className="meta-cell">
            <span>Moneda</span>
            <strong>{document.currency}</strong>
          </div>
          <div className="meta-cell">
            <span>Soporte</span>
            <strong>{document.support.included ? `Póliza ${document.support.label}` : "No incluido"}</strong>
          </div>
        </section>

        <section className="summary-section">
          <SectionTitle label="RESUMEN DEL ALCANCE" title="Productos y créditos dimensionados" />
          <table className="summary-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>SKU</th>
                <th>Cantidad</th>
                <th>Créditos</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? items.map((item, index) => (
                <tr key={`${item.id}-${index}`}>
                  <td>{item.name}</td>
                  <td>{item.sku || item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.credits}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4}>No hay productos activos asociados a esta propuesta.</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>Total de créditos dimensionados</td>
                <td>{document.totalCredits}</td>
              </tr>
            </tfoot>
          </table>
          <p className="validity-note">Las vigencias y créditos se calculan según los productos activos y fechas configuradas en la calculadora.</p>
        </section>

        <section className="contact-row">
          <div>
            <span>Contacto principal</span>
            <strong>{text(document.contact.name)}</strong>
          </div>
          <div>
            <span>Cargo</span>
            <strong>{text(document.contact.role)}</strong>
          </div>
          <div>
            <span>Correo</span>
            <strong>{text(document.contact.email)}</strong>
          </div>
          <div>
            <span>Teléfono</span>
            <strong>{text(document.contact.phone)}</strong>
          </div>
        </section>
      </section>

      <section className="page">
        <RunningHeader reference="PROPUESTA TÉCNICA" />
        <div className="ledger-stack">
          <LedgerRow label="Objetivos del servicio" hint="Resultados esperados de la solución y del dimensionamiento técnico.">
            <LedgerList items={document.objectives} />
          </LedgerRow>
          <LedgerRow label="Alcances" hint="Cobertura funcional considerada en productos, módulos y servicios incluidos.">
            <LedgerList items={document.scopes} />
          </LedgerRow>
          <LedgerRow label="Entregables" hint="Elementos que se consideran dentro de la propuesta técnica.">
            <LedgerList items={document.deliverables} />
          </LedgerRow>
        </div>
        <DocumentFooter pageNumber={2} totalPages={totalPages} date={document.shortDate} />
      </section>

      {itemChunks.map((chunk, index) => (
        <ProductScopePage
          key={`items-${index}`}
          items={chunk}
          offset={index * 2}
          pageNumber={3 + index}
          totalPages={totalPages}
          date={document.shortDate}
          totalItems={items.length}
        />
      ))}

      <section className="page">
        <RunningHeader reference="SOPORTE SEGÚN PÓLIZA" />
        <div className="support-head">
          <div>
            <div className="eyebrow">SOPORTE SEGÚN PÓLIZA</div>
            <h2>Soporte operativo incluido</h2>
          </div>
          <div className="policy-badge">{document.support.included ? document.support.label : "No incluido"}</div>
        </div>

        <section className="support-sla">
          <div>
            <span>Horario de atención</span>
            <strong>{document.support.sla.hours}</strong>
          </div>
          <div>
            <span>Primer contacto</span>
            <strong>{document.support.sla.firstContact}</strong>
          </div>
          <div>
            <span>Respuesta por criticidad</span>
            <strong>{document.support.sla.criticalResponse}</strong>
          </div>
        </section>

        <div className="ledger-stack">
          <LedgerRow label="Cobertura incluida" hint="Servicios consolidados para el nivel de póliza seleccionado.">
            <LedgerList items={document.support.bullets} />
          </LedgerRow>
        </div>

        <p className="platform-note">
          Los casos deben abrirse y gestionarse mediante la Plataforma de Solicitudes de Servicio y Reporte de Incidentes de Nextcom:
          {" "}<a href="https://servicios.nextcomsystems.com">https://servicios.nextcomsystems.com</a>
        </p>

        <DocumentFooter pageNumber={supportPageNumber} totalPages={totalPages} date={document.shortDate} />
      </section>

      <section className="page">
        <RunningHeader reference="CONSIDERACIONES Y CERTIFICACIONES" />
        <div className="ledger-stack">
          <LedgerRow label="Consideraciones del alcance" hint="Condiciones comerciales y técnicas aplicables al documento.">
            <LedgerList items={document.considerations} />
          </LedgerRow>
          <LedgerRow label="Certificaciones" hint="Sistema Integrado de Gestión de Nextcom.">
            <p>
              Nextcom cuenta con certificaciones de gestión de calidad ISO 9001 y seguridad de la información ISO/IEC 27001 como parte de su Sistema Integrado de Gestión.
            </p>
            <div className="cert-tags">
              <div className="cert-card">
                <img src={assets.iso9001Logo} alt="ISO 9001" />
                <div>
                  <strong>ISO 9001</strong>
                  <span>Gestión de Calidad</span>
                </div>
              </div>
              <div className="cert-card">
                <img src={assets.iso27001Logo} alt="ISO/IEC 27001" />
                <div>
                  <strong>ISO/IEC 27001</strong>
                  <span>Seguridad de la Información</span>
                </div>
              </div>
            </div>
          </LedgerRow>
        </div>
        <DocumentFooter pageNumber={finalPageNumber} totalPages={totalPages} date={document.shortDate} final />
      </section>
    </div>
  );
}
