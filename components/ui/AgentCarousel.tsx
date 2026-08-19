"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import phone from "../../public/mobileicon.svg";
import backgroundimg from "@/public/homepageheadingbackground1.svg";

export type Agent = {
  id: string | number;
  name: string;
  phone: string;
  image: StaticImageData | string;
  href: string;
};

type AgentCarouselProps = {
  heading?: string;
  variant?: string;
  agents: Agent[];
  headingClassName?: string;
  speed?: "slow" | "normal" | "fast";
};

export default function AgentCarousel({
  heading = "Agents",
  variant,
  agents,
  headingClassName = "",
  speed = "fast",
}: AgentCarouselProps) {
  const router = useRouter();

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      {/* Heading */}
      <div className="flex justify-center mb-4">
        <div
          className="inline-flex items-baseline gap-2 px-8 py-4"
          style={{
            backgroundImage: `url(${backgroundimg.src})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {variant && (
            <h2 className="font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading">
              {variant}
            </h2>
          )}

          <h2 className="font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading">
            {heading}
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper overflow-hidden py-2">
        <div
          className={`marquee-track ${speed}`}
          style={{ animationDuration: `${agents.length * 3}s` }}
        >
          {[...agents, ...agents, ...agents].map((agent, i) => (
            <div
              key={i}
              className="shrink-0 flex flex-col items-center gap-2 cursor-pointer group px-3 mx-4"
            >
              {/* Avatar */}
              <div className="w-[90px] h-[90px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-red-500 transition-all duration-200">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  width={90}
                  height={90}
                  unoptimized
                  className="object-cover w-full h-full object-top"
                />
              </div>

              {/* Name */}
              <p className="text-[#FA2F2F] font-semibold text-xl font-poppins text-center leading-tight w-full whitespace-nowrap">
                {agent.name}
              </p>

              {/* Phone */}
              <div className="flex items-center gap-1">
                <Image src={phone} alt="phone" width={14} height={14} />
                <p className="text-gray-700 text-xs font-poppins whitespace-nowrap">
                  {agent.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
