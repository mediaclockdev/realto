import Image from "next/image";
import Link from "next/link";
import type { AgentSummary } from "@/lib/agents/types";
// glass background
import glassBackground from "@/public/glasseffectagent.svg";
// agency logo icon
import anzLogo from "@/public/raywhite1.svg";
// portrait photo
import portrait from "@/public/recommendagent1.jpg";
// language flag icons
import frenchFlag from "@/public/Franceflag1.svg";
import chinaFlag from "@/public/chinaflag1.svg";
import spainFlag from "@/public/spain1.svg";
// contact icons (phone / mail / location)
import phoneIcon from "@/public/mobileicon.svg";
import mailIcon from "@/public/agentemail.svg";
import locationIcon from "@/public/agentlocation.svg";
// social icons
import instagram from "@/public/logos_instagram.svg";
import linkedin from "@/public/logos_linkedin.svg";
import facebook from "@/public/logos_facebook.svg";
import snapchat from "@/public/snapchat.svg";
import wechat from "@/public/wechat.svg";
import xLogo from "@/public/xiconhotel.svg";
import youtube from "@/public/logos_youtube-icon.svg";
// rating star icon
import star from "@/public/star.svg";
// share (refresh-style) icon
import shareGold from "@/public/shareiconagent.svg";
// like (heart) icon
import heart from "@/public/likeiconagent.svg";

const socials = [
  { src: instagram, alt: "Instagram" },
  { src: linkedin, alt: "LinkedIn" },
  { src: facebook, alt: "Facebook" },
  { src: snapchat, alt: "Snapchat" },
  { src: wechat, alt: "WeChat" },
];

// ponytail: agent prop accepted but content is hardcoded per design; wire agent data in when real data is ready
export default function AgentSummaryCard({
  agent,
  className = "",
}: {
  agent?: AgentSummary;
  className?: string;
}) {
  return (
    <Link
      href={agent ? `/agents/${agent.slug}` : "/agents"}
      className={`relative block shrink-0 overflow-hidden rounded-[28px] p-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] ${className}`}
    >
      {/* glass background — portrait svg matches the card shape */}
      <Image src={glassBackground} alt="" fill className="object-cover" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[20px]">
        {/* Portrait */}
        <div className="relative h-[240px] lg:h-[250px] w-full">
          <Image
            src={portrait}
            alt="John Citizen"
            fill
            className="object-cover object-top"
          />
          {/* ANZ agency badge */}
          <div className="absolute left-4 top-3">
            <Image src={anzLogo} alt="ANZ" width={70} height={28} />
          </div>
        </div>

        {/* Details */}
        {/* details sit directly on the glass background */}
        <div className="flex flex-1 flex-col justify-between gap-1 px-5 py-3 lg:px-3 lg:py-3">
          {/* Name + language flags */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-poppins text-lg lg:text-2xl font-bold text-[#123C63] whitespace-nowrap">
              John Citizen
            </h3>
            {/* French flag */}
            <Image src={frenchFlag} alt="French" width={35} height={25} />
            {/* Chinese flag */}
            <Image src={chinaFlag} alt="Chinese" width={35} height={25} />
            {/* Spanish flag */}
            <Image src={spainFlag} alt="Spanish" width={35} height={25} />
          </div>

          <div className="space-y-1.5 lg:space-y-2 text-xs lg:text-base font-semibold text-[#123C63]">
            <div className="flex items-center gap-3">
              {/* phone icon */}
              <Image src={phoneIcon} alt="Phone" width={18} height={18} />
              <span>+9999999999</span>
            </div>
            <div className="flex items-center gap-3">
              {/* mail icon */}
              <Image src={mailIcon} alt="Email" width={30} height={20} />
              <span>john@commonwealth</span>
            </div>
            <div className="flex items-center gap-3">
              {/* location icon */}
              <Image src={locationIcon} alt="Location" width={26} height={26} />
              <span>500 Alex st, Sydney</span>
            </div>
          </div>

          <div className="space-y-3 mt-2">
            {/* Social icons row */}
            <div className="flex items-center gap-1.5 lg:gap-2">
              {socials.map((social) => (
                <Image
                  key={social.alt}
                  src={social.src}
                  alt={social.alt}
                  width={30}
                  height={30}
                  className="h-6 w-6 lg:h-8 lg:w-8"
                />
              ))}
            </div>

            {/* Stars + share + like */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1">
                {/* gold rating stars */}

                <Image
                  src={star}
                  alt="Star"
                  width={26}
                  height={26}
                  className="h-6 w-6 lg:h-8 lg:w-28"
                />
              </div>
              <div className="flex items-center gap-2">
                {/* share/refresh icon */}
                <Image
                  src={shareGold}
                  alt="Share"
                  width={26}
                  height={26}
                  className="h-5 w-5 lg:h-7 lg:w-7"
                />
                {/* heart/like icon */}
                <Image
                  src={heart}
                  alt="Like"
                  width={26}
                  height={26}
                  className="h-5 w-5 lg:h-7 lg:w-7"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
