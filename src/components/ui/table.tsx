"use client";

import { useCallback, useMemo, useState, type HTMLAttributes, type InputHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes, type ReactNode } from "react";

export type TableAlign = "left" | "right" | "center";
export type SortDirection = "asc" | "desc";

const alignClass: Record<TableAlign, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

// ── Table ─────────────────────────────────────────────────────────────────────

export type TableProps = HTMLAttributes<HTMLTableElement> & {
  children: ReactNode;
};

export function Table({ className = "", children, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto overflow-y-visible rounded-lg border border-zinc-200">
      <table
        className={`w-full border-collapse text-sm ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

// ── TableHeader ───────────────────────────────────────────────────────────────

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement> & {
  children: ReactNode;
};

export function TableHeader({ className = "", children, ...props }: TableHeaderProps) {
  return (
    <thead
      className={`border-b border-zinc-200 bg-zinc-50/60 ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
}

// ── TableRow ──────────────────────────────────────────────────────────────────

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  children: ReactNode;
  selected?: boolean;
};

export function TableRow({ className = "", selected = false, children, ...props }: TableRowProps) {
  return (
    <tr
      className={`group border-b border-zinc-100 transition-colors duration-100 last:border-0 ${
        selected ? "bg-indigo-50/50 hover:bg-indigo-50/70" : "hover:bg-zinc-50"
      } ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

// ── SortIcon ──────────────────────────────────────────────────────────────────

function SortIcon({ direction }: { direction: SortDirection | null }) {
  return (
    <svg
      viewBox="0 0 8 12"
      className="size-3 shrink-0"
      aria-hidden
    >
      <g className={direction === "asc" ? "text-indigo-500" : "text-zinc-300"}>
        <path
          d="M1 4.5 4 1.5 7 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className={direction === "desc" ? "text-indigo-500" : "text-zinc-300"}>
        <path
          d="M1 7.5 4 10.5 7 7.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

// ── TableCell ─────────────────────────────────────────────────────────────────

export type TableCellProps = (TdHTMLAttributes<HTMLTableCellElement> &
  ThHTMLAttributes<HTMLTableCellElement>) & {
  isHeader?: boolean;
  align?: TableAlign;
  sortable?: boolean;
  sortDirection?: SortDirection | null;
  onSort?: () => void;
  sticky?: boolean;
  children?: ReactNode;
};

export function TableCell({
  isHeader = false,
  align = "left",
  sortable = false,
  sortDirection = null,
  onSort,
  sticky = false,
  className = "",
  children,
  ...props
}: TableCellProps) {
  const base = alignClass[align];

  if (isHeader) {
    const stickyClass = sticky
      ? "sticky right-0 z-20 border-l border-zinc-200 bg-zinc-50/90"
      : "";
    return (
      <th
        className={`px-4 py-2.5 text-xs font-medium text-zinc-500 ${base} ${stickyClass} ${className}`}
        {...props}
      >
        {sortable ? (
          <button
            type="button"
            onClick={onSort}
            className="inline-flex items-center gap-1 select-none transition-colors duration-100 hover:text-zinc-800"
          >
            {children}
            <SortIcon direction={sortDirection ?? null} />
          </button>
        ) : (
          children
        )}
      </th>
    );
  }

  const stickyClass = sticky
    ? "sticky right-0 z-10 border-l border-zinc-100 bg-white group-hover:bg-zinc-50"
    : "";

  return (
    <td
      className={`px-4 py-3 align-middle text-zinc-700 ${base} ${stickyClass} ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}

// ── useTableSearch ─────────────────────────────────────────────────────────────
// Generic hook for client-side search across any set of row fields.
// Pass a module-level (or memoised) `keys` array to keep deps stable.

export function useTableSearch<T extends object>(
  rows: T[],
  keys: ReadonlyArray<keyof T>,
): { query: string; setQuery: (q: string) => void; filtered: T[] } {
  const [query, setQuery] = useState("");

  // Serialise keys so the dep is a primitive — safe against inline-array churn
  const keysKey = (keys as unknown as string[]).join("\0");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    const ks = keysKey.split("\0");
    return rows.filter((row) =>
      ks.some((k) =>
        String((row as Record<string, unknown>)[k] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [rows, query, keysKey]);

  return { query, setQuery, filtered };
}

// ── TableSearch ────────────────────────────────────────────────────────────────
// Compact search input designed to sit above a Table.

export type TableSearchProps = InputHTMLAttributes<HTMLInputElement>;

export function TableSearch({ className = "", ...props }: TableSearchProps) {
  return (
    <div className="relative flex items-center">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute left-2.5 size-3.5 text-zinc-400"
        aria-hidden
      >
        <circle cx="7" cy="7" r="4.5" />
        <path d="m11 11 2.5 2.5" />
      </svg>
      <input
        type="search"
        className={`h-8 w-full rounded-lg border border-zinc-200 bg-white pl-8 pr-3 text-sm text-zinc-700 outline-none placeholder:text-zinc-400 transition-colors duration-150 hover:border-zinc-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/[0.12] ${className}`}
        {...props}
      />
    </div>
  );
}

// ── useTableSelection ──────────────────────────────────────────────────────────
// Manages a Set of selected row IDs. Pass the IDs of all currently visible rows.

export type TableSelectionResult = {
  selected: Set<string>;
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  toggleAll: () => void;
  clearSelection: () => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
};

export function useTableSelection(ids: string[]): TableSelectionResult {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Derive selection state from the current visible IDs
  const isAllSelected = ids.length > 0 && ids.every((id) => selected.has(id));
  const isIndeterminate = !isAllSelected && ids.some((id) => selected.has(id));

  const isSelected = useCallback((id: string) => selected.has(id), [selected]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected(isAllSelected ? new Set() : new Set(ids));
  }, [ids, isAllSelected]);

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  return { selected, isSelected, toggle, toggleAll, clearSelection, isAllSelected, isIndeterminate };
}

// ── TableBulkActions ───────────────────────────────────────────────────────────
// Action bar that appears when rows are selected. Pass action buttons as children.

export type TableBulkActionsProps = {
  selected: number;
  total: number;
  onClear: () => void;
  children?: ReactNode;
};

export function TableBulkActions({ selected, total, onClear, children }: TableBulkActionsProps) {
  return (
    <div className="flex h-7 items-center gap-1">
      <span className="mr-1 text-xs tabular-nums text-zinc-500">
        {selected} of {total} selected
      </span>
      <span className="h-4 w-px bg-zinc-200" aria-hidden />
      {children}
      <button
        type="button"
        onClick={onClear}
        aria-label="Clear selection"
        className="ml-auto inline-flex size-5 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
      >
        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden className="size-2.5">
          <path d="M1.5 1.5 8.5 8.5M8.5 1.5 1.5 8.5" />
        </svg>
      </button>
    </div>
  );
}
