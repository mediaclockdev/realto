"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import signinbtn from "@/public/signinbtnicon.svg";
import Link from "next/link";
import realtologogif1 from "@/public/Realto Logo - 1.gif";
import realtologogif2 from "@/public/Realto Logo - 2.gif";
import realtologogif3 from "@/public/Realto Logo - 3.gif";
// import avatar from "@/public/avatar.png";

const realtoLogos = [realtologogif1, realtologogif2, realtologogif3];

const Header = () => {
  const pathname = usePathname();
  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setLogoIndex((i) => (i + 1) % realtoLogos.length),
      30000,
    );
    return () => clearInterval(interval);
  }, []);
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/agentpanel");

  if (isAuthRoute) {
    return null;
  }

  const isTransparentHeader =
    pathname === "/homepage" ||
    pathname === "/studentResidency" ||
    pathname === "/flatmate" ||
    pathname === "/agentspage" ||
    pathname === "/broker" ||
    pathname === "/agents" ||
    pathname === "/commercial" ||
    pathname === "/hotel" ||
    pathname.startsWith("/agents/");
  const isHome = pathname === "/homepage";

  return (
    <header
      className={`w-full z-50 transition-all duration-300  ${
        isTransparentHeader
          ? "absolute top-0 left-0 text-white"
          : "relative bg-white border-b border-gray-200 shadow-sm"
      }`}
    >
      <div
        className={`max-w-screen-2xl mx-auto flex items-center justify-between ${
          isTransparentHeader
            ? "px-3 lg:px-5 py-2 lg:py-4"
            : "px-4 sm:px-6 lg:px-10 py-2 sm:py-3"
        }`}
      >
        {/* Logo */}
        <div className={isHome ? "w-32  lg:w-80" : "w-24  lg:w-40"}>
          <Link href="/homepage">
            <Image
              key={logoIndex}
              src={realtoLogos[logoIndex]}
              alt="Realto logo"
              priority
              unoptimized
              className="w-full h-auto"
            />
          </Link>
        </div>
        <Link href={"/login"}>
          <div className="flex items-center gap-2 bg-[#399918]  px-2 lg:px-3 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 shrink-0">
            <Image src={signinbtn} alt="sign in btn " className="size-8" />
            <button className=" text-white text-sm sm:text-base font-bold ">
              <p>Sign In</p>
            </button>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
