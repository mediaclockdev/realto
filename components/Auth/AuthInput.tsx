"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

export default function AuthInput({
  icon,
  iconClosed,
  type = "text",
  placeholder,
  name,
}: {
  icon?: StaticImageData;
  iconClosed?: StaticImageData;
  type?: string;
  placeholder: string;
  name?: string;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex items-center gap-2 rounded-xl border-2 border-[#C9A227] bg-white px-3 py-3 sm:py-3.5">
      <input
        name={name}
        type={isPassword && show ? "text" : type}
        placeholder={placeholder}
        className="w-full bg-transparent text-base text-[#1f2a28] outline-none placeholder:text-[#8a8a8a]"
      />
      {!icon ? null : isPassword ? (
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="shrink-0 cursor-pointer"
        >
          <Image
            src={show ? icon : (iconClosed ?? icon)}
            alt=""
            className="h-7 w-auto"
          />
        </button>
      ) : (
        <Image src={icon} alt="" className="h-7 w-auto shrink-0" />
      )}
    </div>
  );
}
