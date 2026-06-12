export function InternalCalculatorShell({ isMobile, sidebar, children }) {
  return (
    <div
      className="no-print min-h-[calc(100vh-72px)] bg-[#f6f8fb] text-slate-950"
      style={{
        fontFamily: "system-ui,-apple-system,sans-serif",
        fontSize: 14,
        paddingBottom: isMobile ? "calc(80px + env(safe-area-inset-bottom, 0px))" : 0,
      }}
    >
      {isMobile ? (
        children
      ) : (
        <div className="grid min-h-[calc(100vh-72px)] grid-cols-[280px_minmax(0,1fr)] gap-6 px-7 py-7">
          <div className="min-w-0">{sidebar}</div>
          <div className="min-w-0">{children}</div>
        </div>
      )}
    </div>
  )
}
