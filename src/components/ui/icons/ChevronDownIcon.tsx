export function ChevronDownIcon({ className = "size-4" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M2 4l4 4 4-4" />
      </svg>
    );
  }