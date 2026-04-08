import Browsebypropertytype from "@/components/Hotel/Browsebypropertytype";
import Experiencesthatlastalifetime from "@/components/Hotel/Experiencesthatlastalifetime";
import GuestExperiences from "@/components/Hotel/GuestExperiences";
import HeroHotel from "@/components/Hotel/HeroHotel";
import LastMinuteHotels from "@/components/Hotel/LastMinuteHotelsNearYou";
import ReadyForYourRainforestRetreat from "@/components/Hotel/ReadyForYourRainforestRetreat";
import TrendingHotelDestinations from "@/components/Hotel/TrendingHotelDestinations";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroHotel />
      <Browsebypropertytype />
      <LastMinuteHotels />
      <TrendingHotelDestinations />
      <Experiencesthatlastalifetime />
      <GuestExperiences />
      <ReadyForYourRainforestRetreat />
    </div>
  );
};

export default page;
