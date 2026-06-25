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
  purchasedin: string;
  months: string;
};

const ClientReviewsandRatings: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      clientImage: sara,
      clientName: "Sarah Johnson",
      rating: 5,
      review:
        "Outstanding service from start to finish. John's attention to detail and responsiveness made the entire process smooth. He truly cares about his clients' best interests.Read more...",
      purchasedin: "Purchased in Beverly Hills",
      months: "2 months ago",
    },
    {
      id: 2,
      clientImage: michael,
      clientName: "Michael Chen",
      rating: 5,
      review:
        "Outstanding service from start to finish. John's attention to detail and responsiveness made the entire process smooth. He truly cares about his clients' best interests.Read more...",
      purchasedin: "Purchased in Beverly Hills",
      months: "2 months ago",
    },
    {
      id: 3,
      clientImage: emily,
      clientName: "Emily Rodriguez",
      rating: 5,
      review:
        "Outstanding service from start to finish. John's attention to detail and responsiveness made the entire process smooth. He truly cares about his clients' best interests.Read more...",
      purchasedin: "Purchased in Beverly Hills",
      months: "2 months ago",
    },
    {
      id: 4,
      clientImage: david,
      clientName: "David Thompson",
      rating: 5,
      review:
        "Outstanding service from start to finish. John's attention to detail and responsiveness made the entire process smooth. He truly cares about his clients' best interests.Read more...",
      purchasedin: "Purchased in Beverly Hills",
      months: "2 months ago",
    },
    {
      id: 5,
      clientImage: lisa,
      clientName: "Lisa Anderson",
      rating: 5,
      review:
        "Outstanding service from start to finish. John's attention to detail and responsiveness made the entire process smooth. He truly cares about his clients' best interests.Read more...",
      purchasedin: "Purchased in Beverly Hills",
      months: "2 months ago",
    },
    {
      id: 6,
      clientImage: jennifer,
      clientName: "Jennifer Martinez",
      rating: 5,
      review:
        "Outstanding service from start to finish. John's attention to detail and responsiveness made the entire process smooth. He truly cares about his clients' best interests.Read more...",
      purchasedin: "Purchased in Beverly Hills",
      months: "2 months ago",
    },
    {
      id: 7,
      clientImage: sara,
      clientName: "Robert Wilson",
      rating: 5,
      review:
        "Outstanding service from start to finish. John's attention to detail and responsiveness made the entire process smooth. He truly cares about his clients' best interests.Read more...",
      purchasedin: "Purchased in Beverly Hills",
      months: "2 months ago",
    },
    {
      id: 8,
      clientImage: michael,
      clientName: "Linda Davis",
      rating: 5,
      review:
        "Outstanding service from start to finish. John's attention to detail and responsiveness made the entire process smooth. He truly cares about his clients' best interests.Read more...",
      purchasedin: "Purchased in Beverly Hills",
      months: "2 months ago",
    },
    {
      id: 9,
      clientImage: emily,
      clientName: "James Anderson",
      rating: 5,
      review:
        "Outstanding service from start to finish. John's attention to detail and responsiveness made the entire process smooth. He truly cares about his clients' best interests.Read more...",
      purchasedin: "Purchased in Beverly Hills",
      months: "2 months ago",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className="text-[#007CBE] font-semibold text-[15px] font-amasis">
          Client Reviews and Ratings
        </h2>
        <p className="text-[#6B7280] font-poppins text-base font-normal">
          What clients say about working with Katherine
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {reviews.map((items) => (
          <div
            key={items.id}
            className="p-[2px] rounded-xl inline-block hover:scale-105 transition-all duration-300"
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
                    <Image
                      src={starRating}
                      alt="star rating"
                      className="size-5"
                    />
                    <Image
                      src={starRating}
                      alt="star rating"
                      className="size-5"
                    />
                    <Image
                      src={starRating}
                      alt="star rating"
                      className="size-5"
                    />
                    <Image
                      src={starRating}
                      alt="star rating"
                      className="size-5"
                    />
                    <Image
                      src={starRatingempty}
                      alt="star rating"
                      className="size-5"
                    />
                  </div>
                </div>
              </div>

              <p className="text-[#434C59] mt-3">{items.review}</p>
              <div className="flex gap-2">
                <p className="text-[#9CA3AF]">{items.purchasedin}</p>
                <p className="text-[#9CA3AF]">.</p>
                <p className="text-[#9CA3AF]">{items.months}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-[#D1D5DB] px-6 py-3 text-[#374151] cursor-pointer font-poppins font-medium text-sm mt-4">
        <button>Load More Reviews</button>
      </div>
    </div>
  );
};

export default ClientReviewsandRatings;
