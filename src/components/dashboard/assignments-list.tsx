"use client"

import { useState, useEffect } from "react"
import { FileUp, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAssignments, uploadSubmission } from "@/app/actions/assignments"

export function AssignmentsList({ courseId, studentId }: { courseId: string; studentId: string }) {
  const [assignments, setAssignments] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeAssignment, setActiveAssignment] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const data = await getAssignments(courseId)
      setAssignments(data)
    }
    load()
  }, [courseId])

  const handleUpload = async () => {
    if (!selectedFile || !activeAssignment) return
    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("studentId", studentId)

    try {
      await uploadSubmission(activeAssignment, formData)
      alert("Assignment submitted successfully!")
      setActiveAssignment(null)
      setSelectedFile(null)
    } catch (error: any) {
      alert("Upload failed: " + error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Active Assignments</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignments.length > 0 ? assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle className="text-base">{assignment.title}</CardTitle>
              <CardDescription>
                Due: {new Date(assignment.due_date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {assignment.description}
              </p>
            </CardContent>
            <CardFooter>
              <Dialog open={activeAssignment === assignment.id} onOpenChange={(open) => !open && setActiveAssignment(null)}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setActiveAssignment(assignment.id)}>
                    <FileUp className="h-4 w-4 mr-2" />
                    Submit Work
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Submit: {assignment.title}</DialogTitle>
                    <DialogDescription>
                      Upload your assignment file (PDF, DOCX, or Image).
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="file">Assignment File</Label>
                      <Input
                        id="file"
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleUpload} disabled={isUploading || !selectedFile}>
                      {isUploading ? "Uploading..." : "Upload Submission"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        )) : (
          <div className="col-span-full p-8 text-center border rounded-lg border-dashed text-muted-foreground">
            No assignments found for this course.
          </div>
        )}
      </div>
    </div>
  )
}
