type ChoiceCardProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  kind: "single" | "multi";
};

export default function ChoiceCard({ label, selected, onSelect, kind }: ChoiceCardProps) {
  return (
    <button
      type="button"
      role={kind === "multi" ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left font-serif text-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
        selected
          ? "border-black bg-black text-white"
          : "border-jonas-text-muted/30 bg-white text-jonas-text hover:border-black"
      }`}
    >
      <span
        className={`flex h-5 w-5 flex-none items-center justify-center border-2 ${
          kind === "multi" ? "rounded-md" : "rounded-full"
        } ${selected ? "border-brand-yellow bg-brand-yellow" : "border-current"}`}
        aria-hidden
      >
        {selected && <span className="h-2 w-2 rounded-full bg-black" />}
      </span>
      {label}
    </button>
  );
}
