type ProgressRailProps = {
  current: number;
  total: number;
  label: string;
};

export default function ProgressRail({ current, total, label }: ProgressRailProps) {
  const percent = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-jonas-text-muted">
        {label}
      </div>
      <div className="h-2 w-full rounded-full bg-jonas-cream">
        <div
          className="h-2 rounded-full bg-brand-yellow transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
