"use client";

import { useActionState } from "react";
import { updateTenant, type ActionState } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  defaultNombre: string;
};

export function EditTenantForm({ id, defaultNombre }: Props) {
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
