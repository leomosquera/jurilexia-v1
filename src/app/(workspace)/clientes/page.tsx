import { requireAuth } from "@/lib/auth/require-auth";
import { PageHeader } from "@/components/ui/page-header";
import { clienteService } from "@/lib/server/services/cliente.service";
import { ClientesTable } from "@/components/modules/clientes/clientes-table";

export default async function ClientesPage() {
  const ctx = await requireAuth();

  const clientes = await clienteService.getAll(ctx);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Clientes"
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: "Clientes" },
        ]}
      />

      <ClientesTable clientes={clientes} />
    </div>
  );
}
