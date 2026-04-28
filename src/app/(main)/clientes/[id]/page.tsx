import { requireAuth } from "@/lib/auth/require-auth";
import { PageHeader } from "@/components/ui/page-header";
import { ClienteForm } from "@/components/modules/clientes/ClienteForm";

export default async function CreateClientePage() {
  await requireAuth();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Nuevo Cliente"
        breadcrumb={[
          { label: "Clientes", href: "/clientes" },
          { label: "Nuevo" },
        ]}
      />

      <ClienteForm mode="create" />
    </div>
  );
}