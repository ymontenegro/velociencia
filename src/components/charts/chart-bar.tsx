"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartWrapper } from "./chart-wrapper";

interface BarConfig {
  key: string;
  color: string;
  name: string;
  stackId?: string;
}

interface ChartBarProps {
  data: Record<string, unknown>[];
  xKey: string;
  bars: BarConfig[];
  title?: string;
  caption?: string;
  height?: number;
  layout?: "horizontal" | "vertical";
  unit?: string;
  colors?: string[];
}

export function ChartBar({
  data,
  xKey,
  bars,
  title,
  caption,
  height = 350,
  layout = "horizontal",
  unit,
  colors,
}: ChartBarProps) {
  return (
    <ChartWrapper title={title} caption={caption} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          {layout === "horizontal" ? (
            <>
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
                stroke="var(--color-border)"
              />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
                stroke="var(--color-border)"
                unit={unit}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
                stroke="var(--color-border)"
                unit={unit}
              />
              <YAxis
                dataKey={xKey}
                type="category"
                tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
                stroke="var(--color-border)"
                width={100}
              />
            </>
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              fontSize: 13,
              color: "var(--color-text)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {bars.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              fill={bar.color}
              name={bar.name}
              stackId={bar.stackId}
              radius={[4, 4, 0, 0]}
            >
              {colors &&
                data.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
