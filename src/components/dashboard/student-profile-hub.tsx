"use client"

import { useState, useRef } from "react"
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  Building,
  ShieldCheck,
  Award,
  IdCard,
  QrCode,
  CreditCard,
  CheckCircle,
  XCircle,
  Download,
  School,
  Camera,
  Edit2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"

export function StudentProfileHub() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const profile = {
    name: "Aarav Sharma",
    id: "STU-001254",
    email: "aarav@univ.edu",
    major: "Techno-Systems (B.Tech)",
    year: "3rd Year (Finalist)",
    advisor: "Dr. Ishani Gupta",
    phone: "+91 9988776655",
    joined: "Aug 2023",
    status: "Active"
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1500 pb-32 pt-5">
       {/* Master Profile Identity Header */}
       <div className="relative group p-10 flex flex-col md:flex-row items-center gap-10 rounded-[3rem] bg-white border border-sky-100 shadow-[0_50px_100px_-20px_rgba(12,74,110,0.1)]">
          
          {/* Interactive Avatar Node */}
          <div className="relative w-40 h-40 group/avatar">
             <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-sky-400 to-indigo-700 flex items-center justify-center relative overflow-hidden shadow-2xl rotate-3 transition-all duration-700 group-hover/avatar:rotate-0">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white font-black text-5xl italic tracking-tighter shadow-sm hover:scale-110 transition-transform duration-700">AS</div>
                )}
                <div className="absolute top-0 right-0 p-3">
                   <ShieldCheck className="text-white/40 h-5 w-5" />
                </div>
             </div>
             
             {/* Dynamic Upload Trigger */}
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="absolute -bottom-2 -right-2 w-12 h-12 bg-sky-950 text-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white hover:bg-black transition-all active:scale-95 z-20"
             >
                <Camera className="h-5 w-5" />
             </button>
             <input 
               type="file" 
               ref={fileInputRef} 
               className="hidden" 
               accept="image/*" 
               onChange={handleImageChange}
             />
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
             <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-4">
                   <h2 className="text-5xl font-black text-sky-950 italic tracking-tighter uppercase">{profile.name}</h2>
                   <Badge className="rounded-full bg-sky-950 text-white font-black text-[9px] uppercase tracking-[0.2em] px-4 py-1.5 shadow-xl shadow-sky-950/20">Active Student</Badge>
                </div>
                <p className="text-sky-400 font-bold tracking-[0.3em] uppercase text-xs">ID: {profile.id} • Student Record Verified</p>
             </div>
             <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-bold text-sky-950/60 transition-colors">
                <p className="flex items-center gap-2 italic"><Building className="h-4 w-4 text-sky-600" /> {profile.major}</p>
                <p className="flex items-center gap-2 italic"><Award className="h-4 w-4 text-indigo-600" /> {profile.year}</p>
                
                <Dialog>
                   <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-xl border-sky-100 text-sky-600 font-black h-10 px-4 italic uppercase text-[9px] tracking-widest hover:bg-sky-50 transition-all">
                         View Digital ID
                      </Button>
                   </DialogTrigger>
                   <DialogContent className="max-w-sm rounded-[3rem] p-0 overflow-hidden border-0 shadow-2xl">
                      <div className="bg-sky-950 p-8 text-white relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-8 opacity-10">
                            <School className="h-32 w-32" />
                         </div>
                         <div className="relative z-10 flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-sky-950 font-black italic">CM</div>
                               <span className="text-[10px] font-black uppercase tracking-widest italic">Institutional Node</span>
                            </div>
                            <Badge className="bg-sky-400 text-sky-950 font-black text-[8px] px-2 italic">ESTD: 2026</Badge>
                         </div>
                         <div className="flex items-center gap-6 relative z-10">
                            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-sky-400/30 overflow-hidden shadow-xl">
                               {profileImage ? (
                                 <img src={profileImage} alt="ID Profile" className="w-full h-full object-cover" />
                               ) : (
                                 <div className="w-full h-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white text-3xl font-black italic">AS</div>
                               )}
                            </div>
                            <div className="space-y-1">
                               <h4 className="text-xl font-black italic tracking-tighter uppercase">{profile.name}</h4>
                               <p className="text-sky-300 font-bold text-[10px] uppercase tracking-widest">{profile.major}</p>
                               <p className="text-white/60 font-black text-[9px] uppercase tracking-widest">{profile.id}</p>
                            </div>
                         </div>
                      </div>
                      <div className="bg-white p-8 space-y-6">
                         <div className="flex items-center justify-between">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic">
                               <QrCode className="h-16 w-16 text-sky-950 opacity-10" />
                               <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8 translate-y-3">
                                  <QrCode className="h-14 w-14 text-sky-950" />
                               </div>
                            </div>
                            <div className="space-y-2 text-right">
                               <p className="text-[9px] font-black uppercase text-sky-400 tracking-widest">Blood Group</p>
                               <p className="text-sm font-black text-sky-950 italic">O+ Negative</p>
                               <p className="text-[9px] font-black uppercase text-sky-400 tracking-widest">Validity</p>
                               <p className="text-sm font-black text-sky-950 italic">JULY 2026</p>
                            </div>
                         </div>
                         <Button className="w-full rounded-2xl bg-sky-950 text-white h-12 font-black italic uppercase text-[10px] tracking-widest active:scale-95 transition-all outline-none">
                            Download Node Pass
                         </Button>
                      </div>
                   </DialogContent>
                </Dialog>
             </div>
          </div>
       </div>

       {/* Detailed Metadata Grid */}
       <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-sky-100 shadow-xl rounded-[2.5rem] overflow-hidden bg-white/50 backdrop-blur-xl group">
             <CardHeader className="bg-sky-50/50 p-8 border-b border-sky-100 flex flex-row items-center justify-between">
                <CardTitle className="text-sky-950 font-black italic flex items-center gap-2 text-xl">
                   <Users className="h-5 w-5 text-sky-600" /> Identity Core
                </CardTitle>
                <div className="flex items-center gap-2">
                   <Button 
                     onClick={() => fileInputRef.current?.click()}
                     className="rounded-xl px-4 h-10 bg-white/50 hover:bg-white text-sky-600 font-black text-[10px] shadow-sm uppercase border border-sky-100"
                    >
                      Update Identity Photo
                    </Button>
                </div>
             </CardHeader>
             <CardContent className="p-8 grid gap-6">
                {[
                  { icon: Mail, label: "Digital Mail", value: profile.email },
                  { icon: Phone, label: "Neural Link", value: profile.phone },
                  { icon: Calendar, label: "Genesis Date", value: profile.joined },
                  { icon: MapPin, label: "Sector Address", value: "Quadrant 04, New Delhi, India" }
                ].map((item, i) => (
                   <div key={i} className="flex items-center gap-5 group/item">
                      <div className="w-10 h-10 rounded-xl bg-white border border-sky-50 shadow-sm flex items-center justify-center text-sky-500 group-hover/item:bg-sky-600 group-hover/item:text-white transition-all">
                         <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                         <p className="text-[9px] font-black uppercase text-sky-300 tracking-[0.2em]">{item.label}</p>
                         <p className="text-sm font-bold text-sky-950 italic">{item.value}</p>
                      </div>
                   </div>
                ))}
             </CardContent>
          </Card>

          <Card className="border-sky-100 shadow-xl rounded-[2.5rem] overflow-hidden bg-white/50 backdrop-blur-xl group">
             <CardHeader className="bg-sky-50/50 p-8 border-b border-sky-100">
                <CardTitle className="text-sky-950 font-black italic flex items-center gap-2 text-xl">
                   <BookOpen className="h-5 w-5 text-indigo-600" /> Academic Registry
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8 space-y-8">
                <div className="flex items-center justify-between p-6 rounded-[2rem] bg-indigo-50/30 border border-indigo-100 group">
                   <div>
                      <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-1">Master Performance (GPA)</p>
                      <p className="text-4xl font-black text-indigo-900 italic tracking-tighter">3.88 / 4.0</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-white shadow-xl shadow-indigo-900/5 ring-4 ring-indigo-50">
                      <GraduationCap className="h-10 w-10 text-indigo-600 animate-bounce transition-all duration-3000" />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-5 rounded-3xl bg-emerald-50/50 border border-emerald-100">
                      <p className="text-[9px] font-black uppercase text-emerald-400 tracking-widest mb-1 flex items-center gap-1">
                         <CheckCircle2 className="h-3 w-3" /> Status
                      </p>
                      <p className="text-sm font-black text-emerald-900 italic uppercase">Clear Standing</p>
                   </div>
                   <div className="p-5 rounded-3xl bg-sky-50/50 border border-sky-100">
                      <p className="text-[9px] font-black uppercase text-sky-400 tracking-widest mb-1 flex items-center gap-1 uppercase">
                         Node Active
                      </p>
                      <p className="text-sm font-black text-sky-900 italic uppercase italic">Verified</p>
                   </div>
                </div>
             </CardContent>
          </Card>
       </div>
    </div>
  )
}
