import Image from "next/image";
import Link from "next/link";
import bgblue from "@/public/bluebgglasshotel.webp";
import {
  CheckCircle2,
  Share2,
  Heart,
  MapPin,
  Wifi,
  Utensils,
  Dumbbell,
  Car,
  Calendar,
  User,
  BedDouble,
  AlertCircle,
  Phone,
  Mail,
  HelpCircle,
  ChevronLeft,
} from "lucide-react";

const glass =
  "bg-[length:100%_100%] bg-no-repeat font-TimesNewRoman text-white";
const glassBg = { backgroundImage: `url(${bgblue.src})` };

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-20">
      {/* Hero Banner Placeholder */}
      <div className="h-64 w-full bg-slate-800 relative">
        <Image
          src="https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=2000&auto=format&fit=crop"
          alt="Cityscape"
          fill
          className="object-cover opacity-60"
        />
      </div>

      <div className="mx-auto max-w-screen-xl px-4 lg:px-6 py-5">
        {/* Top Success Banner */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 px-8 py-6 grid gap-6 md:grid-cols-2 items-center">
          {/* Part 1: confirmation message */}
          <div className="flex items-center gap-5">
            <CheckCircle2 className="h-20 w-20 shrink-0 text-white bg-green-500 rounded-full p-2 shadow-md" />
            <div>
              <h1 className="text-3xl font-bold text-[#059669]">
                Booking Confirmed!
              </h1>
              <p className="text-lg font-bold text-[#334155] mt-1">
                Your hotel reservation is confirmed.
              </p>
              <p className="text-base text-[#64748B] italic leading-snug">
                A confirmation email and SMS have been sent to your registered
                email and mobile number.
              </p>
            </div>
          </div>

          {/* Part 2: booking reference, contact and actions */}
          <div className="grid gap-6 sm:grid-cols-[3fr_2fr] items-center md:border-l md:border-gray-200 md:pl-8">
            <div>
              <p className="text-xl font-bold text-[#0496FF]">
                Booking Reference Number
              </p>
              <p className="text-2xl font-bold text-[#343434] tracking-wide mt-1">
                RLTO78456231
              </p>
              <div className="mt-4 text-xl text-gray-600 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-8 w-8 shrink-0 text-[#F0B429]" />
                  <span>indranilx06@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-8 w-8 shrink-0 text-[#F0B429]" />
                  <span>04XX XXX 2887</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <div className="flex gap-8">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800">
                  <Share2 className="h-9 w-9 text-red-500" /> Share
                </button>
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800">
                  <Heart className="h-9 w-9 text-red-500" /> Save
                </button>
              </div>
              <button
                className={`w-full px-8 py-4 text-xl ${glass}`}
                style={glassBg}
              >
                Download Confirmation
              </button>
              <Link
                href="/my-bookings"
                className="text-lg text-[#0496FF] font-semibold hover:underline"
              >
                View in My Bookings →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/hotel"
            className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 mb-4"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Stays
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (Left, 2 columns wide) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-[#343434]">
                    Holiday INN Melbourne
                  </h2>
                  <span className="bg-blue-50 text-[#0496FF] px-2 py-1 rounded text-xs font-bold border border-blue-100 flex items-center gap-1">
                    4.5 <Heart className="h-3 w-3 fill-current" />
                  </span>
                  <span className="text-xs text-gray-500">
                    Excellent (55,571 Reviews)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-200">
                  <span className="text-[#0496FF] font-bold">
                    6 Days, 7 Nights
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                <MapPin className="h-4 w-4 text-red-500" />
                575 Flinders Lane, Melbourne VIC 3000, Australia
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-[#343434] font-medium mb-6">
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-[#0496FF]" /> Free Wi-Fi
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-[#F0B429]" /> Restaurant
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-pink-500" /> Fitness Centre
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-gray-500" /> Airport Shuttle
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 h-48">
                <div className="col-span-2 relative rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
                    alt="Hotel"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="relative flex-1 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop"
                      alt="Room"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative flex-1 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format&fit=crop"
                      alt="Interior"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +9 Photos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Dates & Guests Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-center border-l-4 border-l-green-500">
                <div className="flex items-center gap-2 text-green-600 font-bold mb-1">
                  <Calendar className="h-5 w-5" /> Check-in
                </div>
                <p className="font-semibold text-sm">
                  Monday 21 September 2026
                </p>
                <p className="text-xs text-gray-500">1:00 pm</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-center border-l-4 border-l-red-500">
                <div className="flex items-center gap-2 text-red-500 font-bold mb-1">
                  <Calendar className="h-5 w-5" /> Check-out
                </div>
                <p className="font-semibold text-sm">
                  Friday 25 September 2026
                </p>
                <p className="text-xs text-gray-500">10:00 am</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-blue-500 font-bold mb-1">
                  <User className="h-5 w-5" /> Guest name
                </div>
                <p className="font-semibold text-sm">Indranil Sen</p>
                <p className="text-xs text-gray-500">Maria sen</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-gray-600 font-bold mb-1">
                  <BedDouble className="h-5 w-5" /> Room type
                </div>
                <p className="font-semibold text-sm">Superior Room,</p>
                <p className="text-xs text-gray-500">2 Double Beds</p>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-200 overflow-hidden relative">
              <div className={`absolute top-0 left-0 z-10 flex items-center gap-2 px-6 py-2 text-xl ${glass}`} style={glassBg}>
                <AlertCircle className="h-4 w-4" /> Important Information
              </div>

              <div className="pt-14 p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <span className="text-green-600 font-semibold text-sm">
                      Check-in Time
                    </span>
                    <span className="text-red-500 font-semibold text-sm">
                      Check-out Time
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <div>
                      <p>21 Sep 2026</p>
                      <p>1:00 PM</p>
                    </div>
                    <div className="text-right">
                      <p>25 Sep 2026</p>
                      <p>10:00 AM</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 italic mt-3">
                    Early check-in / late check-out is subject to availability.
                  </p>
                </div>

                <div className="border-l border-gray-100 pl-6">
                  <h4 className="font-bold text-[#343434] mb-1">
                    Free Cancellation
                  </h4>
                  <p className="text-xs font-semibold text-red-500 mb-1">
                    Until 24 Aug 2026 07:59 AM
                  </p>
                  <p className="text-[11px] text-gray-500 italic">
                    Get a full refund if you cancel before this time.
                  </p>
                </div>

                <div className="border-l border-gray-100 pl-6">
                  <h4 className="font-bold text-[#343434] mb-1">
                    ID Requirement
                  </h4>
                  <p className="text-[11px] text-gray-500 italic">
                    A valid government ID is required at check-in (e.g. passport
                    or driver&apos;s license).
                  </p>
                </div>

                <div className="border-l border-gray-100 pl-6">
                  <h4 className="font-bold text-[#343434] mb-1 flex items-center gap-1">
                    <span className="text-[#F0B429] text-lg leading-none">
                      S
                    </span>{" "}
                    Special Requests
                  </h4>
                  <p className="text-[11px] text-gray-500 italic">
                    For any special requests (e.g. extra bed, room near lift),
                    please contact the hotel directly after booking.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 px-6 py-3 border-t border-blue-100 flex items-center justify-between">
                <p className="text-sm text-[#0496FF] flex items-center gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-serif italic text-xs">
                    @
                  </span>
                  Your booking is also available in your Realto account and has
                  been sent to{" "}
                  <span className="font-bold">indranilx06@gmail.com</span> and{" "}
                  <span className="font-bold">04XX XXX 2887</span>.
                </p>
                <Link
                  href="/my-bookings"
                  className="text-sm font-bold text-[#0496FF] border border-[#0496FF] px-4 py-1 rounded bg-white hover:bg-blue-50 transition"
                >
                  Go to My Bookings &gt;
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Booking Summary) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
              {/* Badge top right/left simulation */}
              <div className="bg-gradient-to-r from-blue-100 to-white px-6 py-4 border-b border-gray-200">
                <h3 className="text-center font-bold text-lg text-[#0496FF]">
                  Booking Summary
                </h3>
              </div>

              <div className="p-6">
                <div className="space-y-3 border-b border-gray-100 pb-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-700">
                      Base Price
                    </span>
                    <span className="font-bold text-[#343434]">AUD 819</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-green-600">
                      Discount (15%)
                    </span>
                    <span className="font-bold text-green-600">- AUD 122</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-800">
                    Total Amount Paid
                  </span>
                  <span className="font-bold text-green-600 text-xl">
                    AUD $697
                  </span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-3 mb-6">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-700">
                      Payment Successful
                    </p>
                    <p className="text-xs text-green-600 italic">
                      Your payment has been processed successfully via our
                      secure partner.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Method</span>
                    <span className="font-semibold text-[#343434]">
                      Credit / Debit Card
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Date</span>
                    <span className="font-semibold text-[#343434]">
                      23 Aug 2026, 12:34 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="font-semibold text-[#343434]">
                      RTLPAY12876453
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-white border border-gray-200 shadow-sm rounded-xl p-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                <Phone className="h-5 w-5 text-[#F0B429]" />
                <span className="font-bold text-[#343434]">Contact Hotel</span>
              </button>
              <button className="w-full bg-white border border-gray-200 shadow-sm rounded-xl p-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                <Mail className="h-5 w-5 text-[#0496FF]" />
                <span className="font-bold text-[#343434]">E-mail Hotel</span>
              </button>
              <button className="w-full bg-white border border-gray-200 shadow-sm rounded-xl p-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="font-bold text-[#343434]">Get Directions</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status strip */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <div>
              <p className="font-bold text-green-600">Booking Confirmed</p>
              <p className="text-xs text-gray-500">23 Aug 2026, 12:34 PM</p>
            </div>
          </div>
          <div>
            <p className="font-bold text-green-600">Check-in</p>
            <p className="text-sm font-semibold">Monday 21 September 2026</p>
            <p className="text-xs text-[#0496FF]">Upcoming</p>
          </div>
          <span className="rounded-lg border bg-gray-50 px-3 py-1 text-sm font-semibold shadow-sm">
            7 Nights
          </span>
          <div className="text-right">
            <p className="font-bold text-red-500">Check-out</p>
            <p className="text-sm font-semibold">Friday 25 September 2026</p>
            <p className="text-xs text-[#0496FF]">Upcoming</p>
          </div>
        </div>

        {/* Recommended Places */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className={`inline-block px-6 py-2 text-xl ${glass}`} style={glassBg}>
              Recommended Places
            </h3>
            <Link href="/hotel" className="font-bold text-[#0496FF]">
              See More
            </Link>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Based on your booking in Melbourne.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              [
                "Skydeck Melbourne",
                "4.6",
                "Melbourne 2.4 km",
                "photo-1514395462725-fb4566210144",
              ],
              [
                "Great Ocean Road Tour",
                "4.8",
                "Victoria 76 km",
                "photo-1566073771259-6a8506099945",
              ],
              [
                "Melbourne City Tour",
                "4.5",
                "Melbourne 1.2 km",
                "photo-1582719478250-c89cae4dc85b",
              ],
              [
                "Yarra River Cruise",
                "4.4",
                "Victoria 1.8 km",
                "photo-1522708323590-d24dbb6b0267",
              ],
            ].map(([name, rating, dist, img]) => (
              <div
                key={name}
                className="rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.12)] overflow-hidden"
              >
                <div className="relative h-32">
                  <Image
                    src={`https://images.unsplash.com/${img}?q=80&w=600&auto=format&fit=crop`}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                  <Heart className="absolute right-2 top-2 h-5 w-5 text-white" />
                </div>
                <div className="p-3 text-sm space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>{name}</span>
                    <span className="text-[#F0B429]">★ {rating}</span>
                  </div>
                  <p className="flex items-center gap-1 text-gray-500">
                    <MapPin className="h-4 w-4 text-red-500" />
                    {dist}
                  </p>
                  <p className="flex items-center gap-1 text-gray-500">
                    <Phone className="h-4 w-4 text-[#F0B429]" />
                    +61 448 298 337
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {/* Need Help Footer */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 rounded-full h-10 w-10 overflow-hidden flex items-center justify-center">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h4 className="font-bold text-[#343434] text-sm">Need Help?</h4>
                <p className="text-xs text-gray-500 italic">
                  We&apos;re here to help. If you have any questions about your
                  booking, feel free to contact us.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 border border-[#F0B429] text-[#F0B429] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-yellow-50">
                <HelpCircle className="h-4 w-4" /> Contact Support
              </button>
              <button className="flex items-center gap-1 border border-blue-500 text-blue-500 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-50">
                <Calendar className="h-4 w-4" /> Manage Booking
              </button>
              <button className="flex items-center gap-1 border border-red-500 text-red-500 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-50">
                <AlertCircle className="h-4 w-4" /> Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
