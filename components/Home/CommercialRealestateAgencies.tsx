import React from "react";
import MarqueeCards from "../ui/MarqueeCards";
import commercialRealEstate from "../../public/commercialRealEstate.svg";
import knightfrank from "../../public/knightFrank.svg";
import x from "../../public/xcommercial.svg";
import goodman from "../../public/goodman.svg";
import cbre from "../../public/cbre.svg";
import jll from "../../public/jLL.svg";
import colliers from "../../public/colliers.svg";
import raywhite from "../../public/raywhitecommercial.svg";
import cushman from "../../public/cushman&wakefield.svg";
import belle from "../../public/belle.svg";
import Image from "next/image";

import heading from "@/public/homepageheadingicons/commercialrealestate.svg";

const CommercialRealestateAgencies = () => {
  const franchise = [
    commercialRealEstate,
    knightfrank,
    x,
    goodman,
    cbre,
    jll,
    colliers,
    raywhite,
    cushman,
    belle,
  ];
  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="flex justify-center mb-4">
        <Image src={heading} alt="heading " className="" />
      </div>

      <MarqueeCards items={franchise} speed="fast" />
    </div>
  );
};

export default CommercialRealestateAgencies;
