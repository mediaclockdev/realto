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
   logo:partner1,
  },
  {
    name: "Universities Australia",
    logo:partner2,
  },
  {
    name: "The University of Queensland",
    logo:partner3,
},
  {
    name: "The University of Sydney",
    logo:partner4,
  },
  {
    name: "Monash University",
    logo:partner5,
  },
];

export default function OurPartners() {
  return (
    <div className="bg-white">

    <div className="relative overflow-hidden max-w-screen-2xl mx-auto px-5 py-5">
         <div className="mb-8">
           <p className="text-black font-semibold text-2xl lg:text-[32px]">Our Partners</p>
         </div>
           <div className="marquee-wrapper">
             <div className="marquee-track">
               {[...partners, ...partners, ...partners].map((logo, i) => (
                 <div key={i} className="logo-item flex items-center justify-center">
                   <Image
                     src={logo.logo}
                     alt="partner logo"
                     width={160}
                     height={120}
                     className="object-contain opacity-100 transition duration-300"
                   />
                 </div>
               ))}
             </div>
           </div>
         </div>
               </div>
  );
}
