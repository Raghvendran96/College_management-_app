import { Suspense } from "react"
import { HelpView } from "@/components/dashboard/help-view"
import { Separator } from "@/components/ui/separator"

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Learn how to get the most out of the College Management System on web and mobile.
        </p>
      </div>
      <Separator />
      <Suspense fallback={<div>Loading help...</div>}>
        <HelpView />
      </Suspense>
    </div>
  )
}
