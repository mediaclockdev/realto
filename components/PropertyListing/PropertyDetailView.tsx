import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight,  Calendar, Clock, Star } from "lucide-react";
import locationIcon from "@/public/location.svg";
import type { ListingProperty } from "./types";
import airconditioner from "../../public/airconditioner.svg"
import Wifi from "../../public/wifi.svg"
import alarmsystem from "../../public/alarmsystem.svg"
import dishwasher from "../../public/dishwasher.svg"
import builtInRobes from "../../public/buildinrobes.svg"
import balcony from "../../public/balcony.svg"
import garage from "../../public/garage.svg"
import fullyfenced from "../../public/fullyfenced.svg"
import swimmingpool from "../../public/swimmingpool.svg"

interface PropertyDetailViewProps {
  property: ListingProperty;
  onBack?: () => void;
}

const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ property, onBack }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.thumbnail.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.thumbnail.length) % property.thumbnail.length);
  };

  const amenities = [
    { name: "Air Conditioner", icon: airconditioner,  },
    { name: "Wi-fi", icon: Wifi,  },
    { name: "Alarm System", icon: alarmsystem,  },
    { name: "Dishwasher", icon: dishwasher,  },
    { name: "Built-in robes", icon: builtInRobes,  },
    { name: "Balcony", icon: balcony,  },
    { name: "Garage", icon: garage,  },
    { name: "Fully fenced", icon: fullyfenced,  },
    { name: "Swimming pool", icon: swimmingpool,  },
  ];

  return (
    <div className="bg-gray-50 flex-1 overflow-y-auto">
      {/* Back Button */}
      {onBack && (
        <div className="p-4 bg-white sticky top-0 z-50 shadow-sm border-b">
          <button onClick={onBack} className="flex items-center text-gray-700 font-medium hover:text-red-500 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to listings
          </button>
        </div>
      )}

      {/* Hero Image Section */}
      <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] bg-gray-200">
        <Image
          src={property.thumbnail[activeImageIndex]}
          alt={`Property view ${activeImageIndex + 1}`}
          fill
          className=""
        />
        {property.thumbnail.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(property.thumbnail || property.images).map((img, idx) => (

            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                activeImageIndex === idx ? "border-red-500 opacity-100" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-10xl mx-auto px-4 py-4 space-y-8">
        
        {/* Main Info & Agent Card Grid */}
      <div className="flex justify-between gap-8 bg-white rounded-[10px] shadow-sm  p-6 sm:p-8">
          
  {/* Left Column: Property Highlights */}
  <div className=" space-y-6   ">
    {/* Features Icons */}
    {property.iconImages && (
      <div className="flex items-center gap-2">
        {property.iconImages.map((icon, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-10 h-10">
              <Image src={icon} alt="Feature" width={20} height={20} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-bold text-gray-800">
              {property.iconLabels?.[i] ?? "1"}
            </span>
          </div>
        ))}
      </div>
    )}

    {/* Location & Size */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div className="flex items-start sm:items-center gap-2">
        <Image src={locationIcon} alt="Location" className="w-6 h-6 shrink-0 mt-0.5 sm:mt-0" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{property.location}</h1>
      </div>
     
    </div>

    {/* Date & Time */}
    <div className="flex items-center gap-6 text-gray-600 font-medium">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-red-500" />
        <span>{property.date}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-red-500" />
        <span>{property.time}</span>
              </div>
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shrink-0">
        <span className="text-gray-500">📐</span>
        <span className="font-semibold text-gray-800">{property.size}</span>
      </div>
    </div>

    {/* Price & Type */}
    <div className="flex items-center gap-4 pt-4">
      <span className="text-2xl sm:text-3xl font-bold text-green-600">
        {property.priceRange}
      </span>
      <span className="text-lg text-gray-500 font-medium mt-1">
        • {property.propertyType}
      </span>
    </div>
  </div>

  {/* Right Column: Agent Card */}
  <div className="lg:col-span-1">
    <div className="bg-[#EDEDED] p-4 rounded-[10px] shadow-sm  sticky top-6">
      <div className="flex items-center gap-4">

        {/* Left: Avatar + Name */}
        <div className="flex flex-col items-center gap-2 min-w-[90px]">
          <Image
            src={property.agentImage}
            alt={property.agentName}
            width={80}
            height={80}
            className="rounded-full border-2 border-gray-200 object-cover w-20 h-20 shadow"
          />
          <h3 className="font-bold text-sm text-gray-900 text-center">{property.agentName}</h3>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-200 self-stretch" />

        {/* Right: Company, License, Stars, Socials */}
        <div className="flex flex-col gap-2 flex-1">
          {/* <h2 className="font-bold text-base text-gray-900 leading-tight">{property.agentCompany}</h2> */}
          <p className="text-xs text-gray-400">License# 12345678</p>

          {/* 5 Stars */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {property.socials.map((icon, i) => (
              <div key={i} className="w-8 h-8 rounded-full overflow-hidden">
                <Image src={icon} alt="icon" width={32} height={32} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>

</div>

        {/* Property Description */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Property description</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Enim dolor est adipiscing consequat. Diam id auctor nunc sed id. Consectetur id risus tellus est sed mi. Risus pretium proin nibh condimentum dui non. Lorem ipsum dolor sit amet consectetur. Enim dolor est adipiscing consequat. Diam id auctor nunc sed id. Consectetur id risus tellus est sed mi. Risus pretium proin nibh condimentum dui non.
          </p>
        </div>

        {/* Amenities & Facilities */}
        <div className="bg-white px-3 py-4 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Amenities & Facilities</h2>
          <div className="flex flex-wrap items-center gap-4">
            {amenities.map((item, idx) => (
              <div key={idx} className="rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center transition-transform hover:scale-105 cursor-default">
                <Image src={item.icon} alt="amenity" width={40} height={40} className="w-full h-full" />
               
              </div>
            ))}
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
            <h3 className="text-center font-bold text-lg text-gray-900">Map view of property</h3>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="w-full h-[300px] bg-gray-200 rounded-xl overflow-hidden relative mb-4">
              {/* Fake satellite view using a different openstreetmap tile layer or just placeholder */}
              <iframe
                title="Satellite view"
                width="100%"
                height="100%"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=hot&marker=-33.9%2C151.1"
                className="border-0 w-full h-full pointer-events-none"
              />
            </div>
            <h3 className="text-center font-bold text-lg text-gray-900">Satellite view of property</h3>
          </div>
        </div>

        {/* Property History */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Property History</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Enim dolor est adipiscing consequat. Diam id auctor nunc sed id. Consectetur id risus tellus est sed mi. Risus pretium proin nibh condimentum dui non. Lorem ipsum dolor sit amet consectetur. Enim dolor est adipiscing consequat. Diam id auctor nunc sed id. Consectetur id risus tellus est sed mi. Risus pretium proin nibh condimentum dui non.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailView;
