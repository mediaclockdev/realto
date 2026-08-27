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
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="flex justify-center mb-4">
        <Image src={heading} alt="heading " className="" />
      </div>

      <MarqueeCards items={partners} speed="fast" />
    </div>
  );
};

export default StudentresidencyPartners;
