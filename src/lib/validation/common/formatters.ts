/**
 * Visual formatters for display purposes only.
 * These produce human-readable strings and should NOT be used
 * as the value stored in the database — use parsers for that.
 */

/**
 * Formats a normalized DNI string for display.
 * "12345678" → "12.345.678"
 * "1234567"  → "1.234.567"
 */
export function formatDNI(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  }
  if (digits.length === 7) {
    return `${digits.slice(0, 1)}.${digits.slice(1, 4)}.${digits.slice(4)}`;
  }
  return digits;
}

/**
 * Formats a normalized CUIL/CUIT string for display.
 * "20123456780" → "20-12345678-0"
 */
export function formatCUIL(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 10)}-${digits.slice(10)}`;
  }
  return digits;
}
