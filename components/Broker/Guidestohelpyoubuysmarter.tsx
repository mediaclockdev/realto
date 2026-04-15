import Image from "next/image";
import React from "react";
import homeguide from "../../public/firsthome.svg";
import deposit from "../../public/deposit.svg";
import guarantor from "../../public/guarantorhomeloans.svg";
import supersaver from "../../public/supersaver.svg";

const Guidestohelpyoubuysmarter = () => {
  const guide = [
    { name: "First home buyers guide", icon: homeguide },
    { name: "How much deposit do I need?", icon: deposit },
    { name: "Guarantor home loans explained", icon: guarantor },
    { name: "First Home Super Saver Scheme", icon: supersaver },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="space-y-2 pb-4">
        <h2 className="font-poppins font-semibold text-lg lg:text-2xl text-black">
          Guides to help you buy smarter
        </h2>
        <p className="font-poppins font-normal text-sm lg:text-base text-black">
          Build Your Skills and Confidence with our expert guides to buying your
          first home
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-5">
        {guide.map((items, idx) => (
          <div key={idx} className="space-y-2">
            <div>
              <Image src={items.icon} alt="" />
            </div>
            <div>
              <p className="font-poppins text-black font-semibold text-base text-center">
                {items.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 ">
        <button className="bg-[#0284C7] text-white px-6 text-xl ] rounded-md font-semibold hover:bg-[#0369a1] transition cursor-pointer">
          View All
        </button>
      </div>
    </div>
  );
};

export default Guidestohelpyoubuysmarter;
