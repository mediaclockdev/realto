"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

type MarqueeItem = {
  src: string | StaticImageData;
  name?: string;
  interest?: string;
};

type MarqueeCardsProps = {
  items: MarqueeItem[];
  speed?: "slow" | "normal" | "fast";
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
};

const MarqueeCards: React.FC<MarqueeCardsProps> = ({
  items,
  speed = "fast",
  imageWidth = 130,
  imageHeight = 70,
  className = "",
}) => {
  return (
    <div className={`marquee-wrapper overflow-hidden ${className}`}>
      <div 
        className={`marquee-track ${speed}`}
        style={{ animationDuration: `${items.length * 3}s` }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="logo-item flex flex-col items-center justify-center mx-4"
          >
            <Image
              src={item.src}
              alt="marquee item"
              width={imageWidth}
              height={imageHeight}
              className="object-contain"
            />

            {/* ✅ Conditional rendering */}
            {(item.name || item.interest) && (
              <p className="text-sm text-black font-poppins font-normal whitespace-nowrap text-center mt-1">
                {item.name && item.name}
                {item.interest && (
                  <span className="font-bold ml-1">{item.interest}</span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeCards;
