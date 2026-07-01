import apiClient from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, Order, WaitlistPayload } from "@/lib/types";

// ── Service Functions ──

export async function createWaitlistEntry(
  payload: WaitlistPayload,
): Promise<ApiResponse<Order>> {
  const { data } = await apiClient.post<ApiResponse<Order>>(
    ENDPOINTS.WAITLIST,
    payload,
  );
  return data;
}
