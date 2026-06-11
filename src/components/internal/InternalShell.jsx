import { useState } from "react"

import { InternalDashboardMock } from "./InternalDashboardMock"
import { InternalSidebar } from "./InternalSidebar"
import { InternalTopbar } from "./InternalTopbar"

export function InternalShell({ children, onLogout }) {
  const [activeSection, setActiveSection] = useState("calculator")

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="flex min-h-screen">
        <InternalSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <InternalTopbar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onLogout={onLogout}
          />

          <main className="min-w-0 flex-1">
            {activeSection === "calculator" ? (
              <div className="bg-white">{children}</div>
            ) : (
              <InternalDashboardMock activeSection={activeSection} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
