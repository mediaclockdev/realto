"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Phone,
  Clock,
  Mail,
  Utensils,
  BedDouble,
  Bath,
  Check,
  Zap,
  Banknote,
  Users,
} from "lucide-react";
import headingbg from "@/public/contactheadingbg.svg";
import sendbg from "@/public/contactsendbg.svg";
import mails from "@/public/contactmailicon.svg";
import email from "@/public/contactemailicon.svg";
import phone from "@/public/contactphoneicon.svg";
import dl from "@/public/agentpanelicons/profiledl.svg";
import edit from "@/public/agentpanelicons/dashboardeditprofileicon.svg";
import sendicon from "@/public/contactsendbtn.svg";
import type { HotelListing, HotelRoom } from "@/lib/hotel/types";
import { getHotelRooms } from "@/lib/hotel/repository";
import HotelSearchBar from "@/components/Hotel/HotelSearchBar";
import sara from "../../public/sarajohnson.jpg";
import david from "../../public/davidthompson.jpg";
import michael from "../../public/michaelchen.jpg";
import starFilled from "../../public/agentstarrating.svg";
import starEmpty from "../../public/agentstarratingempty.svg";
import editIcon from "../../public/agentpanelicons/dashboardeditprofileicon.svg";
import certificatesIcon from "../../public/brokericons/Certificates&Awards.svg";
import businesshour from "@/public/brokericons/businesshouricon.svg";
import telephone from "@/public/telephone.svg";
import location from "@/public/location.svg";
import clock from "@/public/buyclock.svg";
import facebookIcon from "@/public/facebookiconhotel.svg";
import instagramIcon from "@/public/instagramiconhotel.svg";
import snapchatIcon from "@/public/snapchaticonhotel.svg";
import youtubeIcon from "@/public/logos_youtube-icon.svg";
import whatsappIcon from "@/public/whatsapp.svg";
import tumblrIcon from "@/public/tumbluriconhotel.svg";
import linkedinIcon from "@/public/linkediniconhotel.svg";

interface HotelDetailPageProps {
  hotel: HotelListing;
}

const DISCOVER_LABELS = [
  "Restaurant & Bar",
  "Gym",
  "Swimming Pool",
  "Accommodation",
];
const hours = [
  ["Monday", "09:00am - 09:00pm"],
  ["Tuesday", "09:00am - 09:00pm"],
  ["Wednesday", "09:00am - 09:00pm"],
  ["Thursday", "09:00am - 09:00pm"],
  ["Friday", "09:00am - 09:00pm"],
  ["Saturday", "09:00am - 09:00pm"],
  ["Sunday", "09:00am - 09:00pm"],
];
const SURROUNDINGS = [
  [
    "Attraction: Federation Square (400 m)",
    "https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=800&auto=format&fit=crop",
  ],
  [
    "Flinders Street Railway Station (350 m)",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  ],
  [
    "State Library Victoria (950 m)",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
  ],
];
const REVIEWS = [
  {
    img: sara,
    name: "Sarah Johnson",
    rating: 4,
    meta: "Stayed in a Deluxe Room • 2 months ago",
  },
  {
    img: david,
    name: "David Thompson",
    rating: 4,
    meta: "Stayed in a Suite • 5 months ago",
  },
  {
    img: michael,
    name: "Michael Chen",
    rating: 5,
    meta: "Business trip • 4 months ago",
  },
];
const REVIEW_TEXT =
  "\u201cOutstanding stay from check-in to check-out. The staff\u2019s attention to detail and responsiveness made the whole trip effortless. Spotless rooms and a great location.\u201d";
const MAP_TABS = [
  ["Map", "mapnik"],
  ["Street view", "cyclosm"],
  ["Satellite", "hot"],
] as const;

const heading =
  "mb-6 mx-auto w-full max-w-3xl rounded-full bg-[#F1F3F2] px-6 py-3 text-center font-TimesNewRoman text-2xl lg:text-3xl font-bold text-[#4189DD] shadow-[-8px_8px_16px_#999FB4,6px_-6px_12px_#FFFFFF]";
const cardShadow = "rounded-xl bg-white shadow-[0_6px_18px_rgba(0,0,0,0.12)]";

