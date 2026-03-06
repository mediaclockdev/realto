import React from "react";
import partner1 from "../../public/partner1.svg"
import partner2 from "../../public/partner2.svg"
import partner3 from "../../public/partner3.svg"
import partner4 from "../../public/partner4.svg"
import partner5 from "../../public/partner5.svg"
import Image from "next/image";

const partners = [
  {
    name: "Australian National University",
   img:partner1,
  },
  {
    name: "Universities Australia",
    img:partner2,
  },
  {
    name: "The University of Queensland",
    img:partner3,
},
  {
    name: "The University of Sydney",
    img:partner4,
  },
  {
    name: "Monash University",
    img:partner5,
  },
];

export default function OurPartners() {
  return (
    <div className="bg-white overflow-hidden">
      <section className="max-w-screen-2xl mx-auto px-10 py-8">
        <h2 className="text-[32px] font-extrabold text-gray-900 mb-8">
          Our Partners
        </h2>

        <div className="flex items-center gap-5">
          {partners.map((partner, idx) => (
            <div
              key={idx}
            >
                <Image src={partner.img} alt={partner.name} />
                  </div>

          ))}
        </div>
      </section>
    </div>
  );
}
