import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { createClient } from "@/lib/supabase/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateTenant } from "./actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTenantPage({ params }: Props) {
  const session = await requireAuth();

  if (!isSuperadmin(session)) {
    return <p className="text-sm text-zinc-500">No autorizado</p>;
  }

  const { id } = await params;

  const supabase = await createClient();
  const { data: tenant } = await supabase
    .from("tenant")
    .select("id, nombre")
    .eq("id", id)
    .single();

  if (!tenant) {
    return <p className="text-sm text-zinc-500">Tenant no encontrado</p>;
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-base font-medium tracking-tight text-zinc-900">Editar Tenant</h1>
      </header>

      <form action={updateTenant.bind(null, tenant.id)} className="space-y-4 max-w-sm">
        <Input
          id="nombre"
          name="nombre"
          label="Nombre"
          defaultValue={tenant.nombre ?? ""}
        />
        <Button type="submit" size="sm">Guardar</Button>
      </form>
    </div>
  );
}
