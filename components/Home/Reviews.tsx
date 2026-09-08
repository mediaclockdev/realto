import React from "react";
import Image, { StaticImageData } from "next/image";

import sara from "../../public/sarajohnson.jpg";
import michael from "../../public/michaelchen.jpg";
import emily from "../../public/emilyrodriguez.jpg";
import david from "../../public/davidthompson.jpg";
import lisa from "../../public/lisaAnderson.jpg";
import jennifer from "../../public/jennifermartinez.jpg";
import starRating from "../../public/agentstarrating.svg";
import starRatingempty from "../../public/agentstarratingempty.svg";

type Review = {
  id: number;
  clientImage: StaticImageData;
  clientName: string;
  rating: number;
  review: string;
  location: string;
  months: string;
};

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      clientImage: sara,
      clientName: "Sarah Johnson",
      rating: 5,
      review:
        "Found our dream home through Realto in under a month. The listings were accurate and the whole process felt effortless.Read more...",
      location: "Beverly Hills",
      months: "2 months ago",
    },
    {
      id: 2,
      clientImage: michael,
      clientName: "Michael Chen",
      rating: 5,
      review:
        "Great platform for comparing properties side by side. The photos and details matched exactly what we saw in person.Read more...",
      location: "Santa Monica",
      months: "1 month ago",
    },
    {
      id: 3,
      clientImage: emily,
      clientName: "Emily Rodriguez",
      rating: 4,
      review:
        "Booking a viewing was quick and the agent got back to me the same day. Would definitely use Realto again.Read more...",
      location: "Pasadena",
      months: "3 weeks ago",
    },
    {
      id: 4,
      clientImage: david,
      clientName: "David Thompson",
      rating: 5,
      review:
        "Rented my apartment out within two weeks of listing it. The dashboard made tracking enquiries really simple.Read more...",
      location: "Long Beach",
      months: "4 months ago",
    },
    {
      id: 5,
      clientImage: lisa,
      clientName: "Lisa Anderson",
      rating: 5,
      review:
        "The commercial listings section saved us weeks of searching. Clear pricing and no hidden surprises.Read more...",
      location: "Downtown LA",
      months: "5 months ago",
    },
    {
      id: 6,
      clientImage: jennifer,
      clientName: "Jennifer Martinez",
      rating: 4,
      review:
        "As a student, finding shared accommodation was stressful until I used Realto. Filters made it painless.Read more...",
      location: "Westwood",
      months: "2 weeks ago",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="bg-[#ECC850] rounded-lg px-10 py-2">
          <span className="font-amasis font-black text-[32px] text-white [-webkit-text-stroke:0.5px_#000000] [text-shadow:1px_1px_3px_rgba(0,0,0,1),2px_2px_10px_rgba(0,0,0,0.85)]">
            Reviews
          </span>
        </div>
        <p className="text-[#6B7280] font-poppins text-base font-normal">
          What people say about finding their place with Realto
        </p>
      </div>

      <div className="marquee-wrapper mt-5">
        <div className="marquee-track">
          {[...reviews, ...reviews, ...reviews].map((items, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[360px] mx-2 p-[2px] rounded-xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
            }}
          >
            <div className="bg-white p-4 rounded-xl h-full w-full">
              <div className="flex gap-3">
                <Image
                  src={items.clientImage}
                  alt={items.clientName}
                  className="rounded-full size-12"
                />

                <div>
                  <h3 className="text-[#111827] font-medium">
                    {items.clientName}
                  </h3>

                  {/* ⭐ Stars */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Image
                        key={i}
                        src={i < items.rating ? starRating : starRatingempty}
                        alt="star rating"
                        className="size-5"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[#434C59] mt-3">{items.review}</p>
              <div className="flex gap-2">
                <p className="text-[#9CA3AF]">{items.location}</p>
                <p className="text-[#9CA3AF]">.</p>
                <p className="text-[#9CA3AF]">{items.months}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
