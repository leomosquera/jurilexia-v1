import { createClient } from "@/lib/supabase/server";

export type SessionContext = {
  authUser: { id: string; email: string | null };
  appUser: { id: string; username: string | null; auth_user_id: string } | null;
  membership: { id: string; tenant_id: string; rol_id: string | null; rol?: { codigo: string } } | null;
  tenant: { id: string; nombre: string | null } | null;
};

export async function getSessionContext(): Promise<SessionContext | null> {
    const supabase = await createClient();
  
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
  
    if (!authUser) return null;
  
    const { data: users } = await supabase
      .from("usuario")
      .select("id, username, email, auth_user_id");

      const appUser =
      users?.find((u) => u.auth_user_id === authUser.id) ?? null;
  
      if (!appUser) {
        return {
          authUser: { id: authUser.id, email: authUser.email ?? null },
          appUser: null,
          membership: null,
          tenant: null,
        };
      }
  
    const { data: membership } = await supabase
      .from("usuario_tenant")
      .select("id, tenant_id, rol_id")
      .eq("usuario_id", appUser.id)
      .maybeSingle();
  
    let tenant = null;
  
    if (membership?.tenant_id) {
      const { data } = await supabase
        .from("tenant")
        .select("id, nombre")
        .eq("id", membership.tenant_id)
        .maybeSingle();
  
      tenant = data ?? null;
    }
  
    return {
      authUser: { id: authUser.id, email: authUser.email ?? null },
      appUser,
      membership,
      tenant,
    };
  }
