import React from "react";
import Category from "@/components/Home/Category";
import Contact from "@/components/Home/Contact";
import Hero from "@/components/Home/Hero";
import LanguageSelection from "@/components/Home/LanguageSelection";
import LuxuryProperties from "@/components/Home/LuxuryProperties";
import PropertyListing from "@/components/Home/PropertyListing";
import RealEstateAgents from "@/components/Home/RealEstateAgents";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <Hero/>
      <Category />
      <LanguageSelection />
      <RealEstateAgents />
      <PropertyListing />
      <LuxuryProperties />
      <Contact />
    </div>
  );
};

export default page;
