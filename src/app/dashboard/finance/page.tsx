import { FinanceDashboard } from "@/components/dashboard/finance-dashboard"

export default function FinancePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-teal-700 to-sky-700 p-10 text-white shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">Fiscal Command Center</h2>
          <p className="text-emerald-100/80 max-w-md font-medium mt-2 italic">Institutional revenue auditing, student fee lifecycle, and real-time financial health monitoring.</p>
        </div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      <div className="px-1 pt-4">
        <FinanceDashboard />
      </div>
    </div>
  )
}
