"use client";

import React from "react";
import Image from "next/image";
import building from "../../public/luxurybuildingicon.svg";
import { PropertySlider } from "./PropertySlider";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import { luxuryBuyPropertyCards } from "@/lib/property-cards/buy";
import { luxuryRentPropertyCards } from "@/lib/property-cards/rent";

const LuxuryHeading = ({ variant }: { variant: "BUY" | "RENT" }) => (
  <div className="mb-3 flex items-center gap-2 px-1">
    <h2 className="font-poppins text-xl font-semibold text-[#d4a61f] lg:text-[28px]">
      Luxury properties
    </h2>
    <span className="font-poppins text-xl font-medium text-[#0D9B34] lg:text-[24px]">
      {variant}
    </span>
    <Image src={building} alt="luxury properties" width={48} height={48} />
  </div>
);

const LuxuryProperties = () => {
  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <LuxuryHeading variant="BUY" />
      <PropertySlider
        properties={luxuryBuyPropertyCards}
        listingVariant="buy"
      />

      <LuxuryHeading variant="RENT" />
      <PropertyListingCardSlider
        properties={luxuryRentPropertyCards}
        listingVariant="rent"
        scrollLabel="luxury rent properties"
      />
    </section>
  );
};

export default LuxuryProperties;
