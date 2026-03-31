"use client"

import { useState, useEffect } from "react"
import { AssignmentsList } from "@/components/dashboard/assignments-list"
import { GradingView } from "@/components/dashboard/grading-view"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  GraduationCap, 
  Users, 
  FileText, 
  FolderSearch, 
  ShieldCheck,
  School,
  Activity,
  Bell,
  BadgeAlert
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AssignmentsPage() {
  const [role, setRole] = useState("student")
  const [userId, setUserId] = useState("s1")

  useEffect(() => {
    const r = document.cookie.split('; ').find(row => row.startsWith('userRole='))?.split('=')[1]
    const id = document.cookie.split('; ').find(row => row.startsWith('userId='))?.split('=')[1]
    if (r) setRole(r)
    if (id) setUserId(id)
  }, [])

  // Mocking courseId and assignmentId for demo
  const mockCourseId = "d87a6c50-0000-0000-0000-000000000000";
  const mockAssignmentId = "a0000000-0000-0000-0000-000000000000"; 

  const isTeacher = role === "teacher" || role === "admin"

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32">
      {/* Dynamic Identity Header */}
      <div className={`relative overflow-hidden rounded-[2.5rem] p-10 text-white shadow-2xl ${isTeacher ? 'bg-gradient-to-br from-slate-950 via-sky-950 to-indigo-950' : 'bg-gradient-to-br from-indigo-700 via-blue-800 to-sky-700'}`}>
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
                {isTeacher ? <ShieldCheck className="h-6 w-6 text-sky-400" /> : <GraduationCap className="h-6 w-6 text-sky-200" />}
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic opacity-60">Academic Hub</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
             {isTeacher ? "Faculty Grading Hub" : "Scholar Merit Portal"}
          </h1>
          <p className="text-white/60 max-w-md font-medium text-sm italic">
            {isTeacher 
               ? "Audit submitted scholarly work, filter by class-sections, and finalize institutional grades." 
               : "Submit assignment nodes, track feedback, and audit your personal academic registry."
            }
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <School className="h-40 w-40" />
        </div>
      </div>

      {isTeacher ? (
        <div className="space-y-8">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                 <Badge className="bg-sky-50 text-sky-900 border-sky-100 font-black px-4 py-1.5 italic uppercase text-[9px] tracking-widest shadow-sm">Audit Node: Active</Badge>
                 <Badge className="bg-indigo-50 text-indigo-900 border-indigo-100 font-black px-4 py-1.5 italic uppercase text-[9px] tracking-widest shadow-sm">Role: Principal Faculty</Badge>
              </div>
           </div>
           <GradingView assignmentId={mockAssignmentId} />
        </div>
      ) : (
        <div className="space-y-10">
           <AssignmentsList courseId={mockCourseId} studentId={userId} />
           
           <Card className="border-sky-100/50 shadow-xl rounded-[2.5rem] bg-white group hover:border-sky-200 transition-all">
             <CardHeader className="p-8 border-b border-sky-50">
               <CardTitle className="text-sky-950 font-black italic flex items-center gap-2 text-xl italic uppercase tracking-tighter">
                  <FolderSearch className="h-6 w-6 text-sky-500" /> Scholar Guidelines
               </CardTitle>
             </CardHeader>
             <CardContent className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                   <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 italic transition-all group-hover:bg-sky-50/50">
                      <p className="text-[10px] font-black uppercase text-sky-400 tracking-widest mb-2">Technical Format</p>
                      <p className="text-sm font-bold text-sky-950 opacity-60">Verified Document Formats Only: PDF, DOCX, and high-fidelity JPG/PNG images.</p>
                   </div>
                   <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 italic transition-all group-hover:bg-indigo-50/50">
                      <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-2">Submission Volume</p>
                      <p className="text-sm font-bold text-sky-950 opacity-60">Maximum node size is 5MB per pedagogical submission.</p>
                   </div>
                </div>
             </CardContent>
           </Card>
        </div>
      )}
    </div>
  )
}
