import { Bell, LogOut, Search } from "lucide-react"

import { internalShellSections } from "./InternalSidebar"

export function InternalTopbar({ activeSection, onSectionChange, onLogout }) {
  const activeLabel =
    internalShellSections.find((section) => section.id === activeSection)?.label ||
    "Consola interna"

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Equipo Nextcom
          </div>
          <h1 className="truncate text-lg font-semibold text-neutral-950">
            {activeLabel}
          </h1>
        </div>

        <label className="hidden h-9 w-72 items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-500 md:flex">
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="truncate">Buscar cliente, análisis o negocio</span>
        </label>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
          aria-label="Alertas mock"
          title="Alertas mock"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto border-t border-neutral-100 px-4 py-2 lg:hidden">
        {internalShellSections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onSectionChange(section.id)}
            className={
              activeSection === section.id
                ? "shrink-0 rounded-md bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-white"
                : "shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
            }
          >
            {section.label}
          </button>
        ))}
      </div>
    </header>
  )
}
