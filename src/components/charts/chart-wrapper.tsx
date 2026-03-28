"use client";

interface ChartWrapperProps {
  title?: string;
  caption?: string;
  children: React.ReactNode;
  height?: number;
}

export function ChartWrapper({ title, caption, children, height = 350 }: ChartWrapperProps) {
  return (
    <figure className="not-prose my-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 sm:p-6">
      {title && (
        <figcaption className="mb-4 text-center text-sm font-semibold text-[var(--color-text)]">
          {title}
        </figcaption>
      )}
      <div style={{ width: "100%", height }}>{children}</div>
      {caption && (
        <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">{caption}</p>
      )}
    </figure>
  );
}
