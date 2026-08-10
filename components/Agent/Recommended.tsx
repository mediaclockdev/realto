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
        <h2
          className=" font-semibold font-poppins text-xl
         text-[#111827] px-4 py-2 rounded-md inline-block  [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
          }}
        >
          Recommended
        </h2>
        <Link
          href="/agents"
          className="text-base font-medium text-[#0b8fe5] underline-offset-2 hover:underline sm:text-lg"
        >
          View all
        </Link>
      </div>

      <div className="flex items-start gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none lg:gap-6">
        {/* <PremiumAgentCard className="w-[280px] min-w-[280px] snap-start lg:w-[340px] lg:min-w-[340px]" /> */}
        {agents.map((agent) => (
          <AgentSummaryCard
            key={agent.id}
            agent={agent}
            className="w-[95vw] min-w-[95vw] shrink-0 snap-start sm:w-[200px] sm:min-w-[200px] lg:min-w-[300px] lg:w-[300px]"
          />
        ))}
      </div>
    </div>
  );
}
