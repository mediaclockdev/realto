import Image from "next/image";
import Link from "next/link";
import HeroAgentSection from "./HeroAgentSection";
import PropertyListingCard from "@/components/PropertyListing/PropertyListingCard";
import type { AgentDetail } from "@/lib/agents/types";
import type { ListingProperty } from "@/lib/properties/types";
import whatsappIcon from "@/public/whatsapp.svg";
import instagramIcon from "@/public/logos_instagram.svg";
import facebookIcon from "@/public/logos_facebook.svg";
import smsIcon from "@/public/smslogo.svg";
import tiktokIcon from "@/public/tiktok.svg";
import wechatIcon from "@/public/wechat.svg";
import snapchatIcon from "@/public/snapchat.svg";
import linkedinIcon from "@/public/logos_linkedin.svg";
import locationIcon from "@/public/location.svg";
import phoneIcon from "@/public/mobileicon.svg";
import mailIcon from "@/public/mailicon.svg";
import starIcon from "@/public/starsingle.svg";
import license from "@/public/license.svg";
import ClientReviewsandRatings from "./ClientReviewsandRatings";
import call from "../../public/agentcallicon.svg";

interface AgentProfilePageProps {
  agent: AgentDetail;
  currentListings: ListingProperty[];
  soldListings: ListingProperty[];
}

