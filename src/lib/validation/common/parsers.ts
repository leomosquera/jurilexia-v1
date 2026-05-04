import { parsePhoneNumber } from "libphonenumber-js";

/**
 * Strips dots and spaces from a DNI string, leaving only digits.
 * "12.345.678" → "12345678"
 * " 1.234.567 " → "1234567"
 */
export function normalizeDNI(value: string): string {
  return value.replace(/[\s.]/g, "");
}

/**
 * Strips dashes and spaces from a CUIL/CUIT string, leaving only digits.
 * "20-12345678-0" → "20123456780"
 */
export function normalizeCUIL(value: string): string {
  return value.replace(/[\s\-]/g, "");
}

/**
 * Normalizes a phone number to E.164 format using libphonenumber-js.
 * Falls back to the trimmed input if parsing fails or the number is invalid.
 *
 * @param value   - Raw input from the user.
 * @param country - Default country code used when the input has no country prefix.
 *                  Defaults to "AR" (Argentina).
 *
 * @example
 * normalizePhone("11 1234-5678")        // "+541112345678"
 * normalizePhone("+54 9 11 1234 5678")  // "+5491112345678"
 * normalizePhone("not-a-number")        // "not-a-number"
 */
export function normalizePhone(value: string, country = "AR"): string {
  const trimmed = value?.trim();
  if (!trimmed) return "";
  try {
    const parsed = parsePhoneNumber(trimmed, country as Parameters<typeof parsePhoneNumber>[1]);
    if (parsed?.isValid()) {
      return parsed.format("E.164");
    }
  } catch {
    // Parsing failed — return raw value
  }
  return trimmed;
}
