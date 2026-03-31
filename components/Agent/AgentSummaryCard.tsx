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

const accentStrokeColors: Record<AgentSummary["accent"], string> = {
  red: "#ef4444",
  gold: "#E5C94C",
  blue: "#3856A5",
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
        className={`relative block h-[190px] overflow-hidden rounded-[10px] border border-[#e5e5e5] bg-[#f3f3f3] shadow-md ${className}`}
      >
        <div className="absolute inset-0 opacity-30">
          <Image
            src={agent.backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-full w-[200px]">
          <svg
            viewBox="0 0 200 190"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id={`clipCurve-${agent.id}`}>
                <path d="M0,0 H130 Q200,95 130,190 H0 Z" />
              </clipPath>
            </defs>

            <image
              href={
                typeof agent.avatar === "string"
                  ? agent.avatar
                  : agent.avatar.src
              }
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#clipCurve-${agent.id})`}
            />
          </svg>

          <svg
            viewBox="0 0 200 190"
            className="absolute inset-0 h-full w-full pointer-events-none"
          >
            <path
              d="M140,0 Q210,95 140,190"
              stroke="black"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </div>

        <div className="absolute left-[48%] top-0 z-10 flex h-full w-[calc(100%-200px)] flex-col justify-center px-6 text-[#333]">
          <h3
            className={`${satisfy.className} text-[22px] text-[#4b4b4b] mb-3`}
          >
            {agent.name}
          </h3>

          <div className="space-y-2 text-[14px]">
            <div className="flex items-center gap-2">
              <Image src={phoneIcon} alt="" width={16} height={16} />
              <span>{agent.phone}</span>
            </div>

            <div className="flex items-center gap-2">
              <Image src={mailIcon} alt="" width={16} height={16} />
              <span>{agent.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <Image src={locationIcon} alt="" width={16} height={16} />
              <span>{agent.location}</span>
            </div>
          </div>

          <p className="mt-3 text-[14px] font-semibold">
            License No. - {agent.licenseNumber}
          </p>

          <div className="mt-2 flex items-center gap-1 text-[14px]">
            <span className="text-yellow-500 text-[16px]">★</span>
            <span className="font-semibold">{agent.rating}</span>
            <span className="text-gray-600">
              ({agent.reviewCount} reviews)
            </span>
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
      <div className="absolute inset-y-0 left-0 w-[50%]">
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 72% 0, 96% 50%, 72% 100%, 0 100%)",
          }}
        >
          <Image
            src={agent.avatar}
            alt={agent.name}
            fill
            className="object-cover object-top"
          />
        </div>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            points="72,0 96,50 72,100"
            fill="none"
            stroke={accentStrokeColors[agent.accent]}
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="relative z-10 ml-[50%] flex h-full flex-col justify-center px-4 py-5 text-[#2f2f2f]">
        <h3 className="font-poppins text-lg font-semibold italic">
          {agent.name}
        </h3>
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
