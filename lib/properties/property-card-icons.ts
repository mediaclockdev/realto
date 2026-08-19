import type { ImageSource } from "@/lib/shared/types";
import rentbathroom from "@/public/rentbathroom.svg";
import rentbedroom from "@/public/rentbedroom.svg";
import rentcar from "@/public/rentcar.svg";
import locationiconluxurybuy from "@/public/locationiconluxurybuy.svg";
import luxurybed from "@/public/luxurybed.svg";
import luxurybath from "@/public/luxurybathroom.svg";
import luxurycar from "@/public/luxurycar.svg";
import luxuryclockicon1 from "@/public/luxuryclockicon1.svg";
import luxuryclockicon2 from "@/public/luxuryclockicon2.svg";
import luxuryclockicon3 from "@/public/luxuryclockicon3.svg";
import buyclockicon1 from "@/public/buyclockicon1.svg";
import buyclockicon2 from "@/public/buyclockicon2.svg";
import locationland from "@/public/landlocationicon.svg";
import luxurylike from "@/public/luxurylike.svg";
import luxuryliked from "@/public/luxuryliked.svg";
import luxurysqft from "@/public/luxurysqfticon.svg";

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
export const luxurySqftIcon: ImageSource = luxurysqft;
export const luxuryClockIcon = luxuryclockicon1;
export const luxuryClockIcon2 = luxuryclockicon2;
export const luxuryClockIcon3 = luxuryclockicon3;
export const buyClockIcon1: ImageSource = buyclockicon1;
export const buyClockIcon2: ImageSource = buyclockicon2;
export const landLocationIcon2: ImageSource = locationland;
export const luxurylikeicon: ImageSource = luxurylike;
export const luxurylikedicon: ImageSource = luxuryliked;
