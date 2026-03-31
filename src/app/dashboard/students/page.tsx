import { cookies } from "next/headers"
import Link from "next/link"
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
  School
} from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

export default async function InstitutionalInfoPage() {
  const cookieStore = await cookies()
  const role = cookieStore.get("userRole")?.value || "student"

  if (role === "admin") return <AdminStakeholderView />
  if (role === "teacher") return <TeacherDirectoryView />
  return <StudentProfileView />
}

// --- ADMIN STAKEHOLDER MANAGEMENT ---
function AdminStakeholderView() {
  const people = [
    { name: "Aarav Sharma", role: "Student", div: "CS-A", status: "Active", email: "aarav@univ.edu" },
    { name: "Dr. Ishani Gupta", role: "Faculty", div: "AI/ML", status: "Active", email: "ishani@univ.edu" },
    { name: "Elena Gilbert", role: "Student", div: "CS-B", status: "On Leave", email: "elena@univ.edu" },
    { name: "Prof. Rajesh Kumar", role: "Faculty", div: "Mathematics", status: "Active", email: "rajesh@univ.edu" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-sky-950 to-slate-900 p-10 text-white shadow-2xl shadow-sky-900/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-2">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-tight">Master Stakeholder Hub</h2>
              <p className="text-sky-300 font-medium italic opacity-80">Full administrative control over all institutional nodes: Staff, Students, and External Faculty.</p>
           </div>
           <Link href="/register">
              <Button className="rounded-2xl bg-white text-sky-950 hover:bg-sky-50 h-14 px-8 font-black uppercase text-xs tracking-widest shadow-xl shadow-white/10 active:scale-95 group transition-all">
                 Add New Node
                 <Plus className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
              </Button>
           </Link>
        </div>
        <div className="absolute top-0 right-0 -translate-y-10 translate-x-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid gap-6">
         <Card className="border-sky-100 shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-sky-50/50 p-6 border-b border-sky-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="flex items-center gap-4 flex-1 max-w-md relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400" />
                  <Input placeholder="Search nodes by name, ID or role..." className="pl-12 h-12 rounded-2xl border-sky-100 shadow-sm" />
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl border-sky-100 text-sky-600 font-bold h-12 px-4 shadow-sm">
                     <Filter className="h-4 w-4 mr-2" />
                     Filters
                  </Button>
                  <Link href="/dashboard/help" className="inline-block">
                    <Button variant="outline" className="rounded-xl border-sky-100 text-sky-600 font-bold h-12 px-4 shadow-sm">
                       Export Node Registry
                    </Button>
                  </Link>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                  <TableHeader className="bg-white">
                     <TableRow className="hover:bg-transparent px-6 border-b border-sky-50">
                        <TableHead className="font-black uppercase tracking-widest text-sky-950/40 text-[10px] pl-10 h-14">Identity Node</TableHead>
                        <TableHead className="font-black uppercase tracking-widest text-sky-950/40 text-[10px] h-14">Classification</TableHead>
                        <TableHead className="font-black uppercase tracking-widest text-sky-950/40 text-[10px] h-14">Department/Div</TableHead>
                        <TableHead className="font-black uppercase tracking-widest text-sky-950/40 text-[10px] h-14">Health Status</TableHead>
                        <TableHead className="font-black uppercase tracking-widest text-sky-950/40 text-[10px] h-14 text-right pr-10"></TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {people.map((p, i) => (
                        <TableRow key={i} className="group hover:bg-sky-50 transition-colors border-b border-sky-50 px-6">
                           <TableCell className="pl-10 h-20">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 font-black italic shadow-inner">
                                    {p.name.charAt(0)}
                                 </div>
                                 <div>
                                    <p className="font-bold text-sky-950 text-sm italic">{p.name}</p>
                                    <p className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">{p.email}</p>
                                 </div>
                              </div>
                           </TableCell>
                           <TableCell>
                              <Badge className={`rounded-lg px-2.5 py-1 uppercase text-[9px] font-black tracking-widest ${
                                 p.role === 'Faculty' ? 'bg-indigo-100 text-indigo-700' : 'bg-sky-100 text-sky-700'
                              }`}>
                                 {p.role}
                              </Badge>
                           </TableCell>
                           <TableCell className="font-bold text-sky-950/60 text-xs italic">{p.div}</TableCell>
                           <TableCell>
                              <div className="flex items-center gap-2">
                                 <div className={`w-2 h-2 rounded-full ring-2 ring-white shadow-lg ${
                                    p.status === 'Active' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-amber-400 shadow-amber-500/20'
                                 }`} />
                                 <span className="text-[10px] font-black uppercase text-sky-950/40">{p.status}</span>
                              </div>
                           </TableCell>
                           <TableCell className="text-right pr-10">
                              <Button variant="ghost" size="icon" className="group-hover:text-sky-600 transition-colors">
                                 <MoreVertical className="h-4 w-4" />
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}

// --- TEACHER DIRECTORY VIEW ---
function TeacherDirectoryView() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
       <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-sky-700 p-10 text-white shadow-2xl">
          <div className="relative z-10 space-y-2">
             <h2 className="text-4xl font-black italic tracking-tighter uppercase">Student Directory</h2>
             <p className="text-sky-100 font-medium italic">Monitor progress, attendance, and health metrics of all students in your current cohort.</p>
          </div>
          <div className="absolute bottom-0 right-0 p-10 opacity-10">
             <GraduationCap className="h-32 w-32" />
          </div>
       </div>

       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Aarav Sharma", "Elena Gilbert", "Isabella Garcia", "John Smith", "Sara Miller", "Michael Ross"].map((name, i) => (
             <Card key={i} className="border-sky-100 hover:shadow-2xl hover:shadow-sky-900/10 transition-all rounded-[2.5rem] overflow-hidden group">
                <div className="h-2 w-full bg-sky-200 group-hover:bg-sky-600 transition-colors"></div>
                <CardContent className="p-8 space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 text-xl font-black italic shadow-inner">{name.charAt(0)}</div>
                      <Badge className="bg-sky-50 text-sky-600 font-black text-[9px] uppercase tracking-widest px-3 py-1">Class {i+1}A</Badge>
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-xl font-black text-sky-950 italic">{name}</h3>
                      <p className="text-xs font-bold text-sky-400 flex items-center gap-1 uppercase tracking-widest leading-none">
                         <IdCard className="h-3 w-3" /> STU-00{i+1}254
                      </p>
                   </div>
                   <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sky-50 text-center">
                      <div>
                         <p className="text-[9px] font-black uppercase text-sky-300 tracking-widest">Attendance</p>
                         <p className="text-lg font-black text-sky-950 italic">{85+i}%</p>
                      </div>
                      <div>
                         <p className="text-[9px] font-black uppercase text-sky-300 tracking-widest">GPA</p>
                         <p className="text-lg font-black text-sky-950 italic">3.{i+1}</p>
                      </div>
                   </div>
                   <Button variant="ghost" className="w-full rounded-2xl hover:bg-sky-50 text-sky-500 font-bold h-12 uppercase text-[10px] tracking-widest border border-dashed border-sky-100 group-hover:border-sky-300 transition-all">
                      View Student Metrics
                   </Button>
                </CardContent>
             </Card>
          ))}
       </div>
    </div>
  )
}

import { StudentProfileHub } from "@/components/dashboard/student-profile-hub"

// --- STUDENT PROFILE MASTER VIEW ---
function StudentProfileView() {
  return <StudentProfileHub />
}
