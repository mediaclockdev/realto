import Image from "next/image";
import Link from "next/link";
import { Satisfy } from "next/font/google";
import phoneIcon from "@/public/mobileicon.svg";
import mailIcon from "@/public/mailicon.svg";
import locationIcon from "@/public/location.svg";
import starSingle from "@/public/starsingle.svg";
import type { AgentSummary } from "@/lib/agents/types";
import whatsapp from "@/public/whatsapp.svg";
import facebook from "../../public/logos_facebook.svg";
import instagram from "../../public/logos_instagram.svg";
import sms from "../../public/smslogo.svg";

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

        <div className="relative h-full w-[45%] lg:w-[200px] group">
          <svg
            viewBox="0 0 200 190"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id={`clipCurve-${agent.id}`}>
                <path d="M0,0 H130 Q200,95 130,190 H0 Z" />
              </clipPath>
            </defs>

            {/* Base Image */}
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
              className="transition-opacity duration-300 group-hover:opacity-0"
            />

            {/* 🔴 Hover Layer (inside SVG) */}
            <g
              clipPath={`url(#clipCurve-${agent.id})`}
              className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              {/* Red Background */}
              <rect width="100%" height="100%" fill="#E31E24" />

              {/* Logo Image */}
              <image
                href={
                  typeof agent.agencyLogo === "string"
                    ? agent.agencyLogo
                    : agent.agencyLogo.src
                }
                x="50%"
                y="50%"
                width="220"
                height="60"
                transform="translate(-120,-30)"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>

            {/* Border */}
            <path
              d="M140,0 Q210,95 140,190"
              stroke="black"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </div>

        <div className="absolute left-[45%] lg:left-[48%] top-0 z-10 flex h-full w-[55%] lg:w-[calc(100%-200px)] flex-col justify-center px-6 text-[#343434]">
          <h3 className="font-poppins text-sm lg:text-lg font-semibold italic">
            {agent.name}
          </h3>

          <div className="mt-3 space-y-0.5 lg:space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <Image src={phoneIcon} alt="" width={20} height={20} />
              <span className="truncate">{agent.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={mailIcon} alt="" width={20} height={20} />
              <span className="truncate">{agent.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={locationIcon} alt="" width={20} height={20} />
              <span className="truncate">{agent.location}</span>
            </div>
          </div>

          <p className="mt-3 text-xs font-semibold truncate">
            License No. - {agent.licenseNumber}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[14px]">
            <span className="text-yellow-500 text-[16px]">★</span>
            <span className="font-semibold">{agent.rating}</span>
            <span className="text-gray-600">({agent.reviewCount} reviews)</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`relative block h-[190px] overflow-hidden rounded-[18px] border-2 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform  ${accentBorderClasses[agent.accent]} ${className}`}
    >
      <div className="absolute inset-y-0 left-0 w-[50%] group">
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 72% 0, 96% 50%, 72% 100%, 0 100%)",
          }}
        >
          {/* Default Image */}
          <Image
            src={agent.avatar}
            alt={agent.name}
            fill
            className="object-cover object-top transition-opacity duration-300 group-hover:opacity-0 ml-[-4px]"
          />

          {/* 🔴 Hover Red Panel */}
          <div className="absolute inset-0 bg-[#E31E24] flex flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {/* Logo */}
            <div className="">
              <Image
                src={agent.agencyLogo}
                alt={agent.name}
                className="object-contain object-center w-full h-full mt-[16px] ml-[-14px]"
              />
            </div>

            {/* Social Icons */}
            <div className="flex gap-1 ml-[-14px]">
              <div className="w-10 h-10   flex items-center justify-center">
                <Image src={whatsapp} alt="WhatsApp" width={22} height={22} />
              </div>
              <div className="w-10 h-10   flex items-center justify-center">
                <Image src={instagram} alt="Instagram" width={22} height={22} />
              </div>
              <div className="w-10 h-10  flex items-center justify-center">
                <Image src={facebook} alt="Facebook" width={22} height={22} />
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src={sms} alt="SMS" width={22} height={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Border line */}
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

      <div className="relative z-10 ml-[45%] lg:ml-[50%] flex h-full flex-col justify-center px-4 py-5 text-[#2f2f2f]">
        <h3 className="font-poppins text-sm lg:text-lg font-semibold italic">
          {agent.name}
        </h3>
        <div className="mt-3 space-y-0.5 lg:space-y-1.5 text-xs">
          <div className="flex items-center gap-1 lg:gap-2">
            <Image src={phoneIcon} alt="" width={20} height={20} />
            <span>{agent.phone}</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <Image src={mailIcon} alt="" width={20} height={20} />
            <span>{agent.email}</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <Image src={locationIcon} alt="" width={20} height={20} />
            <span>{agent.location}</span>
          </div>
        </div>
        <p className="mt-3 text-xs font-semibold truncate">
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
