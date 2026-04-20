"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteTenant(id: string) {
  const supabase = await createClient();

  await supabase.from("tenant").delete().eq("id", id);

  revalidatePath("/dashboard/tenants");
}
