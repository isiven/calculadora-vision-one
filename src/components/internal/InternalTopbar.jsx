import { Bell, LogOut, Menu, Search } from "lucide-react"

import { internalShellSections } from "./InternalSidebar"

export function InternalTopbar({
  activeSection,
  isSidebarOpen,
  onOpenSidebar,
  onToggleSidebar,
  onLogout,
}) {
  const activeLabel =
    internalShellSections.find((section) => section.id === activeSection)?.label ||
    "Consola interna"

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 backdrop-blur">
      <div className="flex min-h-12 items-center gap-2 px-3 sm:px-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="hidden h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 lg:inline-flex"
          aria-label={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
          title={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 lg:hidden"
          aria-label="Mostrar menú lateral"
          title="Mostrar menú lateral"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold text-neutral-950">
            {activeLabel}
          </h1>
        </div>

        <label className="hidden h-8 w-64 items-center gap-2 rounded-md border border-neutral-200/80 bg-neutral-50/80 px-2.5 text-xs text-neutral-500 xl:flex">
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="truncate">Buscar cliente, análisis o negocio</span>
        </label>

        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          aria-label="Alertas mock"
          title="Alertas mock"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-xs font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>

    </header>
  )
}
