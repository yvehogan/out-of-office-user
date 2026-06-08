const fs = require('fs');
let text = fs.readFileSync('src/app/page.tsx', 'utf8');

// Line 39
text = text.replace(
  'className="flex h-full w-max max-lg:!w-full max-lg:h-auto max-lg:flex-col"',
  'className="flex flex-col h-auto w-full xl:!w-max xl:h-full xl:flex-row"'
);
// Line 43
text = text.replace(
  'className="px-[60px] xl:pr-0 flex flex-col justify-center h-full max-lg:w-full max-lg:p-0 max-lg:h-auto"',
  'className="flex flex-col justify-center w-full h-auto p-0 xl:w-auto xl:px-[60px] xl:pr-0 xl:h-full"'
);
// Line 54
text = text.replace(
  'className="font-serif text-[80px] font-bold leading-[1.05] text-brand-purple2 mb-5 xl:text-9xl max-lg:text-[48px] max-lg:leading-[1.1] max-lg:mb-4"',
  'className="font-serif text-[48px] font-bold leading-[1.1] text-brand-purple2 mb-4 xl:mb-5 xl:leading-[1.05] xl:text-[80px] min-[1440px]:text-9xl"'
);
// Line 58
text = text.replace(
  'className="font-unageo text-base font-light leading-[1.5] text-brand-purple2 mb-7 xl:text-2xl min-[1440px]:mb-12 max-lg:text-lg max-lg:mb-[30px] max-lg:max-w-full"',
  'className="font-unageo text-lg max-w-full font-light leading-[1.5] text-brand-purple2 mb-[30px] xl:max-w-none xl:mb-7 xl:text-base min-[1440px]:mb-12 min-[1440px]:text-2xl"'
);
// Line 65
text = text.replace(
  'className="w-[590px] h-auto flex items-center justify-center z-[1] min-[1440px]:left-[741px] min-[1440px]:w-[718px] min-[1440px]:h-[725px] max-lg:w-full max-lg:h-auto max-lg:py-5 max-lg:relative max-lg:left-auto max-lg:top-auto"',
  'className="flex items-center justify-center z-[1] w-full h-auto py-5 relative left-auto top-auto xl:absolute xl:py-0 xl:w-[590px] min-[1440px]:left-[741px] min-[1440px]:w-[718px] min-[1440px]:h-[725px]"'
);
// Line 66
text = text.replace(
  'className="w-full h-full object-cover transition-transform duration-300 hover:-translate-y-2.5 hover:-rotate-1 max-lg:w-[260px] max-lg:h-[360px]"',
  'className="w-[260px] h-[360px] xl:w-full xl:h-full object-cover transition-transform duration-300 hover:-translate-y-2.5 hover:-rotate-1"'
);
// Line 71
text = text.replace(
  'className="h-full shrink-0 inline-flex align-top whitespace-normal min-w-[100vw] w-max relative mt-20 max-lg:flex-col max-lg:gap-[30px] xl:-ml-[50px] xl:mr-[40px]" id="there-is-more"',
  'className="relative mt-20 flex flex-col gap-[30px] w-full h-auto xl:min-w-[100vw] xl:w-max xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:flex-row xl:gap-0 xl:-ml-[50px] xl:mr-[40px]" id="there-is-more"'
);
// Line 72
text = text.replace(
  'className="h-full flex max-lg:w-full max-lg:h-auto"',
  'className="flex w-full h-auto xl:w-auto xl:h-full"'
);
// Line 73
text = text.replace(
  'className="font-serif text-[80px] font-bold italic leading-[1.1] text-brand-purple2 max-w-[740px] max-lg:text-[38px] max-lg:leading-[1.2] max-lg:max-w-full"',
  'className="font-serif text-[38px] max-w-full font-bold italic leading-[1.2] text-brand-purple2 xl:text-[80px] xl:max-w-[740px] xl:leading-[1.1]"'
);
// Line 79
text = text.replace(
  'className="w-[580px] xl:w-[700px] px-[48px] flex flex-col h-full max-lg:w-full max-lg:p-0 max-lg:h-auto"',
  'className="flex flex-col w-full p-0 h-auto xl:px-[48px] xl:w-[580px] xl:h-full min-[1440px]:w-[700px]"'
);
// Line 80
text = text.replace(
  'className="font-unageo text-[16px] xl:text-[22px] font-light leading-[1.6] text-brand-purple2 max-lg:text-[16px]"',
  'className="font-unageo text-[16px] font-light leading-[1.6] text-brand-purple2 xl:text-[22px]"'
);
// Line 88
text = text.replace(
  'className="absolute left-[-150px] bottom-[40px] w-[300px] h-[300px] pointer-events-none z-[10] max-lg:relative max-lg:left-auto max-lg:top-auto max-lg:w-full max-lg:py-[20px] max-lg:h-auto"',
  'className="relative left-auto top-auto w-full h-auto py-[20px] pointer-events-none z-[10] xl:absolute xl:left-[-150px] xl:bottom-[40px] xl:w-[300px] xl:h-[300px] xl:py-0"'
);
// Line 95
text = text.replace(
  'className="h-full shrink-0 inline-flex align-top whitespace-normal min-w-[100vw] w-max flex-col xl:justify-center pr-[60px] max-lg:w-full max-lg:p-[60px_24px] max-lg:h-auto max-lg:border-r-0 max-lg:border-b max-lg:border-[#e9ecef] max-lg:flex" id="beyond-the-book"',
  'className="flex flex-col w-full h-auto p-[60px_24px] border-b border-[#e9ecef] xl:border-none xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:min-w-[100vw] xl:w-max xl:justify-center xl:pr-[60px]" id="beyond-the-book"'
);
// Line 96
text = text.replace(
  'className="pl-[60px] mb-[24px] max-lg:pl-0 max-lg:mb-[30px]"',
  'className="pl-0 mb-[30px] xl:pl-[60px] xl:mb-[24px]"'
);
// Line 106
text = text.replace(
  'className="font-serif text-[36px] xl:text-[64px] font-bold text-brand-purple2 max-lg:text-[36px]"',
  'className="font-serif text-[36px] font-bold text-brand-purple2 xl:text-[64px]"'
);
// Line 109
text = text.replace(
  'className="flex gap-[24px] pl-[60px] max-lg:flex-col max-lg:p-0 max-lg:gap-[30px]"',
  'className="flex flex-col gap-[30px] p-0 xl:flex-row xl:pl-[60px] xl:gap-[24px]"'
);

