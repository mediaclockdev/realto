"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { StaticImageData } from "next/image";
import headingbg from "@/public/contactheadingbg.svg";
import sendbg from "@/public/contactsendbg.svg";
import mail from "@/public/contactmailicon.svg";
import email from "@/public/contactemailicon.svg";
import phone from "@/public/contactphoneicon.svg";
import dl from "@/public/agentpanelicons/profiledl.svg";
import edit from "@/public/agentpanelicons/dashboardeditprofileicon.svg";
import sendicon from "@/public/contactsendbtn.svg";
import img1 from "@/public/contactimage.svg";
import img2 from "@//public/contact1.jpeg";
import img3 from "@//public/contact2.jpeg";
import img4 from "@/public/contactimg3.svg";
import img5 from "@/public/contact4.jpeg";

const IMAGES = [img1, img2, img3, img4, img5];

type ContactProps = {
  images?: (StaticImageData | string)[];
  interval?: number;
};

const Contact = ({ images = IMAGES, interval = 4000 }: ContactProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-5 bg-gray-100 shadow-4xl shadow-black flex items-stretch">
      <div className="flex flex-col lg:flex-row w-full items-stretch gap-4 lg:gap-6 ">
        {/* Left: Image Carousel */}

        <div className="w-full lg:w-2/3 shrink-0 relative min-h-55 sm:min-h-75 rounded-2xl overflow-hidden">
          {/* Slides */}
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Contact visual ${i + 1}`}
              fill
              priority={i === 0}
              quality={80}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/3 flex flex-col bg-white rounded-3xl shadow-[-8px_8px_16px_#999FB4,6px_-6px_12px_#F0F0F0] p-4 sm:p-5">
          {/* Header pill */}
          <div className="relative w-full">
            <Image
              src={headingbg}
              alt="Heading Background"
              className="w-full h-auto"
            />

            <div className="absolute left-1 top-1/2 -translate-y-1/2">
              <Image src={mail} alt="mail" className="" />
            </div>

            <div className="absolute inset-0 -right-2 flex items-center justify-center pl-10">
              <h2 className="text-white font-amasis font-black text-[28px] leading-none [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000]">
                Message{" "}
                <span className="font-['Times_New_Roman',serif] font-normal italic">
                  of
                </span>{" "}
                Inquiry
              </h2>
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="relative bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 py-2 flex flex-col justify-center min-h-[68px]">
              <label className="flex items-center gap-2 text-sm text-gray-500">
                {/* icon: green check */}
                Full Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent outline-none text-xl text-black mt-1 pr-24"
              />
              <Image
                src={dl}
                alt="name"
                className="absolute right-2 top-1/2 -translate-y-1/2 size-24"
              />{" "}
            </div>

            {/* Email */}
            <div className="relative bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 py-2 flex flex-col justify-center min-h-[68px]">
              <label className="flex items-center gap-2 text-sm text-gray-500">
                {/* icon: green check */}
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-transparent outline-none text-xl text-black mt-1 pr-24"
              />
              <Image
                src={email}
                alt="email"
                className=" absolute right-2 top-1/2 -translate-y-1/2 size-18"
              />
            </div>

            {/* Phone */}
            <div className="relative bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 py-2 flex flex-col justify-center min-h-[68px]">
              <label className="flex items-center gap-2 text-sm text-gray-500">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full bg-transparent outline-none text-xl text-black mt-1 pr-24"
              />
              <Image
                src={phone}
                alt="phone number"
                className="absolute right-1 top-1/2 -translate-y-1/2 size-20"
              />
            </div>

            {/* Message */}
            <div className="bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 ">
              <label className="flex items-center gap-1 text-sm text-gray-500">
                {/* icon: green check */}
                Message
                <Image src={edit} alt="message" className="size-10" />
              </label>
              <textarea
                rows={5}
                placeholder="Please type your message…"
                className="w-full bg-transparent outline-none text-xl italic text-gray-500 mt-1 resize-none placeholder:italic placeholder:text-gray-500 placeholder:font-TimesNewRoman"
              />
            </div>
          </div>

          {/* Send Button */}
          <button
            type="button"
            className="relative mt-3  self-end w-2/3 sm:w-1/2 cursor-pointer hover:brightness-105"
          >
            <Image src={sendbg} alt="Send" className="w-full h-full" />

            {/* Text */}
            <span className="absolute inset-0 left-0 flex items-center justify-center pr-10 font-sans font-bold text-2xl text-white [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000000]">
              Send
            </span>

            {/* Plane Icon */}
            <Image
              src={sendicon}
              alt=""
              className="absolute right-6 top-0 size-12 z-10 pointer-events-none"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
