"use client";

import { useState, useEffect } from "react";
import { Property } from "../../types/types";
import CityTabs from "./CityTabs";
import PropertyGrid from "./PropertyGrid";
import house from "../../public/propertyhouse.svg";
import house2 from "../../public/house2.svg";
import house3 from "../../public/house3.svg";
import house4 from "../../public/house4.svg";

// ============================================================
//  STATIC DATA — delete this entire block once API is ready
// ============================================================
const citiesData: Record<string, Property[]> = {
  Melbourne: [
    {
      id: 1,
      name: "Carric House",
      location: "North Melbourne, Victoria, AU",
      price: 200,
      rating: 4.5,
      reviews: 1000,
      img: house4,
    },
    {
      id: 2,
      name: "Skyline Apartments",
      location: "South Yarra, Victoria, AU",
      price: 250,
      rating: 4.7,
      reviews: 850,
      img: house4,
    },
    {
      id: 3,
      name: "The Urban Loft",
      location: "Fitzroy, Victoria, AU",
      price: 180,
      rating: 4.3,
      reviews: 620,
      img: house4,
    },
    {
      id: 4,
      name: "Garden Suite",
      location: "Collingwood, Victoria, AU",
      price: 220,
      rating: 4.6,
      reviews: 430,
      img: house4,
    },
  ],
  Brisbane: [
    {
      id: 5,
      name: "River View Studio",
      location: "South Brisbane, QLD, AU",
      price: 175,
      rating: 4.4,
      reviews: 540,
      img: house2,
    },
    {
      id: 6,
      name: "Fortitude Flats",
      location: "Fortitude Valley, QLD, AU",
      price: 195,
      rating: 4.2,
      reviews: 310,
      img: house2,
    },
    {
      id: 7,
      name: "The Terrace",
      location: "New Farm, QLD, AU",
      price: 230,
      rating: 4.8,
      reviews: 780,
      img: house2,
    },
    {
      id: 8,
      name: "Palm Court",
      location: "Paddington, QLD, AU",
      price: 160,
      rating: 4.1,
      reviews: 200,
      img: house2,
    },
  ],
  Sydney: [
    {
      id: 9,
      name: "Harbour Heights",
      location: "Darling Harbour, NSW, AU",
      price: 320,
      rating: 4.9,
      reviews: 1200,
      img: house3,
    },
    {
      id: 10,
      name: "Bondi Retreat",
      location: "Bondi Beach, NSW, AU",
      price: 280,
      rating: 4.7,
      reviews: 960,
      img: house3,
    },
    {
      id: 11,
      name: "City Central",
      location: "CBD, NSW, AU",
      price: 260,
      rating: 4.5,
      reviews: 740,
      img: house3,
    },
    {
      id: 12,
      name: "Newtown Nest",
      location: "Newtown, NSW, AU",
      price: 210,
      rating: 4.3,
      reviews: 380,
      img: house3,
    },
  ],
  Adelaide: [
    {
      id: 13,
      name: "Adelaide Central",
      location: "Adelaide CBD, SA, AU",
      price: 150,
      rating: 4.2,
      reviews: 290,
      img: house,
    },
    {
      id: 14,
      name: "Glenelg Getaway",
      location: "Glenelg, SA, AU",
      price: 170,
      rating: 4.4,
      reviews: 410,
      img: house,
    },
    {
      id: 15,
      name: "Norwood Studio",
      location: "Norwood, SA, AU",
      price: 140,
      rating: 4.0,
      reviews: 180,
      img: house,
    },
    {
      id: 16,
      name: "Prospect Place",
      location: "Prospect, SA, AU",
      price: 155,
      rating: 4.3,
      reviews: 220,
      img: house,
    },
  ],
  Perth: [
    {
      id: 17,
      name: "Kings Park View",
      location: "West Perth, WA, AU",
      price: 190,
      rating: 4.5,
      reviews: 510,
      img: house,
    },
    {
      id: 18,
      name: "Fremantle Flat",
      location: "Fremantle, WA, AU",
      price: 200,
      rating: 4.6,
      reviews: 670,
      img: house2,
    },
    {
      id: 19,
      name: "Cottesloe Coast",
      location: "Cottesloe, WA, AU",
      price: 215,
      rating: 4.4,
      reviews: 340,
      img: house3,
    },
    {
      id: 20,
      name: "Subiaco Suite",
      location: "Subiaco, WA, AU",
      price: 175,
      rating: 4.2,
      reviews: 250,
      img: house4,
    },
  ],
  Canberra: [
    {
      id: 21,
      name: "Parliament View",
      location: "Barton, ACT, AU",
      price: 165,
      rating: 4.3,
      reviews: 190,
      img: house4,
    },
    {
      id: 22,
      name: "Civic Centre",
      location: "Civic, ACT, AU",
      price: 155,
      rating: 4.1,
      reviews: 140,
      img: house3,
    },
    {
      id: 23,
      name: "Kingston Kourt",
      location: "Kingston, ACT, AU",
      price: 175,
      rating: 4.4,
      reviews: 260,
      img: house2,
    },
    {
      id: 24,
      name: "Manuka Manor",
      location: "Manuka, ACT, AU",
      price: 185,
      rating: 4.5,
      reviews: 320,
      img: house,
    },
  ],
  "Gold Coast": [
    {
      id: 25,
      name: "Surfers Paradise",
      location: "Surfers Paradise, QLD, AU",
      price: 240,
      rating: 4.6,
      reviews: 890,
      img: house2,
    },
    {
      id: 26,
      name: "Broadbeach Bay",
      location: "Broadbeach, QLD, AU",
      price: 220,
      rating: 4.5,
      reviews: 720,
      img: house3,
    },
    {
      id: 27,
      name: "Burleigh Bungalow",
      location: "Burleigh Heads, QLD, AU",
      price: 195,
      rating: 4.4,
      reviews: 480,
      img: house,
    },
    {
      id: 28,
      name: "Coolangatta Cove",
      location: "Coolangatta, QLD, AU",
      price: 180,
      rating: 4.2,
      reviews: 310,
      img: house4,
    },
  ],
  "Coffs Harbour": [
    {
      id: 29,
      name: "Harbour Hideaway",
      location: "Coffs Harbour, NSW, AU",
      price: 145,
      rating: 4.1,
      reviews: 150,
      img: house4,
    },
    {
      id: 30,
      name: "Jetty Cottage",
      location: "Jetty Beach, NSW, AU",
      price: 135,
      rating: 4.0,
      reviews: 110,
      img: house3,
    },
    {
      id: 31,
      name: "Park Lane Studio",
      location: "Park Beach, NSW, AU",
      price: 155,
      rating: 4.3,
      reviews: 200,
      img: house2,
    },
    {
      id: 32,
      name: "Sawtell Sands",
      location: "Sawtell, NSW, AU",
      price: 125,
      rating: 3.9,
      reviews: 90,
      img: house,
    },
  ],
};
// ============================================================