text = text.replace(
  'className="w-[800px] flex gap-[32px] h-full z-[1] shrink-0 max-lg:w-full max-lg:flex-col max-lg:p-0 max-lg:gap-[30px] max-lg:h-auto"',
  'className="flex flex-col w-full h-auto p-0 gap-[30px] z-[1] shrink-0 xl:flex-row xl:w-[800px] xl:h-full xl:gap-[32px]"'
);

// We replace all remaining max-lg: globally now using a regex safely over the font/small blocks
text = text.replace(/max-lg:mb-\[30px\]/g, 'mb-[30px] xl:mb-0');
text = text.replace(/max-lg:w-full/g, 'w-full xl:w-auto');
text = text.replace(/max-lg:h-auto/g, 'h-auto xl:h-full');
text = text.replace(/max-lg:p-0/g, 'p-0 xl:p-auto');
text = text.replace(/max-lg:flex-col/g, 'flex-col xl:flex-row');
text = text.replace(/max-lg:gap-\[30px\]/g, 'gap-[30px] xl:gap-0');
text = text.replace(/max-lg:gap-\[16px\]/g, 'gap-[16px] xl:gap-0');
text = text.replace(/max-lg:px-0/g, 'px-0 xl:px-[32px]');
text = text.replace(/max-lg:pt-\[40px\]/g, 'pt-[40px] xl:pt-[64px]');
text = text.replace(/max-lg:w-\[44px\]/g, 'w-[44px] xl:w-[42px]');
text = text.replace(/max-lg:h-\[44px\]/g, 'h-[44px] xl:h-[42px]');
text = text.replace(/max-lg:text-\[18px\]/g, 'text-[18px] xl:text-[16px]');
text = text.replace(/max-lg:text-\[16px\]/g, 'text-[16px] xl:text-inherit');

fs.writeFileSync('src/app/page.tsx', text);

