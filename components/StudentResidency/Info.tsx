import React from "react";
import bedicon from "../../public/beds.svg";
import universityhat from "../../public/map_university.svg";
import earthicon from "../../public/earth.svg";
import Image from "next/image";

const Info = () => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-4 lg:py-7 flex justify-between items-center gap-5 text-[#343434]">
        <div className="space-y-1.5 lg:space-y-3.5 w-auto lg:max-w-[250px]">
          <Image src={bedicon} alt="bedicon" className=" size-auto" />
          <p className="font-semibold text-sm lg:text-2xl">1M+ Beds</p>
          <p className="text-xs lg:text-sm">
            Book your perfect place from an extensive list of options.
          </p>
        </div>
        <div className="space-y-1.5 lg:space-y-3.5 w-auto lg:max-w-[250px]">
          <Image
            src={universityhat}
            alt="universityhat"
            className=" size-auto"
          />
          <p className="font-semibold text-sm lg:text-2xl">800+ Universities</p>
          <p className=" text-xs lg:text-sm">
            Find the best student homes near prestigious universities.
          </p>
        </div>
        <div className="space-y-1.5 lg:space-y-3.5 w-auto lg:max-w-[250px]">
          <Image src={earthicon} alt="earthicon" className=" size-10" />
          <p className="font-semibold text-sm lg:text-2xl">60+ cities</p>
          <p className=" text-xs lg:text-sm">
            We operate in major cities of Australia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
