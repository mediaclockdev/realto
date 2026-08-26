import React from "react";
import Image from "next/image";
import PropertyListingCardSlider from "./PropertyListingCardSlider";

import { newlyListedRentProperties } from "@/lib/properties/rent/sections";
import backgroundimg from "@/public/homepageheadingbackground.svg";
import rent from "@/public/homepagerenticon.svg";

const SectionHeading = ({ title }: { title: string }) => (
  <div className="flex justify-center">
    <div className="relative w-fit">
      <div className="relative inline-flex items-center justify-center gap-2 px-8 py-4">
        <Image
          src={backgroundimg}
          alt="heading background"
          className="absolute inset-0 w-full h-full"
        />

        <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading">
          {title}
        </h2>
      </div>

      <Image
        src={rent}
        alt=""
        className="absolute right-full top-1/2 mr-2 -translate-y-1/2"
      />
    </div>
  </div>
);

export default function RentProperties() {
  return (
    <div className="max-w-screen-2xl mx-auto py-5">
      <div className="px-5 ">
        <SectionHeading title="Property for Rent" />
        <PropertyListingCardSlider
          properties={newlyListedRentProperties}
          listingVariant="rent"
          scrollLabel="rent properties"
        />
      </div>
    </div>
  );
}
