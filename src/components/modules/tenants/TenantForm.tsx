"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTenant, updateTenant, getTenant } from "@/lib/api/tenant.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type Props =
  | { mode: "create" }
  | { mode: "edit"; id: string };

export function TenantForm(props: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const isEdit = props.mode === "edit";

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    logo_url: "",
  });

  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;

    const id = props.id;

    setLoading(true);

    async function load() {
      try {
        const data = await getTenant(id);

        setForm({
          nombre: data?.nombre ?? "",
          email: data?.email ?? "",
          telefono: data?.telefono ?? "",
          logo_url: data?.logo_url ?? "",
        });
      } catch (err: any) {
        toast.error(err.message || "Error al cargar tenant");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!isEdit) {
        await createTenant(form);
        toast.success("Tenant creado");
        router.replace("/tenants?success=create");
        return;
      }

      const id = props.id;

      await updateTenant(id, form);

      toast.success("Tenant actualizado");
      router.replace("/tenants?success=update");
    } catch (err: any) {
      toast.error(err.message || "Error");
    }
  }

  if (loading) {
    return <p className="text-sm text-zinc-400">Cargando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <Input label="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
      <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input label="Teléfono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
      <Input label="Logo URL" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} />

      <Button type="submit" size="sm">
        {isEdit ? "Guardar" : "Crear"}
      </Button>
    </form>
  );
}