export function BrandMark({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="6" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
      <path
        d="M7 16.5V8.2c0-.4.5-.6.8-.3L12 12l4.2-4.1c.3-.3.8-.1.8.3v8.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