export default function PopularCities() {
  const [activeCity, setActiveCity] = useState<string>("Melbourne");
  const [properties, setProperties] = useState<Property[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // ============================================================
  //  STEP 1 — Load the city list
  // ============================================================

  // -- STATIC: derive city names from the local data object --
  useEffect(() => {
    setCities(Object.keys(citiesData));
  }, []);

  // -- API: uncomment below & delete the static useEffect above --
  // useEffect(() => {
  //   const fetchCities = async (): Promise<void> => {
  //     try {
  //       const res = await fetch("/api/cities");       // GET /api/cities
  //       const data: { cities: string[] } = await res.json();
  //       // Expected response: { cities: ["Melbourne", "Brisbane", ...] }
  //       setCities(data.cities);
  //       setActiveCity(data.cities[0]);
  //     } catch (err) {
  //       console.error("Failed to fetch cities:", err);
  //     }
  //   };
  //   fetchCities();
  // }, []);
  // ============================================================

  // ============================================================
  //  STEP 2 — Load properties whenever activeCity changes
  // ============================================================

  // -- STATIC: read from the local data object --
  useEffect(() => {
    setProperties(citiesData[activeCity] ?? []);
  }, [activeCity]);

  // -- API: uncomment below & delete the static useEffect above --
  // useEffect(() => {
  //   if (!activeCity) return;
  //
  //   const fetchProperties = async (): Promise<void> => {
  //     try {
  //       const res = await fetch(`/api/properties?city=${encodeURIComponent(activeCity)}`);
  //       // GET /api/properties?city=Melbourne
  //       const data: { properties: Property[] } = await res.json();
  //       // Expected response: { properties: [ { id, name, location, price, rating, reviews, img }, ... ] }
  //       setProperties(data.properties);
  //     } catch (err) {
  //       console.error("Failed to fetch properties:", err);
  //     }
  //   };
  //
  //   fetchProperties();
  // }, [activeCity]);
  // ============================================================

  return (
    <div className=" bg-gray-50">
      <section className="max-w-screen-2xl mx-auto px-10 py-6 ">
        <h2 className="text-[32px] font-extrabold text-gray-900 mb-5">
          Popular cities in Australia
        </h2>

        {/* City tabs — passes cities list, active city, and change handler */}
        <CityTabs
          cities={cities}
          activeCity={activeCity}
          onCityChange={setActiveCity}
        />

        {/* Property grid — only receives the filtered list, knows nothing about cities */}
        <PropertyGrid properties={properties} />
      </section>
    </div>
  );
}
