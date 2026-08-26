"use client";

import Image from "next/image";
import { useState } from "react";

import dashboardicon from "@/public/agentpanelicons/sidebardashboardicon.svg";
import calendericon from "@/public/agentpanelicons/analtyicscalendericon.svg";
import savedicon from "@/public/userpanelicons/userpanelsavedproperties.svg";
import inquiriesicon from "@/public/userpanelicons/userpaneldashboardactiveinquryicon.svg";
import messageicon from "@/public/userpanelicons/userpanelmessagesicon.svg";
import documenticon from "@/public/userpanelicons/userpaneldocumentsicon.svg";
import villaImg from "@/public/Luxury Modern Villa.jpg";
import apartmentImg from "@/public/buyimg1.jpg";
import landImg from "@/public/landimg1.jpg";

const OUTER_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const SOFT_SHADOW = `${OUTER_SHADOW.slice(0, -1)},inset_0_4px_4px_0_rgba(43,108,176,0.2)]`;
const CARD = `flex h-full flex-col rounded-2xl bg-white p-4 ${SOFT_SHADOW}`;
const CARD_TITLE = `rounded-[100px] bg-[#F1F3F2] px-4 py-2 text-lg font-bold text-[#00A3EE] ${OUTER_SHADOW}`;
const VIEW_ALL = `shrink-0 rounded-lg border border-[#C2C6D9] bg-white px-3 py-1.5 text-sm font-bold text-[#2495FF] ${OUTER_SHADOW}`;

const stats = [
  { label: "Saved Properties", value: "87", icon: savedicon },
  { label: "Active Inquiries", value: "12", icon: inquiriesicon },
  { label: "Upcoming Visits", value: "3", icon: calendericon },
  { label: "Messages", value: "5", icon: messageicon },
];

const villa = {
  name: "Luxury Ocean View Villa",
  place: "Miami, Florida",
  image: villaImg,
};
const apartment = {
  name: "Modern Luxury Apartment",
  place: "New York, USA",
  image: apartmentImg,
};
const land = {
  name: "Green Valley Land",
  place: "Austin, Texas",
  image: landImg,
};

const inspections = [villa, apartment, land, land, land, villa, apartment].map(
  (p) => ({ ...p, date: "May 24, 2025", time: "10:00 AM" }),
);

const bookings = {
  Upcoming: [
    { ...villa, status: "Confirmed" },
    { ...apartment, status: "Pending" },
    { ...land, status: "Confirmed" },
    { ...land, status: "Confirmed" },
    { ...land, status: "Confirmed" },
    { ...villa, status: "Confirmed" },
    { ...apartment, status: "Pending" },
  ],
  Past: [
    { ...land, status: "Completed" },
    { ...villa, status: "Completed" },
    { ...apartment, status: "Cancelled" },
  ],
};

const statusStyle: Record<string, string> = {
  Confirmed: "bg-green-50 text-green-600",
  Pending: "bg-amber-50 text-amber-600",
  Completed: "bg-sky-50 text-sky-600",
  Cancelled: "bg-red-50 text-red-500",
};

const activity = [
  {
    title: "Document verified",
    desc: "Your income proof is verified",
    time: "2 hours ago",
  },
  {
    title: "Document verified",
    desc: "Your income proof is verified",
    time: "2 hours ago",
  },
  {
    title: "Document verified",
    desc: "Your income proof is verified",
    time: "2 hours ago",
  },
];

function Row({
  name,
  place,
  image,
  date,
  time,
  status,
}: {
  name: string;
  place: string;
  image: typeof villaImg;
  date: string;
  time: string;
  status?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={image}
        alt={name}
        className="size-11 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-[#343434]">{name}</p>
        <p className="truncate text-sm text-gray-500">{place}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-bold text-[#343434]">{date}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      {status && (
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${statusStyle[status]}`}
        >
          {status}
        </span>
      )}
    </div>
  );
}

export default function UserPanelDashboard() {
  const [tab, setTab] = useState<keyof typeof bookings>("Upcoming");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="w-fit rounded-lg border border-yellow-400 bg-white px-2 py-2 font-semibold text-[#E1AB18]">
            <p className="flex items-center gap-2 text-xl">
              Dashboard
              <Image
                src={dashboardicon}
                alt="user dashboard icon"
                width={32}
                height={32}
              />
            </p>
          </div>
          <p className="mt-3 italic text-gray-600">
            Welcome back, Masha! Here&apos;s what&apos;s happening today.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-2">
          <button
            className={`flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-white px-4 py-2.5 text-lg font-bold text-[#E1AB18] [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#BA9000,#F7D257,#BA9000)_border-box] ${OUTER_SHADOW}`}
          >
            <Image src={calendericon} alt="" className="size-9" />
            Book New Inspection
          </button>
          <div className="flex items-center justify-between text-sm font-semibold text-[#343434]">
            <span>Profile completion</span>
            <span>90%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100">
            <div className="h-2 w-[90%] rounded-full bg-[#0496FF]" />
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-xl bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] px-4 py-4 ${SOFT_SHADOW}`}
          >
            <Image src={icon} alt={label} className="size-12 shrink-0" />
            <span>
              <span className="block text-lg font-bold text-[#0496FF]">
                {label}
              </span>
              <span className="block text-2xl font-bold text-[#343434]">
                {value}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Inspections + bookings */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        <div className={CARD}>
          <div className="flex items-center justify-between gap-3">
            <p className={CARD_TITLE}>Upcoming Inspection</p>
            <button className={VIEW_ALL}>View all</button>
          </div>
          <div className="mt-5 space-y-4">
            {inspections.map((item, i) => (
              <Row key={i} {...item} />
            ))}
          </div>
        </div>

        <div className={CARD}>
          <div className="flex items-center justify-between gap-3">
            <p className={CARD_TITLE}>My Bookings</p>
            <button className={VIEW_ALL}>View all</button>
          </div>
          <div className="mt-4 flex gap-8 border-b border-gray-200">
            {(Object.keys(bookings) as (keyof typeof bookings)[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`-mb-px border-b-2 px-2 pb-2 font-semibold ${
                  tab === t
                    ? "border-[#0496FF] text-[#0496FF]"
                    : "border-transparent text-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-4">
            {bookings[tab].map((item, i) => (
              <Row key={i} {...item} date="May 24, 2025" time="10:00 AM" />
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className={CARD}>
        <div className="flex items-center justify-between gap-3">
          <p className={CARD_TITLE}>Recent Activity</p>
          <button className={VIEW_ALL}>View all</button>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {activity.map(({ title, desc, time }, i) => (
            <div key={i} className="flex items-center gap-3">
              <Image src={documenticon} alt="" className="size-11 shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-[#343434]">{title}</p>
                <p className="truncate text-sm text-gray-500">{desc}</p>
                <p className="text-xs text-gray-400">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
