import type { SectionId } from "@/lib/constants";
import { NUTRICION_SECTION_PROMPT } from "./section-nutricion";
import { CIENCIA_SECTION_PROMPT } from "./section-ciencia";
import { ENTRENAMIENTO_SECTION_PROMPT } from "./section-entrenamiento";
import { COMPETENCIA_SECTION_PROMPT } from "./section-competencia";

export { JOURNALIST_SYSTEM_PROMPT, JOURNALIST_DISCOVER_PROMPT, JOURNALIST_WRITE_PROMPT } from "./journalist-system";
export { EDITOR_SYSTEM_PROMPT } from "./editor-system";
export { NUTRICION_SECTION_PROMPT } from "./section-nutricion";
export { CIENCIA_SECTION_PROMPT } from "./section-ciencia";
export { ENTRENAMIENTO_SECTION_PROMPT } from "./section-entrenamiento";
export { COMPETENCIA_SECTION_PROMPT } from "./section-competencia";

const SECTION_PROMPTS: Record<SectionId, string> = {
  nutricion: NUTRICION_SECTION_PROMPT,
  ciencia: CIENCIA_SECTION_PROMPT,
  entrenamiento: ENTRENAMIENTO_SECTION_PROMPT,
  competencia: COMPETENCIA_SECTION_PROMPT,
};

export function getSectionPrompt(section: SectionId): string {
  return SECTION_PROMPTS[section];
}
