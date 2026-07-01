import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import {
  getProducts,
  type GetProductsParams,
  getProductById,
} from "@/lib/api/services/products.service";
import { getCategories } from "@/lib/api/services/categories.service";
import { ApiProduct, ApiResponse } from "@/lib/types";

/**
 * Fetch a paginated, optionally filtered list of products.
 * Uses `placeholderData: keepPreviousData` so the UI doesn't flash
 * empty while switching pages.
 */
export function useProducts(params: GetProductsParams = {}) {
  const {
    pageNumber = 1,
    pageSize = 12,
    categoryIds,
    status,
    stockStatuses,
    searchTerm,
  } = params;

  return useQuery({
    queryKey: queryKeys.products.list({
      pageNumber,
      pageSize,
      categoryIds,
      status,
      stockStatuses,
      searchTerm,
    }),
    queryFn: () =>
      getProducts({
        pageNumber,
        pageSize,
        categoryIds,
        status,
        stockStatuses,
        searchTerm,
      }),
    placeholderData: keepPreviousData,
  });
}

/**
 * Fetch a single product by its slug.
 * Disabled when `slug` is falsy to avoid unnecessary requests.
 */
// export function useProduct(slug: string | undefined) {
//   return useQuery({
//     queryKey: queryKeys.products.detail(slug ?? ""),
//     queryFn: () => getProductBySlug(slug!),
//     enabled: !!slug,
//   });
// }


export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.products.detail(id ?? ""),
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });
}
/**
 * Fetch all categories.
 */
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => getCategories(),
  });
}
