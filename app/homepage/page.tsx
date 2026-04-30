import dynamic from "next/dynamic";
import Category from "@/components/Home/Category";
import Hero from "@/components/Home/Hero";
import BrokersandBrokerage from "@/components/Home/BrokersandBrokerage";
const LanguageSelection = dynamic(
  () => import("@/components/Home/LanguageSelection"),
);
const PropertyListing = dynamic(
  () => import("@/components/Home/PropertyListing"),
);
const LuxuryProperties = dynamic(
  () => import("@/components/Home/LuxuryProperties"),
);
const LatestLandForSale = dynamic(
  () => import("@/components/Home/LatestLandForSale"),
);
const Contact = dynamic(() => import("@/components/Home/Contact"));

const page = () => {
  return (
    <div>
      <Hero />
      <Category />
      <LanguageSelection />
      <PropertyListing />
      <BrokersandBrokerage />
      <LuxuryProperties />
      <LatestLandForSale />
      <Contact />
    </div>
  );
};

export default page;