const socialIcons = {
  whatsapp: whatsappIcon,
  instagram: instagramIcon,
  facebook: facebookIcon,
  sms: smsIcon,
  tiktok: tiktokIcon,
  wechat: wechatIcon,
  snapchat: snapchatIcon,
  linkedin: linkedinIcon,
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-full  border-2 border-[#BFDBFE] rounded-[10px] px-7.5 py-3.75 flex flex-col items-center justify-center gap-1.5">
      <p className="text-xl lg:text-[26px] font-semibold text-[#ff2f2f] leading-none">
        {value}
      </p>
      <p className="text-sm lg:text-[16px] leading-6 text-[#14A4DD] whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}

export default function AgentProfilePage({
  agent,
  currentListings,
  soldListings,
}: AgentProfilePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <HeroAgentSection />

      <div className="max-w-screen-2xl mx-auto px-5 pt-6 space-y-6">
        <nav className="text-sm text-[#6b7280]">
          <Link href="/homepage" className="hover:text-[#0284C7]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/agents" className="hover:text-[#0284C7]">
            Agents
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-[#1f2937]">{agent.name}</span>
        </nav>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="bg-[#ff2f2f] px-6 h-14 flex items-center justify-center">
            <div className="flex justify-center items-center h-full py-2">
              <Image
                src={agent.agencyLogo}
                alt={agent.agencyName}
                className="object-contain h-full w-auto"
              />
            </div>
          </div>
        </section>
      </div>

      <section className="max-w-7xl mx-auto px-5 pb-6 space-y-8">
        {/* Agent Card */}
        <section className="">
          <div className="grid grid-cols-1 gap-8  lg:grid-cols-[220px_1fr_280px]">
            <div>
              <div className="relative mx-auto h-55 w-45 overflow-hidden rounded-2xl">
                <Image
                  src={agent.avatar}
                  alt={agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-center gap-2 border-2 border-[#BFDBFE]  bg-[#EFF6FF] px-4 py-2 rounded-lg ">
                  <Image src={call} alt="" />
                  <button className="text-sm font-semibold text-[#14A4DD]">
                    Call Agent
                  </button>
                </div>
                <button className="w-full rounded-lg  border-2 border-[#BFDBFE] px-4 py-2 text-sm font-semibold text-[#14A4DD]">
                  Send Message
                </button>
                <button className="w-full rounded-lg  border-2 border-[#BFDBFE]  px-4 py-2 text-sm font-semibold text-[#14A4DD]">
                  Inspection Appointment
                </button>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-semibold text-[#1f2937]">
                {agent.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-[#4b8de3]">
                {agent.title}
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm text-[#6b7280]">
                <Image src={starIcon} alt="rating" width={16} height={16} />
                <span className="font-semibold text-[#1f2937]">
                  {agent.rating}
                </span>
                <span>({agent.reviewCount} reviews)</span>
              </div>

              <div className="mt-3 flex flex-col lg:flex-row gap-5 items-center w-full bg-[#EFF6FF] p-3 rounded-lg">
                <StatCard
                  label="Years Experience"
                  value={`${agent.yearsExperience}+`}
                />
                <StatCard
                  label="Properties Sold"
                  value={String(agent.propertiesSold)}
                />
                <StatCard label="Total Sales" value={agent.totalSalesValue} />
                <StatCard
                  label="Client Satisfaction"
                  value={agent.clientSatisfaction}
                />
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm font-semibold text-[#1f2937]">
                    Specializations
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {agent.specializations.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#e5f0ff] px-3 py-1 text-xs font-medium text-[#3b82f6]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm text-[#374151] md:grid-cols-3">
                  <div className="flex items-start gap-2">
                    <Image
                      src={locationIcon}
                      alt="location"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="text-xs text-[#909090]">Service Area</p>
                      <p className="font-semibold font-poppins text-[#343434]">
                        {agent.officeAddress}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Image
                        src={phoneIcon}
                        alt="phone"
                        width={20}
                        height={20}
                      />
                      <div>
                        <p className="text-xs text-[#9ca3af]">Phone</p>
                        <p className="font-medium">{agent.agencyPhone}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-[#9ca3af]">Social Links</p>
                      <div className="flex items-center gap-1.5">
                        {Object.entries(agent.socialLinks).map(
                          ([key, href]) => {
                            if (!href) return null;
                            const icon =
                              socialIcons[key as keyof typeof socialIcons];
                            return (
                              <Link
                                key={key}
                                href={href}
                                className="transition-transform hover:scale-110"
                              >
                                <Image
                                  src={icon}
                                  alt={key}
                                  width={25}
                                  height={25}
                                />
                              </Link>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Image src={mailIcon} alt="email" width={40} height={40} />
                    <div>
                      <p className="text-xs text-[#9ca3af]">Email</p>
                      <p className="font-medium">{agent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Image src={license} alt="license" width={40} height={40} />
                    <div>
                      <p className="text-xs text-[#9ca3af]">License</p>
                      <p className="font-medium">DC MARVEL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Agent */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr] ">
          <div className="rounded-2xl border-2 border-[#BFDBFE] p-4 shadow-sm">
            <h2 className="text-[15px]  font-semibold text-[#14A4DD]">
              About Me
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#4b5563]">{agent.bio}</p>
            <h3
              className="mt-6 lg:mt-8 text-[15px] font-semibold text-[#111827] px-4 py-2 rounded-md inline-block  [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
              }}
            >
              Experience & Credentials
            </h3>
            <div className="mt-6 space-y-6">
              {agent.careerHighlights.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  {/* Icon */}
                  <div className="bg-[#F3F4F6] p-2 lg:p-3 rounded-lg shrink-0 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center">
                    <Image
                      src={item.careericons}
                      alt="icon"
                      width={20}
                      height={20}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-[#14A4DD]">
                      {item.title}
                    </h3>

                    <p className="text-sm lg:text-base text-blue-600">
                      {item.company} {item.duration}
                    </p>

                    <p className="text-sm lg:text-base text-[#6B7280] mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-8 text-[15px] font-semibold text-[#14A4DD]">
              Certifications & Awards
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-[#374151]">
              {agent.certifications.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div>
              <h2
                className="text-[15px] font-semibold  text-[#111827] px-4 py-2 rounded-md inline-block [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
                }}
              >
                Performance Highlights
              </h2>
              <div className="mt-3 space-y-3 rounded-2xl border-2 border-[#BFDBFE] p-4 text-sm font-poppins">
                <div className="flex justify-between gap-4">
                  <span className="text-[#4B5563]">Avg Sale Price</span>
                  <span className="font-semibold text-[#111827]">
                    {agent.performance.avgSalePrice}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#4B5563]">Avg Days On Market</span>
                  <span className="font-semibold text-[#111827]">
                    {agent.performance.avgDaysOnMarket}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#4B5563]">List to Sale Ratio</span>
                  <span className="font-semibold text-[#111827]">
                    {agent.performance.listToSaleRatio}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#4B5563]">Response Time</span>
                  <span className="font-semibold text-[#111827]">
                    {agent.performance.responseTime}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2
                className="text-[15px] font-semibold  text-[#111827] px-4 py-2 rounded-md inline-block [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
                }}
              >
                Languages
              </h2>
              <div className="mt-3 space-y-2 rounded-2xl border-2 border-[#BFDBFE] p-4 text-sm">
                {agent.languages.map((language) => (
                  <div
                    key={language.name}
                    className="flex justify-between gap-4"
                  >
                    <span className="text-[#4B5563] font-poppins font-normal">
                      {language.name}
                    </span>
                    <span className="text-[#9CA3AF]">
                      {language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="text-[15px] font-semibold  text-[#111827] px-4 py-2 rounded-md inline-block [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
                }}
              >
                Service Areas
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {agent.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-[#f3f4f6]  border-2 border-[#BFDBFE]  px-3 py-1 text-sm font-medium text-[#4b5563]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* current property */}
      <section className="px-5 py-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2
              className="text-[15px] font-semibold text-[#111827] shadow-sm px-4 py-2 rounded-md inline-block [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
              }}
            >
              Current Listings
            </h2>
            <p className="text-sm text-[#6b7280]">
              Properties currently represented by {agent.name}
            </p>
          </div>
          <Link
            href="/propertyListingpage"
            className="text-sm font-medium text-[#0284C7] hover:underline whitespace-nowrap"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {currentListings.map((property) => (
            <PropertyListingCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Sold Property */}
      <section className="px-6 py-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-[15px] font-semibold text-[#007CBE] font-amasis">
            Sold Property Listings
          </h2>
          <Link
            href="/propertyListingpage"
            className="text-sm font-medium text-[#0284C7] hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {soldListings.map((property) => (
            <PropertyListingCard key={property.id} property={property} />
          ))}
        </div>
      </section>
      <section>
        <ClientReviewsandRatings />
      </section>
    </div>
  );
}
