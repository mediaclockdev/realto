"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";
import bookingsicon from "@/public/userpanelicons/userpanelinspectionbookingicon.svg";
import avatar from "@/public/agentimg1.jpg";
import clockicon from "@/public/luxuryclockicon.svg";
import hotel from "@/public/Luxury Modern Villa.jpg";
import cancelledicon from "@/public/adminpanelicons/canceledicon.svg";
import confirmedicon from "@/public/adminpanelicons/confirmedicon.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const GOLD_BORDER = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};
const goldBtn = `flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-1.5 font-semibold text-[#E1AB18] ${SOFT_SHADOW}`;
const chip = `flex items-center gap-2 rounded-lg px-3 py-1.5 font-semibold text-[#E1AB18] ${SOFT_SHADOW}`;

// ponytail: static demo data, swap for an admin bookings API when it exists
const stats = [
  {
    label: "Total Bookings",
    value: "1,250",
    delta: "↑ 22%",
    color: "text-[#0496FF]",
    img: bookingsicon,
  },
  {
    label: "Confirmed",
    value: "980",
    delta: "↑ 20%",
    color: "text-[#16A34A]",
    img: confirmedicon,
  },
  {
    label: "Pending",
    value: "180",
    delta: "↓ 8%",
    color: "text-[#F59E0B]",
    img: clockicon,
  },
  {
    label: "Cancelled",
    value: "90",
    delta: "↓ 8%",
    color: "text-red-600",
    img: cancelledicon,
  },
];
const statusColor: Record<string, string> = {
  Confirmed: "text-[#16803C]",
  Pending: "text-[#E1AB18]",
  Cancelled: "text-red-600",
};
const payColor: Record<string, string> = {
  Paid: "text-[#1D4ED8]",
  Partial: "text-[#0496FF]",
  Refunded: "text-[#1E3A8A]",
};
const rows = Array.from({ length: 10 }, (_, i) => ({
  status: i === 1 ? "Pending" : i === 2 ? "Cancelled" : "Confirmed",
  payment: i === 1 ? "Partial" : i === 2 ? "Refunded" : "Paid",
}));
const filters = [
  "Date Range",
  "Status",
  "Room Type",
  "Payment Status",
  "Hotel",
];
const columns = [
  "Booking Id",
  "Guest",
  "Hotel/Room",
  "Check-In",
  "Check-Out",
  "Guests",
  "Total Amount",
  "Status",
  "Payment",
  "Action",
];

const pill = (text: string, color: string) => (
  <span
    className={`inline-block rounded-full bg-white px-5 py-3 text-sm font-bold ${SOFT_SHADOW} ${color}`}
  >
    {text}
  </span>
);

export default function AdminPanelBookings() {
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-5 text-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1
          className={`flex w-fit items-center gap-6 rounded-xl border-2 border-transparent px-3 py-2 text-2xl font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          style={GOLD_BORDER}
        >
          Bookings
          <Image src={bookingsicon} alt="" className="size-10" />
        </h1>
        <div className="flex gap-4">
          <button className={`${goldBtn} text-xl`} style={GOLD_BORDER}>
            <Download className="size-8 rounded-full bg-[#D9A91B] p-1.5 text-white" />{" "}
            Export
          </button>
          <button className={`${goldBtn} text-xl`} style={GOLD_BORDER}>
            <Plus
              className="size-8 rounded-full bg-[#D9A91B] p-1 text-white"
              strokeWidth={4}
            />{" "}
            Add New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#DCEBFF] to-[#EEF1FB] p-3 ${SOFT_SHADOW}`}
          >
            <Image src={s.img} alt="" className="size-12 shrink-0" />
            <div>
              <p className={`text-lg font-semibold ${s.color}`}>{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                <span className="rounded bg-white px-2 py-0.5 font-semibold text-orange-500">
                  {s.delta}
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
            className={`ml-auto flex w-56 items-center rounded-full bg-white px-4 py-2 ${SOFT_SHADOW}`}
          >
            <input
              placeholder="Type to search"
              className="w-full bg-transparent font-TimesNewRoman text-lg italic outline-none placeholder:text-gray-400"
            />
            <Search className="size-6 text-[#E1AB18]" />
          </label>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1250px] text-left">
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
                      #PRP000124
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
                          John Smith
                        </p>
                        <p className="max-w-[130px] break-all text-xs text-gray-400">
                          john.smith@gmail.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={hotel}
                        alt=""
                        className="size-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-semibold leading-tight">
                          Ocean View
                        </p>
                        <p className="text-xs text-gray-400">
                          Deluxe Sea View • 101
                        </p>
                      </div>
                    </div>
                  </td>
                  {["Check-In", "Check-Out"].map((d) => (
                    <td key={d} className="px-3">
                      <p className="font-semibold">May 21, 2026</p>
                      <p className="text-xs text-gray-400">2:00 PM</p>
                    </td>
                  ))}
                  <td className="px-3">
                    <p className="text-sm font-semibold">2 Adults</p>
                    <p className="text-xs text-gray-400">1 Children</p>
                  </td>
                  <td className="px-3 font-semibold">$750</td>
                  <td className="px-3">
                    {pill(r.status, statusColor[r.status])}
                  </td>
                  <td className="px-3">
                    {pill(
                      r.payment === "Paid" ? "✓ Paid" : r.payment,
                      payColor[r.payment],
                    )}
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
