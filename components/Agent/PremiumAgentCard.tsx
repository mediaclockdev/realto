import Image from "next/image";
// glass background (closest asset to "glassbackground")
import glassBackground from "@/public/glasseffect.svg";
// agency logo icon
import raywhite from "@/public/raywhite.svg";
// portrait photo
import portrait from "@/public/recommendagent1.jpg";
// language flag icons
import frenchFlag from "@/public/Franceflag.svg";
import chinaFlag from "@/public/chinaflag.svg";
import spainFlag from "@/public/spain.svg";
// contact icons (phone / mail / location)
import phoneIcon from "@/public/phone.svg";
import mailIcon from "@/public/mail.svg";
import locationIcon from "@/public/locationiconluxurybuy.svg";
// social icons
import whatsapp from "@/public/whatsapp.svg";
import instagram from "@/public/logos_instagram.svg";
import tiktok from "@/public/tiktok.svg";
import snapchat from "@/public/snapchat.svg";
import linkedin from "@/public/logos_linkedin.svg";
// rating star icon
import star from "@/public/star.svg";
// share (refresh-style) icon
import shareGold from "@/public/sharegold.svg";
// like (heart) icon
import heart from "@/public/luxuryliked.svg";

const socials = [
  { src: whatsapp, alt: "WhatsApp" },
  { src: instagram, alt: "Instagram" },
  { src: tiktok, alt: "TikTok" },
  { src: snapchat, alt: "Snapchat" },
  { src: linkedin, alt: "LinkedIn" },
];

export default function PremiumAgentCard({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[24px] p-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] ${className}`}
    >
      {/* glass background */}
      <Image
        src={glassBackground}
        alt=""
        fill
        className="object-cover"
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[16px]">
        {/* Portrait */}
        <div className="relative h-[240px] lg:h-[300px] w-full">
          <Image
            src={portrait}
            alt="John Citizen"
            fill
            className="object-cover object-top"
          />
          {/* RayWhite agency badge */}
          <div className="absolute left-4 top-4 rounded-md bg-[#FFE512] px-3 py-1.5 shadow">
            <Image src={raywhite} alt="RayWhite" width={80} height={20} />
          </div>
          {/* language flags stacked on the left */}
          <div className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col gap-3 mt-4">
            {/* French flag */}
            <Image src={frenchFlag} alt="French" width={44} height={30} className="rounded shadow" />
            {/* Chinese flag */}
            <Image src={chinaFlag} alt="Chinese" width={44} height={30} className="rounded shadow" />
            {/* Spanish flag */}
            <Image src={spainFlag} alt="Spanish" width={44} height={30} className="rounded shadow" />
          </div>
        </div>

        {/* Details on glass */}
        <div className="flex flex-1 flex-col justify-between gap-2 bg-white/40 px-5 py-3 backdrop-blur-sm lg:px-6 lg:py-4">
          <h3 className="font-poppins text-lg lg:text-2xl font-bold text-[#111111]">
            John Citizen
          </h3>

          <div className="space-y-1 lg:space-y-2.5 text-xs lg:text-base font-semibold text-[#111111]">
            <div className="flex items-center gap-3">
              {/* phone icon */}
              <Image src={phoneIcon} alt="Phone" width={18} height={18} />
              <span>+9999999999</span>
            </div>
            <div className="flex items-center gap-3">
              {/* mail icon */}
              <Image src={mailIcon} alt="Email" width={18} height={18} />
              <span>john@commonwealth</span>
            </div>
            <div className="flex items-center gap-3">
              {/* location icon */}
              <Image src={locationIcon} alt="Location" width={18} height={18} />
              <span>500 Alex st, Sydney</span>
            </div>
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-1.5 lg:gap-2">
            {socials.map((social) => (
              <Image
                key={social.alt}
                src={social.src}
                alt={social.alt}
                width={30}
                height={30}
                className="h-7 w-7 lg:h-8 lg:w-8"
              />
            ))}
          </div>

          {/* Stars pill + share/like pill */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 rounded-full border border-[#c9c9c9] bg-white/60 px-3 py-1">
              {/* gold rating stars */}
              {Array.from({ length: 5 }).map((_, i) => (
                <Image key={i} src={star} alt="Star" width={22} height={22} className="h-5 w-5 lg:h-6 lg:w-6" />
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#c9c9c9] bg-white/60 px-3 py-1">
              {/* share/refresh icon */}
              <Image src={shareGold} alt="Share" width={22} height={22} className="h-5 w-5 lg:h-6 lg:w-6" />
              {/* heart/like icon */}
              <Image src={heart} alt="Like" width={22} height={22} className="h-5 w-5 lg:h-6 lg:w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
