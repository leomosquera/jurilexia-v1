"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPersona, getPersona, updatePersona } from "@/lib/api/personas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type Props =
  | { mode: "create" }
  | { mode: "edit"; id: string };

export function PersonaForm(props: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const isEdit = props.mode === "edit";

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    cuil: "",
    email: "",
    telefono: "",
  });

  const [loading, setLoading] = useState(isEdit);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;

    const id = (props as { mode: "edit"; id: string }).id;

    setLoading(true);

    async function load() {
      try {
        const data = await getPersona(id);
        setForm({
          nombre: data?.nombre ?? "",
          apellido: data?.apellido ?? "",
          documento: data?.documento ?? "",
          cuil: data?.cuil ?? "",
          email: data?.email ?? "",
          telefono: data?.telefono ?? "",
        });
      } catch (err: any) {
        toast.error(err.message || "Error al cargar persona");
      } finally {
        setLoading(false);
      }
    }

    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        documento: form.documento || null,
        cuil: form.cuil || null,
        email: form.email || null,
        telefono: form.telefono || null,
      };

      if (!isEdit) {
        await createPersona(payload);
        toast.success("Persona creada");
        router.replace("/personas");
        return;
      }

      const id = (props as { mode: "edit"; id: string }).id;
      await updatePersona(id, payload);
      toast.success("Persona actualizada");
      router.replace("/personas");
    } catch (err: any) {
      setError(err.message ?? "Error al guardar");
    } finally {
      setIsPending(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-zinc-400">Cargando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <Input
        label="Nombre"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        required
      />

      <Input
        label="Apellido"
        value={form.apellido}
        onChange={(e) => setForm({ ...form, apellido: e.target.value })}
        required
      />

      <Input
        label="Documento"
        value={form.documento}
        onChange={(e) => setForm({ ...form, documento: e.target.value })}
      />

      <Input
        label="CUIL"
        value={form.cuil}
        onChange={(e) => setForm({ ...form, cuil: e.target.value })}
      />

      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <Input
        label="Teléfono"
        value={form.telefono}
        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
      />

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      <Button type="submit" size="sm" disabled={isPending}>
        {isPending ? "Guardando…" : isEdit ? "Guardar" : "Crear"}
      </Button>
    </form>
  );
}
