export function ProductDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="flex flex-col md:flex-row gap-6 gap-x-14 justify-between">
        {/* Image column */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-3/3 bg-black/5 rounded-2xl" />

          <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 mt-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl bg-black/5"
              />
            ))}
          </div>
        </div>

        {/* Info column */}
        <div className="space-y-6 md:w-1/2">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-10 bg-black/10 rounded-full" />
            <div className="h-4 w-4 bg-black/10 rounded-full" />
            <div className="h-4 w-10 bg-black/10 rounded-full" />
            <div className="h-4 w-4 bg-black/10 rounded-full" />
            <div className="h-4 w-16 bg-black/10 rounded-full" />
          </div>

          <div className="flex flex-col gap-4">
            {/* Title */}
            <div className="h-12 w-3/4 bg-black/10 rounded-full" />

            {/* Short description */}
            <div className="max-w-110.5 mt-3 space-y-2">
              <div className="h-4 w-full bg-black/10 rounded-full" />
              <div className="h-4 w-5/6 bg-black/10 rounded-full" />
              <div className="h-4 w-2/3 bg-black/10 rounded-full" />
            </div>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-2">
              <div className="h-4 w-16 bg-black/10 rounded-full" />
              <div className="h-8 w-24 bg-black/10 rounded-full" />
            </div>

            {/* Price + CTA */}
            <div className="flex items-center mt-6 gap-6 py-2 px-4 rounded-[40px] border border-black/5 w-fit">
              <div className="h-6 w-16 bg-black/10 rounded-full" />
              <div className="h-12 w-32 bg-black/10 rounded-[47px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="mt-14 space-y-3">
        <div className="h-5 w-32 bg-black/10 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-black/10 rounded-full" />
          <div className="h-4 w-full bg-black/10 rounded-full" />
          <div className="h-4 w-2/3 bg-black/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
