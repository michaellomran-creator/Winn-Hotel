export function PlaceholderBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute bottom-3 left-3 z-10 label-caps bg-charcoal/70 text-ivory px-2.5 py-1 backdrop-blur-sm ${className}`}
    >
      Photo placeholder
    </span>
  );
}
