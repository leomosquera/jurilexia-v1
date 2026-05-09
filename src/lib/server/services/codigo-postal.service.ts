import { SupabaseClient } from "@supabase/supabase-js";
import { codigoPostalRepository } from "../repositories/codigo-postal.repository";

type Ctx = { supabase: SupabaseClient };

export const codigoPostalService = {
  async getAllByLocalidad(ctx: Ctx, localidadId: string) {
    return codigoPostalRepository.getAllByLocalidad(ctx, localidadId);
  },
};
