"use client";
import raywhite from "../../public/raywhite.svg";
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

export default function RealEstateAgents() {
  return (
    <div className="relative overflow-hidden max-w-screen-2xl mx-auto  py-5 px-5">
      <div>
        <h2
          className=" font-semibold font-poppins text-xl
         text-[#111827]  px-4 py-2 rounded-full inline-block mb-1 [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
          style={{
            WebkitTextFillColor: "white",
            WebkitTextStroke: "1.5px #000000",
            background:
              "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
          }}
        >
          Real Estate Agents :
        </h2>
      </div>
      <MarqueeCards items={partners} speed="fast" />
    </div>
  );
}
