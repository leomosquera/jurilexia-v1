export const tenantRepository = {
  async getAll(ctx: any) {
    const { supabase } = ctx;

    const { data, error } = await supabase
      .from("tenant")
      .select("id, nombre")
      .order("nombre", { ascending: true });

    if (error) throw new Error(error.message);

    return data ?? [];
  },

  async getById(ctx: any, id: string) {
    const { supabase } = ctx;

    const { data, error } = await supabase
      .from("tenant")
      .select("id, nombre, email, telefono, logo_url")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return data;
  },

  async create(ctx: any, payload: any) {
    const { supabase } = ctx;
  
    const { data, error } = await supabase
      .from("tenant")
      .insert(payload)
      .select()
      .single();
  
    if (error) throw new Error(error.message);
  
    return data;
  },

  async update(ctx: any, id: string, payload: any) {
    const { supabase } = ctx;
  
    const { error } = await supabase
      .from("tenant")
      .update(payload)
      .eq("id", id);
  
    if (error) throw new Error(error.message);
  },

  async delete(ctx: any, id: string) {
    const { supabase } = ctx;
  
    const { error } = await supabase
      .from("tenant")
      .delete()
      .eq("id", id);
  
    if (error) throw new Error(error.message);
  },
};