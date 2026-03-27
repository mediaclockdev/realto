"use client";

import React, { useState } from "react";
import Image from "next/image";
import bedroom from "../../public/bedroom.jpg";
import bath from "../../public/bath.png";
import car from "../../public/car.jpg";
import increment from "../../public/increment.svg";
import decrement from "../../public/decrement.svg";

const propertyTypes = [
  "All types",
  "Townhouse",
  "Unit",
  "House",
  "Villa",
  "Granny flat",
];

const moreFeatures = [
  "Balcony",
  "Pool",
  "Dishwasher",
  "Ensuite",
  "Wardrobes",
  "Dryer",
  "Garage",
  "Internet",
  "Heater",
  "Shed",
  "Air conditioner",
];

const MAX_PRICE = 1000000;

interface PropertyFilterModalProps {
  open: boolean;
  onClose: () => void;
}

const PropertyFilterModal: React.FC<PropertyFilterModalProps> = ({
  open,
  onClose,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [carSpaces, setCarSpaces] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minSize, setMinSize] = useState("800");
  const [maxSize, setMaxSize] = useState("5000");
  const [sizeUnit, setSizeUnit] = useState("Meters");

  if (!open) return null;

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setSelected((curr) =>
      curr.includes(value) ? curr.filter((i) => i !== value) : [...curr, value],
    );
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedFeatures([]);
    setBedrooms(0);
    setBathrooms(0);
    setCarSpaces(0);
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
    setMinSize("800");
    setMaxSize("5000");
    setSizeUnit("Meters");
  };

  const formatPrice = (val: number) =>
    val >= MAX_PRICE ? "Any" : `$${val.toLocaleString()}`;

  // Clamp min never exceeds max and vice versa
  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxPrice - 10000);
    setMinPrice(val);
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minPrice + 10000);
    setMaxPrice(val);
  };

  // Track fill % for the slider gradient
  const minPercent = (minPrice / MAX_PRICE) * 100;
  const maxPercent = (maxPrice / MAX_PRICE) * 100;

  const counterCardClass =
    "rounded-[5px] border border-[#4a4a4a] px-1 py-1 text-xs text-[#343434] min-w-[28px] text-center select-none";

  const renderCounter = (
    label: string,
    imageSrc: typeof bedroom,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
  ) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-[#343434] lg:text-center">
        {label}
      </h3>
      <div className="flex flex-col lg:flex-row lg:items-center gap-0.5">
        <div className="w-32 h-20 relative shrink-0 flex flex-row">
          <Image src={imageSrc} alt={label} fill className="w-full h-full" />
        </div>
        <div className="flex flex-row lg:flex-col items-center gap-2">
          {/* Increment */}
          <button
            type="button"
            onClick={() => setValue((c) => c + 1)}
            className="w-6 h-6 rounded-[5px] border border-[#4a4a4a] text-[#444] text-sm flex items-center justify-center hover:bg-gray-200 transition-colors leading-none"
          >
            <Image src={increment} alt="increment icon" />
          </button>

          <div className={counterCardClass}>{value}</div>
          {/* Decrement */}
          <button
            type="button"
            onClick={() => setValue((c) => Math.max(0, c - 1))}
            className="w-6 h-6 rounded-[5px] border border-[#4a4a4a] text-[#444] text-sm flex items-center justify-center hover:bg-gray-200 transition-colors leading-none"
          >
            <Image src={decrement} alt="decrement icon" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-4 py-8 ">
      <div className="w-full max-w-150 max-h-[90vh] flex flex-col overflow-hidden rounded-[10px] bg-[#efefef] shadow-2xl border border-black/5">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-black/10 drop-shadow-[0_4px_4px_#00000020] bg-white shrink-0">
          <h2 className="text-base font-semibold text-[#343434]">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#444] hover:text-black transition-colors"
            aria-label="Close filters"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-2 space-y-0">
          {/* Property Type */}
          <section className="border-b border-black/15 pb-2">
            <h2 className="text-sm font-bold text-[#343434] mb-2">
              Property type
            </h2>
            <div className="grid grid-cols-3 gap-y-2">
              {propertyTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-0.5 lg:gap-2 text-sm text-[#343434] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() =>
                      toggleSelection(type, selectedTypes, setSelectedTypes)
                    }
                    className="h-3 w-3 accent-[#4a86d4]"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Counters */}
          <section className="border-b border-black/15 py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 content-center   gap-5">
              {renderCounter("Bedrooms", bedroom, bedrooms, setBedrooms)}
              {renderCounter("Bathrooms", bath, bathrooms, setBathrooms)}
              {renderCounter("Car space", car, carSpaces, setCarSpaces)}
            </div>
          </section>

          {/* Price Range — dual range slider */}
          <section className="border-b border-black/15 py-4">
            <h2 className="text-sm font-bold text-[#343434] mb-4">Price</h2>

            <div className="relative h-5 mx-1">
              {/* Track background */}
              <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 rounded-full bg-gray-300" />
              {/* Active track fill */}
              <div
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#5e95d8]"
                style={{
                  left: `${minPercent}%`,
                  right: `${100 - maxPercent}%`,
                }}
              />
              {/* Min thumb */}
              <input
                type="range"
                min={0}
                max={MAX_PRICE}
                step={10000}
                value={minPrice}
                onChange={handleMinPrice}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                style={{ pointerEvents: "auto" }}
              />
              {/* Max thumb */}
              <input
                type="range"
                min={0}
                max={MAX_PRICE}
                step={10000}
                value={maxPrice}
                onChange={handleMaxPrice}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                style={{ pointerEvents: "auto" }}
              />
              {/* Visual thumbs */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full border-2 border-[#4a86d4] bg-white shadow z-10 pointer-events-none"
                style={{ left: `${minPercent}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full border-2 border-[#4a86d4] bg-white shadow z-10 pointer-events-none"
                style={{ left: `${maxPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#9a9a9a] mt-1 mb-3 font-semibold">
              <span>$0</span>
              <span>$1,000,000+</span>
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-18 rounded-[5px] border border-[#4a4a4a] bg-transparent px-2 py-1 text-center text-xs text-[#444]">
                  {formatPrice(minPrice)}
                </div>
                <p className="mt-1 text-[10px] text-[#444]">Min</p>
              </div>
              <span className="text-[12px] text-[#555]">—</span>
              <div className="text-center">
                <div className="w-18 rounded-[5px] border border-[#4a4a4a] bg-transparent px-2 py-1 text-center text-xs text-[#444]">
                  {formatPrice(maxPrice)}
                </div>
                <p className="mt-1 text-[10px] text-[#444]">Max</p>
              </div>
            </div>
          </section>

          {/* Property Size */}
          <section className="border-b border-black/15 py-4">
            <h2 className="text-sm font-bold text-[#343434] mb-3">
              Property size
            </h2>
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-center">
                <input
                  value={minSize}
                  onChange={(e) => setMinSize(e.target.value)}
                  className="w-16 rounded-[5px] border border-[#4a4a4a] bg-transparent px-2 py-1 text-center text-xs text-[#343434] outline-none"
                />
                <p className="mt-1 text-[10px] text-[#343434]">Min</p>
              </div>
              <div className="text-center">
                <input
                  value={maxSize}
                  onChange={(e) => setMaxSize(e.target.value)}
                  className="w-16 rounded-[5px] border border-[#4a4a4a] bg-transparent px-2 py-1 text-center text-xs text-[#343434] outline-none"
                />
                <p className="mt-1 text-[10px] text-[#343434]">Max</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#343434]">
                {["Meters", "Acres", "Hectares"].map((unit) => (
                  <label
                    key={unit}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="size-unit"
                      checked={sizeUnit === unit}
                      onChange={() => setSizeUnit(unit)}
                      className="h-3 w-3 accent-[#4a86d4]"
                    />
                    <span>{unit}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* More Features */}
          <section className="py-4">
            <h2 className="text-sm font-bold text-[#343434] mb-3">
              More features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
              {moreFeatures.map((feature) => (
                <label
                  key={feature}
                  className="flex items-center gap-2 text-sm text-[#343434] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() =>
                      toggleSelection(
                        feature,
                        selectedFeatures,
                        setSelectedFeatures,
                      )
                    }
                    className="h-3 w-3 accent-[#4a86d4]"
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-black/10 bg-white px-4 py-3 drop-shadow-[0_-2px_4px_#00000015] shrink-0">
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-[10px] border border-gray-300 px-4 py-2 text-sm font-semibold text-[#444] transition-colors hover:bg-gray-100 cursor-pointer"
          >
            Clear filters
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] bg-[#343434] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black cursor-pointer"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilterModal;
