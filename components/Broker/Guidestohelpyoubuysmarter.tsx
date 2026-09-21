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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {guide.map((items, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden shadow-[-8px_8px_16px_#999FB4,6px_-6px_12px_#FFFFFF]"
          >
            <Image
              src={items.icon}
              alt=""
              className="w-full h-[220px] object-cover"
            />
            <p className="font-poppins text-black font-semibold text-base text-center py-4 px-3">
              {items.name}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button className="bg-[#BA9000] text-white px-8 py-2 text-xl rounded-md font-semibold hover:bg-[#9c7900] transition cursor-pointer">
          View All
        </button>
      </div>
    </div>
  );
};

export default Guidestohelpyoubuysmarter;
