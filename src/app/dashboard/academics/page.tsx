"use client"

import React from "react"
import Link from "next/link"
import { 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Calendar, 
  Library, 
  Search, 
  MoreVertical,
  Plus,
  Clock,
  MapPin,
  Bot,
  ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

export default function AcademicsPage() {
  const [role, setRole] = React.useState("admin")

  React.useEffect(() => {
    const userRole = document.cookie.split('; ').find(row => row.startsWith('userRole='))?.split('=')[1]
    if (userRole) setRole(userRole)
  }, [])

  if (role === "admin") return <AdminAcademicsView />
  if (role === "teacher") return <TeacherAcademicsView />
  return <StudentAcademicsView />
}

// --- ADMIN ACADEMICS MANAGEMENT ---
function AdminAcademicsView() {
  const [isAddCourseOpen, setIsAddCourseOpen] = React.useState(false)
  const [courses, setCourses] = React.useState([
    { name: "Computer Science & Engineering", id: "CSE-2025", students: 450, faculty: 24, status: "Active" },
    { name: "Artificial Intelligence", id: "AI-101", students: 120, faculty: 12, status: "Active" },
    { name: "Electronics & Communication", id: "ECE-302", students: 380, faculty: 18, status: "Review" },
  ])

  const [newCourse, setNewCourse] = React.useState({
    name: "", id: "", students: 0, faculty: 0, status: "Active"
  })

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.id) return
    setCourses([...courses, newCourse])
    setIsAddCourseOpen(false)
    setNewCourse({ name: "", id: "", students: 0, faculty: 0, status: "Active" })
    alert("Academic Node Provisioned Successfully! 🏆📚")
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-900 via-sky-950 to-indigo-950 p-10 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-2">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-tight">Academic Curriculum Hub</h2>
              <p className="text-sky-300 font-medium italic opacity-80">Global course auditing, department health metrics, and curriculum lifecycle management.</p>
           </div>
           
           <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
              <DialogTrigger asChild>
                 <Button className="rounded-2xl bg-white text-sky-950 hover:bg-sky-50 h-14 px-8 font-black uppercase text-xs tracking-widest shadow-xl shadow-white/10 group transition-all">
                    New Course
                    <Plus className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                 </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-slate-950 border-sky-900 rounded-[3rem] p-10 text-white shadow-3xl">
                 <DialogHeader className="space-y-4 mb-8">
                    <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                       <ShieldCheck className="h-8 w-8" />
                    </div>
                    <DialogTitle className="text-4xl font-black italic uppercase tracking-tighter italic">Provision <span className="text-sky-400">Course.</span></DialogTitle>
                    <DialogDescription className="text-white/40 font-bold uppercase text-[10px] tracking-[0.4em] italic">Deploy New Curriculum Node</DialogDescription>
                 </DialogHeader>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Course Name</Label>
                       <Input 
                          value={newCourse.name}
                          onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                          className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-white italic" 
                       />
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Course Code</Label>
                       <Input 
                          value={newCourse.id}
                          onChange={(e) => setNewCourse({...newCourse, id: e.target.value})}
                          className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-sky-400 italic" 
                       />
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Student Capacity</Label>
                       <Input 
                          type="number"
                          value={newCourse.students}
                          onChange={(e) => setNewCourse({...newCourse, students: parseInt(e.target.value)})}
                          className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-white italic" 
                       />
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 italic">Faculty Assignment</Label>
                       <Input 
                          type="number"
                          value={newCourse.faculty}
                          onChange={(e) => setNewCourse({...newCourse, faculty: parseInt(e.target.value)})}
                          className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-sky-500 font-bold text-sky-400 italic" 
                       />
                    </div>
                 </div>

                 <Button 
                    onClick={handleAddCourse}
                    className="w-full h-16 rounded-3xl mt-12 bg-sky-500 hover:bg-white text-white hover:text-sky-950 font-black italic uppercase tracking-widest shadow-2xl shadow-sky-500/20 transition-all active:scale-95"
                 >
                    Finalize Course Provisioning
                 </Button>
              </DialogContent>
           </Dialog>
        </div>
        <div className="absolute top-0 right-0 -translate-y-10 translate-x-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
         {courses.map((c, i) => (
            <Card key={i} className="border-sky-100 hover:shadow-2xl hover:shadow-sky-900/10 transition-all rounded-[2.5rem] overflow-hidden group bg-white/50 backdrop-blur-xl">
               <div className="h-2 w-full bg-sky-100 group-hover:bg-sky-600 transition-colors"></div>
               <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-inner">
                        <Library className="h-6 w-6" />
                     </div>
                     <Badge className="bg-sky-50 text-sky-600 font-black text-[9px] uppercase tracking-widest px-3 py-1">Code: {c.id}</Badge>
                  </div>
                  <h3 className="text-xl font-black text-sky-950 italic min-h-[50px] leading-tight">{c.name}</h3>
                  <div className="space-y-3 pt-4 border-t border-sky-50">
                     <div className="flex items-center justify-between text-xs font-bold text-sky-950/40 uppercase tracking-widest leading-none">
                        <span>Students</span>
                        <span className="text-sky-950">{c.students}</span>
                     </div>
                     <div className="flex items-center justify-between text-xs font-bold text-sky-950/40 uppercase tracking-widest leading-none">
                        <span>Faculty</span>
                        <span className="text-sky-950">{c.faculty}</span>
                     </div>
                  </div>
                  <Link href="/dashboard/ai" className="w-full inline-block">
                    <Button variant="ghost" className="w-full rounded-2xl hover:bg-sky-50 text-sky-500 font-bold h-12 uppercase text-[10px] tracking-widest border border-dashed border-sky-100 transition-all">
                       View Curriculum
                    </Button>
                  </Link>
               </CardContent>
            </Card>
         ))}
      </div>
    </div>
  )
}

