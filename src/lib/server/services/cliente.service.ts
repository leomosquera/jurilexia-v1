import { clienteRepository } from "../repositories/cliente.repository";
import { personaService, extractPrincipal, type RawContacto } from "./persona.service";

export const clienteService = {
  async getAll(ctx: any) {
    const { data, error } = await clienteRepository.getAll(ctx);
    if (error) throw new Error(error.message);

    return (data ?? []).map((c: any) => {
      const persona = c.persona;
      const contactos: RawContacto[] = persona?.persona_contacto ?? [];
      return {
        id: c.id,
        tipo: persona?.tipo,
        nombre: persona?.nombre,
        apellido: persona?.apellido,
        documento: persona?.documento,
        cuil: persona?.cuil,
        cuit: persona?.cuit,
        email_principal: extractPrincipal(contactos, "email"),
        telefono_principal: extractPrincipal(contactos, "telefono"),
      };
    });
  },

  async getById(ctx: any, id: string) {
    const { data, error } = await clienteRepository.getById(ctx, id);
    if (error) throw new Error(error.message);
    return data;
  },

  async create(ctx: any, payload: any) {
    // Delega toda la lógica de persona (tipo, uniqueness, contactos, domicilios)
    const persona = await personaService.create(ctx, payload);

    const { error: clienteError } = await clienteRepository.insertCliente(ctx, {
      tenant_id: ctx.tenant_id,
      persona_id: persona.id,
    });

    if (clienteError) throw clienteError;

    return { success: true, persona_id: persona.id };
  },

  async update(ctx: any, id: string, payload: any) {
    const { data: cliente, error: clienteError } =
      await clienteRepository.getPersonaId(ctx, id);

    if (clienteError) throw clienteError;

    // Delega toda la lógica de persona (tipo, uniqueness, strip)
    await personaService.update(ctx, cliente.persona_id, payload);

    return { success: true };
  },

  async delete(ctx: any, id: string) {
    const { error } = await clienteRepository.softDelete(ctx, id);
    if (error) throw error;
    return { success: true };
  },
};