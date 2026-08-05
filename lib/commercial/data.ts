import type { CommercialListing } from "./types";

import internationaltower from "@/public/international tower.jpg";
import port from "@/public/port melbourn.jpg";
import collins from "@/public/collins Street.jpg";
import commercialimg1 from "@/public/commercialimg1.jpg";
import new1 from "@/public/new1.svg";
import new2 from "@/public/new2.svg";
import new3 from "@/public/new3.svg";
import agent1 from "@/public/agentimg1.jpg";
import agent2 from "@/public/agentimg2.jpg";
import agent3 from "@/public/agentimg3.jpg";

const description =
  "A premium commercial opportunity offering flexible floor plates, excellent natural light, and easy access to public transport and major arterial roads. Ideal for businesses seeking a high-profile address with strong exposure and on-site parking.";

export const commercialListings: CommercialListing[] = [
  {
    id: "1",
    title: "International Towers, Sydney",
    propertyType: "Office",
    listingType: "Lease",
    address: "Barangaroo, NSW 2000",
    location: "Barangaroo, NSW 2000",
    price: "Contact for pricing",
    size: "1,200",
    carSpaces: "45",
    day: "Monday",
    date: "08.06.2026",
    time: "10:30",
    thumbnail: internationaltower,
    gallery: [internationaltower, commercialimg1, new1],
    description,
    agent: {
      name: "John Citizen",
      phone: "0400 123 456",
      email: "John.Citizen@niemeyer.com.au",
      image: agent1,
      agencyLogoText: "Niemeyer",
    },
  },
  {
    id: "2",
    title: "Port Melbourne Logistics Hub",
    propertyType: "Warehouse",
    listingType: "Buy",
    address: "Port Melbourne, VIC 3207",
    location: "Port Melbourne, VIC 3207",
    price: "Contact for pricing",
    size: "1,200",
    carSpaces: "45",
    day: "Tuesday",
    date: "09.06.2026",
    time: "02:00",
    thumbnail: port,
    gallery: [port, commercialimg1, new2],
    description,
    agent: {
      name: "Sarah Connor",
      phone: "0422 987 654",
      email: "Sarah.Connor@niemeyer.com.au",
      image: agent2,
      agencyLogoText: "Niemeyer",
    },
  },
  {
    id: "3",
    title: "Collins Street Luxury Retail",
    propertyType: "Retail",
    listingType: "Buy",
    address: "Collins Street, Melbourne VIC 3000",
    location: "Collins Street, Melbourne VIC 3000",
    price: "Contact for pricing",
    size: "1,200",
    carSpaces: "45",
    day: "Wednesday",
    date: "10.06.2026",
    time: "11:00",
    thumbnail: collins,
    gallery: [collins, commercialimg1, new3],
    description,
    agent: {
      name: "Michael Chang",
      phone: "0433 555 777",
      email: "Michael.Chang@niemeyer.com.au",
      image: agent3,
      agencyLogoText: "Niemeyer",
    },
  },
  {
    id: "commercial-1",
    title: "King George Street Warehouse",
    propertyType: "Warehouse",
    listingType: "Lease",
    address: "500 King George Street, Sydney NSW 2000",
    location: "Sydney NSW 2000",
    price: "$100,000",
    size: "850",
    carSpaces: "2",
    day: "Monday",
    date: "08.06.2026",
    time: "10:30",
    thumbnail: new1,
    gallery: [new1, new2, new3],
    description,
    agent: {
      name: "John Citizen",
      phone: "0400 123 456",
      email: "John.Citizen@niemeyer.com.au",
      image: agent1,
      agencyLogoText: "Niemeyer",
    },
  },
  {
    id: "commercial-2",
    title: "Collins Street Retail Suite",
    propertyType: "Retail",
    listingType: "Buy",
    address: "12 Collins Street, Melbourne VIC 3000",
    location: "Melbourne VIC 3000",
    price: "$250,000",
    size: "1,200",
    carSpaces: "4",
    day: "Tuesday",
    date: "09.06.2026",
    time: "02:00",
    thumbnail: new2,
    gallery: [new2, new3, new1],
    description,
    agent: {
      name: "Sarah Connor",
      phone: "0422 987 654",
      email: "Sarah.Connor@niemeyer.com.au",
      image: agent2,
      agencyLogoText: "Niemeyer",
    },
  },
  {
    id: "commercial-3",
    title: "Barangaroo Avenue Office",
    propertyType: "Office",
    listingType: "Buy",
    address: "88 Barangaroo Avenue, Sydney NSW 2000",
    location: "Sydney NSW 2000",
    price: "$1,800,000",
    size: "2,500",
    carSpaces: "8",
    day: "Wednesday",
    date: "10.06.2026",
    time: "11:00",
    thumbnail: new3,
    gallery: [new3, new1, new2],
    description,
    agent: {
      name: "Michael Chang",
      phone: "0433 555 777",
      email: "Michael.Chang@niemeyer.com.au",
      image: agent3,
      agencyLogoText: "Niemeyer",
    },
  },
  {
    id: "commercial-4",
    title: "Main North Road Showroom",
    propertyType: "Showroom",
    listingType: "Lease",
    address: "104 Main North Road, Medindie SA 5081",
    location: "Medindie SA 5081",
    price: "$85,000",
    size: "450",
    carSpaces: "1",
    day: "Thursday",
    date: "11.06.2026",
    time: "09:30",
    thumbnail: new1,
    gallery: [new1, new3, new2],
    description,
    agent: {
      name: "Emily Rodriguez",
      phone: "0455 111 222",
      email: "Emily.Rodriguez@niemeyer.com.au",
      image: agent1,
      agencyLogoText: "Niemeyer",
    },
  },
];

export function getCommercialListingById(id: string) {
  return commercialListings.find((listing) => listing.id === id);
}

export function getRelatedCommercialListings(excludeId: string, limit = 5) {
  return commercialListings
    .filter((listing) => listing.id !== excludeId)
    .slice(0, limit);
}
