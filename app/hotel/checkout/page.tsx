import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle2,
  Mail,
  Phone,
  IdCard,
  Plus,
} from "lucide-react";
import {
  getHotelListingById,
  getHotelListings,
  getHotelRooms,
} from "@/lib/hotel/repository";
import starIcon from "@/public/starsingle.svg";
import locationIcon from "@/public/location.svg";
import checkInIcon from "@/public/calendericonhotel.svg";
import checkOutIcon from "@/public/calendericonhotel1.svg";
import guestIcon from "@/public/loginusericon.svg";
import roomIcon from "@/public/bedhotelicon.svg";
import supersaverIcon from "@/public/supersaver.svg";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const REQUESTS: [string, string[], boolean][] = [
  ["Check-in / Check-out", ["Early Check-in", "Late Check-out"], true],
  ["Room Preference", ["Room near lift lobby", "Room on a higher floor"], true],
  ["Celebrations", ["Celebration note", "Room decoration"], true],
  ["Bed Type", ["King Bed", "Twin Bed"], false],
  ["Smoking Preference", ["Smoking Room", "Non-Smoking Room"], false],
  ["Transfers", ["Airport Transfers", "Railway Transfers"], true],
];

const card = "rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]";
const pill =
  "inline-block rounded-full bg-gradient-to-b from-[#4aa8ff] to-[#0a6fe0] px-5 py-1.5 text-lg text-white shadow";
const field =
  "flex items-center justify-between rounded-xl border-2 border-[#D9A441] px-3 py-2";

import bg from "@/public/hotelherobg.png";

