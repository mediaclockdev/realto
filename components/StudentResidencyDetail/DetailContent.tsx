"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Property } from "@/types/types";
import {
  Share2,
  Heart,
  MapPin,
  Star,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Map,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import walk from "@/public/studentresidencywalkicon.svg";
import bus from "@/public/studentresidencybusicon.svg";
import community from "@/public/studentresidencycommunityicon.svg";
import security from "@/public/studentresidencysecurityicon.svg";

/* ─── Breadcrumb ─── */
const Breadcrumb = ({ property }: { property: Property }) => (
  <div className="text-sm text-gray-500 py-4 flex items-center gap-1.5">
    <span className="hover:text-gray-700 cursor-pointer">Home</span>
    <span>&gt;</span>
    <span className="hover:text-gray-700 cursor-pointer">
      Student Residency
    </span>
    <span>&gt;</span>
    <span className="hover:text-gray-700 cursor-pointer">Melbourne</span>
    <span>&gt;</span>
    <span className="text-gray-900 font-semibold">
      {property.name}
    </span>
  </div>
);

/* ─── Header ─── */
const HeaderInfo = ({ property }: { property: Property }) => (
  <div className="flex justify-between items-start mb-4">
    <div>
      <div className="flex items-center gap-3 flex-wrap mb-1">
        <h1 className="text-2xl font-bold text-gray-900">
          {property.name}
        </h1>
        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold border border-blue-200">
          Student Residency
        </span>
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-bold">{property.rating}</span>
          <span className="text-gray-400">({property.reviews} reviews)</span>
        </div>
      </div>
      <div className="flex items-center text-gray-500 text-sm gap-1">
        <MapPin className="w-3.5 h-3.5" />
        <span>{property.location} -</span>
        <a href="#" className="text-blue-600 font-medium hover:underline">
          View on map &gt;
        </a>
      </div>
    </div>
    <div className="flex items-center gap-5 shrink-0">
      <button className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm">
        <Share2 className="w-4 h-4 text-blue-500" /> Share
      </button>
      <button className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm">
        <Heart className="w-4 h-4 text-gray-400" /> Save
      </button>
    </div>
  </div>
);

/* ─── Photo Gallery ─── */
const PhotoGallery = () => (
  <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden h-[380px]">
    {/* Main large image */}
    <div className="col-span-2 relative">
      <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold text-green-700 z-10 shadow">
        <CheckCircle className="w-3.5 h-3.5" /> Verified Property
      </div>
      <Image
        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2000"
        alt="Main bedroom"
        fill
        className="object-cover"
      />
      <div className="absolute inset-y-0 left-3 flex items-center">
        <button className="bg-white/90 p-1.5 rounded-full shadow hover:bg-white transition">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-3 flex items-center">
        <button className="bg-white/90 p-1.5 rounded-full shadow hover:bg-white transition">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
        1 / 24
      </div>
    </div>

    {/* Right thumbnails */}
    <div className="col-span-1 grid grid-rows-3 gap-2">
      <div className="overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=400"
          alt="Exterior"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400"
          alt="Gym"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="overflow-hidden relative cursor-pointer group">
        <Image
          src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400"
          alt="Kitchen"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-base group-hover:bg-black/60 transition">
          +21 Photos
        </div>
      </div>
    </div>
  </div>
);

/* ─── Sidebar (Pricing + Need Help) ─── */
const PricingSidebar = ({ property }: { property: Property }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
    <div className="text-xl font-bold text-blue-600 mb-0.5">
      AUD ${property.price}{" "}
      <span className="text-base text-gray-500 font-normal">/ month</span>
    </div>
    <div className="text-sm text-gray-500 mb-5">All bills included</div>

    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg mb-3 transition-colors text-sm">
      Apply Now
    </button>
    <button className="w-full border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 font-semibold py-3 rounded-lg mb-5 transition-colors text-sm">
      Contact Property
    </button>

    <div className="border-t border-gray-100 pt-4 mb-5">
      <div className="flex items-start gap-3">
        <span className="text-lg mt-0.5">🎓</span>
        <div>
          <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            Available For
          </div>
          <div className="font-bold text-gray-900 text-sm">
            Semester 2, 2026
          </div>
          <div className="text-xs text-gray-500">01 Jul 2026 - 31 Dec 2026</div>
        </div>
      </div>
    </div>

    <div className="space-y-2.5">
      {[
        "Flexible lease options",
        "No brokerage fee",
        "Verified student accommodation",
        "Safe & secure property",
      ].map((feature, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
          <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" /> {feature}
        </div>
      ))}
    </div>
  </div>
);

const NeedHelpCard = () => (
  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
    <h3 className="text-lg font-bold mb-1">Need Help?</h3>
    <p className="text-sm text-blue-100 mb-4 leading-snug">
      Our student housing experts are here to help find the right place.
    </p>
    <button className="bg-white text-blue-600 font-semibold py-2.5 px-6 rounded-full flex items-center justify-center gap-2 mx-auto w-full text-sm hover:bg-blue-50 transition">
      <MessageCircle className="w-4 h-4" /> Chat with Us
    </button>
  </div>
);

/* ─── Overview ─── */
const Overview = ({ property }: { property: Property }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-2  bg-[#ECC850] inline-block px-4 py-1 text-white [text-shadow:_1px_1px_2.1px_#000000,_0px_0px_7.3px_rgba(0,0,0,0.6)] rounded-lg">
      Overview
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed mb-1">
      {property.name} offers modern, fully furnished student
      accommodation in the heart of Melbourne. Located just a 3-minute walk from
      RMIT University and close to the University of Melbourne, it provides a
      safe, comfortable, and vibrant living environment with great facilities
      and a supportive community.
    </p>
    <a href="#" className="text-blue-600 font-medium text-sm hover:underline">
      Read more ▾
    </a>

    <div className="grid grid-cols-4 gap-3 mt-5">
      {[
        { title: "3 min walk", subtitle: "to RMIT University", icon: walk },
        { title: "5 min walk", subtitle: "to public transport", icon: bus },
        { title: "24/7 Security", subtitle: "with CCTV", icon: security },
        {
          title: "Student Community",
          subtitle: "Events & activities",
          icon: community,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-xl mb-1.5 bg-blue-50 w-9 h-9 flex items-center justify-center rounded-full">
            <Image src={item.icon} alt={item.title} width={24} height={24} />
          </div>
          <div className="font-bold text-xs">{item.title}</div>
          <div className="text-[11px] text-gray-500">{item.subtitle}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Facilities ─── */
const Facilities = () => (
  <div className="mb-10">
    <h2 className="text-lg font-bold mb-5 inline-block px-4 py-1 bg-[#ECC850] text-white [text-shadow:_1px_1px_2.1px_#000000,_0px_0px_7.3px_rgba(0,0,0,0.6)] rounded-lg">
      Facilities & Amenities
    </h2>
    <div className="relative flex items-center">
      <button className="absolute -left-3 z-10 bg-white shadow-md rounded-full p-1.5 border border-gray-200 text-yellow-500 hover:shadow-lg transition">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <div className="flex gap-3 overflow-x-hidden px-2 py-1 w-full">
        {[
          {
            name: "Air Conditioner",
            img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=120&h=100&fit=crop",
          },
          {
            name: "Wi-Fi",
            img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=120&h=100&fit=crop",
          },
          {
            name: "Alarm System",
            img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=120&h=100&fit=crop",
          },
          {
            name: "Dishwasher",
            img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=120&h=100&fit=crop",
          },
          {
            name: "Built-in robes",
            img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=120&h=100&fit=crop",
          },
          {
            name: "Balcony",
            img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=120&h=100&fit=crop",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="min-w-[100px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col items-center hover:shadow-md transition-shadow"
          >
            <div className="h-[72px] w-full bg-gray-50 flex items-center justify-center p-1.5">
              <img
                src={f.img}
                alt={f.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="py-2 text-[11px] font-medium text-center text-gray-700">
              {f.name}
            </div>
          </div>
        ))}
      </div>
      <button className="absolute -right-3 z-10 bg-white shadow-md rounded-full p-1.5 border border-gray-200 text-yellow-500 hover:shadow-lg transition">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

/* ─── Location ─── */
const Location = () => (
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-5  inline-block px-4 py-1  bg-[#ECC850] text-white [text-shadow:_1px_1px_2.1px_#000000,_0px_0px_7.3px_rgba(0,0,0,0.6)] rounded-lg">
      Location
    </h2>
    <div className="flex flex-col md:flex-row gap-6">
      {/* Map */}
      <div className="md:w-[45%] rounded-2xl overflow-hidden h-[280px] relative shadow-sm border border-gray-200">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
          className="w-full h-full object-cover"
          alt="Map view"
        />
        <div className="absolute inset-0 bg-blue-50/20"></div>
        {/* Map controls */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full px-1 py-1 flex shadow-lg border border-gray-100">
          <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Map className="w-3 h-3" /> Map
          </button>
          <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-full">
            Street view
          </button>
          <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-full">
            Satellite
          </button>
        </div>
      </div>
      {/* Nearby */}
      <div className="md:w-[55%]">
        <h3 className="text-lg font-bold mb-3">What&apos;s Nearby?</h3>
        <div className="space-y-3">
          {[
            {
              name: "RMIT University",
              time: "3 min walk",
              dist: "240 m",
              icon: "🎓",
            },
            {
              name: "University of Melbourne",
              time: "12 min walk",
              dist: "900 m",
              icon: "🏛️",
            },
            {
              name: "Melbourne Central Station",
              time: "5 min walk",
              dist: "400 m",
              icon: "🚆",
            },
            {
              name: "Queen Victoria Market",
              time: "10 min walk",
              dist: "800 m",
              icon: "🛍️",
            },
            {
              name: "Coles Supermarket",
              time: "2 min walk",
              dist: "180 m",
              icon: "🛒",
            },
            {
              name: "Local Cafes & Restaurants",
              time: "1-5 min walk",
              dist: "Nearby",
              icon: "☕",
            },
            {
              name: "Royal Melbourne Hospital",
              time: "15 min by tram",
              dist: "2.4 km",
              icon: "🏥",
            },
          ].map((place, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-sm border-b border-gray-100 pb-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{place.icon}</span>
                <span className="font-medium text-gray-800">{place.name}</span>
              </div>
              <div className="text-gray-400 text-xs flex gap-3">
                <span>{place.time}</span>
                <span className="w-12 text-right font-medium text-gray-500">
                  {place.dist}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Reviews ─── */
const Reviews = () => (
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-5 inline-block px-4 py-1  bg-[#ECC850] text-white [text-shadow:_1px_1px_2.1px_#000000,_0px_0px_7.3px_rgba(0,0,0,0.6)] rounded-lg">
      Student Reviews
    </h2>
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Rating summary */}
      <div className="lg:w-[30%] bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-end gap-2 mb-3">
          <span className="text-4xl font-bold text-gray-900">4.6</span>
          <div className="mb-1">
            <div className="flex text-yellow-400 mb-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <div className="text-[11px] text-gray-500">
              Based on 320 reviews
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {[
            { stars: 5, pct: 68 },
            { stars: 4, pct: 24 },
            { stars: 3, pct: 6 },
            { stars: 2, pct: 1 },
            { stars: 1, pct: 1 },
          ].map((row) => (
            <div
              key={row.stars}
              className="flex items-center gap-1.5 text-[11px] text-gray-600"
            >
              <span className="w-2">{row.stars}</span>
              <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${row.pct}%` }}
                ></div>
              </div>
              <span className="w-7 text-right">{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            name: "Emily Carter",
            uni: "University of Melbourne",
            rating: 5.0,
            time: "2 months ago",
            text: "Fantastic location and great facilities! The staff are friendly and the community events make it easy to meet new people.",
            color: "bg-blue-100",
          },
          {
            name: "Rahul Mehta",
            uni: "RMIT University",
            rating: 4.5,
            time: "3 months ago",
            text: "The rooms are clean and modern. Really convenient for university and public transport. Highly recommend!",
            color: "bg-orange-100",
          },
        ].map((review, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-lg font-bold text-gray-600`}
              >
                {review.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">
                  {review.name}
                </div>
                <div className="text-[11px] text-gray-500">{review.uni}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2 text-xs">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${star <= Math.floor(review.rating) ? "fill-current" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-800">{review.rating}</span>
              <span className="text-gray-400">{review.time}</span>
            </div>
            <p className="text-sm text-gray-600 italic leading-relaxed">
              &ldquo;{review.text}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── FAQ ─── */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Are bills included in the rent?",
      a: "Yes, all utility bills including Wi-Fi, electricity, water and gas are included in the monthly rent.",
    },
    {
      q: "What is the minimum lease period?",
      a: "The minimum lease period is 6 months.",
    },
    {
      q: "Is there a security deposit?",
      a: "Yes, a refundable security deposit equivalent to 4 weeks rent is required.",
    },
    {
      q: "Can I book before arriving in Melbourne?",
      a: "Yes, you can book online before arriving in Melbourne.",
    },
    {
      q: "Are there any additional fees?",
      a: "No additional fees are charged beyond the monthly rent.",
    },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-5 inline-block px-4 py-1 bg-[#ECC850] text-white [text-shadow:_1px_1px_2.1px_#000000,_0px_0px_7.3px_rgba(0,0,0,0.6)] rounded-lg">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* FAQ accordion */}
        <div className="lg:w-[60%] space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm"
            >
              <button
                className="w-full px-4 py-3.5 flex justify-between items-center text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span className="flex items-center gap-2">
                  <span className="bg-yellow-400 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    ?
                  </span>
                  {faq.q}
                </span>
                {openIndex === i ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-sm text-gray-600 pl-11 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="lg:w-[40%] flex flex-col justify-start">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-1 text-base">
              Still have questions?
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Talk to our student housing experts.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-white border border-gray-200 text-gray-800 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm text-sm">
                <Phone className="w-4 h-4 text-blue-500" /> +61 290 961 100
              </button>
              <button className="w-full bg-white border border-gray-200 text-gray-800 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm text-sm">
                <Mail className="w-4 h-4 text-blue-500" /> Email us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Bottom Banner ─── */
const BottomBanner = () => (
  <div className="bg-[#0f172a] rounded-2xl px-10 py-8 mb-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <img
        src="https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=1200"
        className="w-full h-full object-cover opacity-15"
        alt=""
      />
    </div>
    <div className="relative z-10 text-white">
      <h2 className="text-2xl font-bold mb-1">Find Your Student Home Today</h2>
      <p className="text-gray-400 text-sm">
        Join thousands of students living better with Realto.
      </p>
    </div>
    <div className="relative z-10 mt-4 md:mt-0">
      <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 text-sm">
        Explore More Residences <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

/* ─── Main Layout ─── */
export default function DetailContent({ property }: { property: Property }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 font-sans text-gray-900">
      <Breadcrumb property={property} />
      <HeaderInfo property={property} />

      {/* Top section: 2-column for Gallery+Overview & Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        {/* LEFT COLUMN */}
        <div className="lg:w-[65%]">
          <PhotoGallery />
          <div className="mt-8">
            <Overview property={property} />
          </div>
        </div>

        {/* RIGHT COLUMN (Sidebar) */}
        <div className="lg:w-[35%]">
          <div className="space-y-5">
            <PricingSidebar property={property} />
            <NeedHelpCard />
          </div>
        </div>
      </div>

      {/* Full-width sections below */}
      <div className="w-full">
        <Facilities />
        <Location />
        <Reviews />
        <FAQ />
      </div>

      <BottomBanner />
    </div>
  );
}
