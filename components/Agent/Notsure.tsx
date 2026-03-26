import Image from "next/image";
import React from "react";
import waves from "../../public/waves.svg";

const Notsure = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="relative bg-[#0284C7] rounded-2xl overflow-hidden min-h-[180px] flex items-center justify-center">
        {/* Waves background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/30 pointer-events-none z-10" />
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={waves}
            alt="waves background"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-10 gap-3">
          <h2 className="text-[#F9FAFB] font-bold font-poppins text-2xl md:text-[32px]">
            Not sure which agent to choose?
          </h2>
          <p className="text-[#F9FAFB] font-poppins text-sm md:text-base max-w-xl">
            Answer a few quick questions and we&apos;ll match you with the best
            agent in your area.
          </p>
          <button className="mt-2 bg-white text-[#0284C7] font-semibold font-poppins text-sm px-6 py-2.5 rounded-full hover:bg-blue-50 transition-colors">
            Get Matched Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notsure;
