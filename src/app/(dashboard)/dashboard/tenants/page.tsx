import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { isSuperadmin } from "@/lib/auth/is-superadmin";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { TenantsTable } from "./tenants-table";
import { ToastrFeedback } from "@/components/feedback/toastr-feedback";

type Props = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export default async function TenantsPage({ searchParams }: Props) {
  const session = await requireAuth();

  if (!isSuperadmin(session)) {
    return <p className="text-sm text-zinc-500">No autorizado</p>;
  }

  const supabase = await createClient();
  const { data: tenants } = await supabase
    .from("tenant")
    .select("id, nombre");

  const params = await searchParams;

  return (
    <div className="space-y-8">
      <ToastrFeedback
        success={params.success}
        error={params.error}
      />

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

      <TenantsTable tenants={tenants ?? []} />
    </div>
  );
}