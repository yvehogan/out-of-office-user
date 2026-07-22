"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/pages/shop/product-card";
import { Footer } from "@/components/Footer";
import QuantityControl from "@/components/pages/cart/quantity";
import { useProduct, useProducts } from "@/hooks/use-products";
import { ProductCardSkeleton } from "@/components/pages/shop/product-skeleton";
import { useRouter } from "next/navigation";
import { useAddToCart } from "@/hooks/use-cart";
import { ProductDetailSkeleton } from "@/components/pages/shop/product-detail-skeleton";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [item, setItem] = useState(1);

  const { data: productResponse, isLoading, error } = useProduct(id);

  const { data: productsResponse, isLoading: productsLoading } = useProducts();

  const products = productsResponse?.data ?? [];

  const productData = productResponse?.data;

  const addToCart = useAddToCart();

  const images = productData?.images ?? [];
  const sortedImages = [...images].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );

  const [activeImage, setActiveImage] = useState(0);

  const mainImage = sortedImages[activeImage]?.url ?? sortedImages[0]?.url;

  // ── Variant selection ──
  const attributes = productData?.attributes ?? [];
  const variants = productData?.variants ?? [];

  // Build a map of attributeId -> unique list of { id, value } options,
  // sourced from the variants' attributeValues
  const attributeOptions = useMemo(() => {
    const map = new Map<
      string,
      { attributeName: string; values: { id: string; value: string }[] }
    >();

    for (const variant of variants) {
      for (const av of variant.attributeValues) {
        if (!map.has(av.attributeId)) {
          map.set(av.attributeId, {
            attributeName: av.attributeName,
            values: [],
          });
        }
        const entry = map.get(av.attributeId)!;
        if (!entry.values.some((v) => v.id === av.attributeValueId)) {
          entry.values.push({ id: av.attributeValueId, value: av.value });
        }
      }
    }

    return attributes
      .slice()
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((attr) => ({
        attributeId: attr.attributeId,
        name: attr.name,
        values: map.get(attr.attributeId)?.values ?? [],
      }));
  }, [attributes, variants]);

  // selected attributeValueId per attributeId
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {},
  );

  const handleSelectValue = (attributeId: string, valueId: string) => {
    setSelectedValues((prev) => ({ ...prev, [attributeId]: valueId }));
  };

  // find the variant matching all currently selected attribute values
  const selectedVariant = useMemo(() => {
    if (variants.length === 0) return undefined;
    if (Object.keys(selectedValues).length !== attributeOptions.length) {
      return undefined; // not all attributes picked yet
    }

    return variants.find((variant) =>
      variant.attributeValues.every(
        (av) => selectedValues[av.attributeId] === av.attributeValueId,
      ),
    );
  }, [variants, selectedValues, attributeOptions.length]);

  const hasVariants = variants.length > 0;
  const allAttributesSelected =
    Object.keys(selectedValues).length === attributeOptions.length;

  const displayPrice = selectedVariant?.sellingPrice ?? productData?.price;

  const isVariantMissing = hasVariants && !selectedVariant;

  const isBuyDisabled =
    addToCart.isPending ||
    isVariantMissing ||
    selectedVariant?.stockStatus === "OutOfStock";

  const handleBuyNow = () => {
    if (!productData) return;

    addToCart.mutate(
      {
        productId: productData.id,
        quantity: item,
        ...(selectedVariant ? { productVariantId: selectedVariant.id } : {}),
      },
      {
        onSuccess: () => {
          router.push(`/cart?id=${productData.id}`);
        },
      },
    );
  };

  console.log(sortedImages, "sortedImages");

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white animate-slide-right">
        <main className="flex-1 max-w-350  mt-14 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          {isLoading ? (
            <ProductDetailSkeleton />
          ) : error || !productData ? (
            <div className="py-24 text-center text-red-500 text-lg font-medium">
              Failed to load product. Please try again.
            </div>
          ) : (
            <>
              {/* product detail */}
              <div className="max-w-6xl mx-auto ">
                <div className="flex flex-col md:flex-row  gap-6  gap-x-14 justify-between">
                  <div className="w-full md:w-1/2 ">
                    <article className="">
                      <nav
                        aria-label="Breadcrumb"
                        className="mx-24 -mt-10 mb-10 flex sm:hidden items-center  gap-1 text-sm text-gray-400"
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
                      {/* Main Image */}
                      <div className="relative w-full aspect-3/3 overflow-hidden ">
                        {mainImage && (
                          <Image
                            src={mainImage}
                            alt={productData?.name ?? "Product image"}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 500px"
                            priority
                          />
                        )}
                      </div>

                      {/* Thumbnails */}
                      <div className="flex  flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 mt-6 ">
                        {sortedImages.map((img, i) => (
                          <button
                            key={img.id}
                            onClick={() => setActiveImage(i)}
                            className={`relative flex justify-center  w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border-2 transition-all cursor-pointer ${
                              activeImage === i
                                ? "border-brand-purple"
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            <Image
                              src={img.url}
                              alt={productData?.name ?? "Product image"}
                              width={80}
                              height={80}
                              className="object-cover"
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
                      className="sm:flex hidden items-center  gap-1 text-sm text-gray-400"
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
                      <h2 className="font-cormorant font-bold text-brand-purple2 text-3xl sm:text-4xl md:text-6xl">
                        {productData?.name}
                      </h2>

                      <div className="max-w-110.5 mt-3 space-y-6">
                        <p className="text-sm  leading-5.5! tracking-[1%]! font-light text-brand-purple2">
                          {productData?.shortDescription}
                        </p>
                      </div>

                      {/* Attribute / Variant selectors */}
                      {attributeOptions.map((attr) => (
                        <div
                          key={attr.attributeId}
                          className="flex items-center gap-3 "
                        >
                          <p className="text-brand-purple2 font-medium">
                            {attr.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            {attr.values.map((val) => {
                              const isSelected =
                                selectedValues[attr.attributeId] === val.id;
                              return (
                                <button
                                  key={val.id}
                                  onClick={() =>
                                    handleSelectValue(attr.attributeId, val.id)
                                  }
                                  className={`py-1 px-3 font-normal cursor-pointer rounded-[40px] text-base text-brand-purple2 transition-all ${
                                    isSelected
                                      ? "border border-brand-green2"
                                      : "border border-[#00000029]"
                                  }`}
                                >
                                  {val.value}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {/* {hasVariants && !allAttributesSelected && (
                        <p className="text-sm text-gray-400">
                          Select all options to continue.
                        </p>
                      )} */}

                      {hasVariants &&
                        allAttributesSelected &&
                        !selectedVariant && (
                          <p className="text-sm text-red-500">
                            This combination is unavailable.
                          </p>
                        )}

                      {selectedVariant?.stockStatus === "OutOfStock" && (
                        <p className="text-sm text-red-500">Out of stock.</p>
                      )}

                      <div className="mt-2 text-brand-purple2 flex items-center gap-2">
                        <p>Quantity</p>
                        <QuantityControl
                          quantity={item}
                          onIncrease={() => setItem(item + 1)}
                          onDecrease={() =>
                            setItem((prev) => Math.max(0, prev - 1))
                          }
                        />
                      </div>

                      <div className="flex items-center mt-6 gap-6 py-2 px-4 rounded-[40px] border border-brand-green2 w-fit">
                        <span className="text-brand-purple2 font-semibold text-xl sm:text-2xl">
                          ₦{displayPrice?.toLocaleString()}
                        </span>

                        <button
                          onClick={handleBuyNow}
                          disabled={isBuyDisabled}
                          className="relative  disabled:cursor-not-allowed overflow-hidden bg-brand-green cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all flex items-center justify-center group"
                        >
                          <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
                          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                            {addToCart.isPending ? "Adding..." : "Add to cart"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* description */}
                <div className="mt-14 space-y-3">
                  <h3 className="font-cormorant font-bold text-brand-purple2 text-[20px]">
                    Description
                  </h3>

                  <p className=" text-sm font-light text-[#4D4D4D]">
                    {productData?.longDescription}
                  </p>
                </div>
              </div>
              <hr className="mt-24 border-t" />
              {/* other products */}
              <div className="mt-6 ">
                {/* <h3 className="font-cormorant font-semibold text-black text-[40px] mb-6">
                  Complete the{" "}
                  <span className="text-brand-purple">experience</span>
                </h3> */}

                <h3 className="font-cormorant font-semibold text-black text-[40px] mb-6">
                  Others who ordered also{" "}
                  <span className="text-brand-purple">grabbed this</span>
                </h3>

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
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
