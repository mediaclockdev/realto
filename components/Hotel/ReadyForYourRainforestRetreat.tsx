import React from "react";
import rainforestretreat from "../../public/RainforestRetreat.png";
import Image from "next/image";

const ReadyForYourRainforestRetreat = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="relative w-full h-112.5 md:h-130 rounded-[26px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={rainforestretreat}
          alt="RainForest Retreat"
          fill
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {/* Heading */}
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Ready For Your Rainforest Retreat?
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-3xl font-poppins text-sm sm:text-lg md:text-2xl text-white leading-relaxed">
            Limited Availability For The Upcoming Season. Reserve Your Suite
            Today And Begin Your Journey Into The Daintree.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4 flex-wrap justify-center">
            <button className="bg-[#4189DD] text-white px-6 py-3 cursor-pointer rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition">
              Book Your Stay
            </button>

            <button className="bg-white/30 backdrop-blur-md text-black px-6 py-3 cursor-pointer rounded-lg text-sm sm:text-base font-medium hover:bg-white/40 transition">
              Explore Galleries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyForYourRainforestRetreat;
