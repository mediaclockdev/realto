import React from "react";
import partner1 from "../../public/partner1.svg";
import partner2 from "../../public/partner2.svg";
import partner3 from "../../public/partner3.svg";
import partner4 from "../../public/partner4.svg";
import partner5 from "../../public/partner5.svg";
import MarqueeCards from "../ui/MarqueeCards";

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
    <div className="max-w-screen-2xl mx-auto px-5 py-5 mt-2">
      <h2
        className=" font-semibold font-amasis text-[32px]
         text-[#111827] px-4 py-2 rounded-full inline-block mb-1 [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
        style={{
          WebkitTextFillColor: "white",
          WebkitTextStroke: "1.5px #000000",
          background:
            "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
        }}
      >
        Student residency Partners
      </h2>

      <MarqueeCards items={partners} speed="fast" />
    </div>
  );
};

export default StudentresidencyPartners;
