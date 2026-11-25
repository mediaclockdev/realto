"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthInput, { AuthButton } from "@/components/Auth/AuthInput";
import { adminForgotPassword, adminResendOtp, adminResetPassword, adminVerifyOtp } from "@/lib/api/auth";
import emailIcon from "@/public/authicons/emailicon.svg";
import passwordIconView from "@/public/authicons/eyeopen.svg";
import passwordIconClosed from "@/public/authicons/eyeclosed.svg";
import logo from "@/public/Realto Logo - 1.webp";

// email → OTP sent to it → new password
type Step = "email" | "otp" | "reset" | "done";

export default function AdminForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (step === "reset" && f.password !== f.confirm_password) return setError("Passwords don't match");
    setPending(true);
    setError("");
    setInfo("");
    const json =
      step === "email"
        ? await adminForgotPassword({ email: f.email })
        : step === "otp"
          ? await adminVerifyOtp({ email, otp: f.otp })
          : await adminResetPassword({ email, otp, password: f.password, confirm_password: f.confirm_password });
    setPending(false);
    if (!json.success) return setError(json.message ?? "Something went wrong. Please try again.");
    if (step === "email") setEmail(f.email);
    if (step === "otp") setOtp(f.otp);
    setStep(step === "email" ? "otp" : step === "otp" ? "reset" : "done");
  }

  async function resend() {
    setError("");
    const json = await adminResendOtp(email);
    if (json.success) setInfo("A new code is on its way.");
    else setError(json.message ?? "Could not resend the code.");
  }

  const title = { email: "Reset admin password", otp: "Enter the code", reset: "Choose a new password", done: "Password changed" }[step];

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
        <p className="mb-6 text-center font-serif text-lg italic text-[#1f2a28]">{title}</p>
        {step === "done" ? (
          <p className="text-center text-sm text-gray-800">Your password has been changed. You can sign in now.</p>
        ) : (
          <form key={step} onSubmit={onSubmit} className="space-y-3">
            {step === "email" && (
              <AuthInput icon={emailIcon} name="email" type="email" placeholder="Email Address" required />
            )}
            {step === "otp" && (
              <>
                <p className="text-center text-sm text-gray-600">We sent a code to {email}</p>
                <AuthInput name="otp" placeholder="Verification code" required />
              </>
            )}
            {step === "reset" && (
              <>
                <AuthInput icon={passwordIconView} iconClosed={passwordIconClosed} name="password" type="password" placeholder="New password" required />
                <AuthInput icon={passwordIconView} iconClosed={passwordIconClosed} name="confirm_password" type="password" placeholder="Confirm new password" required />
              </>
            )}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {info ? <p className="text-sm text-green-700">{info}</p> : null}
            <AuthButton
              pending={pending}
              label={{ email: "Send code", otp: "Verify", reset: "Change password" }[step]}
              pendingLabel="Please wait..."
            />
            {step === "otp" && (
              <button type="button" onClick={resend} className="mx-auto block text-sm font-bold text-[#2C7BE5]">
                Resend code
              </button>
            )}
          </form>
        )}
        <Link href="/adminpanel/login" className="mt-4 block text-center text-sm font-bold text-[#2C7BE5]">
          ← Back to sign in
        </Link>
      </section>
    </main>
  );
}
