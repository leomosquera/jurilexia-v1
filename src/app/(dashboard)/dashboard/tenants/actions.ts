"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function deleteTenant(id: string) {
  const supabase = await createClient();

  await supabase.from("tenant").delete().eq("id", id);

  redirect("/dashboard/tenants?success=delete");
}
