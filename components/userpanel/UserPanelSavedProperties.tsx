"use client";

import { useEffect, useState } from "react";
import { Heart, LayoutGrid, ChevronDown } from "lucide-react";

import BuyPropertyCard from "@/components/PropertyListing/BuyPropertyCard";
import { newlyListedBuyPropertyCards } from "@/lib/property-cards/buy";
import type { BuyPropertyCardItem } from "@/lib/property-cards/types";
import {
  getSavedProperties,
  photoUrl,
  removeSavedProperty,
  type Property,
} from "@/lib/api/properties";
import toast from "react-hot-toast";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const toBuyCard = (p: BuyPropertyCardItem) => ({
  ...p,
  dateIcon: p.dateicon,
  buyiconImages: p.iconImages,
});

const fallbackCard = newlyListedBuyPropertyCards[0];

function toSavedPropertyCard(property: Property, index: number): BuyPropertyCardItem {
  const base = newlyListedBuyPropertyCards[index % newlyListedBuyPropertyCards.length] ?? fallbackCard;
  const images = property.photos?.length ? property.photos.map(photoUrl) : base.images;

  return {
    ...base,
    id: String(property.id),
    images,
    location: property.location || base.location,
    size: property.area_sqft || base.size,
    date: property.inspection_date || base.date,
    time: property.inspection_time || base.time,
    priceRange: property.price_range || base.priceRange,
    propertyType: property.type || property.category || base.propertyType,
    agentName: property.agent?.name || base.agentName,
    agentPhone: property.agent?.phone || base.agentPhone,
    agentEmail: property.agent?.email || base.agentEmail,
    agentLocation: property.agent?.company_name || base.agentLocation,
    detailHref: `/property/${property.id}?listingVariant=buy`,
  };
}

export default function UserPanelSavedProperties() {
  const [savedProperties, setSavedProperties] = useState<BuyPropertyCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingIds, setRemovingIds] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    getSavedProperties().then((result) => {
      if (!active) return;
      if (result.success && result.data) {
        setSavedProperties(result.data.map(toSavedPropertyCard));
      } else {
        setError(result.message || "Could not load saved properties.");
      }
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  async function handleRemoveSaved(propertyId: string) {
    if (removingIds.includes(propertyId)) return;
    setRemovingIds((ids) => [...ids, propertyId]);
    const result = await removeSavedProperty(propertyId);
    setRemovingIds((ids) => ids.filter((id) => id !== propertyId));

    if (result.success) {
      setSavedProperties((properties) =>
        properties.filter((property) => property.id !== propertyId),
      );
      toast.success("Property removed from saved properties.");
    } else {
      toast.error(result.message || "Could not remove saved property.");
    }
  }

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

      {loading ? (
        <p className="py-10 text-center text-gray-600">Loading saved properties...</p>
      ) : error ? (
        <p className="py-10 text-center text-red-600" role="alert">{error}</p>
      ) : savedProperties.length === 0 ? (
        <p className="py-10 text-center text-gray-600">You have no saved properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedProperties.map((property) => (
            <BuyPropertyCard
              key={property.id}
              property={toBuyCard(property)}
              onRemoveSaved={handleRemoveSaved}
              checkSavedState
            />
          ))}
        </div>
      )}
    </main>
  );
}
