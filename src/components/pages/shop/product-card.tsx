import { ApiProduct } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: ApiProduct;
}

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const displayPrice =
    product.type === "Variant" && product.variantCount > 0
      ? product.minVariantPrice
      : product.price;

  return (
    <article
      className="bg-white  flex flex-col rounded-[40px] p-6 overflow-hidden"
      style={{ boxShadow: "0px 4px 17.6px 0px #0000001A" }}
    >
      {/* Image area — square, white background  */}
      <div className="relative w-full aspect-4/3 bg-white flex items-center justify-center  overflow-hidden">
        <Image
          src={product.primaryImageUrl}
          alt={product.name}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center gap-2 flex-1">
        <h3 className="font-cormorant font-bold text-brand-purple2 text-2xl mb-4 ">
          {product.name}
        </h3>

        {/* Meta tags */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-brand-purple2 bg-black/5 py-1 px-2 rounded-[40px] text-base">
            {product.categoryName}
          </span>

          {product.catalogueProperties
            ?.slice()
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((prop) => (
              <span
                key={prop.label}
                className="text-brand-purple2 bg-black/5 py-1 px-2 rounded-[40px] text-base"
              >
                {prop.count > 0
                  ? `${prop.count} ${prop.label}`
                  : `${prop.value} ${prop.label}`}
              </span>
            ))}
          {product.stockStatus === "OutOfStock" && (
            <span className="text-red-500 bg-red-50 py-1 px-2 rounded-[40px] text-base">
              Out of Stock
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center mt-6 gap-4 py-2 px-4 rounded-[40px] border border-brand-green2 w-fit">
          <span className="text-brand-purple2 font-semibold text-xl">
            {formatNaira(displayPrice)}
          </span>
          <Link
            href={`/shop/${product.id}`}
            className="relative whitespace-nowrap overflow-hidden bg-brand-green cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all  flex items-center justify-center group"
          >
            <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Pre-order Now
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
