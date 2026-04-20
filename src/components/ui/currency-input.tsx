"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useFormFieldCtx } from "@/components/ui/form-field";
import type { InputState } from "@/components/ui/input";

// ── Cursor mapping ─────────────────────────────────────────────────────────────
//
// Thousand-separator dots shift positions in the formatted string relative to
// the raw (dot-free) string. Two helpers translate between the two spaces.

/**
 * Count non-dot characters before `pos` in `str`.
 * Used to convert a cursor position in a formatted string to a raw position.
 */
function toRawPos(str: string, pos: number): number {
  let count = 0;
  for (let i = 0; i < pos; i++) {
    if (str[i] !== ".") count++;
  }
  return count;
}

/**
 * Find the position in `formatted` where the `rawPos`-th non-dot character
 * starts. Used to convert a raw cursor position back into the formatted string.
 */
function toFormattedPos(formatted: string, rawPos: number): number {
  let count = 0;
  for (let i = 0; i <= formatted.length; i++) {
    if (count === rawPos) return i;
    if (i < formatted.length && formatted[i] !== ".") count++;
  }
  return formatted.length;
}

// ── Formatting utilities ───────────────────────────────────────────────────────

/**
 * "1234,56" → "1.234,56"
 * Adds thousand-separator dots to the integer part while leaving the decimal
 * part untouched — including partial states like "1234," during typing.
 */
function formatTyping(raw: string): string {
  const comma = raw.indexOf(",");
  const intPart = comma === -1 ? raw : raw.slice(0, comma);
  const decPart = comma === -1 ? "" : raw.slice(comma);
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + decPart;
}

/**
 * 1000.5 → "1.000,50"
 * Full canonical display: always exactly 2 decimal places.
 */
function formatARS(n: number): string {
  const [int, dec] = n.toFixed(2).split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + dec;
}

/**
 * Strips everything except digits and comma; enforces one comma and
 * at most 2 decimal digits. Preserves partial states like "1234,".
 */
function sanitize(input: string): string {
  const cleaned = input.replace(/[^\d,]/g, "");
  const idx = cleaned.indexOf(",");
  if (idx === -1) return cleaned;
  return (
    cleaned.slice(0, idx) +
    "," +
    cleaned.slice(idx + 1).replace(/,/g, "").slice(0, 2)
  );
}

/**
 * "1234,56" | ",56" | "1234," → number | undefined
 */
function parse(raw: string): number | undefined {
  if (!raw || raw === ",") return undefined;
  const n = parseFloat(
    (raw.startsWith(",") ? "0" + raw : raw).replace(",", "."),
  );
  return isNaN(n) ? undefined : n;
}

// ── Styles (mirror Input component) ───────────────────────────────────────────

const borderStyles: Record<InputState, string> = {
  default:
    "border-zinc-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10",
  error:
    "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-500/10",
  success:
    "border-emerald-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10",
};

const hintStyles: Record<InputState, string> = {
  default: "text-zinc-400",
  error: "text-red-500",
  success: "text-emerald-600",
};

// ── Types ──────────────────────────────────────────────────────────────────────

export type CurrencyInputProps = {
  /** Numeric value in ARS. Undefined represents an empty field. */
  value?: number;
  /** Emits the parsed numeric value, or undefined when the field is cleared. */
  onChange?: (value: number | undefined) => void;
  state?: InputState;
  label?: string;
  hint?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
};

// ── Component ──────────────────────────────────────────────────────────────────

export function CurrencyInput({
  value,
  onChange,
  state: stateProp,
  label,
  hint,
  placeholder = "0,00",
  disabled = false,
  id: idProp,
  className = "",
}: CurrencyInputProps) {
  const ctx         = useFormFieldCtx();
  const generatedId = useId();

  const id    = idProp ?? ctx?.id ?? generatedId;
  const state = (stateProp ?? (ctx?.state as InputState) ?? "default") as InputState;

  const inputRef      = useRef<HTMLInputElement>(null);
  const isFocusedRef  = useRef(false);
  const pendingCursor = useRef<number | null>(null);

  const [displayValue, setDisplayValue] = useState(() =>
    value != null ? formatARS(value) : "",
  );

  // Sync external value changes while the field is not being edited.
  useEffect(() => {
    if (!isFocusedRef.current) {
      setDisplayValue(value != null ? formatARS(value) : "");
    }
  }, [value]);

  // Restore the computed cursor position after React syncs the DOM.
  // Runs after every render; the ref guard makes it a no-op when not needed.
  useLayoutEffect(() => {
    if (pendingCursor.current !== null && inputRef.current) {
      const pos = pendingCursor.current;
      pendingCursor.current = null;
      inputRef.current.setSelectionRange(pos, pos);
    }
  });

  /**
   * Core logic shared by handleChange and handleKeyDown.
   *
   * @param typedValue   The string as the browser currently shows it
   *                     (may contain our old thousand-separator dots).
   * @param typedCursor  The cursor position inside `typedValue`.
   */
  function applyChange(typedValue: string, typedCursor: number) {
    // Map cursor from formatted space → raw space (ignore dots)
    const rawCursor = toRawPos(typedValue, typedCursor);

    const raw       = sanitize(typedValue);
    const formatted = formatTyping(raw);

    // Map cursor back from raw space → new formatted space
    pendingCursor.current = toFormattedPos(formatted, rawCursor);

    setDisplayValue(formatted);
    onChange?.(parse(raw));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    applyChange(
      e.target.value,
      e.target.selectionStart ?? e.target.value.length,
    );
  }

  /**
   * Intercept Backspace/Delete when the cursor is adjacent to a
   * thousand-separator dot. Without this, the visible string would not change
   * (the dot gets stripped and re-added), making it feel like the key did
   * nothing. Instead we skip the separator and delete the neighboring digit.
   */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const el = inputRef.current;
    if (!el) return;

    const pos    = el.selectionStart ?? 0;
    const selEnd = el.selectionEnd   ?? 0;
    const val    = el.value;

    if (pos !== selEnd) return; // selection range active — let browser handle

    if (e.key === "Backspace" && pos > 0 && val[pos - 1] === ".") {
      // Cursor is right after a dot: delete the digit before the dot too
      e.preventDefault();
      applyChange(val.slice(0, pos - 2) + val.slice(pos), pos - 2);
    } else if (e.key === "Delete" && pos < val.length && val[pos] === ".") {
      // Cursor is right before a dot: delete the digit after the dot too
      e.preventDefault();
      applyChange(val.slice(0, pos) + val.slice(pos + 2), pos);
    }
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    isFocusedRef.current = true;
    requestAnimationFrame(() => e.target.select());
  }

  function handleBlur() {
    isFocusedRef.current = false;
    // Normalize to canonical format: always 2 decimal places
    const raw     = sanitize(displayValue.replace(/\./g, ""));
    const numeric = parse(raw);
    setDisplayValue(numeric != null ? formatARS(numeric) : "");
    onChange?.(numeric);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-zinc-600">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Fixed $ adornment — same slot as leftIcon in Input */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-sm text-zinc-400 select-none"
        >
          $
        </span>

        <input
          ref={inputRef}
          id={id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-describedby={
            state === "error" && ctx?.errorId ? ctx.errorId : undefined
          }
          aria-invalid={state === "error" || undefined}
          className={`h-8 w-full rounded-lg border bg-white pl-8 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 transition-all duration-150 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400 ${borderStyles[state]} ${className}`}
        />
      </div>

      {hint && <p className={`text-xs ${hintStyles[state]}`}>{hint}</p>}
    </div>
  );
}
