import { 
  School, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Flag,
  Award,
  BookOpen,
  Building
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"

export default function CollegeHubPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1200 pb-32">
       {/* MASTER BRANDING HEADER */}
       <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-sky-950 via-indigo-950 to-slate-900 p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
             <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-black uppercase text-[10px] tracking-[0.3em]">
                   <Flag className="h-4 w-4" />
                   Institutional Master Node
                </div>
                <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">Campus<br /><span className="text-sky-500">Identity.</span></h2>
                <p className="text-sky-300/80 max-w-lg font-medium italic text-lg mt-6">The definitive master-control for campus branding, legal metadata, and institutional health across the entire academic ecosystem.</p>
             </div>
             
             <div className="w-56 h-56 bg-sky-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-sky-600/30 rotate-6 group border-[10px] border-white/10">
                <School className="h-24 w-24 text-white group-hover:scale-110 transition-transform duration-700" />
             </div>
          </div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-[120px]"></div>
       </div>

       {/* CORE CAMPUS METRICS */}
       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Scholars", val: "1,240", icon: Users, color: "sky" },
            { label: "Global Ranking", val: "#42", icon: Award, color: "indigo" },
            { label: "Campus Nodes", val: "04", icon: MapPin, color: "emerald" },
            { label: "Accreditation", val: "A++", icon: ShieldCheck, color: "amber" },
          ].map((s, i) => (
             <Card key={i} className="border-sky-100 rounded-[2rem] overflow-hidden group hover:shadow-2xl transition-all h-full bg-white/50 backdrop-blur-xl">
                <CardContent className="p-8 space-y-4">
                   <div className={`w-12 h-12 rounded-2xl bg-${s.color}-50 flex items-center justify-center text-${s.color}-600 shadow-inner group-hover:scale-110 transition-transform`}>
                      <s.icon className="h-5 w-5" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-sky-400 tracking-widest">{s.label}</p>
                      <p className="text-3xl font-black italic tracking-tighter text-sky-950 italic">{s.val}</p>
                   </div>
                </CardContent>
             </Card>
          ))}
       </div>

       <div className="grid lg:grid-cols-7 gap-10">
          {/* Institutional Metadata */}
          <Card className="lg:col-span-4 border-sky-100 shadow-xl rounded-[3rem] overflow-hidden bg-white/50 backdrop-blur-xl group">
             <CardHeader className="bg-sky-50/50 p-10 border-b border-sky-100 flex flex-row items-center justify-between">
                <CardTitle className="text-sky-950 font-black italic flex items-center gap-2 text-2xl uppercase tracking-tighter">
                   <Building className="h-6 w-6 text-sky-600" /> Legal & Branding Core
                </CardTitle>
                <Button className="rounded-xl h-10 px-4 bg-white/50 hover:bg-white text-sky-600 font-black text-[10px] uppercase border border-sky-100 transition-all">Update Nodes</Button>
             </CardHeader>
             <CardContent className="p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       {[
                         { icon: Globe, label: "Digital Domain", val: "www.college.edu" },
                         { icon: Mail, label: "Official Node", val: "contact@college.edu" },
                         { icon: Phone, label: "Public Link", val: "+91 000-111-2222" },
                       ].map((item, i) => (
                          <div key={i} className="flex items-center gap-5">
                             <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 shadow-sm">
                                <item.icon className="h-4 w-4" />
                             </div>
                             <div>
                                <p className="text-[9px] font-black uppercase text-sky-300 tracking-[0.2em]">{item.label}</p>
                                <p className="text-sm font-bold text-sky-950 italic">{item.val}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                    <div className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 flex flex-col justify-between">
                       <p className="text-[10px] font-black uppercase text-sky-400 tracking-widest mb-4">Official Accreditation</p>
                       <div className="space-y-2">
                          <p className="text-2xl font-black italic text-sky-950 leading-none">University AI Grant</p>
                          <p className="text-xs font-bold text-sky-400">Valid until Dec 2029 • Node #903-X</p>
                       </div>
                    </div>
                </div>
             </CardContent>
          </Card>

          {/* Master Health Pulse */}
          <Card className="lg:col-span-3 border-sky-100 shadow-xl rounded-[3rem] overflow-hidden bg-sky-950 text-white flex flex-col p-10 group">
             <div className="space-y-8 relative z-10 flex-1">
                <div className="w-16 h-16 rounded-[1.5rem] bg-sky-400/20 flex items-center justify-center text-sky-400 shadow-xl">
                   <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter leading-[0.9]">Campus Health Index</h3>
                <p className="text-sky-300/80 font-medium italic opacity-80">Real-time composite score based on faculty satisfaction, student performance, and system stability.</p>
                <div className="space-y-6 pt-6 uppercase tracking-widest">
                   <div>
                      <div className="flex justify-between text-[10px] font-black mb-2">Academic Vibe</div>
                      <div className="h-1.5 w-full bg-sky-900 rounded-full overflow-hidden">
                         <div className="h-full w-[84%] bg-sky-400 rounded-full animate-pulse"></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-[10px] font-black mb-2">Faculty Retention</div>
                      <div className="h-1.5 w-full bg-sky-900 rounded-full overflow-hidden">
                         <div className="h-full w-[96%] bg-emerald-400 rounded-full"></div>
                      </div>
                   </div>
                </div>
             </div>
             <Button className="w-full h-16 rounded-2xl bg-white text-sky-950 hover:bg-sky-50 font-black italic uppercase text-xs tracking-widest mt-12 transition-all active:scale-95">
                Generate Institutional Audit
             </Button>
          </Card>
       </div>
    </div>
  )
}
