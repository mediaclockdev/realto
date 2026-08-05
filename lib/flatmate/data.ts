import type { FlatmateListing } from "./types";
import flatshare from "../../public/flatshare.jpg";
import vincenzo from "../../public/vincezo.jpg";
import hostAvatar from "../../public/recommendagent2.png";
import flatmatedetailimg1 from "../../public/flatmatedetailimg1.svg";
import flatmatedetailimg2 from "../../public/flatmatedetailimg2.svg";
import flatmatedetailimg3 from "../../public/flatmatedetailimg3.svg";

const defaultFeatures = [
  { icon: "/airconditioner.svg", label: "Air Conditioner" },
  { icon: "/wifi.svg", label: "Wi-Fi" },
];

const placeListing: Omit<FlatmateListing, "id"> = {
  type: "place",
  title: "1 Room in Flatshare",
  subtitle: "South Port, Gold Coast",
  location: "Shepparton, VIC",
  price: "$450/week",
  months: "Available 13 March 2026",
  thumbnail: flatshare,
  gallery: [flatmatedetailimg1, flatmatedetailimg2, flatmatedetailimg3],
  rooms: [
    { amount: "$350", billsLabel: "Inc. Bills" },
    { amount: "$350", billsLabel: "Inc. Bills" },
    { amount: "$350", billsLabel: "Inc. Bills" },
  ],
  roomIcons: [
    { icon: "/bedroom.jpg", count: 1 },
    { icon: "/bath.png", count: 1 },
    { icon: "/car.jpg", count: 1 },
  ],
  features: defaultFeatures,
  aboutFlatmates:
    "Meet Andrew (29, a local engineer) and Liam (26, an environmental scientist). We're both easygoing young professionals who work full-time. During the week, we're mostly focused on work and gym, but we enjoy a chat and a beer in the evening. We keep the communal areas very clean and respect everyone's private space, and are looking for someone with a similar respectful, tidy, and friendly vibe. We enjoy cooking together occasionally on weekends, maybe a movie night, but we're not a party house.",
  propertyDescription:
    "This light-filled, 3-bedroom, 2-bathroom home is perfectly positioned just a short 5-minute walk to Goulburn Valley Health and the beautiful Goulburn River walking tracks. We have two large bedrooms available. Both rooms are fully furnished, featuring a comfortable queen-sized bed, built-in robes, and large windows with garden views. The house boasts a large, open-plan kitchen and dining area, a separate cozy living room, a full internal laundry, and a beautiful outdoor decking area perfect for summer BBQs.",
  host: { name: "Andrew", avatar: hostAvatar, status: "Online Today" },
};

const flatmateListing: Omit<FlatmateListing, "id"> = {
  type: "flatmate",
  title: "Vincenzo",
  subtitle: "20 year old man",
  location: "Shepparton, VIC",
  price: "$450/week",
  Available: "Available now",
  months: "6 months stay",
  thumbnail: vincenzo,
  gallery: [flatmatedetailimg1, flatmatedetailimg2, flatmatedetailimg3],
  rooms: [{ amount: "$450", billsLabel: "Inc. Bills" }],
  roomIcons: [
    { icon: "/bedroom.jpg", count: 1 },
    { icon: "/bath.png", count: 1 },
  ],
  features: defaultFeatures,
  aboutFlatmates:
    "Vincenzo is a friendly, tidy 20 year old looking for a place to share with easygoing housemates. Works full-time during the week and enjoys a quiet night in over a party house.",
  propertyDescription:
    "This light-filled home is perfectly positioned close to local shops, transport, and parks. The room is fully furnished, featuring a comfortable queen-sized bed, built-in robes, and large windows with garden views.",
  host: { name: "Vincenzo", avatar: vincenzo, status: "Online Today" },
};

export const flatmateListings: FlatmateListing[] = Array.from(
  { length: 16 },
  (_, i) => {
    const id = i + 1;
    const base = id % 2 === 1 ? flatmateListing : placeListing;
    return { ...base, id };
  },
);

export function getFlatmateListingById(id: number) {
  return flatmateListings.find((listing) => listing.id === id);
}

export function getRelatedFlatmateListings(excludeId: number, limit = 5) {
  return flatmateListings.filter((listing) => listing.id !== excludeId).slice(0, limit);
}
