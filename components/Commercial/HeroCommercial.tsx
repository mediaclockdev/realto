import React from "react";
import HeroSection from "../ui/HeroSection";
import bg from "../../public/commercialbg.svg";

const HeroCommercial = () => {
  return (
    <div>
      <HeroSection
        image={bg}
        title={
          <div className="space-y-0 lg:space-y-2 text-center absolute bottom-10  lg:bottom-20  right-[-270px]">
            <div>
              <p className="text-3xl lg:text-[64px] font-bold whitespace-nowrap text-white">
                Australia&apos;s Premier
              </p>

              <p className="text-3xl lg:text-[64px] font-bold whitespace-nowrap">
                Commercial <span className="text-blue-400">Real</span>
              </p>
            </div>
            <div>
              <span className="hidden lg:block"> </span>
              <p className="text-blue-400 text-3xl lg:text-[64px] font-bold whitespace-nowrap">
                Estate
                <span className="text-white"> Network</span>
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default HeroCommercial;
