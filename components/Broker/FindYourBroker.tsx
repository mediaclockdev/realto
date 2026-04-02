"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  giveName: string;
  familyName: string;
  phone: string;
  postCode: string;
  email: string;
};

const FindYourBroker = () => {
  // ✅ useState — only for API/UI state
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ✅ React Hook Form — only for form field state + validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setApiError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/find-broker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess(true);
      reset(); // clears all fields in one line
    } catch (err) {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full bg-gray-50 border border-[#E2E8F0] rounded-[5px] px-4 py-3 text-[#D9D9D9] placeholder-[#D9D9D9] focus:outline-none focus:border-blue-400 text-base";

  const labelClass =
    "block font-semibold text-black text-xl lg:text-[30px] mb-2";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md px-12 py-10 text-black">
        {/* ✅ Success banner */}
        {success && (
          <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            ✅ Successfully submitted! We&apos;ll find your broker shortly.
          </div>
        )}

        {/* ✅ API error banner */}
        {apiError && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-500 text-sm">
            ❌ {apiError}
          </div>
        )}

        <div>
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div>
              <label className={labelClass}>Give Name</label>
              <input
                {...register("giveName", { required: "Give name is required" })}
                placeholder="Give Name"
                className={inputClass}
              />
              {errors.giveName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.giveName.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Family Name</label>
              <input
                {...register("familyName", {
                  required: "Family name is required",
                })}
                placeholder="Family Name"
                className={inputClass}
              />
              {errors.familyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.familyName.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div>
              <label className={labelClass}>Phone</label>
              <input
                {...register("phone", {
                  required: "Phone is required",
                  pattern: { value: /^[0-9]+$/, message: "Numbers only" },
                })}
                placeholder="Phone"
                className={inputClass}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Post Code</label>
              <input
                {...register("postCode", { required: "Post code is required" })}
                placeholder="Post Code"
                className={inputClass}
              />
              {errors.postCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.postCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 3 - Email */}
          <div className="mb-2">
            <label className={labelClass}>Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email"
              className={inputClass}
            />
            {errors.email ? (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            ) : (
              <p className="text-[#0284C7] text-sm mt-1 font-poppins font-light">
                Please enter your email address
              </p>
            )}
          </div>

          {/* Row 4 - Submit */}
          <div className="flex flex-col lg:flex-row items-center gap-8 mt-6">
            <button
              type="button"
              //   onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="cursor-pointer  bg-[#0284C7] hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-poppins font-semibold text-lg px-10 py-3 rounded-[5px]"
            >
              {isLoading ? "Searching..." : "Find Your Broker"}
            </button>
            <p className="underline text-black cursor-pointer text-base font-normal font-poppins">
              Privacy collection statement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindYourBroker;
