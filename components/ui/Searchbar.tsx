import Image from "next/image";
import voice from "../../public/iconvoice.svg";
import fliter from "../../public/iconfliter.svg";
import googlelens from "../../public/icongooglelens.svg";
import searchwhite from "../../public/iconsearchwhite.svg";
import searchbar from "../../public/searchbar.svg";

const Searchbar = () => {
  return (
    <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-5xl z-10 px-2 sm:px-0">
      <div className="flex items-center rounded-xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg px-2 sm:px-3 py-2 sm:py-2.5 gap-2 sm:gap-3">

        {/* Left icon — hidden on mobile, shown sm+ */}
        <div className="hidden sm:flex items-center justify-center bg-white/20 rounded-xl p-1.5 sm:p-2 shrink-0">
          <Image
            src={searchbar}
            alt="location"
            width={38}
            height={38}
            className="w-8 h-8 md:w-9 md:h-9 lg:w-[38px] lg:h-[38px]"
          />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search suburb, postcode, state"
          className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder:text-white/70 text-sm sm:text-base font-light tracking-wide"
        />

        {/* Right icons */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">

          {/* Filter — hidden on mobile */}
          <button className="hidden sm:flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src={fliter}
              alt="filter"
              width={22}
              height={22}
              className="w-5 h-5 md:w-[22px] md:h-[22px]"
            />
          </button>

          {/* Voice — always visible */}
          <button className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src={voice}
              alt="voice"
              width={22}
              height={22}
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]"
            />
          </button>

          {/* Google Lens — always visible */}
          <button className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src={googlelens}
              alt="lens"
              width={22}
              height={22}
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]"
            />
          </button>

          {/* Search button — always visible */}
          <button className="flex items-center justify-center bg-white/80 hover:bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-2 shadow-md transition-colors shrink-0">
            <Image
              src={searchwhite}
              alt="search"
              width={20}
              height={20}
              className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5"
            />
          </button>

        </div>
      </div>
    </div>
  );
};

export default Searchbar;