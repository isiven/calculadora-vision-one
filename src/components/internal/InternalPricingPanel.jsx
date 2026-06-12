export function InternalPricingPanel({
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
    <aside className="hidden min-w-0 flex-col gap-4 lg:flex">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <div className="mb-5 text-sm font-medium text-slate-800">
          Precios por crédito
        </div>
        <div className="space-y-5">
          {priceFields.map((field) => (
            <label key={field.label} className="block">
              <div className="mb-2 text-xs font-medium text-slate-700">
                {field.label}
              </div>
              <div className="flex h-10 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 shadow-inner shadow-slate-950/[0.02]">
                <span className="text-sm text-slate-500">$</span>
                <input
                  type="number"
                  value={field.value}
                  step={0.005}
                  min={0}
                  onChange={(event) => field.onChange(parseFloat(event.target.value) || 0)}
                  className="w-full border-0 bg-transparent font-mono text-sm font-semibold text-slate-950 outline-none"
                  style={{ color: field.accent ? "#1E40AF" : undefined }}
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-500">{field.sub}</div>
            </label>
          ))}
        </div>

        <div
          className="mt-7 flex items-center justify-between rounded-md px-3 py-3"
          style={{ background: perCreditBg }}
        >
          <span className="text-xs font-medium text-slate-700">Margen / crédito</span>
          <span className="font-mono text-xs font-bold" style={{ color: perCreditColor }}>
            {perCreditLabel}
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <div className="mb-4 text-sm font-medium text-slate-800">
          Resumen del negocio
        </div>
        <div className="divide-y divide-slate-100">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <span className="text-xs text-slate-700">{item.label}</span>
              <span className="whitespace-nowrap font-mono text-xs font-semibold" style={{ color: item.color }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onExportPdf}
        disabled={pdfLoading}
        className="mt-20 flex h-11 w-full items-center justify-center rounded-lg border border-blue-600 bg-white px-3 text-sm font-semibold text-blue-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:bg-blue-50 disabled:cursor-wait disabled:border-slate-300 disabled:text-slate-400"
      >
        {pdfLoading ? "Generando PDF..." : "Exportar análisis PDF"}
      </button>
    </aside>
  )
}
