import apiClient from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PaymentStatus } from "@/lib/types";

export async function getPaymentStatus(
  paymentReference: string,
): Promise<ApiResponse<PaymentStatus>> {
  const { data } = await apiClient.get<ApiResponse<PaymentStatus>>(
    ENDPOINTS.PAYMENT_STATUS(paymentReference),
  );
  return data;
}
