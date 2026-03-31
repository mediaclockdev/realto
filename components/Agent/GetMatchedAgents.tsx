"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import logo from "../../public/logo.svg";
import { ArrowRight, User } from "lucide-react";
import toast from "react-hot-toast";

// ── Types ──────────────────────────────────────────────────────────────────────

interface GetMatchedNowProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  company: string;
  jobTitle: string;
  country: string;
}

type FormField = keyof FormState;
type FormErrors = Partial<Record<FormField, string>>;

const COUNTRIES = [
  { code: "AU", label: "Australia" },
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "IN", label: "India" },
  { code: "CA", label: "Canada" },
  { code: "NZ", label: "New Zealand" },
  { code: "SG", label: "Singapore" },
  { code: "AE", label: "UAE" },
];

// ── Component ──────────────────────────────────────────────────────────────────

const GetMatchedAgents: React.FC<GetMatchedNowProps> = ({ open, onClose }) => {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    company: "",
    jobTitle: "",
    country: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const selectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.company.trim()) newErrors.company = "Company name is required";
    if (!form.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!form.country) newErrors.country = "Please select a country";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    toast.success("Message sent successfully!");
    setTimeout(() => {
      onClose();
      setForm({ name: "", phone: "", company: "", jobTitle: "", country: "" });
      setErrors({});
    }, 2000);
  };

  const textFields: {
    label: string;
    key: Exclude<FormField, "country">;
    type: string;
  }[] = [
    { label: "Name", key: "name", type: "text" },
    { label: "Phone Number", key: "phone", type: "text" },
    { label: "Company name", key: "company", type: "text" },
    { label: "Job title", key: "jobTitle", type: "text" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header band ───────────────────────────────────── */}
        {/* <div className="px-7 pt-5 pb-3 border-b border-gray-100 flex flex-col justify-center items-center">
          <h2 className="font-black text-3xl text-[#0F172A] leading-tight">
            Get Matched Now
          </h2>
          <p className="text-[#64748B] text-base mt-1">
            Fill out the form below to find your perfect match.
          </p>
        </div> */}

        {/* ── Body ──────────────────────────────────────────── */}
        <div className="px-7 pt-3 pb-4">
          {/* Logo */}
          <div className="flex justify-center mb-1">
            <Image src={logo} alt="Realto logo" width={130} />
          </div>

          {/* Section header */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center gap-2 mb-0.5">
              <User className="w-5 h-5 text-blue-500" strokeWidth={2.2} />
              <span className="font-bold text-[#0F172A] text-lg">
                Contact Information
              </span>
            </div>
            <p className="text-[#64748B] text-sm text-center">
              Contact us to get free quotes and consultancies :
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Text fields */}
            {textFields.map(({ label, key, type }) => {
              const hasValue = !!form[key];
              const hasError = !!errors[key];
              return (
                <div key={key}>
                  <div
                    className={`relative rounded-2xl border ${
                      hasError ? "border-red-400" : "border-gray-300"
                    } bg-white px-4 pt-2 pb-2`}
                  >
                    <label className="block text-sm text-[#64748B] leading-tight mb-0.5 font-medium text-left">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      className="w-full text-[#0F172A] font-semibold text-[15px] bg-transparent focus:outline-none pr-8"
                      placeholder=""
                    />
                    {hasValue && !hasError && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  {hasError && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors[key]}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Country dropdown */}
            <div onClick={() => selectRef.current?.focus()}>
              <div
                className={`rounded-2xl border ${
                  errors.country ? "border-red-400" : "border-gray-300"
                } bg-white px-4 py-3`}
              >
                {/* Top Row → Label + Arrow */}
                <div className="flex items-center justify-between">
                  <label className="text-sm text-[#64748B] font-medium">
                    Country
                  </label>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Bottom Row → Selected Value */}
                <select
                  ref={selectRef}
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                  className="w-full mt-1 text-[#0F172A] font-bold text-[16px] bg-transparent focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>

              {errors.country && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.country}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 active:scale-[0.98] transition-all text-white py-4 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold shadow-md mt-1"
            >
              Match Me <ArrowRight className="w-5 h-5" />
            </button>

            {/* Footer */}
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              By clicking &quot;Match Me&quot;, you agree to our Terms of
              Service and Privacy Policy. We&apos;ll connect you with vetted
              professionals in your area.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetMatchedAgents;
