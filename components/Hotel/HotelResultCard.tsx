import Link from "next/link";
import type { HotelListing } from "@/lib/hotel/types";

interface HotelResultCardProps {
  listing: HotelListing;
  detailHref?: string;
}

export default function HotelResultCard({
  listing,
  detailHref,
}: HotelResultCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex gap-3 p-3">
        <div
          className="h-28 w-32 shrink-0 rounded-xl bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              typeof listing.heroImage === "string"
                ? listing.heroImage
                : listing.heroImage.src
            })`,
          }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-1 text-[#D4A017]">
                {Array.from({ length: listing.rating }, (_, index) => (
                  <span key={index} className="text-xs">
                    ★
                  </span>
                ))}
              </div>
              <h3 className="truncate text-lg font-semibold text-[#222]">
                {listing.title.toLowerCase()}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{listing.subtitle}</p>
              <p className="mt-2 text-[11px] font-medium text-[#45b26b]">
                Free Cancellation
              </p>
              <p className="text-[11px] text-gray-500">{listing.totalLabel}</p>
            </div>
            <div className="text-right">
              <p className="rounded bg-[#f2f7ff] px-2 py-0.5 text-[10px] font-semibold text-[#5b8def]">
                {listing.badge}
              </p>
              <p className="mt-4 text-3xl font-semibold leading-none text-[#222]">
                {listing.priceLabel}
              </p>
              <p className="text-[10px] text-gray-500">/night</p>
            </div>
          </div>
          {detailHref ? (
            <div className="mt-3 flex justify-end">
              <Link
                href={detailHref}
                className="rounded-full bg-[#5b8def] px-3 py-1 text-[11px] font-medium text-white"
              >
                View Detail
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
