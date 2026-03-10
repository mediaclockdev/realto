import Image from "next/image";
import React from "react";
import herobg from "../../public/herobg.jpg";
import HeroSection from "../ui/HeroSection";

const Hero = () => {
  return (
   <HeroSection
      image={herobg}
    />
  );
};

export default Hero;
