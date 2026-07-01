"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PhoneInput from "@/components/phone-input";
import { useCreateOrder } from "@/hooks/use-checkout";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { clearCartKey } from "@/lib/cart-key";
import { lagosCities, nigerianStates } from "@/lib/data/countries-data";

type DeliveryType = "pickup" | "doorstep";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  landmark: string;
  state: string;
  city: string;
}

export function InputField({
  placeholder,
  type = "text",
  value,
  onChange,
  required = false,
  error,
}: {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder + (required ? " *" : "")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full h-12.5 p-4 cursor-pointer rounded-[40px] border bg-white text-sm text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none transition-all ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-[#667085] focus:border-brand-purple focus:ring-2 focus:ring-brand-purple hover:border-brand-purple hover:ring-2 hover:ring-brand-purple"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-500 px-4">{error}</p>}
    </div>
  );
}

function SelectField({
  placeholder,
  value,
  onChange,
  options,
  required = false,
  error,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full h-12.5 p-4 pr-12 rounded-[40px] border bg-white text-sm appearance-none focus:outline-none transition-all cursor-pointer ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-[#667085] focus:border-brand-purple focus:ring-2 focus:ring-brand-purple hover:border-brand-purple hover:ring-2 hover:ring-brand-purple"
        } ${value === "" ? "text-[#9CA3AF]" : "text-[#1A1A1A]"}`}
      >
        <option value="" disabled className="text-[#9CA3AF]! font-light!">
          {placeholder + (required ? " *" : "")}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
      />
      {error && <p className="mt-1.5 text-xs text-red-500 px-4">{error}</p>}
    </div>
  );
}

type CheckoutFormProps = {
  cartId: string | undefined;
};

export default function CheckoutForm({ cartId }: CheckoutFormProps) {
  const router = useRouter();
  const [delivery, setDelivery] = useState<DeliveryType>("pickup");
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    landmark: "",
    state: "",
    city: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key: keyof FormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const createOrderMutation = useCreateOrder();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Validate delivery-specific fields
    if (delivery === "doorstep") {
      if (!form.shippingAddress.trim()) {
        newErrors.shippingAddress = "Shipping address is required";
      }
      if (!form.state) {
        newErrors.state = "State is required";
      }
      if (!form.city) {
        newErrors.city = "City is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cartId) {
      toast.error("No cart found. Please add items to your cart first.");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: form.fullName,
        customerEmail: form.email,
        customerPhone: form.phone,
        deliveryType: delivery,
        // redirectUrl: `${window.location.origin}/checkout/success`,
        redirectUrl: `https://out-of-office-coral.vercel.app/insights`,

        ...(delivery === "doorstep" && {
          shippingAddress: form.shippingAddress,
          landmark: form.landmark,
          state: form.state,
          city: form.city,
        }),
        ...(delivery === "pickup" && {
          pickupLocation: " 231, Hebert Macaulay Way, Yaba Lagos",
        }),
      };

      const response = await createOrderMutation.mutateAsync({
        cartKey: cartId,
        payload,
      });

      // Clear the cart key after successful order
      clearCartKey();

      // Success toast is automatically shown by axios interceptor
      toast.success("Order placed successfully!");

      // Redirect to success page or payment page
      // If your API returns a payment URL, redirect there
      if (response.data && "paymentUrl" in response.data) {
        window.location.href = (response.data as any).paymentUrl;
      } else {
        router.push(`/checkout/success?orderId=${response.data.id}`);
      }
    } catch (error: any) {
      console.error("Checkout error:", error);

      if (!error?.response?.data?.message) {
        toast.error("Failed to process checkout. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Contact Information */}
      <section>
        <h2 className="font-cormorant font-semibold text-3xl md:text-[40px] text-[#000000] mb-6">
          Contact Information
        </h2>
        <div className="flex flex-col gap-6">
          <InputField
            placeholder="Full Name"
            value={form.fullName}
            onChange={set("fullName")}
            required
            error={errors.fullName}
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
        </div>
      </section>

      {/* Delivery Type */}
      <section>
        <h2 className="font-cormorant font-semibold text-3xl md:text-4xl text-[#1A1A1A] mb-5">
          Delivery Type
        </h2>
        <div className="cursor-pointer flex gap-6 flex-1 py-2 px-3 w-fit rounded-[40px] border-[#00AF79] border ">
          {(["pickup", "doorstep"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setDelivery(type)}
              className={`relative overflow-hidden rounded-[40px] flex items-center justify-center font-sans h-12.25 py-5 px-11.25 text-sm font-semibold transition-all capitalize ${
                delivery === type
                  ? "border-[#00C9A7] text-[#18063A] border"
                  : "group  border-[#E5E7EB] text-[#18063A] bg-white"
              }`}
            >
              <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
              <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Delivery Information */}
      {delivery === "doorstep" && (
        <section>
          <h2 className="font-cormorant font-semibold text-3xl md:text-4xl text-[#1A1A1A] mb-5">
            Delivery Information
          </h2>
          <div className="flex flex-col gap-6">
            <InputField
              placeholder="Shipping Address"
              value={form.shippingAddress}
              onChange={set("shippingAddress")}
              required
              error={errors.shippingAddress}
            />
            <InputField
              placeholder="Landmark"
              value={form.landmark}
              onChange={set("landmark")}
            />
            <SelectField
              placeholder="State"
              value={form.state}
              onChange={set("state")}
              options={nigerianStates}
              required
              error={errors.state}
            />
            <SelectField
              placeholder="City"
              value={form.city}
              onChange={set("city")}
              options={lagosCities}
              required
              error={errors.city}
            />
          </div>
        </section>
      )}

      {delivery === "pickup" && (
        <section className="w-fit">
          <h2 className="font-cormorant font-semibold text-3xl md:text-4xl text-[#1A1A1A] mb-5">
            Delivery Information
          </h2>

          <div className="flex justify-start items-center text-brand-purple2 bg-[#EAEAEA] rounded-[40px] h-12.5 p-4">
            <p>231, Hebert Macaulay Way, Yaba Lagos</p>
          </div>
        </section>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !cartId}
        className={`relative w-46.25 mt-6 overflow-hidden cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] transition-all flex items-center justify-center group ${
          isSubmitting || !cartId
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#00CC8D] active:scale-95"
        }`}
      >
        {!isSubmitting && (
          <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
        )}
        <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
          {isSubmitting ? "Processing..." : "Checkout"}
        </span>
      </button>
    </form>
  );
}
