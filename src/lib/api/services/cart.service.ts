import apiClient from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { getCartKey } from "@/lib/cart-key";
import type {
  ApiResponse,
  Cart,
  AddToCartPayload,
  UpdateCartItemPayload,
  CartItem,
} from "@/lib/types";

// ── Service Functions ──

export async function getCart(): Promise<ApiResponse<Cart>> {
  const cartKey = getCartKey();
  const { data } = await apiClient.get<ApiResponse<Cart>>(
    ENDPOINTS.CART(cartKey),
  );
  return data;
}

export async function addToCart(
  payload: AddToCartPayload,
): Promise<ApiResponse<CartItem>> {
  const cartKey = getCartKey();
  const { data } = await apiClient.post<ApiResponse<CartItem>>(
    ENDPOINTS.ADD_TO_CART(cartKey),
    payload,
  );
  return data;
}

export async function updateCartItem(
  id: string,
  payload: UpdateCartItemPayload,
): Promise<ApiResponse<CartItem>> {
  const cartKey = getCartKey();
  const { data } = await apiClient.patch<ApiResponse<CartItem>>(
    ENDPOINTS.UPDATE_CART_ITEM_QUANTITY(cartKey, id),
    payload,
  );
  return data;
}

export async function removeCartItem(
  id: string,
): Promise<ApiResponse<{ id: string }>> {
  const cartKey = getCartKey();
  const { data } = await apiClient.delete<ApiResponse<{ id: string }>>(
    ENDPOINTS.DELETE_CART_ITEM(cartKey, id),
  );
  return data;
}
