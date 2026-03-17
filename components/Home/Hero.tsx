import Image from "next/image";
import React from "react";
import herobg from "../../public/herobg.svg";
import herobg1 from "../../public/herobg1.svg";
import herobg2 from "../../public/herobg2.svg";
import herobg3 from "../../public/herobg3.svg";
import HeroSection from "../ui/HeroSection";

const Hero = () => {
  return (
   <HeroSection
      images={[herobg, herobg1, herobg2, herobg3]}
    />
  );
};

export default Hero;
