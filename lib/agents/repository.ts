import type { RecommendedAgent } from "@/lib/agents/types";
import { recommendedAgentsCatalog } from "./mock-data";

export function getRecommendedAgents(limit = 4): RecommendedAgent[] {
  return recommendedAgentsCatalog.slice(0, limit);
}
