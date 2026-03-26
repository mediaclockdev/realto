import HeroAgentSection from "@/components/Agent/HeroAgentSection";
import Notsure from "@/components/Agent/Notsure";
import Recommended from "@/components/Agent/Recommended ";
import Tipsforselling from "@/components/Agent/Tipsforselling";
import TopRealEstateAgencies from "@/components/Agent/TopRealEstateAgencies";
import { getRecommendedAgents } from "@/lib/agents/repository";
import React from "react";

const page = () => {
  const recommendedAgents = getRecommendedAgents();

  return (
    <div>
      <HeroAgentSection />
      <TopRealEstateAgencies />
      <Tipsforselling />
      <Recommended agents={recommendedAgents} />
      <Notsure />
    </div>
  );
};

export default page;
