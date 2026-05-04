import { createClient } from "@/lib/supabase/server";

export async function getServerContext() {
  const supabase = await createClient();

  console.log("─────────────────────────────");
  console.log("GET SERVER CONTEXT");
  console.log("─────────────────────────────");

  // ─────────────────────────────
  // 1. Usuario auth (Supabase)
  // ─────────────────────────────
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log("AUTH USER:", user);
  console.log("AUTH ERROR:", error);

  if (error || !user) {
    console.log("NO AUTENTICADO");
    throw new Error("No autenticado");
  }

  // ─────────────────────────────
  // 2. Usuario de negocio
  // ─────────────────────────────
  const { data: usuario, error: usuarioError } = await supabase
    .from("usuario")
    .select("id, tenant_id")
    .eq("id", user.id)
    .maybeSingle();

  console.log("BUSCANDO USUARIO ID:", user.id);
  console.log("USUARIO:", usuario);
  console.log("USUARIO ERROR:", usuarioError);

  if (usuarioError) {
    console.log("ERROR CONSULTANDO TABLA USUARIO");
    throw usuarioError;
  }

  if (!usuario) {
    console.log("USUARIO NO ENCONTRADO EN TABLA USUARIO");

    throw new Error("Usuario no registrado en sistema");
  }

  const tenant_id = usuario.tenant_id ?? null;

  console.log("TENANT ID:", tenant_id);

  // ─────────────────────────────
  // 3. Roles (globales + tenant)
  // ─────────────────────────────
  const { data: rolesData, error: rolesError } = await supabase
    .from("usuario_rol")
    .select("rol(id, nombre, tenant_id)")
    .eq("usuario_id", user.id);

  console.log("ROLES DATA:", rolesData);
  console.log("ROLES ERROR:", rolesError);

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

  console.log("ROLES FINAL:", roles);

  // ─────────────────────────────
  // 4. Tenant (opcional)
  // ─────────────────────────────
  let tenant = null;

  if (tenant_id) {
    const { data, error: tenantError } = await supabase
      .from("tenant")
      .select("nombre")
      .eq("id", tenant_id)
      .maybeSingle();

    console.log("TENANT DATA:", data);
    console.log("TENANT ERROR:", tenantError);

    tenant = data;
  }

  // ─────────────────────────────
  // 5. Roles (opcional)
  // ─────────────────────────────
  const is_superadmin = roles.includes("superadmin");

  // ─────────────────────────────
  // 6. Contexto final
  // ─────────────────────────────
  const finalContext = {
    supabase,
    user,
    usuario,
    tenant_id,
    roles,
    is_superadmin, 
    tenant,
  };

  console.log("FINAL CONTEXT:", finalContext);

  console.log("─────────────────────────────");
  console.log("END GET SERVER CONTEXT");
  console.log("─────────────────────────────");

  return finalContext;
}