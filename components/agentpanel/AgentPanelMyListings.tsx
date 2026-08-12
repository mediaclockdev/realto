"use client";

import { useState } from "react";
import Image from "next/image";
import { PlusCircle, UploadCloud, Gavel, XCircle, Search } from "lucide-react";

import AgentPanelRightRail from "./AgentPanelRightRail";
import PropertyListingCard from "@/components/PropertyListing/PropertyListingCard";
import type { ListingProperty } from "@/lib/properties/types";
import type { ListingVariant } from "@/lib/listings/types";
import {
  newlyListedBuyProperties,
  luxuryBuyProperties,
} from "@/lib/properties/buy/sections";
import { newlyListedRentProperties } from "@/lib/properties/rent/sections";
import mylistingsicon from "@/public/agentpanelicons/sidebarmylistingicon.svg";
import soldicon from "@/public/agentpanelicons/mylistingsoldicon.svg";
import totalleadsicon from "@/public/agentpanelicons/dashboardtotalleadicon.svg";
import activelistingicon from "@/public/agentpanelicons/profileactivelistingicon.svg";

const TILE =
  "bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF,inset_0_4px_4px_0_rgba(43,108,176,0.2)]";

const stats = [
  {
    label: "Total Listings",
    value: 10,
    icon: mylistingsicon,
  },
  {
    label: "Active",
    value: 6,
    icon: activelistingicon,
  },
  {
    label: "Sold",
    value: 4,
    icon: soldicon,
  },
  {
    label: "Total Leads",
    value: 112,
    icon: totalleadsicon,
  },
];

/** Three per section: newly listed buy, luxury buy, rent. */
const listings: { property: ListingProperty; variant: ListingVariant }[] = [
  ...newlyListedBuyProperties.slice(0, 3).map((property) => ({
    property: property as unknown as ListingProperty,
    variant: "buy" as ListingVariant,
  })),
  ...luxuryBuyProperties.slice(0, 3).map((property) => ({
    property: property as unknown as ListingProperty,
    variant: "buy" as ListingVariant,
  })),
  ...newlyListedRentProperties.slice(0, 3).map((property) => ({
    property,
    variant: "rent" as ListingVariant,
  })),
];

/** Bordered box with a small floating label, matching the design. */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-lg border border-yellow-400 bg-white px-3 py-2">
      <span className="text-xs text-gray-500">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full bg-transparent text-base font-medium text-gray-900 outline-none placeholder:text-gray-900";

const propertyTypes = ["Apartment", "Villa", "House", "Townhouse", "Studio"];
const categories = ["Residential", "Commercial", "Land", "Industrial"];
const amenities = ["Pool", "Gym", "Parking", "Security", "Garden", "Lift"];

