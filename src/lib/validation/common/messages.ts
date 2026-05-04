/**
 * Centralized validation error messages.
 * Use these constants in Zod schemas to keep messages consistent.
 */

export const MESSAGES = {
  required: "Este campo es obligatorio",
  invalidEmail: "Ingresá un email válido",
  invalidPhone: "Ingresá un teléfono válido",
  invalidCUIL: "CUIL inválido. Formato esperado: 20-12345678-0",
  invalidDNI: "DNI inválido. Debe tener 7 u 8 dígitos",
  invalidName: "El nombre contiene caracteres no permitidos",
  minLength: (n: number) => `Mínimo ${n} caracteres`,
  maxLength: (n: number) => `Máximo ${n} caracteres`,
} as const;
