"use client";

import Image from "next/image";
import { CalendarDays, ChevronDown, Download } from "lucide-react";
import analyticsicon from "@/public/agentpanelicons/sidebaranalyticsicons.svg";
import propertyimg from "@/public/Luxury Modern Villa.jpg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const GOLD_BORDER = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};
const goldBtn = `flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-1.5 text-lg font-semibold text-[#E1AB18] ${SOFT_SHADOW}`;

// ponytail: static demo data, swap for an admin analytics API when it exists
const kpis = [
  { label: "Total Revenue", value: "$86,250" },
  { label: "Active Bookings", value: "1,250" },
  { label: "New Customer", value: "320" },
  { label: "Property Listed", value: "1,500" },
  { label: "Active Agents", value: "98" },
];

const revenue = [30, 42, 56, 45, 60, 78, 68];
const days = ["May 15", "May 16", "May 17", "May 18", "May 19", "May 20", "May 21"];

const bookings = [
  { label: "Confirmed", n: 980, pct: "78.4%", color: "#7AB51D" },
  { label: "Pending", n: 180, pct: "14.4%", color: "#F5B50B" },
  { label: "Cancelled", n: 90, pct: "7.2%", color: "#EF1C1C" },
];

const categories = [
  { label: "Hotels", n: 48250, pct: "55.9%", color: "#0A4FA0" },
  { label: "Apartments", n: 22100, pct: "25.6%", color: "#D9420B" },
  { label: "Villas", n: 10850, pct: "12.6%", color: "#F5B50B" },
  { label: "Land", n: 5050, pct: "5.9%", color: "#168A2E" },
];

const top = [
  { t: "Luxury Ocean View Villa", id: "PRP00124", v: "4,250", b: 120, r: "$24,500", c: "2.82%" },
  { t: "Modern Luxury Apartment", id: "PRP00129", v: "3,180", b: 95, r: "$18,750", c: "2.99%" },
  { t: "Green Valley Land", id: "PRP00123", v: "2,760", b: 70, r: "$12,600", c: "2.54%" },
  { t: "Downtown Office Space", id: "PRP00125", v: "2,310", b: 60, r: "$10,800", c: "2.59%" },
  { t: "Downtown Office Space", id: "PRP00125", v: "2,310", b: 60, r: "$10,800", c: "2.59%" },
];

const growth = [
  { fresh: 60, ret: 40 },
  { fresh: 40, ret: 20 },
  { fresh: 55, ret: 65 },
  { fresh: 25, ret: 15 },
  { fresh: 55, ret: 35 },
];

const metrics = [
  { label: "Average Booking Value", value: "$172.50" },
  { label: "Occupancy Rate", value: "68.4%" },
  { label: "Average Response Rate", value: "2h 15m" },
  { label: "Cancellation Rate", value: "7.2%" },
  { label: "Customer Satisfaction", value: "4.6 / 5" },
];

function conic(items: { n: number; color: string }[]) {
  const total = items.reduce((s, i) => s + i.n, 0);
  let acc = 0;
  return items
    .map((i) => {
      const from = (acc / total) * 100;
      acc += i.n;
      return `${i.color} ${from}% ${(acc / total) * 100}%`;
    })
    .join(",");
}

function Donut({ items, value, sub }: { items: { n: number; color: string }[]; value: string; sub: string }) {
  const mask = "radial-gradient(circle,transparent 62%,#000 63%)";
  return (
    <div className="relative mx-auto size-36">
      <div className="size-full rounded-full" style={{ background: `conic-gradient(${conic(items)})`, mask, WebkitMask: mask }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold">{value}</span>
        <span className="text-[9px] text-gray-400">{sub}</span>
      </div>
    </div>
  );
}

function Legend({ items, money }: { items: { label: string; n: number; pct: string; color: string }[]; money?: boolean }) {
  return (
    <ul className="mt-5 space-y-2 text-xs">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-2 text-gray-600">
          <i className="size-2 rounded-full" style={{ background: i.color }} />
          <span className="flex-1">{i.label}</span>
          <span className="font-semibold text-gray-900">
            {money ? `$${i.n.toLocaleString()}` : i.n} ({i.pct})
          </span>
        </li>
      ))}
    </ul>
  );
}

const Title = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-[#0496FF]">{children}</h2>
);

