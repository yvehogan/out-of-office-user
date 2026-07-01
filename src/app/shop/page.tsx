"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/pages/shop/product-card";
import { CategoryFilter } from "@/components/pages/shop/category-filter";
import { Pagination } from "@/components/pagination";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useCategories, useProducts } from "@/hooks/use-products";
import { ProductCardSkeleton } from "@/components/pages/shop/product-skeleton";
import EmptyShop from "@/components/pages/shop/empty-shop";
import { useDebounce } from "@/hooks/use-debounce";

const PAGE_SIZE = 9;

export default function ShopPage() {
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 400);

  const { data: categoriesResponse } = useCategories();
  const apiCategories = categoriesResponse?.data ?? [];

  const categories = [
    { id: undefined, name: "All" },
    ...apiCategories.map((cat) => ({ id: cat.id, name: cat.name })),
  ];

  const activeCategoryName =
    categories.find((c) => c.id === categoryId)?.name ?? "All";

  const {
    data: productsResponse,
    isLoading,
    error,
  } = useProducts({
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
    categoryIds: categoryId ? categoryId : undefined,
    searchTerm: debouncedSearch || undefined,
  });

  const products = productsResponse?.data ?? [];
  const totalPages = productsResponse?.pagination.totalPages ?? 1;

  const handleCategoryChange = (name: string) => {
    const match = categories.find((c) => c.name === name);
    setCategoryId(match?.id);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen flex flex-col bg-white animate-slide-up">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 text-center">
        <h1 className="font-cormorant text-brand-purple2 font-bold text-5xl sm:text-6xl md:text-[110px] mb-8">
          Shop
        </h1>

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
      </div>

      <main className="flex-1 max-w-350 mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="w-full flex  flex-col  sm:flex-row  justify-between gap-4 sm:gap-6 mb-8">
          {/* Search Bar */}
          <div className="w-full sm:w-auto">
            <div className="rounded-full p-4 h-13.25 flex items-center border border-[#0C111D] w-full sm:min-w-85">
              <Search className="mr-2 shrink-0" size={14} />
              <input
                type="text"
                placeholder="Search products...."
                className="w-full focus:outline-none placeholder:text-[#475467] placeholder:text-sm placeholder:font-light"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            active={activeCategoryName}
            onChange={handleCategoryChange}
            categories={categories.map((c) => c.name)}
          />
        </div>

        <section id="products-grid" className="pb-10">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-12">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-24 text-red-400 font-medium">
              Failed to load products.
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 mb-24">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyShop />
          )}

          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              maxVisible={5}
              className="mt-4"
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
