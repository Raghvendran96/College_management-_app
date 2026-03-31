"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Settings, 
  ShieldCheck, 
  AlertTriangle, 
  Trash2, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Loader2,
  ArrowRight,
  ShieldAlert,
  Save,
  Building,
  School,
  Plus,
  Users
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "../../../components/ui/dialog"

export default function SettingsPage() {
  const router = useRouter()
  const [isWiping, setIsWiping] = React.useState(false)
  const [showGoLiveModal, setShowGoLiveModal] = React.useState(false)
  const [isFinalizing, setIsFinalizing] = React.useState(false)

  // Super Admin Configuration
  const [config, setConfig] = React.useState({
    adminUser: "",
    adminPass: ""
  })

  const [isMasterAdmin, setIsMasterAdmin] = React.useState(false)
  const [secondaryAdmins, setSecondaryAdmins] = React.useState([
    { name: "Group A: North Campus", email: "admin.north@college.edu", status: "Active Node", daysActive: 124 },
    { name: "Group B: South Science Hub", email: "admin.science@college.edu", status: "Initializing", daysActive: 12 }
  ])

  React.useEffect(() => {
    const role = document.cookie.split('; ').find(row => row.startsWith('userRole='))?.split('=')[1]
    const email = document.cookie.split('; ').find(row => row.startsWith('userEmail='))?.split('=')[1]
    
    // Simulation: Only 'admin@college.edu' is the Master Super Admin
    setIsMasterAdmin(role === "admin") // In demo, we assume the logged-in admin is the master
  }, [])

  const [showIdentityGate, setShowIdentityGate] = React.useState(true)
  const [userName, setUserName] = React.useState("")
  const [userPurpose, setUserPurpose] = React.useState("")

  const handleIdentityVerify = () => {
    if (userName.toLowerCase() === "raghvendra") {
      setShowIdentityGate(false)
      alert("Master Executive Access Verified: Proceeding as Global Owner.")
    } else {
      document.cookie = "isFreshInstall=true; path=/"
      setShowIdentityGate(false)
      alert(`New Institutional Node Detected: Welcome ${userName}. System is launching in 'Clean State' for ${userPurpose}. Please use the Manual for seeding.`)
    }
  }

  React.useEffect(() => {
    const fresh = document.cookie.split('; ').find(row => row.startsWith('isFreshInstall='))?.split('=')[1]
    if (fresh === "true") setShowIdentityGate(false)
  }, [])

  const finalizeSystem = () => {
    if (!config.adminUser || !config.adminPass) return alert("Please set new Super Admin credentials.")
    setIsFinalizing(true)
    
    // Simulations:
    // 1. Wipe out all demo cookies/session data
    // 2. Set 'isFreshInstall' to true to force blank data in all modules
    // 3. Open the Institutional Guide PDF for the new admin
    // 4. Force logout
    setTimeout(() => {
      document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "isDemoMode=false; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "isFreshInstall=true; path=/" 
      
      // OPEN THE GUIDE PDF IN A NEW TAB
      // Using a relative path for the documentation resource
      window.open("/guide.pdf", "_blank")
      
      router.push("/login?status=live_initialized")
      setIsFinalizing(false)
    }, 2500)
  }

  const handleGoLive = () => {
    setShowGoLiveModal(true)
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32">
       {/* IDENTITY VERIFICATION PORTAL (GATE) */}
       <AnimatePresence>
          {showIdentityGate && (
             <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-3xl">
                <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="relative w-full max-w-lg bg-sky-950 border border-sky-900 rounded-[3.5rem] shadow-2xl p-12 text-white space-y-8"
                >
                   <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-sky-400 border border-sky-500/20">
                         <ShieldCheck className="h-8 w-8" />
                      </div>
                      <h3 className="text-4xl font-black italic uppercase tracking-tighter">Identity <span className="text-sky-400">Node Audit.</span></h3>
                      <p className="text-white/40 font-bold uppercase text-[10px] tracking-[0.4em] italic">Institutional Persona Verification</p>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Enter User Identity</Label>
                         <Input 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Your Name..." 
                            className="h-14 rounded-2xl bg-white/5 border-white/10 focus-visible:ring-sky-500 font-bold text-white italic" 
                         />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Institutional Purpose</Label>
                         <Input 
                            value={userPurpose} 
                            onChange={(e) => setUserPurpose(e.target.value)}
                            placeholder="E.g. Academic Showcase / Global Audit" 
                            className="h-14 rounded-2xl bg-white/5 border-white/10 focus-visible:ring-sky-500 font-bold text-sky-400 italic" 
                         />
                      </div>
                   </div>

                   <Button 
                      onClick={handleIdentityVerify}
                      className="w-full h-14 rounded-2xl bg-sky-500 hover:bg-white text-white hover:text-sky-950 font-black italic uppercase tracking-widest text-[10px] shadow-2xl shadow-sky-500/20 transition-all active:scale-95"
                   >
                      Finalize Persona Synapse
                   </Button>
                </motion.div>
             </div>
          )}
       </AnimatePresence>
       {/* MASTER SETTINGS HEADER */}
       <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 to-indigo-950 p-12 text-white shadow-2xl">
          <div className="relative z-10 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-black uppercase text-[10px] tracking-[0.3em]">
                <Settings className="h-4 w-4" />
                Institutional Core Config
             </div>
             <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">System<br /><span className="text-sky-500">Parameters.</span></h2>
             <p className="text-sky-300/80 max-w-lg font-medium italic text-lg mt-6">A master control node for rebranding campus identity and migrating the system from Demo to Production environment.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-[100px] animate-pulse"></div>
       </div>

       <div className="grid md:grid-cols-2 gap-8">
          {/* Institutional Branding */}
          <Card className="border-sky-100 shadow-xl rounded-[2.5rem] overflow-hidden group">
             <CardHeader className="bg-sky-50/50 p-8 border-b border-sky-100">
                <CardTitle className="text-sky-950 font-black italic flex items-center gap-2 text-xl">
                   <School className="h-5 w-5 text-sky-600" /> Branding Node
                </CardTitle>
                <CardDescription className="text-sky-400 font-bold uppercase text-[10px] tracking-widest italic pt-1">Configure campus identity and logos</CardDescription>
             </CardHeader>
             <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase text-sky-950/40 tracking-widest">College Legal Name</Label>
                   <Input defaultValue="Institutional Master Academy" className="h-12 rounded-2xl border-sky-100 focus-visible:ring-sky-500 font-bold text-sky-950 italic" />
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase text-sky-950/40 tracking-widest">Campus Domain</Label>
                   <Input defaultValue="www.college.edu" className="h-12 rounded-2xl border-sky-100 focus-visible:ring-sky-500 font-bold text-sky-950" />
                </div>
                <div className="pt-4">
                   <Button className="w-full h-14 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black italic uppercase text-xs tracking-widest shadow-xl shadow-sky-600/20 active:scale-95 transition-all">
                      <Save className="h-4 w-4 mr-2" /> Commit Identity Sync
                   </Button>
                </div>
             </CardContent>
          </Card>

          {/* DANGER ZONE: GO LIVE */}
          <Card className="border-rose-100 shadow-xl rounded-[2.5rem] overflow-hidden bg-white/50 border-2">
             <CardHeader className="bg-rose-50/50 p-8 border-b border-rose-100">
                <CardTitle className="text-rose-950 font-black italic flex items-center gap-2 text-xl italic uppercase font-black">
                   <ShieldAlert className="h-6 w-6 text-rose-600" /> System Danger Zone
                </CardTitle>
                <CardDescription className="text-rose-400 font-bold uppercase text-[10px] tracking-[0.2em] pt-1">Permanent Institutional Migration</CardDescription>
             </CardHeader>
             <CardContent className="p-8 space-y-8 h-full flex flex-col justify-between">
                <div className="space-y-4">
                   <div className="flex gap-4 p-5 rounded-2xl bg-rose-50 border border-rose-100">
                      <AlertTriangle className="h-5 w-5 text-rose-500 flex-shrink-0" />
                      <p className="text-sm font-bold text-rose-900 leading-relaxed italic">
                         Activating 'Go Live' will purge all simulated Demo data and lock the system nodes into Production Mode. This action is definitive and irreversible.
                      </p>
                   </div>
                   <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Audit Check</p>
                      <ul className="space-y-2 text-xs font-bold text-slate-500 italic">
                         <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> All modules verified</li>
                         <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Database sync confirmed</li>
                         <li className="flex items-center gap-2 text-rose-500 font-extrabold italic uppercase"><AlertTriangle className="h-3 w-3" /> DEMO DATA WIPEOUT READY</li>
                      </ul>
                   </div>
                </div>
                
                <Button 
                   onClick={handleGoLive}
                   className="w-full h-14 rounded-2xl bg-rose-600 hover:bg-black text-white font-black italic uppercase text-xs tracking-widest shadow-xl shadow-rose-950/20 active:scale-95 transition-all mt-6"
                >
                   <Trash2 className="h-4 w-4 mr-2" /> Launch 'Go Live' Protocol
                </Button>
             </CardContent>
          </Card>
       </div>

        {isMasterAdmin && (
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="pt-10 mb-10 col-span-full mx-1"
           >
              <Card className="border-sky-950 shadow-2xl rounded-[4rem] overflow-hidden bg-sky-950 text-white min-h-[500px]">
                 <CardHeader className="p-10 md:p-14 border-b border-sky-900 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                       <CardTitle className="text-4xl font-black italic flex items-center justify-center md:justify-start gap-3 uppercase tracking-tighter">
                          <Building className="h-8 w-8 text-sky-400" /> Institutional Lattice
                       </CardTitle>
                       <CardDescription className="text-sky-300 font-bold uppercase text-[10px] tracking-[0.4em] italic pt-2">Spawn & Manage Secondary Campus Nodes</CardDescription>
                    </div>
                    
                    <Dialog>
                       <DialogTrigger asChild>
                          <Button className="rounded-[1.5rem] bg-white text-sky-950 font-black italic uppercase text-[10px] tracking-widest px-10 h-14 shadow-2xl hover:bg-sky-400 transition-all active:scale-95 group">
                             <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" /> Provision New Node
                          </Button>
                       </DialogTrigger>
                       <DialogContent className="max-w-xl rounded-[3rem] p-10 bg-slate-950 border border-sky-900 text-white shadow-2xl">
                          <DialogHeader className="space-y-4 mb-8">
                             <div className="flex items-center gap-3">
                                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20">
                                   <Building className="h-6 w-6 text-sky-400" />
                                </div>
                                <span className="text-[10px] font-black uppercase text-sky-400 tracking-[0.4em] italic opacity-60">Provisioning Portal</span>
                             </div>
                             <DialogTitle className="text-4xl font-black italic uppercase tracking-tighter">Spawn New <span className="text-sky-400">Node.</span></DialogTitle>
                             <DialogDescription className="text-white/40 font-bold italic">Enter institutional parameters for the secondary campus cluster.</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                             <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">College Cluster Name</Label>
                                <Input placeholder="E.g. Group C: West Arts Node" className="h-14 rounded-2xl bg-white/5 border-white/10 focus-visible:ring-sky-500 font-bold text-white italic" />
                             </div>
                             <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Secondary Admin Email</Label>
                                <Input placeholder="admin.west@college.edu" className="h-14 rounded-2xl bg-white/5 border-white/10 focus-visible:ring-sky-500 font-bold text-sky-400 italic" />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <Button variant="ghost" className="h-14 rounded-2xl text-white/40 font-black uppercase text-[10px] tracking-widest hover:bg-white/5">Abort</Button>
                                <Button 
                                  className="h-14 rounded-2xl bg-sky-500 hover:bg-white text-white hover:text-sky-950 font-black italic uppercase tracking-widest text-[10px] shadow-xl shadow-sky-500/20"
                                  onClick={() => {
                                      // Simulated Node Spawning Action
                                      setSecondaryAdmins(prev => [
                                          ...prev, 
                                          { name: "Group C: West Arts Hub", email: "admin.west@college.edu", status: "Initializing", daysActive: 0 }
                                      ])
                                      alert("Institutional Node Provisioned Successfully. Node will launch with 'Clean State' Protocol.")
                                  }}
                                >
                                   Finalize Protocol
                                </Button>
                             </div>
                          </div>
                       </DialogContent>
                    </Dialog>
                 </CardHeader>
                 <CardContent className="p-10 md:p-14">
                    {/* MASTER NETWORK HEALTH TICKER */}
                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px"}}>
                       <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 shadow-inner">
                          <p className="text-[10px] font-black uppercase text-sky-400 tracking-[0.2em] mb-1">Managed Institutes</p>
                          <p className="text-4xl font-black italic tracking-tighter">{secondaryAdmins.length} Nodes Online</p>
                       </div>
                       <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 shadow-inner">
                          <p className="text-[10px] font-black uppercase text-sky-400 tracking-[0.2em] mb-1">Secondary Admins</p>
                          <p className="text-4xl font-black italic tracking-tighter">{secondaryAdmins.length} Delegates</p>
                       </div>
                       <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 shadow-inner">
                          <p className="text-[10px] font-black uppercase text-sky-400 tracking-[0.2em] mb-1">Avg. Node Longevity</p>
                          <p className="text-4xl font-black italic tracking-tighter">{Math.round(secondaryAdmins.reduce((acc, curr) => acc + curr.daysActive, 0) / secondaryAdmins.length)} Total Days</p>
                       </div>
                    </div>

                    <div className="grid gap-8">
                       {secondaryAdmins.map((node, i) => (
                          <div key={i} className="flex flex-col md:flex-row items-center justify-between p-8 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                             <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-sky-400/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-black italic text-xl">
                                   {node.name.includes(':') ? node.name.charAt(node.name.indexOf(':') + 2) : node.name.charAt(0)}
                                </div>
                                <div className="space-y-1">
                                   <p className="text-2xl font-black italic tracking-tight">{node.name}</p>
                                   <div className="flex items-center gap-3">
                                      <p className="text-sky-400/60 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                         <Mail className="h-4 w-4" /> {node.email}
                                      </p>
                                      <span className="w-1 h-1 rounded-full bg-sky-800" />
                                      <p className="text-sky-300 font-black italic text-[10px] uppercase">Node Active: {node.daysActive} Days</p>
                                   </div>
                                </div>
                             </div>
                             <div className="flex items-center gap-6 mt-4 md:mt-0">
                                <Badge className={`${node.status === "Active Node" ? "bg-emerald-500/20 text-emerald-400" : "bg-sky-500/20 text-sky-400"} border-0 px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest italic`}>
                                   {node.status}
                                </Badge>
                                <Button variant="ghost" className="rounded-2xl text-white/40 hover:text-white transition-all hover:bg-white/10 h-14 w-14">
                                   <ArrowRight className="h-6 w-6" />
                                </Button>
                             </div>
                          </div>
                       ))}
                       <div className="p-12 border-4 border-dashed border-sky-900 rounded-[4rem] text-center text-sky-800 italic space-y-4">
                          <p className="text-lg font-black uppercase tracking-widest opacity-40">Ready for National Cluster Expansion</p>
                          <p className="text-[10px] font-bold opacity-30 max-w-sm mx-auto">Secondary Admins receive 'Clean State' nodes and must follow Institutional Protocol for initial seeding.</p>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>
        )}

       {/* INITIALIZATION MODAL (GO LIVE) */}
       <AnimatePresence>
          {showGoLiveModal && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-20">
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl" 
                />
                
                <motion.div
                   initial={{ scale: 0.9, opacity: 0, y: 50 }}
                   animate={{ scale: 1, opacity: 1, y: 0 }}
                   exit={{ scale: 0.9, opacity: 0, y: 50 }}
                   className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
                >
                   <div className="h-3 w-full bg-rose-600"></div>
                   <div className="p-10 space-y-8">
                      <div className="text-center space-y-2">
                         <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-600 shadow-xl shadow-rose-600/10 scale-110">
                            <ShieldCheck className="h-8 w-8" />
                         </div>
                         <h3 className="text-4xl font-black italic text-rose-950 tracking-tighter uppercase leading-none">System Handover</h3>
                         <p className="text-rose-400 font-bold uppercase text-[10px] tracking-widest leading-loose">Wipe Demo Data & Secure New Super Admin Node</p>
                      </div>

                      <div className="space-y-6">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">New Production Admin Email</Label>
                            <div className="relative">
                               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                               <Input 
                                  value={config.adminUser} 
                                  onChange={(e) => setConfig({...config, adminUser: e.target.value})}
                                  placeholder="E.g. admin@yourcollege.edu" 
                                  className="pl-12 h-14 rounded-2xl border-slate-100 focus-visible:ring-rose-500 font-bold italic" 
                               />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">New Master Password</Label>
                            <div className="relative">
                               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                               <Input 
                                  type="password"
                                  value={config.adminPass} 
                                  onChange={(e) => setConfig({...config, adminPass: e.target.value})}
                                  placeholder="••••••••••••" 
                                  className="pl-12 h-14 rounded-2xl border-slate-100 focus-visible:ring-rose-500 font-bold tracking-widest" 
                               />
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-10 border-t border-slate-100">
                         <Button 
                            variant="ghost" 
                            onClick={() => setShowGoLiveModal(false)}
                            className="rounded-2xl h-14 font-black uppercase text-xs tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
                         >
                            Abort Protocol
                         </Button>
                         <Button 
                            onClick={finalizeSystem}
                            disabled={isFinalizing}
                            className="rounded-2xl h-14 bg-rose-600 hover:bg-black text-white font-black italic uppercase text-xs tracking-widest shadow-2xl shadow-rose-950/20 active:scale-95 transition-all group"
                         >
                            {isFinalizing ? (
                               <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                               <div className="flex items-center gap-2">
                                  Finalize & Secure
                                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                               </div>
                            )}
                         </Button>
                      </div>
                   </div>
                </motion.div>
             </div>
          )}
       </AnimatePresence>
    </div>
  )
}
