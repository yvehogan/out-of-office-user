import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import {
  getEvents,
  getFeaturedEvent,
  getInsights,
  getInsightBySlug,
  type GetEventsParams,
  type GetInsightsParams,
} from "@/lib/api/services/events.service";

/**
 * Fetch a paginated list of events.
 */
export function useEvents(params: GetEventsParams = {}) {
  const { page = 1 } = params;

  return useQuery({
    queryKey: queryKeys.events.list({ page }),
    queryFn: () => getEvents({ page }),
    placeholderData: keepPreviousData,
  });
}

/**
 * Fetch the single featured/hero event.
 * Rarely changes, so we use a long staleTime.
 */
export function useFeaturedEvent() {
  return useQuery({
    queryKey: queryKeys.events.featured,
    queryFn: getFeaturedEvent,
    staleTime: Infinity,
  });
}

/**
 * Fetch a paginated list of insights.
 */
export function useInsights(params: GetInsightsParams = {}) {
  const { page = 1 } = params;

  return useQuery({
    queryKey: queryKeys.insights.list({ page }),
    queryFn: () => getInsights({ page }),
    placeholderData: keepPreviousData,
  });
}

/**
 * Fetch a single insight by slug.
 */
export function useInsight(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.insights.detail(slug ?? ""),
    queryFn: () => getInsightBySlug(slug!),
    enabled: !!slug,
  });
}
