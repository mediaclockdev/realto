"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import dashboardicon from "@/public/agentpanelicons/sidebardashboardicon.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const GOLD_BORDER = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};

// ponytail: static demo data, swap for an admin stats API when it exists
const sparkData = [4, 7, 5, 6, 9, 5, 6, 12, 7, 5, 6, 4, 6, 9, 8, 11];

const stats = [
  { label: "Total Properties", value: "1,500", change: 20, color: "#3B82F6", from: "#DCEBFF" },
  { label: "Total Agents", value: "320", change: 20, color: "#22A55B", from: "#DDF5E6" },
  { label: "Total Buyers", value: "1,500", change: 20, color: "#F59E0B", from: "#FDEBD3" },
  { label: "Active Listings", value: "980", change: -10, color: "#7C5CE0", from: "#E7E0FA" },
];

const days = [
  { d: "May 15", active: 380, fresh: 200 },
  { d: "May 16", active: 450, fresh: 290 },
  { d: "May 17", active: 520, fresh: 340 },
  { d: "May 18", active: 380, fresh: 200 },
  { d: "May 19", active: 380, fresh: 200 },
  { d: "May 20", active: 600, fresh: 400 },
  { d: "May 21", active: 480, fresh: 320 },
];

const types = [
  { label: "Buy - Land", count: 375, color: "#EF1C1C" },
  { label: "Rent - Luxury property", count: 375, color: "#2F7BE8" },
  { label: "Rent - Commercial", count: 375, color: "#F58A0B" },
  { label: "Rent - Student Residency", count: 375, color: "#5B3FE0" },
  { label: "Rent - Flatmates", count: 375, color: "#2EAB1D" },
];

const signups = [
  { name: "Evan D. Mass", tag: "member", when: "2 mins ago", img: 12 },
  { name: "Evan D. Mass", tag: "Customer", when: "25 mins ago", img: 47 },
  { name: "Evan D. Mass", tag: "member", when: "2 mins ago", img: 15 },
];

const locations = [
  { name: "Austin, Australia", count: 320, color: "#F58A0B" },
  { name: "Austin, Australia", count: 280, color: "#EF1C1C" },
  { name: "Melbourne, Australia", count: 210, color: "#16A34A" },
  { name: "Brisbane, Australia", count: 160, color: "#2F7BE8" },
  { name: "Perth, Australia", count: 90, color: "#5B3FE0" },
];

