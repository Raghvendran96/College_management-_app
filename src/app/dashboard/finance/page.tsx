import { FinanceDashboard } from "@/components/dashboard/finance-dashboard"
import { Separator } from "@/components/ui/separator"

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Finance Management</h1>
        <p className="text-muted-foreground">
          Track course fees, payment status, and overdue accounts by class and student.
        </p>
      </div>
      <Separator />
      <FinanceDashboard />
    </div>
  )
}
