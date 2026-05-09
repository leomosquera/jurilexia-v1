/**
 * Required Supabase table:
 *
 * CREATE TABLE codigos_postales (
 *   id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *   localidad_id uuid NOT NULL REFERENCES localidades(id),
 *   codigo       text NOT NULL
 * );
 */

import { SupabaseClient } from "@supabase/supabase-js";

type Ctx = { supabase: SupabaseClient };

export type CodigoPostalRow = {
  id: string;
  localidad_id: string;
  codigo_postal: string;
};

export const codigoPostalRepository = {
  async getAllByLocalidad(ctx: Ctx, localidadId: string): Promise<CodigoPostalRow[]> {
    const { data, error } = await ctx.supabase
      .from("codigos_postales")
      .select("id, localidad_id, codigo_postal")
      .eq("localidad_id", localidadId)
      .order("codigo_postal", { ascending: true });

    if (error) throw new Error(error.message);

    console.log("CP DATA", data);
    return data ?? [];
  },
};
