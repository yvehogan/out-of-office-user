"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhoneInput from "@/components/phone-input";

type DeliveryType = "pickup" | "doorstep";

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const lagosCities = [
  "Ikeja",
  "Lekki",
  "Victoria Island",
  "Surulere",
  "Yaba",
  "Ikoyi",
  "Ajah",
  "Alimosho",
  "Badagry",
  "Epe",
  "Ibeju-Lekki",
  "Mushin",
];

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
}: {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder + (required ? " *" : "")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full h-12.5 p-4 cursor-pointer rounded-[40px] border border-[#667085] bg-white text-sm text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple  hover:border-brand-purple hover:ring-2 hover:ring-brand-purple  transition-all"
      />
    </div>
  );
}

function SelectField({
  placeholder,
  value,
  onChange,
  options,
  required = false,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full h-12.5 p-4 pr-12 rounded-[40px] border border-[#667085] bg-white text-sm appearance-none focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple hover:border-brand-purple hover:ring-2 hover:ring-brand-purple transition-all cursor-pointer ${
          value === "" ? "text-[#9CA3AF]" : "text-[#1A1A1A]"
        }`}
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
    </div>
  );
}

export default function CheckoutForm() {
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

  const set = (key: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    // Handle form submission
    alert("Order placed successfully!");
  };

  return (
    <div className="flex flex-col gap-8">
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
          />
          <InputField
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={set("email")}
            required
          />
          {/* <InputField
            placeholder="Phone Number"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            required
          /> */}

          <PhoneInput
            value={form.phone}
            onChange={(phone: string) => setForm({ ...form, phone })}
            defaultCountry="NG"
          />
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
            />
            <SelectField
              placeholder="City"
              value={form.city}
              onChange={set("city")}
              options={lagosCities}
              required
            />
          </div>
        </section>
      )}

      {delivery === "pickup" && (
        <section className="">
          <h2 className="font-cormorant font-semibold text-3xl md:text-4xl text-[#1A1A1A] mb-5">
            Delivery Information
          </h2>

          <div className="flex justify-start items-center text-brand-purple2 bg-[#EAEAEA] rounded-[40px] h-12.5 p-4">
            <p>231, Hebert Macaulay Way, Yaba Lagos</p>
          </div>
        </section>
      )}

      <button
        onClick={handleSubmit}
        className="relative w-46.25 mt-6 overflow-hidden bg-[#00CC8D] cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all  flex items-center justify-center group"
      >
        <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
        <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
          Checkout
        </span>
      </button>
    </div>
  );
}
