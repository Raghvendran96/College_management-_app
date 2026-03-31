"use client"

import React from "react"
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Building, 
  Users, 
  UserPlus, 
  Download, 
  Upload, 
  FileText,
  CheckCircle2,
  Trash2,
  Loader2,
  Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = React.useState(1)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isIngesting, setIsIngesting] = React.useState(false)
  const [ingestionProgress, setIngestionProgress] = React.useState(0)
  const [isIngested, setIsIngested] = React.useState(false)

  const handleIngest = () => {
    setIsIngesting(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setIngestionProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsIngesting(false)
          setIsIngested(true)
          setStep(4)
        }, 800)
      }
    }, 250)
  }

  const steps = [
    { id: 1, title: "Initial Seeding", desc: "Choose your ingestion protocol" },
    { id: 2, title: "Manual Provisioning", desc: "Create your first institutional nodes" },
    { id: 3, title: "Mass Ingestion", desc: "Populate clusters via CSV Hub" },
    { id: 4, title: "Final Validation", desc: "Synchronize your campus lattice" }
  ]

  const handleComplete = () => {
    setIsProcessing(true)
    setTimeout(() => {
      onComplete()
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-3xl overflow-y-auto">
       <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-5xl bg-white rounded-[4rem] shadow-2xl overflow-hidden relative"
       >
          {/* STEPPER HEADER */}
          <div className="bg-sky-950 p-10 md:p-14 text-white">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div className="space-y-2">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-black uppercase text-[9px] tracking-widest">
                      <Lock className="h-3 w-3" /> Production Onboarding Node
                   </div>
                   <h2 className="text-4xl font-black italic tracking-tighter uppercase">Institutional <span className="text-sky-400">Seeding.</span></h2>
                </div>
                <div className="flex gap-2">
                   {steps.map((s) => (
                      <div key={s.id} className={`w-12 h-1.5 rounded-full transition-all duration-500 ${s.id <= step ? 'bg-sky-500' : 'bg-white/10'}`}></div>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {steps.map((s) => (
                   <div key={s.id} className={`p-4 rounded-2xl border transition-all ${s.id === step ? 'bg-white/5 border-sky-500/50' : 'border-transparent opacity-40'}`}>
                      <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 italic">Step 0{s.id}</p>
                      <p className="text-sm font-black italic uppercase leading-none mt-1">{s.title}</p>
                   </div>
                ))}
             </div>
          </div>

          <div className="p-10 md:p-16 min-h-[500px] flex flex-col justify-between">
             <AnimatePresence mode="wait">
                {step === 1 && (
                   <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12 text-center"
                   >
                      <div className="max-w-2xl mx-auto space-y-6">
                         <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mx-auto text-sky-600 shadow-xl shadow-sky-900/5">
                            <ShieldCheck className="h-10 w-10" />
                         </div>
                         <h3 className="text-4xl font-black italic text-sky-950 tracking-tighter">Choose Your <span className="text-sky-500">Synapse Protocol.</span></h3>
                         <p className="text-slate-400 font-medium italic leading-relaxed">Your institutional node is now online. To complete the "Go Live" handover, you must seed your first campus records. Select your preferred ingestion method below.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                         <button onClick={() => setStep(2)} className="p-10 rounded-[3rem] border-2 border-slate-100 hover:border-sky-500 hover:bg-sky-50/50 transition-all text-left space-y-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-inner">
                               <UserPlus className="h-7 w-7" />
                            </div>
                            <div>
                               <h4 className="text-2xl font-black text-sky-950 italic">Manual Provisioning</h4>
                               <p className="text-xs font-bold text-slate-400 mt-2 italic leading-relaxed">Create single records one-by-one. Ideal for initial department setup and testing nodal integrity.</p>
                            </div>
                         </button>
                         <button onClick={() => setStep(3)} className="p-10 rounded-[3rem] border-2 border-slate-100 hover:border-sky-500 hover:bg-sky-50/50 transition-all text-left space-y-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-inner">
                               <Upload className="h-7 w-7" />
                            </div>
                            <div>
                               <h4 className="text-2xl font-black text-sky-950 italic">Mass Cluster Import</h4>
                               <p className="text-xs font-bold text-slate-400 mt-2 italic leading-relaxed">Ingest entire campus registries via CSV files. Download high-fidelity templates for students and faculty.</p>
                            </div>
                         </button>
                      </div>
                   </motion.div>
                )}

                {step === 2 && (
                   <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                   >
                      <div className="space-y-2">
                         <h3 className="text-3xl font-black italic text-sky-950 tracking-tighter uppercase">Manual <span className="text-sky-500">Record Audit.</span></h3>
                         <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">Create Your First Institutional Synapse</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-10">
                         <Card className="border-sky-100 shadow-xl rounded-[2.5rem] p-8 space-y-6">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-inner">
                                  <Building className="h-5 w-5" />
                               </div>
                               <h4 className="text-xl font-black italic text-sky-950">Department Sync</h4>
                            </div>
                            <div className="space-y-4">
                               <div className="space-y-2">
                                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Dept Name</Label>
                                  <Input placeholder="E.g. Computer Science & Eng" className="h-12 rounded-xl" />
                               </div>
                               <Button className="w-full rounded-2xl h-12 bg-sky-950 text-white font-black italic uppercase text-[10px] tracking-widest">Provision Dept</Button>
                            </div>
                         </Card>
                         <Card className="border-sky-100 shadow-xl rounded-[2.5rem] p-8 space-y-6">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                                  <Users className="h-5 w-5" />
                               </div>
                               <h4 className="text-xl font-black italic text-sky-950">Scholar Sync</h4>
                            </div>
                            <div className="space-y-4">
                               <div className="space-y-2">
                                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Student Identity</Label>
                                  <Input placeholder="E.g. Raghvendra Tripathi" className="h-12 rounded-xl" />
                               </div>
                               <Button className="w-full rounded-2xl h-12 bg-indigo-950 text-white font-black italic uppercase text-[10px] tracking-widest">Provision Scholar</Button>
                            </div>
                         </Card>
                      </div>

                      <div className="flex justify-between items-center pt-10 border-t border-slate-50">
                         <Button variant="ghost" onClick={() => setStep(1)} className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest text-slate-400">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Protocol Selector
                         </Button>
                         <Button onClick={() => setStep(3)} className="rounded-2xl h-14 px-10 bg-sky-500 hover:bg-black text-white font-black italic uppercase text-xs tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
                            Transition to Mass Import <ArrowRight className="h-4 w-4 ml-2" />
                         </Button>
                      </div>
                   </motion.div>
                )}

                {step === 3 && (
                   <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                   >
                      <div className="space-y-2 text-center">
                         <h3 className="text-4xl font-black italic text-sky-950 tracking-tighter uppercase">Mass <span className="text-sky-500">CSV Hub.</span></h3>
                         <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic leading-loose">Populate institutional clusters via master data import</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                         {/* TEMPLATE DOCK */}
                         <Card className="border-sky-100 shadow-xl rounded-[3rem] bg-sky-950 text-white p-10 space-y-8">
                            <div className="space-y-2">
                               <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                                  <Download className="h-6 w-6" />
                               </div>
                               <h4 className="text-2xl font-black italic tracking-tight pt-2">Download Master Templates</h4>
                               <p className="text-sky-400/60 font-bold uppercase text-[9px] tracking-[0.4em] italic">Get production-ready CSV headers</p>
                            </div>
                            <div className="space-y-3">
                               {["Student_Master_Registry.csv", "Faculty_Elite_Directory.csv", "Department_Lattice_Config.csv"].map((f) => (
                                  <div key={f} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
                                     <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-sky-400" />
                                        <span className="text-xs font-black italic lowercase tracking-tight">{f}</span>
                                     </div>
                                     <Download className="h-4 w-4 text-sky-400" />
                                  </div>
                               ))}
                            </div>
                         </Card>

                         {/* UPLOAD SYNC */}
                         <Card className="border-sky-100 shadow-xl rounded-[3rem] p-10 space-y-8 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                                <Upload className="h-24 w-24 text-sky-900" />
                             </div>
                             <div className="space-y-2">
                                <h4 className="text-2xl font-black italic text-sky-950 tracking-tight">Synchronize Records</h4>
                                <p className="text-sky-400 font-bold uppercase text-[9px] tracking-[0.4em] italic leading-loose">Upload populated registries to the lattice</p>
                             </div>
                             <div className="h-40 border-4 border-dashed border-sky-50 rounded-[2rem] flex flex-col items-center justify-center text-center p-6 space-y-2 hover:border-sky-500 hover:bg-sky-50 transition-all cursor-pointer">
                                {isIngesting ? (
                                   <div className="w-full space-y-4">
                                      <div className="w-full h-1.5 bg-sky-50 rounded-full overflow-hidden">
                                         <div 
                                            className="h-full bg-sky-500 transition-all duration-500" 
                                            style={{ width: `${ingestionProgress}%` }}
                                         ></div>
                                      </div>
                                      <p className="text-[10px] font-black uppercase text-sky-500 animate-pulse">Synchronizing Institutional Lattice... {ingestionProgress}%</p>
                                   </div>
                                ) : (
                                   <>
                                      <Upload className="h-8 w-8 text-sky-900" />
                                      <p className="text-xs font-black uppercase text-sky-950 italic">Drop CSV File Here</p>
                                      <p className="text-[9px] font-bold text-slate-400 tracking-widest italic">Max 5,000 Records Per Synapse</p>
                                   </>
                                )}
                             </div>
                             <Button 
                                onClick={handleIngest}
                                disabled={isIngesting}
                                className="w-full h-16 rounded-2xl bg-sky-950 text-white font-black italic uppercase text-xs tracking-widest shadow-2xl shadow-sky-950/20 transition-all active:scale-95 disabled:opacity-50"
                             >
                                {isIngesting ? (
                                   <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                   "Start Ingestion Synapse"
                                )}
                             </Button>
                         </Card>
                      </div>
                   </motion.div>
                )}

                {step === 4 && (
                    <motion.div 
                       key="step4"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="space-y-12 text-center"
                    >
                       <div className="max-w-xl mx-auto space-y-6">
                           <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-xl shadow-emerald-500/10">
                              <CheckCircle2 className="h-12 w-12" />
                           </div>
                           <h3 className="text-5xl font-black italic text-sky-950 tracking-tighter uppercase">Lattice <span className="text-emerald-500">Synchronized.</span></h3>
                           <p className="text-slate-400 font-medium italic leading-relaxed">Your data clusters have been verified and ingested. The dashboard nodes are now fully functional and calibrated for institutional auditing.</p>
                       </div>

                       <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 max-w-lg mx-auto">
                           <div className="flex justify-between items-center mb-4">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Audit Summary</p>
                              <Badge className="bg-emerald-100 text-emerald-700 font-black italic border-0">SUCCESS</Badge>
                           </div>
                           <div className="space-y-3 text-left">
                              <div className="flex items-center justify-between text-xs font-black uppercase italic">
                                 <span className="text-slate-400">Nodes Ingested</span>
                                 <span className="text-sky-950">1,250 Entities</span>
                              </div>
                              <div className="flex items-center justify-between text-xs font-black uppercase italic">
                                 <span className="text-slate-400">Lattice Health</span>
                                 <span className="text-sky-950 italic">99.8% Efficiency</span>
                              </div>
                           </div>
                       </div>

                       <Button 
                          onClick={handleComplete}
                          disabled={isProcessing}
                          className="rounded-[2.5rem] h-20 px-16 bg-sky-950 hover:bg-black text-white font-black italic uppercase text-lg tracking-tighter shadow-3xl shadow-sky-950/30 transition-all active:scale-95 group"
                       >
                          {isProcessing ? (
                             <Loader2 className="h-8 w-8 animate-spin" />
                          ) : (
                             <div className="flex items-center gap-4">
                                Launch Master Dashboard
                                <ArrowRight className="h-6 w-6 group-hover:translate-x-3 transition-all" />
                             </div>
                          )}
                       </Button>
                    </motion.div>
                )}
             </AnimatePresence>
          </div>
       </motion.div>
    </div>
  )
}
