import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "success" | "warning" | "danger" | "neutral";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  children: ReactNode;
};

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200/80",
  warning: "bg-amber-50 text-amber-700 ring-amber-200/80",
  danger: "bg-red-50 text-red-700 ring-red-200/80",
  neutral: "bg-zinc-100 text-zinc-600 ring-zinc-200/80",
};

export function Badge({
  variant = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
