export function InternalWorkspaceSection({ title, description, action, children }) {
  return (
    <section className="rounded-lg border border-neutral-200/80 bg-white shadow-sm shadow-neutral-950/[0.03]">
      <div className="flex flex-col gap-3 border-b border-neutral-100 bg-neutral-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-neutral-950">{title}</h2>
          {description ? (
            <p className="mt-1 text-xs leading-5 text-neutral-500">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div>{children}</div>
    </section>
  )
}
