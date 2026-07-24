import React from "react";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import { latestLandProperties } from "@/lib/properties/land/sections";

const LatestLandForSale = () => {
  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <div className="mb-2 flex items-center gap-2 px-1 ">
        <h2
          className="font-extrabold font-amasis text-[32px] reel-text-heading px-4 py-2 rounded-full inline-block mb-1 [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
          }}
        >
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
