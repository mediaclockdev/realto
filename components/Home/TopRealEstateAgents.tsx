import Image, { StaticImageData } from "next/image";
// import AgentCarousel, { Agent } from "@/components/ui/AgentCarousel";
import { agentsCatalog } from "@/lib/agents/mock-data";
import heading from "@/public/homepageheadingicons/realestateagent.svg";
import raywhite from "@/public/raywhite.svg";
import glass from "@/public/agentglassbg.svg";
import locationPin from "@/public/agentlocation.svg";
import callIcon from "@/public/agentphoneicon.svg";
import emailIcon from "@/public/agentmailicon.svg";
import likeIcon from "@/public/likeiconagent.svg";
import shareIcon from "@/public/shareiconagent.svg";
import instagram from "@/public/logos_instagram.svg";
import facebook from "@/public/logos_facebook.svg";
import linkedin from "@/public/logos_linkedin.svg";
import snapchat from "@/public/snapchat.svg";
import youtube from "@/public/logos_youtube-icon.svg";
import x from "@/public/xiconhotel.svg";
const socials = [instagram, facebook, linkedin, snapchat, youtube, x];

function AgentBusinessCard({
  name,
  role,
  location,
  phone,
  email,
  image,
}: {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  image: StaticImageData;
}) {
  return (
    <div className="relative mx-auto flex w-[450px] shrink-0 rounded-3xl p-2 shadow-[0_12px_24px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(255,255,255,1),inset_0_-4px_8px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,0.6)]">
      {/* ── Glass Background Image spanning the entire card ── */}
      <Image src={glass} alt="" fill className="rounded-3xl object-cover" />

      {/* ── Inner card ── */}
      <div className="relative z-10 grid w-full grid-cols-[1fr_160px] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(238,243,248,0.75)_0%,rgba(218,227,235,0.85)_100%)] shadow-[inset_0_2px_6px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,0.8)]">
        {/* ══ LEFT — Content column ══ */}
        <div className="relative z-20 flex min-w-0 flex-1 flex-col justify-between py-5 pl-2 pr-3">
          <div>
            {/* Logo + location */}
            <div className="mb-3 flex items-center gap-3">
              <div className="flex items-center justify-center  shadow-sm">
                <Image src={raywhite} alt="RayWhite" className="h-7 w-auto" />
              </div>
              <div className="flex items-center">
                <Image src={locationPin} alt="" className="size-5" />
                <span className="truncate font-poppins text-[11px] font-semibold text-[#333]">
                  {location}
                </span>
              </div>
            </div>

            {/* Name */}
            <h3 className="truncate font-poppins text-2xl font-bold leading-tight tracking-[-0.5px] text-black">
              {name}
            </h3>

            {/* Role */}
            <p className="mt-1 font-poppins text-[10px] font-semibold uppercase  text-black">
              {role}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {/* Phone */}
            <a href={`tel:${phone}`} className="flex items-center gap-1">
              <Image src={callIcon} alt="" className="size-6" />
              <span className="font-poppins text-base font-semibold text-black">
                {phone}
              </span>
            </a>

            {/* Email */}
            <a href={`mailto:${email}`} className="flex items-center gap-1">
              <Image src={emailIcon} alt="" className="size-6" />
              <span className="font-poppins text-base font-semibold text-black">
                {email}
              </span>
            </a>
          </div>

          {/* Social icons */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {socials.map((icon, i) => (
              <Image
                key={i}
                src={icon}
                alt=""
                className="h-[26px] min-w-[26px] w-auto "
              />
            ))}
          </div>
        </div>

        {/* ══ RIGHT — Photo column ══ */}
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top"
          />

          {/* Share + Like buttons positioned in the bottom right corner */}
          <div className="absolute bottom-3 right-3 z-10 flex gap-2">
            <div className="flex size-10 cursor-pointer items-center justify-center   hover:scale-110">
              <Image src={shareIcon} alt="share" className="size-[22px]" />
            </div>
            <div className="flex size-10 cursor-pointer items-center justify-center  hover:scale-110">
              <Image src={likeIcon} alt="save" className="size-[22px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TopRealEstateAgents = () => {
  return (
    <div>
      <div className="mb-4 flex justify-center">
        <Image src={heading} alt="Real Estate Agents" />
      </div>

      <div className="marquee-wrapper py-5">
        <div
          className="marquee-track"
          style={{ animationDuration: `${agentsCatalog.length * 8}s` }}
        >
          {[...agentsCatalog, ...agentsCatalog, ...agentsCatalog].map(
            (agent, i) => (
              <div key={i} className="mx-4 shrink-0">
                <AgentBusinessCard
                  name={agent.name}
                  role={agent.title.toUpperCase()}
                  location={agent.location}
                  phone={agent.phone}
                  email={agent.email}
                  image={agent.avatar as StaticImageData}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default TopRealEstateAgents;
