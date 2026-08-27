"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import AuthInput from "./AuthInput";
import { login } from "@/lib/api/auth";
import emailIcon from "@/public/authicons/emailicon.svg";
import passwordIconView from "@/public/authicons/eyeopen.svg";
import passwordIconClosed from "@/public/authicons/eyeclosed.svg";
import logo from "@/public/Realto Logo - 1.gif";

export default function Login({
  isAgent = false,
  onSwitch,
}: {
  isAgent?: boolean;
  onSwitch?: () => void;
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
      window.location.href = me?.role === "agent" ? "/agentpanel" : "/userpanel";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Image
        src={logo}
        alt="Realto"
        priority
        unoptimized
        className="mx-auto mb-6 h-auto w-full max-w-xs max-h-[20dvh] object-contain"
      />

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
        <button
          type="submit"
          disabled={pending}
          className="w-full cursor-pointer rounded-xl bg-[#2C63B5] py-3 text-lg font-bold text-white disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign in"}
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
