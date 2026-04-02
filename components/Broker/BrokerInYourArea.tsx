"use client";

import Image from "next/image";
import React, { useState } from "react";
import downarrow from "../../public/downarrow.svg";
import tonylau from "../../public/tonylau.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

        {/* Broker Cards Carousel */}
        <div className="relative flex items-center">
          {/* LEFT */}
          <button
            onClick={handlePrevCarousel}
            className="absolute -left-6 z-10 w-10 h-10 rounded-full bg-white text-black shadow-md flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>

          {/* CARDS */}
          <div className="overflow-hidden w-full">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{
                transform: `translateX(-${carouselIndex * 320}px)`,
              }}
            >
              {brokers.map((broker, index) => (
                <div
                  key={index}
                  className="min-w-[320px] flex items-center gap-4 border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
                >
                  <Image
                    src={broker.img}
                    alt="broker"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-black font-poppins">
                    <h3 className="font-bold text-xl">{broker.name}</h3>
                    <p className="text-xl font-light">{broker.role}</p>
                    <p className="text-xl font-light">{broker.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <button
            onClick={handleNextCarousel}
            className="absolute -right-6 z-10 w-10 h-10 rounded-full bg-white text-black shadow-md flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start ">
        {/* LEFT TEXT */}
        <div className="space-y-4 pt-2">
          <h2 className="text-2xl font-bold leading-snug text-black font-poppins">
            Choose from a huge range of home loans
          </h2>
          <p className="text-black font-poppins font-normal text-base leading-relaxed ">
            Whether you&apos;re a first-time homebuyer, an investor, or looking
            for the stability of a fixed rate, we&apos;ll help you find a loan
            that fits you best.
          </p>
        </div>

        {/* LOAN CARDS */}
        {loans.map((loan, index) => (
          <div
            key={index}
            className="border border-[#E2E8F0] rounded-xl p-6 shadow-sm bg-[#FAFBFC] flex flex-col h-full"
          >
            {/* TOP CONTENT */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg font-poppins text-black">
                {loan.title}
              </h3>

              {/* NORMALIZED DESCRIPTION */}
              <p className="text-black text-sm font-poppins font-normal min-h-24 max-w-75.75">
                {loan.desc}
              </p>

              {/* BUTTON (fixed spacing) */}
              <div className="min-h-9">
                <button className="text-black font-poppins font-normal text-sm border border-[#E2E8F0] px-6 py-1 rounded-[5px]">
                  View loans and compare
                </button>
              </div>

              {/* RATES (fixed space) */}
              <div className="space-y-1 text-sm text-black min-h-12">
                <p>
                  <span className="font-semibold">{loan.rate}</span> interest
                  rate
                </p>
                <p>
                  <span className="font-semibold">{loan.comp}</span> comparison
                  rate
                </p>
              </div>
            </div>

            {/* PUSH DETAILS TO BOTTOM */}
            <div className="grow" />

            {/* DETAILS */}
            <div>
              <button
                // onClick={() =>
                //   setExpandedIndex(expandedIndex === index ? null : index)
                // }
                className="w-full border-t pt-3 flex items-center justify-between text-black font-poppins font-semibold text-sm"
              >
                <span>Details</span>
                <ChevronRight
                  size={18}
                  //   className={`transition-transform duration-300 ${
                  //     expandedIndex === index ? "rotate-90" : ""
                  //   }`}
                />
              </button>
              {/* 
              {expandedIndex === index && ( */}
              <div className="text-base text-black mt-2">
                <p>
                  Owner occupier, Variable, Principal and interest, Maximum LVR
                  80%, Maximum loan amount $1,00,00,000, Minimum loan amount
                  $1,50,000. Further conditions, fees and charges may apply.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrokerInYourArea;
