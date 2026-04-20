import Image from "next/image";

function initialsFromName(name: string, max = 2) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, max);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-9 text-sm",
  lg: "size-10 text-sm",
} as const;

export type AvatarProps = {
  name: string;
  src?: string | null;
  alt?: string;
  size?: keyof typeof sizeClasses;
  className?: string;
};

export function Avatar({
  name,
  src,
  alt,
  size = "md",
  className = "",
}: AvatarProps) {
  const initials = initialsFromName(name);
  const label = alt ?? name;

  const shell = `rounded-full font-medium shadow-md shadow-zinc-900/10 ring-2 ring-white ${sizeClasses[size]} ${className}`;

  if (src) {
    return (
      <span
        className={`relative inline-flex overflow-hidden bg-zinc-100 ${shell}`}
      >
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          sizes="40px"
        />
      </span>
    );
  }

  return (
    <span
      aria-label={label}
      title={label}
      className={`inline-flex select-none items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200/90 text-zinc-700 ${shell}`}
    >
      {initials}
    </span>
  );
}
