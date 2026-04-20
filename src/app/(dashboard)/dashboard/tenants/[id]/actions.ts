"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateTenant(id: string, formData: FormData) {
  const nombre = formData.get("nombre") as string;

  const supabase = await createClient();

  await supabase.from("tenant").update({ nombre }).eq("id", id);

  redirect("/dashboard/tenants");
}
