"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import indianflag from "../../public/India.svg";
import koreanflag from "../../public/koreanflag.svg";
import franceflag from "../../public/Franceflag.svg";
import chinaflag from "../../public/chinaflag.svg";
import israelflag from "../../public/israelflag.svg";
import world from "../../public/languageworld.svg";
import greek from "../../public/greek.svg";
import pakistan from "../../public/pakistan.svg";
import serbia from "../../public/serbia.svg";
import Iran from "../../public/iranflag.svg";
import spanish from "../../public/spain.svg";
import fijian from "../../public/fijian.svg";
import indonesia from "../../public/indonesianflag.svg";
import italy from "../../public/italy.svg";
import japan from "../../public/japan.svg";
import russia from "../../public/russianflag.svg";
import vietnam from "../../public/vietnam.svg";
import lebanese from "../../public/lebanese.svg";
import netherlands from "../../public/netherlands.svg";
import turkish from "../../public/turkish.svg";
import australia from "../../public/austrilaflag.svg";
import thailand from "../../public/thailandflag.svg";
import germany from "../../public/germanyflag.svg";
import philippines from "../../public/Philippineflag.svg";
import backgroundimg from "@/public/homepageheadingbackground.svg";
// import bangladesh from "../../public/bangladesh.svg";
// import malasyia from "../../public/malasyianflag.svg";
// import samoan from "../../public/samoan.svg";
// import armenia from "../../public/armenia.svg";
// import burmese from "../../public/burmese.svg";
// import cambodia from "../../public/cambodia.svg";
// import croatian from "../../public/croatian.svg";
// import denmark from "../../public/denmark.svg";
// import finnish from "../../public/finnish.svg";
// import georgian from "../../public/georgian.svg";
// import hongkong from "../../public/hongkong.svg";
// import kurdistan from "../../public/kurdistan.svg";
// import macedonian from "../../public/macedonian.svg";
// import nepal from "../../public/nepal.svg";
// import polish from "../../public/polish.svg";
// import portuguese from "../../public/portuguese.svg";
// import romanian from "../../public/romanian.svg";
// import somali from "../../public/somali.svg";
// import tagalog from "../../public/tagalog.svg";
// import tongon from "../../public/tongan.svg";
// import ukrainian from "../../public/ukrainian.svg";

