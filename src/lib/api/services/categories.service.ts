import apiClient from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, CategoryItem } from "@/lib/types";

// ── Service Functions ──

// export async function getCategories(): Promise<ApiResponse<Category>> {
//   const { data } = await apiClient.get<ApiResponse<Category>>(
//     ENDPOINTS.PRODUCT_CATEGORIES,
//   );
//   return data;
// }

export async function getCategories(): Promise<ApiResponse<CategoryItem[]>> {
  const { data } = await apiClient.get<ApiResponse<CategoryItem[]>>(
    ENDPOINTS.PRODUCT_CATEGORIES,
  );
  return data;
}
