import apiClient from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, CheckoutPayload, Order } from "@/lib/types";

// ── Service Functions ──

export async function createOrder(
  payload: CheckoutPayload,
): Promise<ApiResponse<Order>> {
  const { data } = await apiClient.post<ApiResponse<Order>>(
    ENDPOINTS.ORDERS,
    payload,
  );
  return data;
}
