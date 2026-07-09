import Image from "next/image";
import Link from "next/link";
import shirt from "@/assets/images/shirt.png";
import journal from "@/assets/images/journal.png";
import cap from "@/assets/images/cap.png";
import hoodie from "@/assets/images/hoodie.png";
import type { StaticImageData } from "next/image";
import { ApiProduct } from "@/lib/types";
import { formatNaira } from "../shop/product-card";

interface ShopCardProps {
  title: string;
  image: string;
  // bgColor: string;
  // features?: string[];
  // price?: string;
  imagePosition: string;
  xlImagePosition?: string;
  product: ApiProduct;
}

const imageSrcByKey: Record<string, StaticImageData> = {
  cap,
  hoodie,
  journal,
  shirt,
};

export function ShopCard({
  title,
  image,
  // features = [],
  // bgColor,
  // price = "₦24,000",
  // imagePosition,
  // xlImagePosition,
  product,
}: ShopCardProps) {
  const imageSrc = imageSrcByKey[image] ?? image;

  const displayPrice =
    product?.type === "Variant" && product?.variantCount > 0
      ? product?.minVariantPrice
      : product?.price;

  const isOutOfStock = product?.stockStatus === "OutOfStock";

  return (
    <>
      <div
        className={`group  w-full min-h-82.5 p-6 gap-5 rounded-[40px]  flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(33,1,95,0.05)] xl:w-70 xl:h-85 2xl:w-100! 2xl:h-117! min-[1600px]:h-125 xl:p-6 2xl:p-[20px_20px_72px_20px]! xl:gap-0 bg-white`}
        style={{ boxShadow: "0px 4px 17.6px 0px #0000001A" }}
      >
        {/* <h3 className="relative z-10 font-ui text-[24px] font-semibold text-brand-purple2 self-start xl:text-[24px] 2xl:!text-[30px] tracking-tight">
          {title}
        </h3>

        Unified Responsive Image Wrapper
        <div
          className={`absolute flex items-end justify-end pointer-events-auto xl:-bottom-2 xl:-right-2 2xl:bottom-auto 2xl:right-auto ${imagePosition} ${xlImagePosition ?? ""} xl:w-[85%] xl:h-[80%] 2xl:w-auto 2xl:h-auto`}
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-auto h-[240px] sm:h-[280px] max-w-[280px] object-contain object-bottom block transition-transform duration-300 ease group-hover:scale-110 xl:w-full xl:h-full xl:object-bottom-right 2xl:relative 2xl:w-full 2xl:max-w-none 2xl:h-full"
          />
        </div> */}
        <article

        // className="bg-white  flex flex-col rounded-[40px] p-6 overflow-hidden"
        // style={{ boxShadow: "0px 4px 17.6px 0px #0000001A" }}
        >
          {/* Image area — square, white background */}
          <div className="relative w-full aspect-5/3 bg-white flex items-center justify-center  overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center items-center gap-2 flex-1">
            <h3 className="font-cormorant font-bold text-brand-purple2 text-[17px] mb-1">
              {title}
            </h3>

            {/* {features.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-[28px] bg-[#0000000A] px-1.5 py-1 font-sans text-xs font-light text-brand-purple2 sm:text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )} */}

            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-brand-purple2 bg-black/5 py-1 px-2 rounded-[40px] text-base">
                {product?.categoryName}
              </span>

              {product?.catalogueProperties
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
              {product?.stockStatus === "OutOfStock" && (
                <span className="text-red-500 bg-red-50 py-1 px-2 rounded-[40px] text-base">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center mt-6 gap-6 py-1 px-3 pr-1.5 rounded-[40px] border border-brand-green2 w-fit">
              <span className="text-brand-purple2 font-semibold text-[17px]">
                {formatNaira(displayPrice)}
              </span>
              <Link
                href={`/shop`}
                className="relative overflow-hidden bg-brand-green cursor-pointer font-sans text-base text-brand-navy h-9 font-medium px-4.5 py-3.5 rounded-[47px] active:scale-95 transition-all  flex items-center justify-center group"
              >
                <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
                <span className="w-27.5 text-center relative z-10 group-hover:text-white transition-colors duration-300 text-xs">
                  Buy Now
                </span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
