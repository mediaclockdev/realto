"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Download,
  MoreVertical,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import agentsicon from "@/public/agentpanelicons/sidebarleadsmanagementicon.svg";
import avatar from "@/public/agentimg1.jpg";
import newcustomersicon from "@/public/adminpanelicons/newthismonth.svg";
import activeagentsicon from "@/public/adminpanelicons/activeagents.svg";
import totalagentsicon from "@/public/adminpanelicons/totalagents.svg";
import topperformersicon from "@/public/adminpanelicons/topperformer.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const GOLD_BORDER = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};
const goldBtn = `flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-1.5 font-semibold text-[#E1AB18] ${SOFT_SHADOW}`;
const chip = `flex items-center gap-2 rounded-lg px-3 py-1.5 font-semibold text-[#E1AB18] ${SOFT_SHADOW}`;

// ponytail: static demo data, swap for an admin agents API when it exists
const stats = [
  { label: "Total Agents", value: "560", Icon: totalagentsicon },
  { label: "Active Agents", value: "98", Icon: activeagentsicon },
  { label: "New This Month", value: "12", Icon: newcustomersicon },
  { label: "Top Performers", value: "15", Icon: topperformersicon },
];
const rows = Array.from({ length: 10 }, () => ({
  id: "#PRP000124",
  name: "John Smith",
  contact: "john.smith@gmail.com | 0000 0000",
  spec: "Residential",
  props: 800,
  rating: 4.8,
  status: "Active",
  joined: "May 21, 2025",
  time: "08:00 am",
}));
const filters = ["Status", "Location", "Specialization", "Performance"];
const columns = [
  "Id",
  "Agent",
  "Specialization",
  "Properties",
  "Performance",
  "Status",
  "Joined On",
  "Action",
];

export default function AdminPanelAgents() {
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-5 text-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1
          className={`flex w-fit items-center gap-6 rounded-xl border-2 border-transparent px-3 py-2 text-2xl font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          style={GOLD_BORDER}
        >
          Manage Agents
          <Image src={agentsicon} alt="" className="size-10" />
        </h1>
        <div className="flex gap-4">
          <button className={`${goldBtn} text-xl`} style={GOLD_BORDER}>
            <Download className="size-8 rounded-full bg-[#D9A91B] p-1.5 text-white" />{" "}
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#DCEBFF] to-[#EEF1FB] p-3 ${SOFT_SHADOW}`}
          >
            <Image
              src={s.Icon}
              alt=""
              className="size-9 shrink-0 text-[#E1AB18]"
            />
            <div>
              <p className="text-lg font-semibold text-[#0496FF]">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                <span className="rounded bg-white px-2 py-0.5 font-semibold text-orange-500">
                  ↑ 22%
                </span>
                vs last month
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-white p-4 shadow-[0_0_12px_#DDE3EE]">
        <div className="flex flex-wrap items-center gap-3 xl:flex-nowrap">
          {filters.map((f) => (
            <button key={f} className={chip}>
              {f}{" "}
              <ChevronDown className="size-4 text-[#0A9BFF]" strokeWidth={3} />
            </button>
          ))}
          <button className={chip}>
            <SlidersHorizontal className="size-4" /> Filters
            <span className="flex size-5 items-center justify-center rounded-full bg-[#2F7BE8] text-xs text-white">
              2
            </span>
          </button>
          <button className={chip}>
            <RotateCcw className="size-4" /> Reset
          </button>
          <label
            className={`ml-auto flex w-64 items-center rounded-full bg-white px-4 py-2 ${SOFT_SHADOW}`}
          >
            <input
              placeholder="Type to search"
              className="w-full bg-transparent font-TimesNewRoman text-lg italic outline-none placeholder:text-gray-400"
            />
            <Search className="size-6 text-[#E1AB18]" />
          </label>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-[#EAF2FC] text-sm font-semibold text-[#0A7BD6]">
              <tr>
                {columns.map((c) => (
                  <th key={c} className="px-3 py-3">
                    {c}
                    {c !== "Action" && (
                      <ChevronDown className="ml-1 inline size-3" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="size-5 shrink-0 fill-green-500 text-white" />
                      {r.id}
                    </div>
                  </td>
                  <td className="px-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={avatar}
                        alt=""
                        className="size-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-lg font-semibold leading-tight">
                          {r.name}
                        </p>
                        <p className="max-w-[170px] text-xs text-gray-400">
                          {r.contact}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3">
                    <span
                      className={`rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#1D6FE8] ${SOFT_SHADOW}`}
                    >
                      {r.spec}
                    </span>
                  </td>
                  <td className="px-3 font-semibold">{r.props}</td>
                  <td className="px-3 font-semibold">
                    {r.rating}{" "}
                    <Star className="ml-1 inline size-4 fill-[#F7B500] text-[#F7B500]" />
                  </td>
                  <td className="px-3">
                    <span
                      className={`rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#16803C] ${SOFT_SHADOW}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3">
                    <p className="font-semibold">{r.joined}</p>
                    <p className="text-xs text-gray-400">{r.time}</p>
                  </td>
                  <td className="px-3">
                    <MoreVertical className="size-5 text-[#E1AB18]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-gray-600">
          <span>Showing 1 to {rows.length} of 32 leads</span>
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
