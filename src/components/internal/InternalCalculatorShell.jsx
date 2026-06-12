export function InternalCalculatorShell({ isMobile, children }) {
  return (
    <div
      className="no-print min-h-[calc(100vh-72px)] bg-[#f6f8fb] text-slate-950 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]"
      style={{
        fontFamily: "system-ui,-apple-system,sans-serif",
        fontSize: 14,
        paddingBottom: isMobile ? "calc(80px + env(safe-area-inset-bottom, 0px))" : 0,
      }}
    >
      {children}
    </div>
  )
}
