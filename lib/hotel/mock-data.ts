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
    slug: "sheraton-sydney",
    title: "Sheraton",
    subtitle: "Sydney, aus",
    location: "Sydney, aus",
    priceLabel: "$120",
    oldPrice: "$180",
    totalLabel: "Total $600 (5 nights)",
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
      name: "Sheraton Booking Team",
      company: "Sheraton Sydney",
      avatar: eddy,
      socials: [whatsapp, instagram, facebook, message, phone, mail],
      flags: [french, china, spanish],
    },
    summary:
      "This architecturally designed development offers an sophisticated retreat, just 5km from the Sydney CBD. Bathed in natural light, the spacious open-plan living and dining areas flow effortlessly onto a private balcony with city views. Featuring a gourmet Caesarstone kitchen with Smeg appliances, and a luxurious master suite, this property is the epitome of comfort and style.",
    meta: ["12-02-2026", "10:00AM", "2,835sqft"],
    mapLabel: "500 George at Liverpool",
    phone: "02 8745 3020",
    email: "Booking@sheraton.com.au",
    roomNames: ["Bedroom", "Balcony View", "Bathroom", "Open Buffet"],
  },
  {
    id: "hotel-2",
    slug: "skyline-harbour-hotel",
    title: "Movenpick",
    subtitle: "Sydney Harbour",
    location: "Sydney Harbour",
    priceLabel: "$790",
    oldPrice: "$890",
    totalLabel: "Total $3950 (3 nights)",
    badge: "9.0 Excellent",
    rating: 5,
    heroImage: hotel2,
    iconImages: ["/bedroom.jpg", "/bath.png", "/car.jpg"],
    gallery: [hotel2, interior2, hotel3, hotel1, interior3, interior4],
    amenities: hotelAmenities,
    host: {
      name: "Movenpick Booking Team",
      company: "Movenpick Sydney Harbour",
      avatar: eddy,
      socials: [whatsapp, instagram, facebook, message, phone, mail],
      flags: [french, china, spanish],
    },
    summary:
      "This architecturally designed development offers an sophisticated retreat, just 5km from the Sydney CBD. Bathed in natural light, the spacious open-plan living and dining areas flow effortlessly onto a private balcony with city views. Featuring a gourmet Caesarstone kitchen with Smeg appliances, and a luxurious master suite, this property is the epitome of comfort and style.",
    meta: ["14-02-2026", "02:00PM", "2,120sqft"],
    mapLabel: "Barangaroo, NSW 2000",
    phone: "+61 2 9251 1234",
    email: "reservations@movenpick.com.au",
    roomNames: ["Harbour Suite", "Spa Retreat", "Rooftop Pool", "Cocktail Lounge"],
  },
  {
    id: "hotel-3",
    slug: "harbour-grand-resort",
    title: "Marriott",
    subtitle: "Circular Quay",
    location: "Circular Quay",
    priceLabel: "$920",
    oldPrice: "$1050",
    totalLabel: "Total $4600 (3 nights)",
    badge: "9.4 Excellent",
    rating: 5,
    heroImage: hotel3,
    iconImages: ["/bedroom.jpg", "/bath.png", "/car.jpg"],
    gallery: [hotel3, interior3, interior1, hotel4, interior4],
    amenities: hotelAmenities,
    host: {
      name: "Marriott Booking Team",
      company: "Marriott Circular Quay",
      avatar: eddy,
      socials: [whatsapp, instagram, facebook, message, phone, mail],
      flags: [french, china, spanish],
    },
    summary:
      "This architecturally designed development offers an sophisticated retreat, just 5km from the Sydney CBD. Bathed in natural light, the spacious open-plan living and dining areas flow effortlessly onto a private balcony with city views. Featuring a gourmet Caesarstone kitchen with Smeg appliances, and a luxurious master suite, this property is the epitome of comfort and style",
    meta: ["18-02-2026", "11:30AM", "2,500sqft"],
    mapLabel: "Circular Quay, NSW 2000",
    phone: "+61 2 9240 1200",
    email: "booking@marriott.com.au",
    roomNames: ["Grand Suite", "Ocean View Balcony", "Premium Bath", "Gourmet Buffet"],
  },
  {
    id: "hotel-4",
    slug: "urban-boutique-stay",
    title: "Holiday Inn",
    subtitle: "Surry Hills",
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
      name: "Holiday Inn Booking Team",
      company: "Holiday Inn Surry Hills",
      avatar: eddy,
      socials: [whatsapp, instagram, facebook, message, phone, mail],
      flags: [french, china, spanish],
    },
    summary:
      "This architecturally designed development offers an sophisticated retreat, just 5km from the Sydney CBD. Bathed in natural light, the spacious open-plan living and dining areas flow effortlessly onto a private balcony with city views. Featuring a gourmet Caesarstone kitchen with Smeg appliances, and a luxurious master suite, this property is the epitome of comfort and style.",
    meta: ["20-02-2026", "09:00AM", "1,980sqft"],
    mapLabel: "Surry Hills, NSW 2010",
    phone: "+61 2 9360 4567",
    email: "hello@holidayinn.com.au",
    roomNames: ["Boutique Room", "Lounge Area", "Ensuite Bathroom", "Cafe Bar"],
  },
  {
    id: "hotel-5",
    slug: "the-darling-star",
    title: "Crowne Plaza",
    subtitle: "Pyrmont",
    location: "Pyrmont",
    priceLabel: "$580",
    oldPrice: "$720",
    totalLabel: "Total $2900 (5 nights)",
    badge: "9.1 Excellent",
    rating: 5,
    heroImage: hotel1,
    iconImages: ["/bedroom.jpg", "/bath.png", "/car.jpg"],
    gallery: [hotel1, interior3, hotel4, interior1, interior2],
    amenities: hotelAmenities,
    host: {
      name: "Crowne Plaza Booking Team",
      company: "Crowne Plaza Pyrmont",
      avatar: eddy,
      socials: [whatsapp, instagram, facebook, message, phone, mail],
      flags: [french, china, spanish],
    },
    summary:
      "This architecturally designed development offers an sophisticated retreat, just 5km from the Sydney CBD. Bathed in natural light, the spacious open-plan living and dining areas flow effortlessly onto a private balcony with city views.",
    meta: ["25-02-2026", "03:00PM", "3,100sqft"],
    mapLabel: "Pirrama Rd, Pyrmont NSW 2009",
    phone: "+61 2 9777 9000",
    email: "reservations@crowneplaza.com.au",
    roomNames: ["Star Suite", "Infinity Pool", "Sky Terrace", "Premium Lounge"],
  },
  {
    id: "hotel-6",
    slug: "opera-residences",
    title: "Ibis Hotels",
    subtitle: "Bennelong Point",
    location: "Bennelong Point",
    priceLabel: "$1,200",
    oldPrice: "$1,500",
    totalLabel: "Total $6000 (5 nights)",
    badge: "9.7 Outstanding",
    rating: 5,
    heroImage: hotel3,
    iconImages: ["/bedroom.jpg", "/bath.png", "/car.jpg"],
    gallery: [hotel3, interior4, hotel2, interior1, interior3],
    amenities: hotelAmenities,
    host: {
      name: "Ibis Hotels Booking Team",
      company: "Ibis Hotels Bennelong Point",
      avatar: eddy,
      socials: [whatsapp, instagram, facebook, message, phone, mail],
      flags: [french, china, spanish],
    },
    summary:
      "Perched beside the iconic Sydney Opera House, this ultra-luxury residence offers panoramic harbour views, Michelin-starred dining, and a rooftop infinity pool. An unmatched experience at the heart of Sydney's cultural precinct.",
    meta: ["28-02-2026", "12:00PM", "4,200sqft"],
    mapLabel: "Bennelong Point, NSW 2000",
    phone: "+61 2 9250 7777",
    email: "concierge@ibishotels.com.au",
    roomNames: ["Opera Suite", "Harbour Panorama", "Crystal Bathroom", "Private Dining"],
  },
];
