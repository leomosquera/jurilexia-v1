import { z } from "zod";
import { PERSON_NAME_REGEX, DNI_REGEX, CUIL_REGEX } from "../common/patterns";
import { MESSAGES } from "../common/messages";
import { normalizeDNI, normalizeCUIL, normalizePhone } from "../common/parsers";

// Converts empty / whitespace-only strings to undefined so optional fields
// can be left blank in forms without triggering validation errors.
function emptyToUndefined(v: unknown): unknown {
  return typeof v === "string" && v.trim() === "" ? undefined : v;
}

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

  // Empty string → undefined; non-empty → validated email
  email: z.preprocess(
    emptyToUndefined,
    z.string().email(MESSAGES.invalidEmail).max(254, MESSAGES.maxLength(254)).optional()
  ),

  // Empty string → undefined; non-empty → normalized to E.164
  telefono: z.preprocess(
    emptyToUndefined,
    z.string().max(30, MESSAGES.maxLength(30)).transform(normalizePhone).optional()
  ),

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
});

export type CreatePersonaInput = z.infer<typeof createPersonaSchema>;

// ── updatePersonaSchema ───────────────────────────────────────────────────────
// All fields are optional — send only the fields you want to update.

export const updatePersonaSchema = createPersonaSchema.partial();

export type UpdatePersonaInput = z.infer<typeof updatePersonaSchema>;
