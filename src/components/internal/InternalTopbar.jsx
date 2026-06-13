import { useEffect, useRef, useState } from "react"
import { Bell, Check, ChevronDown, DollarSign, LogOut, Menu, Search, Upload } from "lucide-react"

import { internalShellSections } from "./InternalSidebar"
import { cn } from "@/lib/utils"

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
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false)
  const currencyMenuRef = useRef(null)

  useEffect(() => {
    const updateCurrency = (event) => {
      if (event.detail === "USD" || event.detail === "VES") {
        setCurrency(event.detail)
      }
    }

    window.addEventListener("internal-currency-change", updateCurrency)
    return () => window.removeEventListener("internal-currency-change", updateCurrency)
  }, [])

  useEffect(() => {
    if (!currencyMenuOpen) return undefined

    const closeCurrencyMenu = (event) => {
      if (currencyMenuRef.current?.contains(event.target)) return
      setCurrencyMenuOpen(false)
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setCurrencyMenuOpen(false)
    }

    document.addEventListener("mousedown", closeCurrencyMenu)
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("mousedown", closeCurrencyMenu)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [currencyMenuOpen])

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

  const selectCurrency = (nextCurrency) => {
    if (nextCurrency !== currency) {
      toggleCurrency()
    }
    setCurrencyMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="flex h-[72px] items-center gap-2 px-5 lg:px-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="hidden h-8 w-8 appearance-none items-center justify-center rounded-lg border-0 bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:inline-flex"
          aria-label={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
          title={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-9 w-9 appearance-none items-center justify-center rounded-lg border-0 bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Mostrar menú lateral"
          title="Mostrar menú lateral"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-4">
          <h1 className="truncate text-[20px] font-semibold tracking-[-0.02em] text-slate-950">
            {activeLabel}
          </h1>
          {isCalculator ? (
            <div className="hidden h-5 w-px bg-slate-200 sm:block" />
          ) : null}
          {isCalculator ? (
            <div className="hidden truncate text-[13px] text-slate-500 sm:block">
              Vision One · Credit Calculator
            </div>
          ) : null}
        </div>

        <label className="hidden h-10 w-[320px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[13px] text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.04)] xl:flex">
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="truncate">Buscar cliente, análisis o producto...</span>
        </label>

        {isCalculator ? (
          <div ref={currencyMenuRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setCurrencyMenuOpen((open) => !open)}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-[13px] font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-slate-300 hover:bg-white hover:text-slate-950"
              aria-haspopup="menu"
              aria-expanded={currencyMenuOpen}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <DollarSign className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="text-slate-500">Moneda:</span>
              <span className="font-semibold text-slate-950">{currency}</span>
              <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform", currencyMenuOpen && "rotate-180")} aria-hidden="true" />
            </button>

            {currencyMenuOpen ? (
              <div
                className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
                role="menu"
              >
                {[
                  { code: "USD", label: "Dólares" },
                  { code: "VES", label: "Bolívares" },
                ].map((option) => {
                  const isSelected = currency === option.code

                  return (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => selectCurrency(option.code)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 border-0 bg-transparent px-3 py-2.5 text-left text-[13px] hover:bg-slate-50",
                        isSelected ? "text-blue-700" : "text-slate-700"
                      )}
                      role="menuitemradio"
                      aria-checked={isSelected}
                    >
                      <span className="min-w-0">
                        <span className="font-semibold text-slate-950">{option.code}</span>
                        <span className="ml-2 text-slate-500">{option.label}</span>
                      </span>
                      {isSelected ? <Check className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" /> : null}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>
        ) : null}

        {isCalculator ? (
          <button
            type="button"
            onClick={openImport}
            className="hidden h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(37,99,235,0.22)] hover:bg-blue-700 md:inline-flex"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            Importar cotización
          </button>
        ) : null}

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:bg-slate-50 hover:text-slate-900"
          aria-label="Alertas mock"
          title="Alertas mock"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex h-10 appearance-none items-center gap-2 rounded-full border-0 bg-transparent px-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
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
