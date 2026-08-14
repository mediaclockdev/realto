"use client";

import Image from "next/image";
import Link from "next/link";
import AuthInput from "./AuthInput";
import emailIcon from "@/public/authicons/emailicon.svg";
import passwordIconView from "@/public/agentpanelicons/analtyicstotalviews.svg";
import passwordIconClosed from "@/public/authicons/eyeclosed.svg";
import logo from "@/public/Realto Logo - 1.gif";

export default function Login({
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
        className="mx-auto mb-6 h-auto w-full max-w-xs max-h-[20dvh] object-contain"
      />

      <form className="space-y-3">
        <AuthInput
          icon={emailIcon}
          name="email"
          type="email"
          placeholder="Email Address"
        />
        <AuthInput
          icon={passwordIconView}
          iconClosed={passwordIconClosed}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl bg-[#2C63B5] py-3 text-lg font-bold text-white"
        >
          Sign in
        </button>
      </form>

      <p className="mt-5 text-center text-base text-gray-800">
        Don&apos;t have an Account?{" "}
        {onSwitch ? (
          <button
            type="button"
            onClick={onSwitch}
            className="cursor-pointer font-bold text-[#2C7BE5]"
          >
            Sign Up
          </button>
        ) : (
          <Link
            href={isAgent ? "/signup?role=agent" : "/signup?role=user"}
            className="font-bold text-[#2C7BE5]"
          >
            Sign Up
          </Link>
        )}
      </p>
    </>
  );
}
