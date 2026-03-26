import dynamic from "next/dynamic";
import Category from "@/components/Home/Category";
import Hero from "@/components/Home/Hero";
const LanguageSelection = dynamic(
  () => import("@/components/Home/LanguageSelection"),
);
const PropertyListing = dynamic(() => import("@/components/Home/PropertyListing"));
const LuxuryProperties = dynamic(
  () => import("@/components/Home/LuxuryProperties"),
);
const Contact = dynamic(() => import("@/components/Home/Contact"));

const page = () => {
  return (
    <div>
      <Hero />
      <Category />
      <LanguageSelection />
      <PropertyListing />
      <LuxuryProperties />
      <Contact />
    </div>
  );
};

export default page;
