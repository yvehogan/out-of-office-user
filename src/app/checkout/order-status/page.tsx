"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import successIcon from "@/assets/images/Checkmark.svg";
// import errorIcon from "@/assets/images/Error.svg";
import Image from "next/image";

const CheckoutSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center  bg-white px-4">
      <div className="max-w-lg flex flex-col justify-center items-center w-full text-center space-y-4 animate-slide-up">
        {/* Success Icon */}
        <Image src={successIcon} alt="success" />

        {/* Success Message */}
        <div className="space-y-4 text-brand-purple2 ">
          <h1 className="font-cormorant font-bold text-2xl">
            Order Confirmed!
          </h1>
          <p className="text-sm font-unageo">
            A confirmation email containing your order details has been sent to
            your inbox. We'll keep you updated every step of the way.
          </p>
        </div>

        {/* Error  */}
        {/* <Image src={errorIcon} alt="error" />
        <div className="space-y-4 text-brand-purple2 ">
          <h1 className="font-cormorant font-bold text-2xl">Payment Failed</h1>
          <p className="text-sm font-unageo">
            Unfortunately, your payment could not be completed and your order
            was not placed. To continue shopping, please return to the store and
            start a new order.
          </p>
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <Link
            href="/shop"
            className="relative w-full sm:w-auto overflow-hidden bg-[#00CC8D] cursor-pointer text-base text-brand-navy h-16.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all flex items-center justify-center group"
          >
            <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
            <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
              Continue Shopping
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function CheckoutSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
