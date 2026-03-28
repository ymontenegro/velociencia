"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "./chart-wrapper";

interface LineConfig {
  key: string;
  color: string;
  name: string;
  dashed?: boolean;
}

interface ChartLineProps {
  data: Record<string, unknown>[];
  xKey: string;
  lines: LineConfig[];
  title?: string;
  caption?: string;
  height?: number;
  unit?: string;
}

export function ChartLine({
  data,
  xKey,
  lines,
  title,
  caption,
  height = 350,
  unit,
}: ChartLineProps) {
  return (
    <ChartWrapper title={title} caption={caption} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
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
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={2}
              strokeDasharray={line.dashed ? "5 5" : undefined}
              name={line.name}
              dot={{ r: 3, fill: line.color }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