function Sparkline({ color, id }: { color: string; id: string }) {
  const max = Math.max(...sparkData);
  const pts = sparkData.map((v, i) => [
    (i / (sparkData.length - 1)) * 200,
    50 - (v / max) * 42,
  ]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  return (
    <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="h-16 w-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={`${line} L200,50 L0,50 Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold text-[#0496FF]">{children}</h2>;
}

function ViewAll() {
  return <button className="text-xl font-semibold text-[#0496FF]">View all</button>;
}

export default function AdminPanelDashboard() {
  const total = types.reduce((s, t) => s + t.count, 0);
  let acc = 0;
  const donut = types
    .map((t) => {
      const from = (acc / total) * 100;
      acc += t.count;
      return `${t.color} ${from}% ${(acc / total) * 100}%`;
    })
    .join(",");
  const topMax = locations[0].count;

  return (
    <div className="space-y-5 text-gray-900">
      <div>
        <h1
          className={`flex w-fit items-center gap-10 rounded-xl border-2 border-transparent px-3 py-2 text-2xl font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          style={GOLD_BORDER}
        >
          Dashboard
          <Image src={dashboardicon} alt="" className="size-10" />
        </h1>
        <p className="mt-3 font-TimesNewRoman text-sm italic text-gray-500">
          Welcome back ! Here&apos;s what&apos;s happening with your platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`rounded-2xl p-4 ${SOFT_SHADOW}`}
            style={{ background: `linear-gradient(135deg,${s.from},#EEF1FB)` }}
          >
            <p className="text-2xl font-semibold" style={{ color: "#0496FF" }}>{s.label}</p>
            <p className="mt-1 text-3xl font-bold">{s.value}</p>
            <div className="mt-3 flex items-center gap-4 text-sm font-medium">
              <span
                className={`rounded-full bg-white px-3 py-1 ${s.change > 0 ? "text-[#0496FF]" : "text-red-500"}`}
              >
                {s.change > 0 ? "↗" : "↓"} {Math.abs(s.change)}%
              </span>
              vs last month
            </div>
            <div className="mt-3">
              <Sparkline color={s.color} id={`spark${i}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <section className={`rounded-2xl bg-white p-5 ${SOFT_SHADOW}`}>
          <CardTitle>Total Properties</CardTitle>
          <div className="mt-4 flex gap-3">
            <div className="flex h-56 flex-col justify-between pb-6 text-sm font-semibold">
              {[800, 600, 400, 200, 0].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
            <div className="grid flex-1 grid-cols-7 items-end gap-3 border-b border-gray-200">
              {days.map((d) => (
                <div key={d.d} className="flex flex-col items-center">
                  <div className="flex h-56 w-6 flex-col justify-end pb-0">
                    <div className="rounded-t-sm bg-[#B7D4F7]" style={{ height: `${((d.active - d.fresh) / 800) * 100}%` }} />
                    <div className="bg-[#2F7BE8]" style={{ height: `${(d.fresh / 800) * 100}%` }} />
                  </div>
                  <span className="mt-2 text-xs text-gray-500">{d.d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2"><i className="size-3 rounded-full bg-[#2F7BE8]" /> New Listing</span>
            <span className="flex items-center gap-2"><i className="size-3 rounded-full bg-[#B7D4F7]" /> Active Listing</span>
          </div>
        </section>

        <section className={`rounded-2xl bg-white p-5 ${SOFT_SHADOW}`}>
          <CardTitle>Listings by Type</CardTitle>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            <div
              className="size-48 shrink-0 rounded-full"
              style={{ background: `conic-gradient(${donut})`, mask: "radial-gradient(circle,transparent 58%,#000 59%)", WebkitMask: "radial-gradient(circle,transparent 58%,#000 59%)" }}
            />
            <ul className="min-w-60 flex-1 space-y-3 text-sm">
              {types.map((t) => (
                <li key={t.label} className="flex items-center gap-3 text-gray-600">
                  <i className="size-3 rounded-full" style={{ background: t.color }} />
                  <span className="flex-1">{t.label}</span>
                  <span>{Math.round((t.count / total) * 100)}%({t.count})</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`rounded-2xl bg-white p-5 ${SOFT_SHADOW}`}>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Signups</CardTitle>
            <ViewAll />
          </div>
          <ul className="mt-4 space-y-5">
            {signups.map((s, i) => (
              <li key={i} className="flex items-center gap-4">
                <img src={`https://i.pravatar.cc/100?img=${s.img}`} alt="" className="size-12 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-semibold">
                    {s.name}{" "}
                    <span className={`rounded px-2 py-0.5 text-sm font-medium ${s.tag === "member" ? "bg-[#E1EEFF] text-[#2F7BE8]" : "bg-[#DDF5E6] text-[#16A34A]"}`}>
                      {s.tag}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">evan.mas@email.com | 1234 5678</p>
                </div>
                <span className="text-sm text-gray-500">{s.when}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`rounded-2xl bg-white p-5 ${SOFT_SHADOW}`}>
          <div className="flex items-center justify-between">
            <CardTitle>Top Locations</CardTitle>
            <ViewAll />
          </div>
          <ul className="mt-5 space-y-4">
            {locations.map((l, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium">
                <MapPin className="size-5 shrink-0 fill-[#2F7BE8] text-white" />
                <span className="w-44 shrink-0">{l.name}</span>
                <span className="h-1 flex-1 rounded" style={{ background: l.color, maxWidth: `${(l.count / topMax) * 100}%` }} />
                <span className="ml-auto w-10 text-right">{l.count}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
 