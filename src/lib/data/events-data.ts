import { Event, Insight } from "@/lib/types";
import eventbg from "@/assets/images/eventbg.png";
import event2bg from "@/assets/images/event2bg.png";

const FEATURED_IMAGE = eventbg.src;
const CARD_IMAGE = event2bg.src;

const TITLES = ["Purpose & Career — Panel Discussion"];
const INSIGHT_TITLES = [
  "You don't have a career problem, you have an identity problem",
];

function generateEvents(count: number): Event[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    title: TITLES[i % TITLES.length],
    location: "Muson Centre, Lagos",
    date: "Sat, 15 May 2026",
    time: "07:30 PM",
    price: "₦15,000",
    image: i === 0 ? FEATURED_IMAGE : CARD_IMAGE,
    featured: i === 0,
  }));
}

function generateInsights(count: number): Insight[] {
  return Array.from({ length: count }, (_, i) => {
    const title = INSIGHT_TITLES[i % INSIGHT_TITLES.length];
    return {
      id: String(i + 1),
      slug: `${title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}-${i + 1}`,
      title,
      date: "Sat, 15 May 2026",
      time: "5 Mins Read",
      image: CARD_IMAGE,
      featured: i === 0,
    };
  });
}

export const ALL_EVENTS: Event[] = generateEvents(50);
export const ALL_INSIGHTS: Insight[] = generateInsights(20);

export const EVENTS_PER_PAGE = 6;

export function getPaginatedEvents(page: number): {
  events: Event[];
  totalPages: number;
  totalEvents: number;
  currentPage: number;
} {
  const nonFeaturedEvents = ALL_EVENTS.slice(1); // skip featured
  const totalEvents = nonFeaturedEvents.length;
  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * EVENTS_PER_PAGE;
  const events = nonFeaturedEvents.slice(start, start + EVENTS_PER_PAGE);

  return { events, totalPages, totalEvents, currentPage };
}

export const FEATURED_EVENT: Event = ALL_EVENTS[0];

export function getPaginatedInsights(page: number): {
  insights: Insight[];
  totalPages: number;
  totalEvents: number;
  currentPage: number;
} {
  const totalEvents = ALL_INSIGHTS.length;
  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * EVENTS_PER_PAGE;
  const insights = ALL_INSIGHTS.slice(start, start + EVENTS_PER_PAGE);

  return { insights, totalPages, totalEvents, currentPage };
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return ALL_INSIGHTS.find((insight) => insight.slug === slug);
}
