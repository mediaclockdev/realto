"use client";

import Image from "next/image";
import React, { useState } from "react";
import downarrow from "../../public/downarrow.svg";
import tonylau from "../../public/tonylau.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { AgentSummary } from "@/lib/agents/types";
// glass background
import glassBackground from "@/public/glasseffectagent.svg";
// agency logo icon
import anzLogo from "@/public/anzbank1.svg";
// portrait photo
import portrait from "@/public/recommendagent1.jpg";
// language flag icons
import frenchFlag from "@/public/Franceflag1.svg";
import chinaFlag from "@/public/chinaflag1.svg";
import spainFlag from "@/public/spain1.svg";
// contact icons (phone / mail / location)
import phoneIcon from "@/public/mobileicon.svg";
import mailIcon from "@/public/agentemail.svg";
import locationIcon from "@/public/agentlocation.svg";
// social icons
import instagram from "@/public/logos_instagram.svg";
import linkedin from "@/public/logos_linkedin.svg";
import facebook from "@/public/logos_facebook.svg";
import snapchat from "@/public/snapchat.svg";
import wechat from "@/public/wechat.svg";
import xLogo from "@/public/xiconhotel.svg";
import youtube from "@/public/logos_youtube-icon.svg";
// rating star icon
import star from "@/public/star.svg";
// share (refresh-style) icon
import shareGold from "@/public/shareiconagent.svg";
// like (heart) icon
import heart from "@/public/likeiconagent.svg";

const brokers = [
  {
    name: "Tony Lau",
    role: "Mortgage Broker",
    location: "Based in Sydney",
    img: tonylau,
  },
  {
    name: "Tony Lau",
    role: "Mortgage Broker",
    location: "Based in Sydney",
    img: tonylau,
  },
  {
    name: "Tony Lau",
    role: "Mortgage Broker",
    location: "Based in Sydney",
    img: tonylau,
  },
];
// loan broker cards data — swap portraits/details per broker when real data is ready
const loanBrokers = [
  {
    name: "John Citizen",
    phone: "+9999999999",
    email: "john@commonwealth",
    address: "500 Alex st, Sydney",
    img: portrait,
  },
  {
    name: "Sarah Mitchell",
    phone: "+9999999998",
    email: "sarah@commonwealth",
    address: "12 George st, Sydney",
    img: portrait,
  },
  {
    name: "David Chen",
    phone: "+9999999997",
    email: "david@commonwealth",
    address: "88 Pitt st, Sydney",
    img: portrait,
  },
  {
    name: "Emma Wilson",
    phone: "+9999999996",
    email: "emma@commonwealth",
    address: "45 Park st, Sydney",
    img: portrait,
  },
];

const socials = [
  { src: instagram, alt: "Instagram" },
  { src: linkedin, alt: "LinkedIn" },
  { src: facebook, alt: "Facebook" },
  { src: snapchat, alt: "Snapchat" },
  { src: wechat, alt: "WeChat" },
];

const loans = [
  {
    title: "Owner-occupier loans",
    desc: "Looking to buy or refinance your primary residence? We'll find competitive rates and flexible options to help you get the most from your home loan.",
    rate: "5.39% p.a.",
    comp: "5.41% p.a.",
  },
  {
    title: "Investment loans",
    desc: "If you're seeking to grow your portfolio, review our tailored rates and options designed to maximise your investment potential.",
    rate: "5.54% p.a.",
    comp: "5.50% p.a.",
  },
  {
    title: "Fixed-rate loans",
    desc: "Want predictable mortgage repayments? Lock in a good rate for a set period to avoid interest rate fluctuations.",
    rate: "5.39% p.a.",
    comp: "5.56% p.a.",
  },
];
// export default function AgentSummaryCard({
//   agent,
//   className = "",
// }: {
//   agent?: AgentSummary;
//   className?: string;
//   }) {

