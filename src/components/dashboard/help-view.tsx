"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Apple, Smartphone, Laptop, ShieldCheck, Mail, BookOpen, Download, Beaker, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

export function HelpView() {
  const searchParams = useSearchParams()
  const section = searchParams.get("section")

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 print:hidden">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Laptop className="h-5 w-5 text-primary" />
              Website Portal Guide
            </CardTitle>
            <CardDescription>How to use the CMS on your desktop or laptop.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>• Access all management tools with a mouse-optimized layout.</p>
            <p>• Detailed data tables and analytics dashboards.</p>
            <p>• Direct CSV and PDF exports for institution reporting.</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-500" />
              Mobile App (PWA) Guide
            </CardTitle>
            <CardDescription>Install the CMS as a native app on your phone.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>• Faster loading and dedicated home screen icon.</p>
            <p>• Standalone mode (removes browser bars).</p>
            <p>• Instant access to grades, fees, and AI Tutor on the go.</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 print:hidden">
          <ShieldCheck className="h-5 w-5 text-green-600" />
          Interactive User Guide
        </h2>
        
        <Accordion type="single" collapsible className="w-full" defaultValue={section || undefined}>
          <AccordionItem value="demo" className="bg-amber-50/50 px-4 rounded-lg border-amber-200">
            <AccordionTrigger className="text-lg text-amber-800 hover:no-underline">
              <span className="flex items-center gap-2">
                <Beaker className="h-5 w-5" />
                🚀 QUICK DEMO SHEET (Login Details)
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-2 pb-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-white border rounded-lg shadow-sm">
                  <p className="font-bold text-lg mb-1">👨‍💼 Administrator</p>
                  <p className="text-sm text-muted-foreground mb-3">Full control over branding and finances.</p>
                  <div className="text-xs space-y-1 font-mono bg-muted p-2 rounded">
                    <p>User: admin@college.edu</p>
                    <p>Pass: admin123</p>
                  </div>
                </div>
                <div className="p-4 bg-white border rounded-lg shadow-sm">
                  <p className="font-bold text-lg mb-1">👩‍🏫 Teacher</p>
                  <p className="text-sm text-muted-foreground mb-3">Grade assignments and manage courses.</p>
                  <div className="text-xs space-y-1 font-mono bg-muted p-2 rounded">
                    <p>User: teacher@college.edu</p>
                    <p>Pass: teacher123</p>
                  </div>
                </div>
                <div className="p-4 bg-white border rounded-lg shadow-sm">
                  <p className="font-bold text-lg mb-1">🎓 Student</p>
                  <p className="text-sm text-muted-foreground mb-3">Submit work and use the AI Tutor.</p>
                  <div className="text-xs space-y-1 font-mono bg-muted p-2 rounded">
                    <p>User: student@college.edu</p>
                    <p>Pass: student123</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-l-4 border-amber-400 bg-amber-100/50 rounded-r-lg">
                <p className="text-sm font-semibold text-amber-900 mb-1 flex items-center gap-2">
                  <KeyRound className="h-4 w-4" />
                  Testing Instructions:
                </p>
                <ul className="text-xs text-amber-800 list-disc ml-4 space-y-1">
                  <li>Login as <strong>Admin</strong> to upload a custom logo in Settings.</li>
                  <li>Login as <strong>Student</strong> to upload a PDF to the AI Tutor.</li>
                  <li>Login as <strong>Teacher</strong> to grade the student's submission.</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="admin">
            <AccordionTrigger className="text-lg">👨‍💼 Administrator Manual</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <p className="font-semibold text-primary">Branding & System Mode</p>
                <p>Use the <strong>Settings</strong> tab to upload your logo and toggle between Demo and Live mode. The "Clean Software" tool in the Danger Zone wipes all demo data for a fresh start.</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-primary">Finance & Fees</p>
                <p>Monitor overdue payments and export CSV reports. You can also send automated email reminders directly from the table.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="teacher">
            <AccordionTrigger className="text-lg">👩‍🏫 Faculty / Teacher Portal</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <p className="font-semibold text-primary">Grading Workflow</p>
                <p>Review student files and submit grades. The system will automatically notify the student via email.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="mobile">
            <AccordionTrigger className="text-lg">📱 Mobile App Installation (PWA)</AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <div className="flex gap-4 items-start bg-muted/50 p-4 rounded-lg">
                <Apple className="h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold">Apple iOS (iPhone/iPad)</p>
                  <ol className="list-decimal ml-4 mt-1 space-y-1 text-sm">
                    <li>Open this website in <strong>Safari</strong>.</li>
                    <li>Tap the <strong>Share</strong> button.</li>
                    <li>Select <strong>"Add to Home Screen"</strong>.</li>
                  </ol>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="p-6 border rounded-xl bg-muted/30 flex items-center justify-between print:hidden">
        <div>
          <h3 className="font-bold flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Export Documentation
          </h3>
          <p className="text-sm text-muted-foreground">Download the entire manual and demo guide as a PDF.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.print()}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF Manual
          </Button>
        </div>
      </div>
    </div>
  )
}
