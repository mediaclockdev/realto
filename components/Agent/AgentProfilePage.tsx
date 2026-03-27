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
import locationIcon from "@/public/location.svg";
import phoneIcon from "@/public/phone.svg";
import mailIcon from "@/public/mail.svg";
import starIcon from "@/public/starsingle.svg";

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
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#f3f4f6] px-5 py-4 text-center">
      <p className="text-xl font-bold text-[#1f2937]">{value}</p>
      <p className="mt-1 text-xs text-[#6b7280]">{label}</p>
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

      <div className="max-w-screen-2xl mx-auto px-5 py-6 space-y-8">
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

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-[#ff2f2f] px-6 py-3">
            <div className="flex items-center gap-4">
              <Image
                src={agent.agencyLogo}
                alt={agent.agencyName}
                width={165}
                height={48}
                className="object-contain"
              />
              <span className="text-2xl font-semibold text-white">{agent.agencyName}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-[220px_1fr_280px]">
            <div>
              <div className="relative mx-auto h-[220px] w-[180px] overflow-hidden rounded-2xl">
                <Image src={agent.avatar} alt={agent.name} fill className="object-cover" />
              </div>
              <div className="mt-4 space-y-3">
                <button className="w-full rounded-lg bg-[#4b8de3] px-4 py-2 text-sm font-semibold text-white">
                  Call Agent
                </button>
                <button className="w-full rounded-lg border border-[#4b8de3] px-4 py-2 text-sm font-semibold text-[#4b8de3]">
                  Send Message
                </button>
                <button className="w-full rounded-lg border border-[#4b8de3] px-4 py-2 text-sm font-semibold text-[#4b8de3]">
                  Inspection Appointment
                </button>
              </div>
              <div className="mt-4 flex items-center gap-3">
                {Object.entries(agent.socialLinks).map(([key, href]) => {
                  if (!href) return null;
                  const icon = socialIcons[key as keyof typeof socialIcons];
                  return (
                    <Link key={key} href={href} className="transition-transform hover:scale-110">
                      <Image src={icon} alt={key} width={24} height={24} />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-semibold text-[#1f2937]">{agent.name}</h1>
              <p className="mt-1 text-sm font-medium text-[#4b8de3]">{agent.title}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-[#6b7280]">
                <Image src={starIcon} alt="rating" width={16} height={16} />
                <span className="font-semibold text-[#1f2937]">{agent.rating}</span>
                <span>({agent.reviewCount} reviews)</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
                <StatCard label="Years Experience" value={`${agent.yearsExperience}+`} />
                <StatCard label="Properties Sold" value={String(agent.propertiesSold)} />
                <StatCard label="Total Sales" value={agent.totalSalesValue} />
                <StatCard label="Client Satisfaction" value={agent.clientSatisfaction} />
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm font-semibold text-[#1f2937]">Specializations</p>
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

                <div className="grid grid-cols-1 gap-4 text-sm text-[#374151] md:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <Image src={locationIcon} alt="location" width={18} height={18} />
                    <div>
                      <p className="text-xs text-[#9ca3af]">Service Area</p>
                      <p className="font-medium">{agent.officeAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Image src={phoneIcon} alt="phone" width={18} height={18} />
                    <div>
                      <p className="text-xs text-[#9ca3af]">Phone</p>
                      <p className="font-medium">{agent.agencyPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Image src={mailIcon} alt="email" width={18} height={18} />
                    <div>
                      <p className="text-xs text-[#9ca3af]">Email</p>
                      <p className="font-medium">{agent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Image src={locationIcon} alt="license" width={18} height={18} />
                    <div>
                      <p className="text-xs text-[#9ca3af]">License</p>
                      <p className="font-medium">DC MARVEL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-[#1f2937]">Performance Highlights</h2>
                <div className="mt-3 space-y-3 rounded-2xl border border-gray-200 p-4 text-sm">
                  <div className="flex justify-between gap-4"><span>Avg Sale Price</span><span className="font-semibold">{agent.performance.avgSalePrice}</span></div>
                  <div className="flex justify-between gap-4"><span>Avg Days On Market</span><span className="font-semibold">{agent.performance.avgDaysOnMarket}</span></div>
                  <div className="flex justify-between gap-4"><span>List to Sale Ratio</span><span className="font-semibold">{agent.performance.listToSaleRatio}</span></div>
                  <div className="flex justify-between gap-4"><span>Response Time</span><span className="font-semibold">{agent.performance.responseTime}</span></div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#1f2937]">Languages</h2>
                <div className="mt-3 space-y-2 rounded-2xl border border-gray-200 p-4 text-sm">
                  {agent.languages.map((language) => (
                    <div key={language.name} className="flex justify-between gap-4">
                      <span>{language.name}</span>
                      <span className="text-[#9ca3af]">{language.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#1f2937]">Service Areas</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {agent.serviceAreas.map((area) => (
                    <span key={area} className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-medium text-[#4b5563]">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1f2937]">About Me</h2>
            <p className="mt-4 text-sm leading-7 text-[#4b5563]">{agent.bio}</p>

            <h3 className="mt-8 text-lg font-semibold text-[#1f2937]">Experience & Credentials</h3>
            <div className="mt-4 space-y-4">
              {agent.careerHighlights.map((item) => (
                <div key={item} className="rounded-xl bg-[#f9fafb] p-4 text-sm text-[#374151]">
                  {item}
                </div>
              ))}
            </div>

            <h3 className="mt-8 text-lg font-semibold text-[#1f2937]">Certifications & Awards</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#374151]">
              {agent.certifications.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1f2937]">Career Highlights</h2>
            <div className="mt-4 space-y-4 text-sm text-[#374151]">
              {agent.careerHighlights.map((item) => (
                <div key={item} className="rounded-xl bg-[#f9fafb] p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-[#1f2937]">Current Listings</h2>
              <p className="text-sm text-[#6b7280]">Properties currently represented by {agent.name}</p>
            </div>
            <Link href="/propertyListingpage" className="text-sm font-medium text-[#0284C7] hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {currentListings.map((property) => (
              <PropertyListingCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-[#1f2937]">Sold Property Listings</h2>
            <Link href="/propertyListingpage" className="text-sm font-medium text-[#0284C7] hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {soldListings.map((property) => (
              <PropertyListingCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
