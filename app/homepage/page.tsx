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
import LastMinuteHotels from "@/components/Hotel/LastMinuteHotelsNearYou";
import Tipsforselling from "@/components/Agent/Tipsforselling";

const LanguageSelection = dynamic(
  () => import("@/components/Home/LanguageSelection"),
);
const BuyProperties = dynamic(() => import("@/components/Home/BuyProperties"));
const RentProperties = dynamic(
  () => import("@/components/Home/RentProperties"),
);
const RealEstateAgents = dynamic(
  () => import("@/components/Home/RealEstateAgents"),
);
const LuxuryProperties = dynamic(
  () => import("@/components/Home/LuxuryProperties"),
);
const LatestLandForSale = dynamic(
  () => import("@/components/Home/LatestLandForSale"),
);
const RoomsAndPrices = dynamic(
  () => import("@/components/Home/RoomsAndPrices"),
);
const FlatmateCards = dynamic(() => import("@/components/Home/FlatmateCards"));
const TopHotelOffers = dynamic(
  () => import("@/components/Home/TopHotelOffers"),
);
const Contact = dynamic(() => import("@/components/Home/Contact"));

const page = () => {
  return (
    <div className="home-centered-headings">
      <Hero />
      <Category />
      <div className="keep-heading-inline mb-2">
        <LanguageSelection />
      </div>
      <div className="mb-2">
        <RealEstateAgents enhancedHeading />
        <BuyProperties />
        <LuxuryProperties />
        <TopRealEstateAgents />
        <RentProperties />
      </div>
      <div className="mb-2">
        <BrokersandBrokerage />
      </div>
      <HotelLogos headingColor="text-black" pillHeading />
      <LastMinuteHotels pillHeading />
      <StudentresidencyPartners />
      <RoomsAndPrices />
      <div className="mb-2">
        <FlatmateCards />
      </div>
      {/* <TopHotelOffers /> */}
      <CommercialRealestateAgencies />
      <Explorenewproperties pillHeading />
      <div className="mb-2">
        <LatestLandForSale />
      </div>
      {/* <LandRealEstateAgents /> */}
      <Tipsforselling />
      {/* heading change */}
      <Contact />
    </div>
  );
};

export default page;
