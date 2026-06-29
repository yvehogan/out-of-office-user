import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import {
  getProducts,
  getProductBySlug,
  type GetProductsParams,
} from "@/lib/api/services/products.service";

/**
 * Fetch a paginated, optionally filtered list of products.
 * Uses `placeholderData: keepPreviousData` so the UI doesn't flash
 * empty while switching pages.
 */
export function useProducts(params: GetProductsParams = {}) {
  const { page = 1, category = "All" } = params;

  return useQuery({
    queryKey: queryKeys.products.list({ page, category }),
    queryFn: () => getProducts({ page, category }),
    placeholderData: keepPreviousData,
  });
}

/**
 * Fetch a single product by its slug.
 * Disabled when `slug` is falsy to avoid unnecessary requests.
 */
export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.products.detail(slug ?? ""),
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug,
  });
}
