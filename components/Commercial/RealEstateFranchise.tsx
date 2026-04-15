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

const RealEstateFranchise = () => {
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
    <div className="max-w-screen-2xl mx-auto px-5 py-5 ">
      <h2 className="font-poppins font-semibold text-2xl lg:text-[32px] text-black mb-1">
        RealEstateFranchise
      </h2>

      <MarqueeCards items={franchise} speed="fast" />
    </div>
  );
};

export default RealEstateFranchise;
