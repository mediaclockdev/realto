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
import backgroundimg from "@/public/homepageheadingbackground2.svg";
import commercial from "@/public/homepagecommercialicon.svg";

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
      <div className="flex w-fit mx-auto items-center gap-2 mb-4">
        <Image src={commercial} alt="" className="shrink-0" />
        <div className="relative inline-flex items-center justify-center gap-2 px-8 py-4">
          <Image
            src={backgroundimg}
            alt="heading background"
            className="absolute inset-0 w-full h-full"
          />

          <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading">
            Commercial Realestate
          </h2>
        </div>
      </div>

      <MarqueeCards items={franchise} speed="fast" />
    </div>
  );
};

export default CommercialRealestateAgencies;
