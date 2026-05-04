import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { personaService } from "@/lib/server/services/persona.service";
import { PersonasTable } from "@/components/modules/personas/PersonasTable";

export default async function PersonasPage() {
  const ctx = await requireAuth();
  const personas = await personaService.getAll(ctx);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Personas"
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: "Personas" },
        ]}
        actions={
          <Link href="/personas/crear">
            <Button size="md">Nueva Persona</Button>
          </Link>
        }
      />

      <PersonasTable personas={personas} />
    </div>
  );
}
