"use client"

import React from "react"
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Star, 
  BookOpen,
  Briefcase,
  ShieldCheck,
  Zap
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

export default function FacultyPage() {
  const [isAddFacultyOpen, setIsAddFacultyOpen] = React.useState(false)
  const [faculty, setFaculty] = React.useState([
    { name: "Dr. Ishani Gupta", role: "Sr. Professor", dept: "Computer Science", email: "ishani.g@college.edu", rating: 4.9, performance: 98, status: "Active" },
    { name: "Prof. Rajesh Kumar", role: "Associate Professor", dept: "Artificial Intelligence", email: "rajesh.k@college.edu", rating: 4.7, performance: 92, status: "Active" },
    { name: "Dr. Elena Gilbert", role: "HOD", dept: "Electronics", email: "elena.g@college.edu", rating: 5.0, performance: 100, status: "On Leave" },
  ])

  const [newFaculty, setNewFaculty] = React.useState({
    name: "", role: "", dept: "", email: "", rating: 5.0, performance: 100, status: "Active"
  })

  const handleAddFaculty = () => {
    if (!newFaculty.name || !newFaculty.email) return
    setFaculty([...faculty, newFaculty])
    setIsAddFacultyOpen(false)
    setNewFaculty({ name: "", role: "", dept: "", email: "", rating: 5.0, performance: 100, status: "Active" })
    alert("Faculty Node Provisioned Successfully! 🎓👔")
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32">
       {/* MASTER FACULTY HEADER */}
       <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
             <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-black uppercase text-[10px] tracking-[0.3em]">
                   <Briefcase className="h-4 w-4" />
                   Faculty Management Synapse
                </div>
                <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">Faculty<br /><span className="text-sky-500">Directory.</span></h2>
                <p className="text-sky-300/80 max-w-lg font-medium italic text-lg mt-6">A world-class directory to audit faculty performance, manage scholarly output, and oversee departmental status.</p>
             </div>
             
             <Dialog open={isAddFacultyOpen} onOpenChange={setIsAddFacultyOpen}>
                <DialogTrigger asChild>
                   <Button className="rounded-2xl h-14 px-10 bg-white hover:bg-sky-50 text-sky-950 font-black italic uppercase text-xs tracking-widest shadow-2xl shadow-white/10 group transition-all">
                      Add Faculty Node
                      <UserPlus className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                   </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-slate-950 border-sky-900 rounded-[3rem] p-10 text-white shadow-3xl">
                   <DialogHeader className="space-y-4 mb-8">
                      <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                         <ShieldCheck className="h-8 w-8" />
                      </div>
                      <DialogTitle className="text-4xl font-black italic uppercase tracking-tighter italic">Provision <span className="text-sky-400">Faculty.</span></DialogTitle>
                      <DialogDescription className="text-white/40 font-bold uppercase text-[10px] tracking-[0.4em] italic">Deploy New Human Resource Node</DialogDescription>
                   </DialogHeader>

                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Full Identity</Label>
                         <Input 
                            value={newFaculty.name}
                            onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-white italic" 
                         />
                      </div>
                      <div className="space-y-3">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Official Email</Label>
                         <Input 
                            value={newFaculty.email}
                            onChange={(e) => setNewFaculty({...newFaculty, email: e.target.value})}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-sky-400 italic" 
                         />
                      </div>
                      <div className="space-y-3">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Designation</Label>
                         <Input 
                            value={newFaculty.role}
                            onChange={(e) => setNewFaculty({...newFaculty, role: e.target.value})}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-white italic" 
                         />
                      </div>
                      <div className="space-y-3">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Department Cluster</Label>
                         <Input 
                            value={newFaculty.dept}
                            onChange={(e) => setNewFaculty({...newFaculty, dept: e.target.value})}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-sky-400 italic" 
                         />
                      </div>
                   </div>

                   <Button 
                      onClick={handleAddFaculty}
                      className="w-full h-16 rounded-3xl mt-12 bg-sky-500 hover:bg-white text-white hover:text-sky-950 font-black italic uppercase tracking-widest shadow-2xl shadow-sky-500/20 transition-all active:scale-95"
                   >
                      Finalize Faculty Provisioning
                   </Button>
                </DialogContent>
             </Dialog>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-[150px] animate-pulse"></div>
       </div>

       {/* FILTER & SEARCH */}
       <div className="flex flex-col md:items-center justify-between gap-4 p-8 rounded-[2.5rem] bg-white border border-sky-100 shadow-xl shadow-sky-900/5">
          <div className="flex items-center gap-4 flex-1 w-full max-w-md relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400" />
             <Input placeholder="Search faculty by name or department..." className="pl-12 h-12 rounded-2xl border-sky-100 shadow-sm font-medium" />
          </div>
       </div>

       {/* FACULTY LIST */}
       <div className="grid md:grid-cols-3 gap-8">
          {faculty.map((f, i) => (
             <Card key={i} className="border-sky-100 hover:shadow-[0_50px_100px_-20px_rgba(12,74,110,0.15)] transition-all duration-500 rounded-[3rem] overflow-hidden group bg-white/50 backdrop-blur-xl">
                <div className={`h-2 w-full ${f.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                <CardContent className="p-10 space-y-8">
                   <div className="flex items-center justify-between">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-sky-50 flex items-center justify-center text-sky-600 shadow-inner group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all transform duration-500">
                         <Users className="h-7 w-7" />
                      </div>
                      <Badge className={`${f.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} font-black text-[10px] tracking-widest px-4 py-1.5 uppercase italic border-0 shadow-none`}>
                         {f.status}
                      </Badge>
                   </div>
                   
                   <div className="space-y-1">
                      <h3 className="text-2xl font-black text-sky-950 italic tracking-tighter leading-none">{f.name}</h3>
                      <p className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                         <Award className="h-3.5 w-3.5" /> {f.role}
                      </p>
                   </div>

                   <div className="space-y-3 pt-6 border-t border-sky-50">
                      <div className="flex items-center justify-between text-xs font-black uppercase text-sky-950/30 tracking-widest">
                         <span>Department Cluster</span>
                         <span className="text-sky-950 italic">{f.dept}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-black uppercase text-sky-950/30 tracking-widest">
                         <span>Student Rating</span>
                         <span className="text-sky-950 flex items-center gap-1"><Star className="h-3 w-3 text-amber-500 fill-amber-500" /> {f.rating}</span>
                      </div>
                      <div>
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2">Academic Pulse</div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500 rounded-full" style={{ width: `${f.performance}%` }}></div>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-2 pt-4">
                      <Button className="flex-1 rounded-2xl h-14 bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-600 font-black italic uppercase text-[11px] tracking-widest shadow-inner transition-all border-0">
                         Audit Faculty
                      </Button>
                      <Button variant="outline" className="rounded-2xl h-14 w-14 p-0 border-sky-100 group-hover:border-sky-300 transition-all">
                         <Mail className="h-5 w-5 text-sky-400" />
                      </Button>
                   </div>
                </CardContent>
             </Card>
          ))}
       </div>
    </div>
  )
}
