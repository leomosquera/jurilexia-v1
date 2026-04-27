import { tenantRepository } from "../repositories/tenant.repository";

export const tenantService = {
  async getAll(ctx: any) {
    return tenantRepository.getAll(ctx);
  },

  async getById(ctx: any, id: string) {
    return tenantRepository.getById(ctx, id);
  },

  async create(ctx: any, payload: any) {
    return tenantRepository.create(ctx, payload);
  },

  async update(ctx: any, id: string, payload: any) {
    return tenantRepository.update(ctx, id, payload);
  },

  async delete(ctx: any, id: string) {
    return tenantRepository.delete(ctx, id);
  },
};