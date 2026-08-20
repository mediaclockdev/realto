"use client";
import raywhite from "../../public/raywhite.svg";
import Image from "next/image";
import bengiang from "../../public/bengiang.svg";
import century from "../../public/century21.svg";
import rw from "../../public/r&w.svg";
import sp from "../../public/sppartners.svg";
import mcgrath from "../../public/mcgrath.svg";
import savills from "../../public/savills.svg";
import wiseberry from "../../public/wiseberry.svg";
import prd from "../../public/prd.svg";
import richard from "../../public/richardmethews.svg";
import ljhooker from "../../public/ljhooker.svg";
import firstnational from "../../public/firstnational.svg";
import belle from "../../public/belle.svg";
import ronis from "../../public/ronisrealestate.svg";
import harcourts from "../../public/harcourts.svg";
import quest from "../../public/questrealestate.svg";
import combined from "../../public/combinedCommercial.svg";
import professional from "../../public/professionalsrealestate.svg";
import infinity from "../../public/infinityrealestate.svg";
import aria from "../../public/aria.svg";
import bobb from "../../public/bobbestate.svg";
import pace from "../../public/pace.svg";
import rainehorne from "../../public/rainehorne.svg";
import elder from "../../public/elderrealestate.svg";
import MarqueeCards from "../ui/MarqueeCards";
import backgroundimg from "@/public/homepageheadingbackground1.svg";

const partners = [
  raywhite,
  bengiang,
  century,
  rw,
  sp,
  mcgrath,
  savills,
  wiseberry,
  prd,
  richard,
  ljhooker,
  firstnational,
  belle,
  ronis,
  harcourts,
  quest,
  combined,
  professional,
  infinity,
  aria,
  bobb,
  pace,
  rainehorne,
  elder,
];

export default function RealEstateAgents({
  enhancedHeading = false,
}: {
  enhancedHeading?: boolean;
}) {
  return (
    <div className="relative overflow-hidden max-w-screen-2xl mx-auto  py-5 px-5">
      <div className="flex justify-center mb-4">
        <div className="relative inline-flex items-center justify-center">
          <Image
            src={backgroundimg}
            alt="background image"
            className="absolute inset-0 w-full h-full"
          />

          <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading px-6 py-4">
            Real Estate Agencies :
          </h2>
        </div>
      </div>
      <MarqueeCards items={partners} speed="fast" />
    </div>
  );
}
