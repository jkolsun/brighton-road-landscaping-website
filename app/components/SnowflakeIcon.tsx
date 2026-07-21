// Minimal snowflake icon matching the @heroicons/react/24/solid component API
// (heroicons has no snowflake) — used by the Commercial Snow Removal service.
export default function SnowflakeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2v20M12 2l-2.5 2.5M12 2l2.5 2.5M12 22l-2.5-2.5M12 22l2.5-2.5" />
      <path d="M3.34 7l17.32 10M3.34 7L2.4 10.4M3.34 7L6.8 6.1M20.66 17l.94-3.4M20.66 17l-3.46.9" />
      <path d="M3.34 17L20.66 7M3.34 17l3.46.9M3.34 17l-.94-3.4M20.66 7l-3.46-.9M20.66 7l.94 3.4" />
    </svg>
  );
}
