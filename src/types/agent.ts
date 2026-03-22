import type { SectionId } from "@/lib/constants";

export type AgentType = "journalist" | "editor";

export type AgentPhase = "discover" | "research" | "write" | "review";

export type AgentRunStatus = "running" | "completed" | "failed";

export interface AgentRun {
  id: number;
  agentType: AgentType;
  phase: AgentPhase;
  section: SectionId | null;
  status: AgentRunStatus;
  model: string;
  inputTokens: number | null;
  outputTokens: number | null;
  costUsd: number | null;
  durationMs: number | null;
  errorMessage: string | null;
  metadata: string | null;
  startedAt: Date;
  completedAt: Date | null;
}
