"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Apple, 
  Smartphone, 
  Laptop, 
  ShieldCheck, 
  Mail, 
  BookOpen, 
  Download, 
  Beaker, 
  KeyRound, 
  Users, 
  FileText, 
  Rocket, 
  Database,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

export function HelpView() {
  const searchParams = useSearchParams()
  const section = searchParams.get("section")

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32">
      {/* HIGH-IMPACT HEADER */}
      <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 to-sky-950 p-12 text-white shadow-2xl">
         <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-black uppercase text-[10px] tracking-[0.3em]">
               <ShieldCheck className="h-4 w-4" />
               Institutional Knowledge Hub
            </div>
            <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">Help &<br /><span className="text-sky-500">Manual.</span></h2>
            <p className="text-sky-300/80 max-w-lg font-medium italic text-lg mt-6">The authoritative reference for managing the institutional lattice, faculty auditing, and production deployment.</p>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 print:hidden">
        <Card className="rounded-[2.5rem] border-sky-100 shadow-xl bg-white group hover:shadow-2xl transition-all">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl font-black italic text-sky-950">
               <Laptop className="h-6 w-6 text-sky-500" />
               Website Portal Guide
            </CardTitle>
            <CardDescription className="text-sky-400 font-bold uppercase text-[9px] tracking-widest italic pt-1">Desktop & Laptop Ingestion</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10 text-sm space-y-3 font-medium text-slate-500 italic">
            <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Access all management tools with an optimized enterprise layout.</p>
            <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> High-fidelity data tables and master analytics dashboards.</p>
            <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Professional CSV and PDF exports for institution-wide reporting.</p>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-indigo-100 shadow-xl bg-white group hover:shadow-2xl transition-all">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl font-black italic text-sky-950">
               <Smartphone className="h-6 w-6 text-indigo-500" />
               Mobile App (PWA)
            </CardTitle>
            <CardDescription className="text-indigo-400 font-bold uppercase text-[9px] tracking-widest italic pt-1">iOS & Android PWA Sync</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10 text-sm space-y-3 font-medium text-slate-500 italic">
            <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Faster loading with dedicated home screen icon and splash logic.</p>
            <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Standalone mode for an immersive, native campus experience.</p>
            <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Instant access to grades, fees, and AI Tutor on-the-go.</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black italic text-sky-950 tracking-tighter uppercase flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-sky-500" />
          Interactive System Guide
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={section || undefined}>
          <AccordionItem value="demo" className="bg-sky-50/50 px-8 rounded-[2.5rem] border-sky-100 shadow-lg">
            <AccordionTrigger className="text-xl text-sky-950 font-black italic uppercase tracking-tighter py-6 hover:no-underline hover:text-sky-500 transition-colors">
              <span className="flex items-center gap-3">
                <Beaker className="h-6 w-6" />
                🏆 Flagship Demo Credentials
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-8 pb-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-6 bg-white border border-sky-100 rounded-[2rem] shadow-xl shadow-sky-900/5 space-y-4">
                  <p className="font-black italic text-xl text-sky-950 uppercase border-b border-sky-50 pb-2">Administrator</p>
                  <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest leading-none">Full Institutional Control</p>
                  <div className="text-xs space-y-2 font-black italic bg-sky-50/50 p-4 rounded-xl border border-sky-100 text-sky-950">
                    <p className="flex justify-between">USER: <span className="text-sky-600">admin@college.edu</span></p>
                    <p className="flex justify-between">PASS: <span className="text-sky-600">admin123</span></p>
                  </div>
                </div>
                <div className="p-6 bg-white border border-sky-100 rounded-[2rem] shadow-xl shadow-sky-900/5 space-y-4">
                  <p className="font-black italic text-xl text-sky-950 uppercase border-b border-sky-50 pb-2">Faculty</p>
                  <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest leading-none">Grading & Auditing Node</p>
                  <div className="text-xs space-y-2 font-black italic bg-sky-50/50 p-4 rounded-xl border border-sky-100 text-sky-950">
                    <p className="flex justify-between">USER: <span className="text-sky-600">teacher@college.edu</span></p>
                    <p className="flex justify-between">PASS: <span className="text-sky-600">teacher123</span></p>
                  </div>
                </div>
                <div className="p-6 bg-white border border-sky-100 rounded-[2rem] shadow-xl shadow-sky-900/5 space-y-4">
                  <p className="font-black italic text-xl text-sky-950 uppercase border-b border-sky-50 pb-2">Scholar</p>
                  <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest leading-none">Study Lab & AI Sync</p>
                  <div className="text-xs space-y-2 font-black italic bg-sky-50/50 p-4 rounded-xl border border-sky-100 text-sky-950">
                    <p className="flex justify-between">USER: <span className="text-sky-600">student@college.edu</span></p>
                    <p className="flex justify-between">PASS: <span className="text-sky-600">student123</span></p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="admin" className="bg-white px-8 rounded-[2.5rem] border border-sky-100 shadow-xl">
            <AccordionTrigger className="text-xl text-sky-950 font-black italic uppercase tracking-tighter py-6 hover:no-underline">👨‍💼 Administrator Manual</AccordionTrigger>
            <AccordionContent className="space-y-6 pb-8 border-t border-sky-50 pt-6">
              <div className="grid md:grid-cols-2 gap-6 text-sm font-medium italic text-slate-500">
                <div className="space-y-2 p-6 rounded-2xl bg-sky-50 border border-sky-100">
                  <p className="font-black text-sky-950 uppercase text-[10px] tracking-widest italic flex items-center gap-2"><Users className="h-4 w-4" /> Faculty Hub Management</p>
                  <p>Audit faculty performance ratings and provision new nodal instructors directly from the <strong>Faculty Directory</strong>. Management is real-time and synchronized.</p>
                </div>
                <div className="space-y-2 p-6 rounded-2xl bg-sky-50 border border-sky-100">
                  <p className="font-black text-sky-950 uppercase text-[10px] tracking-widest italic flex items-center gap-2"><FileText className="h-4 w-4" /> Global Exams Audit</p>
                  <p>Configure semester schedules and publish global CGPA pulse results. Scholar Hall Tickets are generated 7 days before primary audit nodes.</p>
                </div>
                <div className="space-y-2 p-6 rounded-2xl bg-sky-50 border border-sky-100">
                   <p className="font-black text-sky-950 uppercase text-[10px] tracking-widest italic flex items-center gap-2"><Rocket className="h-4 w-4" /> Production 'Go Live'</p>
                   <p>Use the <strong>Settings</strong> danger zone to capture your Institute Name and Logo. Launching will purge all simulated Demo data permanently.</p>
                </div>
                <div className="space-y-2 p-6 rounded-2xl bg-sky-50 border border-sky-100">
                   <p className="font-black text-sky-950 uppercase text-[10px] tracking-widest italic flex items-center gap-2"><Database className="h-4 w-4" /> CSV Mass Ingestion</p>
                   <p>Populate your campus clusters instantly using the <strong>CSV Hub</strong> in the Onboarding Wizard. Download headers for Student and Faculty registries.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="teacher" className="bg-white px-8 rounded-[2.5rem] border border-sky-100 shadow-xl">
            <AccordionTrigger className="text-xl text-sky-950 font-black italic uppercase tracking-tighter py-6 hover:no-underline">👩‍🏫 Faculty Executive Portal</AccordionTrigger>
            <AccordionContent className="space-y-4 pb-8 border-t border-sky-50 pt-6">
               <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 text-sm font-medium italic text-slate-500">
                  <p className="font-black text-indigo-950 uppercase text-[10px] tracking-widest italic mb-2">Academic Audit Protocol</p>
                  <p>Teachers can now access the <strong>Faculty Directory</strong> to view colleagues and the <strong>Exams Audit</strong> to review class performance pulses. Grading logic features AI-assisted verification.</p>
               </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="p-12 rounded-[4rem] bg-sky-950 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-10">
           <Download className="h-32 w-32" />
        </div>
        <div className="space-y-2 relative z-10 text-center md:text-left">
          <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Official <span className="text-sky-400">V11 Manual.</span></h3>
          <p className="text-sky-300/60 font-bold uppercase text-[10px] tracking-[0.4em] italic pt-2">Definitive Institutional Knowledge Registry</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full md:w-auto">
          <Button 
            onClick={() => window.open('/KBITM_CMS_OFFICIAL_GUIDE.html', '_blank')}
            className="flex-1 md:flex-none h-16 px-10 rounded-2xl bg-white text-sky-950 font-black italic uppercase text-xs tracking-widest hover:bg-sky-400 transition-all shadow-2xl active:scale-95 group"
          >
            Launch Official V11 Guide
            <ExternalLink className="ml-3 h-4 w-4 group-hover:scale-125 transition-transform" />
          </Button>
          <Button 
             variant="outline" 
             onClick={() => window.print()}
             className="flex-1 md:flex-none h-16 px-8 rounded-2xl border-white/20 hover:bg-white/10 text-white font-black italic uppercase text-xs tracking-widest"
          >
            <Download className="h-4 w-4 mr-2" /> Print PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
