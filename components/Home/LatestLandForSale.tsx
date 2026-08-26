import React from "react";
import PropertyListingCardSlider from "./PropertyListingCardSlider";
import { latestLandProperties } from "@/lib/properties/land/sections";
import Image from "next/image";
import backgroundimg from "@/public/homepageheadingbackground.svg";

const LatestLandForSale = () => {
  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <div className="flex justify-center">
        <div className="relative inline-flex items-center justify-center">
          <Image
            src={backgroundimg}
            alt="heading background"
            className="absolute inset-0 h-full w-full"
          />

          <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading py-4 px-12 lg:px-20">
            Land
          </h2>
        </div>
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
