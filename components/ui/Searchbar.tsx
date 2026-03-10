import Image from "next/image";
import voice from "../../public/iconvoice.svg";
import fliter from "../../public/iconfliter.svg";
import googlelens from "../../public/icongooglelens.svg";
import searchwhite from "../../public/iconsearchwhite.svg";
import searchbar from "../../public/searchbar.svg";

const Searchbar = () => {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-10">
      <div className="flex items-center rounded-xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg px-3 py-2.5 gap-3">

        {/* Left icon */}
        <div className="flex items-center justify-center bg-white/20 rounded-xl p-2 shrink-0">
          <Image src={searchbar} alt="location" width={38} height={38} />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search suburb, postcode, state"
          className="flex-1 bg-transparent outline-none text-white placeholder:text-white/70 text-base font-light tracking-wide"
        />

        {/* Right icons */}
        <div className="flex items-center gap-4 shrink-0">

          <button className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
            <Image src={fliter} alt="filter" width={22} height={22} />
          </button>

          <button className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
            <Image src={voice} alt="voice" width={22} height={22} />
          </button>

          <button className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
            <Image src={googlelens} alt="lens" width={22} height={22} />
          </button>

          <button className="flex items-center justify-center bg-white/80 hover:bg-white rounded-xl p-2 shadow-md transition-colors">
            <Image src={searchwhite} alt="search" width={20} height={20} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default Searchbar;