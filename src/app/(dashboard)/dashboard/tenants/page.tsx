import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { createClient } from "@/lib/supabase/server";
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";

export default async function TenantsPage() {
  const session = await requireAuth();

  if (!isSuperadmin(session)) {
    return (
      <div className="p-6">
        <p className="text-sm text-zinc-500">No autorizado</p>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: tenants } = await supabase
    .from("tenant")
    .select("id, nombre");

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-sm font-medium text-zinc-900">Tenants</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader>Nombre</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {(tenants ?? []).map((tenant) => (
            <TableRow key={tenant.id}>
              <TableCell>{tenant.nombre}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
