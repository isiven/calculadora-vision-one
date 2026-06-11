import {
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  FileSearch,
  ShieldCheck,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "calculator", label: "Calculadora", icon: Calculator },
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "saved", label: "Análisis guardados", icon: FileSearch },
  { id: "closed", label: "Negocios cerrados", icon: BriefcaseBusiness },
  { id: "clients", label: "Clientes", icon: Users },
  { id: "admin", label: "Usuarios/Admin", icon: ShieldCheck },
]

export function InternalSidebar({ activeSection, isOpen, onClose, onSectionChange }) {
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
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-neutral-200/80 bg-white/95 shadow-xl shadow-neutral-950/10 transition-all duration-200 lg:sticky lg:top-0 lg:h-screen lg:shadow-none",
          isOpen
            ? "translate-x-0 lg:w-60"
            : "-translate-x-full lg:w-0 lg:overflow-hidden lg:border-r-0"
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-neutral-100 px-4 py-4">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
              Nextcom
            </div>
            <div className="mt-1 truncate text-sm font-semibold text-neutral-950">
              Vision One Console
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Ocultar menú"
            title="Ocultar menú"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 px-2 py-3">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSectionChange(section.id)}
                className={cn(
                  "flex h-9 w-full items-center gap-2.5 rounded-md px-2.5 text-left text-sm font-medium transition-colors",
                  isActive
                    ? "bg-neutral-100 text-neutral-950"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-neutral-900" : "text-neutral-400"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{section.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="border-t border-neutral-100 px-4 py-3 text-xs leading-5 text-neutral-400">
          Navegación mock. Sin usuarios, permisos ni persistencia real.
        </div>
      </aside>
    </>
  )
}

export { sections as internalShellSections }
