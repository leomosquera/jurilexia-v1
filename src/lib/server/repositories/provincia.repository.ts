/**
 * Required Supabase table:
 *
 * CREATE TABLE provincias (
 *   id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *   nombre      text NOT NULL,
 *   codigo_iso  text,
 *   codigo_afip text
 * );
 */

import { SupabaseClient } from "@supabase/supabase-js";

type Ctx = { supabase: SupabaseClient };

export type ProvinciaRow = {
  id: string;
  nombre: string;
  codigo_iso: string | null;
  codigo_afip: string | null;
};

export const provinciaRepository = {
  async getAll(ctx: Ctx): Promise<ProvinciaRow[]> {
    const { data, error } = await ctx.supabase
      .from("provincias")
      .select("id, nombre, codigo_iso, codigo_afip")
      .order("nombre", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  },
};