export default function AdminPanelOverview() {
  const w = 600, h = 200;
  const pts = revenue.map((v, i) => [(i / (revenue.length - 1)) * w, h - (v / 90) * h]);

  return (
    <div className="space-y-5 text-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1
          className={`flex w-fit items-center gap-16 rounded-xl border-2 border-transparent px-3 py-2 text-2xl font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          style={GOLD_BORDER}
        >
          Overview
          <Image src={analyticsicon} alt="" className="size-10" />
        </h1>
        <div className="flex gap-4">
          <button className={goldBtn} style={GOLD_BORDER}>
            <CalendarDays className="size-7" /> May 15 – May 21, 2026
          </button>
          <button className={goldBtn} style={GOLD_BORDER}>
            <Download className="size-8 rounded-full bg-[#D9A91B] p-1.5 text-white" /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((k) => (
          <div key={k.label} className={`rounded-2xl bg-gradient-to-br from-[#DCEBFF] to-[#EEF1FB] p-4 ${SOFT_SHADOW}`}>
            <p className="text-lg font-semibold leading-tight text-[#0496FF]">{k.label}</p>
            <p className="mt-1 text-3xl font-bold">{k.value}</p>
            <p className="mt-2 text-xs text-gray-400">
              <span className="mr-2 rounded bg-white px-1.5 py-0.5 font-semibold text-orange-500">↑ 22%</span>vs last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr_1fr]">
        <section className={`rounded-2xl bg-white p-5 ${SOFT_SHADOW}`}>
          <div className="flex items-start justify-between">
            <div>
              <Title>Revenue Overview</Title>
              <p className="text-xs text-gray-400">Total revenue over time</p>
            </div>
            <button className="flex items-center gap-2 rounded border px-3 py-1 text-sm">Day <ChevronDown className="size-4" /></button>
          </div>
          <p className="mt-3 flex items-center gap-3 text-3xl font-bold">
            $86,250 <span className="rounded bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-600">↗ 18.6%</span>
            <span className="text-[10px] font-normal text-gray-400">vs last week</span>
          </p>
          <svg viewBox={`-10 -10 ${w + 20} ${h + 20}`} className="mt-4 h-52 w-full">
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3B82F6" stopOpacity="0.15" />
                <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ")} L${w},${h} L0,${h} Z`} fill="url(#rev)" />
            {pts.slice(1).map(([x, y], i) => (
              <line key={i} x1={pts[i][0]} y1={pts[i][1]} x2={x} y2={y} stroke={y <= pts[i][1] ? "#16A34A" : "#EF1C1C"} strokeWidth="2" />
            ))}
            {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#F5B50B" />)}
          </svg>
          <div className="mt-2 flex justify-between text-[10px] text-gray-400">
            {days.map((d) => <span key={d}>{d}</span>)}
          </div>
        </section>

        <section className={`rounded-2xl bg-white p-5 ${SOFT_SHADOW}`}>
          <Title>Bookings Overview</Title>
          <p className="mb-5 text-xs text-gray-400">Bookings by status</p>
          <Donut items={bookings} value="1,250" sub="TOTAL" />
          <Legend items={bookings} />
        </section>

        <section className={`rounded-2xl bg-white p-5 ${SOFT_SHADOW}`}>
          <Title>Revenue by Category</Title>
          <p className="mb-5 text-xs text-gray-400">Breakdown of revenue by category</p>
          <Donut items={categories} value="$86,250" sub="TOTAL REVENUE" />
          <Legend items={categories} money />
        </section>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
        <section className={`rounded-2xl bg-white p-5 ${SOFT_SHADOW}`}>
          <div className="flex items-center justify-between">
            <Title>Top Performing Properties</Title>
            <button className="text-sm font-semibold text-[#0A6FD6]">View all properties</button>
          </div>
          <table className="mt-3 w-full text-left text-sm">
            <thead className="bg-[#EAF2FC] text-[11px] font-bold uppercase text-[#0A7BD6]">
              <tr>
                {["Property", "Views", "Bookings", "Revenue", "Conversion Rate"].map((c) => <th key={c} className="px-2 py-2">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {top.map((p, i) => (
                <tr key={i}>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-3">
                      <Image src={propertyimg} alt="" className="h-11 w-14 rounded object-cover" />
                      <div>
                        <p className="font-semibold">{p.t}</p>
                        <p className="text-[10px] text-gray-400">ID: {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 font-medium">{p.v}</td>
                  <td className="px-2 font-medium">{p.b}</td>
                  <td className="px-2 font-bold">{p.r}</td>
                  <td className="px-2"><span className="rounded bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">{p.c}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={`rounded-2xl bg-white p-5 ${SOFT_SHADOW}`}>
          <Title>Customer Growth</Title>
          <p className="text-xs text-gray-400">New vs returning customers</p>
          <div className="mt-3 flex gap-4 text-[10px] text-gray-600">
            <span className="flex items-center gap-1"><i className="size-2.5 bg-[#4CAF14]" /> New Customers</span>
            <span className="flex items-center gap-1"><i className="size-2.5 bg-[#0B7A0B]" /> Returning Customers</span>
          </div>
          <div className="mt-3 flex h-36 items-end justify-around border-b border-gray-200">
            {growth.map((g, i) => (
              <div key={i} className="flex w-5 flex-col justify-end">
                <div className="bg-[#0B7A0B]" style={{ height: `${g.ret}px` }} />
                <div className="bg-[#4CAF14]" style={{ height: `${g.fresh}px` }} />
              </div>
            ))}
          </div>
          <div className="mt-1 flex justify-around text-[9px] text-gray-400">
            {days.slice(0, 5).map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="mt-6 flex justify-between text-[10px] text-gray-400">
            <div>New Customers<p className="text-base font-bold text-gray-900">320 <span className="text-[10px] font-normal text-green-600">↑ 14.8%</span></p></div>
            <div>Returning Customers<p className="text-base font-bold text-gray-900">560 <span className="text-[10px] font-normal text-green-600">↑ 10.3%</span></p></div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((m) => (
          <div key={m.label} className={`rounded-2xl bg-gradient-to-br from-[#DCEBFF] to-[#EEF1FB] p-4 ${SOFT_SHADOW}`}>
            <p className="font-semibold leading-tight text-[#0496FF]">{m.label}</p>
            <p className="mt-1 text-xl font-bold">{m.value}</p>
            <p className="mt-2 text-[10px] text-gray-400">
              <span className="mr-2 rounded bg-white px-1.5 py-0.5 font-semibold text-orange-500">↑ 22%</span>vs last month
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
