import {
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  FileSearch,
  ShieldCheck,
  Users,
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

export function InternalSidebar({ activeSection, onSectionChange }) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-neutral-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-neutral-200 px-5 py-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Nextcom Console
        </div>
        <div className="mt-2 text-lg font-semibold text-neutral-950">
          Vision One
        </div>
        <div className="mt-1 text-xs text-neutral-500">
          Shell interno mock
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors",
                isActive
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{section.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="border-t border-neutral-200 px-5 py-4 text-xs leading-5 text-neutral-500">
        Futuro espacio para roles, permisos y actividad comercial.
      </div>
    </aside>
  )
}

export { sections as internalShellSections }
