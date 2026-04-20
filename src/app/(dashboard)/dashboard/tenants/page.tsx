import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { createClient } from "@/lib/supabase/server";
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteTenant } from "./actions";

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
            <TableCell isHeader align="right">Acciones</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {(tenants ?? []).map((tenant) => (
            <TableRow key={tenant.id}>
              <TableCell>{tenant.nombre}</TableCell>
              <TableCell align="right">
                <form
                  action={deleteTenant.bind(null, tenant.id)}
                >
                  <button
                    type="submit"
                    aria-label="Eliminar"
                    className="flex size-7 items-center justify-center rounded-md text-zinc-400 transition-colors duration-100 hover:bg-red-50 hover:text-red-500"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
                      <path d="M2 4h12" />
                      <path d="M5 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4" />
                      <path d="M3.5 4l.75 9h7.5l.75-9" />
                      <path d="M6.5 7v4M9.5 7v4" />
                    </svg>
                  </button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
