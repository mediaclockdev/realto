"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useState } from "react";

// shared by Login/Signup submit buttons

import bluebg from "@/public/loginbg.svg";

export const authTagline =
  "The fastest growing realestate platform in Australia";

export function AuthButton({
  pending,
  label,
  pendingLabel,
  disabled,
  className = "",
}: {
  pending?: boolean;
  label: string;
  pendingLabel: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative w-48 mx-auto ${className}`}>
      <Image src={bluebg} alt="background image" className="w-full h-auto" />
      <button
        type="submit"
        disabled={disabled ?? pending}
        className="absolute inset-0 flex cursor-pointer items-center justify-center font-bold text-white disabled:cursor-not-allowed"
      >
        {pending ? pendingLabel : label}
      </button>
    </div>
  );
}

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
