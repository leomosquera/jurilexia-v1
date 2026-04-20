import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";

export default async function TenantsPage() {
  await requireAuth();

  const superadmin = await isSuperadmin();

  if (!superadmin) {
    redirect("/dashboard");
  }

  return (
    <div className="p-6">
      <h1 className="text-sm font-medium text-zinc-900">Tenants</h1>
    </div>
  );
}
