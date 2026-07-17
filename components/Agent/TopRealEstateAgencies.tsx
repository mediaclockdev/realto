"use client";

import React, { useRef } from "react";
import Image from "next/image";
import agencies1 from "../../public/agenices1.svg";
import agencies2 from "../../public/agenices2.svg";
import agencies3 from "../../public/agenices3.svg";
import agencies4 from "../../public/agenices4.svg";
import agencies5 from "../../public/Agencies5.svg";
import agencies6 from "../../public/Agencies6.svg";
import agencies7 from "../../public/agencies7.svg";
import agencies8 from "../../public/agencies8.svg";
import agenticon1 from "../../public/agenticon.svg";
import agenticon2 from "../../public/agenticon2.svg";
import agenticon3 from "../../public/agenticon3.svg";
import agenticon4 from "../../public/agenticon4.svg";
import bg1 from "../../public/toprealestateagencybg1.svg";
import bg2 from "../../public/toprealestateagencybg2.svg";
import bg3 from "../../public/toprealestateagencybg3.svg";
import bg4 from "../../public/toprealestateagencybg4.svg";

const agencies = [
  { logo: agencies1, dark: false },
  { logo: agencies2, dark: true },
  { logo: agencies3, dark: false },
  { logo: agencies4, dark: true },
  { logo: agencies5, dark: false },
  { logo: agencies6, dark: true },
  { logo: agencies7, dark: false },
  { logo: agencies8, dark: true },
];

const agentIcons = [agenticon1, agenticon2, agenticon3, agenticon4];

const cardBgs = [bg1, bg2, bg3, bg4];

const SCROLL_AMOUNT = 480;

const TopRealEstateAgencies = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      {/* Heading + scroll buttons */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className=" font-semibold font-poppins text-xl
         text-[#111827] px-4 py-2 rounded-md inline-block  [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
          }}
        >
          Top Real Estate Agencies
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {agencies.map((agency, idx) => (
          <div
            key={idx}
            className="shrink-0 flex flex-col rounded-lg overflow-hidden"
            style={{
              width: "300px",
              height: "200px",
              // backgroundColor: agency.dark ? "#2d2d2d" : "#ffffff",
              backgroundImage: `url(${cardBgs[idx % cardBgs.length].src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: agency.dark ? "none" : "1px solid #e5e7eb",
              scrollSnapAlign: "start",
            }}
          >
            {/* Logo — centered, takes remaining space */}
            <div className="flex-1 flex items-center justify-center px-5">
              <Image
                src={agency.logo}
                alt={`Agency ${idx + 1}`}
                width={180}
                height={80}
                className="object-contain  w-auto"
              />
            </div>

            {/* Bottom row — avatars + badge + chevron, all left-aligned */}
            <div className="flex items-center justify-end px-3 pb-3 ">
              {/* Overlapping avatars */}
              {agentIcons.map((icon, i) => (
                <div
                  key={i}
                  className="rounded-full overflow-hidden border-2 border-white shrink-0"
                  style={{
                    width: "45px",
                    height: "45px",
                    marginLeft: i === 0 ? "0" : "-6px",
                    position: "relative",
                    zIndex: agentIcons.length - i,
                  }}
                >
                  <Image
                    src={icon}
                    alt={`Agent ${i + 1}`}
                    width={45}
                    height={45}
                    className="object-cover w-full h-full hover:scale-105"
                  />
                </div>
              ))}

              {/* 9+ badge — overlaps last avatar */}
              <div
                className="rounded-full flex items-center justify-center text-white shrink-0"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#3b82f6",
                  marginLeft: "-6px",
                  position: "relative",
                  zIndex: 10,
                  fontSize: "9px",
                  fontWeight: 600,
                }}
              >
                9+
              </div>

              {/* Chevron — right next to badge */}
              <div
                className="ml-1.5 flex items-center"
                style={{ color: "#3b82f6" }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRealEstateAgencies;
