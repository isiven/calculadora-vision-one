export function InternalKpiStrip({ metrics }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon

        return (
          <article
            key={metric.label}
            className="rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
            style={{ minHeight: 110, boxSizing: "border-box" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-medium text-slate-500">{metric.label}</div>
                <div
                  className="mt-4 font-mono text-[22px] font-bold leading-none tracking-normal"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </div>
              </div>
              {Icon ? (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
              ) : null}
            </div>
            {metric.sub ? (
              <div className="mt-2 text-xs leading-4 text-slate-500">{metric.sub}</div>
            ) : null}
          </article>
        )
      })}
    </section>
  )
}
