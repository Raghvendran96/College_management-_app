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
  Users,
  Camera
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { sendEmail, emailTemplates } from "@/lib/email"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function SettingsPage() {
  const router = useRouter()
  const [showGoLiveModal, setShowGoLiveModal] = React.useState(false)
  const [isFinalizing, setIsFinalizing] = React.useState(false)

  // PRODUCTION HANDOVER CONFIG
  const [config, setConfig] = React.useState({
    adminUser: "",
    adminPass: "",
    instituteName: "",
    instituteLogo: ""
  })

  // IDENTITY STATES
  const [isMasterAdmin, setIsMasterAdmin] = React.useState(false)
  const [isOwner, setIsOwner] = React.useState(false)
  const [showIdentityGate, setShowIdentityGate] = React.useState(true)
  
  // FORM STATES
  const [userName, setUserName] = React.useState("")
  const [userEmail, setUserEmail] = React.useState("")
  const [userPhone, setUserPhone] = React.useState("")
  const [userLocation, setUserLocation] = React.useState("")
  const [userPurpose, setUserPurpose] = React.useState("")

  // MASTER REGISTRIES
  const [secondaryAdmins, setSecondaryAdmins] = React.useState([
    { name: "Group A: North Campus", email: "admin.north@college.edu", status: "Active Node", daysActive: 124 },
    { name: "Group B: South Science Hub", email: "admin.science@college.edu", status: "Initializing", daysActive: 12 }
  ])

  const [demoRequests, setDemoRequests] = React.useState([
    { name: "John Smith", email: "john@tech.com", phone: "+1 234 567 890", location: "Singapore", status: "Evaluation" },
    { name: "Sarah Connor", email: "sarah@future.io", phone: "+44 7788 9911", location: "London", status: "Audit" }
  ])

  const [provisioningNode, setProvisioningNode] = React.useState({ name: "", email: "" })

  React.useEffect(() => {
    // Only 'raghvendra' / 'raghvendran78@gmail.com' can be the absolute Master Admin
    const owner = document.cookie.split('; ').find(row => row.startsWith('isOwner='))?.split('=')[1]
    const verified = document.cookie.split('; ').find(row => row.startsWith('identityVerified='))?.split('=')[1]
    const fresh = document.cookie.split('; ').find(row => row.startsWith('isFreshInstall='))?.split('=')[1]

    if (owner === "true") {
      setIsMasterAdmin(true)
      setIsOwner(true)
    }
    if (verified === "true" || fresh === "true") {
      setShowIdentityGate(false)
    }
  }, [])

  const handleIdentityVerify = async () => {
    const masterName = "raghvendra"
    const masterEmail = "raghvendran78@gmail.com"

    if (userName.toLowerCase() === masterName && userEmail.toLowerCase() === masterEmail) {
      setIsOwner(true)
      setIsMasterAdmin(true)
      setShowIdentityGate(false)
      document.cookie = "identityVerified=true; path=/"
      document.cookie = "isOwner=true; path=/"
      alert("Master Owner Access Verified: Launching Global Request Board.")
    } else {
      const newRequest = { 
        name: userName, 
        email: userEmail, 
        phone: userPhone, 
        location: userLocation, 
        status: "Evaluation" 
      }
      setDemoRequests(prev => [newRequest, ...prev])

      try {
        await sendEmail({
          to: masterEmail,
          subject: `🔔 New Demo Delegate: ${userName}`,
          html: emailTemplates.demoRequestNotify(userName, userEmail, userPhone, userLocation, userPurpose)
        });
      } catch (e) {
        console.error("Failed to trigger alert node:", e);
      }
      
      setShowIdentityGate(false)
      document.cookie = "identityVerified=true; path=/"
      alert(`Institutional Delegate Node Verified: Welcome ${userName}. Launching High-Fidelity simulation.`)
    }
  }

  const finalizeSystem = () => {
    if (!config.adminUser || !config.adminPass || !config.instituteName) {
      return alert("Please enter the new Super Admin credentials and Institute Name.")
    }
    setIsFinalizing(true)
    setTimeout(() => {
      document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "isDemoMode=false; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "identityVerified=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "isOwner=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"

      document.cookie = "isFreshInstall=true; path=/" 
      document.cookie = `instName=${encodeURIComponent(config.instituteName)}; path=/`
      document.cookie = `instLogo=${encodeURIComponent(config.instituteLogo)}; path=/`
      
      router.push("/login?status=live_initialized")
      setIsFinalizing(false)
    }, 2500)
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32">
       {/* IDENTITY GATE */}
       <AnimatePresence>
          {showIdentityGate && (
             <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-3xl">
                <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="w-full max-w-lg bg-sky-950 border border-sky-900 rounded-[3.5rem] p-12 text-white space-y-8"
                >
                   <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-sky-400 border border-sky-500/20">
                         <ShieldCheck className="h-8 w-8" />
                      </div>
                      <h3 className="text-4xl font-black italic uppercase tracking-tighter">Identity <span className="text-sky-400">Node Audit.</span></h3>
                   </div>
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-white/40 italic">Full Name</Label>
                            <Input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Full Name..." className="h-14 rounded-2xl bg-white/5 border-white/10 text-white italic" />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-white/40 italic">Email ID</Label>
                            <Input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="you@college.edu" className="h-14 rounded-2xl bg-white/5 border-white/10 text-sky-400 italic" />
                         </div>
                      </div>
                      <Button onClick={handleIdentityVerify} className="w-full h-14 rounded-2xl bg-sky-500 hover:bg-white text-white hover:text-sky-950 font-black italic uppercase tracking-widest text-[10px] transition-all active:scale-95">Verify Persona</Button>
                   </div>
                </motion.div>
             </div>
          )}
       </AnimatePresence>

       {/* HEADER */}
       <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 to-indigo-950 p-12 text-white shadow-2xl">
          <div className="relative z-10 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-black uppercase text-[10px] tracking-[0.3em]">
                <Settings className="h-4 w-4" /> System Parameters
             </div>
             <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">System<br /><span className="text-sky-500">Config.</span></h2>
          </div>
       </div>

       <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-sky-100 shadow-xl rounded-[2.5rem]">
             <CardHeader className="bg-sky-50/50 p-8">
                <CardTitle className="text-sky-950 font-black italic flex items-center gap-2 text-xl">
                   <School className="h-5 w-5 text-sky-600" /> Branding Node
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8 space-y-6">
                <Input defaultValue="Institutional Master Hub" className="h-12 rounded-2xl border-sky-100 font-bold italic" />
                <Button className="w-full h-14 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black italic uppercase text-xs tracking-widest transition-all">Save Sync</Button>
             </CardContent>
          </Card>

          <Card className="border-rose-100 shadow-xl rounded-[2.5rem] border-2">
             <CardHeader className="bg-rose-50/50 p-8">
                <CardTitle className="text-rose-950 font-black italic flex items-center gap-2 text-xl uppercase">
                   <ShieldAlert className="h-6 w-6 text-rose-600" /> Danger Zone
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8 space-y-8">
                <p className="text-sm font-bold text-rose-900 leading-relaxed italic">Activating 'Go Live' will purge all simulated Demo data and lock the system nodes into Production Mode.</p>
                <Button onClick={() => setShowGoLiveModal(true)} className="w-full h-14 rounded-2xl bg-rose-600 hover:bg-black text-white font-black italic uppercase text-xs tracking-widest transition-all">Launch Go Live</Button>
             </CardContent>
          </Card>
       </div>

       {isMasterAdmin && (
          <div className="pt-10">
             <Card className="bg-sky-950 border-sky-950 rounded-[4rem] text-white p-10">
                <CardHeader className="flex flex-row items-center justify-between pb-10">
                   <CardTitle className="text-3xl font-black italic uppercase tracking-tighter flex items-center gap-4">
                      <Building className="h-8 w-8 text-sky-400" /> Institutional Lattice
                   </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="grid gap-6">
                      {secondaryAdmins.map((node, i) => (
                         <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/10">
                            <span className="text-xl font-black italic">{node.name}</span>
                            <Badge className="bg-sky-500/20 text-sky-400">{node.status}</Badge>
                         </div>
                      ))}
                   </div>
                </CardContent>
             </Card>
          </div>
       )}

       {/* GO LIVE MODAL */}
       <AnimatePresence>
          {showGoLiveModal && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-2xl">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl p-12 space-y-10">
                   <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-600">
                         <ShieldCheck className="h-8 w-8" />
                      </div>
                      <h3 className="text-4xl font-black italic text-rose-950 tracking-tighter uppercase">Institutional Handover</h3>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase text-slate-400">Institute Legal Name</Label>
                         <Input value={config.instituteName} onChange={(e) => setConfig({...config, instituteName: e.target.value})} placeholder="E.g. Harvard University" className="h-14 rounded-2xl italic font-bold" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase text-slate-400">Institutional Logo</Label>
                         <div className="relative group overflow-hidden rounded-2xl border bg-slate-50 h-14 flex items-center px-4">
                            <Input 
                               type="file" 
                               accept="image/*" 
                               className="absolute inset-0 opacity-0 cursor-pointer" 
                               onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) {
                                     const reader = new FileReader()
                                     reader.onloadend = () => setConfig({...config, instituteLogo: reader.result as string})
                                     reader.readAsDataURL(file)
                                  }
                               }} 
                            />
                            <div className="flex items-center gap-3 w-full">
                               <Camera className="h-4 w-4 text-slate-400" />
                               <span className="text-xs font-black italic text-slate-400 truncate flex-1">
                                  {config.instituteLogo ? "Asset Selected" : "Upload PNG/JPG"}
                               </span>
                               {config.instituteLogo && <img src={config.instituteLogo} className="h-8 w-8 rounded-lg object-contain bg-white border" />}
                            </div>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase text-slate-400">Production Admin Email</Label>
                         <Input value={config.adminUser} onChange={(e) => setConfig({...config, adminUser: e.target.value})} placeholder="admin@college.edu" className="h-14 rounded-2xl font-bold italic" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase text-slate-400">Master Password</Label>
                         <Input type="password" value={config.adminPass} onChange={(e) => setConfig({...config, adminPass: e.target.value})} placeholder="••••••••" className="h-14 rounded-2xl font-bold" />
                      </div>
                   </div>

                   <div className="flex gap-4 pt-10 border-t items-center">
                      <Button variant="ghost" onClick={() => setShowGoLiveModal(false)} className="h-14 rounded-2xl flex-1 font-black uppercase text-xs">Abort Protocol</Button>
                      <Button onClick={finalizeSystem} disabled={isFinalizing} className="h-14 rounded-2xl bg-rose-600 text-white font-black italic uppercase text-xs flex-[2] transition-all active:scale-95">
                         {isFinalizing ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Finalize & Launch Handover"}
                      </Button>
                   </div>
                </motion.div>
             </div>
          )}
       </AnimatePresence>
    </div>
  )
}
