"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createCliente,
  updateCliente,
  getCliente,
} from "@/lib/api/cliente.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

// ✅ discriminated union
type Props =
  | { mode: "create" }
  | { mode: "edit"; id: string };

export function ClienteForm(props: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const isEdit = props.mode === "edit";

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });

  const [loading, setLoading] = useState(isEdit);

  // ─────────────────────────────
  // LOAD (solo edit)
  // ─────────────────────────────
  useEffect(() => {
    if (!isEdit) return;

    const id = props.id; // ✔ TS seguro acá

    setLoading(true);

    async function load() {
      try {
        const data = await getCliente(id);

        const persona = Array.isArray(data.persona)
          ? data.persona[0]
          : data.persona;

        setForm({
          nombre: persona?.nombre ?? "",
          apellido: persona?.apellido ?? "",
          email: persona?.email ?? "",
        });
      } catch (err: any) {
        toast.error(err.message || "Error al cargar cliente");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [isEdit]); // 👈 importante: NO props.id

  // ─────────────────────────────
  // SUBMIT
  // ─────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!isEdit) {
        await createCliente(form);
        toast.success("Cliente creado");
        router.replace("/clientes?success=create");
        return;
      }

      // ✔ edit seguro
      const id = props.id;

      await updateCliente(id, form);

      toast.success("Cliente actualizado");
      router.replace("/clientes?success=update");
    } catch (err: any) {
      toast.error(err.message || "Error");
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
        onChange={(e) =>
          setForm({ ...form, nombre: e.target.value })
        }
        required
      />

      <Input
        label="Apellido"
        value={form.apellido}
        onChange={(e) =>
          setForm({ ...form, apellido: e.target.value })
        }
        required
      />

      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        required
      />

      <Button type="submit" size="sm">
        {isEdit ? "Guardar" : "Crear"}
      </Button>
    </form>
  );
}