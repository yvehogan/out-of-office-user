import apiClient from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Event, Insight, PaginatedResponse, ApiResponse } from "@/lib/types";

// ── Query Params ──

export interface GetEventsParams {
  page?: number;
  limit?: number;
}

export interface GetInsightsParams {
  page?: number;
  limit?: number;
}

// ── Service Functions ──

export async function getEvents(
  params: GetEventsParams = {},
): Promise<PaginatedResponse<Event>> {
  const { data } = await apiClient.get<PaginatedResponse<Event>>(
    ENDPOINTS.EVENTS,
    { params },
  );
  return data;
}

export async function getFeaturedEvent(): Promise<ApiResponse<Event>> {
  const { data } = await apiClient.get<ApiResponse<Event>>(
    ENDPOINTS.FEATURED_EVENT,
  );
  return data;
}

export async function getInsights(
  params: GetInsightsParams = {},
): Promise<PaginatedResponse<Insight>> {
  const { data } = await apiClient.get<PaginatedResponse<Insight>>(
    ENDPOINTS.INSIGHTS,
    { params },
  );
  return data;
}

export async function getInsightBySlug(
  slug: string,
): Promise<ApiResponse<Insight>> {
  const { data } = await apiClient.get<ApiResponse<Insight>>(
    ENDPOINTS.INSIGHT_DETAIL(slug),
  );
  return data;
}
