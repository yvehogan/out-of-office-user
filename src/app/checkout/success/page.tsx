"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-lg w-full text-center space-y-8 animate-slide-up">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-green-500 rounded-full p-4">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="font-cormorant text-brand-purple2 font-bold text-4xl sm:text-5xl md:text-6xl">
            Order Successful!
          </h1>
          <p className="text-lg text-gray-600 font-sans">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          {orderId && (
            <p className="text-sm text-gray-500 font-sans">
              Order ID:{" "}
              <span className="font-semibold text-brand-purple">{orderId}</span>
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-3xl p-6 space-y-3 text-left">
          <h2 className="font-sans font-semibold text-lg text-brand-purple2">
            What's Next?
          </h2>
          <ul className="space-y-2 text-gray-600 text-sm font-sans">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>You will receive an order confirmation email shortly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>
                We'll notify you once your order is ready for pickup/delivery
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Track your order status in your email</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            href="/shop"
            className="relative w-full sm:w-auto overflow-hidden bg-[#00CC8D] cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all flex items-center justify-center group"
          >
            <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
            <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
              Continue Shopping
            </span>
          </Link>

          <Link
            href="/"
            className="relative w-full sm:w-auto border border-[#00CC8D] overflow-hidden cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all flex items-center justify-center group"
          >
            <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
            <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
              Back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
