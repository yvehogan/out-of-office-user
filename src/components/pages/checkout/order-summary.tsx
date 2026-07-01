"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Cart } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface CartItem {
  id: number;
  title: string;
  price: number;
  variant?: string;
  color?: string;
  coverBg: string;
}

function parseSelectedOptions(selectedOptions: string) {
  if (!selectedOptions) return [];
  return selectedOptions.split(",").map((opt) => {
    const [label, value] = opt.trim().split(":");
    return { label, value };
  });
}

interface OrderSummaryProps {
  cart: Cart | undefined;
  isLoading?: boolean;
}

export default function OrderSummary({ cart, isLoading }: OrderSummaryProps) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCount = 3;

  const items = cart?.items ?? [];
  const maxScroll = Math.max(0, items.length - visibleCount);
  const visible = items.slice(scrollIndex, scrollIndex + visibleCount);

  const handleNext = () => setScrollIndex((i) => Math.min(i + 1, maxScroll));
  const handlePrev = () => setScrollIndex((i) => Math.max(i - 1, 0));

  if (isLoading) {
    return (
      <div className="bg-[#5700FF24] rounded-3xl p-4 sm:p-8 h-full font-unageo animate-pulse">
        <div className="bg-white p-6 space-y-6 rounded-2xl">
          <div className="h-5 w-40 bg-black/10 rounded-full" />
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 border border-[#E6E6E6] rounded-2xl p-6"
              >
                <div className="aspect-3/4 bg-black/5 rounded-xl mb-4" />
                <div className="h-4 w-3/4 mx-auto bg-black/10 rounded-full" />
              </div>
            ))}
          </div>
          <hr />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-32 bg-black/10 rounded-full" />
                <div className="h-4 w-16 bg-black/10 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#5700FF24] rounded-3xl p-4 sm:p-8  h-full font-unageo">
      <div className="bg-white p-6 space-y-6 rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#222222]">
            Your Shopping Bag
          </h2>
          <Link
            href="/cart"
            className="text-brand-purple  font-semibold  transition-all"
          >
            Open Cart
          </Link>
        </div>

        {/* Book carousel */}
        <div className="relative flex gap-3 mb-6">
          {/* {visible.map((item) => (
            <div
              key={item.id}
              className="flex-1 min-w-0 border border-[#E6E6E6] bg-white rounded-2xl p-6"
            >
              <div className="aspect-3/4 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
                <BookCover bg={item.coverBg} title={item.title} />
              </div>
              <p className="text-brand-purple2 text-sm font-bold text-center truncate font-cormorant">
                {item.title}
              </p>
            </div>
          ))} */}

          {visible.map((item) => (
            <div
              key={item.id}
              className="flex-1 min-w-0 border border-[#E6E6E6] bg-white rounded-2xl p-6"
            >
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-black/5 mb-4 flex items-center justify-center">
                <span className="text-brand-purple2 text-[10px] font-bold text-center px-2 uppercase">
                  {item.productName}
                </span>
              </div>
              <p className="text-brand-purple2 text-sm font-bold text-center truncate font-cormorant">
                {item.productName}
              </p>
            </div>
          ))}

          {/* Navigation arrows */}
          {scrollIndex < maxScroll && (
            <button
              onClick={handleNext}
              className="absolute cursor-pointer -right-4 top-1/3 -translate-y-1/2 bg-white rounded-2xl shadow-md w-15 h-15 flex items-center justify-center hover:bg-[#00CC8D]  transition-colors z-10"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          )}
          {scrollIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute cursor-pointer hover:bg-[#00CC8D]  -left-4 top-1/3 -translate-y-1/2 bg-white rounded-2xl shadow-md w-15 h-15 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft size={14} className="text-gray-600" />
            </button>
          )}
        </div>

        <hr />

        {/* Order Summary */}
        <div className="space-y-6">
          <h3 className="font-semibold text-[#222222]">Order Summary</h3>

          <div className="space-y-2.5">
            {items.map((item) => {
              const options = parseSelectedOptions(item.selectedOptions);
              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#222222] font-normal">
                      {item.productName}
                    </span>
                    <span className="text-sm font-semibold text-[#222222]">
                      {formatCurrency(item.subtotal)}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-1 flex-wrap">
                    {options.length > 0 ? (
                      options.map(({ label, value }) => (
                        <span
                          key={label}
                          className="flex items-center w-fit text-sm font-light bg-[#0000000A] text-brand-purple2 px-2 py-1 rounded-[40px]"
                        >
                          {value}
                        </span>
                      ))
                    ) : (
                      <span className="flex items-center w-fit text-sm font-light bg-[#0000000A] text-brand-purple2 px-2 py-1 rounded-[40px]">
                        -
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <hr />
          </div>

          <div className="flex items-center justify-between text-[#222222] text-[20px] font-semibold">
            <span>Total</span>
            <span>{formatCurrency(cart?.totalAmount ?? 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
