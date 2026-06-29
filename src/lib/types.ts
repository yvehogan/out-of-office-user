// ── API Response Wrappers ──

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  total: number;
}

// ── Domain Models ──

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  price: string;
  image: string;
  featured?: boolean;
}

export interface Insight {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  image: string;
}

// ── Cart ──

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  color?: string;
  size?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface UpdateCartItemPayload {
  quantity: number;
}

// ── Checkout / Orders ──

export interface CheckoutPayload {
  fullName: string;
  email: string;
  phone: string;
  deliveryType: "pickup" | "doorstep";
  shippingAddress?: string;
  landmark?: string;
  state?: string;
  city?: string;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
}
