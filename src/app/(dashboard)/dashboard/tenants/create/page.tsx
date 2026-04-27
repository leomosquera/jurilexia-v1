import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { PageHeader } from "@/components/ui/page-header";
import { CreateTenantForm } from "@/components/modules/tenants/CreateTenantForm";

export default async function CreateTenantPage() {
  const session = await requireAuth();

  if (!isSuperadmin(session)) {
    return <p className="text-sm text-zinc-500">No autorizado</p>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Nuevo Tenant"
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tenants", href: "/dashboard/tenants" },
          { label: "Nuevo" },
        ]}
      />

      <CreateTenantForm />
    </div>
  );
}