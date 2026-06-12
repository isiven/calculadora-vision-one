import {
  BarChart3,
  Calculator,
  ClipboardList,
  LogOut,
  PieChart,
  Settings,
  Users,
  PanelLeftOpen,
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

export function InternalSidebar({ activeSection, isOpen, onClose, onToggleSidebar, onSectionChange, nextcomLogo, trendLogo }) {
  const handleSectionChange = (sectionId) => {
    onSectionChange(sectionId)
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      onClose()
    }
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
          "fixed inset-y-0 left-0 z-50 flex w-[240px] shrink-0 flex-col overflow-hidden bg-[#081b32] text-white shadow-2xl shadow-slate-950/30 transition-[width,transform] duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none",
          isOpen
            ? "translate-x-0 lg:w-[240px]"
            : "-translate-x-full lg:w-[72px]"
        )}
      >
        <div
          className={cn(
            "flex h-[116px] items-start gap-3 pb-5 pt-7 transition-all duration-200",
            isOpen ? "justify-between px-5" : "justify-center px-3"
          )}
          style={{ boxSizing: "border-box" }}
        >
          <div className={cn("min-w-0 overflow-hidden transition-all duration-200", isOpen ? "w-[150px]" : "w-10")}>
            {nextcomLogo ? (
              <img
                src={nextcomLogo}
                alt="Nextcom Systems"
                className={cn(
                  "block h-10 object-contain transition-all duration-200",
                  isOpen ? "w-auto max-w-[150px]" : "w-[150px] max-w-none object-left"
                )}
                style={{
                  filter: "brightness(0) invert(1)",
                }}
              />
            ) : (
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">nextcom</div>
                <div className={cn("text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-300", !isOpen && "hidden")}>
                  Systems
                </div>
              </div>
            )}
          </div>
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

        <nav className={cn("flex flex-1 flex-col gap-1.5 py-3 transition-all duration-200", isOpen ? "px-4" : "px-3")}>
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSectionChange(section.id)}
                title={section.label}
                aria-label={section.label}
                className={cn(
                  "flex h-11 w-full appearance-none items-center rounded-lg border-0 bg-transparent text-[14px] font-medium transition-colors",
                  isOpen ? "justify-start gap-3 px-3 text-left" : "justify-center gap-0 px-0",
                  isActive
                    ? "bg-blue-600 text-white shadow-[0_8px_18px_rgba(37,99,235,0.2)]"
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
                <span className={cn("truncate transition-all duration-150", isOpen ? "ml-0 w-auto opacity-100" : "w-0 opacity-0 lg:hidden")}>
                  {section.label}
                </span>
              </button>
            )
          })}
        </nav>

        <div className={cn("border-t border-white/10 py-5 transition-all duration-200", isOpen ? "mx-4" : "mx-3")}>
          <div className={cn(
            "rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-200",
            isOpen ? "p-3" : "flex h-11 items-center justify-center p-0"
          )}>
            <div className={cn("flex items-center", isOpen ? "gap-3" : "gap-0")}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/95">
                {trendLogo ? (
                  <img
                    src={trendLogo}
                    alt=""
                    className="h-5 max-w-7 object-contain"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="text-[11px] font-bold text-[#081b32]" aria-hidden="true">AI</span>
                )}
              </div>
              <div className={cn("min-w-0 transition-all duration-150", isOpen ? "w-auto opacity-100" : "hidden w-0 overflow-hidden opacity-0")}>
                <div className="text-xs font-semibold text-white">Trend Vision One</div>
                <div className="mt-0.5 text-[11px] text-slate-400">Credit Calculator</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleSidebar}
            title={isOpen ? "Colapsar" : "Expandir"}
            aria-label={isOpen ? "Colapsar menú lateral" : "Expandir menú lateral"}
            className={cn(
              "mt-4 flex h-9 w-full appearance-none items-center rounded-lg border-0 bg-transparent text-xs text-slate-400 hover:bg-white/[0.07] hover:text-white",
              isOpen ? "justify-start gap-2 px-2 text-left" : "justify-center px-0"
            )}
          >
            {isOpen ? (
              <LogOut className="h-4 w-4 rotate-180" aria-hidden="true" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
            )}
            <span className={cn("transition-all duration-150", isOpen ? "w-auto opacity-100" : "w-0 overflow-hidden opacity-0 lg:hidden")}>
              Colapsar
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

export { sections as internalShellSections }
