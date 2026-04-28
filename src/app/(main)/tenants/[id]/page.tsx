import { requireAuth } from "@/lib/auth/require-auth";
import { PageHeader } from "@/components/ui/page-header";
import { TenantForm } from "@/components/modules/tenants/TenantForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTenantPage({ params }: Props) {
  await requireAuth();
  const { id } = await params;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Editar Tenant"
        breadcrumb={[
          { label: "Tenants", href: "/tenants" },
          { label: "Editar" },
        ]}
      />

      <TenantForm mode="edit" id={id} />
    </div>
  );
}