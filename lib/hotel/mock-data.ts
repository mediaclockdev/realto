import type { HotelListing } from "@/lib/hotel/types";
import hotel1 from "@/public/hotelimg.png";
import hotel2 from "@/public/chinahotel.jpg";
import hotel3 from "@/public/dubaihotel.jpg";
import hotel4 from "@/public/parishotel.jpg";
import interior1 from "@/public/contact1.jpeg";
import interior2 from "@/public/contact2.jpeg";
import interior3 from "@/public/contact3.jpeg";
import interior4 from "@/public/contact4.jpeg";
import balcony from "@/public/balcony.svg";
import eddy from "@/public/eddyjones.svg";
import facebook from "@/public/logos_facebook.svg";
import instagram from "@/public/logos_instagram.svg";
import whatsapp from "@/public/whatsapp.svg";
import message from "@/public/smslogo.svg";
import phone from "@/public/phone.svg";
import mail from "@/public/mail.svg";
import french from "@/public/Franceflag.svg";
import china from "@/public/chinaflag.svg";
import spanish from "@/public/spain.svg";
import airconditioner from "../../public/airconditioner.svg";
import Wifi from "../../public/wifi.svg";
import alarmsystem from "../../public/alarmsystem.svg";
import dishwasher from "../../public/dishwasher.svg";
import builtInRobes from "../../public/buildinrobes.svg";
import garage from "../../public/garage.svg";
import fullyfenced from "../../public/fullyfenced.svg";
import swimmingpool from "../../public/swimmingpool.svg";

const hotelAmenities = [
  { label: "Air Conditioner", icon: airconditioner },
  { label: "Wi-fi", icon: Wifi },
  { label: "Alarm System", icon: alarmsystem },
  { label: "Dishwasher", icon: dishwasher },
  { label: "Built-in robes", icon: builtInRobes },
  { label: "Balcony", icon: balcony },
  { label: "Garage", icon: garage },
  { label: "Fully fenced", icon: fullyfenced },
  { label: "Swimming pool", icon: swimmingpool },
];

export const hotelListings: HotelListing[] = [
  {
    id: "hotel-1",
    slug: "park-hyatt-sydney",
    title: "Park Hyatt Sydney",
    subtitle: "Free Wi-Fi | Infinity Pool | Breakfast included",
    location: "Austin, Australia",
    priceLabel: "$850",
    totalLabel: "Total $4250 (3 nights)",
    badge: "9.2 Excellent",
    rating: 5,
    heroImage: hotel1,
    iconImages: ["/bedroom.jpg", "/bath.png", "/car.jpg"],
    gallery: [
      hotel1,
      interior1,
      hotel2,
      hotel3,
      interior2,
      interior3,
      interior4,
      hotel4,
    ],
    amenities: hotelAmenities,
    host: {
      name: "Austin Jones",
      company: "Parker Realestate",
      avatar: eddy,
      socials: [whatsapp, instagram, facebook, message, phone, mail],
      flags: [french, china, spanish],
    },
    summary:
      "This architecturally designed development offers an sophisticated retreat, just 5km from the Sydney CBD. Bathed in natural light, the spacious open-plan living and dining areas flow effortlessly onto a private balcony with city views. Featuring a gourmet Caesarstone kitchen with Smeg appliances, and a luxurious master suite, this property is the epitome of comfort and style.",
    meta: ["12-02-2026", "10:00AM", "2,835sqft"],
    mapLabel: "Sans Souci, NSW 2219",
  },
  {
    id: "hotel-2",
    slug: "skyline-harbour-hotel",
    title: "Skyline Harbour Hotel",
    subtitle: "Rooftop lounge | Harbour view | Breakfast included",
    location: "Sydney Harbour",
    priceLabel: "$790",
    totalLabel: "Total $3950 (3 nights)",
    badge: "9.0 Excellent",
    rating: 5,
    heroImage: hotel2,
    iconImages: ["/bedroom.jpg", "/bath.png", "/car.jpg"],
    gallery: [hotel2, interior2, hotel3, hotel1, interior3, interior4],
    amenities: hotelAmenities,
    host: {
      name: "Eddy Jones",
      company: "Stayline Group",
      avatar: eddy,
      socials: [whatsapp, instagram, facebook, message, phone, mail],
      flags: [french, china, spanish],
    },
    summary:
      "This architecturally designed development offers an sophisticated retreat, just 5km from the Sydney CBD. Bathed in natural light, the spacious open-plan living and dining areas flow effortlessly onto a private balcony with city views. Featuring a gourmet Caesarstone kitchen with Smeg appliances, and a luxurious master suite, this property is the epitome of comfort and style.",
    meta: ["14-02-2026", "02:00PM", "2,120sqft"],
    mapLabel: "Barangaroo, NSW 2000",
  },
  {
    id: "hotel-3",
    slug: "harbour-grand-resort",
    title: "Harbour Grand Resort",
    subtitle: "Spa | Breakfast | Late checkout available",
    location: "Circular Quay",
    priceLabel: "$920",
    totalLabel: "Total $4600 (3 nights)",
    badge: "9.4 Excellent",
    rating: 5,
    heroImage: hotel3,
    iconImages: ["/bedroom.jpg", "/bath.png", "/car.jpg"],
    gallery: [hotel3, interior3, interior1, hotel4, interior4],
    amenities: hotelAmenities,
    host: {
      name: "Eddy Jones",
      company: "Harbour Collection",
      avatar: eddy,
      socials: [whatsapp, instagram, facebook, message, phone, mail],
      flags: [french, china, spanish],
    },
    summary:
      "This architecturally designed development offers an sophisticated retreat, just 5km from the Sydney CBD. Bathed in natural light, the spacious open-plan living and dining areas flow effortlessly onto a private balcony with city views. Featuring a gourmet Caesarstone kitchen with Smeg appliances, and a luxurious master suite, this property is the epitome of comfort and style",
    meta: ["18-02-2026", "11:30AM", "2,500sqft"],
    mapLabel: "Circular Quay, NSW 2000",
  },
  {
    id: "hotel-4",
    slug: "urban-boutique-stay",
    title: "Urban Boutique Stay",
    subtitle: "Design stay | Walkable CBD | Flexible cancellation",
    location: "Surry Hills",
    priceLabel: "$640",
    totalLabel: "Total $3200 (3 nights)",
    badge: "8.8 Excellent",
    rating: 5,
    heroImage: hotel4,
    iconImages: ["/bedroom.jpg", "/bath.png", "/car.jpg"],
    gallery: [hotel4, interior4, hotel1, interior2],
    amenities: hotelAmenities,
    host: {
      name: "Eddy Jones",
      company: "City Rooms",
      avatar: eddy,
      socials: [whatsapp, instagram, facebook, message, phone, mail],
      flags: [french, china, spanish],
    },
    summary:
      "This architecturally designed development offers an sophisticated retreat, just 5km from the Sydney CBD. Bathed in natural light, the spacious open-plan living and dining areas flow effortlessly onto a private balcony with city views. Featuring a gourmet Caesarstone kitchen with Smeg appliances, and a luxurious master suite, this property is the epitome of comfort and style.",
    meta: ["20-02-2026", "09:00AM", "1,980sqft"],
    mapLabel: "Surry Hills, NSW 2010",
  },
];
