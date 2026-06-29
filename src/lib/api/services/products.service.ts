import apiClient from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { PaginatedResponse, ApiResponse } from "@/lib/types";
import type { Product } from "@/lib/data/shop-data";

// ── Query Params ──

export interface GetProductsParams {
  page?: number;
  category?: string;
  limit?: number;
}

// ── Service Functions ──

export async function getProducts(
  params: GetProductsParams = {},
): Promise<PaginatedResponse<Product>> {
  const { data } = await apiClient.get<PaginatedResponse<Product>>(
    ENDPOINTS.PRODUCTS,
    { params },
  );
  return data;
}

export async function getProductBySlug(
  slug: string,
): Promise<ApiResponse<Product>> {
  const { data } = await apiClient.get<ApiResponse<Product>>(
    ENDPOINTS.PRODUCT_DETAIL(slug),
  );
  return data;
}
