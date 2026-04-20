"use client";

import { useActionState } from "react";
import { updateTenant, type ActionState } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  defaultNombre: string;
  defaultEmail: string;
  defaultTelefono: string;
  defaultLogoUrl: string;
};

export function EditTenantForm({
  id,
  defaultNombre,
  defaultEmail,
  defaultTelefono,
  defaultLogoUrl,
}: Props) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateTenant.bind(null, id),
    null,
  );

  return (
    <form action={formAction} className="space-y-4 max-w-sm">
      <Input
        id="nombre"
        name="nombre"
        label="Nombre"
        defaultValue={defaultNombre}
        required
      />
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="contacto@empresa.com"
        defaultValue={defaultEmail}
      />
      <Input
        id="telefono"
        name="telefono"
        label="Teléfono"
        placeholder="+54 11 0000-0000"
        defaultValue={defaultTelefono}
      />
      <Input
        id="logo_url"
        name="logo_url"
        label="Logo URL"
        placeholder="https://ejemplo.com/logo.png"
        defaultValue={defaultLogoUrl}
      />
      {state?.error && (
        <p className="text-xs text-red-500">{state.error}</p>
      )}
      <Button type="submit" size="sm" disabled={isPending}>
        {isPending ? "Guardando…" : "Guardar"}
      </Button>
    </form>
  );
}
