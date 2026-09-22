"use client";

import React, { useState } from "react";

type Option = { label: string; note?: string; count?: number };

const GROUPS: { title: string; options: Option[] }[] = [
  {
    title: "Popular Filters",
    options: [
      { label: "Hotels", count: 236 },
      { label: "Apartments", count: 408 },
      { label: "Private Bathrooms", count: 67 },
      { label: "5 Stars", count: 63 },
      { label: "Very Good 8+", note: "Based On Guest Reviews", count: 300 },
      { label: "Swimming Pool", count: 150 },
      { label: "Kitchen", count: 345 },
      { label: "Breakfast Included", count: 114 },
    ],
  },
  {
    title: "Property Type",
    options: [
      { label: "Hotels", note: "Including hotels,resorts and more" },
      { label: "Homes & apts", note: "Including homes,apartments,villas and more" },
      { label: "Hostels", note: "Including hostels,inns and more" },
    ],
  },
  {
    title: "Facilities",
    options: [
      { label: "Parking", count: 540 },
      { label: "Swimming Pool", count: 139 },
      { label: "Beachfront", count: 28 },
      { label: "Free WiFi", count: 733 },
      { label: "Fitness Center", count: 112 },
    ],
  },
  {
    title: "Brands",
    options: [
      "Meriton Suits",
      "Belvilla",
      "Adina",
      "Quest Apartment Hotels",
      "Mecure",
      "Pullman Hotels and Resorts",
      "Rydges",
      "Ibis Budget",
      "Urban Rest",
      "Novotel",
    ].map((label) => ({ label, count: 67 })),
  },
  {
    title: "Hotel rating",
    options: [2, 3, 4, 5].map((n) => ({ label: `${n} stars`, count: 67 })),
  },
  {
    title: "Property Accessibility",
    options: [
      { label: "Auditory guidance", count: 540 },
      { label: "Visual aids (tactile signs)", count: 139 },
      { label: "Visual aids (Braille)", count: 28 },
      { label: "Toilet with grab rails", count: 733 },
      { label: "Bathroom emergency cord", count: 112 },
      { label: "Raised toilet", count: 112 },
      { label: "Lowered sink", count: 112 },
    ],
  },
  {
    title: "Room facilities",
    options: [
      { label: "Private bathroom", count: 67 },
      { label: "Air conditioning", count: 67 },
      { label: "Balcony", count: 67 },
      { label: "Private pool", count: 67 },
      { label: "Kitchen/Kitchenette", count: 67 },
    ],
  },
  {
    title: "Booking Policy",
    options: [{ label: "Instant Confirmation" }, { label: "Free Cancellation" }],
  },
];

const MAX_BUDGET = 800;

const Chevron = () => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    className="size-5 shrink-0 text-[#0496FF] transition-transform duration-200 group-open:rotate-180"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const Panel = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  // name= makes the dropdowns mutually exclusive natively — opening one closes the rest
  <details name="hotel-filters" className="group relative">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-full border border-gray-100 bg-gradient-to-b from-white to-gray-50 px-4 py-2.5 shadow-[0_4px_10px_-4px_rgba(0,0,0,0.3)] transition-shadow hover:shadow-[0_6px_14px_-4px_rgba(0,0,0,0.35)] lg:rounded-lg lg:bg-white lg:bg-none">
      <span className="whitespace-nowrap font-poppins text-sm font-bold text-[#0496FF]">
        {title}
      </span>
      <Chevron />
    </summary>
    {/* inline accordion on mobile, floating dropdown from lg up */}
    <div className="mt-2 w-full rounded-xl bg-white px-4 py-3 lg:absolute lg:left-0 lg:top-full lg:z-30 lg:max-h-80 lg:w-72 lg:overflow-y-auto lg:border lg:border-gray-100 lg:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.35)]">
      {children}
    </div>
  </details>
);

const CheckRow = ({ option }: { option: Option }) => (
  <label className="flex cursor-pointer items-start gap-2 py-1.5">
    <input type="checkbox" name={option.label} className="peer sr-only" />
    <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full border-2 border-gray-300 bg-white text-[11px] font-bold text-transparent peer-checked:border-[#22C55E] peer-checked:bg-[#22C55E] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#0496FF]">
      ✓
    </span>
    <span className="min-w-0 flex-1">
      <span className="block font-TimesNewRoman text-sm font-bold text-[#1d1d1d]">
        {option.label}
      </span>
      {option.note && (
        <span className="block font-TimesNewRoman text-xs italic text-gray-500">
          {option.note}
        </span>
      )}
    </span>
    {option.count !== undefined && (
      <span className="shrink-0 font-TimesNewRoman text-sm text-gray-500">
        ({option.count})
      </span>
    )}
  </label>
);

const HotelFilterBar = ({ className = "" }: { className?: string }) => {
  const [budget, setBudget] = useState(MAX_BUDGET);

  return (
    <form
      onReset={() => setBudget(MAX_BUDGET)}
      className={`w-full rounded-2xl bg-white p-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)] ${className}`}
    >
      {/* stacked "Filter By" panel on mobile; the pill bar takes over from lg */}
      <div className="mb-3 flex items-center justify-between px-1 lg:hidden">
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="size-6 shrink-0">
            <path d="M3 4h18l-7 8v7l-4 2v-9z" fill="#0496FF" />
          </svg>
          <span className="font-TimesNewRoman text-lg font-bold text-[#1d1d1d]">
            Filter By
          </span>
        </span>
        <button
          type="reset"
          aria-label="Reset filters"
          className="text-[#CB9E33] transition-transform hover:rotate-180"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-5"
          >
            <path d="M20 11a8 8 0 1 0-2.3 5.7" />
            <path d="M20 4v7h-7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Panel title="Your Budget">
          <p className="font-TimesNewRoman text-sm font-bold text-[#1d1d1d]">
            AUD 20 – AUD {budget}
            {budget === MAX_BUDGET && "+"}
          </p>
          {/* ponytail: single-thumb range; swap for a dual-thumb slider only if a min price is actually needed */}
          <input
            type="range"
            min={20}
            max={MAX_BUDGET}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            aria-label="Maximum budget"
            className="mt-2 w-full accent-[#0496FF]"
          />
        </Panel>

        {GROUPS.map((group) => (
          <Panel key={group.title} title={group.title}>
            {group.options.map((option) => (
              <CheckRow key={option.label} option={option} />
            ))}
          </Panel>
        ))}
      </div>

      <button
        type="reset"
        className="mt-3 hidden font-poppins text-xs font-semibold text-[#CB9E33] hover:underline lg:block"
      >
        Reset filters
      </button>
    </form>
  );
};

export default HotelFilterBar;
