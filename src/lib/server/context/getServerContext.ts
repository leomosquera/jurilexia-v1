import { createClient } from "@/lib/supabase/server";

export async function getServerContext() {
  const supabase = await createClient();

  // ─────────────────────────────
  // 1. Usuario auth (Supabase)
  // ─────────────────────────────
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("No autenticado");
  }

  // ─────────────────────────────
  // 2. Usuario de negocio
  // ─────────────────────────────
  const { data: usuario, error: usuarioError } = await supabase
    .from("usuario")
    .select("id")
    .eq("id", user.id)
    .single();

  if (usuarioError || !usuario) {
    throw new Error("Usuario no registrado en sistema");
  }

  // ─────────────────────────────
  // 3. Tenant (si tiene)
  // ─────────────────────────────
  const { data: usuarioTenant } = await supabase
    .from("usuario_tenant")
    .select("tenant_id")
    .eq("usuario_id", user.id)
    .maybeSingle(); // 👈 IMPORTANTE

  const tenant_id = usuarioTenant?.tenant_id ?? null;

  // ─────────────────────────────
  // 4. Roles (globales + tenant)
  // ─────────────────────────────
  const { data: rolesData } = await supabase
    .from("usuario_rol")
    .select("rol(nombre, tenant_id)")
    .eq("usuario_id", user.id);

  const roles =
    (rolesData as any[])?.flatMap((r: any) => {
      if (Array.isArray(r.rol)) {
        return r.rol.map((rol: any) => rol.nombre);
      }
      if (r.rol?.nombre) {
        return [r.rol.nombre];
      }
      return [];
    }) ?? [];

  // ─────────────────────────────
  // 5. Tenant (opcional)
  // ─────────────────────────────
  let tenant = null;

  if (tenant_id) {
    const { data } = await supabase
      .from("tenant")
      .select("nombre")
      .eq("id", tenant_id)
      .maybeSingle();

    tenant = data;
  }

  // ─────────────────────────────
  // 6. Contexto final
  // ─────────────────────────────
  return {
    supabase,
    user,
    usuario,
    tenant_id,
    roles,
    tenant
  };
}