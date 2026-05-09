/**
 * Required Supabase table:
 *
 * CREATE TABLE localidades (
 *   id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *   provincia_id uuid NOT NULL REFERENCES provincias(id),
 *   nombre       text NOT NULL
 * );
 */

import { SupabaseClient } from "@supabase/supabase-js";

type Ctx = { supabase: SupabaseClient };

export type LocalidadRow = {
  id: string;
  provincia_id: string;
  nombre: string;
};

export const localidadRepository = {
  async search(
    ctx: Ctx,
    provinciaId: string,
    query: string,
    limit = 50,
  ): Promise<LocalidadRow[]> {
    const { data, error } = await ctx.supabase
      .from("localidades")
      .select("id, provincia_id, nombre")
      .eq("provincia_id", provinciaId)
      .ilike("nombre", `%${query}%`)
      .order("nombre", { ascending: true })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data ?? [];
  },
};
