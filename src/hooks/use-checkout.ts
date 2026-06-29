import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { createOrder } from "@/lib/api/services/checkout.service";
import type { CheckoutPayload } from "@/lib/types";

/**
 * Submit a checkout order.
 * On success, clears the cached cart so it's refetched fresh.
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CheckoutPayload) => createOrder(payload),

    onSuccess: () => {
      // Clear the cart cache — the cart is now empty after a successful order
      queryClient.removeQueries({ queryKey: queryKeys.cart.all });
    },
  });
}
