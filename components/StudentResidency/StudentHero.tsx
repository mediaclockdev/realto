import React from "react";
import Image from "next/image";
import herobg from "../../public/studentherobg.jpg";
import HeroSection from "../ui/HeroSection";

const StudentHero = () => {
  return (
    <HeroSection
      image={herobg}
    />
  );
};

export default StudentHero;
