import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CircleDollarSign,
  LineChart,
  UserRound,
} from "lucide-react"

const kpis = [
  {
    label: "Ventas Trend del mes",
    value: "$84,250",
    delta: "+12.4%",
    detail: "Pipeline mock local",
    icon: CircleDollarSign,
  },
  {
    label: "Margen estimado",
    value: "27.8%",
    delta: "+3.1 pts",
    detail: "Promedio preliminar",
    icon: LineChart,
  },
  {
    label: "Créditos vendidos",
    value: "128,400",
    delta: "+18%",
    detail: "Trend Vision One",
    icon: ArrowUpRight,
  },
  {
    label: "Negocios cerrados",
    value: "9",
    delta: "+2",
    detail: "Mes actual",
    icon: BriefcaseBusiness,
  },
]

const opportunities = [
  {
    client: "Cliente financiero regional",
    stage: "Renovación",
    product: "Endpoint Security Pro",
    amount: "$22,400",
    owner: "Ventas Nextcom",
  },
  {
    client: "Grupo retail",
    stage: "Upsell",
    product: "XDR for Email",
    amount: "$14,850",
    owner: "Preventa",
  },
  {
    client: "Operador logístico",
    stage: "Evaluación",
    product: "Zero Trust Secure Access",
    amount: "$31,000",
    owner: "Gerencia comercial",
  },
]

export function InternalDashboardMock({ activeSection }) {
  const sectionTitle = {
    dashboard: "Dashboard comercial",
    saved: "Análisis guardados",
    closed: "Negocios cerrados",
    clients: "Clientes",
    admin: "Usuarios/Admin",
  }[activeSection]

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 bg-neutral-50/70 p-4 sm:p-5 lg:p-6">
      <section className="rounded-lg border border-neutral-200/80 bg-white p-4 shadow-sm shadow-neutral-950/[0.03]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Mock local
            </p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              {sectionTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
              Vista preliminar sin base de datos, usuarios reales ni cambios a la
              calculadora. Estos datos sirven solo para validar dirección visual.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border border-neutral-200/80 bg-neutral-50 px-3 py-2 text-xs font-medium text-neutral-600">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Mes actual
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.label}
              className="rounded-lg border border-neutral-200/80 bg-white p-4 shadow-sm shadow-neutral-950/[0.03]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                  {item.delta}
                </span>
              </div>
              <p className="mt-4 text-sm font-medium text-neutral-500">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-neutral-950">{item.value}</p>
              <p className="mt-1 text-xs text-neutral-500">{item.detail}</p>
            </article>
          )
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-lg border border-neutral-200/80 bg-white shadow-sm shadow-neutral-950/[0.03]">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h3 className="text-sm font-semibold text-neutral-950">
              Oportunidades destacadas
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Tabla mock para validar layout de reportes.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-neutral-50 text-xs uppercase tracking-[0.08em] text-neutral-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Cliente</th>
                  <th className="px-5 py-3 font-semibold">Etapa</th>
                  <th className="px-5 py-3 font-semibold">Producto</th>
                  <th className="px-5 py-3 text-right font-semibold">Monto</th>
                  <th className="px-5 py-3 font-semibold">Responsable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {opportunities.map((item) => (
                  <tr key={item.client}>
                    <td className="px-5 py-4 font-medium text-neutral-950">{item.client}</td>
                    <td className="px-5 py-4 text-neutral-600">{item.stage}</td>
                    <td className="px-5 py-4 text-neutral-600">{item.product}</td>
                    <td className="px-5 py-4 text-right font-semibold text-neutral-950">
                      {item.amount}
                    </td>
                    <td className="px-5 py-4 text-neutral-600">{item.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-lg border border-neutral-200/80 bg-white p-4 shadow-sm shadow-neutral-950/[0.03]">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
            <UserRound className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-neutral-950">
            Próximas piezas reales
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-600">
            <li>Persistencia de análisis guardados.</li>
            <li>Modelo de clientes y oportunidades.</li>
            <li>Roles internos con permisos reales.</li>
            <li>Reportes por vendedor, producto, margen y fecha.</li>
          </ul>
        </aside>
      </section>
    </div>
  )
}
