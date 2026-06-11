export function InternalKpiStrip({ metrics }) {
  return (
    <section className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="rounded-lg border border-neutral-200/80 bg-white px-4 py-3 shadow-sm shadow-neutral-950/[0.03]"
        >
          <div className="text-[11px] font-medium text-neutral-500">{metric.label}</div>
          <div
            className="mt-1 font-mono text-lg font-semibold tracking-normal"
            style={{ color: metric.color }}
          >
            {metric.value}
          </div>
          {metric.sub ? (
            <div className="mt-1 text-[11px] leading-4 text-neutral-500">{metric.sub}</div>
          ) : null}
        </article>
      ))}
    </section>
  )
}
