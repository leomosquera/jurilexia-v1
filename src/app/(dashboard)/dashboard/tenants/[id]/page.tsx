import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { PageHeader } from "@/components/ui/page-header";
import { EditTenantForm } from "@/components/modules/tenants/EditTenantForm";

import { getServerContext } from "@/lib/server/context/getServerContext";
import { tenantService } from "@/lib/server/services/tenant.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTenantPage({ params }: Props) {
  const session = await requireAuth();

  if (!isSuperadmin(session)) {
    return <p className="text-sm text-zinc-500">No autorizado</p>;
  }

  const { id } = await params;

  const ctx = await getServerContext();
  const tenant = await tenantService.getById(ctx, id);

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
