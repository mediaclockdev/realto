import Image from "next/image";
import PropertyListingCardSlider from "@/components/Home/PropertyListingCardSlider";
import { getListings } from "@/lib/listings/repository";
import Searchbar from "@/components/ui/Searchbar";
import { CircleDollarSign } from "lucide-react";

const states = [
  { code: "NSW", name: "New South Wales", flag: "nsw" },
  { code: "VIC", name: "Victoria", flag: "vic" },
  { code: "QLD", name: "Queensland", flag: "qld" },
  { code: "WA", name: "Western Australia", flag: "wa" },
  { code: "SA", name: "South Australia", flag: "sa" },
  { code: "ACT", name: "Australian Capital Territory", flag: "act" },
  { code: "TAS", name: "Tasmania", flag: "tas" },
  { code: "NT", name: "Northern Territory", flag: "nt" },
];

const tips = [
  { n: "01", title: "Contract & Cooling-Off", icon: "i1.svg", bg: "#feecee", color: "#e11d48", text: "Review the contract of sale carefully before signing. Cooling-off rights may apply to private residential purchases, but rules vary by state." },
  { n: "02", title: "Due Diligence", icon: "i2.svg", bg: "#e6f4fe", color: "#0284c7", text: "Check the property, title, planning restrictions, inspections, finance and any other conditions before committing to the purchase." },
  { n: "03", title: "Finance & Costs", bg: "#e6f8f0", color: "#059669", text: "Understand your borrowing options, deposit requirements, stamp duty, legal fees and other upfront and ongoing costs." },
  { n: "04", title: "Inspections & Property Condition", icon: "i4.svg", bg: "#fef7e6", color: "#d97706", text: "Arrange building and pest inspections to identify any issues and understand the condition of the property before you buy." },
  { n: "05", title: "Zoning & Planning Rules", icon: "i5.svg", bg: "#f2ecfe", color: "#7c3aed", text: "Check the zoning, planning overlays and any future development plans that may affect the property or your intended use." },
  { n: "06", title: "Settlement & Ownership", icon: "i6.svg", bg: "#e3faf6", color: "#0d9488", text: "Settlement is when the purchase price is completed and ownership is transferred. Your conveyancer or solicitor can guide you through the process." },
];

const shadowText = "[text-shadow:0_1px_3px_black]";

export default function StateGalleries({ variant, heading, subtitle, cta }: { variant: "rent" | "buy"; heading: string; subtitle: string; cta: string }) {
  // ponytail: listings carry no state field yet, so every state row shows the same rent listings
  const { properties } = getListings({ listingVariant: variant });
  return (
    <div className="bg-[#f6f7fa] pb-14">
      <section className="relative flex h-[500px] items-center justify-center px-6 pb-16">
        <Image src="/rent/hero.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative flex w-full max-w-[1175px] flex-col items-center gap-4 text-center text-white">
          <h1 className="font-[Montserrat,sans-serif] text-[48px] font-bold leading-[48px]">{heading}</h1>
          <p className="text-[18px] leading-7">{subtitle}</p>
        </div>
        <Searchbar />
      </section>

      <main className="flex flex-col gap-10 py-10 pl-[10px]">
        {states.map((s) => (
          <article key={s.code} className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-[50px] w-[83px]">
                <Image src={`/rent/${s.flag}.png`} alt="" fill className="object-cover" />
                <span className="absolute inset-x-0 top-[30px] text-center font-['Arial_Black',sans-serif] text-[18px] leading-7 text-white [text-shadow:1px_1px_2px_rgba(255,255,255,.7),0_0_7px_rgba(0,0,0,.25)]">{s.code}</span>
              </div>
              <div className="relative flex h-[50px] items-center justify-center overflow-hidden px-[10px]">
                <Image src="/rent/banner.png" alt="" fill className="object-cover" />
                <span className={`relative text-[20px] font-bold text-white ${shadowText}`}>{s.name} ›</span>
              </div>
            </div>
            <div className="w-full max-w-screen-2xl px-5">
              <PropertyListingCardSlider properties={properties} listingVariant={variant} scrollLabel={`${s.name} ${variant} properties`} />
            </div>
          </article>
        ))}
      </main>

      <section className="mx-auto flex max-w-[1400px] flex-col gap-12 bg-[#f8fafc] px-8 pt-2">
        <div className="flex flex-col items-center gap-[10px]">
          <div className="relative h-[103px] w-[383px]">
            <Image src="/rent/cta.png" alt="" fill />
            <span className="absolute inset-0 flex items-center justify-center font-['Arial_Black',sans-serif] text-[33px] text-white [text-shadow:1px_1px_2px_black]">{cta}</span>
          </div>
          <p className="text-center font-serif text-[30px] italic leading-7 text-[#556987]">Key things to know before {variant === "rent" ? "renting" : "buying"} a property in Australia</p>
        </div>
        <div className="grid gap-x-8 gap-y-3 md:grid-cols-3">
          {tips.map((t) => (
            <div key={t.n} className="rounded-[32px] border border-[#edf2f7] bg-white p-[37px] shadow-[-2px_2px_5px_rgba(0,0,0,0.7)]">
              <div className="flex items-start gap-5 pb-6">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl" style={{ background: t.bg }}>
                  {t.icon ? <Image src={`/rent/${t.icon}`} alt="" width={40} height={40} /> : <CircleDollarSign size={40} color={t.color} />}
                </div>
                <div className="pt-1">
                  <div className="text-[20px] font-bold leading-7 tracking-[-0.5px]" style={{ color: t.color }}>{t.n}</div>
                  <h2 className="text-[24px] font-bold leading-[30px] text-[#0f2347]">{t.title}</h2>
                </div>
              </div>
              <p className="text-[16px] leading-6 text-[#556987]">{t.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
