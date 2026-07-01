"use client";

import CheckoutForm from "@/components/pages/checkout/checkout-form";
import OrderSummary from "@/components/pages/checkout/order-summary";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import divider from "@/assets/images/Divider.svg";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";

const CheckoutContent = () => {
  const searchParams = useSearchParams();

  const { data: cartResponse, isLoading, error } = useCart();

  const cart = cartResponse?.data;

  const id = searchParams.get("id");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white animate-slide-up">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 text-center">
        <h1 className="font-cormorant text-brand-purple2 font-bold text-5xl sm:text-6xl md:text-[110px] mb-8">
          Checkout
        </h1>

        {/* Breadcrumb */}
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center text-center  justify-center gap-1 text-sm text-gray-400"
        >
          <Link
            href="/"
            className="hover:text-brand-navy transition-colors text-black font-semibold text-1base"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
          <Link href="/shop" className="text-black font-semibold text-base">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
          <Link
            href={`/shop/${id}`}
            className="text-black font-semibold text-base"
          >
            Product
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
          <Link href={`/cart`} className="text-black font-semibold text-base">
            Cart
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
          <p className="text-brand-purple font-semibold text-base">Checkout</p>
        </nav>
      </div>

      <main className="flex-1 max-w-310  mx-auto w-full px-6 sm:px-10 lg:px-14 pb-10 pt-6">
        <div className="flex flex-col lg:grid lg:grid-cols-[460px_600px] lg:justify-center gap-12">
          <div className="order-2 lg:order-1">
            <CheckoutForm cartId={cartResponse?.data?.cartKey} />
          </div>

          <div className="relative order-1 lg:order-2 lg:pl-8">
            <div className="hidden lg:block absolute left-0 top-0 h-full w-3 -translate-x-3">
              <Image
                src={divider}
                alt=""
                fill
                className="object-fill"
                aria-hidden
              />
            </div>

            <div className="lg:sticky lg:top-8">
              <OrderSummary cart={cart} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function Checkout() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
