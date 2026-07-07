"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/types/types";
import CityTabs from "./CityTabs";
import PropertyGrid from "./PropertyGrid";

type PopularCityPropertiesSectionProps = {
  title: string;
  citiesData: Record<string, Property[]>;
  defaultCity?: string;
  pillHeading?: boolean;
};

export default function PopularCityPropertiesSection({
  title,
  citiesData,
  defaultCity,
  pillHeading = false,
}: PopularCityPropertiesSectionProps) {
  const cities = useMemo(() => Object.keys(citiesData), [citiesData]);
  const initialCity = defaultCity ?? cities[0] ?? "";
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const activeCity = cities.includes(selectedCity) ? selectedCity : initialCity;

  const properties = activeCity ? citiesData[activeCity] ?? [] : [];

  return (
    <div className="bg-gray-50">
      <section className="max-w-screen-2xl mx-auto px-5 py-5">
        <h2
          className={`text-[32px] font-extrabold text-gray-900 mb-5 ${pillHeading ? "w-fit rounded-full px-4 py-2" : ""}`}
          style={
            pillHeading
              ? {
                  background:
                    "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
                }
              : undefined
          }
        >
          {title}
        </h2>

        <CityTabs
          cities={cities}
          activeCity={activeCity}
          onCityChange={setSelectedCity}
        />

        <PropertyGrid properties={properties} />
      </section>
    </div>
  );
}
