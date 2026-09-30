import { notFound } from "next/navigation";
import Image from "next/image";
import HotelDetailPage from "@/components/Hotel/HotelDetailPage";
import { getHotelListingById, getHotelListings } from "@/lib/hotel/repository";
import { HotelCard } from "@/components/Hotel/LastMinuteHotelsNearYou";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import funnel from "@/public/hotelfunnelicon.svg";

const FILTER_GROUPS: [string, string[]][] = [
  [
    "Popular Filters",
    [
      "Hotels",
      "Apartments",
      "Private Bathrooms",
      "5 Stars",
      "Very Good 8+",
      "Swimming Pool",
      "Kitchen",
      "Breakfast Included",
    ],
  ],
  [
    "Property type",
    [
      "Hotels",
      "Homes & apts",
      "Hostels",
      "Resorts",
      "Guest houses",
      "Capsule hotels",
    ],
  ],
  [
    "Facilities",
    ["Parking", "Swimming Pool", "Beachfront", "Free WiFi", "Fitness Center"],
  ],
  [
    "Brands",
    [
      "Meriton Suits",
      "Belvilla",
      "Adina",
      "Quest Apartment Hotels",
      "Mecure",
      "Pullman Hotels and Resorts",
      "Rydges",
      "Ibis Budget",
      "Urban Rest",
      "Novotel",
    ],
  ],
  ["Hotel rating", ["2 stars", "3 stars", "4 stars", "5 stars"]],
  [
    "Property Accessibility",
    [
      "Auditory guidance",
      "Visual aids (tactile signs)",
      "Visual aids (Braille)",
      "Toilet with grab rails",
      "Bathroom emergency cord",
      "Raised toilet",
      "Lowered sink",
    ],
  ],
  [
    "Room facilities",
    [
      "Private bathroom",
      "Air conditioning",
      "Balcony",
      "Private pool",
      "Kitchen/Kitchenette",
    ],
  ],
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const hotel = getHotelListingById(id);
  const allHotels = getHotelListings();

  if (!hotel) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar (Search, Filters, and List) */}
      <div className="w-0 shrink-0 z-40">
        <input id="sidebar-toggle" type="checkbox" className="peer hidden" />
        <aside className="sticky top-0 left-0 hidden h-screen w-[400px] flex-col rounded-tr-2xl border-r-[0.6px] border-black bg-white shadow-[0_4px_5px_rgba(0,0,0,0.5),3px_0_4px_rgba(0,0,0,0.5)] lg:flex lg:peer-checked:hidden">
        <label
          htmlFor="sidebar-toggle"
          aria-label="Collapse sidebar"
          className="absolute -right-10 top-9 z-20 flex h-16 w-10 cursor-pointer items-center justify-center rounded-r-lg border border-l-0 bg-white shadow"
        >
          <ChevronLeft className="h-6 w-6" />
        </label>
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 font-serif">
            <p className="text-sm text-gray-500">
              Hotels List In {hotel.location}
            </p>
            <h2 className="mt-2 pl-4 text-xl text-[#222]">
              {hotel.mapLabel ?? hotel.location}
            </h2>
          </div>

          <div className="px-5 pb-5">
            <form className="rounded-xl border border-gray-100 font-serif shadow-sm">
              <div className="flex items-center gap-3 border-b px-5 py-4">
                <Image src={funnel} alt="filtericon" />
                <span className="text-xl text-[#111827] font-TimesNewRoman">
                  Filter By
                </span>
                <button
                  type="reset"
                  aria-label="Reset filters"
                  className="ml-auto text-[#F0B429]"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4 p-4">
                <details
                  open
                  className="group rounded-lg border-2 border-[#f0e6c8] shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
                    <span className="rounded-[40px] bg-[#F1F3F2] px-6 py-1 font-TimesNewRoman text-xl text-[#0a4fa0] shadow-[-8px_8px_16px_#999FB4,6px_-6px_12px_#FFFFFF]">
                      Your Budget
                    </span>
                    <ChevronDown className="h-5 w-5 rotate-180 text-[#D9A441] group-open:rotate-0" />
                  </summary>
                  <div className="space-y-2 px-4 pb-4">
                    <p className="font-TimesNewRoman text-sm font-bold text-[#1d1d1d]">
                      AUD 20 – AUD 800+
                    </p>
                    <input
                      type="range"
                      min={20}
                      max={800}
                      defaultValue={800}
                      aria-label="Maximum budget"
                      className="mt-2 w-full accent-[#0496FF]"
                    />
                  </div>
                </details>
                {FILTER_GROUPS.map(([title, options]) => (
                  <details
                    key={title}
                    open={
                      ![
                        "Facilities",
                        "Brands",
                        "Hotel rating",
                        "Property Accessibility",
                      ].includes(title)
                    }
                    className="group rounded-lg border-2 border-[#f0e6c8] shadow-sm"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
                      <span className="rounded-[40px] bg-[#F1F3F2] px-6 py-1 font-TimesNewRoman text-xl text-[#0a4fa0] shadow-[-8px_8px_16px_#999FB4,6px_-6px_12px_#FFFFFF]">
                        {title}
                      </span>
                      <ChevronDown className="h-5 w-5 rotate-180 text-[#D9A441] group-open:rotate-0" />
                    </summary>
                    <div className="space-y-2 px-4 pb-4">
                      {options.map((opt, i) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <input
                            type="checkbox"
                            defaultChecked={i % 3 !== 1}
                            className="peer sr-only"
                          />
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-500 text-transparent peer-checked:border-green-600 peer-checked:bg-green-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-green-300">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </span>
                          {opt}
                          <span className="ml-auto text-gray-500">(67)</span>
                        </label>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </form>

            <div className="mt-6 space-y-4">
              {allHotels.map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
            </div>
          </div>
        </div>
      </aside>

      <label
        htmlFor="sidebar-toggle"
        aria-label="Expand sidebar"
        className="fixed left-0 top-40 z-20 hidden cursor-pointer rounded-r-lg bg-white p-2 shadow lg:peer-checked:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </label>
      </div>

      {/* Right Content (Hotel Details) */}
      <main className="min-w-0 flex-1">
        <HotelDetailPage hotel={hotel} />
      </main>
    </div>
  );
}
