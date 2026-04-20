import type { HTMLAttributes, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Remove all shadows for a flat, border-only style */
  flat?: boolean;
};

export function Card({
  className = "",
  children,
  flat = false,
  ...props
}: CardProps) {
  const shadow = flat
    ? "border border-zinc-200 bg-white"
    : "border border-zinc-200/80 bg-white shadow-sm shadow-zinc-900/[0.04] ring-1 ring-zinc-900/[0.02] transition-[box-shadow,transform] duration-200 hover:shadow-md hover:shadow-zinc-900/[0.06]";

  return (
    <div className={`rounded-xl ${shadow} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 border-b border-zinc-100 px-6 py-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  return (
    <h2
      className={`text-sm font-medium tracking-tight text-zinc-900 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={`px-6 py-5 ${className}`} {...props}>
      {children}
    </div>
  );
}

// ── CardHeaderActions ─────────────────────────────────────────────────────────
// Groups multiple action elements in the right side of a CardHeader.

export function CardHeaderActions({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>{children}</div>
  );
}

// ── CardMenu ──────────────────────────────────────────────────────────────────
// 3-dot overflow menu for card headers. Compose with DropdownMenuItem children.

function DotsIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden>
      <circle cx="3" cy="8" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="13" cy="8" r="1.25" />
    </svg>
  );
}

export function CardMenu({
  children,
  align = "end",
}: {
  children: ReactNode;
  align?: "start" | "end";
}) {
  return (
    <DropdownMenu align={align}>
      <DropdownMenuTrigger
        className="flex size-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
        aria-label="Card options"
      >
        <DotsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}

// ── CardFooter ────────────────────────────────────────────────────────────────
// Border-top footer, right-aligned by default. Accepts any action elements.

export function CardFooter({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`flex items-center justify-end gap-2 border-t border-zinc-100 px-6 py-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// ── CardList / CardListItem ───────────────────────────────────────────────────
// Renders a divided list inside a card with consistent row padding and hover.

export function CardList({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={`divide-y divide-zinc-100 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardListItem({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-6 py-3 text-sm text-zinc-700 transition-colors duration-100 hover:bg-zinc-50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
