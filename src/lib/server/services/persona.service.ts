import { personaRepository } from "../repositories/persona.repository";

export const personaService = {
  async getAll(ctx: any) {
    const { data, error } = await personaRepository.getAll(ctx);
    if (error) throw new Error(error.message);
    return data ?? [];
  },

  async getById(ctx: any, id: string) {
    return personaRepository.getById(ctx, id);
  },

  async create(ctx: any, payload: any) {
    return personaRepository.create(ctx, payload);
  },

  async update(ctx: any, id: string, payload: any) {
    return personaRepository.update(ctx, id, payload);
  },

  async delete(ctx: any, id: string) {
    return personaRepository.delete(ctx, id);
  },
};
