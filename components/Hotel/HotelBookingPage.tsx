"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  Star,
  MapPin,
  Gift,
  Coffee,
  Globe,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { getHotelRoomById } from "@/lib/hotel/repository";
import SearchFilterBar from "@/components/PropertyListing/SearchFilterBar";

function formatDateParts(date: Date) {
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    day: date.getDate(),
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: date.getFullYear(),
  };
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).replace(":00", "");
}

function GuestNameRow() {
  return (
    <div className="grid gap-3 sm:grid-cols-[100px_1fr_1fr]">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">Title</label>
        <select className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-2 text-sm text-[#343434] outline-none">
          <option>Mr</option>
          <option>Mrs</option>
          <option>Ms</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
          Full Name As Per Passport Or ID
        </label>
        <input
          type="text"
          placeholder="First Name"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#343434] outline-none placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 sm:invisible">
          Last Name
        </label>
        <input
          type="text"
          placeholder="Last Name"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#343434] outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}

export default function HotelBookingPage() {
  const params = useParams<{ id: string; roomId: string }>();
  const searchParams = useSearchParams();
  const [agreed, setAgreed] = useState(true);
  const [extraGuests, setExtraGuests] = useState<number[]>([]);

  const result = getHotelRoomById(params.id, params.roomId);

  if (!result) {
    return (
      <div className="max-w-screen-2xl mx-auto min-h-screen bg-gray-50 p-10 text-center text-gray-500">
        Booking details not found.
      </div>
    );
  }

  const { hotel, room } = result;

  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const guests = Number(searchParams.get("guests")) || 1;

  const checkIn = checkInParam ? new Date(`${checkInParam}T11:00:00`) : new Date();
  const checkOut = checkOutParam
    ? new Date(`${checkOutParam}T23:00:00`)
    : new Date(checkIn.getTime() + 86400000);
  const nights = Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000));
  const cancelDeadline = new Date(checkIn.getTime() - 24 * 60 * 60 * 1000);

  const nightlyRate = Number(room.price.replace(/[^0-9.]/g, "")) || 0;
  const basePrice = nightlyRate * nights;
  const taxes = Math.round(basePrice * 0.1);
  const total = basePrice + taxes;

  const inParts = formatDateParts(checkIn);
  const outParts = formatDateParts(checkOut);
  const cancelParts = formatDateParts(cancelDeadline);

  const handlePayNow = () => {
    if (!agreed) {
      toast.error("Please accept the booking policies to continue");
      return;
    }
    toast.success("Booking confirmed! Check your email for details.");
  };

  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen bg-gray-50">
      <SearchFilterBar isMapView={false} onToggleView={() => {}} showViewToggle={false} />

      <div className="p-4 sm:px-6 lg:px-10">
        <Link
          href={`/hotel/${hotel.id}/room/${room.id}`}
          className="mt-4 inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-500"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Room
        </Link>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.7fr_1fr] items-start">
          {/* LEFT column */}
          <div className="space-y-4">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#343434]">
                    {hotel.title} {hotel.subtitle}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(hotel.rating)
                              ? "fill-[#343434] text-[#343434]"
                              : "fill-none text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      Couple Friendly
                    </span>
                  </div>
                  <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 text-red-500" />
                    {hotel.location}
                  </p>
                </div>
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={hotel.heroImage} alt={hotel.title} fill className="object-cover" />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-gray-50 p-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">Check in</p>
                  <p className="text-sm">
                    <span className="text-gray-400">{inParts.weekday}</span>{" "}
                    <span className="font-bold text-[#343434]">
                      {inParts.day} {inParts.month} {inParts.year}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">{formatTime(checkIn)}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
                  {nights} Night{nights > 1 ? "s" : ""}
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">Check out</p>
                  <p className="text-sm">
                    <span className="text-gray-400">{outParts.weekday}</span>{" "}
                    <span className="font-bold text-[#343434]">
                      {outParts.day} {outParts.month} {outParts.year}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">{formatTime(checkOut)}</p>
                </div>
                <p className="text-sm font-medium text-[#343434] sm:ml-auto">
                  {nights} Night{nights > 1 ? "s" : ""} | {guests} Adult{guests > 1 ? "s" : ""} | 1 Room
                </p>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-bold text-[#343434]">{room.name}</h2>
                  <button type="button" className="shrink-0 text-sm font-semibold text-[#5b8def]">
                    See Inclusions
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {guests} Adult{guests > 1 ? "s" : ""}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Room With Free Cancellation</li>
                  <li>• No meals included</li>
                </ul>
                <p className="mt-2 flex flex-wrap items-center gap-1 text-sm font-medium text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Free Cancellation till 24 hrs before check in
                  <button type="button" className="font-semibold text-[#5b8def] underline">
                    Cancellation policy details
                  </button>
                </p>

                <div className="mt-4 flex h-8 w-full overflow-hidden rounded-full">
                  <div className="flex w-2/3 items-center justify-center bg-[#3fae7a] text-xs font-semibold text-white">
                    100% Refund
                  </div>
                  <div className="flex w-1/3 items-center justify-center bg-[#F0DCA0] text-xs font-semibold text-[#8a6d1f]">
                    Non Refundable
                  </div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>NOW</span>
                  <span className="text-center">
                    {cancelParts.day} {cancelParts.month}
                    <br />
                    {formatTime(cancelDeadline)}
                  </span>
                  <span className="text-right">
                    {inParts.day} {inParts.month}
                    <br />
                    Check-in
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#343434]">Important information</h2>
              <div className="mt-3 rounded-xl border border-gray-100 p-4 text-sm text-gray-500">
                <ul className="space-y-2">
                  <li>• Primary guest must be at least 18 years of age</li>
                  <li>• Guests are required to present a valid photo ID at check-in.</li>
                  <li>• Pets are not allowed, except for assistance animals.</li>
                  <li>• Please inform the property of your expected arrival time in advance.</li>
                  <li>• Special requests are subject to availability and additional charges may apply.</li>
                  <li>• A valid credit card may be required at check-in for incidental charges.</li>
                </ul>
                <h3 className="mt-4 font-semibold text-[#343434]">Cribs and Extra beds</h3>
                <p>Extra beds and cots are available upon request, subject to availability.</p>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-[#343434]">Breakfast Charges</h3>
                    <p>Breakfast charges may apply if breakfast is not included in your booking rate.</p>
                  </div>
                  <button type="button" className="shrink-0 text-sm font-semibold text-[#5b8def]">
                    View More
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm">
                <span className="font-semibold text-emerald-600">You have unlocked FREE extras!</span>{" "}
                <span className="text-gray-500">Complete your stay booking to unlock these exclusive offers</span>
              </p>
              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-start gap-2">
                  <Gift className="h-5 w-5 shrink-0 text-[#F0B429]" />
                  <div>
                    <p className="text-sm font-semibold text-[#343434]">Complimentary Wi-Fi included</p>
                    <p className="text-xs text-gray-500">Enjoy free high-speed Wi-Fi throughout your stay.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Coffee className="h-5 w-5 shrink-0 text-[#F0B429]" />
                  <div>
                    <p className="text-sm font-semibold text-[#343434]">Breakfast available</p>
                    <p className="text-xs text-gray-500">Start your day with a delicious breakfast</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#343434]">Guest Details</h2>

              <div className="mt-4 space-y-3">
                <GuestNameRow />
                {extraGuests.map((id) => (
                  <GuestNameRow key={id} />
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Email Address{" "}
                    <span className="normal-case font-normal text-gray-400">
                      (Your booking confirmation will be sent to this email address)
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email id"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#343434] outline-none placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Mobile Number
                  </label>
                  <div className="mt-1 flex overflow-hidden rounded-lg border border-gray-300">
                    <span className="flex items-center bg-gray-50 px-3 text-sm text-gray-500">+61</span>
                    <input
                      type="tel"
                      placeholder="Contact Number"
                      className="w-full px-3 py-2 text-sm text-[#343434] outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Guest Information{" "}
                <span className="normal-case font-normal text-gray-400">
                  (Please enter the details of the primary guest staying at the property)
                </span>
              </p>
              <div className="mt-1 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                  <Globe className="h-4 w-4 shrink-0 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nationality"
                    className="w-full text-sm text-[#343434] outline-none placeholder:text-gray-400"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                  <CreditCard className="h-4 w-4 shrink-0 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Passport / ID Number"
                    className="w-full text-sm text-[#343434] outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-[#343434]">
                  Special Requests <span className="font-normal text-gray-400">(Optional)</span>
                </label>
                <p className="text-sm text-gray-500">Add any special requests or preferences for your stay.</p>
                <textarea
                  placeholder="Type your request here......"
                  rows={2}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#343434] outline-none placeholder:text-gray-400"
                />
              </div>

              <button
                type="button"
                onClick={() => setExtraGuests((g) => [...g, Date.now()])}
                className="mt-4 text-sm font-semibold text-[#5b8def]"
              >
                + Add Another Guest
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">
                  Log in to pre-fill your guest details and manage your booking
                </p>
                <Link
                  href="/login"
                  className="rounded-lg border border-[#5b8def] px-4 py-1.5 text-sm font-semibold text-[#5b8def]"
                >
                  LOGIN
                </Link>
              </div>
            </section>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <button
                type="button"
                onClick={() => setAgreed((v) => !v)}
                aria-label="Agree to policies"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  agreed ? "bg-[#5b8def] text-white" : "border border-gray-300"
                }`}
              >
                {agreed && <CheckCircle2 className="h-4 w-4" />}
              </button>
              By proceeding, I agree to the Realto&apos;s User Agreement, Terms of Service,
              Cancellation Policy and Property Booking Policies.
            </label>

            <button
              type="button"
              onClick={handlePayNow}
              className="w-full rounded-full bg-[#F0B429] py-3 font-semibold text-[#343434] transition-colors hover:bg-[#e0a91f] cursor-pointer sm:w-64"
            >
              Pay Now
            </button>
          </div>

          {/* RIGHT column */}
          <div className="space-y-4 lg:sticky lg:top-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#343434]">Price Breakup</h2>
              <div className="mt-3 flex justify-between text-sm">
                <div>
                  <p className="font-semibold text-[#343434]">Base Price</p>
                  <p className="text-gray-500">
                    1 Room x {nights} Night{nights > 1 ? "s" : ""}
                  </p>
                </div>
                <p className="font-semibold text-[#343434]">${basePrice.toLocaleString()}</p>
              </div>
              <div className="mt-3 flex justify-between text-sm">
                <p className="font-semibold text-[#343434]">Hotel Taxes</p>
                <p className="font-semibold text-[#343434]">${taxes.toLocaleString()}</p>
              </div>
              <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 font-bold text-[#343434]">
                <p>Total Amount to be paid</p>
                <p>${total.toLocaleString()}</p>
              </div>
              <p className="mt-2 text-xs text-gray-400">Payment will be charged in $</p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#343434]">Coupon Code</h2>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2">
                <input
                  type="text"
                  placeholder="Have A Coupon Code?"
                  className="w-full text-sm text-[#343434] outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => toast.error("No coupon codes applicable for this property.")}
                  className="shrink-0 text-sm font-bold text-gray-400"
                >
                  APPLY
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-400">No coupon codes applicable for this property.</p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#343434]">
                WHY <span className="text-[#5b8def]">SIGN UP</span> OR{" "}
                <Link href="/login" className="text-[#5b8def]">
                  LOGIN
                </Link>
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  Get access to <span className="font-semibold">Secret Deals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="font-semibold">Book Faster</span> - we&apos;ll save &amp; pre-enter your
                  details.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="font-semibold">Manage your bookings</span> from one place
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
