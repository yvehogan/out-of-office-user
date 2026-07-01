"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Max page buttons visible (default 5) */
  maxVisible?: number;
  className?: string;
}

function getPageRange(
  current: number,
  total: number,
  max: number,
): (number | "...")[] {
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(max / 2);
  let start = Math.max(1, current - half);
  let end = start + max - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - max + 1);
  }

  const pages: (number | "...")[] = [];

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total) {
    if (end < total - 1) pages.push("...");
    pages.push(total);
  }

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className,
}: PaginationProps) {
  const pages = getPageRange(currentPage, totalPages, maxVisible);
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn(
        "flex items-center justify-center gap-1 select-none w-fit mx-auto px-4 py-2 rounded-[40px]",
        className,
      )}
      style={{ backgroundColor: "#F7F7F7" }}
    >
      {/* Previous */}
      <button
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
          canPrev
            ? "text-[#0C111D] hover:text-brand-green cursor-pointer"
            : "text-gray-300 cursor-not-allowed",
        )}
      >
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-8 flex items-center justify-center text-sm text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all",
                page === currentPage
                  ? "bg-white text-[#0C111D] border border-[#5700FF] shadow-sm"
                  : "text-[#0C111D] hover:bg-gray-100 cursor-pointer",
              )}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => canNext && onPageChange(currentPage + 1)}
        disabled={!canNext}
        aria-label="Next page"
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
          canNext
            ? "text-[#0C111D] hover:text-brand-green cursor-pointer"
            : "text-gray-300 cursor-not-allowed",
        )}
      >
        <span className="hidden sm:inline">Next</span>
      </button>
    </nav>
  );
}
