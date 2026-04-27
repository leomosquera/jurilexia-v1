import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { TenantsTable } from "@/components/modules/tenants/tenants-table";
import { ToastrFeedback } from "@/components/feedback/toastr-feedback";
import { getServerContext } from "@/lib/server/context/getServerContext";
import { tenantService } from "@/lib/server/services/tenant.service";

type Props = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export default async function TenantsPage({ searchParams }: Props) {
  const session = await requireAuth();

  if (!isSuperadmin(session)) {
    return <p className="text-sm text-zinc-500">No autorizado</p>;
  }

  const ctx = await getServerContext();
  const tenants = await tenantService.getAll(ctx);

  const params = await searchParams;

  return (
    <div className="space-y-8">
      <ToastrFeedback success={params.success} error={params.error} />

      <header className="flex items-center justify-between">
        <PageHeader
          title="Tenants"
          breadcrumb={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Tenants" },
          ]}
          actions={
            <Link href="/dashboard/tenants/create">
              <Button size="sm">Nuevo</Button>
            </Link>
          }
        />
      </header>

      <TenantsTable tenants={tenants} />
    </div>
  );
}