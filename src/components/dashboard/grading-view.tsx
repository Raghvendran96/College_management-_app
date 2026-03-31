"use client"

import { useState, useEffect } from "react"
import { Download, Check, Save, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getSubmissions, updateGrade, getSubmissionFileUrl } from "@/app/actions/assignments"

export function GradingView({ assignmentId }: { assignmentId: string }) {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [gradingId, setGradingId] = useState<string | null>(null)
  const [tempGrade, setTempGrade] = useState("")
  const [tempFeedback, setTempFeedback] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")

  useEffect(() => {
    async function load() {
      try {
        const data = await getSubmissions(assignmentId)
        setSubmissions(data)
      } catch (e: any) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [assignmentId])

  const handleDownload = async (path: string) => {
    const url = await getSubmissionFileUrl(path)
    window.open(url, "_blank")
  }

  const handleUpdate = async (subId: string) => {
    try {
      await updateGrade(subId, tempGrade, tempFeedback)
      setSubmissions(submissions.map(s => 
        s.id === subId ? { ...s, grade: tempGrade, feedback: tempFeedback } : s
      ))
      setGradingId(null)
      alert("Grade & Institutional Feedback Updated Successfully!")
    } catch (e: any) {
      alert("Error: " + e.message)
    }
  }

  const filteredSubmissions = submissions.filter(sub => {
    const matchName = sub.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = classFilter === "all" || sub.profiles?.class_name === classFilter;
    return matchName && matchClass;
  })

  // Get unique classes for filter
  const classes = Array.from(new Set(submissions.map(s => s.profiles?.class_name).filter(Boolean)));

  if (loading) return (
     <div className="flex items-center justify-center h-48 text-sky-400 font-bold animate-pulse">
        Initializing Faculty Data Node...
     </div>
  )

  return (
    <div className="space-y-6">
      {/* Search & Filter Node Control */}
      <div className="grid gap-6 md:grid-cols-4 items-end bg-sky-50/50 p-6 rounded-[2rem] border border-sky-100 shadow-sm">
          <div className="md:col-span-2 space-y-2">
             <label className="text-[10px] font-black uppercase text-sky-400 tracking-widest pl-2">Search Scholar Node</label>
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400" />
                <Input 
                   placeholder="Student name..." 
                   className="pl-12 rounded-2xl h-12 border-sky-100 bg-white" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-sky-400 tracking-widest pl-2">Filter By Class/Section</label>
             <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="rounded-2xl h-12 border-sky-100 bg-white shadow-sm">
                   <SelectValue placeholder="All Cohorts" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-sky-100">
                   <SelectItem value="all">All Cohorts View</SelectItem>
                   {classes.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                   ))}
                </SelectContent>
             </Select>
          </div>
          <div className="flex items-center justify-end">
             <Badge className="bg-sky-950 text-white font-black italic text-[9px] px-3 py-1.5 uppercase tracking-widest">
                {filteredSubmissions.length} Nodes Found
             </Badge>
          </div>
      </div>

      <div className="grid gap-6">
        {filteredSubmissions.length > 0 ? filteredSubmissions.map((sub) => (
          <Card key={sub.id} className="border-sky-100 shadow-xl rounded-[2.5rem] overflow-hidden group transition-all hover:border-sky-200">
            <CardHeader className="bg-white p-8 border-b border-sky-50 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-sky-50 shadow-inner flex items-center justify-center text-sky-600 font-black italic text-xl">
                    {sub.profiles?.full_name?.charAt(0)}
                 </div>
                 <div>
                    <div className="flex items-center gap-3 mb-1">
                       <CardTitle className="text-xl font-black italic text-sky-950">{sub.profiles?.full_name || "Unknown Scholar"}</CardTitle>
                       <Badge className="bg-sky-50 text-sky-600 border-sky-100 font-black text-[9px] uppercase tracking-widest px-3">CLASS: {sub.profiles?.class_name || "N/A"}</Badge>
                    </div>
                    <CardDescription className="text-xs font-bold text-sky-400 flex items-center gap-1 uppercase tracking-widest">
                       Submitted: {new Date(sub.submitted_at).toLocaleString()}
                    </CardDescription>
                 </div>
              </div>
              <Button 
                 variant="ghost" 
                 size="sm" 
                 className="rounded-2xl h-12 px-6 hover:bg-sky-50 text-sky-600 font-black italic border border-dashed border-sky-100 uppercase text-[10px] tracking-widest group-hover:border-sky-300 transition-all"
                 onClick={() => handleDownload(sub.file_url)}
              >
                <Download className="h-4 w-4 mr-2" />
                Document Audit
              </Button>
            </CardHeader>
            <CardContent className="p-8 bg-sky-50/20">
              {gradingId === sub.id ? (
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <label className="text-[10px] font-black uppercase text-sky-950 tracking-widest">Institutional Mark (Grade)</label>
                    <Input 
                      value={tempGrade} 
                      onChange={(e) => setTempGrade(e.target.value)} 
                      placeholder="e.g. A+, 95 / 100, PASS"
                      className="rounded-xl h-12 border-sky-100 focus:ring-sky-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-[10px] font-black uppercase text-sky-950 tracking-widest">Pedagogical Feedback</label>
                    <Textarea 
                      value={tempFeedback} 
                      onChange={(e) => setTempFeedback(e.target.value)} 
                      placeholder="Master node analysis..."
                      className="rounded-2xl min-h-[100px] border-sky-100 focus:ring-sky-400"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button className="rounded-2xl bg-sky-950 text-white font-black italic uppercase text-xs h-12 px-8 active:scale-95 transition-all shadow-xl shadow-sky-950/20" onClick={() => handleUpdate(sub.id)}>
                      <Save className="h-4 w-4 mr-2" />
                      Finalize Merit Data
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-sky-100 text-sky-950 font-black italic uppercase text-xs h-12 px-8" onClick={() => setGradingId(null)}>
                      Discard Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between bg-white border border-sky-50 p-8 rounded-[2rem] shadow-sm transform transition-all group-hover:scale-[1.01]">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-2">
                       <Check className={`h-4 w-4 ${sub.grade ? "text-emerald-500" : "text-slate-300"}`} />
                       <p className="text-sm font-black italic text-sky-950">
                          Grade Merit: <span className={sub.grade ? "text-emerald-600 font-black text-lg ml-2" : "text-sky-300 font-bold ml-2"}>{sub.grade || "NODE UNGRADED"}</span>
                       </p>
                    </div>
                    <div className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 italic">
                        <p className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1">Instructional Commentary</p>
                        <p className="text-sm font-medium text-sky-950/60 leading-relaxed">{sub.feedback || "Awaiting archival feedback."}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="rounded-2xl h-12 px-6 bg-sky-950 text-white hover:bg-black font-black italic uppercase text-[10px] tracking-widest shadow-xl shadow-sky-950/20 ml-6" 
                    onClick={() => {
                       setGradingId(sub.id)
                       setTempGrade(sub.grade || "")
                       setTempFeedback(sub.feedback || "")
                    }}
                  >
                    {sub.grade ? "Update Audit" : "Begin Audit"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )) : (
          <div className="p-20 text-center border-4 border-dashed rounded-[3rem] border-sky-50 text-sky-200">
             <div className="w-16 h-16 rounded-3xl bg-sky-50 flex items-center justify-center mx-auto mb-6">
                <Filter className="h-8 w-8 text-sky-100" />
             </div>
             <p className="text-xl font-black italic">No submissions match the current node filter.</p>
             <p className="text-sm font-bold uppercase tracking-widest opacity-60">Adjust your cohort or student identity filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
