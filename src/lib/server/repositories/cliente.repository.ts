import { SupabaseClient } from "@supabase/supabase-js";

export const clienteRepository = {
  async getAll(ctx: { supabase: SupabaseClient }) {
    return ctx.supabase
      .from("cliente")
      .select(`
        id,
        persona:persona_id!inner (
          tipo, nombre, apellido, documento, cuil, cuit,
          persona_contacto(id, canal, valor, predeterminado, deleted_at)
        )
      `)
      .filter("deleted_at", "is", null)
      .order("created_at", { ascending: false });
  },

  async getById(ctx: { supabase: SupabaseClient }, id: string) {
    return ctx.supabase
      .from("cliente")
      .select(`
        id,
        persona:persona_id (
          id, tipo, nombre, apellido
        )
      `)
      .eq("id", id)
      .single();
  },

  async insertCliente(ctx: any, payload: any) {
    return ctx.supabase
      .from("cliente")
      .insert(payload);
  },

  async getPersonaId(ctx: any, clienteId: string) {
    return ctx.supabase
      .from("cliente")
      .select("persona_id")
      .eq("id", clienteId)
      .single();
  },

  async softDelete(ctx: any, id: string) {
    return ctx.supabase
      .from("cliente")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
  },
};