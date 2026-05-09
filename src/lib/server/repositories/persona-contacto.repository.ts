/**
 * Required Supabase migration:
 *
 * CREATE TABLE persona_contacto (
 *   id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
 *   tenant_id   uuid        NOT NULL,
 *   persona_id  uuid        NOT NULL REFERENCES persona(id),
 *   canal       text        NOT NULL CHECK (canal IN ('email','telefono','whatsapp','web')),
 *   categoria   text        NOT NULL CHECK (categoria IN ('personal','laboral','otro')),
 *   valor       text        NOT NULL,
 *   descripcion text,
 *   predeterminado boolean  NOT NULL DEFAULT false,
 *   verificado  boolean     NOT NULL DEFAULT false,
 *   pais_codigo text        NOT NULL DEFAULT 'AR',
 *   deleted_at  timestamptz,
 *   created_at  timestamptz NOT NULL DEFAULT now()
 * );
 */

import { SupabaseClient } from "@supabase/supabase-js";

type Ctx = { supabase: SupabaseClient; tenant_id: string | null };

export const personaContactoRepository = {
  async getAllByPersona(ctx: Ctx, personaId: string) {
    const { data, error } = await ctx.supabase
      .from("persona_contacto")
      .select("id, canal, categoria, valor, descripcion, predeterminado, verificado, pais_codigo, created_at")
      .eq("tenant_id", ctx.tenant_id)
      .eq("persona_id", personaId)
      .filter("deleted_at", "is", null)
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  },

  async create(ctx: Ctx, personaId: string, payload: {
    canal: string;
    categoria: string;
    valor: string;
    descripcion?: string | null;
    predeterminado: boolean;
    verificado: boolean;
    pais_codigo: string;
  }) {
    const { data, error } = await ctx.supabase
      .from("persona_contacto")
      .insert({
        ...payload,
        descripcion: payload.descripcion ?? null,
        persona_id: personaId,
        tenant_id: ctx.tenant_id,
      })
      .select("id, canal, categoria, valor, descripcion, predeterminado, verificado, pais_codigo, created_at")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async update(ctx: Ctx, contactoId: string, payload: {
    canal?: string;
    categoria?: string;
    valor?: string;
    descripcion?: string | null;
    predeterminado?: boolean;
    verificado?: boolean;
    pais_codigo?: string;
  }) {
    const { data, error } = await ctx.supabase
      .from("persona_contacto")
      .update(payload)
      .eq("id", contactoId)
      .eq("tenant_id", ctx.tenant_id)
      .filter("deleted_at", "is", null)
      .select("id, canal, categoria, valor, descripcion, predeterminado, verificado, pais_codigo, created_at")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async delete(ctx: Ctx, contactoId: string) {
    const { error } = await ctx.supabase
      .from("persona_contacto")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", contactoId)
      .eq("tenant_id", ctx.tenant_id);

    if (error) throw new Error(error.message);
  },

  /**
   * Sets predeterminado=true for the given contact and
   * predeterminado=false for all other contacts of the same canal + persona.
   * Enforces uniqueness of predeterminado per canal per persona (server-side).
   */
  async setPredeterminado(ctx: Ctx, contactoId: string, personaId: string, canal: string) {
    // Unset all predeterminado for this canal/persona
    const { error: unsetError } = await ctx.supabase
      .from("persona_contacto")
      .update({ predeterminado: false })
      .eq("persona_id", personaId)
      .eq("canal", canal)
      .eq("tenant_id", ctx.tenant_id)
      .filter("deleted_at", "is", null);

    if (unsetError) throw new Error(unsetError.message);

    // Set the target as predeterminado
    const { error: setError } = await ctx.supabase
      .from("persona_contacto")
      .update({ predeterminado: true })
      .eq("id", contactoId)
      .eq("tenant_id", ctx.tenant_id);

    if (setError) throw new Error(setError.message);
  },

  async countByCanal(ctx: Ctx, personaId: string, canal: string): Promise<number> {
    const { count, error } = await ctx.supabase
      .from("persona_contacto")
      .select("id", { count: "exact", head: true })
      .eq("persona_id", personaId)
      .eq("canal", canal)
      .eq("tenant_id", ctx.tenant_id)
      .filter("deleted_at", "is", null);

    if (error) throw new Error(error.message);
    return count ?? 0;
  },
};
