import {
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  ClipboardList,
  LogOut,
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
          "fixed inset-y-0 left-0 z-50 flex w-[240px] shrink-0 flex-col bg-[#081b32] text-white shadow-2xl shadow-slate-950/30 transition-all duration-200 lg:sticky lg:top-0 lg:h-screen lg:shadow-none",
          isOpen
            ? "translate-x-0 lg:w-[240px]"
            : "-translate-x-full lg:w-0 lg:overflow-hidden"
        )}
      >
        <div className="flex min-h-[96px] items-start justify-between gap-3 px-5 pb-5 pt-7">
          {nextcomLogo ? (
            <img
              src={nextcomLogo}
              alt="Nextcom Systems"
              className="block h-10 w-auto max-w-[150px] object-contain"
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
            className="inline-flex h-8 w-8 appearance-none items-center justify-center rounded-md border-0 bg-transparent text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Ocultar menú"
            title="Ocultar menú"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 px-4 py-3">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSectionChange(section.id)}
                className={cn(
                  "flex h-10 w-full appearance-none items-center gap-3 rounded-lg border-0 bg-transparent px-3 text-left text-[14px] font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.24)]"
                    : "text-slate-300/90 hover:bg-white/[0.07] hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0",
                    isActive ? "text-white" : "text-slate-300/90"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{section.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mx-4 border-t border-white/10 py-5">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white">Trend Vision One</div>
                <div className="mt-0.5 text-[11px] text-slate-400">Credit Calculator</div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mx-4 mb-5 flex h-9 appearance-none items-center gap-2 rounded-lg border-0 bg-transparent px-2 text-left text-xs text-slate-400 hover:bg-white/[0.07] hover:text-white"
        >
          <LogOut className="h-4 w-4 rotate-180" aria-hidden="true" />
          Colapsar
        </button>
      </aside>
    </>
  )
}

export { sections as internalShellSections }
