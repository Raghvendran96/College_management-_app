"use client"

import { useState, useEffect } from "react"
import { Download, Check, Save } from "lucide-react"
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
import { getSubmissions, updateGrade, getSubmissionFileUrl } from "@/app/actions/assignments"

export function GradingView({ assignmentId }: { assignmentId: string }) {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [gradingId, setGradingId] = useState<string | null>(null)
  const [tempGrade, setTempGrade] = useState("")
  const [tempFeedback, setTempFeedback] = useState("")

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
      alert("Grade updated!")
    } catch (e: any) {
      alert("Error: " + e.message)
    }
  }

  if (loading) return <div>Loading submissions...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Student Submissions</h2>
      <div className="grid gap-4">
        {submissions.length > 0 ? submissions.map((sub) => (
          <Card key={sub.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">{sub.profiles?.full_name || "Unknown Student"}</CardTitle>
                <CardDescription>
                  Submitted: {new Date(sub.submitted_at).toLocaleString()}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDownload(sub.file_url)}>
                <Download className="h-4 w-4 mr-2" />
                View File
              </Button>
            </CardHeader>
            <CardContent>
              {gradingId === sub.id ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Grade</label>
                    <Input 
                      value={tempGrade} 
                      onChange={(e) => setTempGrade(e.target.value)} 
                      placeholder="e.g. A, 95, Pass"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Feedback</label>
                    <Textarea 
                      value={tempFeedback} 
                      onChange={(e) => setTempFeedback(e.target.value)} 
                      placeholder="Enter student feedback..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdate(sub.id)}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Grade
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setGradingId(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between bg-muted/30 p-4 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Grade: <span className={sub.grade ? "text-primary" : "text-muted-foreground"}>{sub.grade || "Not Graded"}</span></p>
                    <p className="text-xs text-muted-foreground">{sub.feedback || "No feedback provided yet."}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                    setGradingId(sub.id)
                    setTempGrade(sub.grade || "")
                    setTempFeedback(sub.feedback || "")
                  }}>
                    {sub.grade ? "Edit Grade" : "Give Grade"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )) : (
          <div className="p-8 text-center border rounded-lg border-dashed text-muted-foreground">
            No submissions yet for this assignment.
          </div>
        )}
      </div>
    </div>
  )
}
