import { useState } from "react"

import { InternalDashboardMock } from "./InternalDashboardMock"
import { InternalSidebar } from "./InternalSidebar"
import { InternalTopbar } from "./InternalTopbar"

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
              <InternalDashboardMock activeSection={activeSection} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
