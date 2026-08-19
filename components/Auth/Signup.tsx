"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import AuthInput from "./AuthInput";
import emailIcon from "@/public/authicons/emailicon.svg";
import nameIcon from "@/public/authicons/dl.svg";
import phoneIcon from "@/public/authicons/phone.svg";
import passwordIconView from "@/public/authicons/eyeopen.svg";
import passwordIconClosed from "@/public/authicons/eyeclosed.svg";
import logo from "@/public/Realto Logo - 1.gif";

export default function Signup({
  isAgent = false,
  onSwitch,
}: {
  isAgent?: boolean;
  onSwitch?: () => void;
}) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.currentTarget));
    if (body.password !== body.confirm_password)
      return setError("Passwords do not match");

    setPending(true);
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/agents/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...body, role: isAgent ? "agent" : "user" }),
        },
      );
      const json = await res.json();
      if (!res.ok || !json.success)
        return setError(json.message ?? "Signup failed");
      // trust the API's flag, not the role
      const me = json.data.agent;
      if (me.is_approved) window.location.href = "/login";
      else setDone(json.message);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (done)
    return (
      <div className="py-10 text-center">
        <h2 className="text-xl font-bold">Request submitted</h2>
        <p className="mt-2 text-gray-600">{done}</p>
      </div>
    );

  return (
    <>
      <Image
        src={logo}
        alt="Realto"
        priority
        unoptimized
        className="mx-auto mb-6 h-auto w-full max-w-xs max-h-[22dvh] object-contain"
      />

      <form onSubmit={onSubmit} className="space-y-4">
        <AuthInput
          icon={nameIcon}
          name="name"
          placeholder="Full Name"
          required
        />
        <AuthInput
          icon={emailIcon}
          name="email"
          type="email"
          placeholder="Email Address"
          required
        />
        <div className="flex gap-2">
          <select
            name="country_code"
            defaultValue="+91"
            className="h-12 shrink-0 cursor-pointer rounded-xl border-2 border-[#C9A227] bg-white px-2 text-base text-[#1f2a28] outline-none sm:h-14"
          >
            <option value="+91">+91</option>
            <option value="+61">+61</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+971">+971</option>
          </select>
          <div className="w-full">
            <AuthInput
              icon={phoneIcon}
              name="phone"
              type="tel"
              placeholder="Phone Number"
              required
            />
          </div>
        </div>
        {isAgent ? (
          <>
            <AuthInput
              name="company_name"
              placeholder="Company Name"
              required
            />
            <AuthInput name="title" placeholder="Your title" required />
          </>
        ) : null}
        <AuthInput
          icon={passwordIconView}
          iconClosed={passwordIconClosed}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <AuthInput
          icon={passwordIconView}
          iconClosed={passwordIconClosed}
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full cursor-pointer rounded-xl bg-[#2C63B5] py-3 text-lg font-bold text-white disabled:opacity-60"
        >
          {pending ? "Signing up..." : "Sign up"}
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
