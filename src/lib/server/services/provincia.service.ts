import { SupabaseClient } from "@supabase/supabase-js";
import { provinciaRepository } from "../repositories/provincia.repository";

type Ctx = { supabase: SupabaseClient };

export const provinciaService = {
  async getAll(ctx: Ctx) {
    return provinciaRepository.getAll(ctx);
  },
};
