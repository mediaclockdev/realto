"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/logo.svg";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

// ── Types ──────────────────────────────────────────────────────────────────────

interface GetMatchedNowProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type FormField = keyof Omit<FormState, "message">; // name | phone | email

type FormErrors = Partial<Record<FormField, string>>;

interface FieldConfig {
  label: string;
  key: FormField;
  type: string;
}

// ── Component ──────────────────────────────────────────────────────────────────

const GetMatchedNow: React.FC<GetMatchedNowProps> = ({ open, onClose }) => {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

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
    if (!form.name.trim()) newErrors.name = "Name required";
    if (!form.phone.trim()) newErrors.phone = "Phone required";
    if (!form.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    toast.success("Message sent successfully!");
    setTimeout(() => {
      onClose();
      setForm({ name: "", phone: "", email: "", message: "" });
      setErrors({});
    }, 2000);
  };

  const fields: FieldConfig[] = [
    { label: "Name", key: "name", type: "text" },
    { label: "Phone Number", key: "phone", type: "text" },
    { label: "Email", key: "email", type: "email" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <Image src={logo} alt="logo" width={130} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => {
            const hasValue = !!form[field.key];
            const hasError = !!errors[field.key];

            return (
              <div key={field.key} className="relative">
                {/* Floating label + value stacked inside the input box */}
                <div
                  className={`relative w-full rounded-2xl border ${
                    hasError ? "border-red-400" : "border-gray-300"
                  } bg-white px-4 pt-2.5 pb-2.5`}
                >
                  {/* Label inside box */}
                  <label className="block text-sm text-[#334155] leading-tight mb-0.5 font-poppins font-medium">
                    {field.label}
                  </label>

                  {/* Input */}
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    className="w-full text-[#0F172A] font-bold text-[15px] bg-transparent focus:outline-none pr-8"
                    placeholder=""
                  />

                  {/* ✅ Green filled checkmark */}
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

                {/* Error */}
                {hasError && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors[field.key]}
                  </p>
                )}
              </div>
            );
          })}

          {/* Message textarea */}
          <div className="rounded-2xl border border-gray-300 px-4 pt-2.5 pb-2.5">
            <label className="block text-[13px] text-gray-500 leading-tight mb-0.5">
              message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full text-black font-semibold text-[15px] bg-transparent focus:outline-none resize-none h-20"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 active:scale-[0.98] transition-all text-white py-4 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold shadow-md mt-2"
          >
            Send <ArrowRight className="w-5 h-5" />
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center mt-2 leading-relaxed">
            By clicking &quot;Send&quot;, you agree to our Terms of Service and
            Privacy Policy. We&apos;ll connect you with vetted professionals in
            your area.
          </p>
        </form>
      </div>
    </div>
  );
};

export default GetMatchedNow;
