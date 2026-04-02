import React from "react";
import helpinghand from "../../public/helpinghand.svg";
import approval from "../../public/approval.svg";
import Image from "next/image";

const PreApproval = () => {
  const touch = [
    {
      name: "A helping hand",
      title:
        "Why do it on your own? A home loan concierge is here to help with any questions or guidance you need.",
      btn: "Get in touch",
      icon: helpinghand,
    },
    {
      name: "A pre-approval",
      title:
        "Ready to buy? You’ll want pre-approval so you can be confident when it’s time to bid.",
      btn: "Start pre-approval",
      icon: approval,
    },
  ];
  return (
    <div className="bg-[#0284C7]">
      <div className="max-w-screen-2xl px-10 py-5 mx-auto flex flex-col lg:flex-row justify-center items-center gap-9">
        {touch.map((items, idx) => (
          <div
            key={idx}
            className="border border-[#E2E8F0] rounded-[10px] bg-white px-5 py-5 space-y-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-black text-lg lg:text-2xl font-poppins font-medium">
                {items.name}
              </p>
              <Image
                src={items.icon}
                alt={items.name}
                className="size-8 lg:size-14"
              />
            </div>
            <div className="space-y-5">
              <p className="text-black text-sm lg:text-base font-medium font-poppins max-w-[471px]">
                {items.title}
              </p>
              <div>
                <button className="text-black text-lg lg:text-2xl font-poppins font-medium border border-[#E2E8F0] rounded-[10px] px-3 py-1">
                  {items.btn}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreApproval;
