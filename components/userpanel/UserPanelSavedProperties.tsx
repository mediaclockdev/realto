"use client";

import { Heart, LayoutGrid, ChevronDown } from "lucide-react";

import BuyPropertyCard from "@/components/PropertyListing/BuyPropertyCard";
import { newlyListedBuyPropertyCards } from "@/lib/property-cards/buy";
import type { BuyPropertyCardItem } from "@/lib/property-cards/types";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const toBuyCard = (p: BuyPropertyCardItem) => ({
  ...p,
  dateIcon: p.dateicon,
  buyiconImages: p.iconImages,
});

const savedProperties = Array.from({ length: 8 }, (_, i) => ({
  ...newlyListedBuyPropertyCards[i % newlyListedBuyPropertyCards.length],
  id: `saved-${i}`,
}));

export default function UserPanelSavedProperties() {
  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-2 py-2 text-xl font-semibold text-[#E1AB18]">
            Saved Properties
            <Heart className="size-7 fill-red-500 text-red-500" />
          </span>
          <p className="mt-2 italic text-gray-600">
            Your favorite properties saved for later.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`flex size-10 items-center justify-center rounded-full bg-white text-red-500 ${SOFT_SHADOW}`}
            aria-label="Saved properties"
          >
            <Heart className="size-5" />
          </button>
          <button
            className={`flex size-10 items-center justify-center rounded-full bg-white text-gray-600 ${SOFT_SHADOW}`}
            aria-label="Toggle layout"
          >
            <LayoutGrid className="size-5" />
          </button>
          <button
            className={`flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          >
            Recently Added <ChevronDown className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {savedProperties.map((property) => (
          <BuyPropertyCard key={property.id} property={toBuyCard(property)} />
        ))}
      </div>
    </main>
  );
}
