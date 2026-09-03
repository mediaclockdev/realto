import React from "react";
import Image from "next/image";
import PropertyListingCardSlider from "./PropertyListingCardSlider";

import { newlyListedRentProperties } from "@/lib/properties/rent/sections";
import heading from "@/public/homepageheadingicons/rent.svg";

const SectionHeading = ({ title }: { title: string }) => (
  <div className="flex justify-center mb-4">
    <Image src={heading} alt="heading" />
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
