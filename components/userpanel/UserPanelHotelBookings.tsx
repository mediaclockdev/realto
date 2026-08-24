"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CirclePlus,
  ChevronUp,
  ChevronDown,
  Star,
  MapPin,
  Search,
  User,
  Eye,
} from "lucide-react";

import mylistingsicon from "@/public/agentpanelicons/sidebarmylistingicon.svg";
import calendericon from "@/public/agentpanelicons/analtyicscalendericon.svg";
import bedicon from "@/public/beds.svg";
import dotmenu from "@/public/agentpanelicons/leadmanagement3doticon.svg";
import hotelimg1 from "@/public/hotelimg1.jpg";
import hotelimg2 from "@/public/hotelimg2.jpg";
import hotel2 from "@/public/hotel2.jpeg";
import hotel3 from "@/public/hotel3.jpeg";
import hotel4 from "@/public/hotel4.jpeg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-green-50 text-green-600",
  PENDING: "bg-amber-50 text-amber-600",
  COMPLETED: "bg-gray-100 text-gray-500",
};

const thumbs = [hotelimg1, hotel2, hotel3, hotel4, hotelimg2];

const upcomingRows = ["CONFIRMED", "PENDING", "PENDING", "PENDING", "PENDING"].map(
  (status, i) => ({
    name: "Luxury Ocean View Villa",
    address: "123 Ocean Drive, Miami, FL 33139, USA",
    checkIn: "May 24, 2025",
    checkOut: "May 26, 2025",
    time: "10:00 AM",
    rooms: "1 Room",
    guests: "2 Guests",
    status,
    bookingId: "#BK-1001",
    thumb: thumbs[i % thumbs.length],
  }),
);

const pastRows = Array.from({ length: 5 }, (_, i) => ({
  name: "Luxury Ocean View Villa",
  address: "123 Ocean Drive, Miami, FL 33139, USA",
  checkIn: "May 24, 2025",
  checkOut: "May 26, 2025",
  time: "10:00 AM",
  rooms: "1 Room",
  guests: "2 Guests",
  status: "COMPLETED",
  bookingId: "#BK-1001",
  thumb: thumbs[i % thumbs.length],
}));

function Stars() {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
      ))}
      <Star className="size-3 text-gray-300" />
    </span>
  );
}

function Stepper({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
      <span className="text-lg font-semibold text-gray-900">{value}</span>
      <span className="flex flex-col text-gray-400">
        <ChevronUp className="size-3" />
        <ChevronDown className="size-3" />
      </span>
    </div>
  );
}

function BookingsTable({
  rows,
}: {
  rows: typeof upcomingRows;
}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="bg-[#EAF4FE] text-[#2495FF]">
            <th className="rounded-l-lg py-3 pl-4 text-base font-bold">
              Hotel Details
            </th>
            <th className="py-3 text-base font-bold text-green-600">
              Check-In
            </th>
            <th className="py-3 text-base font-bold text-red-500">
              Check-Out
            </th>
            <th className="py-3 text-base font-bold text-orange-500">
              Rooms/Guests
            </th>
            <th className="py-3 text-base font-bold">Status</th>
            <th className="py-3 text-base font-bold">Booking Id</th>
            <th className="rounded-r-lg py-3 pr-4 text-base font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-3 pl-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={row.thumb}
                    alt={row.name}
                    className="size-11 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{row.name}</p>
                    <Stars />
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="size-3" /> {row.address}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3">
                <p className="font-bold text-gray-900">{row.checkIn}</p>
                <p className="text-xs text-gray-500">{row.time}</p>
              </td>
              <td className="py-3">
                <p className="font-bold text-gray-900">{row.checkOut}</p>
                <p className="text-xs text-gray-500">{row.time}</p>
              </td>
              <td className="py-3 text-gray-700">
                <p>{row.rooms}</p>
                <p>{row.guests}</p>
              </td>
              <td className="py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[row.status]}`}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-3 font-semibold text-gray-700">
                {row.bookingId}
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <Eye className="size-5 text-gray-500" />
                  <Image src={dotmenu} alt="" className="h-6 w-auto" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pagination({ showing, total }: { showing: number; total: number }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-gray-500">
        Showing 1 to {showing} of {total} leads
      </p>
      <div className="flex items-center gap-2">
        <button className="flex size-9 items-center justify-center rounded-xl bg-[#D7E9FB] text-[#2495FF]">
          <ChevronDown className="size-4 rotate-90" />
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`flex size-9 items-center justify-center rounded-xl font-bold ${
              page === 1
                ? "bg-[#1E6FD9] text-white"
                : "bg-[#D7E9FB] text-[#2495FF]"
            }`}
          >
            {page}
          </button>
        ))}
        <button className="flex size-9 items-center justify-center rounded-xl bg-[#D7E9FB] text-[#2495FF]">
          <ChevronDown className="size-4 -rotate-90" />
        </button>
      </div>
    </div>
  );
}

