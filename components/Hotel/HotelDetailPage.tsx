"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { HotelListing } from "@/lib/hotel/types";
import { getHotelRooms } from "@/lib/hotel/repository";
import SearchFilterBar from "@/components/PropertyListing/SearchFilterBar";
import mapview from "@/public/mapviewicon.svg";
import satallite from "@/public/sataliteicon.svg";

interface HotelDetailPageProps {
  hotel: HotelListing;
}

const DISCOVER_LABELS = [
  "Restaurant & Bar",
  "Spa & Wellness",
  "Swimming Pool",
  "Accommodation",
];

export default function HotelDetailPage({ hotel }: HotelDetailPageProps) {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const rooms = getHotelRooms(hotel);
  const discoverCards = DISCOVER_LABELS.map((label, idx) => ({
    label,
    image: hotel.gallery[(idx + 1) % hotel.gallery.length],
  }));

  return (
    <div className="max-w-screen-2xl mx-auto  min-h-screen bg-gray-50">
      <SearchFilterBar
        isMapView={false}
        onToggleView={() => router.push(`/hotel/map?id=${hotel.slug}`)}
        showViewToggle={false}
        listingVariant="buy"
      />

      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/hotel/browse"
          className="mb-4 inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-500"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Listing
        </Link>

        <section className="overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="relative h-[260px] md:h-[380px] lg:h-[530px]">
            <Image
              src={hotel.gallery[activeImageIndex]}
              alt={hotel.title}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <h1 className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
              {hotel.title} {hotel.subtitle}
            </h1>
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex(
                  (current) => (current + 1) % hotel.gallery.length,
                )
              }
              className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-r-xl bg-white/90 text-[#343434] shadow"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="scrollbar-hide flex gap-2 overflow-x-auto bg-[#f7f7f7] px-2 py-3">
            {hotel.gallery.map((image, index) => (
              <button
                key={`${hotel.id}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-[10px] border ${
                  activeImageIndex === index
                    ? "border-[#5b8def]"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${hotel.title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        <section className=" mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#343434]">About The Hotel</h2>
          <p className="mt-2 text-sm text-[#4a4a4a] leading-7">
            {hotel.summary} {hotel.summary}
          </p>
        </section>

        <section className="mt-4">
          <h2 className="mb-4 text-center text-xl font-bold text-[#343434]">
            Discover {hotel.title} {hotel.subtitle}
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {discoverCards.map((card) => (
              <div
                key={card.label}
                className="relative h-40 overflow-hidden rounded-xl shadow-sm"
              >
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[#F0B429]/90 py-2 text-center text-sm font-semibold text-[#343434]">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4">
          <h2 className="mb-4 text-center text-xl font-bold text-[#343434]">
            Accommodations
          </h2>
          <div className="space-y-4 mx-auto w-3/4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="flex flex-col gap-4 rounded-xl border-2 border-[#D9A441] bg-white p-4 sm:flex-row"
              >
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg sm:w-56">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#343434]">
                    {room.name}
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-1 text-sm text-gray-600 sm:grid-cols-1">
                    <span>{room.sizeLabel}</span>
                    <span>{room.bedLabel}</span>
                    <span>{room.bathroomsLabel}</span>
                    <span>{room.extraLabel}</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-1 text-sm text-gray-600">
                  {room.amenities.map((amenity) => (
                    <li key={amenity}>• {amenity}</li>
                  ))}
                </ul>

                <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                  <p className="text-xl font-bold text-[#343434]">
                    {room.price}
                  </p>
                  <p className="text-xs text-gray-500">{room.taxesLabel}</p>
                  <Link
                    href={`/hotel/${hotel.id}/room/${room.id}`}
                    className="rounded-full bg-[#F0B429] px-6 py-2 text-sm font-semibold text-[#343434] transition-colors hover:bg-[#e0a91f]"
                  >
                    SELECT ROOM
                  </Link>
                  <p className="text-xs text-gray-500">
                    Login Now and get this for {room.loginPrice} or less
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <iframe
              title="Map view of property"
              width="100%"
              height="300"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=mapnik&marker=-33.9%2C151.1"
              className="border-0"
            />
            <div className="flex items-center justify-center gap-2 px-4 py-3">
              <Image src={mapview} alt="map icon" />
              <p className="text-center text-sm font-semibold text-[#343434]">
                Map view of property
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <iframe
              title="Satellite view of property"
              width="100%"
              height="300"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=hot&marker=-33.9%2C151.1"
              className="border-0"
            />
            <div className="flex items-center justify-center gap-2 px-4 py-3">
              <Image src={satallite} alt="satallite icon" className="size-8" />
              <p className="text-center text-sm font-semibold text-[#343434]">
                Satellite view of property
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
