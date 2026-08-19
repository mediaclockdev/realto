"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

export default function AuthInput({
  icon,
  iconClosed,
  type = "text",
  placeholder,
  name,
  required,
}: {
  icon?: StaticImageData;
  iconClosed?: StaticImageData;
  type?: string;
  placeholder: string;
  name?: string;
  required?: boolean;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const iconClass = "h-full w-auto object-contain";

  return (
    <div className="flex h-12 items-stretch overflow-hidden rounded-xl border-2 border-[#C9A227] bg-white sm:h-14">
      <input
        name={name}
        required={required}
        type={isPassword && show ? "text" : type}
        placeholder={placeholder}
        className="w-full bg-transparent px-3 text-base text-[#1f2a28] outline-none placeholder:text-[#8a8a8a]"
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
            className={iconClass}
          />
        </button>
      ) : (
        <Image src={icon} alt="" className={`${iconClass} shrink-0`} />
      )}
    </div>
  );
}
