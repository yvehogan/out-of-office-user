/**
 * Centralised API endpoint constants.
 * Keeps magic strings out of service files and makes refactoring painless.
 */
export const ENDPOINTS = {
  // ── Products ──
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}` as const,
  DELETE_PRODUCT: (slug: string) => `/products/${slug}` as const,

  // ── Events ──
  EVENTS: "/events",
  FEATURED_EVENT: "/events/featured",

  // ── Insights ──
  INSIGHTS: "/insights",
  INSIGHT_DETAIL: (slug: string) => `/insights/${slug}` as const,

  // ── Cart ──
  CART: (cartKey: string) => `/cart/${cartKey}` as const,
  ADD_TO_CART: (cartKey: string) => `/cart/${cartKey}/items` as const,
  CLEAR_CART: (cartKey: string) => `/cart/${cartKey}/items` as const,
  UPDATE_CART_ITEM_QUANTITY: (cartKey: string, cartItemId: string) =>
    `/cart/${cartKey}/items/${cartItemId}` as const,
  DELETE_CART_ITEM: (cartKey: string, cartItemId: string) =>
    `/cart/${cartKey}/items/${cartItemId}` as const,

  // ── Checkout / Orders ──
  ORDERS: "/orders",

  // ── Waitlist ──
  WAITLIST: "/waitlist",
} as const;
