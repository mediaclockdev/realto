import { CityTabsProps } from "../../types/types";

export default function CityTabs({
  cities,
  activeCity,
  onCityChange,
}: CityTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-2.5 mb-5 md:mb-7">
  {cities.map((city) => (
    <button
      key={city}
      onClick={() => onCityChange(city)}
      className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm transition-all duration-150 cursor-pointer
        ${
         activeCity === city
        ? "border-gray-900 font-bold text-gray-900 shadow-sm bg-white"
        : "border-gray-300 font-medium text-gray-500 bg-white hover:border-gray-400 hover:text-gray-700"
    }`}
    >
      {city}
    </button>
  ))}
</div>
  );
}
