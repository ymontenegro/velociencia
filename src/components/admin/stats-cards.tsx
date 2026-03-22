type StatCardProps = {
  label: string;
  value: number;
  accent: "green" | "yellow" | "red" | "blue" | "purple";
};

const accentStyles: Record<StatCardProps["accent"], { border: string; bg: string; text: string }> = {
  green: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  yellow: {
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  red: {
    border: "border-l-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
  },
  blue: {
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  purple: {
    border: "border-l-purple-500",
    bg: "bg-purple-50",
    text: "text-purple-700",
  },
};

function StatCard({ label, value, accent }: StatCardProps) {
  const style = accentStyles[accent];

  return (
    <div
      className={`bg-white rounded-lg border border-[var(--color-border)] ${style.border} border-l-4 p-5`}
    >
      <p className="text-sm font-medium text-[var(--color-text-muted)] mb-1">
        {label}
      </p>
      <p className={`text-3xl font-bold ${style.text}`}>
        {value}
      </p>
    </div>
  );
}

type StatsCardsProps = {
  stats: {
    label: string;
    value: number;
    accent: StatCardProps["accent"];
  }[];
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          accent={stat.accent}
        />
      ))}
    </div>
  );
}
