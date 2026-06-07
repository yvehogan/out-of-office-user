"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS, getProductBySlug } from "@/lib/data/shop-data";
import { ProductCard } from "@/components/pages/shop/product-card";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const colors = ["Red", "Green", "Purple"];
  const sizes = ["Small", "Medium", "Large"];

  const thumbnails = [product.image, product.image, product.image];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white animate-slide-right">
      <main className="flex-1 max-w-350  mt-14 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* product detail */}
        <div className="max-w-6xl mx-auto ">
          <div className="flex flex-col md:flex-row  gap-6 justify-between items-center">
            <div className="w-full md:w-1/2">
              <article className="">
                {/* Main Image */}
                <div className="relative w-full aspect-4/3 overflow-hidden ">
                  <Image
                    src={thumbnails[activeImage]}
                    alt={product.title}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 mt-6 ">
                  {thumbnails.map((thumb, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === i
                          ? "border-brand-purple"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={thumb}
                        alt={`${product.title} thumbnail ${i + 1}`}
                        fill
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              </article>
            </div>

            <div className="space-y-6 md:w-1/2">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="flex items-center  gap-1 text-sm text-gray-400"
              >
                <Link
                  href="/"
                  className="hover:text-brand-navy transition-colors text-black font-semibold text-base"
                >
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
                <Link
                  href="/shop"
                  className="hover:text-brand-navy transition-colors text-black font-semibold text-base"
                >
                  Shop
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
                <span className="text-brand-purple font-semibold text-base">
                  Product
                </span>
              </nav>
              {/* Info */}
              <div className="flex flex-col gap-4">
                <h2 className="font-cormorant font-bold text-black text-3xl sm:text-4xl md:text-5xl">
                  {product.title.toLowerCase() === "work in progress"
                    ? "Out of Office"
                    : product.title}
                </h2>

                <p className="text-sm font-light text-[#4D4D4D]">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad
                </p>

                {product.title.toLowerCase() === "work in progress" ? (
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {[
                      "Pages: 174",
                      "Category: Non Fiction",
                      "Language: English",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="text-brand-purple2 font-light bg-black/4 py-1 px-3 rounded-[40px] text-base"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mt-6">
                      <p>Colour</p>
                      <div className="flex items-center gap-2">
                        {colors.map((color, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedColor(color)}
                            className={`py-1 px-3 rounded-[40px] text-base text-brand-purple2  cursor-pointer transition-all ${
                              selectedColor === color
                                ? "border border-brand-green2"
                                : "border border-black/15 "
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                      <p>Size</p>
                      <div className="flex items-center gap-2">
                        {sizes.map((size, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedSize(size)}
                            className={`py-1 px-3 rounded-[40px] text-base cursor-pointer transition-all ${
                              selectedSize === size
                                ? "border border-brand-green2"
                                : "border border-black/15 "
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center mt-6 gap-6 py-2 px-4 rounded-[40px] border border-brand-green2 w-fit">
                  <span className="text-brand-purple2 font-semibold text-xl sm:text-2xl">
                    ₦24,000
                  </span>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="relative overflow-hidden bg-brand-green cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all  flex items-center justify-center group"
                  >
                    <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      {product.title.toLowerCase() === "work in progress"
                        ? "Pre-order Now"
                        : "Buy Now"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="mt-10 space-y-3">
            <h3 className="font-sans font-semibold text-black text-2xl">
              Description
            </h3>
            <p className=" text-sm font-light text-[#4D4D4D]">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad
            </p>
            <p className="text-sm font-light text-[#4D4D4D]">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad
            </p>
          </div>
        </div>
        <hr className="mt-24 border-t" />
        {/* other products */}
        <div className="mt-6 ">
          <h3 className="font-cormorant font-semibold text-black text-[40px] mb-6">
            {product.title.toLowerCase() === "work in progress" ? (
              <>
                Others who pre-ordered also grabbed this{" "}
                <span className="text-brand-purple">experience</span>
              </>
            ) : (
              <>
                Complete the{" "}
                <span className="text-brand-purple">experience</span>
              </>
            )}
          </h3>
          <section id="products-grid" className="scroll-mt-6">
            {ALL_PRODUCTS.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-12">
                {ALL_PRODUCTS.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 text-gray-400 font-medium">
                No products found in this category.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
