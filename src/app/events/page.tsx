"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FeaturedEvent } from "@/components/pages/events/featured-event";
import { EventCard } from "@/components/pages/events/event-card";
import { Pagination } from "@/components/pagination";
import { Footer } from "@/components/Footer";
import { FEATURED_EVENT, getPaginatedEvents } from "@/lib/data/events-data";

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    events,
    totalPages,
    currentPage: page,
  } = getPaginatedEvents(currentPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to grid smoothly
    // const grid = document.getElementById("events-grid");
    // if (grid) {
    //   grid.scrollIntoView({ behavior: "smooth", block: "start" });
    // }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white animate-slide-up">
      <main className="flex-1 max-w-350 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Page heading */}
        <div className="text-center mb-6">
          <h1 className="font-cormorant text-brand-purple2 font-bold text-5xl sm:text-6xl md:text-[110px] mb-3">
            Event<span className="italic">s</span>
          </h1>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-1 text-sm text-gray-400"
          >
            <Link
              href="/"
              className="hover:text-brand-navy transition-colors text-black font-semibold text-1base"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
            <Link
              href="/events"
              className="text-brand-purple font-semibold text-base"
            >
              Events
            </Link>
          </nav>
        </div>

        {/* Featured event */}
        <section className="mb-10">
          <FeaturedEvent event={FEATURED_EVENT} />
        </section>

        {/* Event grid */}
        <section id="events-grid" className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            maxVisible={5}
            className="mt-6"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
