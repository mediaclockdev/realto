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
import img1 from "@/public/contactimage.webp";
import img2 from "@/public/contactimg1.webp";
import img3 from "@/public/contactimg2.webp";
import img4 from "@/public/contactimg3.webp";
import img5 from "@/public/contactimg4.webp";
import img6 from "@/public/contactimg5.webp";

const IMAGES = [img1, img2, img3, img4, img5, img6];

type ContactProps = {
  images?: (StaticImageData | string)[];
  interval?: number;
};

const Contact = ({ images = IMAGES, interval = 4000 }: ContactProps) => {
  const [current, setCurrent] = useState(0);
  const [seen, setSeen] = useState(0); // slides up to this index have been shown

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
      setSeen((s) => Math.min(s + 1, images.length - 1));
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-5 bg-gray-100 shadow-4xl shadow-black flex items-stretch">
      <div className="flex flex-col lg:flex-row w-full items-stretch gap-4 lg:gap-6 ">
        {/* Left: Image Carousel */}

        <div className="w-full lg:w-2/3 shrink-0 relative min-h-55 sm:min-h-75 rounded-2xl overflow-hidden">
          {/* Slides */}
          {images.map((img, i) => i > seen ? null : (
            <Image
              key={i}
              src={img}
              alt={`Contact visual ${i + 1}`}
              fill
              loading="lazy"
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

            <div className="absolute left-2 top-5 -translate-y-1/2 ">
              <Image src={mail} alt="mail" className="" />
            </div>

            <div className="absolute top-6 right-7 ">
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
              <label htmlFor="contact-name" className="flex items-center gap-2 text-sm text-gray-500">
                {/* icon: green check */}
                Full Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="w-full bg-transparent outline-none text-xl text-black mt-1 pr-24"
              />
              <Image
                src={dl}
                alt=""
                className="absolute right-2 top-1/2 -translate-y-1/2 size-24"
              />{" "}
            </div>

            {/* Email */}
            <div className="relative bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 py-2 flex flex-col justify-center min-h-[68px]">
              <label htmlFor="contact-email" className="flex items-center gap-2 text-sm text-gray-500">
                {/* icon: green check */}
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="w-full bg-transparent outline-none text-xl text-black mt-1 pr-24"
              />
              <Image
                src={email}
                alt=""
                className=" absolute right-2 top-1/2 -translate-y-1/2 size-18"
              />
            </div>

            {/* Phone */}
            <div className="relative bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 py-2 flex flex-col justify-center min-h-[68px]">
              <label htmlFor="contact-phone" className="flex items-center gap-2 text-sm text-gray-500">
                Phone Number
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                className="w-full bg-transparent outline-none text-xl text-black mt-1 pr-24"
              />
              <Image
                src={phone}
                alt=""
                className="absolute right-1 top-1/2 -translate-y-1/2 size-20"
              />
            </div>

            {/* Message */}
            <div className="bg-white border-2 border-transparent rounded-2xl [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box] px-4 ">
              <label htmlFor="contact-message" className="flex items-center gap-1 text-sm text-gray-500">
                {/* icon: green check */}
                Message
                <Image src={edit} alt="" className="size-10" />
              </label>
              <textarea
                id="contact-message"
                name="message"
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
