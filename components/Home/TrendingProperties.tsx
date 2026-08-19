import React from "react";
import Image from "next/image";
import magic from "../../public/magic.svg";
import { PropertySlider } from "./PropertySlider";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import { trendingBuyProperties } from "@/lib/properties/buy/sections";
import { trendingRentProperties } from "@/lib/properties/rent/sections";
import backgroundimg from "@/public/homepageheadingbackground1.svg";

const TrendingHeading = ({ variant }: { variant: "BUY" | "RENT" }) => (
  <div className="mt-3 flex justify-center">
    <div className="relative inline-flex items-center justify-center gap-2 pl-10 pr-6 py-4">
      <Image
        src={backgroundimg}
        alt="heading background"
        className="absolute inset-0 w-full h-full"
      />

      <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading">
        Trending Properties
        <span className="ml-1 font-amasis text-base font-medium text-[#1FAF38] lg:text-[32px] leading-none">
          {" "}
          {variant}
        </span>
      </h2>
      <Image src={magic} alt="magic" className="relative z-10 h-7 w-7" />
    </div>
  </div>
);

const TrendingProperties = () => {
  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <TrendingHeading variant="BUY" />
      <PropertySlider properties={trendingBuyProperties} listingVariant="buy" />

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
