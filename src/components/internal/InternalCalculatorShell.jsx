export function InternalCalculatorShell({ isMobile, children }) {
  return (
    <div
      className="no-print min-h-screen bg-neutral-50 text-neutral-950 lg:grid lg:grid-cols-[292px_minmax(0,1fr)]"
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
