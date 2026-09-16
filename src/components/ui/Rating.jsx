import { Star } from "lucide-react";

export default function Rating({ value = 0, size = 14, showValue = true, count, className = "" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = value >= i + 1;
          const half = !filled && value > i && value < i + 1;
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-sand-400" fill="currentColor" strokeWidth={0} />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? "50%" : "100%" }}
                >
                  <Star size={size} className="text-accent-500" fill="currentColor" strokeWidth={0} />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && <span className="text-xs font-semibold text-ink-900/70">{value.toFixed(1)}</span>}
      {count !== undefined && <span className="text-xs text-ink-900/40">({count})</span>}
    </div>
  );
}
