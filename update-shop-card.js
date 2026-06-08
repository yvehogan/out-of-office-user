const fs = require('fs');
let content = fs.readFileSync('src/components/pages/home/shop-card.tsx', 'utf8');

content = content.replace(
  'group w-[280px] h-[320px] xl:w-[406px] xl:h-[466px] rounded-[30px] border border-transparent p-[20px_20px_72px_20px] flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(33,1,95,0.05)] max-lg:w-full max-lg:h-auto max-lg:gap-5 max-lg:p-6',
  'group w-full h-auto gap-5 p-6 xl:p-[20px_20px_72px_20px] xl:gap-0 rounded-[30px] border border-transparent flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(33,1,95,0.05)] xl:w-[406px] xl:h-[466px] min-[1440px]:w-[280px] min-[1440px]:h-[320px]'
); // Wait, "min-[1440px]"? The original logic had w-[280px] and then xl:w-[406px]? No, the original logic had `w-[280px]` for horizontal scrolling below 1280px? Wait, horizontal scrolling starts at 1024 or 1280?
// Original page.tsx had: `max-lg:!w-full`. This implies the default `w-[280px]` was applying to `lg` and above!
// So: mobile: `w-full h-auto`. `lg:` (1024px) for horizontal mode: `lg:w-[280px] lg:h-[320px]`. `xl:` (1280px): `xl:w-[406px] xl:h-[466px]`.
// Let's implement that!

