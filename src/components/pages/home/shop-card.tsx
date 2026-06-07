interface ShopCardProps {
  title: string;
  image: string;
  bgColor: string;
  price: string;
  imagePosition: string;
  xlImagePosition?: string;
}

export function ShopCard({ title, image, bgColor, price, imagePosition, xlImagePosition }: ShopCardProps) {
  return (
    <div className={`group w-[280px] h-[320px] xl:w-[406px] xl:h-[466px] rounded-[30px] border border-transparent p-[20px_20px_72px_20px] flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(33,1,95,0.05)] max-lg:w-full max-lg:h-auto max-lg:gap-5 max-lg:p-6 ${bgColor}`}>
      <h3 className="font-ui text-[24px] xl:text-[40px] font-semibold text-brand-purple2 self-start">{title}</h3>
      <div className={`absolute pointer-events-none ${imagePosition} ${xlImagePosition ?? ''} max-lg:static max-lg:left-auto max-lg:top-auto max-lg:pointer-events-auto`}>
        <img src={image} alt={title} className="w-full h-full object-contain block transition-transform duration-300 ease group-hover:scale-110" />
      </div>
      <div className="hidden max-lg:flex max-lg:justify-between max-lg:items-center max-lg:w-full max-lg:pt-[24px]">
        <span className="font-ui text-[16px] font-semibold text-brand-purple2 underline decoration-brand-purple2 decoration-2 underline-offset-[6px]">{price}</span>
        <button className="w-[45px] h-[45px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center transition-transform duration-200 ease group-cart-hover:scale-[1.05] [&>svg]:w-full [&>svg]:h-full [&_rect]:fill-white [&_rect]:transition-fill [&_rect]:duration-300 [&_path]:fill-brand-purple [&_path]:transition-fill [&_path]:duration-300 hover:[&_rect]:fill-brand-purple2 hover:[&_path]:fill-white" aria-label="Add to cart">
          <svg width="100" height="65" viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="65" rx="32.5" />
            <path
              d="M60.5 25H56V23.5C56 21.9087 55.3679 20.3826 54.2426 19.2574C53.1174 18.1321 51.5913 17.5 50 17.5C48.4087 17.5 46.8826 18.1321 45.7574 19.2574C44.6321 20.3826 44 21.9087 44 23.5V25H39.5C39.1022 25 38.7206 25.158 38.4393 25.4393C38.158 25.7206 38 26.1022 38 26.5V43C38 44.1935 38.4741 45.3381 39.318 46.182C40.1619 47.0259 41.3065 47.5 42.5 47.5H57.5C58.6935 47.5 59.8381 47.0259 60.682 46.182C61.5259 45.3381 62 44.1935 62 43V26.5C62 26.1022 61.842 25.7206 61.5607 25.4393C61.2794 25.158 60.8978 25 60.5 25ZM47 23.5C47 22.7044 47.3161 21.9413 47.8787 21.3787C48.4413 20.8161 49.2044 20.5 50 20.5C50.7956 20.5 51.5587 20.8161 52.1213 21.3787C52.6839 21.9413 53 22.7044 53 23.5V25H47V23.5ZM59 43C59 43.3978 58.842 43.7794 58.5607 44.0607C58.2794 44.342 57.8978 44.5 57.5 44.5H42.5C42.1022 44.5 41.7206 44.342 41.4393 44.0607C41.158 43.7794 41 43.3978 41 43V28H44V29.5C44 29.8978 44.158 30.2794 44.4393 30.5607C44.7206 30.842 45.1022 31 45.5 31C45.8978 31 46.2794 30.842 46.5607 30.5607C46.842 30.2794 47 29.8978 47 29.5V28H53V29.5C53 29.8978 53.158 30.2794 53.4393 30.5607C53.7206 30.842 54.1022 31 54.5 31C54.8978 31 55.2794 30.842 55.5607 30.5607C55.842 30.2794 56 29.8978 56 29.5V28H59V43Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
