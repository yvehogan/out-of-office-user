/**
 * Query-key factory for TanStack Query.
 *
 * Using a factory prevents key collisions and makes cache invalidation
 * predictable — e.g. `queryClient.invalidateQueries({ queryKey: queryKeys.cart.all })`.
 */
export const queryKeys = {
  // ── Products ──
  products: {
    all: ["products"] as const,
    list: (params: {
      pageNumber: number;
      pageSize: number;
      categoryIds?: string;
      status?: string;
      stockStatuses?: string[];
      searchTerm?: string;
    }) => ["products", "list", params] as const,
    detail: (id: string) => ["products", "detail", id] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  checkout: {
    all: ["checkout"] as const,
  },
  cart: {
    all: ["cart"] as const,
  },
  waitlist: {
    all: ["waitlist"] as const,
  },
  payment: {
    all: ["payment"] as const,
  },

  events: {
    all: ["events"] as const,
    list: (params: { page: number }) => ["events", "list", params] as const,
    featured: ["events", "featured"] as const,
  },

  insights: {
    all: ["insights"] as const,
    list: (params: { page: number }) => ["insights", "list", params] as const,
    detail: (slug: string) => ["insights", "detail", slug] as const,
  },
} as const;
