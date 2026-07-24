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
      className="font-extrabold font-amasis text-[32px] px-4 py-2 rounded-full inline-block mb-1"
      style={{
        background:
          "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
      }}
    >
      <span className="font-extrabold reel-text-heading [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]">
        Trending Properties
      </span>

      <span className="ml-1 font-amasis text-2xl font-medium text-[#1FAF38] lg:text-3xl leading-none">
        {" "}
        {variant}
      </span>
    </h2>
    <Image src={magic} alt="magic" className="h-7 w-7" />
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
