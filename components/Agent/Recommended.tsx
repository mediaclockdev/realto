import Link from "next/link";
import type { AgentSummary } from "@/lib/agents/types";
import AgentSummaryCard from "./AgentSummaryCard";

interface RecommendedProps {
  agents: AgentSummary[];
}

export default function Recommended({ agents }: RecommendedProps) {
  if (!agents.length) {
    return null;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-black font-poppins text-xl font-semibold sm:text-2xl">
          Recommended
        </h2>
        <Link
          href="/agents"
          className="text-base font-medium text-[#0b8fe5] underline-offset-2 hover:underline sm:text-lg"
        >
          View all
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:gap-6">
        {agents.map((agent) => (
          <AgentSummaryCard
            key={agent.id}
            agent={agent}
            className="min-w-[300px] shrink-0 sm:min-w-[380px] lg:min-w-[460px]"
          />
        ))}
      </div>
    </div>
  );
}
