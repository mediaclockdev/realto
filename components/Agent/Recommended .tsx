import React from "react";
import Image from "next/image";
import Link from "next/link";
import phoneIcon from "@/public/mobileicon.svg";
import mailIcon from "@/public/mailicon.svg";
import locationIcon from "@/public/location.svg";
import starSingle from "@/public/starsingle.svg";
import type { RecommendedAgent } from "@/lib/agents/types";
import { Satisfy } from "next/font/google";

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface RecommendedProps {
  agents: RecommendedAgent[];
}

function RecommendedCard({ agent }: { agent: RecommendedAgent }) {
  if (agent.cardVariant === "framed") {
    return (
      <article className="relative h-[250px] min-w-[300px] shrink-0 overflow-hidden rounded-[18px] border border-gray-200 bg-[#f6f1eb] shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:min-w-[380px] lg:min-w-[460px]">
        {/* Pre-cropped image — left side */}
        <div className="absolute inset-y-0 left-0 w-[59%]">
          <Image
            src={agent.avatar}
            alt={agent.name}
            fill
            className="object-contain object-left"
          />
        </div>

        {/* Right content */}
        <div className="relative z-10 ml-[50%] flex h-full flex-col justify-center px-4 py-6 text-[#232323]">
          <h3 className={`${satisfy.className} font-normal text-sm`}>
            {agent.name}
          </h3>
          <div className="mt-4 space-y-2 text-[12px] sm:text-[13px]">
            <div className="flex items-center gap-2">
              <Image src={phoneIcon} alt="" width={14} height={14} />
              <span className="font-poppins text-xs">{agent.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={mailIcon} alt="" width={14} height={14} />
              <span className="font-poppins text-xs">{agent.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={locationIcon} alt="" width={14} height={14} />
              <span className="font-poppins text-xs">{agent.location}</span>
            </div>
          </div>
          <p className="mt-4  font-semibold text-xs">
            License No. - {agent.licenseNumber}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5 text-[13px] sm:text-[14px]">
            <Image src={starSingle} alt="" width={16} height={16} />
            <span className="font-semibold font-poppins text-xs ">
              {agent.rating}
            </span>
            <span className="text-[#4b5563] font-poppins text-xs">
              ({agent.reviewCount} reviews)
            </span>
          </div>
          <div className="absolute inset-0 z-0 opacity-40">
            <Image src={agent.bgimg} fill className="object-cover" alt="" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="relative h-[250px] min-w-[300px] shrink-0 overflow-hidden rounded-[18px] border-2 border-red-500 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:min-w-[380px] lg:min-w-[460px]">
      {/* Pre-cropped image — left side */}
      <div className="absolute inset-y-0 left-0 w-[55%]">
        <Image
          src={agent.avatar}
          alt={agent.name}
          fill
          className="object-contain object-left"
        />
      </div>

      {/* Right content */}
      <div className="relative z-10 ml-[52%] flex h-full flex-col justify-center px-4 py-6 text-[#2f2f2f]">
        <h3 className="font-poppins font-semibold italic text-sm">
          {agent.name}
        </h3>
        <div className="mt-4 space-y-2 text-[12px] sm:text-[14px]">
          <div className="flex items-center gap-2">
            <Image src={phoneIcon} alt="" width={14} height={14} />
            <span className="font-poppins text-xs">{agent.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={mailIcon} alt="" width={14} height={14} />
            <span className="font-poppins text-xs">{agent.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={locationIcon} alt="" width={14} height={14} />
            <span className="font-poppins text-xs">{agent.location}</span>
          </div>
        </div>
        <p className="mt-4 text-xs font-semibold">
          License No. - {agent.licenseNumber}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5 text-[13px] sm:text-[15px]">
          <Image src={starSingle} alt="" width={16} height={16} />
          <span className="font-semibold font-poppins text-xs">
            {agent.rating}
          </span>
          <span className="text-[#4b5563] font-poppins text-xs">
            ({agent.reviewCount} reviews)
          </span>
        </div>
      </div>
    </article>
  );
}

const Recommended = ({ agents }: RecommendedProps) => {
  if (!agents.length) return null;

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-black font-poppins text-xl font-semibold sm:text-2xl">
          Recommended
        </h2>
        <Link
          href="/agentspage"
          className="text-base font-medium text-[#0b8fe5] underline-offset-2 hover:underline sm:text-lg"
        >
          View all
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:gap-6">
        {agents.map((agent) => (
          <RecommendedCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
