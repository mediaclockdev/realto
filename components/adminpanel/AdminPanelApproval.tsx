"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Download,
  MoreVertical,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import pendingapprovalicon from "@/public/adminpanelicons/pendingapproval.svg";
import approvedicon from "@/public/adminpanelicons/approvedicon.svg";
import rejectedapprovalicon from "@/public/adminpanelicons/rejectedapproval.svg";
import approvaldate from "@/public/adminpanelicons/approvaldate.svg";
import approvalicon from "@/public/userpanelicons/verifieddocumentsicon.svg";
import FilterPill from "./FilterPill";
import propertyimg from "@/public/Luxury Modern Villa.jpg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const GOLD_BORDER = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};
const goldBtn = `flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-1.5 font-semibold text-[#E1AB18] ${SOFT_SHADOW}`;

// ponytail: static demo data, swap for an admin approval API when it exists
const stats = [
  {
    label: "Pending Approval",
    value: "320",
    change: "22%",
    Icon: pendingapprovalicon,
    color: "text-[#E1AB18]",
  },
  {
    label: "Approved",
    value: "1,250",
    change: "20%",
    Icon: approvedicon,
    color: "text-green-600",
  },
  {
    label: "Rejected",
    value: "180",
    change: "20%",
    Icon: rejectedapprovalicon,
    color: "text-red-600",
  },
  {
    label: "Approval Rate",
    value: "87%",
    change: "20%",
    Icon: approvaldate,
    color: "text-[#0496FF]",
  },
];

const categoryStyle: Record<string, string> = {
  "Luxury Property": "bg-[#FFF4D6] text-[#C99A10]",
  Land: "bg-[#DDF5E6] text-[#16803C]",
  Commercial: "bg-[#DCEEFF] text-[#0A4FA0]",
  Flatmates: "bg-[#CFF0FF] text-[#0A6FA0]",
  "Student Res  idency": "bg-[#FDE0E0] text-[#B42318]",
};

const seed = [
  ["LuxuryOcean View Villa", "Rent", "Luxury Property"],
  ["Green Valley Land", "Buy", "Land"],
  ["Modern Luxury Apartment", "Buy", "Commercial"],
  ["Modern Luxury Apartment", "Buy", "Flatmates"],
  ["Modern Luxury Apartment", "Buy", "Student Residency"],
  ["LuxuryOcean View Villa", "Rent", "Luxury Property"],
  ["Green Valley Land", "Buy", "Land"],
  ["Modern Luxury Apartment", "Buy", "Commercial"],
  ["Modern Luxury Apartment", "Buy", "Flatmates"],
  ["Modern Luxury Apartment", "Buy", "Student Residency"],
].map(([title, type, cat], id) => ({ id, title, type, cat }));

const filters = ["Property Type", "Category", "Location", "Agent"];
const columns = ["Property", "Type", "Category", "Location", "Agent", "Action"];

export default function AdminPanelApproval() {
  const [rows, setRows] = useState(seed);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const shown = rows.filter((r) =>
    r.title.toLowerCase().includes(q.toLowerCase()),
  );
  // ponytail: approve/reject only drops the row locally; wire to API when available
  const remove = (id: number) => setRows((rs) => rs.filter((r) => r.id !== id));

  return (
    <div className="space-y-5 text-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1
          className={`flex w-fit items-center gap-6 rounded-xl border-2 border-transparent px-3 py-2 text-2xl font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          style={GOLD_BORDER}
        >
          Listing Approval
          <Image src={approvalicon} alt="" className="size-10" />
        </h1>
        <button className={`${goldBtn} text-xl`} style={GOLD_BORDER}>
          <Download className="size-8 rounded-full bg-[#D9A91B] p-1.5 text-white" />{" "}
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, Icon, color }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#DCEBFF] to-[#EEF1FB] p-3 ${SOFT_SHADOW}`}
          >
            <Image
              src={Icon}
              alt="icons"
              className={`size-12 shrink-0 ${color}`}
            />
            <div>
              <p className="text-lg font-semibold text-[#0496FF]">{label}</p>
              <p className="mt-1 text-2xl font-bold">{value}</p>
              <p className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                <span className="rounded bg-white px-2 py-0.5 font-semibold text-green-600">
                  ↑ {change}
                </span>
                vs last month
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-white p-4 shadow-[0_0_12px_#DDE3EE]">
        <div className="flex flex-wrap items-center gap-3">
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
          <FilterPill
            icon={<RotateCcw className="size-4" />}
            onClick={() => {
              setRows(seed);
              setQ("");
            }}
          >
            Reset
          </FilterPill>
          <label
            className={`ml-auto flex min-w-48 max-w-sm flex-1 items-center rounded-full bg-white px-4 py-2 ${SOFT_SHADOW}`}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type to search"
              className="w-full bg-transparent font-TimesNewRoman text-lg italic outline-none placeholder:text-gray-400"
            />
            <Search className="size-6 text-[#E1AB18]" />
          </label>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#EAF2FC] text-sm font-semibold text-[#0A7BD6]">
              <tr>
                {columns.map((c) => (
                  <th
                    key={c}
                    className={`whitespace-nowrap px-3 py-3 text-center align-middle`}
                  >
                    {c}
                    {c !== "Action" && (
                      <ChevronDown className="ml-1 inline size-3" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id} className="border-b border-gray-100">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="size-5 shrink-0 fill-green-500 text-white" />
                      <Image
                        src={propertyimg}
                        alt=""
                        className="h-16 w-20 rounded object-cover"
                      />
                      <div>
                        <p className="text-lg font-semibold leading-tight">
                          {r.title}
                        </p>
                        <p className="text-xs text-gray-500">ID: PRP000124</p>
                        <p className="text-xs text-gray-600">
                          4 Beds | 3 Baths | 2,500 sqft
                        </p>
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
                  <td className="px-3 text-center">
                    <p className="text-sm font-bold">Kevin Jr.</p>
                    <p className="text-xs text-gray-400">Elders Real Estate</p>
                  </td>
                  <td className="px-3">
                    <div className="flex items-center justify-center gap-4 font-semibold">
                      <button
                        onClick={() => remove(r.id)}
                        className="flex cursor-pointer items-center gap-1 text-green-600"
                      >
                        <Check className="size-4" /> Approve
                      </button>
                      <button
                        onClick={() => remove(r.id)}
                        className="flex cursor-pointer items-center gap-1 text-red-600"
                      >
                        <X className="size-4" /> Reject
                      </button>
                      <MoreVertical className="size-5 text-[#E1AB18]" />
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
