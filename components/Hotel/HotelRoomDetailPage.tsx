"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  ShieldCheck,
  Play,
  Bed,
  Bath,
  Wifi,
  Waves,
  UtensilsCrossed,
  Car,
  Tv,
  Snowflake,
  Coffee,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import type { HotelListing, HotelRoom } from "@/lib/hotel/types";
import { getHotelRooms } from "@/lib/hotel/repository";
import SearchFilterBar from "@/components/PropertyListing/SearchFilterBar";
import location from "@/public/location.svg";
import mapview from "@/public/mapviewicon.svg";
import satallite from "@/public/sataliteicon.svg";
import goldenArrowCircle from "@/public/goldencircle.svg";

interface HotelRoomDetailPageProps {
  hotel: HotelListing;
  room: HotelRoom;
}

function parseNights(totalLabel: string) {
  return Number(totalLabel.match(/\((\d+)/)?.[1]) || 3;
}

function amenityIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("wifi")) return Wifi;
  if (l.includes("pool")) return Waves;
  if (l.includes("kitchen")) return UtensilsCrossed;
  if (l.includes("park")) return Car;
  if (l.includes("tv")) return Tv;
  if (l.includes("air") || l.includes("heat")) return Snowflake;
  if (l.includes("coffee") || l.includes("tea")) return Coffee;
  if (l.includes("housekeep")) return Sparkles;
  if (l.includes("bath") || l.includes("ensuite")) return Bath;
  if (l.includes("bed")) return Bed;
  return CheckCircle2;
}

