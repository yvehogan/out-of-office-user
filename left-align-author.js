const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Author left container wrapper
page = page.replace(
  'className="w-full p-0 h-auto flex flex-col justify-center text-center items-center z-[1] shrink-0 xl:text-left xl:items-start xl:w-[450px] xl:p-[16px_0_64px_60px] xl:h-full"',
  'className="w-full p-0 h-auto flex flex-col justify-center text-left items-start z-[1] shrink-0 xl:w-[450px] xl:p-[16px_0_64px_60px] xl:h-full"'
);

// 2. Author Paragraph 1
page = page.replace(
  'className="font-sans text-[18px] font-light leading-[1.68] text-brand-purple2 text-center xl:text-left xl:text-[16px]"',
  'className="font-sans text-[18px] font-light leading-[1.68] text-brand-purple2 text-left xl:text-[16px]"'
);

// 3. Author Section 2 wrappers
page = page.replace(
  'className="w-full flex items-center xl:items-start flex-col xl:w-[380px]"',
  'className="w-full flex items-start flex-col xl:w-[380px]"'
);

// 4. Paragraph 2, 3, 4, 5 (all match this pattern)
page = page.replace(
  /className="font-sans text-\[18px\] font-light leading-\[1\.68\] text-center xl:text-justify text-brand-purple2 xl:text-\[16px\]"/g,
  'className="font-sans text-[18px] font-light leading-[1.68] text-left xl:text-justify text-brand-purple2 xl:text-[16px]"'
);

// 5. Connect with Solomon wrapper
page = page.replace(
  'className="mt-0 flex flex-col items-center xl:items-start gap-[16px] xl:mt-auto xl:gap-[6px]"',
  'className="mt-0 flex flex-col items-start gap-[16px] xl:mt-auto xl:gap-[6px]"'
);

fs.writeFileSync('src/app/page.tsx', page);

