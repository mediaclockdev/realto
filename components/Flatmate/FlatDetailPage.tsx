"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FlatmateListing } from "@/lib/flatmate/types";
import SearchFilterBar from "@/components/PropertyListing/SearchFilterBar";
import ListingMeta from "@/components/PropertyListing/ListingMeta";
import ListingCard from "./ListingCard";
import whatsapp from "@/public/whatsapp.svg";
import instagram from "@/public/instagramiconhotel.svg";
import facebook from "@/public/facebookiconhotel.svg";
import message from "@/public/formmailicon2.svg";
import phone from "@/public/contactformphoneicon.svg";
import mail from "@/public/mail.svg";
import mapview from "@/public/mapviewicon.svg";
import satallite from "@/public/sataliteicon.svg";

const MESSAGE_LIMIT = 256;

const socialLinks = [whatsapp, instagram, facebook, message, phone, mail];

export default function FlatDetailPage({
  listing,
  relatedListings,
}: {
  listing: FlatmateListing;
  relatedListings: FlatmateListing[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [messageText, setMessageText] = useState("");
  const [isListCollapsed, setIsListCollapsed] = useState(false);
  const [sectionHeight, setSectionHeight] = useState<number>();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setSectionHeight(entry.contentRect.height),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSend = () => {
    if (!messageText.trim()) return;
    toast.success(`Message sent to ${listing.host.name}`);
    setMessageText("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SearchFilterBar
        isMapView={false}
        onToggleView={() => {}}
        showViewToggle={false}
      />

      <div className="max-w-screen-2xl mx-auto px-3 lg:px-5 py-5">
        <div className="hidden lg:flex items-start gap-0 relative">
          {/* Sidebar: other listings, collapsible, height-matched to the detail column */}
          <div
            className={`relative flex-shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ${
              isListCollapsed
                ? "w-0 overflow-hidden border-r-0"
                : "w-full max-w-[320px]"
            }`}
          >
            <div
              className="overflow-y-auto"
              style={{ maxHeight: sectionHeight }}
            >
              <ListingMeta
                location={listing.location}
                suburb={listing.location}
                count={relatedListings.length}
                listingLabel="Flats available in"
                variant="map"
                compact
              />
              <div className="space-y-4 px-3 pb-8">
                {relatedListings.map((item) => (
                  <Link
                    key={item.id}
                    href={`/flatmate/${item.id}`}
                    className="block"
                  >
                    <ListingCard listing={item} />
                  </Link>
                ))}
              </div>
            </div>

            {!isListCollapsed && (
              <button
                onClick={() => setIsListCollapsed(true)}
                className="absolute z-30 top-16 right-0 translate-x-full bg-white shadow-sm border border-gray-200 border-l-0 w-9 h-14 flex items-center justify-center rounded-r-xl hover:bg-gray-50 transition-colors"
                aria-label="Hide list"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
            )}
          </div>

          <section
            ref={sectionRef}
            className="flex-1 min-w-0 relative px-0 lg:pl-5 space-y-6"
          >
            {isListCollapsed && (
              <button
                onClick={() => setIsListCollapsed(false)}
                className="absolute z-30 top-4 left-0 bg-white shadow-sm border border-gray-200 border-l-0 w-9 h-14 flex items-center justify-center rounded-r-xl hover:bg-gray-50 transition-colors"
                aria-label="Show list"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            )}

            <FlatDetailContent
              listing={listing}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              messageText={messageText}
              setMessageText={setMessageText}
              handleSend={handleSend}
            />
          </section>
        </div>

        {/* Mobile: no sidebar */}
        <div className="lg:hidden space-y-6">
          <FlatDetailContent
            listing={listing}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            messageText={messageText}
            setMessageText={setMessageText}
            handleSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}

function FlatDetailContent({
  listing,
  activeImage,
  setActiveImage,
  messageText,
  setMessageText,
  handleSend,
}: {
  listing: FlatmateListing;
  activeImage: number;
  setActiveImage: (idx: number) => void;
  messageText: string;
  setMessageText: (value: string) => void;
  handleSend: () => void;
}) {
  return (
    <>
      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {listing.gallery.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`relative h-[220px] rounded-2xl overflow-hidden border-2 ${
              activeImage === idx ? "border-red-500" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`${listing.title} photo ${idx + 1}`}
              fill
              unoptimized
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
        {/* Left column */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div>
            <h1 className="text-2xl font-bold text-[#343434]">
              {listing.location}
            </h1>
            <p className="text-gray-500 mt-1">
              {listing.rooms.length} Room{listing.rooms.length > 1 ? "s" : ""}{" "}
              for rent
            </p>
          </div>

          {/* About the property */}
          <div className="border-t border-gray-200 mt-5 pt-5">
            <h2 className="text-lg font-bold text-[#343434] mb-2">
              About the Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {listing.propertyDescription}
            </p>
          </div>

          {/* Price boxes + room icon badges */}
          <div className="border-t border-gray-200 mt-5 pt-5 space-y-4">
            <div className="flex flex-wrap gap-3">
              {listing.rooms.map((room, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl px-5 py-3 text-center"
                >
                  <p className="text-2xl font-bold text-[#343434]">
                    {room.amount}
                    <span className="text-sm font-medium text-gray-500">
                      /week
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">{room.billsLabel}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              {listing.roomIcons.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div className="relative size-28">
                    <Image
                      src={item.icon}
                      alt="amenity"
                      fill
                      unoptimized
                      className="object-contain  "
                    />
                  </div>
                  <span className="text-[13px] font-bold text-gray-800">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* About the flatmates */}
          <div className="border-t border-gray-200 mt-5 pt-5">
            <h2 className="text-lg font-bold text-[#343434] mb-2">
              About the Flatmates
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {listing.aboutFlatmates}
            </p>
          </div>
        </div>

        {/* Message card */}
        <div className="bg-gray-100 rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative size-14 rounded-full overflow-hidden shrink-0">
              <Image
                src={listing.host.avatar}
                alt={listing.host.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-[#343434]">
                Message {listing.host.name}
              </p>
              <p className="text-sm text-gray-500">{listing.host.status}</p>
            </div>
          </div>

          <div>
            <textarea
              value={messageText}
              maxLength={MESSAGE_LIMIT}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type here..."
              rows={4}
              className="w-full rounded-xl border border-gray-300 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#5b8def]"
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {messageText.length}/{MESSAGE_LIMIT} characters
            </p>
          </div>

          <button
            onClick={handleSend}
            className="w-full bg-[#1E7FE0] text-white font-semibold rounded-full py-3 hover:bg-[#1a6fc4] transition-colors cursor-pointer"
          >
            Send Message
          </button>

          <button
            onClick={() => toast("Please log in to see this contact number.")}
            className="w-full border border-[#1E7FE0] text-[#1E7FE0] font-semibold rounded-full py-3 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Login to see {listing.host.name}&apos;s number
          </button>

          <div className="flex items-center gap-3 pt-1">
            {socialLinks.map((icon, idx) => (
              <div key={idx} className="relative size-6">
                <Image
                  src={icon}
                  alt="contact icon"
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-full h-[300px] bg-gray-200 rounded-xl overflow-hidden relative mb-4">
            <iframe
              title="Map view"
              width="100%"
              height="100%"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=mapnik&marker=-33.9%2C151.1"
              className="border-0 w-full h-full pointer-events-none"
            />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Image src={mapview} alt="map icon" />
            <h3 className="text-center font-bold text-lg text-[#F77F00]">
              Map view of property
            </h3>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-full h-75 bg-gray-200 rounded-xl overflow-hidden relative mb-4">
            <iframe
              title="Satellite view"
              width="100%"
              height="100%"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=hot&marker=-33.9%2C151.1"
              className="border-0 w-full h-full pointer-events-none"
            />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Image src={satallite} alt="satallite icon" className="size-14" />
            <h3 className="text-center font-bold text-lg text-[#F77F00]">
              Satellite view of property
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
