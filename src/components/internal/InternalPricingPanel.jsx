export function InternalPricingPanel({
  logoSrc,
  salePrice,
  costPrice,
  onSalePriceChange,
  onCostPriceChange,
  perCreditLabel,
  perCreditColor,
  perCreditBg,
  summaryItems,
  onExportPdf,
  pdfLoading,
}) {
  const priceFields = [
    {
      label: "Precio al cliente",
      sub: "Lo que cobra Nextcom",
      value: salePrice,
      onChange: onSalePriceChange,
      accent: true,
    },
    {
      label: "Costo proveedor",
      sub: "Lo que paga Nextcom",
      value: costPrice,
      onChange: onCostPriceChange,
      accent: false,
    },
  ]

  return (
    <aside className="sticky top-0 flex h-screen flex-col overflow-y-auto border-r border-neutral-200/80 bg-white">
      <div className="border-b border-neutral-100 bg-neutral-50/70 px-5 py-5">
        <img src={logoSrc} alt="TrendAI" className="mb-2 block h-9 w-auto" />
        <div className="text-[11px] font-semibold text-neutral-700">
          Vision One · Credit Calculator
        </div>
        <div className="mt-0.5 text-[10px] text-neutral-500">Jan 2026 edition</div>
      </div>

      <div className="border-b border-neutral-100 px-5 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
          Precios por crédito
        </div>
        <div className="space-y-3">
          {priceFields.map((field) => (
            <label key={field.label} className="block">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-500">
                {field.label}
              </div>
              <div className="flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-2">
                <span className="text-xs text-neutral-400">$</span>
                <input
                  type="number"
                  value={field.value}
                  step={0.005}
                  min={0}
                  onChange={(event) => field.onChange(parseFloat(event.target.value) || 0)}
                  className="w-full border-0 bg-transparent font-mono text-sm font-semibold text-neutral-950 outline-none"
                  style={{ color: field.accent ? "#1E40AF" : undefined }}
                />
              </div>
              <div className="mt-1 text-[10px] text-neutral-500">{field.sub}</div>
            </label>
          ))}
        </div>

        <div
          className="mt-3 flex items-center justify-between rounded-md px-2.5 py-2"
          style={{ background: perCreditBg }}
        >
          <span className="text-xs text-neutral-600">Margen / crédito</span>
          <span className="font-mono text-xs font-semibold" style={{ color: perCreditColor }}>
            {perCreditLabel}
          </span>
        </div>
      </div>

      <div className="flex-1 px-5 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
          Resumen del negocio
        </div>
        <div className="rounded-lg border border-neutral-200/80 bg-neutral-50/60 px-3">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3 border-b border-neutral-200/70 py-2.5 last:border-b-0"
            >
              <span className="text-xs text-neutral-600">{item.label}</span>
              <span className="whitespace-nowrap font-mono text-xs font-semibold" style={{ color: item.color }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-100 px-5 py-4">
        <button
          type="button"
          onClick={onExportPdf}
          disabled={pdfLoading}
          className="flex w-full items-center justify-center rounded-md bg-neutral-950 px-3 py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-wait disabled:bg-neutral-400"
        >
          {pdfLoading ? "Generando PDF..." : "Exportar análisis PDF"}
        </button>
      </div>

      <div className="px-5 pb-4 text-[11px] leading-5 text-neutral-500">
        Nextcom Systems, Inc.
        <br />
        Trend Micro Platinum Partner · Panamá
      </div>
    </aside>
  )
}
