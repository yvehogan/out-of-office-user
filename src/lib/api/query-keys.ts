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
    list: (params: { page: number; category: string }) =>
      ["products", "list", params] as const,
    detail: (slug: string) => ["products", "detail", slug] as const,
  },

  // ── Events ──
  events: {
    all: ["events"] as const,
    list: (params: { page: number }) => ["events", "list", params] as const,
    featured: ["events", "featured"] as const,
  },

  // ── Insights ──
  insights: {
    all: ["insights"] as const,
    list: (params: { page: number }) => ["insights", "list", params] as const,
    detail: (slug: string) => ["insights", "detail", slug] as const,
  },

  // ── Cart ──
  cart: {
    all: ["cart"] as const,
  },
} as const;
