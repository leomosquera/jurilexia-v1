import { z } from "zod";
import { PERSON_NAME_REGEX, DNI_REGEX, CUIL_REGEX } from "../common/patterns";
import { MESSAGES } from "../common/messages";
import { normalizeDNI, normalizeCUIL, normalizePhone, parseFechaNacimiento } from "../common/parsers";

// Converts empty / whitespace-only strings to undefined so optional fields
// can be left blank in forms without triggering validation errors.
function emptyToUndefined(v: unknown): unknown {
  return typeof v === "string" && v.trim() === "" ? undefined : v;
}

// ── Sexo ──────────────────────────────────────────────────────────────────────

export const SEXOS = ["masculino", "femenino", "no_binario", "no_especificado"] as const;
export type Sexo = (typeof SEXOS)[number];

export const SEXO_LABELS: Record<Sexo, string> = {
  masculino: "Masculino",
  femenino: "Femenino",
  no_binario: "No binario",
  no_especificado: "No especificado",
};

// ── createPersonaSchema ───────────────────────────────────────────────────────

export const createPersonaSchema = z.object({
  nombre: z
    .string()
    .min(1, MESSAGES.required)
    .max(100, MESSAGES.maxLength(100))
    .regex(PERSON_NAME_REGEX, MESSAGES.invalidName),

  apellido: z
    .string()
    .min(1, MESSAGES.required)
    .max(100, MESSAGES.maxLength(100))
    .regex(PERSON_NAME_REGEX, MESSAGES.invalidName),

  // Strips dots → validates digit count
  documento: z.preprocess(
    (v) => (typeof v === "string" && v.trim() ? normalizeDNI(v) : undefined),
    z.string().regex(DNI_REGEX, MESSAGES.invalidDNI).optional()
  ),

  // Strips dashes → validates prefix + digit count
  cuil: z.preprocess(
    (v) => (typeof v === "string" && v.trim() ? normalizeCUIL(v) : undefined),
    z.string().regex(CUIL_REGEX, MESSAGES.invalidCUIL).optional()
  ),

  sexo: z.preprocess(
    emptyToUndefined,
    z.enum(SEXOS).optional()
  ),

  // Accepts "dd/mm/aaaa" → normalizes to "YYYY-MM-DD" for persistence.
  // parseFechaNacimiento returns the raw value when the format is invalid,
  // which will then fail the ISO regex and surface a user-facing error.
  fecha_nacimiento: z.preprocess(
    (v) => (typeof v === "string" && v.trim() ? parseFechaNacimiento(v) : undefined),
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, MESSAGES.invalidDate)
      .refine(
        (iso) => new Date(iso + "T00:00:00") <= new Date(),
        MESSAGES.dateInFuture
      )
      .refine(
        (iso) => new Date(iso + "T00:00:00").getFullYear() >= 1900,
        MESSAGES.dateTooOld
      )
      .optional()
  ),
});

export type CreatePersonaInput = z.infer<typeof createPersonaSchema>;

// ── updatePersonaSchema ───────────────────────────────────────────────────────
// All fields are optional — send only the fields you want to update.

export const updatePersonaSchema = createPersonaSchema.partial();

export type UpdatePersonaInput = z.infer<typeof updatePersonaSchema>;
