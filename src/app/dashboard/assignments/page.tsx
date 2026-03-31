"use client"

import { AssignmentsList } from "@/components/dashboard/assignments-list"
import { GradingView } from "@/components/dashboard/grading-view"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AssignmentsPage() {
  // Mocking courseId, studentId, and role for now. 
  // In production, these would come from the user's session and enrollments.
  const mockCourseId = "d87a6c50-0000-0000-0000-000000000000"; // Placeholder
  const mockStudentId = "s0000000-0000-0000-0000-000000000000"; // Placeholder
  const mockAssignmentId = "a0000000-0000-0000-0000-000000000000"; // Selected assignment for grading

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">
            Manage course work and academic performance.
          </p>
        </div>
      </div>

      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="student">Student View</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Portal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student" className="space-y-4">
          <AssignmentsList courseId={mockCourseId} studentId={mockStudentId} />
          <Card className="bg-muted/50 border-dashed mt-8">
            <CardHeader>
              <CardTitle className="text-sm">Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <p>• Only PDF, DOCX, and JPG/PNG files are accepted.</p>
              <p>• Maximum file size is 5MB per submission.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faculty" className="space-y-4">
          <GradingView assignmentId={mockAssignmentId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