export default function HotelDetailPage({ hotel }: HotelDetailPageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mapLayer, setMapLayer] = useState<string>("mapnik");
  const rooms = getHotelRooms(hotel);
  const discoverCards = DISCOVER_LABELS.map((label, idx) => ({
    label,
    image: hotel.gallery[(idx + 1) % hotel.gallery.length],
  }));

  return (
    <div className="mx-auto min-h-screen max-w-screen-2xl bg-white">
      <HotelSearchBar />

      {/* Hero */}
      <section className="relative h-[260px] md:h-[380px] lg:h-[500px] ">
        <Image
          src={hotel.gallery[activeImageIndex]}
          alt={hotel.title}
          fill
          className="object-cover"
          priority={activeImageIndex === 0}
        />
        <h1 className="absolute left-6 top-6 text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
          {hotel.title} {hotel.subtitle}
        </h1>
        <button
          type="button"
          onClick={() =>
            setActiveImageIndex((c) => (c + 1) % hotel.gallery.length)
          }
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-white text-[#343434] shadow"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </section>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto px-2 py-3">
        {hotel.gallery.map((image, index) => (
          <button
            key={`${hotel.id}-${index}`}
            type="button"
            onClick={() => setActiveImageIndex(index)}
            className={`relative h-24 w-40 shrink-0 overflow-hidden border-2 ${activeImageIndex === index ? "border-[#0496FF]" : "border-transparent"}`}
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

      <div className="space-y-10 px-4 py-6 sm:px-6">
        {/* Contact + business hours */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-sm font-medium text-[#343434]">
            <p className="flex items-center gap-3">
              <Image src={location} alt="" className="h-10 w-10 " />
              <span className="text-[#1E293B] font-semibold text-xl">
                {hotel.location}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Image src={telephone} alt="" className="h-10 w-10 " />
              <span className="text-[#1E293B] font-semibold text-xl">
                {hotel.phone ?? "+61 2 9096 1100"}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Image src={clock} alt="" className="h-10 w-10 " />
              <span className="text-[#1E293B] font-semibold text-xl">
                6:00 AM - 8:00 PM
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Image src={email} alt="" className="h-10 w-10 " />
              <span className="text-[#1E293B] font-semibold text-xl">
                {hotel.email ?? "hotelname@domain.com"}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Image src={phone} alt="" className="h-10 w-10 " />
              <span className="text-[#1E293B] font-semibold text-xl">
                {hotel.phone ?? "+61 2 9096 1100"}
              </span>
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Facebook"><Image src={facebookIcon} alt="Facebook" className="h-9 w-9" /></a>
              <a href="#" aria-label="Instagram"><Image src={instagramIcon} alt="Instagram" className="h-9 w-9" /></a>
              <a href="#" aria-label="Snapchat"><Image src={snapchatIcon} alt="Snapchat" className="h-9 w-9" /></a>
              <a href="#" aria-label="YouTube"><Image src={youtubeIcon} alt="YouTube" className="h-9 w-9" /></a>
              <a href="#" aria-label="WhatsApp"><Image src={whatsappIcon} alt="WhatsApp" className="h-9 w-9" /></a>
              <a href="#" aria-label="Tumblr"><Image src={tumblrIcon} alt="Tumblr" className="h-9 w-9" /></a>
              <a href="#" aria-label="LinkedIn"><Image src={linkedinIcon} alt="LinkedIn" className="h-9 w-9" /></a>
            </div>
          </div>
          <div className="space-y-4 rounded-xl border-[1.09px] border-[#DCDCDC] bg-white p-3 shadow-[-8.68px_8.68px_17.37px_0_#999FB4,6.51px_-6.51px_13.03px_0_#FFFFFF]">
            <div className="flex items-center gap-2 border-b-[1.09px] border-[#F3F4F6] ">
              <Image src={businesshour} alt="business hour icon" />
              <p className=" text-sm font-semibold text-[#4189DD]">
                Business Hours
              </p>
            </div>
            <dl className="space-y-1 text-base text-black font-semibold">
              {hours.map(([day, time]) => (
                <div key={day} className="flex justify-between gap-2">
                  <dt>{day}</dt>
                  <dd>:{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Facilities */}
        <section>
          <h2 className={heading}>Facilities and Amenities</h2>
          <div className="scrollbar-hide flex gap-5 overflow-x-auto pb-3">
            {discoverCards.map((card) => (
              <div
                key={card.label}
                className={`${cardShadow} w-64 shrink-0 overflow-hidden`}
              >
                <div className="relative h-40">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="py-2 text-center font-serif text-[#343434]">
                  {card.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Accommodations */}
        <section>
          <h2 className={heading}>Accommodations</h2>
          <div className="scrollbar-hide flex gap-5 overflow-x-auto pb-3">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                gallery={hotel.gallery}
                href={`/hotel/checkout?hotel=${hotel.slug}&room=${room.id}`}
              />
            ))}
          </div>
        </section>

        {/* Surroundings */}
        <section>
          <h2 className={heading}>Surroundings</h2>
          <div className="scrollbar-hide flex gap-5 overflow-x-auto pb-3">
            {SURROUNDINGS.map(([label, img]) => (
              <div
                key={label}
                className={`${cardShadow} w-xs lg:w-md shrink-0 overflow-hidden`}
              >
                <div className="relative h-60 lg:h-72">
                  <Image src={img} alt={label} fill className="object-cover" />
                </div>
                <p className="py-3 text-center text-sm lg:text-xl font-semibold text-[#000000]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Map */}
        <section className="relative -mx-4 sm:-mx-6">
          <iframe
            title="Map view of property"
            width="100%"
            height="400"
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=${mapLayer}&marker=-33.9%2C151.1`}
            className="border-0"
          />
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 rounded-full bg-white/40 p-2 backdrop-blur">
            {MAP_TABS.map(([label, layer]) => (
              <button
                key={layer}
                onClick={() => setMapLayer(layer)}
                className={`flex items-center gap-1 rounded-full px-5 py-1.5 text-sm font-semibold text-white shadow ${mapLayer === layer ? "bg-[#0a6fe0]" : "bg-[#4aa8ff]"}`}
              >
                <MapPin className="h-4 w-4 text-red-300" />
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Reviews + inquiry */}
        <section className="space-y-6">
          <div className="mx-auto flex w-fit items-center gap-3 rounded border-2 border-[#ECC440] py-1">
            <Image src={editIcon} alt="" className="size-9" />
            <h2 className=" text-base lg:text-xl font-bold text-[#4189DD]">
              Client Reviews and Ratings
            </h2>
            <Image src={certificatesIcon} alt="" className="size-9" />
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_450px]">
            <div className="flex h-full flex-col justify-between gap-4">
              {REVIEWS.map((r) => (
                <div
                  key={r.name}
                  className="rounded-xl border-2 border-[#ECC440] bg-white p-4"
                >
                  <div className="flex gap-3">
                    <Image
                      src={r.img}
                      alt={r.name}
                      className="size-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Image
                            key={i}
                            src={i <= r.rating ? starFilled : starEmpty}
                            alt=""
                            className="size-5"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm italic text-[#434C59]">
                    {REVIEW_TEXT}{" "}
                    <button className="not-italic text-[#007CBE]">
                      Read more...
                    </button>
                  </p>
                  <p className="mt-2 text-right text-[10px] text-[#9CA3AF]">
                    {r.meta}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col bg-white rounded-3xl shadow-[-8px_8px_16px_#999FB4,6px_-6px_12px_#F0F0F0] p-4 sm:p-5">
              {/* Header pill */}
              <div className="relative w-full">
                <Image
                  src={headingbg}
                  alt="Heading Background"
                  className="w-full h-auto"
                />

                <div className="absolute left-2 top-5 -translate-y-1/2 ">
                  <Image src={mails} alt="mail" className="" />
                </div>

                <div className="absolute top-6 right-7 ">
                  <h2 className="text-white font-amasis font-black text-xl leading-none [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000]">
                    Message{" "}
                    <span className="font-['Times_New_Roman',serif] font-normal italic">
                      of
                    </span>{" "}
                    Inquiry
                  </h2>
                </div>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="relative bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 py-2 flex flex-col justify-center min-h-[68px]">
                  <label className="flex items-center gap-2 text-sm text-gray-500">
                    {/* icon: green check */}
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none text-xl text-black mt-1 pr-24"
                  />
                  <Image
                    src={dl}
                    alt="name"
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-24"
                  />{" "}
                </div>

                {/* Email */}
                <div className="relative bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 py-2 flex flex-col justify-center min-h-[68px]">
                  <label className="flex items-center gap-2 text-sm text-gray-500">
                    {/* icon: green check */}
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent outline-none text-xl text-black mt-1 pr-24"
                  />
                  <Image
                    src={email}
                    alt="email"
                    className=" absolute right-2 top-1/2 -translate-y-1/2 size-18"
                  />
                </div>

                {/* Phone */}
                <div className="relative bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 py-2 flex flex-col justify-center min-h-[68px]">
                  <label className="flex items-center gap-2 text-sm text-gray-500">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-transparent outline-none text-xl text-black mt-1 pr-24"
                  />
                  <Image
                    src={phone}
                    alt="phone number"
                    className="absolute right-1 top-1/2 -translate-y-1/2 size-20"
                  />
                </div>

                {/* Message */}
                <div className="bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 ">
                  <label className="flex items-center gap-1 text-sm text-gray-500">
                    {/* icon: green check */}
                    Message
                    <Image src={edit} alt="message" className="size-10" />
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Please type your message…"
                    className="w-full bg-transparent outline-none text-xl italic text-gray-500 mt-1 resize-none placeholder:italic placeholder:text-gray-500 placeholder:font-TimesNewRoman"
                  />
                </div>
              </div>

              {/* Send Button */}
              <button
                type="button"
                className="relative mt-3  self-end w-2/3 sm:w-1/2 cursor-pointer hover:brightness-105"
              >
                <Image src={sendbg} alt="Send" className="w-full h-full" />

                {/* Text */}
                <span className="absolute inset-0 left-0 flex items-center justify-center pr-10 font-sans font-bold text-2xl text-white [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000000]">
                  Send
                </span>

                {/* Plane Icon */}
                <Image
                  src={sendicon}
                  alt=""
                  className="absolute right-6 top-0 size-12 z-10 pointer-events-none"
                />
              </button>
            </div>
          </div>

          <button className="mx-auto block rounded-md border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#374151]">
            Load More Reviews
          </button>
        </section>
      </div>
    </div>
  );
}

function RoomCard({
  room,
  gallery,
  href,
}: {
  room: HotelRoom;
  gallery: HotelListing["gallery"];
  href: string;
}) {
  const [active, setActive] = useState(0);
  const photos = [room.image, ...gallery.filter((g) => g !== room.image)].slice(
    0,
    4,
  );
  const price = Number(room.price.replace(/[^0-9.]/g, ""));
  const nights = 7;

  return (
    <div className="w-[410px] shrink-0 overflow-hidden rounded-lg bg-white font-serif shadow-[0_6px_18px_rgba(0,0,0,0.15)]">
      <div className="relative h-52">
        <Image
          src={photos[active]}
          alt={room.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-1 p-1">
        {photos.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`relative h-14 overflow-hidden border-2 ${active === i ? "border-[#D9A441]" : "border-transparent"}`}
            aria-label={`Photo ${i + 1}`}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#222]">{room.name}</h3>
          <span className="flex items-center gap-1 text-[11px] text-gray-600">
            <span className="rounded border-2 border-[#D9A441] px-0.5 text-[10px] font-bold text-[#D9A441]">
              m²
            </span>
            {room.sizeLabel.match(/\(([^)]+)\)/)?.[1] ?? room.sizeLabel}
          </span>
        </div>
        <div className="mt-1 flex gap-6 text-[11px] text-gray-600">
          <span className="flex items-center gap-2">
            <BedDouble className="h-4 w-4" />
            {room.bedLabel}
          </span>
          <span className="flex items-center gap-2">
            <Bath className="h-4 w-4" />
            {room.bathroomsLabel}
          </span>
        </div>
        <ul className="mt-2 grid grid-cols-3 gap-x-2 border-t border-[#f0e0c0] py-2 text-[11px] text-[#222]">
          {room.amenities.map((a) => (
            <li
              key={a}
              className="before:mr-1.5 before:text-[#D9A441] before:content-['•']"
            >
              {a}
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-1 mb-1 grid grid-cols-[1.6fr_auto_1.2fr] border border-gray-200 text-[11px]">
        <div className="space-y-1 p-2">
          <p className="w-fit border border-green-200 bg-green-50 px-1.5 py-0.5 text-[9px] leading-tight text-[#0496FF]">
            Best price with free
            <br />
            cancellation
          </p>
          <p className="flex items-center gap-1 text-gray-600">
            <Utensils className="h-3 w-3" />
            Breakfast for AU$16.33{" "}
            <span className="text-[8px] text-gray-400">(optional)</span>
          </p>
          <p className="flex items-center gap-1 text-green-600">
            <Check className="h-3 w-3" />
            Free Cancellation
          </p>
          <p className="flex items-center gap-1 text-[#0496FF]">
            <Zap className="h-3 w-3 fill-current" />
            Instant confirmation
          </p>
          <p className="flex items-center gap-1 text-[#0496FF]">
            <Banknote className="h-3 w-3 text-green-600" />
            Pay at hotel - No credit card needed
          </p>
        </div>
        <div className="border-x border-gray-200 px-1 pt-1 text-center text-[8px] uppercase text-gray-500">
          Guest(s)
          <p className="flex items-center justify-center">
            <Users className="h-4 w-4 fill-gray-700 text-gray-700" />
            <span className="text-[8px]">2</span>
          </p>
        </div>
        <div className="p-2 text-right leading-tight">
          <p className="text-[10px] tracking-wide text-gray-500">
            TODAY&apos;S &nbsp;PRICE
          </p>
          <p className="mt-1 flex items-center justify-end gap-1">
            <span className="bg-red-600 px-1 text-[8px] text-white">
              15% off
            </span>
            <span className="text-[9px] text-red-500 line-through">
              AU${Math.round(price / 0.85)}
            </span>
            <span className="text-sm text-green-600">AU${price}</span>
          </p>
          <p className="text-gray-500">
            Total price:{" "}
            <span className="text-green-600">AU${price * nights}</span>
          </p>
          <p className="text-sm">1 room</p>
          <p className="text-sm">{nights} nights</p>
          <p className="text-gray-500">incl. taxes &amp; fees</p>
          <Link
            href={href}
            className="mt-1 block rounded bg-[#D9A441] py-1 text-center text-white hover:bg-[#c8922f]"
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
}
