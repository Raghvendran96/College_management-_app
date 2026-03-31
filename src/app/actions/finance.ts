"use server"

import { createClient } from "@/lib/supabase"
import { sendEmail, emailTemplates } from "@/lib/email"

export async function sendFeeReminder(feeId: string) {
  const supabase = createClient()
  
  // 1. Fetch fee and student details
  const { data, error } = await supabase
    .from("fees")
    .select("*, profiles(email, full_name)")
    .eq("id", feeId)
    .single()

  if (error) throw new Error(error.message)

  // 2. Trigger notification
  if (data && data.profiles?.email) {
    try {
      await sendEmail({
        to: data.profiles.email,
        subject: "Action Required: Overdue Fee Payment",
        html: emailTemplates.feeOverdue(
          data.profiles.full_name,
          data.amount.toString(),
          data.due_date
        )
      });
    } catch (emailError) {
      console.error("Failed to send fee reminder email:", emailError);
    }
  }

  return { success: true }
}

export async function getFilteredFees(filters: {
  status?: string;
  className?: string;
  studentName?: string;
}) {
  const supabase = createClient()
  
  let query = supabase
    .from("fees")
    .select(`
      *,
      profiles!inner (
        full_name,
        class_name
      )
    `)

  if (filters.status) {
    query = query.eq("status", filters.status)
  }

  if (filters.className) {
    query = query.eq("profiles.class_name", filters.className)
  }

  if (filters.studentName) {
    query = query.ilike("profiles.full_name", `%${filters.studentName}%`)
  }

  const { data, error } = await query.order("due_date", { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function getAllClasses() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("class_name")
    .not("class_name", "is", null)
  
  if (error) throw new Error(error.message)
  
  // Return unique class names
  const classes = Array.from(new Set(data.map((p: any) => p.class_name)))
  return classes
}
