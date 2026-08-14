"use client";

import Image from "next/image";
import Link from "next/link";
import AuthInput from "./AuthInput";
import emailIcon from "@/public/authicons/emailicon.svg";
import nameIcon from "@/public/userloginicon.svg";
import phoneIcon from "@/public/phoneloginicon.svg";
import passwordIconView from "@/public/agentpanelicons/analtyicstotalviews.svg";
import passwordIconClosed from "@/public/authicons/eyeclosed.svg";
import logo from "@/public/Realto Logo - 1.gif";

export default function Signup({
  isAgent = false,
  onSwitch,
}: {
  isAgent?: boolean;
  onSwitch?: () => void;
}) {
  return (
    <>
      <Image
        src={logo}
        alt="Realto"
        priority
        unoptimized
        className="mx-auto mb-6 h-auto w-full max-w-xs max-h-[22dvh] object-contain"
      />

      <form className="space-y-4">
        <AuthInput icon={nameIcon} name="name" placeholder="Full Name" />
        <AuthInput
          icon={emailIcon}
          name="email"
          type="email"
          placeholder="Email Address"
        />
        <AuthInput
          icon={phoneIcon}
          name="phone"
          type="tel"
          placeholder="Phone Number"
        />
        {isAgent ? (
          <>
            <AuthInput name="company" placeholder="Company Name" />
            <AuthInput name="title" placeholder="Your title" />
          </>
        ) : null}
        <AuthInput
          icon={passwordIconView}
          iconClosed={passwordIconClosed}
          name="password"
          type="password"
          placeholder="Password"
        />
        <AuthInput
          icon={passwordIconView}
          iconClosed={passwordIconClosed}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl bg-[#2C63B5] py-3 text-lg font-bold text-white"
        >
          Sign up
        </button>
      </form>

      <p className="mt-5 text-center text-base text-gray-800">
        Already have an Account?{" "}
        {onSwitch ? (
          <button
            type="button"
            onClick={onSwitch}
            className="cursor-pointer font-bold text-[#2C7BE5]"
          >
            Sign In
          </button>
        ) : (
          <Link
            href={isAgent ? "/login?role=agent" : "/login?role=user"}
            className="font-bold text-[#2C7BE5]"
          >
            Sign In
          </Link>
        )}
      </p>
    </>
  );
}
