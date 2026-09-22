"use client";

import React from "react";
import Image from "next/image";
import locationIcon from "../../public/hotellocationicon.svg";
import checkInIcon from "../../public/buycalender.svg";
import checkOutIcon from "../../public/rentcalender.svg";
import roomIcon from "../../public/beds.svg";
import guestIcon from "../../public/loginusericon.svg";
import starIcon from "../../public/starsingle.svg";

const FIELD =
  "flex items-center gap-2 rounded-lg border-2 border-[#CB9E33] bg-white px-3 py-1.5 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.3)]";

// ponytail: native date/select — no picker lib. Dates render in the browser locale
// format, not "Thu, Aug 20"; swap in a date lib only if that wording is required.
const HotelSearchBar = () => (
  <div className="w-full bg-white">
    <div className="h-20 bg-gradient-to-b from-[#1F7FC0] to-[#5BA9DB]" />

    <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center gap-3 px-3 py-3 lg:flex-nowrap lg:overflow-x-auto">
      <svg viewBox="0 0 24 24" className="size-8 shrink-0">
        <defs>
          <linearGradient id="funnel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D62828" />
            <stop offset="50%" stopColor="#F4A300" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
        <path d="M3 4h18l-7 8v7l-4 2v-9z" fill="url(#funnel)" />
      </svg>

      <label className={`${FIELD} min-w-56 flex-1`}>
        <Image src={locationIcon} alt="location" width={24} height={24} className="shrink-0" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full min-w-0 font-poppins text-base text-[#1d1d1d] outline-none placeholder:text-[#1d1d1d]"
        />
      </label>

      <label className={`${FIELD} shrink-0`}>
        <Image src={checkInIcon} alt="check in" width={30} height={30} className="shrink-0" />
        <span className="flex flex-col">
          <span className="font-poppins text-[10px] font-bold uppercase tracking-wide text-[#2E7D32]">
            Check in
          </span>
          <input
            type="date"
            aria-label="Check in"
            className="font-poppins text-sm font-semibold text-[#1d1d1d] outline-none"
          />
        </span>
      </label>

      <label className={`${FIELD} shrink-0`}>
        <span className="flex flex-col">
          <span className="font-poppins text-[10px] font-bold uppercase tracking-wide text-[#D62828]">
            Check out
          </span>
          <input
            type="date"
            aria-label="Check out"
            className="font-poppins text-sm font-semibold text-[#1d1d1d] outline-none"
          />
        </span>
        <Image src={checkOutIcon} alt="check out" width={30} height={30} className="shrink-0" />
      </label>

      <label className={`${FIELD} shrink-0`}>
        <Image src={roomIcon} alt="rooms" width={30} height={30} className="shrink-0" />
        <span className="flex flex-col">
          <span className="font-poppins text-[10px] font-bold uppercase tracking-wide text-[#0496FF]">
            Rooms
          </span>
          <select
            aria-label="Rooms"
            className="bg-transparent font-poppins text-sm font-semibold text-[#1d1d1d] outline-none"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n}>{`${n} Room${n > 1 ? "s" : ""}`}</option>
            ))}
          </select>
        </span>
      </label>

      <label className={`${FIELD} shrink-0`}>
        <Image src={guestIcon} alt="guests" width={26} height={26} className="shrink-0" />
        <span className="flex flex-col">
          <span className="font-poppins text-[10px] font-bold uppercase tracking-wide text-[#0496FF]">
            Guests
          </span>
          <select
            aria-label="Guests"
            className="bg-transparent font-poppins text-sm font-semibold text-[#1d1d1d] outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n}>{`${n} Adult${n > 1 ? "s" : ""}`}</option>
            ))}
          </select>
        </span>
      </label>

      <button
        type="button"
        className={`${FIELD} shrink-0 py-2.5 transition hover:scale-[1.03]`}
      >
        <Image src={starIcon} alt="" width={26} height={26} className="shrink-0" />
        <span className="font-TimesNewRoman text-lg font-bold text-[#CB9E33]">
          View Rates
        </span>
      </button>
    </div>
  </div>
);

export default HotelSearchBar;
