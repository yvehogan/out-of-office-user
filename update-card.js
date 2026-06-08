const fs = require('fs');
let shop = fs.readFileSync('src/components/pages/home/shop-card.tsx', 'utf8');

// The ShopCard replacement
shop = shop.replace(
  'group w-[280px] h-[320px] xl:w-[406px] xl:h-[466px] rounded-[30px] border border-transparent p-[20px_20px_72px_20px] flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(33,1,95,0.05)] max-lg:w-full max-lg:h-auto max-lg:gap-5 max-lg:p-6',
  'group w-full h-auto p-6 gap-5 rounded-[30px] border border-transparent flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(33,1,95,0.05)] xl:w-[406px] xl:h-[466px] xl:p-[20px_20px_72px_20px] xl:gap-0'
);

shop = shop.replace(
  'font-ui text-[24px] xl:text-[40px] font-semibold text-brand-purple2 self-start',
  'font-ui text-[24px] font-semibold text-brand-purple2 self-start xl:text-[40px]'
);

shop = shop.replace(
  'absolute pointer-events-none ${imagePosition} ${xlImagePosition ?? \'\'} max-lg:static max-lg:left-auto max-lg:top-auto max-lg:pointer-events-auto',
  'static left-auto top-auto pointer-events-auto ${imagePosition} ${xlImagePosition ?? \'\'} xl:absolute xl:pointer-events-none'
);

shop = shop.replace(
  'hidden max-lg:flex max-lg:justify-between max-lg:items-center max-lg:w-full max-lg:pt-[24px]',
  'flex justify-between items-center w-full pt-[24px] xl:hidden'
);
fs.writeFileSync('src/components/pages/home/shop-card.tsx', shop);

let beyond = fs.readFileSync('src/components/pages/home/beyond-card.tsx', 'utf8');

beyond = beyond.replace(
  'group w-[280px] h-[380px] xl:w-[350px] xl:h-[500px] shrink-0 relative overflow-hidden bg-transparent cursor-pointer rounded-[30px] max-lg:!w-full max-lg:!h-[380px]',
  'group w-full h-[380px] shrink-0 relative overflow-hidden bg-transparent cursor-pointer rounded-[30px] xl:w-[350px] xl:h-[500px]'
);

fs.writeFileSync('src/components/pages/home/beyond-card.tsx', beyond);

