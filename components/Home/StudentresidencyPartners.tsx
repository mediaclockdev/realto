import React from "react";
import partner1 from "../../public/partner1.svg";
import partner2 from "../../public/partner2.svg";
import partner3 from "../../public/partner3.svg";
import partner4 from "../../public/partner4.svg";
import partner5 from "../../public/partner5.svg";
import MarqueeCards from "../ui/MarqueeCards";
import Image from "next/image";
import backgroundimg from "@/public/homepageheadingbackground1.svg";
import student from "@/public/homepagestudenticon.svg";

const partners = [
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
];

const StudentresidencyPartners = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="flex justify-center">
        <div className="relative w-fit">
          <div className="relative inline-flex items-center justify-center gap-2 px-8 py-4">
            <Image
              src={backgroundimg}
              alt="heading background"
              className="absolute inset-0 w-full h-full"
            />

            <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading">
              Student Residency
            </h2>
          </div>

          <Image
            src={student}
            alt=""
            className="absolute right-full top-1/2 mr-2 -translate-y-1/2"
          />
        </div>
      </div>

      <MarqueeCards items={partners} speed="fast" />
    </div>
  );
};

export default StudentresidencyPartners;
