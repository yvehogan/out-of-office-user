"use client";
import { InputField } from "@/components/pages/checkout/checkout-form";
import PhoneInput from "@/components/phone-input";
import { FormState } from "@/lib/data/countries-data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useCreateWaitlist } from "@/hooks/use-waitlist";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const WaitlistPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const createWaitlistMutation = useCreateWaitlist();

  const set = (key: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      // Parse phone number to extract country code and number
      const phoneRegex = /^\+(\d{1,3})(.+)$/;
      const match = form.phone.match(phoneRegex);

      let countryCode = "234"; // Default to Nigeria
      let phoneNumber = form.phone;

      if (match) {
        countryCode = match[1];
        phoneNumber = match[2].replace(/\D/g, ""); // Remove all non-numeric characters
      } else {
        // If no country code, treat as local number and remove any non-numeric characters
        phoneNumber = form.phone.replace(/\D/g, "");
        if (phoneNumber.startsWith("0")) {
          // Remove leading 0 for Nigerian local format
          phoneNumber = phoneNumber.substring(1);
        }
      }

      const payload = {
        fullName: form.name,
        email: form.email,
        countryCode: `+${countryCode}`,
        phoneNumber: phoneNumber,
      };

      await createWaitlistMutation.mutateAsync({ payload });

      // Success toast is automatically shown by axios interceptor
      // toast.success(
      //   "Successfully joined the waitlist! We'll notify you when the book is available.",
      // );
      setSubmitted(true);

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
      });

      // Optionally redirect after a delay
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: any) {
      console.error("Waitlist submission error:", error);
      // Error toast is automatically shown by axios interceptor
      // Only show custom toast if no API error message
      if (!error?.response?.data?.message) {
        toast.error("Failed to join waitlist. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-115 space-y-6 mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-start text-brand-purple2"
      >
        <p>
          Fill out the form below to join the waitlist. We'll email you as soon
          as the book is available for shipping.
        </p>

        <InputField
          placeholder="Full Name"
          value={form.name}
          onChange={set("name")}
          required
          error={errors.name}
        />

        <InputField
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={set("email")}
          required
          error={errors.email}
        />

        <div className="relative">
          <PhoneInput
            value={form.phone}
            onChange={(phone: string) => {
              setForm({ ...form, phone });
              if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: "" }));
              }
            }}
            defaultCountry="NG"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-500 px-4">{errors.phone}</p>
          )}
        </div>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || submitted}
            className={`relative w-46.25 mt-6 overflow-hidden cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] transition-all flex items-center justify-center group ${
              isSubmitting || submitted
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#00CC8D] active:scale-95"
            }`}
          >
            {!isSubmitting && !submitted && (
              <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
            )}
            <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
              {isSubmitting
                ? "Submitting..."
                : submitted
                  ? "Submitted!"
                  : "Submit"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default WaitlistPage;
