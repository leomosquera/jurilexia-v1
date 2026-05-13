import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/require-auth";
import { PageHeader } from "@/components/ui/page-header";
import { ClienteForm } from "@/components/modules/clientes/ClienteForm";
import { clienteService } from "@/lib/server/services/cliente.service";
import { SettingsContainer } from "@/components/layout/SettingsContainer";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditarClientePage({ params }: Props) {
  const ctx = await requireAuth();
  const { id } = await params;

  const cliente = await clienteService.getById(ctx, id);

  if (!cliente) notFound();

  const persona = Array.isArray(cliente.persona) ? cliente.persona[0] : cliente.persona;

  if (!persona?.id) notFound();

  return (
    <SettingsContainer>
      <div className="space-y-8">
        <PageHeader
          back
          backHref="/clientes"
          title="Editar Cliente"
          breadcrumb={[
            { label: "Clientes", href: "/clientes" },
            { label: "Editar" },
          ]}
        />

        <ClienteForm mode="edit" clienteId={id} personaId={persona.id} />
      </div>
    </SettingsContainer>
  );
}
