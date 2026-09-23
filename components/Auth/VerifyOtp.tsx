"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { AuthButton } from "./AuthInput";
import { verifyOtp, resendOtp } from "@/lib/api/auth";
import type { ApiResult, Agent } from "@/lib/api/auth";
import emailIcon from "@/public/authicons/emailicon.svg";
import phoneIcon from "@/public/authicons/phone.svg";
import logo from "@/public/Realto Logo - 1.gif";

const LENGTH = 6;
const EXPIRY_SECONDS = 10 * 60;

// "0412345678" -> "XXXX XXX 678"
const maskPhone = (phone: string) => `XXXX XXX ${phone.slice(-3)}`;

const mmss = (total: number) =>
  `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;

export default function VerifyOtp({
  email,
  phone,
  onVerified,
  onBack,
}: {
  email: string;
  phone: string;
  onVerified: (json: ApiResult<{ agent: Agent }>) => void;
  onBack?: () => void;
}) {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [left, setLeft] = useState(EXPIRY_SECONDS);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (left <= 0) return;
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [left]);

  function write(values: string[], focus: number) {
    setDigits(values);
    boxes.current[Math.min(focus, LENGTH - 1)]?.focus();
  }

  function onChange(i: number, raw: string) {
    // handles both typing and pasting a full code into one box
    const chars = raw.replace(/\D/g, "").split("");
    if (!chars.length)
      return write(
        digits.map((d, n) => (n === i ? "" : d)),
        i,
      );

    const next = [...digits];
    chars.forEach((c, n) => {
      if (i + n < LENGTH) next[i + n] = c;
    });
    write(next, i + chars.length);
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    // handled here, not by the browser: refocusing parks the caret at 0,
    // where a default Backspace would delete nothing
    if (e.key !== "Backspace") return;
    e.preventDefault();
    const target = digits[i] ? i : i - 1;
    if (target < 0) return;
    write(
      digits.map((d, n) => (n === target ? "" : d)),
      target,
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const otp = digits.join("");
    if (otp.length < LENGTH) return setError("Enter all 6 digits");

    setPending(true);
    setError("");
    try {
      const json = await verifyOtp({ email, phone, otp });
      if (!json.success) return setError(json.message ?? "Invalid code");
      onVerified(json);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function onResend() {
    setError("");
    setDigits(Array(LENGTH).fill(""));
    setLeft(EXPIRY_SECONDS);
    const json = await resendOtp({ email, phone });
    if (!json.success) setError(json.message ?? "Could not resend the code");
    boxes.current[0]?.focus();
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
      <h1 className="text-center text-2xl font-bold text-[#1f2a28]">
        Verify Your Account
      </h1>
      <p className="mt-1 text-center text-sm text-gray-600">
        One last step to get you home
      </p>

      <Image
        src={logo}
        alt="Realto"
        unoptimized
        className="mx-auto h-auto w-full max-w-xs max-h-[20dvh] object-contain"
      />

      <form
        onSubmit={onSubmit}
        className="rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
      >
        <h2 className="text-center text-xl font-semibold text-[#1f2a28]">
          Verify Your Identity
        </h2>
        <p className="mt-2 text-center font-serif text-sm italic text-gray-600">
          We&apos;ve sent a verification code to your registered mobile number
          and email address.
        </p>

        <div className="mt-4 flex items-center justify-center gap-3 divide-x divide-gray-300">
          <div className="flex items-center gap-2 pr-3">
            <Image
              src={phoneIcon}
              alt=""
              className="h-11 w-auto object-contain"
            />
            <div className="min-w-0">
              <p className="whitespace-nowrap text-sm font-medium text-[#1f2a28]">
                Phone Number
              </p>
              <p className="truncate text-xs text-gray-600">
                {maskPhone(phone)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pl-3">
            <Image
              src={emailIcon}
              alt=""
              className="h-11 w-auto object-contain"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#1f2a28]">
                Email Address
              </p>
              <p className="truncate text-xs text-gray-600">{email}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                boxes.current[i] = el;
              }}
              value={d}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              aria-label={`Digit ${i + 1}`}
              className="h-12 w-12 rounded-lg border-2 border-[#C9A227] bg-white text-center text-lg font-semibold text-[#1f2a28] outline-none focus:ring-2 focus:ring-[#2C7BE5]"
            />
          ))}
        </div>

        {error ? (
          <p className="mt-3 text-center text-sm text-red-600">{error}</p>
        ) : null}

        <p className="mt-4 text-center text-sm text-gray-800">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={onResend}
            className="cursor-pointer font-medium text-[#2C7BE5] underline"
          >
            Resend OTP
          </button>
        </p>

        <AuthButton
          pending={pending}
          disabled={pending || left <= 0}
          label="Sign up"
          pendingLabel="Verifying..."
          className="mt-4"
        />
      </form>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border-2 border-[#C9A227] bg-white py-3">
        <Clock className="h-5 w-5 text-gray-700" aria-hidden />
        <p className="text-base text-[#1f2a28]">
          {left > 0 ? (
            <>
              Code will expire in{" "}
              <span className="text-[#2C7BE5]">{mmss(left)}</span> minutes
            </>
          ) : (
            "Code expired — please resend"
          )}
        </p>
      </div>
    </>
  );
}
