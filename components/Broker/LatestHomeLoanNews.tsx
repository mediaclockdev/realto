import React from "react";
import news1 from "../../public/news1.svg";
import news2 from "../../public/news2.svg";
import news3 from "../../public/news3.svg";
import Image from "next/image";

const LatestHomeLoanNews = () => {
  const news = [
    {
      img: news1,
      content:
        "Household spending pushes up economic growth on back of rate cuts",
      age: "",
    },
    {
      img: news2,
      content:
        "Household spending pushes up economic growth on back of rate cuts",
      age: "New",
      date: "03 sep, 2025",
    },
    {
      img: news3,
      content:
        "Household spending pushes up economic growth on back of rate cuts",
      age: "New",
      date: "03 sep, 2025",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-lg lg:text-2xl text-black">
          Latest Home Loan News
        </h2>
        <p className="text-xs lg:text-base underline cursor-pointer text-black">
          View All News
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Image */}
            <div className="w-full h-[210px] lg:h-[420px] relative">
              <Image src={item.img} alt="news" fill className="object-cover" />
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Badge — always reserve height */}
              <div className="h-7">
                {item.age && (
                  <span className="inline-block bg-gray-200 text-gray-700 text-xs lg:text-sm px-3 py-1 rounded-md ">
                    {item.age}
                  </span>
                )}
              </div>

              {/* Title */}
              <p className="text-sm lg:text-lg font-medium text-black leading-relaxed">
                {item.content}
              </p>

              {/* Date — always reserve height */}
              <div className="h-5">
                {item.date && (
                  <p className="text-xs lg:text-sm text-gray-500 font-medium">
                    {item.date}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestHomeLoanNews;
