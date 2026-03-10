

import Image from "next/image";
import Searchbar from "./Searchbar";
import { StaticImageData } from "next/image";

type HeroSectionProps = {
  image: StaticImageData | string;
};

const HeroSection = ({ image }: HeroSectionProps) => {
  return (
    <div className="relative w-full h-dvh md:h-[85vh] min-h-[500px] max-h-[900px]">
      <Image
        src={image}
        alt="hero background"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient overlay  */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/10 to-black/70 pointer-events-none" />

      <Searchbar />
    </div>
  );
};

export default HeroSection;