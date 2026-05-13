import React from "react";
import Image from "next/image";
import magic from "../../public/magic.svg";
import { PropertySlider } from "./PropertySlider";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import { trendingBuyProperties } from "@/lib/properties/buy/sections";
import { trendingRentProperties } from "@/lib/properties/rent/sections";

const TrendingHeading = ({ variant }: { variant: "BUY" | "RENT" }) => (
  <div className="mt-1 flex items-center gap-2 px-1">
    <h2
      className="font-amasis text-2xl text-black font-semibold lg:text-[32px] leading-none m-0"
      
    >
      Trending Properties
    </h2>
    <span
      className="font-amasis text-2xl font-medium text-[#1FAF38] lg:text-[32px] leading-none"
     
    >
      {variant}
    </span>
    <Image src={magic} alt="magic" className="h-7 w-7" />
  </div>
);

const TrendingProperties = () => {
  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <TrendingHeading variant="BUY" />
      <PropertySlider
        properties={trendingBuyProperties}
        listingVariant="buy"
      />

      <TrendingHeading variant="RENT" />
      <PropertyListingCardSlider
        properties={trendingRentProperties}
        listingVariant="rent"
        scrollLabel="trending rent properties"
      />
    </section>
  );
};

export default TrendingProperties;
