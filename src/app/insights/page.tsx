"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Pagination } from "@/components/pagination";
import { getPaginatedInsights } from "@/lib/data/events-data";
import { InsightCard } from "@/components/pages/insights/insight-card";
import { Footer } from "@/components/Footer";

export default function InsightsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    insights,
    totalPages,
    currentPage: page,
  } = getPaginatedInsights(currentPage);

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
      {/* <Navbar /> */}

      <main className="flex-1 max-w-350 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Page heading */}
        <div className="text-center mb-6">
          <h1 className="font-cormorant text-brand-purple2 font-bold text-5xl sm:text-6xl md:text-[110px] mb-8">
            Insights
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
              href="/insights"
              className="text-brand-purple font-semibold text-base"
            >
              Insights
            </Link>
          </nav>
        </div>

        {/* Event grid */}
        <section
          id="events-grid"
          // className="scroll-mt-24"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 mb-16">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
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
