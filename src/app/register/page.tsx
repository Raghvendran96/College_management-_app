"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  BookOpen, 
  GraduationCap, 
  Loader2, 
  Lock, 
  Mail, 
  User, 
  Building, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [role, setRole] = React.useState<"student" | "teacher" | "admin">("student")
  
  // Registration data
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    idNumber: "",
    department: "",
    specialization: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation of registration logic
    setTimeout(() => {
      // Set a temporary cookie and redirect to login
      document.cookie = `registeredAs=${role}; path=/`
      router.push("/login")
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent)] overflow-hidden pointer-events-none"></div>

      <Card className="w-full max-w-[600px] border-sky-100/50 shadow-2xl shadow-sky-900/10 backdrop-blur-xl bg-white/80 rounded-[3rem] overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 animate-pulse"></div>
        
        <div className="grid md:grid-cols-5 h-full">
           {/* Visual Banner (Sidebar in Registration) */}
           <div className="hidden md:flex md:col-span-2 bg-sky-950 p-8 flex-col justify-between text-white relative">
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-sky-500/20">
                    <BookOpen className="text-sky-950 h-6 w-6" />
                 </div>
                 <h2 className="text-2xl font-black italic tracking-tighter leading-tight mb-4">
                    Join the Elite<br />Institutional Network.
                 </h2>
                 <p className="text-sky-200/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                    Access high-end academic tools and AI study companions instantly.
                 </p>
              </div>
              <div className="relative z-10 pt-10">
                 <div className="flex -space-x-3 mb-4">
                    {[1, 2, 3].map((i) => (
                       <div key={i} className="w-8 h-8 rounded-full border-2 border-sky-950 bg-sky-800 flex items-center justify-center text-[10px] font-bold">
                          {i}
                       </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-sky-950 bg-sky-600 flex items-center justify-center text-[10px] icon-plus">
                       +
                    </div>
                 </div>
                 <p className="text-[10px] font-black uppercase text-sky-400 tracking-widest">
                    1,200+ Active Scholars
                 </p>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full blur-3xl"></div>
           </div>

           {/* Registration Form Area */}
           <div className="md:col-span-3 p-8 md:p-10">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-3xl font-black text-sky-950 italic tracking-tight">Onboarding Portal</CardTitle>
                <CardDescription className="text-sky-400 font-bold uppercase text-[10px] tracking-widest mt-1">Select your role to start</CardDescription>
              </CardHeader>

              {/* Enhanced Role Selector */}
              <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl mb-8 border border-slate-200/50">
                 {["student", "teacher", "admin"].map((r) => (
                    <button
                       key={r}
                       type="button"
                       onClick={() => setRole(r as any)}
                       className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          role === r 
                             ? "bg-white text-sky-600 shadow-xl shadow-sky-900/5 border border-sky-50 scale-105" 
                             : "text-slate-400 hover:text-slate-600"
                       }`}
                    >
                       {r}
                    </button>
                 ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-sky-950 ml-1">Legal Name</Label>
                       <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-sky-300" />
                          <Input className="pl-10 h-12 rounded-2xl bg-white border-sky-50 focus-visible:ring-sky-500 font-medium" placeholder="E.g. John Doe" required />
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-sky-950 ml-1">Work Email</Label>
                       <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-sky-300" />
                          <Input type="email" className="pl-10 h-12 rounded-2xl bg-white border-sky-50 focus-visible:ring-sky-500 font-medium" placeholder="node@univ.edu" required />
                       </div>
                    </div>
                 </div>

                 {/* ROLE SPECIFIC FIELDS */}
                 <div className="p-5 rounded-3xl bg-sky-50 border border-sky-100/50 space-y-4 shadow-inner">
                    <p className="text-[9px] font-black uppercase text-sky-700 tracking-[0.2em] mb-2 flex items-center gap-2">
                       <CheckCircle2 className="h-3 w-3" />
                       Credential Requirements
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                          <Label className="text-[9px] font-bold text-sky-900">{role === 'student' ? 'Scholar ID' : 'Faculty ID'}</Label>
                          <Input className="h-10 rounded-xl bg-white border-sky-50 focus-visible:ring-sky-500 font-bold tracking-widest" placeholder="ABC-123" required />
                       </div>
                       <div className="space-y-1.5">
                          <Label className="text-[9px] font-bold text-sky-900">{role === 'student' ? 'Course Major' : 'Department'}</Label>
                          <Input className="h-10 rounded-xl bg-white border-sky-50 focus-visible:ring-sky-500 font-bold" placeholder="E.g. Computer Science" required />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-sky-950 ml-1">Access Password</Label>
                    <div className="relative">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-sky-300" />
                       <Input type="password" placeholder="••••••••" className="pl-10 h-12 rounded-2xl bg-white border-sky-50 focus-visible:ring-sky-500 font-medium" required />
                    </div>
                 </div>

                 <Button 
                    type="submit" 
                    className="w-full h-14 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-sky-600/20 active:scale-95 transition-all mt-4 group"
                    disabled={isLoading}
                   >
                    {isLoading ? (
                       <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                       <div className="flex items-center gap-2 italic">
                          Activate {role} node
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                       </div>
                    )}
                 </Button>
              </form>

              <div className="mt-8 text-center bg-slate-50 p-4 rounded-3xl border border-dashed border-slate-200">
                 <p className="text-xs font-bold text-slate-400 italic">
                    Already an active node? 
                    <Link href="/login" className="text-sky-600 hover:text-sky-700 ml-1 font-black underline underline-offset-4 decoration-2 decoration-sky-300">
                       Log In Securely
                    </Link>
                 </p>
              </div>
           </div>
        </div>

        <CardFooter className="py-6 bg-slate-50 flex items-center justify-center gap-3 border-t border-slate-100">
           <ShieldCheck className="text-sky-300 h-4 w-4" />
           <p className="text-[9px] font-black text-sky-300 uppercase tracking-[0.5em] italic">Institutional Integrity Secured</p>
        </CardFooter>
      </Card>
    </div>
  )
}
