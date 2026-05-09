import { SupabaseClient } from "@supabase/supabase-js";
import { localidadRepository } from "../repositories/localidad.repository";

type Ctx = { supabase: SupabaseClient };

export const localidadService = {
  async search(ctx: Ctx, provinciaId: string, query: string, limit = 50) {
    return localidadRepository.search(ctx, provinciaId, query, limit);
  },
};
