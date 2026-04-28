export function TrashIcon({ className = "size-4" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M2 4h12" />
        <path d="M5 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4" />
        <path d="M3.5 4l.75 9h7.5l.75-9" />
        <path d="M6.5 7v4M9.5 7v4" />
      </svg>
    );
  }