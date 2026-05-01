import AgentCarousel, { Agent } from "@/components/ui/AgentCarousel";
import { agentsCatalog } from "@/lib/agents/mock-data";

const TopRealEstateAgents = () => {
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
        variant="TOP REAL ESTATE "
        heading="Agents"
        agents={agents}
      />
    </div>
  );
};

export default TopRealEstateAgents;
