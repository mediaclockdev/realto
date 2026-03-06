"use client";

import React from "react";
import { Search, FileText, Home } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Discover & Finalise",
    description: "Choose from a plethora of verified student home listings",
    icon: Search,
  },
  {
    number: 2,
    title: "Get your paperwork done",
    description: "Paperwork's on us, no need to fuss.",
    icon: FileText,
  },
  {
    number: 3,
    title: "Accommodation Booked!",
    description: "Relax, pack your bags, and unravel a new life chapter!",
    icon: Home,
  },
];

export default function BookingSteps() {
  return (
    <div className="bg-gray-50">
      <section className="max-w-screen-2xl mx-auto px-10 py-8">
        <h2 className="text-[32px] font-extrabold text-gray-900 mb-8">
          Book your accommodation in 3 easy steps
        </h2>

        <div className="flex flex-col md:flex-row items-center">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Card with number circle on left border */}
              <div className="relative flex-1">
                {/* Number circle - centered on left border */}
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[#909090] flex items-center justify-center text-xl font-bold text-black  z-10 drop-shadow-black">
                  {step.number}
                </div>

                {/* Card */}
                <div className="relative bg-white border border-[#909090] rounded-2xl pl-10 pr-6 py-6 min-h-[140px] flex flex-col justify-center">
                  <step.icon
                    className="absolute top-5 right-5 w-9 h-9 text-gray-900"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-xl font-semibold text-black mb-1 max-w-[200px]">
                    {step.title}
                  </h3>
                  <p className="text-base text-[#343434] leading-snug max-w-[300px]">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Dashed connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block w-16 shrink-0 border-t border-dashed border-[#909090]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
