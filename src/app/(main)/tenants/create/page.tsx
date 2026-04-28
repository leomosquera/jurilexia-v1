import { requireAuth } from "@/lib/auth/require-auth";
import { PageHeader } from "@/components/ui/page-header";
import { TenantForm } from "@/components/modules/tenants/TenantForm";

export default async function CreateTenantPage() {
  await requireAuth();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Nuevo Tenant"
        breadcrumb={[
          { label: "Tenants", href: "/tenants" },
          { label: "Nuevo" },
        ]}
      />

      <TenantForm mode="create" />
    </div>
  );
}