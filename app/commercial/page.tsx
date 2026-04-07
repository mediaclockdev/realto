import HeroCommercial from "@/components/Commercial/HeroCommercial";
import React from "react";
import Explorebypropertytype from "@/components/Commercial/Explorebypropertytype";
import RealEstateFranchise from "@/components/Commercial/RealEstateFranchise";
import PremiumFeaturedListing from "@/components/Commercial/PremiumFeaturedListing";
import Explorenewproperties from "@/components/Commercial/Explorenewproperties";
import BuildBoldInvestSmart from "@/components/Commercial/BuildBoldInvestSmart";
import Latestcommercialpropertynews from "@/components/Commercial/Latestcommercialpropertynews";

const page = () => {
  return (
    <div>
      <HeroCommercial />
      <Explorebypropertytype />
      <RealEstateFranchise />
      <PremiumFeaturedListing />
      <Explorenewproperties />
      <BuildBoldInvestSmart />
      <Latestcommercialpropertynews />
    </div>
  );
};

export default page;
