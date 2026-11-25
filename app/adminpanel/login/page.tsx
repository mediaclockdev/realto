"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthInput, { AuthButton } from "@/components/Auth/AuthInput";
import { isAdmin } from "@/components/adminpanel/AdminGuard";
import { adminLogin } from "@/lib/api/auth";
import emailIcon from "@/public/authicons/emailicon.svg";
import passwordIconView from "@/public/authicons/eyeopen.svg";
import passwordIconClosed from "@/public/authicons/eyeclosed.svg";
import logo from "@/public/Realto Logo - 1.webp";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      const json = await adminLogin(Object.fromEntries(new FormData(e.currentTarget)));
      const token = (json as any).token || json.data?.token;
      if (!json.success || !token)
        return setError(json.message ?? "Invalid email or password");

      localStorage.setItem("token", token);
      // Don't let a non-admin token through to the panel
      if (!isAdmin()) {
        localStorage.removeItem("token");
        return setError("This account doesn't have admin access.");
      }
      window.location.href = "/adminpanel/dashboard";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#1E1E1E] p-2">
      <section className="w-full max-w-lg rounded-2xl bg-white p-6 sm:rounded-3xl">
        <Image
          src={logo}
          alt="Realto"
          priority
          unoptimized
          className="mx-auto h-auto w-full max-w-xs max-h-[20dvh] object-contain"
        />
        <p className="mb-6 text-center font-serif text-lg italic text-[#1f2a28]">
          Admin Panel
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <AuthInput icon={emailIcon} name="email" type="email" placeholder="Email Address" required />
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
        <Link href="/adminpanel/forgot-password" className="mt-4 block text-center text-sm font-bold text-[#2C7BE5]">
          Forgot password?
        </Link>
      </section>
    </main>
  );
}