function AddListingForm({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState("Buy");

  return (
    <main className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-4 py-2 font-bold text-yellow-600">
          Add New Listing
          <Image src={mylistingsicon} alt="my listing" className="size-4" />
        </span>
      </div>
      <p className="italic text-gray-600">
        Fill in the details below to list your property.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        {/* Tabs + auction toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            {["Buy", "Rent", "Commercial", "Land"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-lg border border-yellow-400 px-8 py-2 font-bold ${
                  tab === t
                    ? "bg-yellow-400 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 font-bold text-gray-900">
            <Gavel className="size-6 text-gray-700" />
            Auction Property
            <input type="checkbox" className="size-4 accent-yellow-400" />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Property Type">
            <select className={inputClass} defaultValue="">
              <option value="">Select Property Type</option>
              {propertyTypes.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Category of Property">
            <select className={inputClass} defaultValue="">
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Property Title">
            <input className={inputClass} placeholder="Enter Property Title" />
          </Field>
          <Field label="Price Range">
            <input className={inputClass} placeholder="Enter Price Range" />
          </Field>
        </div>

        <Field label="Property Description">
          <textarea
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Add Property Description Here..."
          />
        </Field>

        <p className="font-bold text-gray-500">Property Photos</p>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-blue-300 py-10">
          <UploadCloud className="size-10 text-blue-400" />
          <span className="font-bold text-blue-500">
            Drag &amp; drop images here or click to upload
          </span>
          <span className="text-xs text-gray-400">
            Upload up to 10 images (JPG, PNG - Max 5MB each)
          </span>
          <input type="file" accept="image/*" multiple className="hidden" />
        </label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="No. of Bedroom">
            <input
              type="number"
              min={0}
              className={inputClass}
              placeholder="Enter No. of Bedrooms"
            />
          </Field>
          <Field label="No. of Bathroom">
            <input
              type="number"
              min={0}
              className={inputClass}
              placeholder="Enter No. of Bathrooms"
            />
          </Field>
          <Field label="No. of Cars">
            <input
              type="number"
              min={0}
              className={inputClass}
              placeholder="Enter No. of Parking Spaces"
            />
          </Field>
          <Field label="Location">
            <input
              className={inputClass}
              placeholder="Enter Property Location"
            />
          </Field>
          <Field label="Area in Square Feet">
            <input
              type="number"
              min={0}
              className={inputClass}
              placeholder="Enter Area in Square Feet"
            />
          </Field>
          <Field label="Date of Inspection">
            <input type="date" className={inputClass} />
          </Field>
          <Field label="Time of Inspection">
            <input type="time" className={inputClass} />
          </Field>
          <Field label="Choose Amenities and facilities">
            <select multiple className={inputClass} size={1}>
              {amenities.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-full border border-gray-200 px-6 py-2 font-bold text-red-500 shadow-sm"
          >
            Cancel
            <XCircle className="size-4" />
          </button>
          <button
            type="button"
            className="rounded-full border border-gray-200 px-6 py-2 font-bold text-yellow-600 shadow-sm"
          >
            Preview
          </button>
          <button
            type="submit"
            className="rounded-full bg-blue-500 px-6 py-2 font-bold text-white shadow-sm"
          >
            Save Listings
          </button>
        </div>
      </form>
    </main>
  );
}

export default function AgentPanelMyListings() {
  const [adding, setAdding] = useState(false);

  if (adding) return <AddListingForm onClose={() => setAdding(false)} />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_300px]">
      <main className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            style={{
              background:
                "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
            }}
            className="flex items-center gap-8 rounded-2xl border border-transparent px-4 py-2 text-2xl font-bold text-[#E1AB18] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]"
          >
            My Listings
            <Image
              src={mylistingsicon}
              alt="my listing icon"
              className="size-11"
            />
          </span>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-4 py-2 font-bold text-yellow-600"
          >
            <PlusCircle className="size-4" />
            Add New Listing
          </button>
        </div>
        <p className="font-serif text-2xl italic text-[#64748B]">
          Manage and view all your listed properties.
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className={`flex items-center gap-3 rounded-xl p-4 ${TILE}`}
            >
              <Image src={Icon} alt="icons" className="size-14" />
              <div>
                <p className="text-lg font-bold text-[#2495FF]">{label}</p>
                <p className="text-2xl font-bold text-[#0F172A]">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <select className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700">
              <option>All Status</option>
              <option>Active</option>
              <option>Sold</option>
            </select>
            <select className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700">
              <option>Property Type</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Commercial</option>
            </select>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-gray-300 px-3 py-2">
            <input
              type="text"
              placeholder="Search Documents"
              className="w-40 text-sm text-gray-600 outline-none placeholder:italic"
            />
            <Search className="size-4 shrink-0 text-gray-400" />
          </span>
        </div>

        {/* Listings grid */}
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 [&>div]:w-full [&>div]:max-w-[380px]">
          {listings.map(({ property, variant }, i) => (
            <div key={i} className="space-y-2">
              <PropertyListingCard
                property={property}
                listingVariant={variant}
                disableHoverScale
              />
              <div className="grid grid-cols-4 gap-1.5">
                <button className="rounded-md bg-blue-500 py-1.5 text-xs font-semibold text-white">
                  View
                </button>
                <button className="rounded-md bg-orange-400 py-1.5 text-xs font-semibold text-white">
                  Edit
                </button>
                <button className="rounded-md bg-green-500 py-1.5 text-xs font-semibold text-white">
                  Promote
                </button>
                <button className="rounded-md bg-red-500 py-1.5 text-xs font-semibold text-white">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AgentPanelRightRail />
    </div>
  );
}
