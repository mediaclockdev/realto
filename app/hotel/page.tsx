import HotelLogos from "@/components/Home/Hotellogos";
import Browsebypropertytype from "@/components/Hotel/Browsebypropertytype";
import Experiencesthatlastalifetime from "@/components/Hotel/Experiencesthatlastalifetime";
import GuestExperiences from "@/components/Hotel/GuestExperiences";
import HeroHotel from "@/components/Hotel/HeroHotel";
import LastMinuteHotels from "@/components/Hotel/LastMinuteHotelsNearYou";
import ReadyForYourRainforestRetreat from "@/components/Hotel/ReadyForYourRainforestRetreat";
import TrendingHotelDestinations from "@/components/Hotel/TrendingHotelDestinations";
export default function Page() {
  return (
    <div>
      <HeroHotel />
      <Browsebypropertytype />
      <HotelLogos headingColor="text-[#0287C7]" />
      <LastMinuteHotels />
      <TrendingHotelDestinations />
      <Experiencesthatlastalifetime />
      <GuestExperiences />
      <ReadyForYourRainforestRetreat />
    </div>
  );
}
