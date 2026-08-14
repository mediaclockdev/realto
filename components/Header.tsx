"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import signinbtn from "@/public/signinbtnicon.svg";
import Link from "next/link";
import realtologogif1 from "@/public/Realto Logo - 1.gif";
import realtologogif2 from "@/public/Realto Logo - 2.gif";
import realtologogif3 from "@/public/Realto Logo - 3.gif";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
// import avatar from "@/public/avatar.png";

const realtoLogos = [realtologogif1, realtologogif2, realtologogif3];

const Header = () => {
  const pathname = usePathname();
  const [logoIndex, setLogoIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [view, setView] = useState<
    "choose" | "login-user" | "login-agent" | "signup-user" | "signup-agent"
  >("choose");

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
        <button
          onClick={() => {
            setView("choose");
            dialogRef.current?.showModal();
          }}
          className="flex items-center gap-2 bg-[#399918] px-2 lg:px-3 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 shrink-0 cursor-pointer"
        >
          <Image src={signinbtn} alt="sign in btn " className="size-8" />
          <span className="text-white text-sm sm:text-base font-bold">
            Sign In
          </span>
        </button>

        <dialog
          ref={dialogRef}
          onClick={(e) =>
            e.target === dialogRef.current && dialogRef.current?.close()
          }
          className="m-auto w-[92vw] max-w-md max-h-[90dvh] overflow-y-auto rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-white text-gray-900 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
        >
          {view === "choose" ? (
            <>
              <Image
                src={realtoLogos[logoIndex]}
                alt="Realto logo"
                unoptimized
                className="w-full h-auto max-h-[30dvh] object-contain mb-5 sm:mb-8"
              />
              <button
                onClick={() => setView("login-user")}
                className="block w-full cursor-pointer rounded-xl bg-[#5B93E0] py-3 sm:py-4 text-center text-base sm:text-xl font-bold text-white"
              >
                Continue as a User
              </button>
              <div className="flex items-center gap-3 sm:gap-4 my-4 sm:my-5">
                <hr className="flex-1 border-gray-300" />
                <span className="font-bold">Or</span>
                <hr className="flex-1 border-gray-300" />
              </div>
              <button
                onClick={() => setView("login-agent")}
                className="block w-full cursor-pointer rounded-xl bg-[#2C63B5] py-3 sm:py-4 text-center text-base sm:text-xl font-bold text-white"
              >
                Continue as an Agent
              </button>
            </>
          ) : view.startsWith("login") ? (
            <Login
              isAgent={view === "login-agent"}
              onSwitch={() =>
                setView(
                  view === "login-agent" ? "signup-agent" : "signup-user",
                )
              }
            />
          ) : (
            <Signup
              isAgent={view === "signup-agent"}
              onSwitch={() =>
                setView(view === "signup-agent" ? "login-agent" : "login-user")
              }
            />
          )}
        </dialog>
      </div>
    </header>
  );
};

export default Header;
