import React from "react";
import Image from "next/image";
import { PropertySlider } from "./PropertySlider";

import { newlyListedBuyProperties } from "@/lib/properties/buy/sections";
import backgroundimg from "@/public/homepageheadingbackground.svg";
import sale from "@/public/homepagesaleicon.svg";
import heading from "@/public/homepageheadingicons/sale.svg";

const SectionHeading = ({ title }: { title: string }) => (
  <div className="flex justify-center mb-4">
    <Image src={heading} alt="heading " />
  </div>
);

export default function BuyProperties() {
  return (
    <div className="max-w-screen-2xl mx-auto py-5">
      <div className="px-5 ">
        <SectionHeading title="Property for sale" />
        <PropertySlider
          properties={newlyListedBuyProperties}
          listingVariant="buy"
        />
      </div>
    </div>
  );
}
