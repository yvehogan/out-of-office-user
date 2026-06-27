"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface CartItem {
  id: number;
  title: string;
  price: number;
  variant?: string;
  color?: string;
  coverBg: string;
}

const cartItems: CartItem[] = [
  { id: 1, title: "Out of Office", price: 24000, coverBg: "#1a3a5c" },
  {
    id: 2,
    title: "Out of Office Shirt",
    price: 15000,
    variant: "XL",
    color: "Black",
    coverBg: "#c0392b",
  },
  { id: 3, title: "Journal", price: 5000, color: "Green", coverBg: "#27ae60" },
  { id: 4, title: "Mumuniche", price: 10000, coverBg: "#8e44ad" },
];

const VAT = 525;

function BookCover({ bg, title }: { bg: string; title: string }) {
  return (
    <div
      className="relative w-full h-full rounded-md overflow-hidden flex flex-col items-center justify-end pb-2"
      style={{ backgroundColor: bg }}
    >
      <div className="absolute inset-0 opacity-20 bg-linear-to-br from-white to-transparent" />
      <span className="text-white text-[9px] font-bold text-center px-1 leading-tight z-10 uppercase tracking-wide">
        {title}
      </span>
    </div>
  );
}

export default function OrderSummary() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCount = 3;
  const maxScroll = Math.max(0, cartItems.length - visibleCount);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0) + VAT;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const handleNext = () => setScrollIndex((i) => Math.min(i + 1, maxScroll));
  const handlePrev = () => setScrollIndex((i) => Math.max(i - 1, 0));

  const visible = cartItems.slice(scrollIndex, scrollIndex + visibleCount);

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
          {visible.map((item) => (
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
          ))}

          {/* Navigation arrows */}
          {scrollIndex < maxScroll && (
            <button
              onClick={handleNext}
              className="absolute cursor-pointer -right-4 top-1/3 -translate-y-1/2 bg-white rounded-2xl shadow-md w-15 h-15 flex items-center justify-center  transition-colors z-10"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          )}
          {scrollIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute cursor-pointer -left-4 top-1/3 -translate-y-1/2 bg-white rounded-2xl shadow-md w-15 h-15 flex items-center justify-centertransition-colors z-10"
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
            {cartItems.map((item) => (
              <div key={item.id}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#222222] font-normal">
                    {item.title}
                  </span>
                  <span className="text-sm font-semibold text-[#222222]">
                    {formatNaira(item.price)}
                  </span>
                </div>
                {(item.variant || item.color) && (
                  <div className="flex gap-2 mt-1">
                    {item.variant && (
                      <span className="flex items-center w-fit text-sm font-light bg-[#0000000A] text-brand-purple2 px-2 py-1 rounded-[40px] ">
                        {item.variant}
                      </span>
                    )}
                    {item.color && (
                      <span className="flex items-center w-fit text-sm font-light bg-[#0000000A] text-brand-purple2 px-2 py-1 rounded-[40px] ">
                        {item.color}
                      </span>
                    )}
                  </div>
                )}
                {!item.variant && !item.color && (
                  <span className="flex items-center w-fit text-sm font-light bg-[#0000000A] text-brand-purple2 px-2 py-1 rounded-[40px] ">
                    -
                  </span>
                )}
              </div>
            ))}

            <div className="flex mt-8 items-center justify-between text-sm text-[#222222]">
              <span>VAT</span>
              <span className="font-semibold">{formatNaira(VAT)}</span>
            </div>

            <hr />
          </div>

          <div className="flex items-center justify-between text-[#222222] text-[20px] font-semibold">
            <span>Total</span>
            <span>{formatNaira(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
