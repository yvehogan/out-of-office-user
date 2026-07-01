import apiClient from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type {
  PaginatedResponse,
  ApiResponse,
  ApiProduct,
  ApiProductDetail,
} from "@/lib/types";
import type { Product } from "@/lib/data/shop-data";

// ── Query Params ──

export interface GetProductsParams {
  pageNumber?: number;
  pageSize?: number;
  categoryIds?: string;
  status?: string;
  stockStatuses?: string[];
  searchTerm?: string;
}

// ── Service Functions ──

export async function getProducts(
  params: GetProductsParams = {},
): Promise<PaginatedResponse<ApiProduct>> {
  const { data } = await apiClient.get<PaginatedResponse<ApiProduct>>(
    ENDPOINTS.PRODUCTS,
    { params },
  );
  return data;
}

export async function getProductById(
  id: string,
): Promise<ApiResponse<ApiProductDetail>> {
  const { data } = await apiClient.get<ApiResponse<ApiProductDetail>>(
    `${ENDPOINTS.PRODUCTS}/${id}`,
  );
  return data;
}
