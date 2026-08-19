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
        headingClassName="text-base lg:text-[32px] font-extrabold reel-text-heading font-amasis text-[#000000] [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
      />
    </div>
  );
};

export default LandRealEstateAgents;
