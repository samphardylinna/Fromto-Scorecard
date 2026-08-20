const RADIUS = 50;
const HALF_CIRCUMFERENCE = Math.PI * RADIUS;

type GaugeProps = {
  score: number;
  max?: number;
  label: string;
  size?: "large" | "small";
};

export default function Gauge({ score, max = 9, label, size = "small" }: GaugeProps) {
  const fraction = Math.max(0, Math.min(1, score / max));
  const dashOffset = HALF_CIRCUMFERENCE * (1 - fraction);
  const displayScore = Math.round(score * 10) / 10;

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-jonas-text-muted/20 bg-white p-4">
      <svg viewBox="0 0 120 68" className={size === "large" ? "w-56" : "w-32"}>
        <path
          d="M10 60 A50 50 0 0 1 110 60"
          fill="none"
          stroke="#e6e1d6"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M10 60 A50 50 0 0 1 110 60"
          fill="none"
          stroke="var(--brand-yellow)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={HALF_CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className={`font-heading font-semibold ${size === "large" ? "text-3xl" : "text-xl"}`}>
        {displayScore}/{max}
      </div>
      <div className="text-center text-sm text-jonas-text-muted">{label}</div>
    </div>
  );
}