const BrokerInYourArea = () => {
  //   const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev === 0 ? brokers.length - 1 : prev - 1));
  };

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev === brokers.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10 space-y-10">
      {/* TOP SECTION */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold capitalize text-black font-poppins">
          brokers in your area
        </h2>

        {/* Dropdown */}
        <div className="flex items-center gap-2 border border-[#E2E8F0] w-fit px-3 py-2 cursor-pointer rounded-lg bg-white hover:bg-gray-50">
          <p className="text-[#9D9D9E] font-poppins font-normal text-base">
            Brokers around you
          </p>
          <Image src={downarrow} alt="downarrow" width={16} height={16} />
        </div>
        <div className="flex items-start gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none lg:gap-6">
          {loanBrokers.map((broker) => (
            <div
              key={broker.name}
              className="w-[85vw] min-w-[85vw] shrink-0 snap-start sm:w-[320px] sm:min-w-[320px] lg:min-w-[340px] lg:w-[340px]"
            >
              <div className="relative block shrink-0 overflow-hidden rounded-[28px] p-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                {/* glass background — portrait svg matches the card shape */}
                <Image
                  src={glassBackground}
                  alt="glassbackground"
                  fill
                  className="object-cover"
                />

                <div className="relative flex h-full flex-col overflow-hidden rounded-[20px]">
                  {/* Portrait */}
                  <div className="relative h-[240px] lg:h-[210px] w-full">
                    <Image
                      src={broker.img}
                      alt={broker.name}
                      fill
                      className="object-cover object-top"
                    />
                    {/* ANZ agency badge */}
                    <div className="absolute left-4 top-3">
                      <Image src={anzLogo} alt="ANZ" width={70} height={28} />
                    </div>
                  </div>

                  {/* Details */}
                  {/* details sit directly on the glass background */}
                  <div className="flex flex-1 flex-col justify-between gap-1 px-5 py-3 lg:px-3 lg:py-3">
                    {/* Name + language flags */}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-poppins text-lg lg:text-2xl font-bold text-[#123C63] whitespace-nowrap">
                        {broker.name}
                      </h3>
                      {/* French flag */}
                      <div className="flex items-center gap-1.5">
                        <Image
                          src={frenchFlag}
                          alt="French"
                          width={35}
                          height={25}
                        />
                        {/* Chinese flag */}
                        <Image
                          src={chinaFlag}
                          alt="Chinese"
                          width={35}
                          height={25}
                        />
                        {/* Spanish flag */}
                        <Image
                          src={spainFlag}
                          alt="Spanish"
                          width={35}
                          height={25}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 lg:space-y-2 text-xs lg:text-base font-semibold text-[#123C63]">
                      <div className="flex items-center gap-3">
                        {/* phone icon */}
                        <Image
                          src={phoneIcon}
                          alt="Phone"
                          width={18}
                          height={18}
                        />
                        <span>{broker.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* mail icon */}
                        <Image
                          src={mailIcon}
                          alt="Email"
                          width={30}
                          height={20}
                        />
                        <span>{broker.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* location icon */}
                        <Image
                          src={locationIcon}
                          alt="Location"
                          width={26}
                          height={26}
                        />
                        <span>{broker.address}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mt-2">
                      {/* Social icons row */}
                      <div className="flex items-center gap-1.5 lg:gap-2">
                        {socials.map((social) => (
                          <Image
                            key={social.alt}
                            src={social.src}
                            alt={social.alt}
                            width={30}
                            height={30}
                            className="h-6 w-6 lg:h-8 lg:w-8"
                          />
                        ))}
                      </div>

                      {/* Stars + share + like */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1">
                          {/* gold rating stars */}

                          <Image
                            src={star}
                            alt="Star"
                            width={26}
                            height={26}
                            className="h-6 w-6 lg:h-8 lg:w-28"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          {/* share/refresh icon */}
                          <Image
                            src={shareGold}
                            alt="Share"
                            width={26}
                            height={26}
                            className="h-5 w-5 lg:h-7 lg:w-7"
                          />
                          {/* heart/like icon */}
                          <Image
                            src={heart}
                            alt="Like"
                            width={26}
                            height={26}
                            className="h-5 w-5 lg:h-7 lg:w-7"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrokerInYourArea;
