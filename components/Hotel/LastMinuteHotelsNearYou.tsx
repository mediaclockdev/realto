import React from "react";
import Image from "next/image";
import Link from "next/link";
import hotelImg from "../../public/hotelimg.png";
import star from "../../public/starsingle.svg";
import { getHotelListings } from "@/lib/hotel/repository";
import type { HotelListing } from "@/lib/hotel/types";

const hotels = getHotelListings();

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i}>
        <Image
          src={star}
          alt="star"
          width={20}
          height={20}
          className={i <= count ? "opacity-100" : "opacity-30"}
        />
      </div>
    ))}
  </div>
);

const HotelCard = ({ hotel }: { hotel: HotelListing }) => (
  <Link
    href={`/hotel/${hotel.slug}`}
    className="group rounded-2xl p-[2px] transition hover:bg-[linear-gradient(90deg,#CB9E33,#EDD06A,#FCEA94,#FADE7B,#FDEE9D,#C29225)]"
  >
    <div className="bg-white rounded-2xl p-4 flex flex-col lg:flex-row gap-4 shadow-sm">
      {/* Image */}
      <div className="relative w-[220px] min-w-[300px] lg:min-w-[220px] h-[200px] rounded-xl overflow-hidden shrink-0">
        <Image src={hotelImg} alt={hotel.title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 py-1">
        {/* Stars + Rating */}
        <div className="flex items-start justify-between">
          <StarRating count={hotel.rating} />
          <div className="flex flex-col">
            <p className="bg-[#E7F2FD] text-[#4197EF] text-sm lg:text-base font-semibold px-2 py-1 rounded-lg leading-tight">
              {hotel.badge}
            </p>
            <span className="font-poppins font-normal text-[10px] text-[#909090] text-right">
              525 reviews
            </span>
          </div>
        </div>

        {/* Hotel Name */}
        <h3 className="text-2xl lg:text-[32px] font-semibold font-poppins text-black">
          {hotel.title.toLowerCase()}
        </h3>

        {/* Amenity Pills */}
        <div className="flex flex-wrap gap-2 mt-2">
          {hotel.amenities.slice(0, 3).map((item) => (
            <span
              key={item.label}
              className="border border-gray-300 text-gray-600 text-xs px-3 py-1 rounded-full"
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex justify-between mt-1">
          <div>
            <p className="text-[#7ECC9B] font-semibold text-base font-poppins">
              Free Cancellation
            </p>
            <p className="text-[#909090] text-xs lg:text-base font-normal font-poppins">
              {hotel.totalLabel}
            </p>
          </div>
          <div className="">
            <div className="text-right">
              <p className="text-xl lg:text-[32px] font-semibold text-black font-poppins">
                {hotel.priceLabel}
                <span className="text-[#909090] font-semibold font-poppins text-sm">
                  /night
                </span>
              </p>
            </div>
            <span className="inline-block bg-[#4189DD] hover:bg-[#3298DF] cursor-pointer text-white text-sm lg:text-base font-normal font-poppins px-3 lg:px-5 py-1 rounded-[10px] transition">
              View Detail
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const LastMinuteHotels = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="font-poppins text-xl lg:text-[32px] font-semibold text-black">
          Last - Minute Hotels Near You
        </h2>
        {/* Trending icon */}
        <svg
          className="w-6 h-6 text-gray-900"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
          <path d="M22 7l-1 1" strokeLinecap="round" />
          <circle cx="22" cy="6" r="1" fill="currentColor" stroke="none" />
        </svg>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default LastMinuteHotels;
