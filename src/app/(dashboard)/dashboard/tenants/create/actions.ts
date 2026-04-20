"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createTenant(formData: FormData) {
  const supabase = await createClient();

  const nombre = formData.get("nombre") as string;

  console.log("NOMBRE:", nombre);

  const { error } = await supabase
    .from("tenant")
    .insert({ nombre });

  if (error) {
    console.error("ERROR INSERT:", error);
    throw new Error("No se pudo crear el tenant");
  }

  redirect("/dashboard/tenants");
}