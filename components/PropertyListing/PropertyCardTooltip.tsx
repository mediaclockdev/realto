"use client";

import React, { ReactNode, useState } from "react";
import Image from "next/image";
import locationIcon from "@/public/location.svg";
import moneyIcon from "@/public/money.svg";
import whatsapp from "@/public/whatsapp.svg";
import instagram from "@/public/logos_instagram.svg";
import linkedin from "@/public/logos_linkedin.svg";
import tiktok from "@/public/tiktok.svg";
import wechat from "@/public/wechat.svg";
import snapchat from "@/public/snapchat.svg";
import facebook from "@/public/logos_facebook.svg";
import message from "@/public/mailicon.svg";

type TooltipProps = {
  text: ReactNode;
  children: ReactNode;
};

export const Tooltip = ({ text, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          style={{ background: "rgba(20, 20, 20, 0.75)" }}
          className="pointer-events-none absolute bottom-full z-30 mb-2 whitespace-nowrap rounded-[5px] border border-white/20 px-1.5 py-0.5 text-xs text-white shadow-lg backdrop-blur-md animate-fade-in"
        >
          {text}
        </span>
      )}
    </div>
  );
};

export const FollowCursorTooltip = ({
  text,
  children,
  disabled,
}: TooltipProps & { disabled?: boolean }) => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        setPos({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => setPos(null)}
    >
      {children}
      {pos && !disabled && (
        <div
          className="pointer-events-none fixed z-50 whitespace-nowrap rounded border border-white/20 px-3 py-1.5 text-xs text-white shadow-lg backdrop-blur-md"
          style={{
            top: pos.y - 14,
            left: pos.x + 12,
            background: "rgba(0,0,0,0.25)",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export const PropertySummaryTooltipContent = ({
  location,
  priceRange,
}: {
  location: string;
  priceRange: string;
}) => (
  <div className="flex items-center gap-1">
    <div className="flex items-center">
      <Image src={locationIcon} alt="location icon" />
      <p>{location}</p>
    </div>
    <div className="flex items-center">
      <Image src={moneyIcon} alt="price icon" />
      <p>·{priceRange}</p>
    </div>
  </div>
);

export const ShareMenuActionStrip = ({ iconSize }: { iconSize: number }) => (
  <div className="flex items-center gap-1">
    <button className="cursor-pointer transition-transform hover:scale-110">
      <Image src={whatsapp} alt="whatsapp" width={iconSize} height={iconSize} />
    </button>
    <button className="cursor-pointer transition-transform hover:scale-110">
      <Image
        src={instagram}
        alt="instagram"
        width={iconSize}
        height={iconSize}
      />
    </button>
    <button className="cursor-pointer transition-transform hover:scale-110">
      <Image src={tiktok} alt="tiktok" width={iconSize} height={iconSize} />
    </button>
    <button className="cursor-pointer transition-transform hover:scale-110">
      <Image src={wechat} alt="wechat" width={iconSize} height={iconSize} />
    </button>
    <button className="cursor-pointer transition-transform hover:scale-110">
      <Image src={snapchat} alt="snapchat" width={iconSize} height={iconSize} />
    </button>
    {/* <button className="transition-transform hover:scale-110">
      <Image src={facebook} alt="facebook" width={iconSize} height={iconSize} />
    </button>
    <button className="transition-transform hover:scale-110">
      <Image src={message} alt="message" width={iconSize} height={iconSize} />
    </button> */}
  </div>
);
