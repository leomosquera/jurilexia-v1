import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTenant } from "./actions";

export default async function CreateTenantPage() {
  const session = await requireAuth();

  if (!isSuperadmin(session)) {
    return <p className="text-sm text-zinc-500">No autorizado</p>;
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-base font-medium tracking-tight text-zinc-900">Nuevo Tenant</h1>
      </header>

      <form action={createTenant} className="space-y-4 max-w-sm">
        <Input
          id="nombre"
          name="nombre"
          label="Nombre"
          placeholder="Nombre del tenant"
          required
        />
        <Button type="submit" size="sm">Guardar</Button>
      </form>
    </div>
  );
}
