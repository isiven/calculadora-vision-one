export function InternalKpiStrip({ metrics }) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="min-h-[112px] rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm shadow-slate-950/[0.03]"
        >
          <div className="text-xs font-medium text-slate-500">{metric.label}</div>
          <div
            className="mt-5 font-mono text-2xl font-bold tracking-normal"
            style={{ color: metric.color }}
          >
            {metric.value}
          </div>
          {metric.sub ? (
            <div className="mt-2 text-xs leading-4 text-slate-500">{metric.sub}</div>
          ) : null}
        </article>
      ))}
    </section>
  )
}
