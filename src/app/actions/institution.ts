"use server"

import { createClient } from "@/lib/supabase"

export async function getInstitutionSettings() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("institution_settings")
    .select("*")
    .eq("id", 1)
    .single()
  
  if (error) return { name: "College Management System", logo_url: null }
  return data
}

export async function updateInstitutionLogo(formData: FormData) {
  const supabase = createClient()
  const file = formData.get("logo") as File
  const name = formData.get("name") as string

  let logoUrl = null

  if (file && file.size > 0) {
    const fileExt = file.name.split(".").pop()
    const fileName = `logo_${Date.now()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("branding")
      .upload(fileName, file, { upsert: true })

    if (uploadError) throw new Error(uploadError.message)
    
    const { data: publicUrlData } = supabase.storage
      .from("branding")
      .getPublicUrl(uploadData.path)
      
    logoUrl = publicUrlData.publicUrl
  }

  const { data, error } = await supabase
    .from("institution_settings")
    .upsert({
      id: 1,
      name,
      ...(logoUrl && { logo_url: logoUrl }),
      updated_at: new Date().toISOString()
    })

  if (error) throw new Error(error.message)
  return { success: true, data }
}
