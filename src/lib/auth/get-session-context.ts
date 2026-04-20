import { createClient } from "@/lib/supabase/server";

export type SessionContext = {
  authUser: { id: string; email: string | null };
  appUser: { id: string; nombre: string | null; auth_user_id: string };
  membership: { id: string; tenant_id: string; rol_id: string | null; rol?: { codigo: string } } | null;
  tenant: { id: string; nombre: string | null } | null;
};

export async function getSessionContext(): Promise<SessionContext | null> {
  const supabase = await createClient();

  // 1. Resolve authenticated user from Supabase Auth
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  // 2. Resolve matching app user from public.usuario
  const { data: appUser } = await supabase
    .from("usuario")
    .select("id, nombre, auth_user_id")
    .eq("auth_user_id", authUser.id)
    .maybeSingle();

  if (!appUser) return null;

  // 3. Resolve first matching membership from public.usuario_tenant
  const { data: membership } = await supabase
    .from("usuario_tenant")
    .select("id, tenant_id, rol_id, rol(codigo)")
    .eq("usuario_id", appUser.id)
    .limit(1)
    .maybeSingle();

  // 4. Resolve tenant from public.tenant (only if membership exists)
  let tenant: { id: string; nombre: string | null } | null = null;

  if (membership) {
    const { data: tenantData } = await supabase
      .from("tenant")
      .select("id, nombre")
      .eq("id", membership.tenant_id)
      .single();

    tenant = tenantData ?? null;
  }

  const normalizedMembership = membership
    ? {
        id: membership.id,
        tenant_id: membership.tenant_id,
        rol_id: membership.rol_id,
        rol: Array.isArray(membership.rol)
            ? membership.rol[0]
            : membership.rol,
        }
    : null;

  return {
    authUser: { id: authUser.id, email: authUser.email ?? null },
    appUser,
    membership: normalizedMembership,
    tenant,
  };
}
