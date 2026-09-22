"use client";

import React, { useState } from "react";
import Image from "next/image";
import locationIcon from "../../public/hotellocationicon.svg";
import checkInIcon from "@/public/calendericonhotel.svg";
import checkOutIcon from "@/public/calendericonhotel1.svg";
import roomIcon from "../../public/bedhotelicon.svg";
import guestIcon from "../../public/loginusericon.svg";
import starIcon from "../../public/starsingle.svg";
import funnel from "@/public/hotelfunnelicon.svg";
import down from "@/public/downarrowhotel.svg";

const ICON = "size-12 shrink-0 rounded-md object-contain";
const ICON_PHOTO = "size-12 shrink-0 rounded-md object-cover";

const FIELD =
  "flex items-center gap-2 rounded-lg border-2 border-[#CB9E33] bg-white px-3 py-1.5 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.3)]";

const CARET = (
  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 text-gray-500">
    <path
      fillRule="evenodd"
      d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"
      clipRule="evenodd"
    />
  </svg>
);

const inDays = (n: number) =>
  new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);

// noon avoids the DST/UTC edge that shifts a midnight date by a day
const nextDay = (iso: string) =>
  new Date(new Date(`${iso}T12:00`).getTime() + 86400000)
    .toISOString()
    .slice(0, 10);

// ponytail: native date input kept (transparent, over the field) so the OS picker
// does the work; only the label text is ours, formatted as "Thu, Aug 20".
const DateField = ({
  label,
  labelColor,
  value,
  onChange,
  min,
}: {
  label: string;
  labelColor: string;
  value: string;
  onChange: (v: string) => void;
  min?: string;
}) => (
  <span className="relative flex flex-col items-center">
    <span
      className={`font-poppins text-[10px] font-bold uppercase tracking-wide ${labelColor}`}
    >
      {label}
    </span>
    <span className="flex items-center gap-1 font-poppins text-lg font-semibold text-[#1d1d1d]">
      {new Date(`${value}T00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}
      {CARET}
    </span>
    <input
      type="date"
      aria-label={label}
      value={value}
      min={min}
      onChange={(e) => onChange(e.target.value)}
      // a hidden date input only opens its picker on the calendar icon — force it
      onClick={(e) => e.currentTarget.showPicker()}
      className="absolute inset-0 cursor-pointer opacity-0"
    />
  </span>
);

const HotelSearchBar = ({
  isOpen = false,
  onToggle,
}: {
  isOpen?: boolean;
  onToggle?: () => void;
}) => {
  const [checkIn, setCheckIn] = useState(inDays(0));
  const [checkOut, setCheckOut] = useState(inDays(1));

  return (
    <div className="w-full bg-white">
      <div className="h-20 bg-gradient-to-b from-[#1F7FC0] to-[#5BA9DB]" />

      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center gap-3 px-3 py-3 lg:flex-nowrap lg:overflow-x-auto">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-2"
        >
          <Image src={funnel} alt="funnel icon" />
          <Image
            src={down}
            alt="arrow"
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <label className={`${FIELD} min-w-56 flex-1`}>
          <Image
            src={locationIcon}
            alt="location"
            width={48}
            height={48}
            className={ICON}
          />
          <input
            type="text"
            placeholder="Where are you going?"
            className="w-full min-w-0 font-poppins text-base text-[#1d1d1d] outline-none placeholder:text-[#1d1d1d]"
          />
        </label>

        <label className={`${FIELD} shrink-0`}>
          <Image
            src={checkInIcon}
            alt="check in"
            width={48}
            height={48}
            className={ICON}
          />
          <DateField
            label="Check in"
            labelColor="text-[#2E7D32]"
            value={checkIn}
            min={inDays(0)}
            // check-out always trails check-in by at least a night
            onChange={(v) => {
              setCheckIn(v);
              if (v >= checkOut) setCheckOut(nextDay(v));
            }}
          />
        </label>

        <label className={`${FIELD} shrink-0`}>
          <DateField
            label="Check out"
            labelColor="text-[#D62828]"
            value={checkOut}
            min={nextDay(checkIn)}
            onChange={setCheckOut}
          />
          <Image
            src={checkOutIcon}
            alt="check out"
            width={48}
            height={48}
            className={ICON}
          />
        </label>

        <label className={`${FIELD} shrink-0`}>
          <Image
            src={roomIcon}
            alt="rooms"
            width={48}
            height={48}
            className={ICON_PHOTO}
          />
          <span className="flex flex-col items-center">
            <span className="font-poppins text-[10px] font-bold uppercase tracking-wide text-[#0496FF]">
              Rooms
            </span>
            <select
              aria-label="Rooms"
              className="bg-transparent font-poppins text-lg font-semibold text-[#1d1d1d] outline-none"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{`${n} Room${n > 1 ? "s" : ""}`}</option>
              ))}
            </select>
          </span>
        </label>

        <label className={`${FIELD} shrink-0`}>
          <Image
            src={guestIcon}
            alt="guests"
            width={48}
            height={48}
            className={ICON}
          />
          <span className="flex flex-col items-center">
            <span className="font-poppins text-[10px] font-bold uppercase tracking-wide text-[#0496FF]">
              Guests
            </span>
            <select
              aria-label="Guests"
              className="bg-transparent font-poppins text-lg font-semibold text-[#1d1d1d] outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n}>{`${n} Adult${n > 1 ? "s" : ""}`}</option>
              ))}
            </select>
          </span>
        </label>

        <button
          type="button"
          className={`${FIELD} shrink-0 transition hover:scale-[1.03]`}
        >
          <Image
            src={starIcon}
            alt=""
            width={48}
            height={48}
            className={ICON}
          />
          <span className="font-TimesNewRoman text-lg font-bold text-[#CB9E33]">
            View Rates
          </span>
        </button>
      </div>
    </div>
  );
};

export default HotelSearchBar;
