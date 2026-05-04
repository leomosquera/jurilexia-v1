import { SupabaseClient } from "@supabase/supabase-js";

type Ctx = { supabase: SupabaseClient; tenant_id: string | null };

export const personaRepository = {
  async getAll(ctx: Ctx) {
    return ctx.supabase
      .from("persona")
      .select("id, nombre, apellido, documento, cuil, email, telefono")
      .eq("tenant_id", ctx.tenant_id)
      .filter("deleted_at", "is", null)
      .order("apellido", { ascending: true });
  },

  async getById(ctx: Ctx, id: string) {
    const { data, error } = await ctx.supabase
      .from("persona")
      .select("id, nombre, apellido, documento, cuil, email, telefono")
      .eq("id", id)
      .eq("tenant_id", ctx.tenant_id)
      .filter("deleted_at", "is", null)
      .single();

    if (error) throw new Error(error.message);

    return data;
  },

  async create(ctx: Ctx, payload: any) {
    const { data, error } = await ctx.supabase
      .from("persona")
      .insert({ ...payload, tenant_id: ctx.tenant_id })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  },

  async update(ctx: Ctx, id: string, payload: any) {
    const { error } = await ctx.supabase
      .from("persona")
      .update(payload)
      .eq("id", id)
      .eq("tenant_id", ctx.tenant_id);

    if (error) throw new Error(error.message);
  },

  async delete(ctx: Ctx, id: string) {
    const { error } = await ctx.supabase
      .from("persona")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id)
      .eq("tenant_id", ctx.tenant_id);

    if (error) throw new Error(error.message);
  },
};
