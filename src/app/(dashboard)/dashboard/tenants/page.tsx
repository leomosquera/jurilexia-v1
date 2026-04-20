import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { createClient } from "@/lib/supabase/server";
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function TenantsPage() {
  const session = await requireAuth();

  if (!isSuperadmin(session)) {
    return (
      <p className="text-sm text-zinc-500">No autorizado</p>
    );
  }

  const supabase = await createClient();
  const { data: tenants } = await supabase
    .from("tenant")
    .select("id, nombre");

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-base font-medium tracking-tight text-zinc-900">Tenants</h1>
        <Link href="/dashboard/tenants/create">
          <Button size="sm">Nuevo</Button>
        </Link>
      </header>
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
