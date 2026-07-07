import React from "react";
import Image from "next/image";
import { PropertySlider } from "./PropertySlider";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import newclockicon from "../../public/newclockicon.svg";
import { newlyListedBuyProperties } from "@/lib/properties/buy/sections";
import { newlyListedRentProperties } from "@/lib/properties/rent/sections";

const SectionHeading = ({
  title,
  variant,
}: {
  title: string;
  variant?: "BUY" | "RENT";
}) => (
  <div
    className="mt-2 flex w-fit items-center gap-2 rounded-full px-4 py-2"
    style={{
      background:
        "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
    }}
  >
    <h2
      className="font-amasis text-2xl font-semibold lg:text-[32px] leading-none m-0"
      style={{
        color: "#FFFFFF",
        WebkitTextStroke: "1.5px #000000",
      }}
    >
      {title}
    </h2>
    {variant && (
      <span
        className="font-amasis text-xl font-semibold lg:text-[32px] leading-none"
        style={{
          color: "black",
          WebkitTextStroke: "1.5px #FFFFFFF",
        }}
      >
        {variant}
      </span>
    )}
    <Image src={newclockicon} alt="clock" className="h-7 w-7" />
  </div>
);

export default function PropertyListing() {
  return (
    <div className="max-w-screen-2xl mx-auto py-5">
      <div className="px-5 ">
        <SectionHeading title="Newly Listed" variant="BUY" />
        <PropertySlider
          properties={newlyListedBuyProperties}
          listingVariant="buy"
        />

        <SectionHeading title="Newly Listed" variant="RENT" />
        <PropertyListingCardSlider
          properties={newlyListedRentProperties}
          listingVariant="rent"
          scrollLabel="newly listed rent properties"
        />
      </div>
    </div>
  );
}
