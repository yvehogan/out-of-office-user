interface BeyondCardProps {
  href: string;
  image: string;
  clipId: string;
  title: string;
  description: string;
}

export function BeyondCard({ href, image, clipId, title, description }: BeyondCardProps) {
  return (
    <a href={href} className="group w-[240px] xl:w-[404px] h-auto no-underline text-brand-purple2 flex flex-col transition-transform duration-300 ease-[ease] max-lg:w-full max-lg:h-auto">
      <div className="relative w-[240px] h-[200px] xl:w-[404px] xl:h-[361px]">
        <svg className="w-full h-full block overflow-visible" viewBox="0 0 240 200">
          <defs>
            <clipPath id={clipId}>
              <path d="M 14,0 H 226 A 14,14 0 0 1 240,14 V 138 A 12,12 0 0 1 228,150 H 191 A 16,16 0 0 0 175,166 V 188 A 12,12 0 0 1 163,200 H 14 A 14,14 0 0 1 0,186 V 14 A 14,14 0 0 1 14,0 Z" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            <image href={image} x="0" y="0" width="240" height="200" preserveAspectRatio="xMidYMid slice" className="transition-transform duration-[0.6s] ease-[cubic-bezier(0.25,1,0.5,1)] origin-center group-hover:scale-[1.05]" />
          </g>
          <path className="fill-none stroke-transparent stroke-[3px] transition-stroke duration-[0.3s] ease-[ease] pointer-events-none group-hover:stroke-brand-purple" d="M 14,0 H 226 A 14,14 0 0 1 240,14 V 138 A 12,12 0 0 1 228,150 H 191 A 16,16 0 0 0 175,166 V 188 A 12,12 0 0 1 163,200 H 14 A 14,14 0 0 1 0,186 V 14 A 14,14 0 0 1 14,0 Z" />
        </svg>
        <span className="absolute bottom-[6px] right-[6px] w-[46px] h-[32px] bg-[#18063a] rounded-[16px] flex items-center justify-center transition-background duration-300 ease-[ease] group-hover:bg-brand-purple">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H20.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 19L21 12L14 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="pt-[24px]">
        <h3 className="font-cormorant text-[20px] xl:text-4xl font-bold text-black mb-[8px]">{title}</h3>
        <p className="font-unageo text-[13px] xl:text-base font-light leading-[1.5] text-brand-purple2">{description}</p>
      </div>
    </a>
  );
}
