import React from "react";
import Image from "next/image";

import img1 from "../../public/last1.svg";
import img2 from "../../public/last2.svg";
import img3 from "../../public/last3.svg";
import img4 from "../../public/last4.png";
import spread from "../../public/spreadthecost.svg";
import save1 from "../../public/save1.svg";
import save2 from "../../public/save2.svg";
import rightarrow from "../../public/rightarrow.svg";

const Experiencesthatlastalifetime = () => {
  const images = [img1, img2, img3, img4];

  const features = [
    {
      title: "Spread the Cost",
      desc: "There's no need to wait when you choose book Now, pay Later",
      icon: spread,
    },
    {
      title: "Save More",
      desc: "There's no need to wait when you choose book Now, pay Later",
      icon: save1,
    },
    {
      title: "Save More",
      desc: "There's no need to wait when you choose book Now, pay Later",
      icon: save2,
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-black font-poppins font-semibold text-2xl md:text-[32px]">
          Experiences that last a lifetime
        </h2>
        <div className="flex items-center gap-1 cursor-pointer">
          <p className="text-black text-sm lg:text-lg font-medium">More</p>
          <span className="text-black text-xl">
            <Image src={rightarrow} alt="right arrow" />
          </span>
        </div>
      </div>

      {/* Image Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`relative h-100 rounded-[10px] overflow-hidden group ${
              idx === 3 ? "opacity-60" : ""
            }`}
          >
            <Image
              src={img}
              alt="experience"
              className=" object-contain group-hover:scale-105 transition duration-300 cursor-pointer"
            />

            {/* Outline Heart Icon */}
            <div className="absolute top-3 right-4 md:right-8 lg:right-15 bg-white/60 backdrop-blur-sm p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="border-2 border-blue-400 rounded-2xl p-6 flex gap-4 items-start"
          >
            <div className="shrink-0">
              <Image
                src={item.icon}
                alt={item.title}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-blue-500 font-semibold text-xl">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiencesthatlastalifetime;
