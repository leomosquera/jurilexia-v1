"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function loginAction(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const email = String(formData.get("email") || "")
  const password = String(formData.get("password") || "")

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log("LOGIN ERROR:", error)
  
    return {
      error: error.message,
    }
  }

  redirect("/dashboard")
}