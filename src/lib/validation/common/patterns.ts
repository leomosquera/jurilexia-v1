/**
 * Regex for personal names.
 * Supports: accented chars, Unicode letters, combining marks, apostrophes,
 * typographic single quotes, hyphens, and spaces.
 * Valid: José, João, D'Nardo, O'Connor, Jean-Pierre, Müller.
 */
export const PERSON_NAME_REGEX = /^[\p{L}\p{M}'\u2019\-\s]+$/u;

/**
 * Normalized DNI (Argentine): 7 or 8 digits, no dots.
 * Apply normalizeDNI() before validating.
 */
export const DNI_REGEX = /^\d{7,8}$/;

/**
 * Normalized CUIL/CUIT: exactly 11 digits, no dashes.
 * Common prefixes: 20, 23, 24, 27 (persons), 30, 33, 34 (companies).
 * Apply normalizeCUIL() before validating.
 */
export const CUIL_REGEX = /^(20|23|24|27|30|33|34)\d{9}$/;
