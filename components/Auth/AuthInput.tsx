"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useState } from "react";

// shared by Login/Signup submit buttons
export const authButtonClass =
  "w-full cursor-pointer rounded-full bg-gradient-to-b from-[#6cb4fb] via-[#2C7BE5] to-[#164a94] py-3 text-lg font-bold text-white ring-2 ring-white/50 shadow-[0_0_0_4px_rgba(44,123,229,0.2),0_8px_20px_-4px_rgba(22,74,148,0.6)] transition active:translate-y-px disabled:opacity-60";

export const authTagline = "The fastest growing realestate platform in Australia";

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
  const id = useId();
  const isPassword = type === "password";
  const iconClass = "h-full w-auto object-contain";

  return (
    <div className="flex h-12 items-stretch overflow-hidden rounded-xl border-2 border-[#C9A227] bg-white">
      <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-0.5">
        <label htmlFor={id} className="text-xs leading-tight text-[#8a8a8a]">
          {placeholder}
        </label>
        <input
          id={id}
          name={name}
          required={required}
          type={isPassword && show ? "text" : type}
          className="w-full bg-transparent text-base text-[#1f2a28] outline-none"
        />
      </div>
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
