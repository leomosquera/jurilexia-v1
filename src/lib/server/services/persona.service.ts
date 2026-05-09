import { personaRepository } from "../repositories/persona.repository";
import { personaContactoRepository } from "../repositories/persona-contacto.repository";
import { personaDomicilioRepository } from "../repositories/persona-domicilio.repository";
import { normalizeContactoValor } from "@/lib/validation/schemas/persona-contacto.schema";

type RawContacto = {
  id: string;
  canal: string;
  valor: string;
  predeterminado: boolean;
  deleted_at: string | null;
};

function extractPrincipal(contactos: RawContacto[], canal: string): string | null {
  const active = contactos.filter((c) => !c.deleted_at && c.canal === canal);
  return active.find((c) => c.predeterminado)?.valor ?? active[0]?.valor ?? null;
}

export const personaService = {
  async getAll(ctx: any) {
    const { data, error } = await personaRepository.getAll(ctx);
    if (error) throw new Error(error.message);

    return (data ?? []).map((p: any) => {
      const contactos: RawContacto[] = p.persona_contacto ?? [];
      return {
        id: p.id,
        nombre: p.nombre,
        apellido: p.apellido,
        documento: p.documento,
        cuil: p.cuil,
        email_principal: extractPrincipal(contactos, "email"),
        telefono_principal: extractPrincipal(contactos, "telefono"),
      };
    });
  },

  async getById(ctx: any, id: string) {
    return personaRepository.getById(ctx, id);
  },

  async create(ctx: any, payload: any) {
    const { contactos, domicilios, ...personaPayload } = payload;
    const persona = await personaRepository.create(ctx, personaPayload);

    // Create initial contactos if provided (create-mode local state)
    if (Array.isArray(contactos) && contactos.length > 0) {
      for (const c of contactos) {
        const normalizedValor = normalizeContactoValor(c.canal, c.valor, c.pais_codigo ?? "AR");
        await personaContactoRepository.create(ctx, persona.id, {
          canal: c.canal,
          categoria: c.categoria,
          valor: normalizedValor,
          descripcion: c.descripcion ?? null,
          predeterminado: c.predeterminado,
          verificado: c.verificado,
          pais_codigo: c.pais_codigo ?? "AR",
        });
      }
    }

    // Create initial domicilios if provided (create-mode local state)
    if (Array.isArray(domicilios) && domicilios.length > 0) {
      for (const d of domicilios) {
        await personaDomicilioRepository.create(ctx, persona.id, {
          categoria: d.categoria,
          calle: d.calle,
          numero: d.numero ?? null,
          piso: d.piso ?? null,
          departamento: d.departamento ?? null,
          barrio: d.barrio ?? null,
          localidad_id: d.localidad_id ?? null,
          codigo_postal: d.codigo_postal ?? null,
          descripcion: d.descripcion ?? null,
          predeterminado: d.predeterminado,
          activo: d.activo,
        });
      }
    }

    return persona;
  },

  async update(ctx: any, id: string, payload: any) {
    return personaRepository.update(ctx, id, payload);
  },

  async delete(ctx: any, id: string) {
    return personaRepository.delete(ctx, id);
  },
};
