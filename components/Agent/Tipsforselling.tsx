import React from "react";
import Collette1 from "../../public/Collette1.svg";
import Collette2 from "../../public/Collette2.svg";
import Collette3 from "../../public/Collette3.svg";
import Collette4 from "../../public/Collette4.svg";
import Image from "next/image";
import backgroundimg from "@/public/homepageheadingbackground1.svg";

const blogs = [
  {
    title: "Collette Dinnigan's former home up for auction",
    img: Collette1,
    read: "3 minutes read",
  },
  {
    title: "Collette Dinnigan's former home up for auction",
    img: Collette2,
    read: "3 minutes read",
  },
  {
    title: "Collette Dinnigan's former home up for auction",
    img: Collette3,
    read: "3 minutes read",
  },
  {
    title: "Collette Dinnigan's former home up for auction",
    img: Collette4,
    read: "3 minutes read",
  },
];

const Tipsforselling = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5 space-y-5">
      <div className="flex justify-center mb-4">
        <div className="relative inline-flex items-center justify-center">
          <Image
            src={backgroundimg}
            alt="background image"
            className="absolute inset-0 w-full h-full"
          />

          <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading px-6 py-4">
            Tips for selling
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {blogs.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            {/* Image */}
            <div className="rounded-xl overflow-hidden w-full">
              <Image
                src={item.img}
                alt={item.title}
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Title */}
            <p className="font-semibold font-poppins text-black text-sm lg:text-base leading-snug">
              {item.title}
            </p>

            {/* Read time */}
            <p className="text-[#909090] text-xs font-poppins font-semibold">
              {item.read}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <p className="text-[#0284C7] font-poppins font-semibold text-base lg:text-lg cursor-pointer hover:underline ">
          Explore more articles for selling your property{" >"}
        </p>
      </div>
    </div>
  );
};

export default Tipsforselling;
