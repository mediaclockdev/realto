import Image from "next/image";
import Link from "next/link";
import { BarChart3, ChevronDown } from "lucide-react";

import AgentPanelRightRail from "./AgentPanelRightRail";
import BuyPropertyCard from "@/components/PropertyListing/BuyPropertyCard";
import PropertyListingCard from "@/components/PropertyListing/PropertyListingCard";
import { newlyListedBuyPropertyCards } from "@/lib/property-cards/buy";
import { newlyListedRentPropertyCards } from "@/lib/property-cards/rent";
import type { BuyPropertyCardItem } from "@/lib/property-cards/types";
import michaelChen from "@/public/michaelchen.jpg";
import sarahWilliams from "@/public/sarajohnson.jpg";
import davidMiller from "@/public/davidthompson.jpg";
import dashboardicon from "@/public/agentpanelicons/sidebardashboardicon.svg";
import totalleadsicon from "@/public/agentpanelicons/dashboardtotalleadicon.svg";
import activelistingicon from "@/public/agentpanelicons/dashboardactivelistingicon.svg";
import closeddealsicon from "@/public/agentpanelicons/dashboardcloseddealsicon.svg";
import addlistingicon from "@/public/agentpanelicons/dashboardaddlistingicon.svg";
import editprofileicon from "@/public/agentpanelicons/dashboardeditprofileicon.svg";
import generatereporticon from "@/public/agentpanelicons/dashboardgeneratereporticon.svg";

const stats = [
  {
    label: "Total Leads",
    value: "347",
    icon: totalleadsicon,
    color: "bg-[#ef4444]",
  },
  {
    label: "Active Listings",
    value: "31",
    icon: activelistingicon,
    color: "bg-[#f97316]",
  },
  {
    label: "Closed Deals",
    value: "12",
    icon: closeddealsicon,
    color: "bg-[#22c55e]",
  },
];

const quickActions = [
  {
    label: "Add New Listing",
    desc: "List a new property",
    icon: addlistingicon,
  },
  {
    label: "Edit Profile",
    desc: "Update your information",
    icon: editprofileicon,
  },
  {
    label: "Generate Report",
    desc: "Monthly performance",
    icon: generatereporticon,
  },
];

const monthlyPerformance = [
  { month: "Jan", value: 45, positive: false },
  { month: "Feb", value: 85, positive: true },
  { month: "Mar", value: 70, positive: true },
  { month: "Apr", value: 35, positive: false },
  { month: "May", value: 80, positive: true },
  { month: "Jun", value: 90, positive: true },
];

const listingsByType = [
  { label: "Apartments", percent: 75, color: "bg-[#ef4444]" },
  { label: "Houses", percent: 75, color: "bg-[#f97316]" },
  { label: "Villas", percent: 75, color: "bg-[#eab308]" },
  { label: "Commercial", percent: 75, color: "bg-[#ec4899]" },
];

const recentLeads = [
  {
    name: "Michael Chen",
    note: "Looking for 3BR Apartment",
    time: "2 hours ago",
    avatar: michaelChen,
  },
  {
    name: "Sarah Williams",
    note: "Interested in Villa project",
    time: "4 hours ago",
    avatar: sarahWilliams,
  },
  {
    name: "David Miller",
    note: "First-time home buyer",
    time: "Yesterday",
    avatar: davidMiller,
  },
];

const SOFT_SHADOW =
  "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF,inset_0_4px_4px_0_rgba(43,108,176,0.2)]";
const CARD = `flex h-full flex-col rounded-2xl bg-white p-4 ${SOFT_SHADOW}`;
const CARD_TITLE = "text-lg font-bold text-[#00A3EE]";

const toBuyCard = (p: BuyPropertyCardItem) => ({
  ...p,
  dateIcon: p.dateicon,
  buyiconImages: p.iconImages,
});

function TrendBadge() {
  return (
    <span className="flex items-center gap-1 rounded-lg bg-white/25 px-2 py-1 text-base font-medium text-white">
      <BarChart3 className="size-3.5" />
      +12%
    </span>
  );
}

