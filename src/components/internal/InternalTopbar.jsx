import { useEffect, useState } from "react"
import { Bell, ChevronDown, LogOut, Menu, Search, Upload } from "lucide-react"

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
  const isCalculator = activeSection === "calculator"
  const [currency, setCurrency] = useState("USD")

  useEffect(() => {
    const updateCurrency = (event) => {
      if (event.detail === "USD" || event.detail === "VES") {
        setCurrency(event.detail)
      }
    }

    window.addEventListener("internal-currency-change", updateCurrency)
    return () => window.removeEventListener("internal-currency-change", updateCurrency)
  }, [])

  const openImport = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("internal-open-import"))
    }
  }

  const toggleCurrency = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("internal-toggle-currency"))
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-[72px] items-center gap-3 px-5 lg:px-8">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:inline-flex"
          aria-label={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
          title={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Mostrar menú lateral"
          title="Mostrar menú lateral"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-4">
          <h1 className="truncate text-xl font-semibold tracking-[-0.02em] text-slate-950">
            {activeLabel}
          </h1>
          {isCalculator ? (
            <div className="hidden h-5 w-px bg-slate-200 sm:block" />
          ) : null}
          {isCalculator ? (
            <div className="hidden truncate text-sm text-slate-500 sm:block">
              Vision One · Credit Calculator
            </div>
          ) : null}
        </div>

        <label className="hidden h-10 w-[360px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500 shadow-sm xl:flex">
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="truncate">Buscar cliente, análisis o producto...</span>
        </label>

        {isCalculator ? (
          <button
            type="button"
            onClick={toggleCurrency}
            className="hidden h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 md:inline-flex"
          >
            {currency}
            <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
          </button>
        ) : null}

        {isCalculator ? (
          <button
            type="button"
            onClick={openImport}
            className="hidden h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm shadow-blue-950/20 hover:bg-blue-700 md:inline-flex"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            Importar cotización
          </button>
        ) : null}

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-slate-900"
          aria-label="Alertas mock"
          title="Alertas mock"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex h-10 items-center gap-2 rounded-full px-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
            NC
          </span>
          <ChevronDown className="hidden h-4 w-4 sm:block" aria-hidden="true" />
          <LogOut className="h-4 w-4 sm:hidden" aria-hidden="true" />
        </button>
      </div>

    </header>
  )
}
