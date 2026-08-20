import PopularCityPropertiesSection from "@/components/city-properties/PopularCityPropertiesSection";
import { studentResidencyCitiesData } from "@/lib/student-residency/popular-cities-data";

const RoomsAndPrices = () => {
  return (
    <PopularCityPropertiesSection
      citiesData={studentResidencyCitiesData}
      defaultCity="Melbourne"
    />
  );
};

export default RoomsAndPrices;
