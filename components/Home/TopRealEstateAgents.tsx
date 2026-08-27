import AgentCarousel, { Agent } from "@/components/ui/AgentCarousel";
import { agentsCatalog } from "@/lib/agents/mock-data";
import heading from "@/public/homepageheadingicons/realestateagent.svg";

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
      <AgentCarousel headingImage={heading} agents={agents} />
    </div>
  );
};

export default TopRealEstateAgents;
