"use client";

import { useState } from "react";
import { ProductCard } from "@/components/pages/shop/product-card";
import { CategoryFilter } from "@/components/pages/shop/category-filter";
import { Pagination } from "@/components/pagination";
import { getPaginatedProducts, ProductCategory } from "@/lib/data/shop-data";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ShopPage() {
  const [category, setCategory] = useState<ProductCategory>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    products,
    totalPages,
    currentPage: page,
  } = getPaginatedProducts(currentPage, category);

  const handleCategoryChange = (cat: ProductCategory) => {
    setCategory(cat);
    setCurrentPage(1); // reset to first page on filter change
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // const grid = document.getElementById("products-grid");
    // if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white animate-slide-up">
      {/* ── Dark hero header ── */}
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 text-center">
        {/* Page title */}
        <h1 className="font-cormorant text-brand-purple2 font-bold text-5xl sm:text-6xl md:text-[110px] mb-8">
          Shop
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
          <Link
            href="/shop"
            className="text-brand-purple font-semibold text-base"
          >
            Shop
          </Link>
        </nav>

        {/* Category filter */}
        <CategoryFilter active={category} onChange={handleCategoryChange} />
      </div>

      {/* ── White product area ── */}
      <main className="flex-1 max-w-350 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Product grid */}
        <section id="products-grid" className="mt-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400 font-medium">
              No products found in this category.
            </div>
          )}

          {/* Pagination — reusing the same component from the events page */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              maxVisible={5}
              className="mt-4"
            />
          )}
        </section>
      </main>
    </div>
  );
}
