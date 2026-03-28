"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "./chart-wrapper";

interface AreaConfig {
  key: string;
  color: string;
  name: string;
  fillOpacity?: number;
}

interface ChartAreaProps {
  data: Record<string, unknown>[];
  xKey: string;
  areas: AreaConfig[];
  title?: string;
  caption?: string;
  height?: number;
  unit?: string;
}

export function ChartArea({
  data,
  xKey,
  areas,
  title,
  caption,
  height = 350,
  unit,
}: ChartAreaProps) {
  return (
    <ChartWrapper title={title} caption={caption} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
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
          {areas.map((area) => (
            <Area
              key={area.key}
              type="monotone"
              dataKey={area.key}
              stroke={area.color}
              fill={area.color}
              fillOpacity={area.fillOpacity ?? 0.15}
              strokeWidth={2}
              name={area.name}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
