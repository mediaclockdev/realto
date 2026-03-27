import HeroAgentSection from "@/components/Agent/HeroAgentSection";
import Notsure from "@/components/Agent/Notsure";
import Recommended from "@/components/Agent/Recommended";
import Tipsforselling from "@/components/Agent/Tipsforselling";
import TopRealEstateAgencies from "@/components/Agent/TopRealEstateAgencies";
import { getRecommendedAgents } from "@/lib/agents/repository";

export default async function Page() {
  const recommendedAgents = await getRecommendedAgents();

  return (
    <div>
      <HeroAgentSection />
      <TopRealEstateAgencies />
      <Tipsforselling />
      <Recommended agents={recommendedAgents} />
      <Notsure />
    </div>
  );
}
