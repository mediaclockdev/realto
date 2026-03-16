import { Star } from "lucide-react";
import React from "react";

const offers = [
  {
    title: "Refer a friend and you both get $50",
    description:
      "Turn connections into rewards.\nGet credited after successful booking.",
    bgImage: "/frame1.svg",
  },
  {
    title: "Save up to $100",
    description:
      "Get exclusive discounts from 150+ trusted partners at this one-stop student platform",
    bgImage: "/frame2.svg",
  },
  {
    title: "Get additional £20 cashback on your booking!",
    description:
      "Book your student accommodation via the amber app to avail this offer!",
    bgImage: "/frame3.svg",
  },
];

export default function OffersAndReferrals() {
  return (
    <div className="bg-gray-50 relative">
      <section className="max-w-screen-2xl mx-auto px-5 py-5">
        <h2 className="text-2xl lg:text-[32px] font-extrabold text-gray-900 mb-5">
          Offers and Referal program
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl p-6 min-h-[100px] lg:min-h-[180px]  max-w-[450px] flex flex-col justify-end overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                backgroundImage: `url('${offer.bgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Star
                className="absolute top-5 right-5 text-black group-hover:text-white transition-colors duration-300 size-5 lg:size-6"
                fill="currentColor"

              />

              <div className="relative z-10 pt-10 ">
                <h3 className="text-base lg:text-xl font-semibold text-black group-hover:text-white transition-colors duration-300 mb-[6px] leading-tight max-w-[365px] ">
                  {offer.title}
                </h3>
                <p className="text-[#343434] text-sm lg:text-base leading-snug whitespace-pre-wrap group-hover:text-white transition-colors duration-300">
                  {offer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