export default function UserPanelHotelBookings() {
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");

  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-2 py-2 text-xl font-semibold text-[#E1AB18]">
          Hotel Bookings
          <Image src={mylistingsicon} alt="" width={28} height={28} />
        </span>
        <button
          className={`flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-base font-bold text-gray-900 ${SOFT_SHADOW}`}
        >
          <CirclePlus className="size-8 fill-[#E1AB18] text-white" />
          Book New Hotel
        </button>
      </div>
      <p className="italic text-gray-600">
        Search and book hotels for your upcoming trips. View and manage your
        bookings.
      </p>

      {/* Search bar */}
      <div className={`rounded-2xl bg-white p-4 ${SOFT_SHADOW}`}>
        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <label className="block">
            <span className="font-bold text-green-600">Check-in</span>
            <span className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <Image src={calendericon} alt="" className="size-6 shrink-0" />
              <input
                type="text"
                defaultValue="May 24, 2025"
                className="w-full text-gray-900 outline-none"
              />
            </span>
          </label>
          <label className="block">
            <span className="font-bold text-red-500">Check-out</span>
            <span className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <Image src={calendericon} alt="" className="size-6 shrink-0" />
              <input
                type="text"
                defaultValue="May 24, 2025"
                className="w-full text-gray-900 outline-none"
              />
            </span>
          </label>
          <label className="block">
            <span className="flex items-center gap-1.5 font-bold text-[#2495FF]">
              <User className="size-4 rounded-full bg-sky-100 p-0.5" /> Guest
            </span>
            <div className="mt-1">
              <Stepper value={1} />
            </div>
          </label>
          <label className="block">
            <span className="flex items-center gap-1.5 font-bold text-[#2495FF]">
              <Image src={bedicon} alt="" className="size-4" /> No. of Rooms
            </span>
            <div className="mt-1">
              <Stepper value={1} />
            </div>
          </label>
          <button className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 font-bold text-white">
            Search Hotels <Search className="size-5" />
          </button>
        </div>
      </div>

      {/* Upcoming / Past */}
      <div className={`rounded-2xl bg-white p-4 ${SOFT_SHADOW}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-6 border-b border-gray-200">
            {(["Upcoming", "Past"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`-mb-px border-b-2 px-1 pb-2 text-lg font-bold ${
                  tab === t
                    ? "border-[#2495FF] text-[#2495FF]"
                    : "border-transparent text-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
          </select>
        </div>

        <BookingsTable rows={tab === "Upcoming" ? upcomingRows : pastRows} />
        <Pagination showing={5} total={32} />
      </div>

      {/* Past bookings */}
      <div className={`rounded-2xl bg-white p-4 ${SOFT_SHADOW}`}>
        <p className="w-fit rounded-full bg-[#F1F3F2] px-4 py-2 text-xl font-bold text-[#2495FF]">
          Past Bookings
        </p>
        <BookingsTable rows={pastRows} />
        <Pagination showing={10} total={32} />
      </div>
    </main>
  );
}
