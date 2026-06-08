const fs = require('fs');
let tsx = fs.readFileSync('src/app/page.tsx', 'utf8');

if (!tsx.includes('import { Button }')) {
  tsx = tsx.replace(
    'import { ShopCard } from \'@/components/pages/home/shop-card\';',
    'import { ShopCard } from \'@/components/pages/home/shop-card\';\nimport { Button } from \'@/components/ui/button\';\nimport Link from "next/link";'
  );
}

tsx = tsx.replace(
  '<a href="/coming-soon" className="inline-flex items-center justify-center w-full px-9 py-4 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-base font-medium no-underline border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_4px_14px_rgba(0,204,141,0.2)] hover:bg-brand-purple hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)] active:translate-y-0 xl:w-[200px] xl:py-[15px] xl:px-0">Pre-order Now</a>',
  '<Button render={<Link href="/coming-soon" />} className="!inline-flex items-center justify-center w-full px-9 py-4 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-base font-medium no-underline border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_4px_14px_rgba(0,204,141,0.2)] hover:bg-brand-purple hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)] active:translate-y-0 xl:w-[200px] xl:py-[15px] xl:px-0">Pre-order Now</Button>'
);

tsx = tsx.replace(
  '<a href="/shop" className="inline-flex items-center justify-center px-7 py-2 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-sm font-medium no-underline transition-colors duration-300 hover:bg-brand-purple hover:text-white xl:text-base">Shop Now</a>',
  '<Button render={<Link href="/shop" />} className="!inline-flex items-center justify-center px-7 py-2 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-sm font-medium no-underline transition-colors duration-300 hover:bg-brand-purple hover:text-white xl:text-base">Shop Now</Button>'
);

tsx = tsx.replace(
  '<button type="submit" className="inline-flex items-center justify-center w-full xl:w-[150px] h-[50px] py-[15px] rounded-[47px] bg-[#00CC8D] text-brand-purple2 font-ui text-[16px] font-medium tracking-[-0.02em] no-underline cursor-pointer overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:bg-brand-purple hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)]">Subscribe</button>',
  '<Button type="submit" className="!inline-flex items-center justify-center w-full xl:w-[150px] h-[50px] py-[15px] rounded-[47px] bg-[#00CC8D] text-brand-purple2 font-ui text-[16px] font-medium tracking-[-0.02em] no-underline cursor-pointer overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:bg-brand-purple hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)]">Subscribe</Button>'
);

tsx = tsx.replace(
  '<button type="submit" className="inline-flex items-center justify-center w-full xl:w-[150px] py-[15px] rounded-[47px] bg-[#00CC8D] text-brand-purple2 font-ui text-[14px] font-medium no-underline cursor-pointer overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:bg-brand-purple hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)]">Send Message</button>',
  '<Button type="submit" className="!inline-flex items-center justify-center w-full xl:w-[150px] py-[15px] rounded-[47px] bg-[#00CC8D] text-brand-purple2 font-ui text-[14px] font-medium no-underline cursor-pointer overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:bg-brand-purple hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)]">Send Message</Button>'
);

fs.writeFileSync('src/app/page.tsx', tsx);
