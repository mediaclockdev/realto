"use client";

import century from "../../public/century21.svg";
import raywhite from "../../public/raywhite.svg";
import elder from "../../public/elderrealestate.svg";
import ljhooker from "../../public/ljhooker.svg";
import wiseberry from "../../public/wiseberry.svg";
import combined from "../../public/combinedCommercial.svg";
import MarqueeCards from "../ui/MarqueeCards";

const partners = [century, raywhite, elder, ljhooker, wiseberry, combined];

export default function RealEstateAgents() {
  return (
    <div className="relative overflow-hidden max-w-screen-2xl mx-auto  py-5">
      <div>
        <p className="text-[#343434] font-semibold text-xl  font-poppins">
          Real Estate Agents :
        </p>
      </div>
      <MarqueeCards items={partners} speed="fast" />;
    </div>
  );
}
