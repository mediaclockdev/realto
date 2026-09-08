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
import heading from "@/public/homepageheadingicons/studentresidency.svg";

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
    <div className="max-w-screen-2xl mx-auto px-5 py-5 ">
      <div className="flex justify-center mb-4  ">
        <div className="relative ">
          <Image src={heading} alt="heading " className="" />
          <span className="font-amasis font-black text-[32px] text-white absolute top-3 left-28  [-webkit-text-stroke:0.5px_#000000] [text-shadow:1px_1px_3px_rgba(0,0,0,1),2px_2px_10px_rgba(0,0,0,0.85)]">
            Student Residency
          </span>
        </div>
      </div>

      <MarqueeCards items={partners} speed="fast" />
    </div>
  );
};

export default StudentresidencyPartners;
