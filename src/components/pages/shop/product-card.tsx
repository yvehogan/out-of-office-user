import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data/shop-data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      className="bg-white  flex flex-col rounded-[40px] p-6 overflow-hidden"
      style={{ boxShadow: "0px 4px 17.6px 0px #0000001A" }}
    >
      {/* Image area — square, white background */}
      <div className="relative w-full aspect-4/3 bg-white flex items-center justify-center  overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center gap-2 flex-1">
        <h3 className="font-cormorant font-bold text-brand-purple2 text-2xl mb-4 ">
          {product.title}
        </h3>

        {/* Meta tags */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {product.meta.map((tag, i) => (
            <span
              key={i}
              className="text-brand-purple2 bg-black/5 py-1 px-2 rounded-[40px] text-base"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
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
              Buy Now
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
