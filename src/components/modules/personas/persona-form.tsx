"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createPersona, getPersona, updatePersona } from "@/lib/api/personas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  FormField,
  Label,
  HelperText,
  ErrorMessage,
} from "@/components/ui/form-field";
import {
  createPersonaSchema,
  updatePersonaSchema,
  type CreatePersonaInput,
} from "@/lib/validation/schemas/persona.schema";

// The form always works with string values — the schema handles
// normalization (DNI dots, CUIL dashes, phone E.164) on submit.
type FormValues = {
  nombre: string;
  apellido: string;
  documento: string;
  cuil: string;
  email: string;
  telefono: string;
};

const DEFAULT_VALUES: FormValues = {
  nombre: "",
  apellido: "",
  documento: "",
  cuil: "",
  email: "",
  telefono: "",
};

type Props =
  | { mode: "create" }
  | { mode: "edit"; id: string };

export function PersonaForm(props: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const isEdit = props.mode === "edit";

  const [loading, setLoading] = useState(isEdit);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(isEdit ? updatePersonaSchema : createPersonaSchema) as any,
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
  });

  // Edit mode: fetch existing data and populate the form
  useEffect(() => {
    if (!isEdit) return;

    const id = (props as { mode: "edit"; id: string }).id;
    setLoading(true);

    async function load() {
      try {
        const data = await getPersona(id);
        reset({
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

  // The data argument has already been validated and transformed by Zod
  // (DNI/CUIL normalized, phone in E.164). We only need to map undefined → null.
  async function onSubmit(data: CreatePersonaInput) {
    setIsPending(true);

    try {
      const payload = {
        nombre: data.nombre!,
        apellido: data.apellido!,
        documento: data.documento ?? null,
        cuil: data.cuil ?? null,
        email: data.email ?? null,
        telefono: data.telefono ?? null,
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
      toast.error(err.message ?? "Error al guardar");
    } finally {
      setIsPending(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-zinc-400">Cargando...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4 max-w-sm">

      <FormField id="nombre" state={errors.nombre ? "error" : "default"}>
        <Label required>Nombre</Label>
        <Input {...register("nombre")} placeholder="José" />
        {errors.nombre ? (
          <ErrorMessage>{errors.nombre.message}</ErrorMessage>
        ) : (
          <HelperText>Solo letras y caracteres válidos.</HelperText>
        )}
      </FormField>

      <FormField id="apellido" state={errors.apellido ? "error" : "default"}>
        <Label required>Apellido</Label>
        <Input {...register("apellido")} placeholder="García" />
        {errors.apellido ? (
          <ErrorMessage>{errors.apellido.message}</ErrorMessage>
        ) : (
          <HelperText>Solo letras y caracteres válidos.</HelperText>
        )}
      </FormField>

      <FormField id="documento" state={errors.documento ? "error" : "default"}>
        <Label>DNI</Label>
        <Input {...register("documento")} placeholder="12345678" />
        {errors.documento ? (
          <ErrorMessage>{errors.documento.message}</ErrorMessage>
        ) : (
          <HelperText>Sin puntos. Ejemplo: 12345678</HelperText>
        )}
      </FormField>

      <FormField id="cuil" state={errors.cuil ? "error" : "default"}>
        <Label>CUIL</Label>
        <Input {...register("cuil")} placeholder="20-12345678-0" />
        {errors.cuil ? (
          <ErrorMessage>{errors.cuil.message}</ErrorMessage>
        ) : (
          <HelperText>Con o sin guiones. Ej: 20-12345678-0</HelperText>
        )}
      </FormField>

      <FormField id="email" state={errors.email ? "error" : "default"}>
        <Label>Email</Label>
        <Input {...register("email")} type="email" placeholder="persona@ejemplo.com" />
        {errors.email ? (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        ) : (
          <HelperText>Usaremos este email para contacto.</HelperText>
        )}
      </FormField>

      <FormField id="telefono" state={errors.telefono ? "error" : "default"}>
        <Label>Teléfono</Label>
        <Input {...register("telefono")} placeholder="+54 11 1234-5678" />
        {errors.telefono ? (
          <ErrorMessage>{errors.telefono.message}</ErrorMessage>
        ) : (
          <HelperText>Incluí código de área.</HelperText>
        )}
      </FormField>

      <Button type="submit" size="sm" loading={isPending}>
        {isEdit ? "Guardar" : "Crear"}
      </Button>

    </form>
  );
}
