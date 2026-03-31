import { cookies } from "next/headers"
import Link from "next/link"
import { 
  Bot, 
  Sparkles, 
  GraduationCap, 
  Search, 
  MessageSquare, 
  Zap, 
  Brain, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AiTutor } from "@/components/dashboard/ai-tutor"

export default async function AiSuitePage() {
  const cookieStore = await cookies()
  const role = cookieStore.get("userRole")?.value || "student"

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1200 pb-32">
      <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-indigo-950 to-sky-950 p-12 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-black uppercase text-[10px] tracking-[0.3em]">
                 <Sparkles className="h-4 w-4 animate-pulse" />
                 Integrated Gemini AI Engine
              </div>
              <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">Institutional<br /><span className="text-sky-500">Intelligence.</span></h2>
              <p className="text-sky-300/80 max-w-lg font-medium italic text-lg mt-6">Next-generation cognitive automation for scholars and faculty. Built with military-grade privacy and real-time document analysis.</p>
           </div>
           
           <div className="hidden md:flex gap-4">
              <div className="p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center text-center space-y-4 group hover:bg-sky-500 transition-all cursor-pointer">
                 <div className="p-5 rounded-3xl bg-sky-500 shadow-xl group-hover:bg-white group-hover:text-sky-600 transition-colors">
                    <Brain className="h-8 w-8 text-white group-hover:text-sky-600" />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 group-hover:text-white">Cognitive Load</p>
                 <p className="text-3xl font-black italic tracking-tighter group-hover:text-white italic">Level 04</p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center text-center space-y-4 hover:bg-indigo-600 transition-all cursor-pointer group">
                 <div className="p-5 rounded-3xl bg-indigo-500 shadow-xl group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                    <Cpu className="h-8 w-8 text-white group-hover:text-indigo-600" />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 group-hover:text-white">Neural Speed</p>
                 <p className="text-3xl font-black italic tracking-tighter group-hover:text-white italic">14ms</p>
              </div>
           </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-10 translate-x-10 w-[500px] h-[500px] bg-sky-400/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="grid lg:grid-cols-7 gap-10">
         <Card className="lg:col-span-4 border-sky-100 shadow-xl rounded-[3rem] overflow-hidden bg-white/50 backdrop-blur-xl group">
             <CardHeader className="bg-sky-50/50 p-10 border-b border-sky-100 flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-sky-950 font-black italic flex items-center gap-2 text-3xl">
                      <MessageSquare className="h-6 w-6 text-sky-600" /> Neural Scholar Lab
                   </CardTitle>
                   <CardDescription className="text-sky-400 font-bold uppercase text-[10px] tracking-widest mt-2">Active cognitive session (G-903-X)</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/20"></div>
                   <span className="text-[10px] font-black italic text-emerald-600 uppercase tracking-widest">Connected</span>
                </div>
             </CardHeader>
             <CardContent className="p-10 bg-slate-50/10 min-h-[500px]">
                <AiTutor />
             </CardContent>
         </Card>

         <div className="lg:col-span-3 space-y-8 flex flex-col justify-between h-full">
            <Card className="border-sky-100 shadow-xl rounded-[3rem] overflow-hidden bg-white/50 backdrop-blur-xl p-10 group hover:shadow-2xl transition-all h-full">
                <div className="space-y-10">
                   <div className="flex items-center justify-between">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                         <Zap className="h-7 w-7" />
                      </div>
                      <Badge className="bg-indigo-100 text-indigo-700 font-black text-[10px] italic tracking-widest px-4 py-1.5 uppercase">Premium Intelligence</Badge>
                   </div>
                   
                   <div className="space-y-4">
                      <h3 className="text-4xl font-black italic text-sky-950 tracking-tighter leading-none">Global AI Insights</h3>
                      <p className="text-sky-700/60 font-medium italic text-lg">Use high-end cognitive kernels to analyze assignments, project scopes, and research patterns instantly.</p>
                   </div>

                   <div className="space-y-6 pt-6 border-t border-sky-50">
                      {[
                        { icon: ShieldCheck, title: "Private Compute", val: "Enforced" },
                        { icon: Globe, title: "Language Coverage", val: "Wide" },
                        { icon: TrendingUp, title: "Accuracy Probability", val: "99.4%" },
                      ].map((f, i) => (
                        <div key={i} className="flex items-center justify-between text-sky-950">
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-sky-50 rounded-2xl text-sky-500 font-black italic group-hover:text-indigo-600 transition-colors">
                                 <f.icon className="h-5 w-5" />
                              </div>
                              <span className="font-bold text-sm italic">{f.title}</span>
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 italic">{f.val}</span>
                        </div>
                      ))}
                   </div>

                   <Link href="/dashboard/settings" className="w-full inline-block">
                     <Button className="w-full h-16 rounded-2xl bg-sky-950 hover:bg-black text-white font-black italic text-lg uppercase tracking-tighter shadow-2xl shadow-sky-950/20 active:scale-95 transition-all group">
                        Upgrade Intelligence Node
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                     </Button>
                   </Link>
                </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
