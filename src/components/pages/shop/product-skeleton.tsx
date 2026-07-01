export function ProductCardSkeleton() {
  return (
    <article
      className="bg-white flex flex-col rounded-[40px] p-6 overflow-hidden animate-pulse"
      style={{ boxShadow: "0px 4px 17.6px 0px #0000001A" }}
    >
      {/* Image area */}
      <div className="relative w-full aspect-4/3 bg-black/5 rounded-3xl" />

      {/* Content */}
      <div className="flex flex-col justify-center items-center gap-2 flex-1 mt-4">
        <div className="h-6 w-3/4 bg-black/10 rounded-full mb-4" />

        {/* Meta tags */}
        <div className="flex items-center gap-x-3">
          <div className="h-7 w-20 bg-black/5 rounded-[40px]" />
          <div className="h-7 w-24 bg-black/5 rounded-[40px]" />
        </div>

        {/* Price + CTA */}
        <div className="flex items-center mt-6 gap-6 py-2 px-4 rounded-[40px] border border-black/5 w-fit">
          <div className="h-6 w-16 bg-black/10 rounded-full" />
          <div className="h-12 w-28 bg-black/10 rounded-[47px]" />
        </div>
      </div>
    </article>
  );
}
