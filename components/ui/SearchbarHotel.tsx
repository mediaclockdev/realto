"use client";

import React, { useState } from "react";
import Image from "next/image";
import locationIcon from "../../public/location.svg";
import calendarIcon from "../../public/calender.svg";
import searchIcon from "../../public/iconsearchwhite.svg";
import Counteries from "./Counteries";

const SearchBarHotel = () => {
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const locationLabel = "Where are you going?";
  const dateLabel = "Check in – Check out";
  const guestLabel = "2 Adults • 0 Children • 1 Room";

  return (
    <>
      <div className="absolute bottom-5 left-1/2 z-10 hidden w-[85%] max-w-[800px] -translate-x-1/2 md:block">
        <div className="flex flex-wrap items-center gap-3 rounded-[10px] border border-white/30 bg-[#FFFFFF80] px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-sm md:gap-5">
          <div className="flex flex-wrap items-center gap-2 text-black">
            <div
              onClick={() => setIsCountriesOpen((prev) => !prev)}
              className="flex cursor-pointer items-center gap-1"
            >
              <Image src={locationIcon} alt="location" width={22} height={22} />
              <p className="font-poppins text-xs font-normal lg:text-base">
                {locationLabel}
              </p>
            </div>

            <div className="flex cursor-pointer items-center gap-1">
              <Image src={calendarIcon} alt="calendar" width={22} height={22} />
              <p className="font-poppins text-xs font-normal lg:text-base">
                {dateLabel}
              </p>
            </div>

            <span className="hidden text-gray-600 md:block">•</span>

            <p className="font-poppins text-xs font-normal lg:text-base">
              2 Adults
            </p>

            <span className="hidden text-gray-600 md:block">•</span>

            <p className="font-poppins text-xs font-normal lg:text-base">
              0 Children
            </p>

            <span className="hidden text-gray-600 md:block">•</span>

            <p className="font-poppins text-xs font-normal lg:text-base">
              1 Room
            </p>
          </div>

          <button className="h-12 w-16 transition hover:scale-105">
            <Image src={searchIcon} alt="search" width={42} height={42} />
          </button>
        </div>

        {isCountriesOpen && (
          <div className="absolute bottom-[110%] left-1/2 w-full max-w-3xl -translate-x-1/2 rounded-xl bg-white p-3 shadow-2xl">
            <Counteries />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsMobileSearchOpen(true)}
        className="absolute bottom-4 left-1/2 z-20 w-[92%] -translate-x-1/2 rounded-2xl border border-white/30 bg-white/80 px-4 py-3 text-left shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-md md:hidden"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-poppins text-sm font-semibold text-[#1d1d1d]">
              {locationLabel}
            </p>
            <p className="font-poppins text-xs text-[#4b4b4b]">{dateLabel}</p>
            <p className="font-poppins text-xs text-[#4b4b4b]">{guestLabel}</p>
          </div>
          <Image src={searchIcon} alt="search" width={38} height={38} />
        </div>
      </button>

      {isMobileSearchOpen && (
        <>
          <button
            type="button"
            aria-label="Close mobile hotel search"
            onClick={() => {
              setIsMobileSearchOpen(false);
              setIsCountriesOpen(false);
            }}
            className="fixed inset-0 z-40 bg-black/45 md:hidden"
          />

          <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-white px-5 pb-6 pt-4 shadow-[0_-18px_40px_rgba(0,0,0,0.22)] md:hidden">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-poppins text-lg font-semibold text-[#1d1d1d]">
                Search stays
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsMobileSearchOpen(false);
                  setIsCountriesOpen(false);
                }}
                className="rounded-full p-2 text-xl leading-none text-[#1d1d1d]"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsCountriesOpen((prev) => !prev)}
                className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 px-4 py-4 text-left"
              >
                <Image
                  src={locationIcon}
                  alt="location"
                  width={22}
                  height={22}
                />
                <div>
                  <p className="text-sm font-semibold text-[#1d1d1d]">
                    Destination
                  </p>
                  <p className="text-xs text-gray-500">{locationLabel}</p>
                </div>
              </button>

              {isCountriesOpen && (
                <div className="rounded-2xl bg-[#f5f5f5] p-3 shadow-inner">
                  <Counteries />
                </div>
              )}

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 px-4 py-4 text-left"
              >
                <Image
                  src={calendarIcon}
                  alt="calendar"
                  width={22}
                  height={22}
                />
                <div>
                  <p className="text-sm font-semibold text-[#1d1d1d]">Dates</p>
                  <p className="text-xs text-gray-500">{dateLabel}</p>
                </div>
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 px-4 py-4 text-left"
              >
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#0f172a] text-[10px] font-semibold text-white">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1d1d1d]">
                    Guests and rooms
                  </p>
                  <p className="text-xs text-gray-500">{guestLabel}</p>
                </div>
              </button>
            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#111111] px-4 py-4 text-sm font-semibold text-white transition hover:bg-[#222222]">
              <Image src={searchIcon} alt="search" width={22} height={22} />
              Search Hotels
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SearchBarHotel;
