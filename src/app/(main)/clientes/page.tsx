import { requireAuth } from "@/lib/auth/require-auth";
import { clienteService } from "@/lib/server/services/cliente.service";
import { createCliente } from "@/lib/api/cliente.api";
import { CreateClienteButton } from "@/components/modules/clientes/create-cliente-button";

export default async function ClientesPage() {
  const ctx = await requireAuth();

  const clientes = await clienteService.getAll(ctx);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-medium">Clientes</h1>
      <CreateClienteButton />

      <div className="space-y-2">
        {clientes.map((c: any) => (
          <div
            key={c.id}
            className="border rounded p-3 text-sm text-zinc-700"
          >
            <div>
              {c.persona?.nombre} {c.persona?.apellido}
            </div>
            <div className="text-xs text-zinc-400">
              {c.persona?.email}
            </div>
          </div>
        ))}

        {clientes.length === 0 && (
          <p className="text-sm text-zinc-400">
            No hay clientes
          </p>
        )}
      </div>
    </div>
  );
}