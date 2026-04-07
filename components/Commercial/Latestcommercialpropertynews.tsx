"use client";

import React from "react";
import Image from "next/image";

interface NewsCard {
  id: number;
  title: string;
  tag: string;
  date: string;
  description: string;
}

interface Property {
  id: number;
  image: string;
}

const LatestCommercialPropertyNews = () => {
  const properties: Property[] = [
    { id: 1, image: "/home1.svg" },
    { id: 2, image: "/home2.svg" },
    { id: 3, image: "/home3.svg" },
    { id: 4, image: "/home4.svg" },
  ];

  const newsCards: NewsCard[] = [
    {
      id: 1,
      title: "Citrus farm in NSW's 'food bowl' for sale: $60m price",
      tag: "LATEST NEWS",
      date: "10 FEB 2026",
      description:
        "There's no need to compare apples with oranges anymore, because this citrus farm in NSW's Riverina region is for sale. Orange you glad you",
    },
    {
      id: 2,
      title: "Citrus farm in NSW's 'food bowl' for sale: $60m price",
      tag: "LATEST NEWS",
      date: "10 FEB 2026",
      description:
        "There's no need to compare apples with oranges anymore, because this citrus farm in NSW's Riverina region is for sale. Orange you glad you",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <h2 className="text-2xl md:text-[32px] font-semibold text-black mb-10">
        Latest commercial property news
      </h2>

      {/* Outer grid: images left, cards right */}
      <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-6">
        {/* LEFT: stacked image rows */}
        <div className="flex flex-col gap-4">
          {/* Row 1: Featured image */}
          <div className="relative w-full h-[457px] rounded-lg overflow-hidden">
            <Image
              src={properties[0].image}
              alt="Featured property"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Row 2: 3 thumbnails — same height as card 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[368px]">
            {properties.slice(1, 4).map((property) => (
              <div
                key={property.id}
                className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer"
              >
                <Image
                  src={property.image}
                  alt={`Property ${property.id}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Card 1  */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white lg:h-[457px] flex flex-col justify-between font-poppins">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-black leading-tight mb-3 ">
                {newsCards[1].title}
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block border border-gray-400 px-3 py-1.5 rounded-md text-xs font-semibold text-black tracking-wide">
                  {newsCards[1].tag}
                </span>
                <span className="text-sm text-gray-600 font-medium">
                  {newsCards[1].date}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed ">
                {newsCards[1].description}
              </p>
            </div>
            <div className="border-t border-gray-200 mt-2" />
          </div>

          {/* Card 2  */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white lg:h-[368px] flex flex-col justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-black leading-tight mb-3 ">
                {newsCards[1].title}
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block border border-gray-400 px-3 py-1.5 rounded-md text-xs font-semibold text-black tracking-wide">
                  {newsCards[1].tag}
                </span>
                <span className="text-sm text-gray-600 font-medium">
                  {newsCards[1].date}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed ">
                {newsCards[1].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestCommercialPropertyNews;
