import React from "react";
import Image from "next/image";
import user from "../../public/sarah.jpg";

const GuestExperiences = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      location: "SYDNEY, AU",
      text: `"An absolute paradise. Sleeping to the sound of the rain and waking up to the dawn chorus was life-changing. The service at Stay Australia is second to none."`,
      img: user,
    },
    {
      name: "Sarah Jenkins",
      location: "SYDNEY, AU",
      text: `"An absolute paradise. Sleeping to the sound of the rain and waking up to the dawn chorus was life-changing. The service at Stay Australia is second to none."`,
      img: user,
    },
    {
      name: "Sarah Jenkins",
      location: "SYDNEY, AU",
      text: `"An absolute paradise. Sleeping to the sound of the rain and waking up to the dawn chorus was life-changing. The service at Stay Australia is second to none."`,
      img: user,
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      {/* Heading */}
      <h2 className="text-center font-amasis font-semibold text-[#0287C7] text-[28px] md:text-[32px]">
        Guest Experiences
      </h2>

      {/* Cards */}
      <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
          >
            <div className="flex gap-1 text-yellow-400 text-lg">{"★★★★★"}</div>

            <p className="mt-4 text-[#909090] text-sm md:text-base leading-relaxed">
              {item.text}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-poppins font-semibold text-black text-xl">
                  {item.name}
                </p>
                <p className="text-[#909090] text-base">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestExperiences;
