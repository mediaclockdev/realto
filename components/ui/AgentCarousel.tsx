
"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import phone from "../../public/mobileicon.svg"; 

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
};

export default function AgentCarousel({
  heading = "Agents",
  variant,
  agents,
}: AgentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const router = useRouter();

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setScrollLeft(scrollLeft);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + (direction === "left" ? -300 : 300),
      behavior: "smooth",
    });
  };

  return (
    <div className=" max-w-screen-2xl mx-auto px-5 py-6">
      {/* Heading */}
      <div className="flex items-baseline gap-2 mb-6">
        {variant && (
          <h2
            className="font-poppins text-2xl font-semibold lg:text-[32px]"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px #c0c0c0",
            }}
          >
            {variant}
          </h2>
        )}
        <h2 className="font-poppins text-2xl font-semibold text-black lg:text-[32px]">
          {heading}
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative">
        {scrollLeft > 10 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg -ml-4"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => router.push(agent.href)}
            className="shrink-0 flex flex-col items-center gap-2 cursor-pointer group px-3"
            >
              {/* Avatar */}
              <div className="w-[90px] h-[90px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-red-500 transition-all duration-200">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  width={90}
                  height={90}
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

        {!isAtEnd && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg -mr-4"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        )}
      </div>
    </div>
  );
}
