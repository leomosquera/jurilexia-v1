import { SupabaseClient } from "@supabase/supabase-js";

export const clienteService = {
  async getAll(ctx: { supabase: SupabaseClient }) {
    const { data, error } = await ctx.supabase
      .from("cliente")
      .select("id, persona(nombre, apellido, email)")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  },
};