"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { StaticImageData } from "next/image";
import email from "../../public/formemailicon.svg";
import email2 from "../../public/formmailicon2.svg";

import phone from "../../public/formphoneicon.svg";
import phone2 from "../../public/formphoneicon2.svg";
import phone3 from "../../public/formphoneicon3.svg";
import dl from "../../public/formnameicon.svg";
import submitbtn from "../../public/submitbtnicon.svg";

import img1 from "../../public/contactimage.svg";
import img2 from "../../public/contact1.jpeg";
import img3 from "../../public/contact2.jpeg";
import img4 from "../../public/contact3.jpeg";
import img5 from "../../public/contact4.jpeg";

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
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-10 bg-gray-100 shadow-4xl shadow-black flex items-stretch">
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
              className={`object-cover transition-opacity duration-700 ease-in-out${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between  bg-black/20 shadow-[0_10_0_5px_rgba(191,219,254,0.9),0_25px_45px_rgba(59,130,246,0.25)] rounded-2xl p-4">
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              Get in touch
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Tell us about your dream space. We will make it real.
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div className=" border border-[#BFDBFE] shadow-[0_0_0_2px_rgba(191,219,254,0.9),0_10px_25px_rgba(59,130,246,0.25)] rounded-l-[10px]  pl-5 h-13 transition-all flex items-stretch justify-between ">
              <div className="flex flex-col justify-center h-full">
                <label className="text-xs text-gray-500">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-sm text-black font-medium mt-1"
                />
              </div>
              <div className="h-full overflow-hidden">
                <Image
                  src={dl}
                  alt="name icon"
                  className="h-full w-auto object-cover"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white border  border-[#BFDBFE] shadow-[0_0_0_2px_rgba(191,219,254,0.9),0_10px_25px_rgba(59,130,246,0.25)] rounded-l-[10px]  pl-5 h-13 transition-all flex items-stretch justify-between">
              <div className="flex flex-col justify-center h-full">
                <label className="text-xs text-gray-500">Phone Number</label>
                <input
                  type="tel"
                  className="w-full bg-transparent outline-none text-sm text-gray-800 mt-1"
                />
              </div>
              <div className="h-full overflow-hidden flex">
                <Image
                  src={phone}
                  alt="phone icon"
                  className="h-full w-auto object-cover"
                />
                <Image
                  src={phone2}
                  alt="phone icon"
                  className="h-full w-auto object-cover"
                />
                <Image
                  src={phone3}
                  alt="phone icon"
                  className="h-full w-auto object-cover"
                />
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border  border-[#BFDBFE] shadow-[0_0_0_2px_rgba(191,219,254,0.9),0_10px_25px_rgba(59,130,246,0.25)] rounded-l-[10px]  pl-5 h-13  transition-all flex items-stretch justify-between">
              <div className="flex flex-col justify-center h-full">
                <label className="text-xs text-gray-500">
                  Email Address
                  <input
                    type="email"
                    className="w-full bg-transparent outline-none text-sm text-gray-800 mt-1"
                  />
                </label>
              </div>

              <div className="h-full overflow-hidden flex">
                <Image
                  src={email}
                  alt="email icon"
                  className="w-full h-full object-cover "
                />
                <Image
                  src={email2}
                  alt="email icon"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>

            {/* Message */}
            <div className="bg-white border  border-[#BFDBFE] shadow-[0_0_0_2px_rgba(191,219,254,0.9),0_10px_25px_rgba(59,130,246,0.25)] rounded-l-[10px]  px-5 py-2 focus-within:border-blue-400 transition-all">
              <label className="text-xs text-gray-500">Message</label>

              <textarea
                rows={4}
                className="w-full bg-transparent outline-none text-sm text-gray-800 mt-1 resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="mt-5 w-full font-Aptos bg-[#0284C7] hover:bg-[#0277C9] text-white text-xl font-semibold rounded-2xl transition-colors cursor-pointer py-3 flex items-center justify-center relative overflow-visible"
          >
            Submit/Send
            <Image
              src={submitbtn}
              alt="submit btn icon"
              width={60}
              height={60}
              className="h-16 w-auto object-contain absolute right-9 lg:right-20 bottom-[-4]"
            />
          </button>

          {/* Privacy note */}
          <p className="text-xs text-[#909090] mt-4 leading-relaxed">
            By clicking submit, you agree to send your info to Realto who agrees
            to use it according to their privacy policy.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              View Privacy Policy.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
