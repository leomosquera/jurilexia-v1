"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createPersona, getPersona, updatePersona } from "@/lib/api/personas";
import { Input } from "@/components/ui/input";
import { DniInput } from "@/components/ui/dni-input";
import { CuitInput } from "@/components/ui/cuit-input";
import { DateInput } from "@/components/ui/date-input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import {
  FormField,
  Label,
  HelperText,
  ErrorMessage,
} from "@/components/ui/form-field";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  createPersonaSchema,
  updatePersonaSchema,
  SEXOS,
  SEXO_LABELS,
  type CreatePersonaInput,
} from "@/lib/validation/schemas/persona.schema";
import { ContactosCard, type LocalContacto } from "./ContactosCard";
import { DomiciliosCard, type LocalDomicilio } from "./DomiciliosCard";

const SEXO_OPTIONS = SEXOS.map((s) => ({ value: s, label: SEXO_LABELS[s] }));

// The form always works with string values — the schema handles
// normalization (DNI dots, CUIL dashes, fecha dd/mm/aaaa → ISO) on submit.
type FormValues = {
  nombre: string;
  apellido: string;
  documento: string;
  cuil: string;
  sexo: string;
  fecha_nacimiento: string;
};

const DEFAULT_VALUES: FormValues = {
  nombre: "",
  apellido: "",
  documento: "",
  cuil: "",
  sexo: "",
  fecha_nacimiento: "",
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
  const [localContactos, setLocalContactos] = useState<LocalContacto[]>([]);
  const [localDomicilios, setLocalDomicilios] = useState<LocalDomicilio[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
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
          sexo: data?.sexo ?? "",
          fecha_nacimiento: data?.fecha_nacimiento ?? "",
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
        sexo: data.sexo ?? null,
        fecha_nacimiento: data.fecha_nacimiento ?? null,
      };

      if (!isEdit) {
        await createPersona({ ...payload, contactos: localContactos, domicilios: localDomicilios });
        toast.success("Persona creada");
        router.replace("/personas");
        return;
      }

      const id = (props as { mode: "edit"; id: string }).id;
      await updatePersona(id, payload);
      toast.success("Persona actualizada");
      router.refresh();
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
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4">

      {/* ── Información personal ─────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Información personal</CardTitle>
            <p className="mt-0.5 text-sm text-zinc-500">
              Nombre y apellido tal como figuran en documentos oficiales.
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-4 gap-y-4">
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

          <FormField id="sexo" state={errors.sexo ? "error" : "default"}>
            <Label>Sexo</Label>
            <Controller
              name="sexo"
              control={control}
              render={({ field }) => (
                <Select
                  options={SEXO_OPTIONS}
                  value={field.value as string}
                  onChange={field.onChange}
                  placeholder="Seleccionar…"
                  state={errors.sexo ? "error" : "default"}
                />
              )}
            />
            {errors.sexo && (
              <ErrorMessage>{errors.sexo.message}</ErrorMessage>
            )}
          </FormField>

          <FormField id="fecha_nacimiento" state={errors.fecha_nacimiento ? "error" : "default"}>
            <Label>Fecha de nacimiento</Label>
            <Controller
              name="fecha_nacimiento"
              control={control}
              render={({ field, fieldState }) => (
                <DateInput
                  value={field.value || undefined}
                  onChange={(v) => field.onChange(v ?? "")}
                  onBlur={field.onBlur}
                  state={fieldState.error ? "error" : "default"}
                />
              )}
            />
            {errors.fecha_nacimiento ? (
              <ErrorMessage>{errors.fecha_nacimiento.message}</ErrorMessage>
            ) : (
              <HelperText>Ejemplo: 25/03/1985</HelperText>
            )}
          </FormField>
        </CardContent>
      </Card>

      {/* ── Documentación ───────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Documentación</CardTitle>
            <p className="mt-0.5 text-sm text-zinc-500">
              Identificación fiscal y tributaria de la persona física.
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-4 gap-y-4">
          <FormField id="documento" state={errors.documento ? "error" : "default"}>
            <Label>DNI</Label>
            <Controller
              name="documento"
              control={control}
              render={({ field, fieldState }) => (
                <DniInput
                  value={field.value || undefined}
                  onChange={(v) => field.onChange(v ?? "")}
                  onBlur={field.onBlur}
                  state={fieldState.error ? "error" : "default"}
                />
              )}
            />
            {errors.documento ? (
              <ErrorMessage>{errors.documento.message}</ErrorMessage>
            ) : (
              <HelperText>Sin puntos. Ejemplo: 12.345.678</HelperText>
            )}
          </FormField>

          <FormField id="cuil" state={errors.cuil ? "error" : "default"}>
            <Label>CUIL</Label>
            <Controller
              name="cuil"
              control={control}
              render={({ field, fieldState }) => (
                <CuitInput
                  value={field.value || undefined}
                  onChange={(v) => field.onChange(v ?? "")}
                  onBlur={field.onBlur}
                  state={fieldState.error ? "error" : "default"}
                />
              )}
            />
            {errors.cuil ? (
              <ErrorMessage>{errors.cuil.message}</ErrorMessage>
            ) : (
              <HelperText>Con guiones automáticos. Ej: 20-12345678-0</HelperText>
            )}
          </FormField>
        </CardContent>
      </Card>



      {/* ── Contactos ────────────────────────────────────────────────────── */}
      {isEdit ? (
        <ContactosCard
          mode="edit"
          personaId={(props as { mode: "edit"; id: string }).id}
        />
      ) : (
        <ContactosCard
          mode="create"
          contactos={localContactos}
          onChange={setLocalContactos}
        />
      )}

      {/* ── Domicilios ───────────────────────────────────────────────────── */}
      {isEdit ? (
        <DomiciliosCard
          mode="edit"
          personaId={(props as { mode: "edit"; id: string }).id}
        />
      ) : (
        <DomiciliosCard
          mode="create"
          domicilios={localDomicilios}
          onChange={setLocalDomicilios}
        />
      )}

      {/* ── Acciones ─────────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <Button type="submit" loading={isPending}>
          {isEdit ? "Guardar cambios" : "Crear persona"}
        </Button>
      </div>

    </form>
  );
}
