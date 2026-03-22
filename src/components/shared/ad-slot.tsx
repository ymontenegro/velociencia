interface AdSlotProps {
  slotId: string;
  size?: "sidebar" | "banner" | "inline";
  className?: string;
}

const SIZE_STYLES: Record<string, string> = {
  sidebar: "min-h-[250px] w-full max-w-[300px]",
  banner: "min-h-[90px] w-full",
  inline: "min-h-[120px] w-full max-w-2xl mx-auto",
};

export function AdSlot({ slotId, size = "inline", className = "" }: AdSlotProps) {
  const isDev = process.env.NODE_ENV === "development";
  const sizeClass = SIZE_STYLES[size] || SIZE_STYLES.inline;

  if (isDev) {
    return (
      <div
        className={`flex items-center justify-center rounded border border-dashed border-[var(--color-border)] bg-[var(--color-border-light)]/30 ${sizeClass} ${className}`}
        data-ad-slot={slotId}
      >
        <span className="font-serif text-xs italic text-[var(--color-text-muted)]/60">
          Espacio publicitario
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} ${className}`}
      data-ad-slot={slotId}
    />
  );
}
