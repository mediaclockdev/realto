import AgentCarousel, { Agent } from "@/components/ui/AgentCarousel";
import { agentsCatalog } from "@/lib/agents/mock-data";

const LandRealEstateAgents = () => {
  const agents: Agent[] = agentsCatalog.map((agent) => ({
    id: agent.id,
    name: agent.name,
    phone: agent.phone,
    image: agent.avatar,
    href: `/agents/${agent.slug}`,
  }));

  return (
    <div>
      <AgentCarousel
        variant="Land Real Estate"
        heading="Agents"
        agents={agents}
        headingClassName="text-[32px] font-bold reel-text-heading font-amasis text-[#111827] [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
        containerClassName="px-4 py-2 rounded-full mb-1"
        headingStyle={{
          background:
            "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
        }}
      />
    </div>
  );
};

export default LandRealEstateAgents;
