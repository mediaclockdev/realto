"use client";

import Image from "next/image";
import Searchbar from "./Searchbar";
import { StaticImageData } from "next/image";
import { useState, useEffect } from "react";

type HeroSectionProps = {
  images: (StaticImageData | string)[];
  interval?: number; // ms, default 5000
};

const HeroSection = ({ images, interval = 5000 }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setPrev(current);
      setTransitioning(true);
      setCurrent((c) => (c + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [current, images.length, interval]);

  // Reset transitioning flag after animation completes
  useEffect(() => {
    if (!transitioning) return;
    const t = setTimeout(() => {
      setTransitioning(false);
      setPrev(null);
    }, 1000); // match CSS transition duration
    return () => clearTimeout(t);
  }, [transitioning]);

  return (
    <div className="relative w-full h-[50vh] md:h-[85vh] min-h-[400px] max-h-[900px] overflow-hidden">
      {/* Previous image (fades out) */}
      {prev !== null && transitioning && (
        <Image
          key={`prev-${prev}`}
          src={images[prev]}
          alt="hero background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-top md:object-center absolute inset-0 transition-opacity duration-1000 opacity-0"
        />
      )}

      {/* Current image (fades in) */}
      <Image
        key={`current-${current}`}
        src={images[current]}
        alt="hero background"
        fill
        priority
        quality={100}
        sizes="100vw"
        className={`object-cover object-top md:object-center absolute inset-0 transition-opacity duration-1000 ${
          transitioning ? "opacity-100" : "opacity-100"
        }`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80 pointer-events-none z-10" />

      <Searchbar />
    </div>
  );
};

export default HeroSection;