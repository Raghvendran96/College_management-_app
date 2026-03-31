"use server"

import { createClient } from "@/lib/supabase"
import { createClient as createAdminClient } from "@supabase/supabase-js"

const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function toggleSystemMode(isDemo: boolean) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("institution_settings")
    .update({ is_demo_mode: isDemo, updated_at: new Date().toISOString() })
    .eq("id", 1)

  if (error) throw new Error(error.message)
  return { success: true, data }
}

export async function cleanSystemData() {
  // Wipe all operational data but keep Admin profiles
  const tables = ["submissions", "enrollments", "fees", "assignments", "courses"]
  
  for (const table of tables) {
    const { error } = await supabaseAdmin
      .from(table)
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000") // Dummy condition to delete all

    if (error) {
       console.error(`Error cleaning ${table}:`, error.message)
       // Some tables might be empty, so we continue
    }
  }

  return { success: true }
}
