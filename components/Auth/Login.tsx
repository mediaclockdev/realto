"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import AuthInput, { authTagline, AuthButton } from "./AuthInput";
import { login } from "@/lib/api/auth";
import emailIcon from "@/public/authicons/emailicon.svg";
import passwordIconView from "@/public/authicons/eyeopen.svg";
import passwordIconClosed from "@/public/authicons/eyeclosed.svg";
import logo from "@/public/Realto Logo - 1.gif";

export default function Login({
  isAgent = false,
  onSwitch,
  onBack,
}: {
  isAgent?: boolean;
  onSwitch?: () => void;
  onBack?: () => void;
}) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      const json = await login({
        ...Object.fromEntries(new FormData(e.currentTarget)),
        role: isAgent ? "agent" : "user",
      });
      // API rejects unapproved agents with its own message
      if (!json.success)
        return setError(json.message ?? "Invalid email or password");

      const token = (json as any).token || (json.data as any)?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      const me = json.data?.agent;
      window.location.href =
        me?.role === "agent" ? "/agentpanel" : "/userpanel";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mb-2 cursor-pointer text-sm font-bold text-[#2C63B5]"
        >
          ← Back
        </button>
      ) : null}
      <Image
        src={logo}
        alt="Realto"
        priority
        unoptimized
        className="mx-auto h-auto w-full max-w-xs max-h-[20dvh] object-contain"
      />
      <p className="mb-6 text-center font-serif text-lg italic text-[#1f2a28]">
        {authTagline}
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <AuthInput
          icon={emailIcon}
          name="email"
          type="email"
          placeholder="Email Address"
          required
        />
        <AuthInput
          icon={passwordIconView}
          iconClosed={passwordIconClosed}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <AuthButton pending={pending} label="Sign in" pendingLabel="Signing in..." />
      </form>

      <p className="mt-4 text-center text-sm text-gray-800">
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
            Please Sign Up
          </Link>
        )}
      </p>

      <div className="my-5 flex items-center gap-4">
        <hr className="flex-1 border-gray-300" />
        <span className="text-base text-gray-700">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* ponytail: OAuth not wired — no provider in lib/api/auth yet */}
      <div className="space-y-3">
        <button type="button" className={socialClass}>
          <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden>
            <path
              fill="#4285F4"
              d="M45 24c0-1.6-.1-2.7-.4-4H24v7.5h12c-.2 2-1.6 5-4.5 7l6.9 5.3C42.5 36.1 45 30.6 45 24z"
            />
            <path
              fill="#34A853"
              d="M24 46c6 0 11-2 14.7-5.4l-6.9-5.4c-1.9 1.3-4.4 2.2-7.8 2.2-6 0-11-4-12.8-9.4l-7.1 5.5C7.8 41 15.3 46 24 46z"
            />
            <path
              fill="#FBBC05"
              d="M11.2 28c-.5-1.4-.7-2.9-.7-4s.3-2.6.7-4L4 14.5C2.5 17.4 2 20.6 2 24s.5 6.6 2 9.5l7.2-5.5z"
            />
            <path
              fill="#EA4335"
              d="M24 10.4c3.3 0 5.6 1.4 6.9 2.6l5.9-5.8C33 3.9 28.5 2 24 2 15.3 2 7.8 7 4 14.5l7.2 5.5C13 14.4 18 10.4 24 10.4z"
            />
          </svg>
          <span className="flex-1 text-center text-lg text-gray-700">
            Continue with Google
          </span>
        </button>
        <button type="button" className={socialClass}>
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="currentColor"
            aria-hidden
          >
            <path d="M16.4 12.8c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.6 2.2-1.6 2.7-.4 6.7 1.1 8.9.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.9.7 2-1.1 2.7-2.1c.8-1.2 1.2-2.4 1.2-2.5 0 0-2.2-.9-2.2-3.6zM14.3 5.9c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 2-.5 2.6-1.2z" />
          </svg>
          <span className="flex-1 text-center text-lg text-gray-700">
            Continue with Apple
          </span>
        </button>
      </div>
    </>
  );
}

const socialClass =
  "flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-[#C9A227] bg-white px-4 py-3";
