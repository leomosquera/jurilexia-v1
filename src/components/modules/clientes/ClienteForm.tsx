"use client";

import { PersonaForm } from "@/components/modules/personas/persona-form";
import { createCliente, updateCliente } from "@/lib/api/cliente.api";

type Props =
  | { mode: "create" }
  | { mode: "edit"; clienteId: string; personaId: string };

export function ClienteForm(props: Props) {
  if (props.mode === "create") {
    return (
      <PersonaForm
        mode="create"
        submitAction={createCliente}
        backHref="/clientes"
        submitLabel="Crear cliente"
        successMessage="Cliente creado"
      />
    );
  }

  const { clienteId, personaId } = props;

  return (
    <PersonaForm
      mode="edit"
      id={personaId}
      submitAction={(payload) => updateCliente(clienteId, payload)}
      backHref="/clientes"
      submitLabel="Guardar cambios"
      successMessage="Cliente actualizado"
    />
  );
}
