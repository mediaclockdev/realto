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
      className="font-semibold font-amasis text-[32px] px-4 py-2 rounded-full inline-block mb-1"
      style={{
        background:
          "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
        filter: "drop-shadow(2px 2px 3px rgba(0,0,0,0.4))",
      }}
    >
      <span
        className="font-bold"
        style={{
          WebkitTextFillColor: "#ffffff",
          WebkitTextStroke: "1.5px #000000",
          textShadow: "0px 0px 4px rgb(255 255 255 / 100%)",
        }}
      >
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
