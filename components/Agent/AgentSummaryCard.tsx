import Image from "next/image";
import Link from "next/link";
import { Satisfy } from "next/font/google";
import phoneIcon from "@/public/mobileicon.svg";
import mailIcon from "@/public/mailicon.svg";
import locationIcon from "@/public/location.svg";
import starSingle from "@/public/starsingle.svg";
import type { AgentSummary } from "@/lib/agents/types";

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface AgentSummaryCardProps {
  agent: AgentSummary;
  className?: string;
}

const accentBorderClasses: Record<AgentSummary["accent"], string> = {
  red: "border-red-500",
  gold: "border-[#E5C94C]",
  blue: "border-[#3856A5]",
};

export default function AgentSummaryCard({
  agent,
  className = "",
}: AgentSummaryCardProps) {
  const href = `/agents/${agent.slug}`;

  if (agent.cardVariant === "framed") {
    return (
      <Link
        href={href}
        className={`relative block h-[190px] overflow-hidden rounded-[18px] border border-gray-200 bg-[#f6f1eb] shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform hover:scale-[1.01] ${className}`}
      >
        <div className="absolute inset-y-0 left-0 w-[40%] overflow-hidden">
          <Image
            src={agent.avatar}
            alt={agent.name}
            fill
            className="object-cover object-left"
          />
        </div>
        <div className="absolute inset-0 opacity-45">
          <Image
            src={agent.backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 ml-[42%] flex h-full flex-col justify-center px-4 py-5 text-[#232323]">
          <h3 className={`${satisfy.className} text-lg`}>{agent.name}</h3>
          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <Image src={phoneIcon} alt="" width={14} height={14} />
              <span>{agent.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={mailIcon} alt="" width={14} height={14} />
              <span>{agent.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={locationIcon} alt="" width={14} height={14} />
              <span>{agent.location}</span>
            </div>
          </div>
          <p className="mt-3 text-xs font-semibold">
            License No. - {agent.licenseNumber}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs">
            <Image src={starSingle} alt="" width={16} height={16} />
            <span className="font-semibold">{agent.rating}</span>
            <span className="text-[#4b5563]">({agent.reviewCount} reviews)</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`relative block h-[190px] overflow-hidden rounded-[18px] border-2 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform hover:scale-[1.01] ${accentBorderClasses[agent.accent]} ${className}`}
    >
      <div className="absolute inset-y-0 left-0 w-[48%] overflow-hidden">
        <Image
          src={agent.avatar}
          alt={agent.name}
          fill
          className="object-cover object-left"
        />
      </div>
      <div
        className="absolute inset-y-0 left-[42%] w-[18%] bg-white"
        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
      />
      <div className="relative z-10 ml-[50%] flex h-full flex-col justify-center px-4 py-5 text-[#2f2f2f]">
        <h3 className="font-poppins text-lg font-semibold italic">{agent.name}</h3>
        <div className="mt-3 space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <Image src={phoneIcon} alt="" width={14} height={14} />
            <span>{agent.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={mailIcon} alt="" width={14} height={14} />
            <span>{agent.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={locationIcon} alt="" width={14} height={14} />
            <span>{agent.location}</span>
          </div>
        </div>
        <p className="mt-3 text-xs font-semibold">
          License No. - {agent.licenseNumber}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs">
          <Image src={starSingle} alt="" width={16} height={16} />
          <span className="font-semibold">{agent.rating}</span>
          <span className="text-[#4b5563]">({agent.reviewCount} reviews)</span>
        </div>
      </div>
    </Link>
  );
}
