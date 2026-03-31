import { cookies } from "next/headers"
import { 
  Users, 
  GraduationCap, 
  Wallet, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  School,
  FileText,
  BadgeAlert,
  Clock,
  Bot,
  Bell,
  Activity,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button"
import { SuccessChart } from "@/components/dashboard/success-chart";
import { AiTutor } from "@/components/dashboard/ai-tutor";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";

import { OnboardingTrigger } from "@/components/dashboard/onboarding-trigger";

// Main Dashboard Switcher
export default async function DashboardPage() {
  const cookieStore = await cookies()
  const role = cookieStore.get("userRole")?.value || "student"
  const isFreshInstall = cookieStore.get("isFreshInstall")?.value === "true"
  const instNameRaw = cookieStore.get("instName")?.value || "Institutional Master Hub"
  const instName = decodeURIComponent(instNameRaw)

  return (
    <div className="space-y-8 pb-32 relative">
       {/* High-Impact Global Announcement Ticker */}
       <div className="relative h-12 bg-sky-950 overflow-hidden flex items-center rounded-3xl shadow-xl shadow-sky-950/20 group">
          <div className="absolute left-0 z-20 bg-sky-950 px-6 h-full flex items-center border-r border-sky-800">
             <Bell className="h-4 w-4 text-sky-400 animate-ring" />
             <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-white italic">Alert Node</span>
          </div>
          <div className="flex animate-marquee whitespace-nowrap pl-[100%] hover:pause transition-all cursor-pointer">
             <span className="text-sky-200/80 text-xs font-bold italic mx-10 uppercase tracking-widest leading-none flex items-center gap-2">
                <BadgeAlert className="h-3 w-3" /> Final Semester Audit Commences in 48 Hours. Please verify fee clearance.
             </span>
             <span className="text-secondary-100 text-xs font-black italic mx-10 uppercase tracking-widest leading-none flex items-center gap-2">
                <School className="h-3 w-3" /> Campus Digital Upgrade: New Neural Nodes online.
             </span>
          </div>
       </div>

       {isFreshInstall && role === "admin" && (
          <OnboardingTrigger />
       )}

       {role === "admin" ? <AdminDashboard instName={instName} /> : role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}
    </div>
  )
}

// --- ADMIN DASHBOARD ---
function AdminDashboard({ instName }: { instName: string }) {
  const stats = [
    { title: "Total Revenue", value: "₹4.2M", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Active Students", value: "1,240", icon: Users, color: "text-sky-500", bg: "bg-sky-50" },
    { title: "Faculty Load", value: "85%", icon: School, color: "text-indigo-500", bg: "bg-indigo-50" },
    { title: "System Alerts", value: "2 Critical", icon: BadgeAlert, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 p-10 text-white shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-4xl font-black italic tracking-tighter">Command Control: {instName}</h2>
          <p className="text-sky-300/80 max-w-md font-medium mt-2">Institutional performance is at 94% efficiency. Global academic nodes are synchronized.</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-sky-100 shadow-xl rounded-3xl overflow-hidden bg-white/50 backdrop-blur-md">
          <CardHeader className="p-6 border-b border-sky-50">
            <CardTitle className="text-sky-950 font-black italic flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Institutional Growth Index
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <SuccessChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 border-sky-100 shadow-xl rounded-3xl overflow-hidden bg-white/50 backdrop-blur-md">
           <CardHeader className="p-6 border-b border-sky-50">
            <CardTitle className="text-sky-950 font-black italic flex items-center gap-2">
              <Activity className="h-5 w-5 text-sky-600" />
              Live System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
             <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-widest italic">Server Health: 100%</div>
             <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 text-sky-900 text-xs font-bold uppercase tracking-widest italic">Database Sync: Active</div>
             <div className="p-10 mt-4 rounded-2xl bg-sky-950 text-white space-y-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                   <Calendar className="h-20 w-20" />
                </div>
                <h4 className="text-lg font-black italic uppercase tracking-tighter">Institutional Events</h4>
                <div className="space-y-3">
                   <p className="text-[9px] font-black uppercase tracking-widest text-sky-400 italic">Next Pulse: Annual Neural Summit</p>
                   <p className="text-xs font-bold italic opacity-60">Venue: Grand Auditorium Node | April 25</p>
                </div>
                <Button className="w-full rounded-xl h-10 bg-white text-sky-950 hover:bg-sky-400 font-black italic uppercase text-[9px] tracking-widest">Manage Schedule</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// --- TEACHER DASHBOARD ---
function TeacherDashboard() {
  const stats = [
    { title: "Class Attendance", value: "88%", icon: Users, color: "text-sky-600", bg: "bg-sky-50" },
    { title: "Pending Grades", value: "45", icon: FileText, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Avg. Performance", value: "B+", icon: GraduationCap, color: "text-indigo-500", bg: "bg-indigo-50" },
    { title: "Staff Meetings", value: "2 Today", icon: Clock, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-blue-700 to-sky-700 p-10 text-white shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-4xl font-black italic tracking-tighter">Academic Hub: Faculty</h2>
          <p className="text-sky-100/80 max-w-md font-medium mt-2">You have 2 lectures today. 15 assignment submissions are waiting for your review.</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-sky-100 shadow-xl rounded-3xl overflow-hidden">
           <CardHeader className="p-6 border-b border-sky-50">
            <CardTitle className="text-sky-950 font-black italic flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sky-600" />
              Student Grade Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <SuccessChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 border-sky-100 shadow-xl rounded-3xl overflow-hidden flex flex-col">
          <CardHeader className="p-6 border-b border-sky-50">
            <CardTitle className="text-sky-950 font-black italic flex items-center gap-2">
              <Bot className="h-5 w-5 text-indigo-500" />
              AI Grading Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 bg-indigo-50/10">
            <AiTutor />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// --- STUDENT DASHBOARD ---
function StudentDashboard() {
  const stats = [
    { title: "Attendance", value: "92.5%", icon: CheckCircle2, color: "text-sky-500", bg: "bg-sky-50" },
    { title: "Current GPA", value: "3.8", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Pending Fees", value: "₹0", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Courses", value: "6", icon: School, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-10 text-white shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-4xl font-black italic tracking-tighter">Personal Portal: Scholar</h2>
          <p className="text-sky-100/80 max-w-md font-medium mt-2">Welcome back! Your academic record is exemplary. 3 assignments are due this week.</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-sky-100 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="p-6 border-b border-sky-50">
             <CardTitle className="text-sky-950 font-black italic flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sky-600" />
              Academic Performance Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <SuccessChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 border-sky-100 shadow-xl rounded-3xl overflow-hidden flex flex-col">
          <CardHeader className="p-6 border-b border-sky-50">
             <CardTitle className="text-sky-950 font-black italic flex items-center gap-2">
              <Bot className="h-5 w-5 text-sky-600" />
              AI Study Companion
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 bg-sky-50/10">
            <AiTutor />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <Card className="border-sky-100/50 hover:shadow-2xl hover:shadow-sky-900/10 transition-all duration-500 group overflow-hidden relative rounded-3xl bg-white/50 backdrop-blur-sm">
      <div className={`absolute top-0 right-0 w-24 h-24 ${bg} -mr-8 -mt-8 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-[10px] font-black text-sky-900/40 tracking-widest uppercase italic">{title}</CardTitle>
        <div className={`p-3 rounded-2xl ${bg} shadow-inner`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-black text-sky-950 tracking-tighter italic">{value}</div>
      </CardContent>
    </Card>
  )
}
