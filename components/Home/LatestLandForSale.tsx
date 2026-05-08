import React from "react";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import { latestLandProperties } from "@/lib/properties/land/sections";

const LatestLandForSale = () => {
  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <div className="mb-2 flex items-center gap-2 px-1 font-poppins">
        <h2 className="text-2xl font-semibold text-black lg:text-[32px]">
          Latest Land For Sale
        </h2>
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
