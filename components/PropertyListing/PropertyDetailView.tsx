import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight} from "lucide-react";
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
import clock from "../../public/clock.svg";
import money from "../../public/money.svg";
import calender from "../../public/calender.svg";
import squaremetericon from "../../public/squaremetericon.svg";
import star from "../../public/star.svg";

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
      <div className="flex flex-col lg:flex-row justify-between gap-8 bg-white rounded-[10px] shadow-sm  p-6 sm:p-8">
          
  {/* Left Column: Property Highlights */}
  <div className=" space-y-3 lg:space-y-6   ">
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
    <div className="flex flex-col sm:flex-row sm:items-center">
      <div className="flex items-start sm:items-center gap-2">
        <Image src={locationIcon} alt="Location" className="w-6 h-6 shrink-0 mt-0.5 sm:mt-0" />
        <h1 className="text-base lg:text-xl font-bold text-gray-900">{property.location}</h1>
      </div>
    </div>

    {/* Date & Time */}
   <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-1  text-gray-600">
          <div className="flex items-center ">
            <Image src={calender} alt="calendericon" className="w-6 h-6  shrink-0" />
            <span className="text-[#343434] font-semibold text-base lg:text-xl">{property.date}</span>
          </div>
          <div className="flex items-center ">
            <Image src={clock} alt="clockicon" className="w-6 h-6  shrink-0" />
            <span className="text-[#343434] font-semibold text-base lg:text-xl">{property.time}</span>
              </div>
               <div className="flex items-center gap-1 ml-2 shrink-0">
              <Image src={squaremetericon} alt="location" className="w-6 h-6 shrink-0" />
            <p className="text-[#343434] font-semibold text-base lg:text-xl">
              {property.size}
            </p>
          </div>
        </div>

    {/* Price & Type */}
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
          <div className="flex items-center gap-1">
          <Image src={money} alt="money icon"/>
          <p className="text-[#343434] font-semibold text-base lg:text-xl">
            {property.priceRange}
          </p>
          </div>
          <p className="text-[#343434] font-semibold text-base lg:text-xl">
            • {property.propertyType}
          </p>
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
            className="rounded-full border-2 border-gray-200 object-cover w-10 lg:w-20 h-10 lg:h-20 shadow"
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
          <div className="">
           <Image src={star} alt="star icons" className="size-1/2 lg:size-auto" />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {property.socials.map((icon, i) => (
              <div key={i} className="w-4 lg:w-8 h-4 lg:h-8 rounded-full overflow-hidden">
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
          <div className="flex flex-wrap items-center justify-between md:justify-start gap-2 lg:gap-4">
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
