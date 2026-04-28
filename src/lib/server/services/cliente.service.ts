import { clienteRepository } from "../repositories/cliente.repository";

export const clienteService = {
  async getAll(ctx: any) {
    const { data, error } = await clienteRepository.getAll(ctx);
    if (error) throw new Error(error.message);
    return data ?? [];
  },

  async getById(ctx: any, id: string) {
    const { data, error } = await clienteRepository.getById(ctx, id);
    if (error) throw new Error(error.message);
    return data;
  },

  async create(ctx: any, payload: any) {
    const { data: persona, error: personaError } =
      await clienteRepository.insertPersona(ctx, {
        tenant_id: ctx.tenant_id,
        ...payload,
      });

    if (personaError) throw personaError;

    const { error: clienteError } =
      await clienteRepository.insertCliente(ctx, {
        tenant_id: ctx.tenant_id,
        persona_id: persona.id,
      });

    if (clienteError) throw clienteError;

    return { success: true };
  },

  async update(ctx: any, id: string, payload: any) {
    const { data: cliente, error: clienteError } =
      await clienteRepository.getPersonaId(ctx, id);

    if (clienteError) throw clienteError;

    const { error } = await clienteRepository.updatePersona(
      ctx,
      cliente.persona_id,
      payload
    );

    if (error) throw error;

    return { success: true };
  },

  async delete(ctx: any, id: string) {
    const { error } = await clienteRepository.softDelete(ctx, id);
    if (error) throw error;
    return { success: true };
  },
};