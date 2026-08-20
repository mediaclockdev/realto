import React from "react";
import Image from "next/image";
import { PropertySlider } from "./PropertySlider";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import newclockicon from "../../public/newclockicon.svg";
import { newlyListedBuyProperties } from "@/lib/properties/buy/sections";
import { newlyListedRentProperties } from "@/lib/properties/rent/sections";
import backgroundimg from "@/public/homepageheadingbackground.svg";

const SectionHeading = ({
  title,
  variant,
}: {
  title: string;
  variant?: "BUY" | "RENT";
}) => (
  <div className="flex justify-center">
    <div className="relative inline-flex items-center justify-center gap-2 px-8 py-4">
      <Image
        src={backgroundimg}
        alt="heading background"
        className="absolute inset-0 w-full h-full"
      />

      <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading">
        {title}
      </h2>
      {variant && (
        <span
          className="relative z-10 font-amasis text-xl font-semibold lg:text-[32px]"
          style={{
            color: "black",
            WebkitTextStroke: "1.5px #FFFFFFF",
          }}
        >
          {variant}
        </span>
      )}
      <Image src={newclockicon} alt="clock" className="relative z-10 h-7 w-7" />
    </div>
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
