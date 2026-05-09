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
 * Parses a dd/mm/yyyy date string and returns a normalized "YYYY-MM-DD" ISO date
 * string suitable for persistence.
 *
 * If the input cannot be parsed or represents an invalid calendar date (e.g.
 * 31/02/1990) the raw trimmed value is returned so Zod's regex can reject it
 * with a user-facing error message — consistent with the DNI/CUIL pattern.
 *
 * @example
 * parseFechaNacimiento("25/03/1985")  // "1985-03-25"
 * parseFechaNacimiento("31/02/1990")  // "31/02/1990"  ← fails schema regex
 * parseFechaNacimiento("badvalue")    // "badvalue"     ← fails schema regex
 */
export function parseFechaNacimiento(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return trimmed;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  const date = new Date(year, month - 1, day);
  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isValid) return trimmed;

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
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
