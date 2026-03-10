"use client";

import Image from "next/image";

import century from "../../public/century21.svg";
import raywhite from "../../public/raywhite.svg";
import elder from "../../public/elderrealestate.svg";
import ljhooker from "../../public/ljhooker.svg";
import wiseberry from "../../public/wiseberry.svg"
import combined from "../../public/combinedCommercial.svg"

const partners = [century, raywhite, elder,ljhooker,wiseberry,combined];

export default function RealEstateAgents() {
  return (
  
    <div className="relative overflow-hidden max-w-screen-2xl mx-auto px-5 py-5">
      <div>
        <p className="text-black font-semibold text-xl">Real Estate Agents :</p>
      </div>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...partners, ...partners, ...partners].map((logo, i) => (
              <div key={i} className="logo-item flex items-center justify-center">
                <Image
                  src={logo}
                  alt="partner logo"
                  width={120}
                  height={60}
                  className="object-contain opacity-100 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}