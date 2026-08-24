"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CirclePlus,
  Building2,
  Sprout,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Eye,
  Home,
} from "lucide-react";

import leadsicon from "@/public/agentpanelicons/sidebarleadsmanagementicon.svg";
import calendericon from "@/public/agentpanelicons/analtyicscalendericon.svg";
import selectpropertyicon from "@/public/agentpanelicons/dashboardactivelistingicon.svg";
import inspectiondetailsicon from "@/public/agentpanelicons/documentuploaddocumenticon.svg";
import dotmenu from "@/public/agentpanelicons/leadmanagement3doticon.svg";
import villaThumb from "@/public/Luxury Modern Villa.jpg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const steps = [
  {
    step: 1,
    label: "Select Property",
    desc: "Choose the property you want to inspect",
    icon: selectpropertyicon,
  },
  {
    step: 2,
    label: "Choose Date & Time",
    desc: "Pick a convenient date and time",
    icon: calendericon,
  },
  {
    step: 3,
    label: "Inspection Details",
    desc: "Provide any specific requirements",
    icon: inspectiondetailsicon,
  },
];

const typeIcon: Record<string, { icon: typeof Home; color: string }> = {
  Villa: { icon: Home, color: "text-sky-500" },
  Apartment: { icon: Building2, color: "text-purple-500" },
  Land: { icon: Sprout, color: "text-green-500" },
  Space: { icon: Briefcase, color: "text-orange-500" },
};

const statusStyles: Record<string, string> = {
  UPCOMING: "bg-blue-50 text-blue-500",
  COMPLETED: "bg-green-50 text-green-600",
  CANCELLED: "bg-red-50 text-red-500",
};

const rows = [
  { property: "Luxury Ocean View Villa", type: "Villa", status: "UPCOMING", ref: "INSP-2025-00124" },
  { property: "Luxury Ocean View Villa", type: "Apartment", status: "UPCOMING", ref: "INSP-2025-00125" },
  { property: "Green Valley Land", type: "Land", status: "UPCOMING", ref: "INSP-2025-00125" },
  { property: "Downtown Office Space", type: "Space", status: "UPCOMING", ref: "INSP-2025-00125" },
  { property: "Luxury Ocean View Villa", type: "Villa", status: "COMPLETED", ref: "INSP-2025-00124" },
  { property: "Luxury Ocean View Villa", type: "Villa", status: "COMPLETED", ref: "INSP-2025-00124" },
  { property: "Luxury Ocean View Villa", type: "Villa", status: "COMPLETED", ref: "INSP-2025-00124" },
  { property: "Luxury Ocean View Villa", type: "Villa", status: "CANCELLED", ref: "INSP-2025-00124" },
].map((r) => ({
  ...r,
  address: "123 Ocean Drive, Miami, FL",
  date: "May 24, 2025",
  time: "10:00 AM",
}));

const tabs = [
  { label: "All", count: null, color: "text-[#2495FF]" },
  { label: "Upcoming", count: 4, color: "text-orange-500" },
  { label: "Completed", count: 8, color: "text-green-600" },
  { label: "Cancelled", count: 2, color: "text-red-500" },
];

export default function UserPanelInspectionBookings() {
  const [tab, setTab] = useState("All");

  const visibleRows =
    tab === "All" ? rows : rows.filter((r) => r.status === tab.toUpperCase());

  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-2 py-2 text-xl font-semibold text-[#E1AB18]">
          Inspection Bookings
          <Image src={leadsicon} alt="" width={32} height={32} />
        </span>
        <button
          className={`flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-base font-bold text-gray-900 ${SOFT_SHADOW}`}
        >
          <CirclePlus className="size-8 fill-[#E1AB18] text-white" />
          Book New Inspection
        </button>
      </div>
      <p className="italic text-gray-600">
        Book a new inspection or view your upcoming and past bookings
      </p>

      {/* Book an inspection */}
      <div className={`rounded-2xl bg-white p-4 ${SOFT_SHADOW}`}>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-3">
            <Image src={calendericon} alt="" className="size-14 shrink-0" />
            <div>
              <p className="text-lg font-bold text-[#2495FF]">
                Book an Inspection
              </p>
              <p className="text-sm text-gray-500">
                Schedule a new property inspection with our experts
              </p>
              <button className="mt-2 rounded-lg border border-[#2495FF] px-4 py-1.5 text-sm font-bold text-[#2495FF]">
                Book New Inspection
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-wrap items-start justify-around gap-4">
            {steps.map(({ step, label, desc, icon }) => (
              <div key={step} className="max-w-[160px] text-center">
                <Image src={icon} alt="" className="mx-auto size-10" />
                <p className="mt-1 text-xs font-bold text-gray-400">{step}</p>
                <p className="text-sm font-bold text-green-600">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
            <div className="max-w-[160px] text-center">
              <CheckCircle2 className="mx-auto size-10 fill-green-500 text-white" />
              <p className="mt-1 text-xs font-bold text-gray-400">4</p>
              <p className="text-sm font-bold text-green-600">Confirmation</p>
              <p className="text-xs text-gray-500">
                We&apos;ll confirm your inspection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* My bookings */}
      <div className={`rounded-2xl bg-white p-4 ${SOFT_SHADOW}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="w-fit rounded-full bg-[#F1F3F2] px-4 py-2 text-xl font-bold text-[#2495FF]">
            My Bookings
          </p>
          <div className="flex flex-wrap items-center gap-5 text-sm font-bold">
            {tabs.map(({ label, count, color }) => (
              <button
                key={label}
                onClick={() => setTab(label)}
                className={`flex items-center gap-1.5 ${
                  tab === label ? color : "text-gray-400"
                }`}
              >
                {label}
                {count !== null && (
                  <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
                    {count}
                  </span>
                )}
              </button>
            ))}
            <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-gray-600">
              Filter <ChevronDown className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="text-[#2495FF]">
                <th className="py-3 text-base font-bold">Property</th>
                <th className="py-3 text-base font-bold">
                  Inspection Date &amp; Time
                </th>
                <th className="py-3 text-base font-bold">Type</th>
                <th className="py-3 text-base font-bold">Status</th>
                <th className="py-3 text-base font-bold">Reference ID</th>
                <th className="py-3 text-base font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, i) => {
                const Type = typeIcon[row.type];
                return (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={villaThumb}
                          alt=""
                          className="size-11 shrink-0 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-gray-900">
                            {row.property}
                          </p>
                          <p className="text-xs text-gray-500">
                            {row.address}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <p className="font-bold text-gray-900">{row.date}</p>
                      <p className="text-xs text-gray-500">{row.time}</p>
                    </td>
                    <td className="py-3">
                      <span
                        className={`flex items-center gap-1.5 font-medium ${Type.color}`}
                      >
                        <Type.icon className="size-4" />
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-700">{row.ref}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Eye className="size-5 text-gray-500" />
                        <Image src={dotmenu} alt="" className="h-6 w-auto" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Showing 1 to {visibleRows.length} of 32 leads
          </p>
          <div className="flex items-center gap-2">
            <button className="flex size-10 items-center justify-center rounded-xl bg-[#D7E9FB] text-[#2495FF]">
              <ChevronLeft className="size-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`flex size-10 items-center justify-center rounded-xl font-bold ${
                  page === 1
                    ? "bg-[#1E6FD9] text-white"
                    : "bg-[#D7E9FB] text-[#2495FF]"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="flex size-10 items-center justify-center rounded-xl bg-[#D7E9FB] text-[#2495FF]">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
