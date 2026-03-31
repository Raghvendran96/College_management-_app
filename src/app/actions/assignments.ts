"use server"

import { createClient } from "@/lib/supabase"
import { sendEmail, emailTemplates } from "@/lib/email"

export async function getAssignments(courseId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("assignments")
    .select("*")
    .eq("course_id", courseId)
  
  if (error) throw new Error(error.message)
  return data
}

export async function uploadSubmission(assignmentId: string, formData: FormData) {
  const supabase = createClient()
  const file = formData.get("file") as File
  const studentId = formData.get("studentId") as string

  if (!file) throw new Error("No file selected")

  // 1. Upload to Supabase Storage (Submissions bucket)
  const fileExt = file.name.split(".").pop()
  const fileName = `${assignmentId}/${studentId}.${fileExt}`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("submissions")
    .upload(fileName, file, { upsert: true })

  if (uploadError) throw new Error(uploadError.message)

  // 2. Create/Update record in 'submissions' table
  const { data: subData, error: subError } = await supabase
    .from("submissions")
    .upsert({
      assignment_id: assignmentId,
      student_id: studentId,
      file_url: uploadData.path,
      submitted_at: new Date().toISOString(),
    })

  if (subError) throw new Error(subError.message)
  return { success: true, data: subData }
}

export async function getSubmissions(assignmentId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("submissions")
    .select("*, profiles(full_name)")
    .eq("assignment_id", assignmentId)

  if (error) throw new Error(error.message)
  return data
}

export async function updateGrade(submissionId: string, grade: string, feedback: string) {
  const supabase = createClient()
  
  // 1. Update the grade and fetch related details for notification
  const { data, error } = await supabase
    .from("submissions")
    .update({ grade, feedback })
    .eq("id", submissionId)
    .select("*, profiles(email, full_name), assignments(title)")
    .single()

  if (error) throw new Error(error.message)

  // 2. Trigger automated email notification
  if (data && data.profiles?.email) {
    try {
      await sendEmail({
        to: data.profiles.email,
        subject: `New Grade Posted: ${data.assignments.title}`,
        html: emailTemplates.gradeUpdated(
          data.profiles.full_name,
          data.assignments.title,
          grade,
          feedback
        )
      });
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
    }
  }

  return { success: true }
}

export async function getSubmissionFileUrl(path: string) {
  const supabase = createClient()
  const { data } = supabase.storage
    .from("submissions")
    .getPublicUrl(path)
  
  return data.publicUrl
}