export default async function CheckoutPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const hotelId = typeof params.hotel === "string" ? params.hotel : "";
  const hotel = getHotelListingById(hotelId) ?? getHotelListings()[0];
  const rooms = getHotelRooms(hotel);
  const room = rooms.find((r) => r.id === params.room) ?? rooms[0];

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-16">
      <div className="relative">
        {/* Hero Background */}
        <div className="absolute inset-x-0 top-0 h-[400px] overflow-hidden">
          <Image
            src={bg}
            alt="Hero Background"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 pt-32">
          {/* Hotel summary */}
          <section className="grid overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-3 p-6">
              <h1 className="font-serif text-3xl font-bold text-[#0F172A]">
                {hotel.title} {hotel.subtitle}
              </h1>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 rounded bg-blue-50 px-1.5 font-semibold text-[#0496FF]">
                  4.3 <Image src={starIcon} alt="star" className="h-4 w-4" />
                </span>
                <span className="text-[#64748B]">
                  Excellent (55,571 Reviews)
                </span>
              </div>
              <p className="flex items-center gap-2 text-sm font-bold font-TimesNewRoman text-black">
                <Image src={locationIcon} alt="location" className="h-8 w-8" />
                {hotel.location}
              </p>
              <Link
                href="/login"
                className="flex items-center gap-3 rounded-xl border border-[#0496FF] bg-[#C0E8FF] px-3 py-2 text-sm font-semibold text-[#343434]"
              >
                <Image src={supersaverIcon} alt="gift" className="h-8 w-8" />{" "}
                <span className="text-[#92400E]">
                  Sign in or register to earn up to 50 points after check-out
                </span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className={field}>
                  <Image
                    src={checkInIcon}
                    alt="check-in"
                    className="h-10 w-10"
                  />
                  <div className="text-sm font-TimesNewRoman">
                    <p className=" text-[#04A004]">Check-in</p>
                    <p className=" text-[#1E293B]">25 Aug Thu</p>
                    <p className=" text-[#64748B]">1:00 pm</p>
                  </div>
                </div>
                <span className="rounded-lg border bg-gray-50 px-3 py-1 text-sm font-semibold shadow-sm">
                  7 Nights
                </span>
                <div className={field}>
                  <div className="text-right text-sm">
                    <p className="text-xs text-red-500">Check-out</p>
                    <p className="font-semibold">01 Sep Sat</p>
                    <p className="text-xs text-gray-500">10:00 am</p>
                  </div>
                  <Image
                    src={checkOutIcon}
                    alt="check-out"
                    className="h-10 w-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className={`${field} justify-start gap-3`}>
                  <Image src={guestIcon} alt="guests" className="h-10 w-10" />
                  <div className="text-sm">
                    <p className="text-xs text-gray-400">Guests</p>
                    <p className="font-semibold">2 Guests</p>
                  </div>
                </div>
                <div className={`${field} justify-start gap-3`}>
                  <Image src={roomIcon} alt="rooms" className="h-10 w-10" />
                  <div className="text-sm">
                    <p className="text-xs text-gray-400">Rooms</p>
                    <p className="font-semibold">1 Room</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative min-h-60">
              <Image
                src={hotel.heroImage}
                alt={hotel.title}
                fill
                className="object-cover"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-5xl space-y-6 px-4">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          {/* Room details */}
          <section className={card}>
            <span className={pill}>Room Details</span>
            <h2 className="mt-4 font-semibold">{room.name}</h2>
            <p className="text-gray-400">2 Adults • 7 Nights</p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-gray-500">
              <li>Room With Free Cancellation</li>
              <li>No meals included</li>
            </ul>
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="text-green-600">
                Free Cancellation till 24 hrs before check in
              </span>
              <button className="text-red-500">
                Cancellation policy details
              </button>
            </p>
            <div className="mt-4 flex h-7 max-w-sm overflow-hidden rounded-full text-sm">
              <span className="flex-1 bg-green-700 pl-4 leading-7 text-white">
                100% Refund
              </span>
              <span className="flex-1 bg-amber-50 text-center leading-7 text-red-500">
                Non Refundable
              </span>
            </div>
            <div className="mt-1 flex max-w-sm justify-between text-center text-xs text-gray-600">
              <span>NOW</span>
              <span>
                24 AUG
                <br />
                07:59 AM
              </span>
              <span>
                25 AUG
                <br />
                11:00 AM
                <br />
                <span className="text-gray-400">Check-in</span>
              </span>
            </div>
          </section>

          {/* Price */}
          <section className={`${card} flex flex-col gap-3`}>
            <div className="flex justify-between text-lg">
              <span>Base Price</span>
              <span>{room.price}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>1 Room × 7 Night</span>
              <span>$819</span>
            </div>
            <div className="flex justify-between text-lg text-green-600">
              <span>Discount (15%)</span>
              <span>$122</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border-2 border-[#0496FF] px-3 py-2">
              <div>
                <p className="text-xs text-gray-400">Coupon Code</p>
                <input
                  placeholder="Have A Coupon Code?"
                  className="text-sm outline-none"
                />
              </div>
              <button className="text-sm font-semibold">APPLY</button>
            </div>
            <p className="text-xs italic text-gray-500">
              No coupon codes applicable for this property.
            </p>
            <div className="mt-auto flex justify-between text-xl font-semibold">
              <span>Total Amount to be paid :</span>
              <span className="text-green-600">$697</span>
            </div>
            <Link
              href="/hotel/booking-confirmation"
              className="mx-auto rounded-full bg-gradient-to-b from-[#4aa8ff] to-[#0a6fe0] px-14 py-2 text-xl font-bold tracking-wide text-white shadow-lg"
            >
              Reserve
            </Link>
          </section>
        </div>

        {/* Guest details */}
        <section className={card}>
          <span className={pill}>Guest Details</span>
          <p className="mt-3 text-sm font-semibold text-gray-500">
            Guest names must match the official ID which will be used at
            check-in.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              ["Full name", "text", IdCard],
              ["National ID number", "text", IdCard],
              ["Email id", "email", Mail],
              ["Phone number (+61)", "tel", Phone],
            ].map(([label, type, Icon]) => {
              const I = Icon as typeof Mail;
              return (
                <label key={label as string} className={field}>
                  <span className="flex-1">
                    <span className="block text-xs text-gray-500">
                      {label as string}
                    </span>
                    <input
                      type={type as string}
                      className="w-full text-sm font-semibold outline-none"
                    />
                  </span>
                  <I className="h-8 w-8 text-[#0496FF]" />
                </label>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm font-semibold text-gray-500">
            <span>Booking voucher will be sent to this email ID</span>
            <button className="flex items-center gap-1 rounded-lg border-2 border-[#D9A441] px-3 py-1 text-[#D9A441]">
              <Plus className="h-4 w-4" /> Add New Guest
            </button>
          </div>
        </section>

        {/* Special requests */}
        <span className="inline-block rounded-full bg-gradient-to-b from-[#ffb347] to-[#ff6a00] px-5 py-2 font-bold text-white shadow">
          Special Requests
        </span>
        <section className={card}>
          <p className="font-semibold text-gray-500">
            Add any special requests for your stay. These will be sent to the
            property, and they will do their best to accommodate them.
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            {REQUESTS.map(([title, options, multi]) => (
              <fieldset key={title}>
                <legend className="mb-2 text-sm font-semibold uppercase">
                  {title}
                </legend>
                {options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 py-1 font-semibold text-gray-700"
                  >
                    <input
                      type={multi ? "checkbox" : "radio"}
                      name={title}
                      className="h-5 w-5 accent-green-500"
                    />{" "}
                    {opt}
                  </label>
                ))}
              </fieldset>
            ))}
          </div>
          <p className="mt-5 font-semibold">Have Another Request?</p>
          <textarea
            rows={3}
            placeholder="Type here if you have any other specific requests..."
            className="mt-2 w-full rounded-xl border-2 border-sky-300 bg-sky-50 p-3 outline-none"
          />
          <div className="mt-4 text-right">
            <button className="rounded-full bg-gradient-to-b from-[#4aa8ff] to-[#0a6fe0] px-10 py-2 text-xl font-bold text-white shadow-lg">
              Save &amp; Apply
            </button>
          </div>
        </section>

        {/* Cancellation policy */}
        <section className={card}>
          <span className="inline-block rounded-full bg-gradient-to-b from-[#ff5a5a] to-[#c40000] px-5 py-1.5 text-lg text-white shadow">
            Cancellation policy
          </span>
          <p className="mt-5 text-sm font-semibold text-red-600">
            Cancellation fee: $1,913.45
          </p>
          <p className="mt-2 text-sm font-semibold text-gray-700">
            This booking cannot be modified, and no refund will be given if you
            cancel it. You&apos;ll be charged the cancellation fee if you
            don&apos;t check in. If you apply a discount in your booking, the
            cancellation fee will be based on the total amount paid.
          </p>
        </section>
      </div>
    </div>
  );
}
