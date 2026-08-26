"use client";

import React from "react";
import Image from "next/image";
import building from "../../public/luxuryheadingicon.svg";
import { PropertySlider } from "./PropertySlider";
import { luxuryBuyProperties } from "@/lib/properties/buy/sections";
import backgroundimg from "@/public/homepageheadingbackground1.svg";

const LuxuryHeading = ({ variant }: { variant: "BUY" | "RENT" }) => (
  <div className="flex w-fit mx-auto items-center  gap-2">
    {/* Text + Background */}
    <Image
      src={building}
      alt="luxury properties"
      width={100}
      height={100}
      className="shrink-0 "
    />
    <div className="relative inline-flex items-center justify-center pr-4 pl-8 py-4 ">
      <Image
        src={backgroundimg}
        alt="heading background"
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative z-10 flex items-baseline gap-2">
        <h2
          className="font-amasis font-semibold text-base lg:text-[32px]"
          style={{
            background:
              "linear-gradient(180deg, #F5D06A 0%, #B8860B 50%, #8B6914 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "1px #8B6914",
            filter: "drop-shadow(2px 2px 3px rgba(0,0,0,0.4))",
          }}
        >
          Luxury properties
        </h2>
      </div>
    </div>

    {/* Building Image */}
  </div>
);

const LuxuryProperties = () => {
  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <LuxuryHeading variant="BUY" />
      <PropertySlider properties={luxuryBuyProperties} listingVariant="buy" />
    </section>
  );
};

export default LuxuryProperties;
