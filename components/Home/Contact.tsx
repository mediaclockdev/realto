import Image from "next/image";
import React from "react";
import contactimg from "../../public/contactimage.svg";

const Contact = () => {
  const fields = [
    { label: "Name", placeholder: "Enter your name" },
    { label: "Phone number", placeholder: "Enter your Number" },
    { label: "Company name", placeholder: "Realto" },
    { label: "Job title", placeholder: "Retailer" },
    { label: "Work email address", placeholder: "Enter your name" },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5 bg-gray-100  flex items-center">
      <div className="flex flex-col lg:flex-row  w-full gap-10">
        {/* Left: Image */}
        <div className="w-full lg:w-1/2 shrink-0">
          <div className="relative w-full h-full min-h-[350px] lg:min-h-[500px]">
            <Image
              src={contactimg}
              alt="Contact visual"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right: Form — same height as image */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between py-2 max-w-[550px]">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-black">Get in touch</h2>
            <p className="text-sm text-gray-600 mt-1">
              Tell us about your dream space. We will make it real.
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-3">
            {fields.map((field, i) => (
              <div
                key={i}
                className="flex flex-col border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <label className="text-xs text-gray-500 mb-0.5">
                  {field.label}
                </label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="outline-none text-sm text-black placeholder-gray-800 bg-transparent font-normal"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-gray-900 text-white text-sm font-semibold py-3 rounded-md hover:bg-black transition-colors"
          >
            Submit
          </button>

          {/* Privacy note */}
          <p className="text-xs text-gray-500 mt-3 ">
            By clicking submit, you agree to send your info to Realto who agrees
            to use it according to their privacy policy.{" "}
            <a href="#" className="text-blue-500 underline">
              View Privacy Policy.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
