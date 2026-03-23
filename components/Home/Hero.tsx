import Image from "next/image";
import React from "react";
import herobg from "../../public/herobg.svg";
import herobg1 from "../../public/herobg1.svg";
import herobg2 from "../../public/herobg2.svg";
import herobg3 from "../../public/herobg3.svg";
import herobg4 from "../../public/herobg4.svg";
import herobg5 from "../../public/herobg5.svg";
import herobg6 from "../../public/herobg6.svg";
import herobg7 from "../../public/herobg7.svg";
import HeroSection from "../ui/HeroSection";

const Hero = () => {
  return (
    <HeroSection
      images={[
        herobg,
        herobg1,
        herobg2,
        herobg3,
        herobg4,
        herobg5,
        herobg6,
        herobg7,
      ]}
    />
  );
};

export default Hero;
