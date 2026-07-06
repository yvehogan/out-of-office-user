"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CartTable from "@/components/pages/cart/cart-table";
import { ProductCard } from "@/components/pages/shop/product-card";
import { formatCurrency } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import {
  useCart,
  useUpdateCartItem,
  useRemoveCartItem,
} from "@/hooks/use-cart";
import { useProducts } from "@/hooks/use-products";
import { ProductCardSkeleton } from "@/components/pages/shop/product-skeleton";
import { CartTableSkeleton } from "@/components/pages/cart/cart-skeleton";
import EmptyCart from "@/components/pages/cart/empty-cart";

const CartPageContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: cartResponse, isLoading, error } = useCart();
  const updateCartItemMutation = useUpdateCartItem();
  const removeCartItemMutation = useRemoveCartItem();
  const cart = cartResponse?.data?.items || [];
  const total = cartResponse?.data?.totalAmount || 0;

  const { data: productsResponse, isLoading: productsLoading } = useProducts();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="max-w-260 mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CartTableSkeleton />
      </div>
    );

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

  const products = productsResponse?.data ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-white animate-slide-up">
      <main className="flex-1 max-w-350  mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {!isLoading && cart?.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
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
                <Link
                  href="/shop"
                  className="text-black font-semibold text-base"
                >
                  Shop
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
                {id && (
                  <>
                    <Link
                      href={`/shop/${id}`}
                      className="text-black font-semibold text-base"
                    >
                      Product
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
                  </>
                )}

                <p className="text-brand-purple font-semibold text-base">
                  Cart
                </p>
              </nav>
            </div>
            <div className="max-w-260  mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {isLoading ? (
                <CartTableSkeleton />
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

                  {cart.length > 0 && (
                    <div className="flex sm:justify-end font-unageo ">
                      <div className="w-full flex justify-between items-center whitespace-nowrap mt-20! gap-3 sm:gap-6 py-2 px-3 rounded-[40px] border border-brand-green2 sm:w-fit">
                        <span className="text-brand-purple2 font-semibold text-base sm:text-2xl">
                          Total: {formatCurrency(total)}
                        </span>
                        <Link
                          href={`/checkout`}
                          className="relative  text-sm overflow-hidden bg-brand-green cursor-pointer sm:text-base text-brand-navy h-12.25 font-medium px-8 sm:px-10 py-5 rounded-[47px] active:scale-95 transition-all  flex items-center justify-center group"
                        >
                          <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
                          <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
                            Proceed to Checkout
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        <hr className="mt-24 border-t" />
        <div className="mt-6 ">
          {cart.length > 0 ? (
            <h3 className="font-cormorant font-semibold text-brand-purple2 text-2xl sm:text-[40px] mb-6">
              Others who pre-ordered also{" "}
              <span className="text-brand-purple">grabbed this</span>
            </h3>
          ) : (
            <h3 className="font-cormorant font-semibold text-black text-[40px] mb-6">
              Check these out
            </h3>
          )}

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-12">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <section id="products-grid" className="scroll-mt-6">
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-12">
                  {products.slice(0, 3).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 text-gray-400 font-medium">
                  No products found in this category.
                </div>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}
