"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { PlusCircle, UploadCloud, Gavel, XCircle, Search } from "lucide-react";

import AgentPanelRightRail from "./AgentPanelRightRail";
import PropertyListingCard from "@/components/PropertyListing/PropertyListingCard";
import {
  createProperty,
  updateProperty,
  deleteProperty,
  listProperties,
  getPropertyStats,
  photoUrl,
  type Property,
  type PropertyStats,
} from "@/lib/api/properties";
import type { ListingProperty } from "@/lib/properties/types";
import type { ListingVariant } from "@/lib/listings/types";
import { newlyListedBuyProperties } from "@/lib/properties/buy/sections";
import mylistingsicon from "@/public/agentpanelicons/sidebarmylistingicon.svg";
import soldicon from "@/public/agentpanelicons/mylistingsoldicon.svg";
import totalleadsicon from "@/public/agentpanelicons/dashboardtotalleadicon.svg";
import activelistingicon from "@/public/agentpanelicons/profileactivelistingicon.svg";

const TILE =
  "bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF,inset_0_4px_4px_0_rgba(43,108,176,0.2)]";

const buildStats = (s: PropertyStats | null) => [
  {
    label: "Total Listings",
    value: s?.total_properties ?? 0,
    icon: mylistingsicon,
  },
  {
    label: "For Sale",
    value: s?.for_sale ?? 0,
    icon: activelistingicon,
  },
  {
    label: "For Rent",
    value: s?.for_rent ?? 0,
    icon: soldicon,
  },
  {
    label: "For Investment",
    value: s?.for_investment ?? 0,
    icon: totalleadsicon,
  },
];

/** Card template: real data comes from the API, decorative assets from a sample card. */
const cardTemplate = newlyListedBuyProperties[0];

const toListing = (p: Property): ListingProperty =>
  ({
    ...cardTemplate,
    buyiconImages: cardTemplate.iconImages,
    id: String(p.id),
    images: p.photos?.length ? p.photos.map(photoUrl) : cardTemplate.images,
    location: p.location ?? "",
    size: p.area_sqft ?? "",
    date: p.inspection_date ?? "",
    time: p.inspection_time ?? "",
    priceRange: p.price_range ?? "",
    propertyType: p.type ?? "",
    iconLabels: [p.bedrooms, p.bathrooms, p.car_spaces].map((n) =>
      String(n ?? 0),
    ),
    agentName: p.agent?.name ?? "",
    agentLocation: p.location ?? "",
    agentPhone: `${p.agent?.country_code ?? ""}${p.agent?.phone ?? ""}`,
    agentEmail: p.agent?.email ?? "",
    agentCompanyName: p.agent?.company_name ?? "",
  }) as unknown as ListingProperty;

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
// ponytail: ids hardcoded; fetch /api/amenities once the endpoint exists.
const amenities = [
  { id: 1, label: "Pool" },
  { id: 2, label: "Gym" },
  { id: 3, label: "Parking" },
  { id: 4, label: "Security" },
  { id: 5, label: "Garden" },
  { id: 6, label: "Lift" },
];

