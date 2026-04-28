import { requireAuth } from "@/lib/auth/require-auth";

export default async function HomePage() {
  const ctx = await requireAuth();

  const { user, tenant_id, roles } = ctx;

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <p className="text-sm text-zinc-500">
        {user?.email}
      </p>

      <p className="text-sm text-zinc-500">
        Tenant: {tenant_id}
      </p>

      <p className="text-sm text-zinc-500">
        Roles: {roles?.join(", ")}
      </p>
    </div>
  );
}