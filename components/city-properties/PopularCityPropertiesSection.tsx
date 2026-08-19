"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/types/types";
import CityTabs from "./CityTabs";
import PropertyGrid from "./PropertyGrid";
import Image from "next/image";
import backgroundimg from "@/public/homepageheadingbackground1.svg";

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

  const properties = activeCity ? (citiesData[activeCity] ?? []) : [];

  return (
    <div className="bg-gray-50">
      <section className="max-w-screen-2xl mx-auto px-5 py-5">
        {pillHeading ? (
          <div className="flex justify-center mb-4">
            <div className="relative inline-flex items-center justify-center">
              <Image
                src={backgroundimg}
                alt="heading background"
                className="absolute inset-0 w-full h-full"
              />

              <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading px-8 py-4">
                {title}
              </h2>
            </div>
          </div>
        ) : (
          <h2 className="text-[32px] font-extrabold text-gray-900 mb-5">
            {title}
          </h2>
        )}

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
