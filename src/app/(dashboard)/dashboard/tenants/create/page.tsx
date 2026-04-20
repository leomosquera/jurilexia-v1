import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { CreateTenantForm } from "./form";

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
      <CreateTenantForm />
    </div>
  );
}