// --- TEACHER ACADEMICS VIEW ---
function TeacherAcademicsView() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
       <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-700 via-blue-800 to-sky-700 p-10 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="space-y-2">
                <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-tight">Faculty Academic Lab</h2>
                <p className="text-sky-100 font-medium italic">Your active lectures, syllabus tracking, and academic progress for assigned courses.</p>
             </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] animate-pulse"></div>
       </div>

       <div className="grid lg:grid-cols-7 gap-8">
          <Card className="lg:col-span-5 border-sky-100 shadow-xl rounded-[2.5rem] overflow-hidden">
             <CardHeader className="bg-sky-50/50 p-8 border-b border-sky-100 flex flex-row items-center justify-between">
                <CardTitle className="text-sky-950 font-black italic flex items-center gap-2">
                   <Clock className="h-5 w-5 text-sky-600" /> Lecture Schedule
                </CardTitle>
                <div className="flex items-center gap-2 text-xs font-black text-sky-400 italic">March 31, 2026 - April 06, 2026</div>
             </CardHeader>
             <CardContent className="p-0">
                {[
                  { time: "09:00 AM", subj: "Advanced Data Structures", hall: "LH-04", icon: BookOpen },
                  { time: "11:30 AM", subj: "Machine Learning Lab", hall: "Lab-01", icon: Bot },
                  { time: "02:00 PM", subj: "Discrete Mathematics", hall: "LH-12", icon: GraduationCap },
                ].map((l, i) => (
                   <div key={i} className="group p-8 border-b border-sky-50 last:border-0 hover:bg-sky-50 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-6">
                         <div className="text-center min-w-[80px]">
                            <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Starts</p>
                            <p className="text-lg font-black text-sky-950 italic">{l.time}</p>
                         </div>
                         <div className="w-12 h-12 rounded-2xl bg-white border border-sky-100 shadow-sm flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all">
                            <l.icon className="h-5 w-5" />
                         </div>
                         <div>
                            <h4 className="text-xl font-black text-sky-950 italic">{l.subj}</h4>
                            <p className="text-xs font-bold text-sky-400 flex items-center gap-1 italic">
                               <MapPin className="h-3 w-3" /> Location: {l.hall}
                            </p>
                         </div>
                      </div>
                      <Button className="rounded-xl h-10 w-10 p-0 bg-transparent hover:bg-white text-sky-600 font-bold border border-sky-50 group-hover:border-sky-300">
                         <MoreVertical className="h-4 w-4" />
                      </Button>
                   </div>
                ))}
             </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-sky-100 shadow-xl rounded-[2.5rem] overflow-hidden bg-sky-950 text-white flex flex-col p-10 justify-between">
              <div className="space-y-6">
                 <div className="w-14 h-14 rounded-2xl bg-sky-400/20 flex items-center justify-center text-sky-400">
                    <TrendingUp className="h-6 w-6" />
                 </div>
                 <h3 className="text-3xl font-black italic tracking-tighter leading-none">Course Progress Index</h3>
                 <div className="space-y-4">
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2">Syllabus Covered</div>
                       <div className="h-1.5 w-full bg-sky-900 rounded-full overflow-hidden">
                          <div className="h-full w-[74%] bg-sky-400 rounded-full"></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2">Student Engagement</div>
                       <div className="h-1.5 w-full bg-sky-900 rounded-full overflow-hidden">
                          <div className="h-full w-[91%] bg-sky-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                       </div>
                    </div>
                 </div>
              </div>
               <Link href="/dashboard/ai" className="w-full">
                  <Button className="rounded-2xl h-14 bg-white text-sky-950 hover:bg-sky-50 font-black italic uppercase text-xs tracking-widest mt-10 w-full animate-pulse shadow-xl shadow-white/10">
                     Start Next Session
                  </Button>
               </Link>
          </Card>
       </div>
    </div>
  )
}

