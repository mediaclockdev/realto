import ListingCard from "./ListingCard";
import flatshare from "../../public/flatshare.jpg"
import vincenzo from "../../public/vincezo.jpg"

const listings = [
  {
    id: 1,
    type: "flatmate",
    title: "Vincenzo",
    subtitle: "20 year old man",
    price: "$450/week",
        months: "6 months stay",
    img:vincenzo
    
  },
  {
    id: 2,
    type: "place",
    title: "1 Room in Flatshare",
    subtitle: "South Port, Gold Coast",
      price: "$450/week",
    img:flatshare
  },
  {
    id: 3,
    type: "flatmate",
    title: "Vincenzo",
    subtitle: "20 year old man",
      price: "$450/week",
    img:vincenzo
  },
  {
    id: 4,
    type: "place",
    title: "1 Room in Flatshare",
    subtitle: "South Port, Gold Coast",
      price: "$450/week",
       img:flatshare

  },
  {
    id: 5,
    type: "flatmate",
    title: "Vincenzo",
    subtitle: "20 year old man",
      price: "$450/week",
    img:vincenzo
  },
  {
    id: 6,
    type: "place",
    title: "1 Room in Flatshare",
    subtitle: "South Port, Gold Coast",
      price: "$450/week",
     img:flatshare
  },
  {
    id:7,
    type: "flatmate",
    title: "Vincenzo",
    subtitle: "20 year old man",
      price: "$450/week",
    img:vincenzo
  },
  {
    id: 8,
    type: "place",
    title: "1 Room in Flatshare",
    subtitle: "South Port, Gold Coast",
      price: "$450/week",
     img:flatshare
  },
  {
    id: 9,
    type: "flatmate",
    title: "Vincenzo",
    subtitle: "20 year old man",
      price: "$450/week",
    img:vincenzo
  },
  {
    id: 10,
    type: "place",
    title: "1 Room in Flatshare",
    subtitle: "South Port, Gold Coast",
      price: "$450/week",
     img:flatshare
  },
  {
    id: 11,
    type: "flatmate",
    title: "Vincenzo",
    subtitle: "20 year old man",
      price: "$450/week",
    img:vincenzo
  },
  {
    id: 12,
    type: "place",
    title: "1 Room in Flatshare",
    subtitle: "South Port, Gold Coast",
      price: "$450/week",
     img:flatshare
  },
];

export default function ListingsGrid({ mode }: { mode: string }) {
  const filtered =
    mode === "all"
      ? listings
      : listings.filter((item) => item.type === mode);

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
      {filtered.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}