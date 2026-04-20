"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error: string } | null;

export async function updateTenant(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const nombre    = formData.get("nombre")    as string;
  const email     = formData.get("email")     as string;
  const telefono  = formData.get("telefono")  as string;
  const logo_url  = formData.get("logo_url")  as string;

  const supabase = await createClient();
  const { error } = await supabase.from("tenant").update({
    nombre,
    email:    email    || null,
    telefono: telefono || null,
    logo_url: logo_url || null,
  }).eq("id", id);

  if (error) return { error: error.message };

  redirect("/dashboard/tenants?success=update");
}