export default function AgentPanelDashboard() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_300px]">
      {/* Main content */}
      <main className="space-y-5">
        <div className=" rounded-lg border border-yellow-400 bg-white px-2 py-2 font-semibold text-[#E1AB18] w-42 ">
          <p className="text-xl flex items-center gap-2">
            Dashboard
            <Image
              src={dashboardicon}
              alt="agent dashboard icon "
              width={32}
              height={32}
            />
          </p>
        </div>
        <p className="italic text-gray-600">
          Welcome Back, John! Here&apos;s your business overview.
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 ">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className={`${color} rounded-xl px-2.5 py-2.5 text-white ${SOFT_SHADOW}`}
            >
              <div className="flex items-center justify-between">
                <Image src={Icon} alt={label} className="size-12" />

                <TrendBadge />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <p className="font-semibold">{label}</p>
                <p className="text-2xl font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickActions.map(({ label, desc, icon: Icon }) => (
            <button
              key={label}
              className={`flex items-center gap-3 rounded-xl bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] px-4 py-4 text-left ${SOFT_SHADOW}`}
            >
              <Image
                src={Icon}
                alt={label}
                className="size-12 shrink-0 text-yellow-500"
              />
              <span>
                <span className="block font-bold text-[#0496FF] text-lg">
                  {label}
                </span>
                <span className="block text-sm text-[#767C7E] font-medium">
                  {desc}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Performance / listings by type / recent leads */}
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
          <div className={CARD}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={CARD_TITLE}>Performance Overview</p>
                <p className=" text-base text-[#424656]">
                  Monthly sales and leads trend
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-1.5 py-1.5 text-xs font-semibold text-[#343434]">
                6 Months <ChevronDown className="size-3.5" />
              </span>
            </div>
            <div className="mt-6 flex flex-1 items-end justify-between gap-2">
              {monthlyPerformance.map(({ month, value, positive }) => (
                <div
                  key={month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    className={`w-full max-w-8 rounded-t-lg ${
                      positive ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-xs text-gray-500">{month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={CARD}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={CARD_TITLE}>Listings by Type</p>
              </div>
            </div>
            <div className="mt-6 flex flex-1 flex-col  gap-5">
              {listingsByType.map(({ label, percent, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span className="font-medium text-[#343434] text-sm">
                      {label}
                    </span>
                    <span className="font-medium text-[#343434] text-sm">
                      {percent}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-gray-100">
                    <div
                      className={`h-2 rounded-full ${color}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={CARD}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={CARD_TITLE}>Recent Leads</p>
              </div>
              <button className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700">
                View all
              </button>
            </div>
            <div className="mt-6 flex flex-1 flex-col justify-between gap-3">
              {recentLeads.map(({ name, note, time, avatar }) => (
                <div
                  key={name}
                  className="flex items-start gap-3 rounded-xl border border-yellow-300 p-2.5"
                >
                  <Image
                    src={avatar}
                    alt={name}
                    className="size-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-bold text-[#343434]">{name}</p>
                    <p className="font-medium text-[#343434]">{note}</p>
                    <p className="mt-0.5 font-medium text-xs text-[#343434]">
                      {time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active listings */}
        <div>
          <div className="flex items-center justify-between">
            <p className="font-bold text-[#2495FF] text-lg">Active Listings</p>
            <Link
              href="/agentpanel/mylisting"
              className="text-lg font-semibold text-[#2495FF]"
            >
              Manage all
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap items-start gap-4">
            <div className="w-full max-w-[340px]">
              <BuyPropertyCard
                property={toBuyCard(newlyListedBuyPropertyCards[0])}
              />
            </div>
            <div className="w-full max-w-[340px]">
              <PropertyListingCard
                property={newlyListedRentPropertyCards[0]}
                listingVariant="rent"
                disableHoverScale
              />
            </div>
          </div>
        </div>
      </main>

      <AgentPanelRightRail />
    </div>
  );
}
