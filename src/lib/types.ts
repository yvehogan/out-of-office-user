export interface ApiResponse<T> {
  data: T;
  message?: string;
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
  productVariantId: string | null;
  productName: string;
  productSku: string;
  categoryId: string;
  categoryName: string;
  selectedOptions: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  cartKey: string;
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  totalAmount: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  productVariantId?: string;
}

export interface UpdateCartItemPayload {
  quantity: number;
}

// ── Checkout / Orders ──

export interface CheckoutPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  redirectUrl: string;
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

// ── Cart ──

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdDate: string;
}

// PRODUCTS

// ── API Types ──

export interface CatalogueProperty {
  label: string;
  value: string;
  count: number;
  displayFormat: string;
  displayOrder: number;
}

export type ProductStatus = "Draft" | "Active" | "Archived";
export type StockStatus = "InStock" | "OutOfStock" | "LowStock";
export type ProductType = "Simple" | "Variant";

export interface ApiProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  unitsAvailable: number;
  unitsSold: number;
  status: ProductStatus;
  stockStatus: StockStatus;
  type: ProductType;
  categoryId: string;
  categoryName: string;
  primaryImageUrl: string;
  variantCount: number;
  minVariantPrice: number;
  maxVariantPrice: number;
  createdDate: string;
  catalogueProperties?: CatalogueProperty[];
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message?: string;
  data: T[];
  errors: string[];
  pagination: Pagination;
}

export interface ProductImage {
  id: string;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  displayOrder: number;
  url: string;
}

// export interface ApiProductDetail extends ApiProduct {
//   images: ProductImage[];
//   longDescription?: string;
//   shortDescription?: string;
// }

//Product detail Attributes

export interface ProductAttribute {
  id: string;
  attributeId: string;
  name: string;
  slug: string;
  displayOrder: number;
}

export interface VariantAttributeValue {
  attributeId: string;
  attributeName: string;
  attributeValueId: string;
  value: string;
  slug: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  barcode: string | null;
  sellingPrice: number;
  costPrice: number;
  unitsAvailable: number;
  unitsSold: number;
  reorderLevel: number | null;
  isActive: boolean;
  stockStatus: StockStatus;
  attributeValues: VariantAttributeValue[];
}

export interface ApiProductDetail extends ApiProduct {
  shortDescription?: string;
  longDescription?: string;
  images: ProductImage[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  createdBy?: string;
  updatedDate?: string | null;
  updatedBy?: string | null;
}

// WAITLIST
export interface WaitlistPayload {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

export interface PaymentStatus {
  paymentReference: string;
  status: string;
  message: string;
  amount: string;
  currency: string;
}