const LanguageSelection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  // const [tooltipInfo, setTooltipInfo] = useState<{
  //   name: string;
  //   nativeName: string;
  //   rect: DOMRect;
  // } | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const flags = [
    {
      name: "Australian",
      country: "Australia",
      nativeName: "English",
      icon: australia,
      code: "au",
    },
    {
      name: "Chinese",
      country: "China",
      nativeName: "中文",
      icon: chinaflag,
      code: "ch",
    },
    {
      name: "French",
      country: "Frances",
      nativeName: "Français",
      icon: franceflag,
      code: "fr",
    },
    {
      name: "Hindi",
      country: "India",
      nativeName: "हिन्दी",
      icon: indianflag,
      code: "hi",
    },
    {
      name: "Lebanese",
      country: "Lebanon",
      nativeName: "لبناني",
      icon: lebanese,
      code: "lb",
    },
    {
      name: "Vietnamese",
      country: "Vietnam",
      nativeName: "Tiếng Việt",
      icon: vietnam,
      code: "vi",
    },
    {
      name: "Spanish",
      country: "Spain",
      nativeName: "Español",
      icon: spanish,
      code: "es",
    },
    {
      name: "Urdu",
      country: "Pakistan",
      nativeName: "اردو",
      icon: pakistan,
      code: "ur",
    },
    {
      name: "Serbia",
      country: "Serbia",
      nativeName: "Српски",
      icon: serbia,
      code: "sr",
    },
    {
      name: "Indonesian",
      country: "Indonesia",
      nativeName: "Bahasa Indonesia",
      icon: indonesia,
      code: "id",
    },
    { name: "Turkish", nativeName: "Türkçe", icon: turkish, code: "tr" },
    {
      name: "Korean",
      country: "Korea",
      nativeName: "한국어",
      icon: koreanflag,
      code: "ko",
    },
    {
      name: "Persian(Farsi)",
      country: "Iran",
      nativeName: "فارسی",
      icon: Iran,
      code: "fa",
    },
    {
      name: "Greek",
      country: "Greek",
      nativeName: "Ελληνικά",
      icon: greek,
      code: "gr",
    },

    {
      name: "Thailand",
      country: "Thailand",
      nativeName: "Prathet Thai",
      icon: thailand,
      code: "th",
    },
    {
      name: "German",
      country: "Germany",
      nativeName: "Deutsch",
      icon: germany,
      code: "de",
    },
    {
      name: "Philippines",
      country: "Philippines",
      nativeName: "Filipino",
      icon: philippines,
      code: "ph",
    },
    {
      name: "Fijian",
      country: "Fiji",
      nativeName: "Vosa Viti",
      icon: fijian,
      code: "fj",
    },
    {
      name: "Italian",
      country: "Italy",
      nativeName: "Italiano",
      icon: italy,
      code: "it",
    },
    {
      name: "Japanese",
      country: "Japan",
      nativeName: "日本語",
      icon: japan,
      code: "ja",
    },
    {
      name: "Netherlands",
      counter: "Nederlands",
      nativeName: "Nederlands",
      icon: netherlands,
      code: "nl",
    },
    {
      name: "Russia",
      counter: "Russia",
      nativeName: "Русский",
      icon: russia,
      code: "ru",
    },
    {
      name: "Israeli",
      country: "Israel",
      nativeName: "עברית",
      icon: israelflag,
      code: "is",
    },

    // {
    //   name: "Bengali",
    //   country: "Bangladesh",
    //   nativeName: "বাংলা",
    //   icon: bangladesh,
    //   code: "bn",
    // },

    // {
    //   name: "Malaysian",
    //   country: "Malaysia",
    //   nativeName: "Bahasa Malaysia",
    //   icon: malasyia,
    //   code: "ms",
    // },
    // {
    //   name: "Samoan",
    //   country: "Somoan",
    //   nativeName: "Samoan",
    //   icon: samoan,
    //   code: "sm",
    // },

    // {
    //   name: "Armenian",
    //   country: "Armenia",
    //   nativeName: "Հայերեն",
    //   icon: armenia,
    //   code: "hy",
    // },
    // {
    //   name: "Burmese",
    //   country: "Burmese",
    //   nativeName: "မြန်မာဘာသာ",
    //   icon: burmese,
    //   code: "my",
    // },
    // {
    //   name: "Cambodian",
    //   country: "Cambodia",
    //   nativeName: "ខ្មែរ",
    //   icon: cambodia,
    //   code: "km",
    // },
    // {
    //   name: "Croatian",
    //   country: "Croatia",
    //   nativeName: "Hrvatski",
    //   icon: croatian,
    //   code: "hr",
    // },
    // {
    //   name: "Danish",
    //   country: "Denmark",
    //   nativeName: "Dansk",
    //   icon: denmark,
    //   code: "da",
    // },

    // {
    //   name: "Finnish",
    //   country: "Finland",
    //   nativeName: "Suomi",
    //   icon: finnish,
    //   code: "fi",
    // },
    // {
    //   name: "Georgian",
    //   country: "Georgia",
    //   nativeName: "ქართული",
    //   icon: georgian,
    //   code: "ka",
    // },
    // {
    //   name: "Hong Kong",
    //   country: "HongKong",
    //   nativeName: "香港",
    //   icon: hongkong,
    //   code: "hk",
    // },

    // {
    //   name: "Kurdish",
    //   country: "Kurdistan",
    //   nativeName: "Kurdî",
    //   icon: kurdistan,
    //   code: "ku",
    // },
    // {
    //   name: "Macedonian",
    //   counter: "Macedonia",
    //   nativeName: "Македонски",
    //   icon: macedonian,
    //   code: "mk",
    // },
    // {
    //   name: "Nepali",
    //   counter: "Nepal",
    //   nativeName: "नेपाली",
    //   icon: nepal,
    //   code: "ne",
    // },

    // {
    //   name: "Polish",
    //   counter: "Poland ",
    //   nativeName: "Polski",
    //   icon: polish,
    //   code: "pl",
    // },
    // {
    //   name: "Portuguese",
    //   counter: "Portuguese",
    //   nativeName: "Português",
    //   icon: portuguese,
    //   code: "pt",
    // },
    // {
    //   name: "Romanian",
    //   counter: "Romania",
    //   nativeName: "Română",
    //   icon: romanian,
    //   code: "ro",
    // },
    // {
    //   name: "Somali",
    //   counter: "Somalia",
    //   nativeName: "Soomaali",
    //   icon: somali,
    //   code: "so",
    // },
    // {
    //   name: "Tagalog",
    //   counter: "Philippines",
    //   nativeName: "Tagalog",
    //   icon: tagalog,
    //   code: "tl",
    // },
    // {
    //   name: "Tongan",
    //   counter: "Tonga",
    //   nativeName: "Tongan",
    //   icon: tongon,
    //   code: "to",
    // },

    // {
    //   name: "Ukrainian",
    //   counter: "Ukrain",
    //   nativeName: "Українська",
    //   icon: ukrainian,
    //   code: "uk",
    // },
  ];

  const languages = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    ...flags[i % flags.length],
  }));

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setScrollLeft(scrollLeft);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

  const selectedLang = languages.find((l) => l.id === selectedLanguage);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="relative inline-flex items-center justify-center">
          <Image
            src={backgroundimg}
            alt="heading background"
            className="absolute inset-0 w-full h-full"
          />

          <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading px-8 py-4">
            Language selection :
          </h2>
        </div>
        <div className="shrink-0 relative group/selected">
          <Image
            src={world}
            alt={"World"}
            width={46}
            height={46}
            className="rounded-full"
          />
          {selectedLang && (
            <div className="absolute -top-9 left-0 z-50 pointer-events-none opacity-0 group-hover/selected:opacity-100 transition-opacity duration-200">
              <div className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-lg whitespace-nowrap">
                {selectedLang.name} / {selectedLang.nativeName}
              </div>
              <div className="w-3 h-3 bg-gray-900 rotate-45 -mt-1.5 ml-3.5" />
            </div>
          )}
        </div>
      </div>

      <div className="relative group flex items-center gap-3">
        {scrollLeft > 10 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-opacity duration-300 mt-[-12] -ml-4"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex items-center gap-4 overflow-x-auto scrollbar-hide scroll-smooth pt-1 pb-1 flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;

            return (
              <div
                key={lang.id}
                className="relative shrink-0 flex flex-col items-center w-[60px]"
              >
                <div className="flex flex-col items-center justify-center">
                  <div
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`rounded-full cursor-pointer transition-all duration-200 border-[3px] ${
                      selectedLanguage === lang.id
                        ? "bg-[linear-gradient(135deg,#FFD700,#FFC107,#FFB300)] bg-origin-border bg-clip-border border-transparent"
                        : "border-transparent"
                    }`}
                    title={lang.name}
                  >
                    <Image
                      src={lang.icon}
                      alt={lang.name}
                      width={70}
                      height={70}
                      className="rounded-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col items-center mt-1 w-[60px]">
                    <p className="text-black text-xs font-medium w-full text-center leading-tight truncate">
                      {lang.country ?? lang.name}
                    </p>
                    <p className="text-gray-500 text-xs font-light font-poppins w-full text-center leading-tight truncate">
                      ({lang.nativeName})
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* {tooltipInfo && (
          <div
            className="fixed z-9999 pointer-events-none"
            style={{
              left: tooltipInfo.rect.left + tooltipInfo.rect.width / 2,
              top: tooltipInfo.rect.top - 8,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-lg whitespace-nowrap">
              {tooltipInfo.name} / {tooltipInfo.nativeName}
            </div>
            <div className="w-3 h-3 bg-gray-900 rotate-45 -mt-1.5 mx-auto" />
          </div>
        )} */}

        {!isAtEnd && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-opacity duration-300 -mr-4 mt-[-12]"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LanguageSelection;
