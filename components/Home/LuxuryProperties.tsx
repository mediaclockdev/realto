"use client";

import React from "react";
import Image from "next/image";
import building from "../../public/luxuryheadingicon.svg";
import { PropertySlider } from "./PropertySlider";
import { luxuryBuyProperties } from "@/lib/properties/buy/sections";
import backgroundimg from "@/public/homepageheadingbackground1.svg";
import heading from "@/public/homepageheadingicons/luxuryproperties.svg";

const LuxuryHeading = ({ variant }: { variant: "BUY" | "RENT" }) => (
  <div className="flex justify-center">
    <Image src={heading} alt="heading" />
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
