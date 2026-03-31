import { BookOpen, ShieldCheck, Zap, Mail, Lock, User, CheckCircle2, FileText, Download, Play, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HelpDocPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1200 pb-32">
       {/* MASTER HELP HEADER */}
       <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-sky-900 to-indigo-950 p-12 text-white shadow-2xl">
          <div className="relative z-10 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-black uppercase text-[10px] tracking-[0.3em]">
                <ShieldCheck className="h-4 w-4" />
                Integrated Institutional Guide
             </div>
             <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">Master Hub<br /><span className="text-sky-500">Knowledge node.</span></h2>
             <p className="text-sky-300/80 max-w-lg font-medium italic text-lg mt-6">All features, role credentials, and institutional workflows curated for instant onboarding and deployment.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-[100px] animate-pulse"></div>
       </div>

       {/* QUICK DEMO CREDENTIALS SHEET */}
       <div id="demo" className="scroll-mt-20">
          <Card className="border-sky-100 shadow-2xl rounded-[3rem] overflow-hidden bg-white/50 backdrop-blur-xl transition-all">
             <CardHeader className="bg-sky-50/50 p-10 border-b border-sky-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <CardTitle className="text-sky-950 font-black italic flex items-center gap-2 text-3xl">
                     <Play className="h-6 w-6 text-sky-600 fill-sky-600" /> Executive Demo Sheet
                  </CardTitle>
                  <CardDescription className="text-sky-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Authorized test credentials for all roles</CardDescription>
                </div>
                <Button className="rounded-2xl h-14 bg-sky-950 hover:bg-black text-white font-black italic uppercase text-xs tracking-widest px-8 shadow-xl shadow-sky-950/20">
                   <Download className="mr-2 h-4 w-4" /> Download Documentation (DOCX)
                </Button>
             </CardHeader>
             <CardContent className="p-10 space-y-10">
                <div className="grid md:grid-cols-3 gap-6">
                   {[
                     { role: "Super Admin", mail: "admin@college.edu", pass: "admin123", desc: "Full control over Finance & Settings" },
                     { role: "Principal Faculty", mail: "teacher@college.edu", pass: "admin123", desc: "Grading & Attendance Hub" },
                     { role: "Scholar Node", mail: "student@college.edu", pass: "admin123", desc: "GPA Tracker & AI Study Lab" },
                   ].map((c, i) => (
                      <div key={i} className="p-8 rounded-[2.5rem] border border-sky-50 bg-white shadow-sm hover:shadow-xl transition-all group hover:-translate-y-2">
                         <div className="flex items-center gap-2 mb-6">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <p className="text-[10px] font-black uppercase text-sky-300 tracking-widest">{c.role} ID</p>
                         </div>
                         <div className="space-y-4 mb-6">
                            <div className="space-y-1">
                               <p className="text-[10px] font-black uppercase text-sky-400 tracking-widest">Interface Email</p>
                               <div className="flex items-center gap-2 text-sm font-bold text-sky-950 italic">
                                  <Mail className="h-3 w-3 text-sky-300" /> {c.mail}
                               </div>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] font-black uppercase text-sky-400 tracking-widest">Entry Password</p>
                               <div className="flex items-center gap-2 text-sm font-bold text-sky-950 italic">
                                  <Lock className="h-3 w-3 text-sky-300" /> {c.pass}
                               </div>
                            </div>
                         </div>
                         <p className="text-[10px] text-sky-700/60 font-medium italic opacity-80">{c.desc}</p>
                      </div>
                   ))}
                </div>
             </CardContent>
          </Card>
       </div>

       {/* FEATURE DIRECTORY */}
       <div className="grid md:grid-cols-2 gap-10">
          <Card className="border-sky-100 shadow-xl rounded-[2.5rem] h-full">
             <CardHeader className="p-10 border-b border-sky-50">
                <CardTitle className="text-sky-950 font-black italic text-2xl uppercase tracking-tighter">Operational Modules</CardTitle>
             </CardHeader>
             <CardContent className="p-10 space-y-6">
                {[
                  { title: "Institutional Settings", desc: "Customize Logo, Name and Demo Mode flags." },
                  { title: "Department Hub", desc: "Full CRUD management for college departments." },
                  { title: "AI Neural Suite", desc: "Integrated Gemini AI for document interaction." },
                  { title: "Fiscal Hub", desc: "Emerald-themed student fee and revenue tracking." },
                ].map((f, i) => (
                   <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white transition-all">
                      <Zap className="h-5 w-5 text-sky-500" />
                      <div>
                         <p className="text-sm font-bold text-sky-950 italic">{f.title}</p>
                         <p className="text-xs font-medium text-sky-700/60 leading-relaxed mt-1 italic">{f.desc}</p>
                      </div>
                   </div>
                ))}
             </CardContent>
          </Card>

          <Card className="border-sky-100 shadow-xl rounded-[2.5rem] bg-amber-950 text-white p-10 h-full">
              <div className="space-y-6">
                 <AlertCircle className="h-10 w-10 text-amber-500" />
                 <h3 className="text-4xl font-black italic tracking-tighter">Danger Zone Checklist</h3>
                 <p className="text-amber-200/60 font-medium italic">Before you use the 'Go Live' feature, ensure you have verified the following:</p>
                 <div className="space-y-4 pt-6 text-sm font-bold italic text-amber-100">
                    <p>• All college metadata is correctly updated.</p>
                    <p>• Department Node Masters are initialized.</p>
                    <p>• Financial auditing windows are set to production.</p>
                    <p>• You have a safe copy of your New Super Admin credentials.</p>
                 </div>
              </div>
          </Card>
       </div>
    </div>
  )
}
