const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function CheckIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...base}>
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

export function CrossIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...base}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function AlertIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...base}>
      <path d="M8 3.5v5M8 11.5v.5" />
    </svg>
  );
}
