import {
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  ClipboardList,
  PieChart,
  Settings,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "calculator", label: "Calculadora", icon: Calculator },
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "saved", label: "Cotizaciones", icon: ClipboardList },
  { id: "clients", label: "Clientes", icon: Users },
  { id: "closed", label: "Reportes", icon: PieChart },
  { id: "admin", label: "Configuración", icon: Settings },
]

export function InternalSidebar({ activeSection, isOpen, onClose, onSectionChange, nextcomLogo, trendLogo }) {
  const handleSectionChange = (sectionId) => {
    onSectionChange(sectionId)
    onClose()
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-neutral-950/20 backdrop-blur-[1px] transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col bg-[#071b33] text-white shadow-2xl shadow-slate-950/30 transition-all duration-200 lg:sticky lg:top-0 lg:h-screen lg:shadow-none",
          isOpen
            ? "translate-x-0 lg:w-60"
            : "-translate-x-full lg:w-0 lg:overflow-hidden"
        )}
      >
        <div className="flex min-h-[96px] items-start justify-between gap-3 px-5 py-6">
          {nextcomLogo ? (
            <img
              src={nextcomLogo}
              alt="Nextcom Systems"
              className="block h-11 w-auto max-w-[150px] object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          ) : (
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">nextcom</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-300">
                Systems
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Ocultar menú"
            title="Ocultar menú"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-4 py-4">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSectionChange(section.id)}
                className={cn(
                  "flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-950/25"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-white" : "text-slate-300"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{section.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mx-4 border-t border-white/10 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white">Trend Vision One</div>
              <div className="text-[11px] text-slate-400">Credit Calculator</div>
            </div>
          </div>
          {trendLogo ? (
            <img
              src={trendLogo}
              alt="TrendAI"
              className="mt-4 block h-7 w-auto max-w-[150px] object-contain opacity-90"
            />
          ) : null}
        </div>

        <div className="border-t border-white/10 px-5 py-4 text-xs text-slate-300">
          <button
            type="button"
            onClick={onClose}
            className="flex w-full items-center gap-2 text-left hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Colapsar
          </button>
        </div>
      </aside>
    </>
  )
}

export { sections as internalShellSections }
