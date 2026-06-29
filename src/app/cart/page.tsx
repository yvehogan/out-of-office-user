"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_PRODUCTS } from "@/lib/data/shop-data";
import CartTable from "@/components/pages/cart/cart-table";
import { ProductCard } from "@/components/pages/shop/product-card";
import { formatCurrency } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import { useCart, useUpdateCartItem, useRemoveCartItem } from "@/hooks/use-cart";

const CartPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: cartResponse, isLoading, error } = useCart();
  const updateCartItemMutation = useUpdateCartItem();
  const removeCartItemMutation = useRemoveCartItem();

  const cart = cartResponse?.data?.items || [];
  const total = cartResponse?.data?.total || 0;

  const increase = (itemId: string, currentQty: number) => {
    updateCartItemMutation.mutate({
      id: itemId,
      payload: { quantity: currentQty + 1 },
    });
  };

  const decrease = (itemId: string, currentQty: number) => {
    if (currentQty > 1) {
      updateCartItemMutation.mutate({
        id: itemId,
        payload: { quantity: currentQty - 1 },
      });
    }
  };

  const remove = (itemId: string) => {
    removeCartItemMutation.mutate(itemId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white animate-slide-up">
      <main className="flex-1 max-w-350  mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto text-center space-y-6 ">
          <h1 className="font-cormorant text-brand-purple2 font-bold text-5xl sm:text-6xl md:text-[110px]">
            Cart
          </h1>

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
            <p className="text-brand-purple font-semibold text-base">Cart</p>
          </nav>
        </div>
        <div className="max-w-260  mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {isLoading ? (
            <div className="py-24 text-center text-brand-purple text-lg font-medium">
              Loading your cart...
            </div>
          ) : error ? (
            <div className="py-24 text-center text-red-500 text-lg font-medium">
              Failed to load cart. Please try again.
            </div>
          ) : (
            <>
              <CartTable
                cart={cart}
                increase={increase}
                decrease={decrease}
                remove={remove}
              />

              <div className="flex justify-end font-unageo">
                <div className="flex items-center mt-6 gap-6 py-2 px-3 rounded-[40px] border border-brand-green2 w-fit">
                  <span className="text-brand-purple2 font-semibold text-xl sm:text-2xl">
                    Total: {formatCurrency(total)}
                  </span>
                  <Link
                    href={`/checkout?id=${id}`}
                    className="relative overflow-hidden bg-brand-green cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all  flex items-center justify-center group"
                  >
                    <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
                    <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
                      Proceed to Checkout
                    </span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* other products */}
        <hr className="mt-24 border-t" />
        <div className="mt-6 ">
          <h3 className="font-cormorant font-semibold text-black text-[40px] mb-6">
            {/* {product.title.toLowerCase() === "work in progress" ? (
                    <>
                      {" "}
                      Others who pre-ordered also grabbed this{" "}
                      <span className="text-brand-purple">experience</span>
                    </>
                  ) : (
                    <>
                      Complete the{" "}
                      <span className="text-brand-purple">experience</span>
                    </>
                  )} */}
            Others who pre-ordered also{" "}
            <span className="text-brand-purple">grabbed this </span>
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
      <Footer />
    </div>
  );
};

export default CartPage;
