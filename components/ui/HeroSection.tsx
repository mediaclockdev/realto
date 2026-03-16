

import Image from "next/image";
import Searchbar from "./Searchbar";
import { StaticImageData } from "next/image";

type HeroSectionProps = {
  image: StaticImageData | string;
};

const HeroSection = ({ image }: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[50vh] md:h-[85vh] min-h-[400px] max-h-[900px]">
  <Image
    src={image}
    alt="hero background"
    fill
    priority
    quality={100}
    sizes="100vw"
    className="object-cover object-top md:object-center"
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80 pointer-events-none" />

      <Searchbar />
    </div>
  );
};

export default HeroSection;