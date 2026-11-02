import Image from "next/image";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import arrow from "@/public/downarrowhotel.svg";

// glass pill from the hotel checkout "7 Nights" badge, gold text + gold arrow
export default function FilterPill({ arrow: withArrow, icon, badge, children, className = "", ...p }: { arrow?: boolean; icon?: ReactNode; badge?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...p} className={`relative flex h-10 min-w-0 cursor-pointer items-center gap-1 whitespace-nowrap px-2.5 text-xs min-[1400px]:h-12 min-[1400px]:gap-2 min-[1400px]:px-4 min-[1400px]:text-base font-bold ${className}`}>
      <Image src="/confirmbooking/imgNightsPill.png" alt="" fill sizes="200px" className="object-fill" />
      {icon && <span className="relative text-[#D4A514]">{icon}</span>}
      <span className="relative bg-gradient-to-r from-[#BA9000] via-[#F7D257] to-[#BA9000] bg-clip-text text-transparent">{children}</span>
      {badge && <span className="relative">{badge}</span>}
      {withArrow && <Image src={arrow} alt="" className="relative h-auto w-3 min-[1400px]:w-4" />}
    </button>
  );
}