// --- STUDENT ACADEMICS VIEW ---
function StudentAcademicsView() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
       <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-teal-700 to-sky-700 p-10 text-white shadow-2xl">
          <div className="relative z-10 space-y-2 text-center md:text-left">
             <h2 className="text-4xl font-black italic tracking-tighter uppercase">Academic Journey</h2>
             <p className="text-sky-100 font-medium italic opacity-80">Track your courses, semester health, and future degree roadmap.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
       </div>

       <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-sky-100 shadow-xl rounded-[2.5rem] overflow-hidden group">
             <CardHeader className="bg-sky-50/50 p-8 border-b border-sky-100">
                <CardTitle className="text-sky-950 font-black italic flex items-center gap-2">
                   <Calendar className="h-5 w-5 text-sky-600" /> Active Course Terminal
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8 space-y-6">
                {[
                  { name: "Artificial Intelligence Concepts", prof: "Dr. Ishani Gupta", progress: 85 },
                  { name: "Network Security Lab", prof: "Prof. Rajesh Kumar", progress: 54 },
                  { name: "AI Ethics & Global Policy", prof: "Prof. Elena Gilbert", progress: 91 },
                ].map((c, i) => (
                   <div key={i} className="group/item cursor-pointer">
                      <div className="flex justify-between items-center mb-3">
                         <div className="space-y-0.5">
                            <p className="font-black text-sky-950 italic">{c.name}</p>
                            <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest leading-none">Instructor: {c.prof}</p>
                         </div>
                         <p className="text-lg font-black text-sky-950 italic">{c.progress}%</p>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-sky-500 rounded-full group-hover/item:bg-sky-600 transition-all duration-700" style={{ width: `${c.progress}%` }}></div>
                      </div>
                   </div>
                ))}
             </CardContent>
          </Card>

          <Card className="border-sky-100 shadow-xl rounded-[2.5rem] overflow-hidden bg-slate-50/50">
             <CardHeader className="bg-white p-8 border-b border-sky-50">
                <CardTitle className="text-sky-950 font-black italic flex items-center gap-2">
                   <Library className="h-5 w-5 text-indigo-600" /> Degree Progress Path
                </CardTitle>
             </CardHeader>
             <CardContent className="p-10 flex flex-col items-center text-center space-y-6">
                <div className="w-32 h-32 rounded-full border-[10px] border-sky-100 flex items-center justify-center relative">
                   <div className="absolute inset-0 rounded-full border-[10px] border-sky-500 border-t-transparent animate-spin duration-[6.5s]"></div>
                   <p className="text-3xl font-black text-sky-950 italic tracking-tighter">74%</p>
                </div>
                <div className="space-y-1">
                   <p className="text-xl font-black text-sky-950 italic">3rd Year Complete</p>
                   <p className="text-xs font-bold text-sky-400 uppercase tracking-[0.2em]">68 Credits Earned</p>
                </div>
                <Link href="/dashboard/ai" className="w-full inline-block">
                  <Button className="w-full h-16 rounded-2xl bg-sky-950 text-white hover:bg-black font-black italic uppercase tracking-tighter shadow-2xl shadow-sky-950/20 active:scale-95 transition-all">
                     Start Next Session
                  </Button>
                </Link>
             </CardContent>
          </Card>
       </div>
    </div>
  )
}
