import type { ImageSource } from "@/lib/shared/types";
import rentbathroom from "@/public/rentbathroom.svg";
import rentbedroom from "@/public/rentbedroom.svg";
import rentcar from "@/public/rentcar.svg";
import locationiconluxurybuy from "@/public/locationiconluxurybuy.svg";
import luxurybed from "@/public/luxurybed.svg";
import luxurybath from "@/public/luxurybathroom.svg";
import luxurycar from "@/public/luxurycar.svg";
import luxuryclock from "@/public/luxuryclock.svg";
import luxuryClockHammer from "@/public/luxuryClockHammar.svg";

export const buyPropertyFeatureIcons: ImageSource[] = [
  "/bedroom.jpg",
  "/bathroom.jpg",
  "/car.jpg",
];

export const rentPropertyFeatureIcons: ImageSource[] = [
  rentbedroom,
  rentbathroom,
  rentcar,
];

export const luxuryPropertyFeatureIcons: ImageSource[] = [
  luxurybed,
  luxurybath,
  luxurycar,
];

export const luxuryLocationIcon = locationiconluxurybuy;
export const luxuryClockIcon = luxuryclock;
export const luxuryClockIcon2 = luxuryClockHammer;
