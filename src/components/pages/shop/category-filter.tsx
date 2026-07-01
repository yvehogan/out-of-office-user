// "use client";

// import { cn } from "@/lib/utils";
// import { CATEGORIES, ProductCategory } from "@/lib/data/shop-data";

// interface CategoryFilterProps {
//   active: ProductCategory;
//   onChange: (cat: ProductCategory) => void;
// }

// export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
//   return (
//     <div className="flex items-center justify-center gap-2 flex-wrap rounded-[40px] border py-2 px-3">
//       {CATEGORIES.map((cat) => (
//         <button
//           key={cat}
//           onClick={() => onChange(cat)}
//           className={cn(
//             "px-5 py-2 rounded-3xl cursor-pointer text-base font-semibold transition-all duration-200",
//             active === cat
//               ? "bg-brand-purple  text-white "
//               : "text-brand-purple2 ",
//           )}
//         >
//           {cat}
//         </button>
//       ))}
//     </div>
//   );
// }

"use client";

import { cn } from "@/lib/utils";
import { ProductCategory } from "@/lib/data/shop-data";

interface CategoryFilterProps {
  active: ProductCategory;
  onChange: (cat: ProductCategory) => void;
  categories: ProductCategory[];
}

export function CategoryFilter({
  active,
  onChange,
  categories,
}: CategoryFilterProps) {
  return (
    <div className="w-full sm:w-fit lg:w-auto overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 rounded-[40px] border py-2 px-3 min-w-fit">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={cn(
              "px-4 sm:px-5 py-2 rounded-3xl cursor-pointer text-sm sm:text-base font-semibold transition-all duration-200 whitespace-nowrap shrink-0",
              active === cat
                ? "bg-brand-purple text-white"
                : "text-brand-purple2 ",
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
