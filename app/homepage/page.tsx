import dynamic from "next/dynamic";
import Category from "@/components/Home/Category";
import Hero from "@/components/Home/Hero";
import BrokersandBrokerage from "@/components/Home/BrokersandBrokerage";
import HotelLogos from "@/components/Home/Hotellogos";
import CommercialRealestateAgencies from "@/components/Home/CommercialRealestateAgencies";
import StudentresidencyPartners from "@/components/Home/StudentresidencyPartners";
import Explorenewproperties from "@/components/Commercial/Explorenewproperties";
import LandRealEstateAgents from "@/components/Home/LandRealEstateAgents";
import TopRealEstateAgents from "@/components/Home/TopRealEstateAgents";

const LanguageSelection = dynamic(
  () => import("@/components/Home/LanguageSelection"),
);
const PropertyListing = dynamic(
  () => import("@/components/Home/PropertyListing"),
);
const RealEstateAgents = dynamic(
  () => import("@/components/Home/RealEstateAgents"),
);
const TrendingProperties = dynamic(
  () => import("@/components/Home/TrendingProperties"),
);
const LuxuryProperties = dynamic(
  () => import("@/components/Home/LuxuryProperties"),
);
const LatestLandForSale = dynamic(
  () => import("@/components/Home/LatestLandForSale"),
);
const RoomsAndPrices = dynamic(() => import("@/components/Home/RoomsAndPrices"));
const TopHotelOffers = dynamic(() => import("@/components/Home/TopHotelOffers"));
const Contact = dynamic(() => import("@/components/Home/Contact"));

const page = () => {
  return (
    <div>
      <Hero />
      <Category />
      <LanguageSelection />
      <RealEstateAgents />
      <PropertyListing />
      <TopRealEstateAgents />
      <TrendingProperties />
      <BrokersandBrokerage />
      <LuxuryProperties />
      <HotelLogos />
      <TopHotelOffers />
      <CommercialRealestateAgencies />
      <Explorenewproperties />
      <StudentresidencyPartners />
      <RoomsAndPrices />
      <LandRealEstateAgents />
      <LatestLandForSale />
      <Contact />
    </div>
  );
};

export default page;
