interface BeyondCardProps {
  href: string;
  image: string;
  clipId: string;
  title: string;
  description: string;
}

export function BeyondCard({ href, image, clipId, title, description }: BeyondCardProps) {
  return (
    <a href={href} className="group w-full h-auto no-underline text-brand-purple2 flex flex-col transition-transform duration-300 ease xl:w-[405px]">
      <svg width="100%" height="auto" viewBox="0 0 405 361" fill="none" className="overflow-visible" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <clipPath id={clipId}>
            <path d="M364.491 0C386.583 9.89579e-05 404.491 17.9087 404.491 40V275C404.491 291.569 391.06 305 374.491 305H349.84C334.376 305 321.84 317.536 321.84 333C321.84 348.464 309.304 361 293.84 361H40C17.9086 361 0 343.091 0 321V40C0 17.9086 17.9086 0 40 0H364.491Z" />
          </clipPath>
        </defs>

        {/* Dynamic Image clipped to the exact path */}
        <g clipPath={`url(#${clipId})`}>
          <image href={image} x="0" y="0" width="405" height="361" preserveAspectRatio="xMidYMid slice" className="transition-transform duration-[0.6s] ease-[cubic-bezier(0.25,1,0.5,1)] origin-center group-hover:scale-[1.05]" />
        </g>

        {/* Hover Border Overlay */}
        <path 
          d="M364.491 0C386.583 9.89579e-05 404.491 17.9087 404.491 40V275C404.491 291.569 391.06 305 374.491 305H349.84C334.376 305 321.84 317.536 321.84 333C321.84 348.464 309.304 361 293.84 361H40C17.9086 361 0 343.091 0 321V40C0 17.9086 17.9086 0 40 0H364.491Z" 
          className="fill-none stroke-transparent stroke-[2px] transition-colors duration-300 pointer-events-none group-hover:stroke-brand-purple" 
        />

        {/* Original Action Button Vector */}
        <rect x="327.173" y="311" width="77.4934" height="50" rx="25" className="fill-[#18063A] transition-colors duration-300 group-hover:fill-brand-purple" />
        <path d="M357.446 336H374.946" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M368.446 343L375.446 336L368.446 329" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="pt-6 xl:pt-[24px]">
        <h3 className="font-cormorant text-2xl xl:text-4xl font-bold text-brand-purple2 mb-2 xl:mb-[8px]">{title}</h3>
        <p className="font-unageo text-base font-light leading-[1.5] text-brand-purple2">{description}</p>
      </div>
    </a>
  );
}
