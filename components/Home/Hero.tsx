import Image from "next/image";
import React from "react";
import herobg from "../../public/herobg.webp";
import herobg1 from "../../public/herobg1.webp";
import herobg2 from "../../public/herobg2.webp";
import herobg3 from "../../public/herobg3.webp";
import herobg4 from "../../public/herobg4.webp";
import herobg5 from "../../public/herobg5.webp";
import herobg6 from "../../public/herobg6.webp";
import herobg7 from "../../public/herobg7.webp";
import herobg8 from "../../public/herobg8.webp";
import herobg9 from "../../public/herobg9.webp";
import herobg10 from "../../public/herobg10.webp";
import herobg11 from "../../public/herobg11.webp";
import herobg12 from "../../public/herobg12.webp";
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
        herobg8,
        herobg9,
        herobg10,
        herobg11,
        herobg12,
      ]}
    />
  );
};

export default Hero;
