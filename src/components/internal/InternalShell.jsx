import { useState } from "react"
import { ArrowLeft, Clock3 } from "lucide-react"

import { InternalSidebar } from "./InternalSidebar"
import { InternalTopbar } from "./InternalTopbar"

const upcomingCopy = {
  dashboard: "Dashboard",
  saved: "Cotizaciones",
  clients: "Clientes",
  closed: "Reportes",
  admin: "Configuración",
}

function UpcomingModulePlaceholder({ activeSection, onBack }) {
  const sectionLabel = upcomingCopy[activeSection] || "Módulo"

  return (
    <div className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-5xl items-center justify-center px-5 py-10">
      <section className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-700">
          <Clock3 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          {sectionLabel}
        </div>
        <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-slate-950">
          Módulo próximamente disponible
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-6 text-slate-500">
          Esta sección estará disponible en una próxima versión de la plataforma.
          Actualmente puedes continuar usando la Calculadora Vision One.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mx-auto mt-7 inline-flex h-10 appearance-none items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-4 text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(37,99,235,0.18)] hover:border-blue-700 hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a la calculadora
        </button>
      </section>
    </div>
  )
}

export function InternalShell({ children, onLogout, nextcomLogo, trendLogo }) {
  const [activeSection, setActiveSection] = useState("calculator")
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(min-width: 1024px)").matches
  })

  const showSidebar = () => setIsSidebarOpen(true)
  const hideSidebar = () => setIsSidebarOpen(false)
  const toggleSidebar = () => setIsSidebarOpen((open) => !open)

  return (
    <div className="min-h-screen bg-[#f6f8fb] font-sans text-slate-950">
      <div className="flex min-h-screen">
        <InternalSidebar
          activeSection={activeSection}
          isOpen={isSidebarOpen}
          onClose={hideSidebar}
          onToggleSidebar={toggleSidebar}
          onSectionChange={setActiveSection}
          nextcomLogo={nextcomLogo}
          trendLogo={trendLogo}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <InternalTopbar
            activeSection={activeSection}
            isSidebarOpen={isSidebarOpen}
            onOpenSidebar={showSidebar}
            onSectionChange={setActiveSection}
            onToggleSidebar={toggleSidebar}
            onLogout={onLogout}
          />

          <main className="min-w-0 flex-1 bg-[#f6f8fb]">
            {activeSection === "calculator" ? (
              children
            ) : (
              <UpcomingModulePlaceholder
                activeSection={activeSection}
                onBack={() => setActiveSection("calculator")}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
