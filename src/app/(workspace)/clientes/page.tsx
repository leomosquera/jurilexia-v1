import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { clienteService } from "@/lib/server/services/cliente.service";
import { ClientesTable } from "@/components/modules/clientes/clientes-table";

export default async function ClientesPage() {
  const ctx = await requireAuth();

  const rawClientes = await clienteService.getAll(ctx);

  const clientes = rawClientes.map((c: any) => {
    const persona = Array.isArray(c.persona) ? c.persona[0] : c.persona;

    return {
      id: c.id,
      nombre: `${persona?.nombre ?? ""} ${persona?.apellido ?? ""}`.trim(),
      email: persona?.email ?? "",
    };
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Clientes"
        actions={
          <Link href="/clientes/crear">
            <Button size="sm">Nuevo</Button>
          </Link>
        }
      />

      <ClientesTable clientes={clientes} />
    </div>
  );
}