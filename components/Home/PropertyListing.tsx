import React from "react";
import Image from "next/image";
import { PropertySlider } from "./PropertySlider";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import RealEstateAgents from "./RealEstateAgents";
import newclockicon from "../../public/newclockicon.svg";
import magic from "../../public/magic.svg";
import {
  newlyListedBuyPropertyCards,
  trendingBuyPropertyCards,
} from "@/lib/property-cards/buy";
import {
  newlyListedRentPropertyCards,
  trendingRentPropertyCards,
} from "@/lib/property-cards/rent";

const SectionHeading = ({
  title,
  variant,
  icon,
}: {
  title: string;
  variant?: "BUY" | "RENT";
  icon?: "clock" | "magic";
}) => (
  <div className="mb-2 flex items-center gap-2 px-1 font-poppins">
    <h2 className="text-2xl font-semibold text-black lg:text-[32px]">
      {title}
    </h2>
    {variant && (
      <span className="text-xl font-medium text-[#0D9B34] lg:text-[24px]">
        {variant}
      </span>
    )}
    {icon && (
      <Image
        src={icon === "clock" ? newclockicon : magic}
        alt={icon}
        className="h-7 w-7"
      />
    )}
  </div>
);

export default function PropertyListing() {
  return (
    <div className="max-w-screen-2xl mx-auto py-5">
      <div className="px-5 ">
        <SectionHeading title="Newly Listed" variant="BUY" icon="clock" />
        <PropertySlider
          properties={newlyListedBuyPropertyCards}
          listingVariant="buy"
        />

        <SectionHeading title="Newly Listed" variant="RENT" icon="clock" />
        <PropertyListingCardSlider
          properties={newlyListedRentPropertyCards}
          listingVariant="rent"
          scrollLabel="newly listed rent properties"
        />

        <RealEstateAgents />

        <SectionHeading title="Trending Properties" variant="BUY" icon="magic" />
        <PropertySlider
          properties={trendingBuyPropertyCards}
          listingVariant="buy"
        />

        <SectionHeading
          title="Trending Properties"
          variant="RENT"
          icon="magic"
        />
        <PropertyListingCardSlider
          properties={trendingRentPropertyCards}
          listingVariant="rent"
          scrollLabel="trending rent properties"
        />
      </div>
    </div>
  );
}
