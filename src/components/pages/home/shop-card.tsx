interface ShopCardProps {
  title: string;
  image: string;
  bgColor: string;
  price?: string;
  imagePosition: string;
  xlImagePosition?: string;
}

export function ShopCard({ title, image, bgColor, imagePosition, xlImagePosition }: ShopCardProps) {
  return (
    <div className={`group w-full min-h-[330px] p-6 gap-5 rounded-[30px] border border-transparent flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(33,1,95,0.05)] xl:w-[280px] xl:h-[340px] 2xl:w-[406px] 2xl:h-[466px] min-[1600px]:h-[500px] xl:p-[24px] 2xl:p-[20px_20px_72px_20px] xl:gap-0 ${bgColor}`}>
      <h3 className="relative z-10 font-ui text-[24px] font-semibold text-brand-purple2 self-start xl:text-[24px] 2xl:text-[40px] tracking-tight">{title}</h3>
      
      {/* Mobile Absolute Image Wrapper */}
      <div className={`absolute flex items-end justify-end pointer-events-auto xl:hidden ${imagePosition}`}>
        <img 
          src={image} 
          alt={title} 
          className="w-auto h-[240px] sm:h-[280px] max-w-[280px] object-contain object-bottom block transition-transform duration-300 ease group-hover:scale-110" 
        />
      </div>

      {/* Desktop Absolute Image Wrapper */}
      <div className={`hidden absolute xl:flex items-end justify-end pointer-events-none xl:-bottom-2 xl:-right-2 2xl:bottom-auto 2xl:right-auto ${xlImagePosition ?? ''} xl:w-[85%] xl:h-[80%] 2xl:w-auto 2xl:h-auto`}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain object-bottom-right block transition-transform duration-300 ease group-hover:scale-110 2xl:relative 2xl:w-full 2xl:max-w-none 2xl:h-full" 
        />
      </div>
      
    </div>
  );
}
