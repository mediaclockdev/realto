"use client";

import React from "react";
import { usePathname } from "next/navigation";
import facebook from "../public/logos_facebook.svg";
import instagram from "../public/logos_instagram.svg";
import twitter from "../public/logos_twitter.svg";
import pinterest from "../public/logos_pinterest.svg";
import linkedin from "../public/logos_linkedin.svg";
import youtube from "../public/logos_youtube-icon.svg";
import logo from "../public/footerlogo.svg";
import Image from "next/image";

const Footer = () => {
  const pathname = usePathname();
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/agentpanel") ||
    pathname.startsWith("/userpanel");

  if (isAuthRoute) {
    return null;
  }

  return (
    <div className="space-y-2 ">


      <div className="bg-white">
      <div className=" max-w-screen-2xl mx-auto px-3 lg:px-5 py-2 lg:py-5 ">
        <div className="hidden lg:flex flex-col gap-3 lg:flex-row items-center justify-between">
          <div className="flex items-center gap-7 lg:gap-5">
            <Image
              src={facebook}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
            <Image
              src={instagram}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
            <Image
              src={twitter}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
            <Image
              src={pinterest}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
            <Image
              src={linkedin}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
            <Image
              src={youtube}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
          </div>
            <div>
            <ul className="flex items-center gap-5 lg:gap-10 text-black text-xs lg:text-base">
              <li>Advertise with us</li>
              <li>Contact us</li>
              <li>Legal</li>
              <li>Privacy settings</li>
              <li>Site map</li>
            </ul>
          </div>
        </div>
        </div>
         </div>


      <div className="bg-white ">
      <div className="max-w-screen-2xl mx-auto px-5 py-5 space-y-6.5">
        <div className="space-y-4">
          <Image src={logo} alt="logo" />
        
          <div className="flex lg:hidden items-center gap-5">
            <Image
              src={facebook}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7  "
            />
            <Image
              src={instagram}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
            <Image
              src={twitter}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
            <Image
              src={pinterest}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
            <Image
              src={linkedin}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
            <Image
              src={youtube}
              alt="icon-facebook"
              className="cursor-pointer hover:scale-110 transition-all duration-500 size-7 lg:size-8 "
            />
          </div>
          </div>
          
          <div className="space-y-2.5 block
           md:hidden">
            <p className="text-black">Quick Links</p>
             <div>
            <ul className="flex flex-col  text-gray-400 text-base space-y-1">
              <li>Advertise with us</li>
              <li>Contact us</li>
              <li>Legal</li>
              <li>Privacy settings</li>
              <li>Site map</li>
            </ul>
          </div>
          </div>
        <div className="space-y-2.5">
          <div className="space-y-2.5">
            <p className="text-black">International sites</p>
            <div className="flex">
              <p className="text-[#909090]">Australia</p>
              <span className="hidden sm:inline mx-2 text-gray-400">|</span>
              <p className="text-[#909090]">India</p>
              <span className="hidden sm:inline mx-2 text-gray-400">|</span>
              <p className="text-[#909090]">International sites</p>
            </div>
          </div>
          <div className="space-y-2.5">
            <p className="text-black">Partner sites</p>
            <div className="flex">
              <p className="text-[#909090]">Australia</p>
              <span className="hidden sm:inline mx-2 ">|</span>
              <p className="text-[#909090]">India</p>
              <span className="hidden sm:inline mx-2 text-gray-400">|</span>
              <p className="text-[#909090]">International sites</p>
            </div>
          </div>
          <div>
            <p className="text-[#909090]">
               © REALTO.com.au. By accessing or using our platform, you agree to
              our Terms of use
            </p>
          </div>
        </div>
        </div>
         </div>
    </div>
  );
};

export default Footer;
