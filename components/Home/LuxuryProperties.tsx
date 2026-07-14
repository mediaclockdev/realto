"use client";

import React from "react";
import Image from "next/image";
import building from "../../public/headingbuilding.svg";
import { PropertySlider } from "./PropertySlider";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import { luxuryBuyProperties } from "@/lib/properties/buy/sections";
import { luxuryRentProperties } from "@/lib/properties/rent/sections";

const LuxuryHeading = ({ variant }: { variant: "BUY" | "RENT" }) => (
  <div
    className="flex w-fit items-center gap-2 rounded-full px-4 py-2"
    style={{
      background:
        "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
    }}
  >
    <div className="flex items-baseline gap-2">
      <h2
        className="font-amasis text-2xl font-semibold lg:text-[32px]"
        style={{
          background:
            "linear-gradient(180deg, #F5D06A 0%, #B8860B 50%, #8B6914 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: "1px #8B6914",
          filter: "drop-shadow(2px 2px 3px rgba(0,0,0,0.4))",
        }}
      >
        Luxury properties
      </h2>
      <span className="font-amasis text-2xl font-semibold text-[#1FAF38] lg:text-[32px]">
        {variant}
      </span>
    </div>
    <Image src={building} alt="luxury properties" width={48} height={48} />
  </div>
);

const LuxuryProperties = () => {
  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <LuxuryHeading variant="BUY" />
      <PropertySlider properties={luxuryBuyProperties} listingVariant="buy" />

      <LuxuryHeading variant="RENT" />
      <PropertyListingCardSlider
        properties={luxuryRentProperties}
        listingVariant="rent"
        scrollLabel="luxury rent properties"
      />
    </section>
  );
};

export default LuxuryProperties;
