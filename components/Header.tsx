"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.svg";
import Link from "next/link";
// import avatar from "@/public/avatar.png";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/homepage";
  const isStudentResidency = pathname === "/studentResidency";
  const isFlatmate = pathname === "/flatmate";

  return (
    <header
      className={`w-full z-50 transition-all duration-300  ${
        isHome || isStudentResidency || isFlatmate
          ? "absolute top-0 left-0 text-white"
          : "relative bg-white border-b border-gray-200 shadow-sm"
      }`}
    >
      <div
        className={`max-w-screen-2xl mx-auto flex items-center justify-between ${
          isHome || isStudentResidency || isFlatmate
            ? "px-3 lg:px-5 py-2 lg:py-4"
            : "px-4 sm:px-6 lg:px-10 py-2 sm:py-3"
        }`}
      >
        {/* Logo */}
        <div className={isHome ? "w-32  lg:w-80" : "w-24  lg:w-40"}>
          <Link href="/homepage">
            <Image
              src={logo}
              alt="Realto logo"
              priority
              className="w-full h-auto"
            />
          </Link>
        </div>

        <button className="bg-[#343434] text-white text-sm sm:text-base font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 flex-shrink-0">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
