"use client"

import React from "react"
import { 
  FileText, 
  Calendar, 
  TrendingUp, 
  Search, 
  MoreVertical, 
  ArrowRight, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  GraduationCap,
  ShieldCheck,
  Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export default function ExamsPage() {
  const [activeTab, setActiveTab] = React.useState("schedule")

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32">
       {/* MASTER EXAM HEADER */}
       <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-900 via-sky-950 to-blue-950 p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
             <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-black uppercase text-[10px] tracking-[0.3em]">
                   <FileText className="h-4 w-4" />
                   Institutional Examination Synapse
                </div>
                <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">Scholarly<br /><span className="text-sky-500">Audit.</span></h2>
                <p className="text-sky-300/80 max-w-lg font-medium italic text-lg mt-6">A master registry for curriculum finalization, semester scheduling, and global CGPA auditing.</p>
             </div>
             
             <div className="flex items-center gap-4">
                <Button className="rounded-2xl h-14 px-10 bg-white hover:bg-sky-50 text-sky-950 font-black italic uppercase text-xs tracking-widest shadow-2xl shadow-white/10 group transition-all">
                   Deploy New Schedule
                   <Plus className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                </Button>
             </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-[150px] animate-pulse"></div>
       </div>

       {/* EXAM PORTAL CONTENT */}
       <div className="grid lg:grid-cols-3 gap-10">
          {/* UPCOMING EXAMS LIST */}
          <div className="lg:col-span-2 space-y-8">
             <div className="flex items-center gap-4 mb-4">
                <Button 
                   onClick={() => setActiveTab("schedule")}
                   className={`rounded-2xl px-8 h-12 font-black italic uppercase text-[10px] tracking-widest transition-all ${activeTab === "schedule" ? "bg-sky-500 text-sky-950 shadow-xl shadow-sky-500/20" : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"}`}
                >
                   Upcoming Schedule
                </Button>
                <Button 
                   onClick={() => setActiveTab("results")}
                   className={`rounded-2xl px-8 h-12 font-black italic uppercase text-[10px] tracking-widest transition-all ${activeTab === "results" ? "bg-sky-500 text-sky-950 shadow-xl shadow-sky-500/20" : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"}`}
                >
                   Results Registry
                </Button>
             </div>

             <AnimatePresence mode="wait">
                {activeTab === "schedule" ? (
                   <motion.div 
                      key="schedule"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                   >
                      {[
                        { name: "Computer Organization-CSE", code: "CS-401", date: "April 15, 2026", time: "10:00 AM", hall: "Auditorium A" },
                        { name: "Data Structures & Algos", code: "CS-405", date: "April 18, 2026", time: "02:00 PM", hall: "Lab-04" },
                        { name: "Discrete Mathematics", code: "MA-201", date: "April 21, 2026", time: "10:00 AM", hall: "LH-08" },
                      ].map((ex, i) => (
                         <div key={i} className="flex items-center justify-between p-8 rounded-[2.5rem] bg-white border border-sky-100 hover:shadow-2xl hover:shadow-sky-900/10 transition-all group">
                            <div className="flex items-center gap-8">
                               <div className="w-16 h-16 rounded-[1.5rem] bg-sky-50 flex flex-col items-center justify-center text-sky-600 border border-sky-100">
                                  <Calendar className="h-6 w-6" />
                               </div>
                               <div>
                                  <h4 className="text-2xl font-black text-sky-950 italic tracking-tighter">{ex.name}</h4>
                                  <div className="flex items-center gap-4 mt-1">
                                     <Badge className="bg-sky-50 text-sky-400 font-black text-[9px] uppercase tracking-widest px-3 border-0">Code: {ex.code}</Badge>
                                     <p className="text-xs font-bold text-sky-950/40 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin className="h-3 w-3" /> {ex.hall}
                                     </p>
                                  </div>
                               </div>
                            </div>
                            <div className="text-right space-y-1">
                               <p className="text-lg font-black text-sky-600 italic leading-none">{ex.date}</p>
                               <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest italic">{ex.time}</p>
                            </div>
                         </div>
                      ))}
                   </motion.div>
                ) : (
                   <motion.div 
                      key="results"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-12 rounded-[3.5rem] border-4 border-dashed border-sky-100 bg-sky-50/50 text-center"
                   >
                      <ShieldCheck className="h-16 w-16 text-sky-200 mx-auto mb-6" />
                      <p className="text-xl font-black italic text-sky-950 tracking-tighter">Semester results are currently under internal audit.</p>
                      <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mt-2">Expected Publication: April 30, 2026</p>
                   </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* PERFORMANCE HUD */}
          <div className="space-y-8">
             <Card className="border-sky-950 shadow-2xl rounded-[3rem] overflow-hidden bg-sky-950 text-white p-10 space-y-8">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                   <TrendingUp className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                   <h3 className="text-3xl font-black italic tracking-tighter leading-none">Global CGPA Pulses</h3>
                   <p className="text-sky-400/60 font-bold uppercase text-[9px] tracking-[0.4em] italic pt-1">Institutional Academic Index</p>
                </div>
                
                <div className="space-y-6 pt-4">
                   {[
                     { label: "Engineering Nodes", val: 8.4, color: "sky-400" },
                     { label: "Management Nodes", val: 7.9, color: "sky-400" },
                     { label: "Faculty Accuracy", val: 96, unit: "%", color: "emerald-400" },
                   ].map((st, i) => (
                      <div key={i} className="space-y-3">
                         <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">{st.label}</span>
                            <span className="text-2xl font-black text-white italic tracking-tighter">{st.val}{st.unit}</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full bg-sky-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(56,189,248,0.3)]`} style={{ width: `${(st.val/10)*100}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="pt-10 border-t border-white/5">
                   <div className="p-6 rounded-[1.5rem] bg-white/5 border border-white/10 text-center space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 italic">Scholarly Distinction Index</p>
                      <p className="text-4xl font-black italic tracking-tighter text-white">42 Fellows</p>
                   </div>
                </div>
             </Card>

             <Card className="border-sky-100 shadow-xl rounded-[3rem] overflow-hidden p-8 space-y-6 bg-white/50 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                   <AlertTriangle className="h-6 w-6 text-amber-500" />
                   <h4 className="text-lg font-black italic text-sky-950 tracking-tighter">Institutional Alert</h4>
                </div>
                <p className="text-sm font-bold text-sky-950/60 leading-relaxed italic">
                   Hall Ticket generation for Semester Spring-2026 will activate precisely 7 days prior to primary nodal audit.
                </p>
                <Button className="w-full h-14 rounded-2xl bg-sky-50 text-sky-600 font-black italic uppercase text-[10px] tracking-widest border border-sky-100 hover:bg-sky-600 hover:text-white transition-all shadow-inner">
                   Review Protocol
                </Button>
             </Card>
          </div>
       </div>
    </div>
  )
}
