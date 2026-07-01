import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "@/lib/api/services/cart.service";
import type {
  ApiResponse,
  Cart,
  AddToCartPayload,
  UpdateCartItemPayload,
} from "@/lib/types";
import { getCartKey } from "@/lib/cart-key";

/**
 * Fetch the current cart.
 */
export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart.all,
    queryFn: getCart,
    enabled: !!getCartKey(),
  });
}

/**
 * Add a product to the cart.
 * Optimistically updates the cache, rolling back on error.
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) => addToCart(payload),

    onMutate: async () => {
      // Cancel any in-flight cart fetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.all });
      const previous = queryClient.getQueryData<ApiResponse<Cart>>(
        queryKeys.cart.all,
      );
      return { previous };
    },

    onError: (_err, _payload, context) => {
      // Roll back to the previous cart state
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.cart.all, context.previous);
      }
    },

    onSettled: () => {
      // Always refetch cart after mutation settles to stay in sync
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

/**
 * Update a cart item (e.g. change quantity).
 * Optimistically patches the item in the cache.
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCartItemPayload;
    }) => updateCartItem(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.all });
      const previous = queryClient.getQueryData<ApiResponse<Cart>>(
        queryKeys.cart.all,
      );

      // Optimistic update: patch the item's quantity
      if (previous) {
        const updated: ApiResponse<Cart> = {
          ...previous,
          data: {
            ...previous.data,
            items: previous.data.items.map((item) =>
              item.id === id ? { ...item, ...payload } : item,
            ),
          },
        };
        queryClient.setQueryData(queryKeys.cart.all, updated);
      }

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.cart.all, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

/**
 * Remove an item from the cart.
 * Optimistically removes the item from the cache.
 */
export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeCartItem(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.all });
      const previous = queryClient.getQueryData<ApiResponse<Cart>>(
        queryKeys.cart.all,
      );

      // Optimistic update: remove the item
      if (previous) {
        const updated: ApiResponse<Cart> = {
          ...previous,
          data: {
            ...previous.data,
            items: previous.data.items.filter((item) => item.id !== id),
          },
        };
        queryClient.setQueryData(queryKeys.cart.all, updated);
      }

      return { previous };
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.cart.all, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}
