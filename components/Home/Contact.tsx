"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { StaticImageData } from "next/image";


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
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8 bg-gray-100 flex items-center">
      <div className="flex flex-col lg:flex-row w-full gap-8">

        {/* Left: Image Carousel */}
        <div className="w-full lg:w-1/2 shrink-0">
          <div className="relative w-full min-h-[220px] sm:min-h-[300px] lg:min-h-[500px] rounded-2xl overflow-hidden">

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
                className={`object-cover rounded-2xl absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between py-2">

          {/* Header */}
          <div className="mb-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">Get in touch</h2>
            <p className="text-sm text-gray-600 mt-1">
              Tell us about your dream space. We will make it real.
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">

            {/* Row 1: First Name + Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full sm:w-1/2 border border-gray-300 rounded-2xl px-4 py-3 outline-none text-sm text-gray-800 placeholder-gray-400 bg-white focus:border-blue-400 transition-colors"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full sm:w-1/2 border border-gray-300 rounded-2xl px-4 py-3 outline-none text-sm text-gray-800 placeholder-gray-400 bg-white focus:border-blue-400 transition-colors"
              />
            </div>

            {/* Row 2: Phone + Email */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2 flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white focus-within:border-blue-400 transition-colors">
                <input
                  type="tel"
                  placeholder="Enter your Number"
                  className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent min-w-0"
                />
                <svg className="w-5 h-5 text-gray-400 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="w-full sm:w-1/2 flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white focus-within:border-blue-400 transition-colors">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent min-w-0"
                />
                <svg className="w-5 h-5 text-gray-400 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Row 3: Message */}
            <textarea
              placeholder="Enter your Message here..."
              rows={5}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none text-sm text-gray-800 placeholder-gray-400 bg-white resize-none focus:border-blue-400 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="mt-5 w-full bg-[#0284C7] hover:bg-blue-600 text-white text-base font-semibold py-4 rounded-2xl transition-colors cursor-pointer"
          >
            Submit
          </button>

          {/* Privacy note */}
          <p className="text-xs text-[#909090] mt-4 leading-relaxed">
            By clicking submit, you agree to send your info to Realto who agrees to use it according to their privacy policy.{" "}
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