/** One form for both create and edit — `property` present means edit. */
function AddListingForm({
  property,
  onClose,
}: {
  property?: Property;
  onClose: () => void;
}) {
  const [tab, setTab] = useState(property?.purpose ?? "Buy");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const body = new FormData(el);

    body.set("purpose", tab);
    body.set("is_auction", String(el.is_auction.checked));
    // multi-select posts repeated keys; API wants a JSON id array
    body.delete("amenity_ids");
    body.set(
      "amenity_ids",
      JSON.stringify(
        Array.from(el.amenity_ids.selectedOptions, (o: HTMLOptionElement) =>
          Number(o.value),
        ),
      ),
    );

    // an edit with no new files picked must not blank out existing photos
    if (property && !(body.get("photos") as File)?.size) body.delete("photos");

    setSaving(true);
    setError("");
    const res = property
      ? await updateProperty(property.id, body)
      : await createProperty(body);
    setSaving(false);
    if (res.success) onClose();
    else setError(res.message || "Could not save listing.");
  }

  return (
    <main className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-4 py-2 font-bold text-yellow-600">
          {property ? "Edit Listing" : "Add New Listing"}
          <Image src={mylistingsicon} alt="my listing" className="size-4" />
        </span>
      </div>
      <p className="italic text-gray-600">
        Fill in the details below to list your property.
      </p>

      <form
        onSubmit={handleSubmit}
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
            <input
              type="checkbox"
              name="is_auction"
              defaultChecked={property?.is_auction}
              className="size-4 accent-yellow-400"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Property Type">
            <select
              name="type"
              className={inputClass}
              defaultValue={property?.type ?? ""}
            >
              <option value="">Select Property Type</option>
              {propertyTypes.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Category of Property">
            <select
              name="category"
              className={inputClass}
              defaultValue={property?.category ?? ""}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Property Title">
            <input
              name="title"
              defaultValue={property?.title}
              className={inputClass}
              placeholder="Enter Property Title"
            />
          </Field>
          <Field label="Price Range">
            <input
              name="price_range"
              defaultValue={property?.price_range}
              className={inputClass}
              placeholder="Enter Price Range"
            />
          </Field>
        </div>

        <Field label="Property Description">
          <textarea
            name="description"
            defaultValue={property?.description}
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
          <input
            type="file"
            name="photos"
            accept="image/*"
            multiple
            className="hidden"
          />
        </label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="No. of Bedroom">
            <input
              type="number"
              min={0}
              className={inputClass}
              name="bedrooms"
              defaultValue={property?.bedrooms}
              placeholder="Enter No. of Bedrooms"
            />
          </Field>
          <Field label="No. of Bathroom">
            <input
              type="number"
              min={0}
              className={inputClass}
              name="bathrooms"
              defaultValue={property?.bathrooms}
              placeholder="Enter No. of Bathrooms"
            />
          </Field>
          <Field label="No. of Cars">
            <input
              type="number"
              min={0}
              className={inputClass}
              name="car_spaces"
              defaultValue={property?.car_spaces}
              placeholder="Enter No. of Parking Spaces"
            />
          </Field>
          <Field label="Location">
            <input
              name="location"
              defaultValue={property?.location}
              className={inputClass}
              placeholder="Enter Property Location"
            />
          </Field>
          <Field label="Area in Square Feet">
            <input
              type="number"
              min={0}
              className={inputClass}
              name="area_sqft"
              defaultValue={property?.area_sqft}
              placeholder="Enter Area in Square Feet"
            />
          </Field>
          <Field label="Date of Inspection">
            <input
              type="date"
              name="inspection_date"
              defaultValue={property?.inspection_date}
              className={inputClass}
            />
          </Field>
          <Field label="Time of Inspection">
            <input
              type="time"
              name="inspection_time"
              defaultValue={property?.inspection_time}
              className={inputClass}
            />
          </Field>
          <Field label="Choose Amenities and facilities">
            <select
              multiple
              name="amenity_ids"
              defaultValue={property?.amenities?.map((a) => String(a.id))}
              className={inputClass}
              size={1}
            >
              {amenities.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {error && <p className="text-sm font-bold text-red-500">{error}</p>}

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
            disabled={saving}
            className="rounded-full bg-blue-500 px-6 py-2 font-bold text-white shadow-sm disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : property
                ? "Update Listing"
                : "Save Listings"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default function AgentPanelMyListings() {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);
  const [items, setItems] = useState<Property[]>([]);
  const [statsData, setStatsData] = useState<PropertyStats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [list, stats] = await Promise.all([
      listProperties(),
      getPropertyStats(),
    ]);
    if (list.success && Array.isArray(list.data)) setItems(list.data);
    if (stats.success && stats.data) setStatsData(stats.data);
    setLoading(false);
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    // Dashboard "Add New Listing" links here with ?add=1
    if (new URLSearchParams(window.location.search).has("add")) setAdding(true);
  }, []);

  if (adding || editing)
    return (
      <AddListingForm
        property={editing ?? undefined}
        onClose={() => {
          setAdding(false);
          setEditing(null);
          load();
        }}
      />
    );

  async function handleDelete(id: number | string) {
    if (!window.confirm("Delete this listing?")) return;
    const res = await deleteProperty(id);
    if (!res.success)
      return toast.error(res.message || "Failed to delete listing.");
    toast.success("Listing deleted.");
    setItems((prev) => prev.filter((p) => p.id !== id));
    load();
  }

  const stats = buildStats(statsData);

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

        {loading && <p className="text-gray-500">Loading listings...</p>}
        {!loading && items.length === 0 && (
          <p className="text-gray-500">No listings yet.</p>
        )}

        {/* Listings grid */}
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 [&>div]:w-full [&>div]:max-w-[380px]">
          {items.map((p) => (
            <div key={p.id} className="space-y-2">
              <PropertyListingCard
                property={toListing(p)}
                listingVariant={
                  (p.purpose?.toLowerCase() as ListingVariant) ?? "buy"
                }
                disableHoverScale
              />
              <div className="grid grid-cols-4 gap-1.5">
                <button className="rounded-md bg-blue-500 py-1.5 text-xs font-semibold text-white">
                  View
                </button>
                <button
                  onClick={() => setEditing(p)}
                  className="rounded-md bg-orange-400 py-1.5 text-xs font-semibold text-white"
                >
                  Edit
                </button>
                <button className="rounded-md bg-green-500 py-1.5 text-xs font-semibold text-white">
                  Promote
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="rounded-md bg-red-500 py-1.5 text-xs font-semibold text-white"
                >
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
