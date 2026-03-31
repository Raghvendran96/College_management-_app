"use server"

import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function resetUserPassword(userId: string, newPassword: string) {
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    { password: newPassword }
  )

  if (error) {
    console.error("Admin Password Reset Error:", error.message)
    throw new Error(error.message)
  }

  return { success: true, data }
}

export async function getAllUsers() {
  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()
  if (error) throw new Error(error.message)
  return users
}
