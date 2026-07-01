import wipImg from "@/assets/images/oneFace.png";
import journalImg from "@/assets/images/journal.png";
import shirtImg from "@/assets/images/shirt.png";

export type ProductCategory = string;

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: Exclude<ProductCategory, "All">;
  meta: string[]; // e.g. ["174 Pages", "English Language"]
  price: string;
  image: string;
}

// Product images from assets
const BOOK_IMG = wipImg.src;
const SHIRT_IMG = shirtImg.src;
const HOODIE_IMG = shirtImg.src;
const JOURNAL_IMG = journalImg.src;

const BASE_PRODUCTS: Omit<Product, "id" | "slug">[] = [
  {
    title: "Work In Progress",
    category: "Books",
    meta: ["174 Pages", "English Language"],
    price: "₦24,000",
    image: BOOK_IMG,
  },
  {
    title: "Out of Office Shirt",
    category: "T-shirts",
    meta: ["4 Colours", "Sizes: S, M, L, XL"],
    price: "₦24,000",
    image: SHIRT_IMG,
  },
  {
    title: "Journal",
    category: "Journals",
    meta: ["4 Colours"],
    price: "₦24,000",
    image: JOURNAL_IMG,
  },
  {
    title: "OOO Hoodie",
    category: "Hoodies",
    meta: ["3 Colours", "Sizes: S, M, L, XL, XXL"],
    price: "₦32,000",
    image: HOODIE_IMG,
  },
  {
    title: "Work In Progress",
    category: "Books",
    meta: ["174 Pages", "English Language"],
    price: "₦24,000",
    image: BOOK_IMG,
  },
  {
    title: "Journal",
    category: "Journals",
    meta: ["4 Colours"],
    price: "₦24,000",
    image: JOURNAL_IMG,
  },
  {
    title: "Out of Office Shirt",
    category: "T-shirts",
    meta: ["4 Colours", "Sizes: S, M, L, XL"],
    price: "₦24,000",
    image: SHIRT_IMG,
  },
  {
    title: "Work In Progress",
    category: "Books",
    meta: ["174 Pages", "English Language"],
    price: "₦24,000",
    image: BOOK_IMG,
  },
  {
    title: "Journal",
    category: "Journals",
    meta: ["4 Colours"],
    price: "₦24,000",
    image: JOURNAL_IMG,
  },
  {
    title: "OOO Hoodie",
    category: "Hoodies",
    meta: ["3 Colours", "Sizes: S, M, L, XL, XXL"],
    price: "₦32,000",
    image: HOODIE_IMG,
  },
  {
    title: "Out of Office Shirt",
    category: "T-shirts",
    meta: ["4 Colours", "Sizes: S, M, L, XL"],
    price: "₦24,000",
    image: SHIRT_IMG,
  },
  {
    title: "Work In Progress",
    category: "Books",
    meta: ["174 Pages", "English Language"],
    price: "₦24,000",
    image: BOOK_IMG,
  },
];

// Repeat to simulate a larger catalogue
export const ALL_PRODUCTS: Product[] = Array.from({ length: 4 }, (_, round) =>
  BASE_PRODUCTS.map((p, i) => {
    const id = `${round}-${i}`;
    return {
      ...p,
      id,
      slug: `${p.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}-${id}`,
    };
  }),
).flat();

export const PRODUCTS_PER_PAGE = 9;

export const CATEGORIES: ProductCategory[] = [
  "All",
  "Books",
  "T-shirts",
  "Hoodies",
  "Journals",
];

export function getPaginatedProducts(
  page: number,
  category: ProductCategory,
): {
  products: Product[];
  totalPages: number;
  currentPage: number;
} {
  const filtered =
    category === "All"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === category);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PRODUCTS_PER_PAGE),
  );
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const products = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  return { products, totalPages, currentPage };
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export interface CartItemType {
  id: number;
  product: string;
  price: number;
  quantity: number;
  options: string[];
}

export const cartData: CartItemType[] = [
  {
    id: 1,
    product: "Out of Office",
    price: 24000,
    quantity: 1,
    options: [],
  },
  {
    id: 2,
    product: "Out of Office Shirt",
    price: 15000,
    quantity: 1,
    options: ["XL", "Black"],
  },
  {
    id: 3,
    product: "Journal",
    price: 5000,
    quantity: 1,
    options: ["Green"],
  },
  {
    id: 4,
    product: "Mumuniche",
    price: 10000,
    quantity: 1,
    options: [],
  },
];
