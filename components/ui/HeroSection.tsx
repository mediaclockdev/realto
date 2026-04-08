"use client";

import Image from "next/image";
import Searchbar from "./Searchbar";
import { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SearchBarHotel from "./SearchbarHotel";

type HeroSectionProps = {
  image?: StaticImageData | string;
  images?: (StaticImageData | string)[];
  interval?: number;
  title?: string | React.ReactNode;
  description?: string;
  showSearch?: boolean;
};

const HeroSection = ({
  image,
  images,
  title,
  description,
  interval = 10000,
  showSearch = true,
}: HeroSectionProps) => {
  const finalImages = images ?? (image ? [image] : []);

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const pathname = usePathname();

  const isHotelPage = pathname.includes("/hotel");

  useEffect(() => {
    if (finalImages.length <= 1) return;

    const timer = setInterval(() => {
      setPrev(current);
      setTransitioning(true);
      setCurrent((c) => (c + 1) % finalImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [current, finalImages.length, interval]);

  // Reset transitioning flag after animation completes
  useEffect(() => {
    if (!transitioning) return;
    const t = setTimeout(() => {
      setTransitioning(false);
      setPrev(null);
    }, 1000);
    return () => clearTimeout(t);
  }, [transitioning]);

  return (
    <div className="relative w-full h-[50vh] md:h-[85vh] min-h-[400px] max-h-[900px] overflow-visible">
      {/* Previous image (fades out) */}
      {prev !== null && transitioning && (
        <Image
          key={`prev-${prev}`}
          src={finalImages[prev]}
          alt="hero background"
          fill
          quality={80}
          sizes="100vw"
          className="object-cover object-top md:object-center absolute inset-0 transition-opacity duration-1000 opacity-0"
        />
      )}

      {/* Current image (fades in) */}
      <Image
        key={`current-${current}`}
        src={finalImages[current]}
        alt="hero background"
        fill
        priority
        quality={85}
        sizes="100vw"
        className={`object-cover object-top md:object-center absolute inset-0 transition-opacity duration-1000 ${
          transitioning ? "opacity-100" : "opacity-100"
        }`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80 pointer-events-none z-10" />
      {/* Text content */}
      <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 bottom-20 lg:bottom-40 z-20 flex flex-col items-start lg:items-center justify-start lg:justify-center text-left lg:text-center px-4">
        <h2 className="text-white text-xl md:text-4xl font-bold">{title}</h2>
        <p className="text-white mt-2 text-sm md:text-lg">{description}</p>
      </div>
      {showSearch && (isHotelPage ? <SearchBarHotel /> : <Searchbar />)}
    </div>
  );
};

export default HeroSection;
