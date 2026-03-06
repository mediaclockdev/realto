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
      <section className="max-w-screen-2xl mx-auto px-10 py-6">
        <h2 className="text-[32px] font-extrabold text-gray-900 mb-5">
          Offers and Referal program
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl p-6 min-h-[180px] max-w-[450px] flex flex-col justify-end overflow-hidden"
              style={{
                backgroundImage: `url('${offer.bgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Star
                className="absolute top-5 right-5 text-black"
                fill="black"
                size={24}
              />

              <div className="relative z-10 pt-10">
                <h3 className="text-xl font-semibold text-black mb-[6px] leading-tight max-w-[365px]">
                  {offer.title}
                </h3>
                <p className="text-[#343434] text-base leading-snug whitespace-pre-wrap">
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
