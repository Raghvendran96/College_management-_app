import React from "react"
import { 
  Building, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Users, 
  User, 
  GraduationCap, 
  TrendingUp, 
  Cpu, 
  Code, 
  Zap,
  Globe,
  Globe2,
  Settings,
  ShieldCheck
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"
import { Label } from "../../../components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "../../../components/ui/dialog"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function DepartmentsPage() {
  const [isAddDeptOpen, setIsAddDeptOpen] = React.useState(false)
  const [departments, setDepartments] = React.useState([
    { name: "Computer Science", id: "CS", hod: "Dr. Ishani Gupta", students: 540, faculty: 32, performance: 94, icon: Code, color: "sky" },
    { name: "Artificial Intelligence", id: "AI", hod: "Prof. Rajesh Kumar", students: 120, faculty: 12, performance: 98, icon: Cpu, color: "indigo" },
    { name: "Electronics", id: "EC", hod: "Dr. Elena Gilbert", students: 380, faculty: 21, performance: 88, icon: Zap, color: "amber" },
    { name: "Civil Engineering", id: "CE", hod: "Prof. Stefan Salvatore", students: 250, faculty: 15, performance: 76, icon: Globe2, color: "emerald" },
  ])

  const [newDept, setNewDept] = React.useState({
    name: "", id: "", hod: "", students: 0, faculty: 0, performance: 100, icon: Building, color: "sky"
  })

  const handleAddDept = () => {
    if (!newDept.name || !newDept.id) return
    setDepartments([...departments, { ...newDept, icon: Building }])
    setIsAddDeptOpen(false)
    setNewDept({ name: "", id: "", hod: "", students: 0, faculty: 0, performance: 100, icon: Building, color: "sky" })
    alert("Departmental Node Provisioned Successfully! 🏛️🚀")
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1200 pb-32">
       {/* MASTER DEPARTMENT HEADER */}
       <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-900 via-sky-950 to-blue-950 p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
             <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-400 font-black uppercase text-[10px] tracking-[0.3em]">
                   <Building className="h-4 w-4" />
                   Departmental Master Controller
                </div>
                <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">Academic<br /><span className="text-sky-500">Nodes.</span></h2>
                <p className="text-sky-300/80 max-w-lg font-medium italic text-lg mt-6">A world-class management portal to audit your departments, assign heads, and real-time student lifecycle monitoring.</p>
             </div>
             
             <Dialog open={isAddDeptOpen} onOpenChange={setIsAddDeptOpen}>
                <DialogTrigger asChild>
                   <Button className="rounded-2xl h-14 px-10 bg-white hover:bg-sky-50 text-sky-950 font-black italic uppercase text-xs tracking-widest shadow-2xl shadow-white/10 group transition-all">
                      Add New Department
                      <Plus className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                   </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-slate-950 border-sky-900 rounded-[3rem] p-10 text-white shadow-3xl">
                   <DialogHeader className="space-y-4 mb-8">
                      <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                         <ShieldCheck className="h-8 w-8" />
                      </div>
                      <DialogTitle className="text-4xl font-black italic uppercase tracking-tighter italic">Provision <span className="text-sky-400">Node.</span></DialogTitle>
                      <DialogDescription className="text-white/40 font-bold uppercase text-[10px] tracking-[0.4em] italic">Deploy New Institutional Cluster</DialogDescription>
                   </DialogHeader>

                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Dept Name</Label>
                         <Input 
                            value={newDept.name}
                            onChange={(e) => setNewDept({...newDept, name: e.target.value})}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-white italic" 
                         />
                      </div>
                      <div className="space-y-3">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Dept Code</Label>
                         <Input 
                            value={newDept.id}
                            onChange={(e) => setNewDept({...newDept, id: e.target.value})}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-sky-400 italic" 
                         />
                      </div>
                      <div className="space-y-3">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Head of Dept</Label>
                         <Input 
                            value={newDept.hod}
                            onChange={(e) => setNewDept({...newDept, hod: e.target.value})}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-white italic" 
                         />
                      </div>
                      <div className="space-y-3">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Initial Capacity</Label>
                         <Input 
                            type="number"
                            value={newDept.students}
                            onChange={(e) => setNewDept({...newDept, students: parseInt(e.target.value)})}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-sky-400 italic" 
                         />
                      </div>
                   </div>

                   <Button 
                      onClick={handleAddDept}
                      className="w-full h-16 rounded-3xl mt-12 bg-sky-500 hover:bg-white text-white hover:text-sky-950 font-black italic uppercase tracking-widest shadow-2xl shadow-sky-500/20 transition-all active:scale-95"
                   >
                      Finalize Node Deployment
                   </Button>
                </DialogContent>
             </Dialog>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-[150px] animate-pulse"></div>
       </div>

       {/* FILTER & SEARCH BAR */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-[2.5rem] bg-white border border-sky-100 shadow-xl shadow-sky-900/5">
          <div className="flex items-center gap-4 flex-1 max-w-md relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400" />
             <Input placeholder="Search departments by name or ID..." className="pl-12 h-12 rounded-2xl border-sky-100 shadow-sm font-medium" />
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" className="rounded-xl h-12 px-6 border-sky-100 text-sky-600 font-bold shadow-sm">
                <Filter className="h-4 w-4 mr-2" />
                Audit Filters
             </Button>
             <Button variant="outline" className="rounded-xl h-12 px-6 border-sky-100 text-sky-600 font-bold shadow-sm">
                Export Statistics
             </Button>
          </div>
       </div>

       {/* DEPARTMENTS GRID */}
       <div className="grid md:grid-cols-2 gap-8">
          {departments.map((d, i) => (
             <Card key={i} className="border-sky-100 hover:shadow-[0_50px_100px_-20px_rgba(12,74,110,0.15)] transition-all duration-500 rounded-[3rem] overflow-hidden group bg-white/50 backdrop-blur-xl">
                <div className="h-3 w-full bg-sky-100 group-hover:bg-sky-600 transition-colors"></div>
                <CardContent className="p-10 space-y-8">
                   <div className="flex items-center justify-between">
                      <div className={`w-16 h-16 rounded-[1.5rem] bg-${d.color}-50 flex items-center justify-center text-${d.color}-600 shadow-inner group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all transform duration-500`}>
                         <d.icon className="h-7 w-7" />
                      </div>
                      <Badge className="bg-sky-50 text-sky-400 font-black text-[10px] tracking-widest px-4 py-1.5 uppercase italic">DEPT CODE: {d.id}</Badge>
                   </div>
                   
                   <div className="space-y-1">
                      <h3 className="text-3xl font-black text-sky-950 italic tracking-tighter leading-none">{d.name}</h3>
                      <p className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                         <User className="h-3.5 w-3.5" /> Head: {d.hod}
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-8 pt-8 border-t border-sky-50">
                      <div>
                         <p className="text-[10px] font-black uppercase text-sky-300 tracking-widest mb-2 italic">Student Census</p>
                         <p className="text-3xl font-black tracking-tighter text-sky-950 italic">{d.students}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase text-sky-300 tracking-widest mb-2 italic">Efficiency Pulse</p>
                         <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                            <p className="text-3xl font-black tracking-tighter text-sky-950 italic">{d.performance}%</p>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-2 pt-4">
                      <Link href="/dashboard/academics" className="flex-1">
                        <Button className="w-full rounded-2xl h-14 bg-sky-50 hover:bg-sky-100 text-sky-600 font-black italic uppercase text-[11px] tracking-widest shadow-inner transition-all">
                           Access Data Node
                        </Button>
                      </Link>
                      <Button variant="outline" className="rounded-2xl h-14 w-14 p-0 border-sky-100 group-hover:border-sky-300 transition-all">
                         <Settings className="h-5 w-5 text-sky-400" />
                      </Button>
                   </div>
                </CardContent>
             </Card>
          ))}
       </div>
    </div>
  )
}
