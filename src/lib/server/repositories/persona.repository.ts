import { SupabaseClient } from "@supabase/supabase-js";

type Ctx = { supabase: SupabaseClient; tenant_id: string | null };

export const personaRepository = {
  async getAll(ctx: Ctx) {
    return ctx.supabase
      .from("persona")
      .select(`
        id, tipo, nombre, apellido, documento, cuil, cuit,
        persona_contacto(id, canal, valor, predeterminado, deleted_at)
      `)
      .eq("tenant_id", ctx.tenant_id)
      .filter("deleted_at", "is", null)
      .order("apellido", { ascending: true });
  },

  async getById(ctx: Ctx, id: string) {
    const { data, error } = await ctx.supabase
      .from("persona")
      .select("id, tipo, nombre, apellido, documento, cuil, cuit, sexo, fecha_nacimiento")
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

  async findByDocumento(ctx: Ctx, documento: string, excludeId?: string) {
    let query = ctx.supabase
      .from("persona")
      .select("id")
      .eq("tenant_id", ctx.tenant_id)
      .eq("documento", documento)
      .filter("deleted_at", "is", null)
      .limit(1);

    if (excludeId) query = query.neq("id", excludeId);

    const { data } = await query;
    return data?.[0] ?? null;
  },

  async findByCuil(ctx: Ctx, cuil: string, excludeId?: string) {
    let query = ctx.supabase
      .from("persona")
      .select("id")
      .eq("tenant_id", ctx.tenant_id)
      .eq("cuil", cuil)
      .filter("deleted_at", "is", null)
      .limit(1);

    if (excludeId) query = query.neq("id", excludeId);

    const { data } = await query;
    return data?.[0] ?? null;
  },

  async findByCuit(ctx: Ctx, cuit: string, excludeId?: string) {
    let query = ctx.supabase
      .from("persona")
      .select("id")
      .eq("tenant_id", ctx.tenant_id)
      .eq("cuit", cuit)
      .filter("deleted_at", "is", null)
      .limit(1);

    if (excludeId) query = query.neq("id", excludeId);

    const { data } = await query;
    return data?.[0] ?? null;
  },
};
