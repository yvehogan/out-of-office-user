import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

import { getPaymentStatus } from "@/lib/api/services/payment.service";

/**
 * Fetch the current cart.
 */
export function usePayment(paymentReference: string | undefined) {
  return useQuery({
    queryKey: [...queryKeys.payment.all, paymentReference],
    queryFn: () => getPaymentStatus(paymentReference!),
    enabled: !!paymentReference,
  });
}
