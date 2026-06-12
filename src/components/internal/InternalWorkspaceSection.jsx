export function InternalWorkspaceSection({ title, description, action, children }) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex min-h-[52px] flex-col gap-3 border-b border-slate-200 bg-white px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
          {description ? (
            <p className="hidden text-[11px] leading-5 text-slate-400 sm:block">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div>{children}</div>
    </section>
  )
}
