"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import AuthInput, { authButtonClass, authTagline } from "./AuthInput";
import VerifyOtp from "./VerifyOtp";
import { signup } from "@/lib/api/auth";
import emailIcon from "@/public/authicons/emailicon.svg";
import nameIcon from "@/public/authicons/dl.svg";
import phoneIcon from "@/public/authicons/phone.svg";
import mobileIcon from "@/public/authicons/authmobileicon.svg";
import agencyIcon from "@/public/authicons/agentAgencyNameIcon.svg";
import agenttitleIcon from "@/public/authicons/agentTitleicon.svg";

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
  const [verifying, setVerifying] = useState<{
    email: string;
    phone: string;
  } | null>(null);

  // runs once the account is confirmed (after OTP)
  function finish(json: Awaited<ReturnType<typeof signup>>) {
    const token = (json as any).token || (json.data as any)?.token;
    if (token) {
      localStorage.setItem("token", token);
    }

    // trust the API's flag, not the role
    const me = json.data?.agent;
    if (me?.is_approved)
      window.location.href = me.role === "agent" ? "/agentpanel" : "/userpanel";
    else setDone(json.message ?? "Your request is pending approval.");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.currentTarget));
    if (body.password !== body.confirm_password)
      return setError("Passwords do not match");

    setPending(true);
    setError("");
    try {
      const json = await signup({ ...body, role: isAgent ? "agent" : "user" });
      if (!json.success) return setError(json.message ?? "Signup failed");

      setVerifying({ email: String(body.email), phone: String(body.phone) });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (verifying)
    return (
      <VerifyOtp
        email={verifying.email}
        phone={verifying.phone}
        onVerified={finish}
      />
    );

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
        className="mx-auto h-auto w-full max-w-xs  object-contain"
      />
      <p className="text-center font-serif text-lg italic text-[#1f2a28]">
        {authTagline}
      </p>
      {isAgent ? (
        <h1 className="reel-text-portal my-2 text-center font-amasis text-2xl font-black">
          Agent Registry Portal
        </h1>
      ) : null}

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
        {/* ponytail: AU-only for now; restore a select if other regions sign up */}
        <input type="hidden" name="country_code" value="+61" />
        <AuthInput
          icon={phoneIcon}
          name="phone"
          type="tel"
          placeholder="Phone Number"
          required
        />
        {isAgent ? (
          <>
            <AuthInput
              icon={agencyIcon}
              name="company_name"
              placeholder="Agency Name"
              required
            />
            <AuthInput
              icon={agenttitleIcon}
              name="title"
              placeholder="Your Title"
              required
            />
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
        <Image
          src={mobileIcon}
          alt=""
          className="mx-auto h-24 w-auto object-contain"
        />
        <button type="submit" disabled={pending} className={authButtonClass}>
          {pending ? "Signing up..." : "Sign up"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-800">
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
