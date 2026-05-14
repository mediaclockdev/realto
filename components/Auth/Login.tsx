"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import buildingImage from "@/public/CompanyBuildinglogin.svg";
import emailIcon from "@/public/emailloginicon.svg";
import logo from "@/public/logo.svg";
import phoneIcon from "@/public/phoneloginicon.svg";
import passwordIcon from "@/public/passwordloginicon.svg";

type LoginStep = "select" | "email" | "emailOtp" | "phone" | "phoneOtp";

type AuthButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit";
  onClick?: () => void;
};

type AuthInputProps = {
  icon?: StaticImageData;
  type?: string;
  placeholder: string;
};

function AuthButton({
  children,
  variant = "primary",
  type = "button",
  onClick,
}: AuthButtonProps) {
  const variants = {
    primary: "bg-[#3d91df] text-white hover:bg-[#2f83d1]",
    secondary: "bg-white text-[#1f2a28] hover:bg-white/90",
    outline:
      "border border-[#3d91df] bg-transparent text-[#3d91df] hover:bg-[#3d91df]/10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-9 w-full rounded-md px-4 text-sm font-semibold transition ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

function AuthCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/20 bg-white/15 p-5 shadow-xl backdrop-blur-sm ${className}`}
    >
      <h1 className="mb-4 text-2xl font-medium ">{title}</h1>
      {children}
    </section>
  );
}

function AuthInput({ icon, type = "text", placeholder }: AuthInputProps) {
  return (
    <div className="flex h-14 items-center gap-2 rounded-lg bg-white px-2 text-[#1f2a28]">
      {icon ? <Image src={icon} alt="" className="h-5 w-5" /> : null}
      <input
        type={type}
        placeholder={placeholder}
        className="h-full w-full bg-transparent text-base outline-none placeholder:text-[#9a9a9a]"
      />
    </div>
  );
}

function AuthDivider() {
  return (
    <div className="my-4 flex items-center gap-3 text-[10px] uppercase text-white/40">
      <span className="h-px flex-1 bg-white/25" />
      or
      <span className="h-px flex-1 bg-white/25" />
    </div>
  );
}

function OtpInputs() {
  return (
    <div className="grid grid-cols-6 gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="h-9 rounded-md bg-white text-center text-sm font-semibold text-[#1f2a28] outline-none"
        />
      ))}
    </div>
  );
}

export default function Login() {
  const [step, setStep] = useState<LoginStep>("select");

  return (
    <main className="h-screen overflow-hidden bg-[#40514E] px-4 py-4 text-white sm:px-8">
      
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-screen-2xl items-center justify-center px-6 py-10 sm:px-10 lg:px-20">
        <div className=" w-full max-w-screen-2xl flex justify-center items-center gap-10">
          <div className="hidden justify-center lg:block lg:justify-start">
            <Image
              src={buildingImage}
              alt="Realto building illustration"
              priority
              className="w-full max-w-[540px]"
            />
          </div>

          <div className="mx-auto w-full max-w-[560px] ">
            <div className="mb-3 flex flex-col items-center gap-3">
              <Image src={logo} alt="Realto" priority className="h-auto w-52" />
              <p className="text-center text-base font-medium">
                Don&apos;t Have An Account?{" "}
                <Link href="/signup" className="underline underline-offset-2">
                  Sign Up
                </Link>
              </p>
            </div>

            {step === "select" ? (
              <AuthCard title="Login">
                <div className="space-y-3">
                  <AuthButton onClick={() => setStep("email")}>
                    Continue as User
                  </AuthButton>
                  <AuthDivider />
                  <AuthButton onClick={() => setStep("email")}>
                    Continue as Agent
                  </AuthButton>
                </div>
              </AuthCard>
            ) : null}

            {step === "email" ? (
              <AuthCard title="Login">
                <form className="space-y-2">
                  <AuthInput
                    icon={emailIcon}
                    type="email"
                    placeholder="Email address"
                  />
                  <AuthInput icon={passwordIcon} type="password" placeholder="Password" />
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <label className="flex items-center gap-1">
                      <input type="checkbox" className="h-3 w-3" />
                      Remember me
                    </label>
                    <button type="button" className="text-[#69aef4]">
                      Forgot Password?
                    </button>
                  </div>
                  <AuthButton onClick={() => setStep("emailOtp")}>
                    Sign In
                  </AuthButton>
                </form>
                <AuthDivider />
                <AuthButton variant="secondary" onClick={() => setStep("phone")}>
                  Continue with Phone number
                </AuthButton>
              </AuthCard>
            ) : null}

            {step === "emailOtp" ? (
              <AuthCard title="Enter OTP">
                <p className="mb-4 text-[11px] text-white/70">
                  6-digit OTP is sent to your email.
                </p>
                <OtpInputs />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <AuthButton>Verify</AuthButton>
                  <AuthButton variant="outline">Resend</AuthButton>
                </div>
                <AuthDivider />
                <AuthButton variant="secondary" onClick={() => setStep("phone")}>
                  Continue with Phone number
                </AuthButton>
              </AuthCard>
            ) : null}

            {step === "phone" ? (
              <AuthCard title="Login" className="mx-auto max-w-[280px]">
                <div className="space-y-3">
                  <AuthInput
                    icon={phoneIcon}
                    type="tel"
                    placeholder="Phone Number"
                  />
                  <AuthButton onClick={() => setStep("phoneOtp")}>
                    Continue
                  </AuthButton>
                  <AuthDivider />
                  <AuthButton variant="secondary" onClick={() => setStep("email")}>
                    Continue with Email
                  </AuthButton>
                </div>
              </AuthCard>
            ) : null}

            {step === "phoneOtp" ? (
              <AuthCard title="Enter OTP" className="mx-auto max-w-[300px]">
                <p className="mb-4 text-[11px] text-white/70">
                  6-digit OTP is sent to your phone number.
                </p>
                <OtpInputs />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <AuthButton>Verify</AuthButton>
                  <AuthButton variant="outline">Resend</AuthButton>
                </div>
                <AuthDivider />
                <AuthButton variant="secondary" onClick={() => setStep("email")}>
                  Continue with Email
                </AuthButton>
              </AuthCard>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
