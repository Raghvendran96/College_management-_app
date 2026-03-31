"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BookOpen, GraduationCap, Loader2, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [role, setRole] = React.useState<"admin" | "teacher" | "student">("admin")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation of login - saving role to cookie
    setTimeout(() => {
      document.cookie = `isLoggedIn=true; path=/`
      document.cookie = `userRole=${role}; path=/`
      router.push("/dashboard")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white p-4">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <Card className="w-full max-w-[450px] border-sky-100 shadow-2xl shadow-sky-900/10 backdrop-blur-sm bg-white/80 rounded-[2.5rem] overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600"></div>
        <CardHeader className="space-y-1 text-center pt-8">
          <div className="mx-auto w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-sky-600/30 rotate-3">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-sky-950 italic">CMS Portal Access</CardTitle>
          <CardDescription className="text-sky-500 font-bold tracking-widest uppercase text-[10px] pt-1">
            Secure Institutional Gateway
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-sky-50 rounded-2xl border border-sky-100">
            {["admin", "teacher", "student"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r as any)}
                className={`py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  role === r 
                    ? "bg-white text-sky-600 shadow-md translate-y-[-1px]" 
                    : "text-sky-400 hover:text-sky-600 hover:bg-white/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sky-950 font-black text-[10px] uppercase tracking-widest ml-1">Account Interface</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-300" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="institutional-id@college.edu" 
                  className="pl-12 h-14 rounded-2xl border-sky-100 focus-visible:ring-sky-500 focus-visible:border-sky-500 font-medium" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" title="Try 'admin123' for demo" className="text-sky-950 font-black text-[10px] uppercase tracking-widest">Entry Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-300" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-12 h-14 rounded-2xl border-sky-100 focus-visible:ring-sky-500 font-medium" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-sky-950 hover:bg-black text-white font-black text-lg h-16 rounded-2xl shadow-2xl shadow-sky-950/20 transition-all active:scale-95 italic mt-4 group" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <div className="flex items-center gap-2">
                  Launch {role.toUpperCase()} Space
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6 bg-sky-50/50 p-8 border-t border-sky-100/50">
          <div className="text-center bg-white/50 p-4 rounded-3xl border border-dashed border-sky-200 w-full group hover:bg-white transition-all cursor-pointer">
             <Link href="/register" className="text-xs font-black text-sky-400 group-hover:text-sky-600 transition-colors italic">
                Don't have an institutional node? <span className="underline underline-offset-4 decoration-2 decoration-sky-300 ml-1">Register for Portal Access</span>
             </Link>
          </div>
          <div className="text-center text-[9px] text-sky-300 flex items-center justify-center gap-2 font-black uppercase tracking-[0.2em]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Encrypted Institutional Node v1.0.4</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
