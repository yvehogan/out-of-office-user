/**
 * Centralised API endpoint constants.
 * Keeps magic strings out of service files and makes refactoring painless.
 */
export const ENDPOINTS = {
  // ── Products ──
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string) => `/products/${id}` as const,
  DELETE_PRODUCT: (id: string) => `/products/${id}` as const,

  //Product Categories
  PRODUCT_CATEGORIES: "/categories",

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
  GET_ORDERS: "/orders/summary",
  ORDER_SUMMARY: (id: string) => `/orders/${id}` as const,
  CHECKOUT_ORDER: (cartKey: string) => `/checkout/${cartKey}` as const,

  // PAYMENT VALIDATION
  PAYMENT_STATUS: (paymentReference: string) =>
    `/payments/alatpay/status/${paymentReference}` as const,

  // ── Waitlist ──
  WAITLIST: "/waitlist/join",
} as const;
