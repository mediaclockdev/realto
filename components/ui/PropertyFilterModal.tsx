"use client";

import React, { useState } from "react";
import Image from "next/image";
import bedroom from "../../public/bedroom.jpg";
import bath from "../../public/bath.png";
import car from "../../public/car.jpg";

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

interface PropertyFilterModalProps {
  open: boolean;
  onClose: () => void;
}

const counterCardClassName =
  "rounded-[5px] border border-[#4a4a4a] px-1 py-1 text-xs text-[#343434] min-w-[24px] text-center";

const PropertyFilterModal: React.FC<PropertyFilterModalProps> = ({
  open,
  onClose,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [carSpaces, setCarSpaces] = useState(0);
  const [minPrice, setMinPrice] = useState("0$");
  const [maxPrice, setMaxPrice] = useState("ANY");
  const [minSize, setMinSize] = useState("800");
  const [maxSize, setMaxSize] = useState("5000");
  const [sizeUnit, setSizeUnit] = useState("Meters");

  if (!open) {
    return null;
  }

  const toggleSelection = (
    value: string,
    selectedValues: string[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setSelectedValues((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedFeatures([]);
    setBedrooms(0);
    setBathrooms(0);
    setCarSpaces(0);
    setMinPrice("0$");
    setMaxPrice("ANY");
    setMinSize("800");
    setMaxSize("5000");
    setSizeUnit("Meters");
  };

  const renderCounter = (
    label: string,
    imageSrc: typeof bedroom,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
  ) => (
    <div className="space-y-5">
      <h3 className="text-lg font-medium text-[#343434]">{label}</h3>
      <div className="flex items-center gap-4">
        <div className="w-[50px] h-[30px] relative shrink-0">
          <Image src={imageSrc} alt={label} fill className="object-contain" />
        </div>
        <div className="flex items-center gap-1">
          <div className={counterCardClassName}>{value}</div>
          <div className="flex flex-col">
            <button
              type="button"
              className="text-xs text-[#444]"
              onClick={() => setValue((current) => current + 1)}
              aria-label={`Increase ${label}`}
            >
              ^
            </button>
            <button
              type="button"
              className="text-xs text-[#444]"
              onClick={() => setValue((current) => Math.max(0, current - 1))}
              aria-label={`Decrease ${label}`}
            >
              v
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-8 ">
      <div className="w-full max-w-[600px] min-h-[300px]  md:min-h-[500px] overflow-hidden rounded-[10px] bg-[#efefef] shadow-2xl border border-black/5 ">
        <div className="flex items-center justify-end px-8 py-4.5 border-b border-black/10  drop-shadow-[0_4px_4px_#00000040] bg-white">
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

        <div className=" px-6  py-5">
          <section className="border-b border-black/15 pb-3">
            <h2 className="text-lg font-medium text-[#343434] mb-1">
              Property type
            </h2>
            <div className="grid grid-cols-3">
              {propertyTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-4 text-sm text-[#343434]"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() =>
                      toggleSelection(type, selectedTypes, setSelectedTypes)
                    }
                    className="h-3 w-3"
                  />
                  <p>{type}</p>
                </label>
              ))}
            </div>
          </section>

          <section className="border-b border-black/15 py-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {renderCounter("Bedrooms", bedroom, bedrooms, setBedrooms)}
              {renderCounter("Bathrooms", bath, bathrooms, setBathrooms)}
              {renderCounter("Car space", car, carSpaces, setCarSpaces)}
            </div>
          </section>

          <section className="border-b border-black/15 py-3">
            <h2 className="text-lg  font-medium text-[#343434] mb-1">
              Price
            </h2>
            <div className="">
              <div className="relative h-3">
                <div className="absolute top-1/2 left-2 right-2 h-2 -translate-y-1/2 rounded-full bg-[#5e95d8]" />
                <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#4a86d4] bg-[#efefef]" />
                <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#4a86d4] bg-[#efefef]" />
              </div>
              <div className="flex items-center justify-between text-xs text-[#9a9a9a]">
                <p>0</p>
                <p>1,00,000+</p>
              </div>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <input
                    value={minPrice}
                    onChange={(event) => setMinPrice(event.target.value)}
                    className="w-[48px] rounded-[5px] border border-[#4a4a4a] bg-transparent px-2 py-1 text-center text-xs text-[#444] outline-none"
                  />
                  <p className="mt-1 text-[10px] text-[#444]">Min</p>
                </div>
                <span className="text-[12px] text-[#555]">-</span>
                <div className="text-center">
                  <input
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(event.target.value)}
                    className="w-[48px] rounded-[5px] border border-[#4a4a4a] bg-transparent px-2 py-1 text-center text-xs text-[#444] outline-none"
                  />
                  <p className="mt-1 text-[10px] text-[#444]">Max</p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-black/15 py-3">
            <h2 className="text-lg  font-medium text-[#343434] mb-1">
              Property size
            </h2>
            <div className="flex flex-wrap items-center gap-8">
              <div className="text-center">
                <input
                  value={minSize}
                  onChange={(event) => setMinSize(event.target.value)}
                  className="w-[48px] rounded-[5px] border border-[#4a4a4a] bg-transparent px-2 py-1 text-center text-xs text-[#343434] outline-none"
                />
                <p className="mt-1 text-[10px] text-[#343434]">Min</p>
              </div>
              <div className="text-center">
                <input
                  value={maxSize}
                  onChange={(event) => setMaxSize(event.target.value)}
                  className="w-[48px] rounded-[5px] border border-[#4a4a4a] bg-transparent px-2 py-1 text-center text-xs text-[#343434] outline-none"
                />
                <p className="mt-1 text-[10px] text-[#343434]">Max</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#343434]">
                {["Meters", "Acres", "Hectares"].map((unit) => (
                  <label key={unit} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="size-unit"
                      checked={sizeUnit === unit}
                      onChange={() => setSizeUnit(unit)}
                      className="h-3 w-3"
                    />
                    <span>{unit}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="py-3">
            <h2 className="text-lg font-medium text-[#343434] mb-1">
              More features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {moreFeatures.map((feature) => (
                <label
                  key={feature}
                  className="flex items-center gap-1 text-sm text-[#343434]"
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
                    className="h-3 w-3 rounded-[5px] border-[#555]"
                  />
                  <p>{feature}</p>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="flex items-center justify-between border-t border-black/10 bg-white px-2.5 py-2.5 drop-shadow-[0_4px_4px_#00000040]">
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-[10px] border px-2 py-2 text-base font-semibold text-[#444] transition-colors hover:bg-gray-100 cursor-pointer"
          >
            Clear filters
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] bg-[#343434] px-2 py-2 text-base font-semibold text-white transition-colors hover:bg-black cursor-pointer"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilterModal;
