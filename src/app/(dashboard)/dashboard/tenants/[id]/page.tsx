import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { EditTenantForm } from "./form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTenantPage({ params }: Props) {
  const session = await requireAuth();

  if (!isSuperadmin(session)) {
    return <p className="text-sm text-zinc-500">No autorizado</p>;
  }

  const { id } = await params;

  const supabase = await createClient();
  const { data: tenant } = await supabase
    .from("tenant")
    .select("id, nombre, email, telefono, logo_url")
    .eq("id", id)
    .single();

  if (!tenant) {
    return <p className="text-sm text-zinc-500">Tenant no encontrado</p>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Editar Tenant"
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tenants", href: "/dashboard/tenants" },
          { label: "Editar" },
        ]}
      />
      <EditTenantForm
        id={tenant.id}
        defaultNombre={tenant.nombre ?? ""}
        defaultEmail={tenant.email ?? ""}
        defaultTelefono={tenant.telefono ?? ""}
        defaultLogoUrl={tenant.logo_url ?? ""}
      />
    </div>
  );
}
