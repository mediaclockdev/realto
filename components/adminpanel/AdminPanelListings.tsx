"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Download,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import dashboardicon from "@/public/agentpanelicons/sidebarmylistingicon.svg";
import totalicon from "@/public/homepagecommercialicon.svg";
import buyicon from "@/public/homepagesaleicon.svg";
import renticon from "@/public/homepagerenticon.svg";
import activeicon from "@/public/agentpanelicons/profileactivelistingicon.svg";
import eyeicon from "@/public/authicons/eyeopen.svg";
import dotsicon from "@/public/agentpanelicons/leadmanagement3doticon.svg";
import FilterPill from "./FilterPill";
import propertyimg from "@/public/Luxury Modern Villa.jpg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const GOLD_BORDER = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};
const goldBtn = `flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-1.5 font-semibold text-[#E1AB18] ${SOFT_SHADOW}`;

// ponytail: static demo data, swap for an admin listings API when it exists
const stats = [
  {
    label: "Total Properties",
    img: totalicon,
    value: "1,500",
    change: "20%",
    up: true,
  },
  {
    label: "Buy Properties",
    img: buyicon,
    value: "450",
    change: "20%",
    up: true,
  },
  {
    label: "Rent Properties",
    img: renticon,
    value: "1,050",
    change: "22%",
    up: true,
  },
  {
    label: "Active Properties",
    img: activeicon,
    value: "980",
    change: "20%",
    up: true,
  },
];

const categoryStyle: Record<string, string> = {
  "Luxury Property": "bg-[#FFF4D6] text-[#C99A10]",
  Land: "bg-[#DDF5E6] text-[#16803C]",
  Commercial: "bg-[#DCEEFF] text-[#0A4FA0]",
  Flatmates: "bg-[#CFF0FF] text-[#0A6FA0]",
  "Student Residency": "bg-[#FDE0E0] text-[#B42318]",
};

const rows = [
  {
    title: "LuxuryOcean Vie...",
    type: "Rent",
    cat: "Luxury Property",
    price: "$2,500/m",
  },
  { title: "Green Valley Land", type: "Buy", cat: "Land", price: "$2,500/m" },
  {
    title: "Modern Luxury A...",
    type: "Buy",
    cat: "Commercial",
    price: "$2,500/m",
  },
  {
    title: "Modern Luxury A...",
    type: "Buy",
    cat: "Flatmates",
    price: "$2,500/m",
  },
  {
    title: "Modern Luxury A...",
    type: "Buy",
    cat: "Student Residency",
    price: "$2,500/m",
  },
  {
    title: "LuxuryOcean Vie...",
    type: "Rent",
    cat: "Luxury Property",
    price: "$2,500/m",
  },
  { title: "Green Valley Land", type: "Buy", cat: "Land", price: "$2,500/m" },
  {
    title: "Modern Luxury A...",
    type: "Buy",
    cat: "Commercial",
    price: "$2,500/m",
  },
  {
    title: "Modern Luxury Apartment",
    type: "Buy",
    cat: "Flatmates",
    price: "$2,500/m",
  },
  {
    title: "Modern Luxury Apartment",
    type: "Buy",
    cat: "Student Residency",
    price: "$2,500/m",
  },
];

const filters = [
  "Property Type",
  "Category",
  "Location",
  "Price Range",
  "Bedrooms",
  "Status",
  "Agent",
];
const tabs = ["All Properties", "Buy", "Rent"];
const columns = [
  "Property",
  "Type",
  "Category",
  "Location",
  "Price",
  "Bedrooms",
  "Agent",
  "Status",
  "Action",
];