export default function HotelRoomDetailPage({
  hotel,
  room,
}: HotelRoomDetailPageProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const nightlyRate = Number(room.price.replace(/[^0-9.]/g, "")) || 0;
  const nights = parseNights(hotel.totalLabel);
  const subtotal = nightlyRate * nights;
  const cleaningFee = 150;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaningFee + serviceFee;
  const bathCount = Number(room.bathroomsLabel.match(/\d+/)?.[0]) || 1;

  const otherRooms = getHotelRooms(hotel).filter((r) => r.id !== room.id);
  const reviewCount = Math.round(hotel.rating * 25);

  const featureTiles = [
    { image: hotel.iconImages[0], label: room.bedLabel },
    {
      image: hotel.iconImages[1],
      label: `${bathCount} Bathroom${bathCount > 1 ? "s" : ""}`,
    },
    { image: hotel.iconImages[2], label: room.extraLabel },
  ];

  const handleCheckAvailability = () => {
    if (!checkIn || !checkOut) {
      toast.error("Pick check-in and check-out dates");
      return;
    }
    if (checkOut <= checkIn) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    router.push(
      `/hotel/${hotel.id}/room/${room.id}/book?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen bg-gray-50">
      <SearchFilterBar
        isMapView={false}
        onToggleView={() => {}}
        showViewToggle={false}
      />

      <div className="p-4 sm:px-6 lg:px-10">
        <Link
          href={`/hotel/${hotel.id}`}
          className="mt-4 inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-500"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to {hotel.title}
        </Link>

        {/* Hero gallery */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-[260px] md:h-[380px] lg:h-[480px]">
            <Image
              src={hotel.gallery[activeImageIndex]}
              alt={hotel.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <h1 className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
              {hotel.title}
            </h1>
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex(
                  (current) => (current + 1) % hotel.gallery.length,
                )
              }
              className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-l-xl bg-white/90 text-[#343434] shadow"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex">
            {hotel.gallery.map((image, index) => (
              <button
                key={`${hotel.id}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className="relative aspect-square flex-1 overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${hotel.title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="h-8 w-8 fill-white text-white" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Room title + meta */}
        <section className="mt-4 grid gap-6 lg:grid-cols-[1.6fr_1fr] items-start">
          <section>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#343434]">{room.name}</h2>
              <p className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span>{room.sizeLabel}</span>
                <span className="flex items-center gap-1">
                  <Image src={location} alt="Location" className="h-4 w-4" />
                  {hotel.location}
                </span>
              </p>
              <div className="mt-1 flex items-center gap-3">
                <p className="flex items-center gap-1 text-sm font-semibold text-[#343434]">
                  <Star className="h-4 w-4 fill-[#F0B429] text-[#F0B429]" />
                  {hotel.rating.toFixed(2)}
                  <span className="font-normal text-gray-500">
                    ({reviewCount} reviews)
                  </span>
                </p>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share room"
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Image
                      src={goldenArrowCircle}
                      alt="Share"
                      className="h-9 w-9"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLiked((v) => !v)}
                    aria-label="Save room"
                    className="flex h-9 w-9 items-center justify-center transition-transform hover:scale-110 active:scale-95"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-7 w-7 transition-all duration-300 ${
                        liked
                          ? "fill-red-500 stroke-red-600"
                          : "fill-none stroke-gray-400 hover:stroke-red-500"
                      }`}
                      strokeWidth="2"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* LEFT — feature tiles + About the Room */}
            <div className="mt-4 space-y-4">
              <div className="flex gap-3 sm:gap-4">
                {featureTiles.map((tile) => (
                  <div key={tile.label} className="w-20 sm:w-28 shrink-0">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                      <Image
                        src={tile.image}
                        alt={tile.label}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[#343434]">
                      {tile.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-[#F0B429]/50 bg-white p-4 shadow-sm">
                <h2 className="text-lg font-bold text-[#343434]">
                  About The Room
                </h2>
                <p className="mt-2 text-sm text-[#4a4a4a] leading-7">
                  {hotel.summary}
                </p>
              </div>
            </div>
          </section>
          <section>
            {/* RIGHT — Booking widget */}
            <div className="rounded-2xl border border-[#F0B429]/50 bg-white p-5 shadow-sm w-full">
              <p className="text-2xl font-bold text-[#343434]">
                {room.price}
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  / night
                </span>
              </p>

              <div className="mt-4 overflow-hidden rounded-xl border border-gray-300">
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <label
                    className="relative block cursor-pointer p-2"
                    onClick={() => checkInRef.current?.showPicker?.()}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-gray-500">
                      Check-in
                    </span>
                    <input
                      ref={checkInRef}
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="mt-1 w-full cursor-pointer bg-transparent text-sm text-[#343434] outline-none"
                    />
                    {!checkIn && (
                      <span className="pointer-events-none absolute bottom-2 left-2 right-6 bg-white text-sm text-gray-400">
                        Add date
                      </span>
                    )}
                  </label>
                  <label
                    className="relative block cursor-pointer p-2"
                    onClick={() => checkOutRef.current?.showPicker?.()}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-gray-500">
                      Check-out
                    </span>
                    <input
                      ref={checkOutRef}
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="mt-1 w-full cursor-pointer bg-transparent text-sm text-[#343434] outline-none"
                    />
                    {!checkOut && (
                      <span className="pointer-events-none absolute bottom-2 left-2 right-6 bg-white text-sm text-gray-400">
                        Add date
                      </span>
                    )}
                  </label>
                </div>
                <label className="block border-t border-gray-300 p-2">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-gray-500">
                    People
                  </span>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="mt-1 w-full text-sm text-[#343434] outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} guest{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="button"
                onClick={handleCheckAvailability}
                className="mt-4 w-full rounded-full bg-[#F0B429] py-3 font-semibold text-[#343434] transition-colors hover:bg-[#e0a91f] cursor-pointer"
              >
                Check Availability
              </button>

              <p className="mt-2 text-center text-xs text-gray-400">
                You won&apos;t be charged yet
              </p>

              <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="underline decoration-dotted decoration-gray-400 underline-offset-2">
                    {room.price} x {nights} nights
                  </span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline decoration-dotted decoration-gray-400 underline-offset-2">
                    Cleaning fee
                  </span>
                  <span>${cleaningFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline decoration-dotted decoration-gray-400 underline-offset-2">
                    LuxeStay service fee
                  </span>
                  <span>${serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2 font-semibold text-[#343434]">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#eef4fb] p-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#5b8def]" />
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-[#343434]">
                    LuxeStay Protection
                  </span>
                  <br />
                  Every booking includes free protection from Host
                  cancellations, listing inaccuracies, and other issues.
                </p>
              </div>
            </div>
          </section>
        </section>

        {otherRooms.length > 0 && (
          <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-[#343434]">
              Other Recommended Rooms
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {otherRooms.map((other) => {
                const badges = [
                  other.bedLabel,
                  other.amenities[2],
                  "Free Wifi",
                  other.amenities[4],
                ].filter(Boolean);
                return (
                  <Link
                    key={other.id}
                    href={`/hotel/${hotel.id}/room/${other.id}`}
                    className="block overflow-hidden rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-32 w-full">
                      <Image
                        src={other.image}
                        alt={other.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow">
                        <Heart className="h-4 w-4 text-gray-400" />
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#343434]">
                          {other.name}
                        </h3>
                        <span className="whitespace-nowrap text-sm font-bold text-[#343434]">
                          {other.price}
                          <span className="text-xs font-normal text-gray-400">
                            /night
                          </span>
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {other.sizeLabel}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
                        {badges.map((badge) => {
                          const Icon = amenityIcon(badge);
                          return (
                            <span
                              key={badge}
                              className="flex items-center gap-1 text-[10px] text-gray-500"
                            >
                              <Icon className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{badge}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="relative mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-[#343434]">
            Amenities & Facilities
          </h2>
          <div
            ref={amenitiesRef}
            className="scrollbar-hide mt-4 flex gap-3 overflow-x-auto"
          >
            {hotel.amenities.map((amenity) => (
              <div
                key={amenity.label}
                className="w-28 shrink-0 overflow-hidden rounded-xl border border-gray-100"
              >
                <div className="relative h-20 w-full">
                  <Image
                    src={amenity.icon}
                    alt={amenity.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="py-2 text-center text-xs font-medium text-[#343434]">
                  {amenity.label}
                </p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              amenitiesRef.current?.scrollBy({ left: 300, behavior: "smooth" })
            }
            className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow md:flex"
            aria-label="Scroll amenities"
          >
            <ChevronRight className="h-4 w-4 text-gray-700" />
          </button>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="w-full h-[300px] bg-gray-200 rounded-t-2xl overflow-hidden relative">
              <iframe
                title="Map view of property"
                width="100%"
                height="100%"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=mapnik&marker=-33.9%2C151.1"
                className="border-0"
              />
            </div>
            <div className="flex gap-2 items-center justify-center py-3">
              <Image src={mapview} alt="map icon" />
              <h3 className="text-center font-bold text-lg text-[#F77F00]">
                Map view of property
              </h3>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="w-full h-[300px] bg-gray-200 rounded-t-2xl overflow-hidden relative">
              <iframe
                title="Satellite view of property"
                width="100%"
                height="100%"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=hot&marker=-33.9%2C151.1"
                className="border-0"
              />
            </div>
            <div className="flex gap-2 items-center justify-center py-3">
              <Image src={satallite} alt="satallite icon" className="size-14" />
              <h3 className="text-center font-bold text-lg text-[#F77F00]">
                Satellite view of property
              </h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
