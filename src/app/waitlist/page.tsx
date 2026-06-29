"use client";
import { InputField } from "@/components/pages/checkout/checkout-form";
import PhoneInput from "@/components/phone-input";
import { FormState } from "@/lib/data/countries-data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

const WaitlistPage = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const set = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="min-h-screen flex flex-col bg-white animate-slide-up">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 text-center">
        {/* Page title */}
        <h1 className="font-cormorant text-brand-purple2 font-bold text-5xl sm:text-6xl md:text-[110px] mb-8">
          Waitlist
        </h1>

        {/* Breadcrumb */}
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center my-10 justify-center gap-1 text-sm text-gray-400"
        >
          <Link
            href="/"
            className="hover:text-brand-navy transition-colors text-black font-semibold text-1base"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
          <p className="text-brand-purple font-semibold text-base">Waitlist</p>
        </nav>

        {/* Category filter */}
      </div>
      <div className="max-w-115 space-y-6 mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-start text-brand-purple2">
        <p>
          Fill out the form below to join the waitlist. We'll email you as soon
          as the book is available for shipping.
        </p>
        <InputField
          placeholder="Full Name"
          value={form.name}
          onChange={set("name")}
          required
        />
        <InputField
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={set("email")}
          required
        />
        <PhoneInput
          value={form.phone}
          onChange={(phone: string) => setForm({ ...form, phone })}
          defaultCountry="NG"
        />
        <div className="w-full flex justify-end">
          <button
            // onClick={handleSubmit}
            className="relative w-46.25 mt-6 overflow-hidden bg-[#00CC8D] cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all  flex items-center justify-center group"
          >
            <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
            <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
              Submit
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
