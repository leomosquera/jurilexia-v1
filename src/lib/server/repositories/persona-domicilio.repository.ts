/**
 * Required Supabase migration:
 *
 * CREATE TABLE persona_domicilio (
 *   id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
 *   tenant_id      uuid        NOT NULL,
 *   persona_id     uuid        NOT NULL REFERENCES persona(id),
 *   categoria      text        NOT NULL CHECK (categoria IN ('fiscal','particular','laboral','otro')),
 *   calle          text        NOT NULL,
 *   numero         text,
 *   piso           text,
 *   departamento   text,
 *   barrio         text,
 *   localidad_id   uuid        REFERENCES localidades(id),
 *   codigo_postal  text,
 *   descripcion    text,
 *   predeterminado boolean     NOT NULL DEFAULT false,
 *   activo         boolean     NOT NULL DEFAULT true,
 *   deleted_at     timestamptz,
 *   created_at     timestamptz NOT NULL DEFAULT now()
 * );
 */

import { SupabaseClient } from "@supabase/supabase-js";

type Ctx = { supabase: SupabaseClient; tenant_id: string | null };

export type DomicilioRow = {
  id: string;
  categoria: string;
  calle: string;
  numero: string | null;
  piso: string | null;
  departamento: string | null;
  barrio: string | null;
  localidad_id: string | null;
  localidad_nombre: string | null;
  localidad_provincia_id: string | null;
  codigo_postal: string | null;
  descripcion: string | null;
  predeterminado: boolean;
  activo: boolean;
  created_at: string;
};

// ── Select string ─────────────────────────────────────────────────────────────
// Shared across all queries that return full rows (including localidad join).

const SELECT_FIELDS =
  "id, categoria, calle, numero, piso, departamento, barrio, localidad_id, codigo_postal, descripcion, predeterminado, activo, created_at, localidades(nombre, provincia_id)";

// ── Row mapper ────────────────────────────────────────────────────────────────
// Flattens the localidades join into localidad_nombre.
// `row` is typed as `any` because SupabaseClient is used without generated types.

function mapRow(row: any): DomicilioRow {
  return {
    id: row.id,
    categoria: row.categoria,
    calle: row.calle,
    numero: row.numero ?? null,
    piso: row.piso ?? null,
    departamento: row.departamento ?? null,
    barrio: row.barrio ?? null,
    localidad_id: row.localidad_id ?? null,
    localidad_nombre: row.localidades?.nombre ?? null,
    localidad_provincia_id: row.localidades?.provincia_id ?? null,
    codigo_postal: row.codigo_postal ?? null,
    descripcion: row.descripcion ?? null,
    predeterminado: row.predeterminado,
    activo: row.activo,
    created_at: row.created_at,
  };
}

// ── Repository ────────────────────────────────────────────────────────────────

export const personaDomicilioRepository = {
  async getAllByPersona(ctx: Ctx, personaId: string): Promise<DomicilioRow[]> {
    const { data, error } = await ctx.supabase
      .from("persona_domicilio")
      .select(SELECT_FIELDS)
      .eq("tenant_id", ctx.tenant_id)
      .eq("persona_id", personaId)
      .filter("deleted_at", "is", null)
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRow);
  },

  async create(ctx: Ctx, personaId: string, payload: {
    categoria: string;
    calle: string;
    numero?: string | null;
    piso?: string | null;
    departamento?: string | null;
    barrio?: string | null;
    localidad_id?: string | null;
    codigo_postal?: string | null;
    descripcion?: string | null;
    predeterminado: boolean;
    activo: boolean;
  }): Promise<DomicilioRow> {
    const { data, error } = await ctx.supabase
      .from("persona_domicilio")
      .insert({
        ...payload,
        numero: payload.numero ?? null,
        piso: payload.piso ?? null,
        departamento: payload.departamento ?? null,
        barrio: payload.barrio ?? null,
        localidad_id: payload.localidad_id ?? null,
        codigo_postal: payload.codigo_postal ?? null,
        descripcion: payload.descripcion ?? null,
        persona_id: personaId,
        tenant_id: ctx.tenant_id,
      })
      .select(SELECT_FIELDS)
      .single();

    if (error) throw new Error(error.message);
    return mapRow(data);
  },

  async update(ctx: Ctx, domicilioId: string, payload: {
    categoria?: string;
    calle?: string;
    numero?: string | null;
    piso?: string | null;
    departamento?: string | null;
    barrio?: string | null;
    localidad_id?: string | null;
    codigo_postal?: string | null;
    descripcion?: string | null;
    predeterminado?: boolean;
    activo?: boolean;
  }): Promise<DomicilioRow> {
    const { data, error } = await ctx.supabase
      .from("persona_domicilio")
      .update(payload)
      .eq("id", domicilioId)
      .eq("tenant_id", ctx.tenant_id)
      .filter("deleted_at", "is", null)
      .select(SELECT_FIELDS)
      .single();

    if (error) throw new Error(error.message);
    return mapRow(data);
  },

  async delete(ctx: Ctx, domicilioId: string): Promise<void> {
    const { error } = await ctx.supabase
      .from("persona_domicilio")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", domicilioId)
      .eq("tenant_id", ctx.tenant_id);

    if (error) throw new Error(error.message);
  },

  /**
   * Sets predeterminado=true for the given domicilio and
   * predeterminado=false for all others of the same persona.
   * Unlike contactos (scoped by canal), a persona has a single
   * predeterminado domicilio across all categories.
   */
  async setPredeterminado(ctx: Ctx, domicilioId: string, personaId: string): Promise<void> {
    // Unset all predeterminado for this persona
    const { error: unsetError } = await ctx.supabase
      .from("persona_domicilio")
      .update({ predeterminado: false })
      .eq("persona_id", personaId)
      .eq("tenant_id", ctx.tenant_id)
      .filter("deleted_at", "is", null);

    if (unsetError) throw new Error(unsetError.message);

    // Set the target as predeterminado
    const { error: setError } = await ctx.supabase
      .from("persona_domicilio")
      .update({ predeterminado: true })
      .eq("id", domicilioId)
      .eq("tenant_id", ctx.tenant_id);

    if (setError) throw new Error(setError.message);
  },
};