export default function AdminPanelListings() {
  const [tab, setTab] = useState("All Properties");
  const [page, setPage] = useState(1);
  const shown = rows.filter((r) => tab === "All Properties" || r.type === tab);
  const [selected, setSelected] = useState<Set<object>>(new Set());
  const allOn = shown.length > 0 && shown.every((r) => selected.has(r));
  const toggle = (r: object) =>
    setSelected((s) => {
      const n = new Set(s);
      if (!n.delete(r)) n.add(r);
      return n;
    });
  const toggleAll = () => setSelected(allOn ? new Set() : new Set(shown));
  const tick = (on: boolean, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="shrink-0 cursor-pointer"
    >
      {on ? (
        <CheckCircle2 className="size-5 fill-green-500 text-white" />
      ) : (
        <span className="block size-5 rounded-full border-2 border-gray-300 bg-white" />
      )}
    </button>
  );

  return (
    <div className="space-y-5 text-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1
          className={`flex w-fit items-center gap-6 rounded-xl border-2 border-transparent px-3 py-2 text-2xl font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          style={GOLD_BORDER}
        >
          Property Listing
          <Image src={dashboardicon} alt="" className="size-10" />
        </h1>
        <div className="flex gap-4">
          <button className={`${goldBtn} text-xl`} style={GOLD_BORDER}>
            <Download className="size-8 rounded-full bg-[#D9A91B] p-1.5 text-white" />{" "}
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#DCEBFF] to-[#EEF1FB] p-3 ${SOFT_SHADOW}`}
          >
            <Image
              src={s.img}
              alt=""
              className="size-12 shrink-0 object-contain"
            />
            <div>
              <p className="text-lg font-semibold text-[#0496FF]">{s.label}</p>
              <p className="mt-1 text-2xl font-bold">{s.value}</p>
              <p className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                <span className="rounded bg-white px-2 py-0.5 font-semibold text-green-600">
                  ↑ {s.change}
                </span>
                vs last month
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-white p-4 shadow-[0_0_12px_#DDE3EE]">
        <div className="flex flex-wrap items-center gap-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setPage(1);
              }}
              className={`border-b-2 pb-2 text-lg font-semibold ${tab === t ? "border-[#0A4FA0] text-[#0A4FA0]" : "border-transparent text-gray-500"}`}
            >
              {t}
            </button>
          ))}
          <label
            className={`ml-auto flex min-w-48 max-w-sm flex-1 items-center rounded-full bg-white px-4 py-2 ${SOFT_SHADOW}`}
          >
            <input
              placeholder="Type to search"
              className="w-full bg-transparent font-TimesNewRoman text-lg italic outline-none placeholder:text-gray-400"
            />
            <Search className="size-6 text-[#E1AB18]" />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap justify-between gap-0">
          {filters.map((f) => (
            <FilterPill key={f} arrow>
              {f}
            </FilterPill>
          ))}
          <FilterPill
            icon={<SlidersHorizontal className="size-4" />}
            badge={
              <span className="flex size-5 items-center justify-center rounded-full bg-[#2F7BE8] text-xs text-white">
                2
              </span>
            }
          >
            Filters
          </FilterPill>
          <FilterPill icon={<RotateCcw className="size-4" />}>Reset</FilterPill>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-[#EAF2FC] text-sm font-semibold text-[#0A7BD6]">
              <tr>
                {columns.map((c, ci) => (
                  <th
                    key={c}
                    className="whitespace-nowrap px-3 py-3 text-center align-middle"
                  >
                    <span className="inline-flex items-center gap-1">
                      {ci === 0 && (
                        <span className="mr-2">{tick(allOn, toggleAll)}</span>
                      )}
                      {c}
                      {c !== "Action" && <ChevronDown className="size-3" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((r, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      {tick(selected.has(r), () => toggle(r))}
                      <Image
                        src={propertyimg}
                        alt=""
                        className="h-16 w-20 rounded object-cover"
                      />
                      <div>
                        <p className="max-w-[170px] text-lg font-semibold leading-tight">
                          {r.title}
                        </p>
                        <p className="text-xs text-gray-500">ID: PRP000124</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 text-center text-gray-700">{r.type}</td>
                  <td className="px-3 text-center">
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${categoryStyle[r.cat]}`}
                    >
                      {r.cat}
                    </span>
                  </td>
                  <td className="px-3 text-center text-gray-700">
                    Sydney,
                    <br />
                    Australia
                  </td>
                  <td className="px-3 text-center font-bold">{r.price}</td>
                  <td className="px-3 text-center text-gray-700">4 Beds</td>
                  <td className="px-3 text-center">
                    <p className="text-sm font-bold">Kevin Jr.</p>
                    <p className="text-xs text-gray-400">Elders Real Estate</p>
                  </td>
                  <td className="px-3 text-center">
                    <span className="whitespace-nowrap rounded-full bg-[#CFF5DD] px-3 py-1.5 text-xs font-bold text-[#16A34A]">
                      Luxury Property
                    </span>
                  </td>
                  <td className="px-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Image
                        src={eyeicon}
                        alt="View"
                        className="h-7 w-auto cursor-pointer"
                      />
                      <Image
                        src={dotsicon}
                        alt="More"
                        className="h-6 w-auto cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-gray-600">
          <span>Showing 1 to {shown.length} of 32 leads</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              className="rounded border bg-white p-2"
            >
              <ChevronLeft className="size-4" />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`size-9 rounded border ${page === n ? "border-[#1D6FE8] bg-[#1D6FE8] font-bold text-white" : "bg-white"}`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(3, page + 1))}
              className="rounded border bg-white p-2"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
