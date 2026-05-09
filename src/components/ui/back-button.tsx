"use client";

import { useRouter } from "next/navigation";

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden
    >
      <path d="M10 13 5 8l5-5" />
    </svg>
  );
}

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Volver"
      className="
        inline-flex
        h-5
        w-5
        items-center
        justify-center
        rounded-md
        border
        border-zinc-200
        bg-zinc-50
        text-zinc-400
        transition-colors
        hover:bg-zinc-100
        hover:text-zinc-700
      "
    >
      <ArrowLeftIcon />
    </button>
  );
}