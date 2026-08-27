import React from "react";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import { latestLandProperties } from "@/lib/properties/land/sections";
import Image from "next/image";
import backgroundimg from "@/public/homepageheadingbackground.svg";
import heading from "@/public/homepageheadingicons/land.svg";

const LatestLandForSale = () => {
  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <div className="flex justify-center mb-4">
        <Image src={heading} alt="" />
      </div>

      <PropertyListingCardSlider
        properties={latestLandProperties}
        listingVariant="land"
        scrollLabel="latest land for sale"
      />
    </section>
  );
};

export default LatestLandForSale;
