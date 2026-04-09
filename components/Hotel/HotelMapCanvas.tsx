import type { HotelListing } from "@/lib/hotel/types";

interface HotelMapCanvasProps {
  listing: HotelListing;
  title: string;
}

export default function HotelMapCanvas({
  listing,
  title,
}: HotelMapCanvasProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-[260px] sm:h-[360px]">
        <iframe
          title={title}
          width="100%"
          height="100%"
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=mapnik&marker=-33.9%2C151.1"
          className="h-full w-full border-0"
        />
        <div className="absolute left-1/2 top-1/2 w-[min(92%,420px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-3 shadow-2xl">
          <div className="flex gap-3">
            <div
              className="h-24 w-28 shrink-0 rounded-xl bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  typeof listing.heroImage === "string"
                    ? listing.heroImage
                    : listing.heroImage.src
                })`,
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-1 text-[#D4A017]">
                {Array.from({ length: listing.rating }, (_, index) => (
                  <span key={index} className="text-xs">
                    ★
                  </span>
                ))}
              </div>
              <h3 className="truncate text-xl font-semibold text-[#222]">
                {listing.title.toLowerCase()}
              </h3>
              <p className="mt-1 text-[11px] text-gray-500">{listing.subtitle}</p>
              <p className="mt-2 text-[11px] font-medium text-[#45b26b]">
                Free Cancellation
              </p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="text-[11px] text-gray-500">{listing.totalLabel}</p>
                <div className="text-right">
                  <p className="text-3xl font-semibold leading-none text-[#222]">
                    {listing.priceLabel}
                  </p>
                  <p className="text-[10px] text-gray-500">/night</p>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button className="rounded-full bg-[#5b8def] px-3 py-1 text-[11px] font-medium text-white">
                  View Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
        {listing.mapLabel}
      </div>
    </div>
  );
}
