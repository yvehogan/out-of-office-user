const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. main wrapper
content = content.replace(
  'className="flex-1 w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth max-lg:relative max-lg:top-0 max-lg:flex-none max-lg:h-auto max-lg:overflow-x-visible max-lg:overflow-y-visible max-lg:whitespace-normal [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#f8f9fa] [&::-webkit-scrollbar-thumb]:bg-brand-purple2 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-brand-purple"',
  'className="relative top-0 flex-none h-auto w-full overflow-x-visible overflow-y-visible whitespace-normal scroll-smooth xl:flex-1 xl:overflow-x-auto xl:overflow-y-hidden xl:whitespace-nowrap [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#f8f9fa] [&::-webkit-scrollbar-thumb]:bg-brand-purple2 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-brand-purple"'
);

// 2. hero
content = content.replace(
  'className="h-full pt-2 shrink-0 inline-flex align-top whitespace-normal bg-white overflow-visible min-w-[100vw] w-max relative max-lg:!w-full max-lg:!h-auto max-lg:p-[60px_24px] max-lg:border-b max-lg:border-[#e9ecef] max-lg:flex max-lg:flex-col-reverse max-lg:gap-10" id="hero"',
  'className="relative w-full h-auto p-[60px_24px] border-b border-[#e9ecef] bg-white flex flex-col-reverse gap-10 xl:border-none xl:h-full xl:pt-2 xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:overflow-visible xl:min-w-[100vw] xl:w-max" id="hero"'
);
content = content.replace(
  'className="flex-1 flex flex-col justify-center gap-10 pr-[100px] pl-[60px] min-[1440px]:gap-[50px] min-[1440px]:pr-[120px] min-[1440px]:pl-[100px] max-lg:w-full max-lg:p-0 max-lg:gap-8"',
  'className="flex flex-col justify-center gap-8 w-full p-0 xl:flex-1 xl:gap-10 xl:pr-[100px] xl:pl-[60px] min-[1440px]:gap-[50px] min-[1440px]:pr-[120px] min-[1440px]:pl-[100px]"'
);
content = content.replace(
  'className="m-0 font-ui text-brand-purple2 text-xs font-bold leading-normal uppercase tracking-[1px] min-[1440px]:text-sm max-lg:leading-relaxed"',
  'className="m-0 font-ui text-brand-purple2 text-xs font-bold leading-relaxed uppercase tracking-[1px] xl:leading-normal min-[1440px]:text-sm"'
);
content = content.replace(
  'className="m-0 font-ui text-[64px] font-bold leading-[1.1] tracking-[-2px] text-brand-purple2 min-[1440px]:text-[80px] max-lg:text-[40px] max-lg:leading-[1.15] max-lg:tracking-[-1px]"',
  'className="m-0 font-ui text-[40px] font-bold leading-[1.15] tracking-[-1px] text-brand-purple2 xl:text-[64px] xl:leading-[1.1] xl:tracking-[-2px] min-[1440px]:text-[80px]"'
);
content = content.replace(
  'className="m-0 font-ui text-lg leading-[1.6] text-brand-navy max-w-[480px] min-[1440px]:text-xl min-[1440px]:max-w-[560px] max-lg:text-base max-lg:leading-[1.6]"',
  'className="m-0 font-ui text-base leading-[1.6] text-brand-navy max-w-[480px] xl:text-lg min-[1440px]:text-xl min-[1440px]:max-w-[560px]"'
);
content = content.replace(
  'className="inline-flex items-center justify-center w-[200px] py-[15px] rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-base font-medium no-underline border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_4px_14px_rgba(0,204,141,0.2)] hover:bg-brand-purple hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)] active:translate-y-0 max-lg:w-full max-lg:max-w-[280px] max-lg:px-9 max-lg:py-4"',
  'className="inline-flex items-center justify-center w-full px-9 py-4 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-base font-medium no-underline border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_4px_14px_rgba(0,204,141,0.2)] hover:bg-brand-purple hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)] active:translate-y-0 xl:w-[200px] xl:py-[15px] xl:px-0"'
);
content = content.replace(
  'className="w-[50vw] h-full bg-[#f8f9fa] flex items-center justify-center relative translate-x-[60px] min-[1440px]:w-[55vw] max-lg:translate-x-0 max-lg:w-full max-lg:h-[360px] max-lg:rounded-2xl"',
  'className="w-full h-[360px] bg-[#f8f9fa] flex items-center justify-center relative rounded-2xl xl:w-[50vw] xl:h-full xl:rounded-none xl:translate-x-[60px] min-[1440px]:w-[55vw]"'
);

// 3. there-is-more
content = content.replace(
  'className="h-[90%] shrink-0 inline-flex align-top whitespace-normal border-l border-[#e9ecef] p-[60px_100px] my-auto gap-[100px] bg-white items-center max-w-[1000px] min-[1440px]:max-w-[1200px] min-[1440px]:p-[80px_120px] max-lg:!w-full max-lg:!h-auto max-lg:!max-w-none max-lg:p-[60px_24px] max-lg:border-none max-lg:flex max-lg:flex-col max-lg:gap-10 max-lg:my-0 max-lg:items-start" id="there-is-more"',
  'className="w-full h-auto p-[60px_24px] border-none flex flex-col gap-10 bg-white items-start xl:h-[90%] xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:border-l xl:border-[#e9ecef] xl:p-[60px_100px] xl:my-auto xl:gap-[100px] xl:items-center xl:max-w-[1000px] min-[1440px]:max-w-[1200px] min-[1440px]:p-[80px_120px]" id="there-is-more"'
);
content = content.replace(
  'className="m-0 font-ui text-[48px] font-bold leading-[1.2] text-brand-purple2 tracking-[-1px] w-[45%] min-[1440px]:text-[56px] max-lg:w-full max-lg:text-[32px] max-lg:leading-[1.2] max-lg:tracking-[-0.5px]"',
  'className="m-0 font-ui text-[32px] font-bold leading-[1.2] text-brand-purple2 tracking-[-0.5px] w-full xl:w-[45%] xl:text-[48px] xl:tracking-[-1px] min-[1440px]:text-[56px]"'
);
content = content.replace(
  'className="w-[55%] flex flex-col gap-[30px] min-[1440px]:gap-10 max-lg:w-full max-lg:gap-6"',
  'className="w-full flex flex-col gap-6 xl:w-[55%] xl:gap-[30px] min-[1440px]:gap-10"'
);
content = content.replace(
  /className="m-0 font-ui text-lg leading-\[1\.6\] text-brand-navy min-\[1440px\]:text-xl max-lg:text-base"/g,
  'className="m-0 font-ui text-base leading-[1.6] text-brand-navy xl:text-lg min-[1440px]:text-xl"'
);
content = content.replace(
  'className="w-full flex justify-end max-lg:justify-start"',
  'className="w-full flex justify-start xl:justify-end"'
);
content = content.replace(
  'className="block max-w-full h-auto max-lg:w-16"',
  'className="block w-16 h-auto xl:w-auto xl:max-w-full"'
);

// 4. beyond-the-book
content = content.replace(
  'className="h-full shrink-0 inline-flex align-top whitespace-normal bg-brand-navy overflow-visible min-w-[100vw] w-max flex-col xl:justify-center pr-[60px] max-lg:!w-full max-lg:!h-auto max-lg:p-[60px_24px] max-lg:flex max-lg:flex-col max-lg:gap-[30px]" id="beyond-the-book"',
  'className="w-full h-auto p-[60px_24px] flex flex-col gap-[30px] bg-brand-navy overflow-visible xl:border-none xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:min-w-[100vw] xl:w-max xl:justify-center xl:pr-[60px]" id="beyond-the-book"'
);
content = content.replace(
  'className="pl-[60px] mb-[30px] max-lg:pl-0 max-lg:mb-[30px]"',
  'className="pl-0 mb-[30px] xl:pl-[60px]"'
);
content = content.replace(
  'className="flex items-center gap-[10px] mb-[12px] max-lg:mb-[16px] max-lg:gap-[12px]"',
  'className="flex items-center gap-[12px] mb-[16px] xl:gap-[10px] xl:mb-[12px]"'
);
content = content.replace(
  'className="font-ui text-[64px] font-bold text-white max-lg:text-[40px] max-lg:tracking-[-1px]"',
  'className="font-ui text-[40px] font-bold text-white tracking-[-1px] xl:text-[64px] xl:tracking-normal"'
);
content = content.replace( // For beyond the book cards wrapper
  'className="flex gap-[30px] pl-[60px] max-lg:flex-col max-lg:p-0"',
  'className="flex flex-col gap-[30px] p-0 xl:flex-row xl:pl-[60px]"'
);

// 5. shop
content = content.replace(
  'className="h-full shrink-0 inline-flex align-top whitespace-normal bg-white overflow-visible min-w-[100vw] w-max flex-col xl:justify-center pr-[60px] max-lg:!w-full max-lg:!h-auto max-lg:p-[60px_24px] max-lg:border-b max-lg:border-[#e9ecef] max-lg:flex max-lg:flex-col max-lg:gap-10" id="shop"',
  'className="w-full h-auto p-[60px_24px] border-b border-[#e9ecef] bg-white flex flex-col gap-10 xl:border-none xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:overflow-visible xl:min-w-[100vw] xl:w-max xl:justify-center xl:pr-[60px]" id="shop"'
);
content = content.replace(
  'className="pl-[60px] mb-[30px] max-lg:pl-0 max-lg:mb-[30px]"',
  'className="flex flex-col items-center mb-[30px] xl:pl-[60px] xl:items-start"'
);
content = content.replace(
  'className="flex items-center gap-[10px] mb-3 max-lg:mb-4 max-lg:gap-3"',
  'className="flex items-center gap-3 mb-4 xl:gap-[10px] xl:mb-3"'
);
content = content.replace(
  'className="flex items-center gap-4"',
  'className="flex flex-col items-center gap-4 xl:flex-row"'
);
content = content.replace(
  'className="font-cormorant text-4xl xl:text-[64px] font-bold text-brand-purple2"',
  'className="font-cormorant text-4xl font-bold text-brand-purple2 xl:text-[64px]"'
);
content = content.replace(
  'className="font-cormorant text-[13px] xl:text-2xl font-bold text-brand-purple2"',
  'className="font-cormorant text-[13px] font-bold text-brand-purple2 xl:text-2xl"'
);
content = content.replace(
  'className="inline-flex items-center justify-center px-7 py-2 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-sm xl:text-base font-medium no-underline transition-colors duration-300 hover:bg-brand-purple hover:text-white"',
  'className="inline-flex items-center justify-center px-7 py-2 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-sm font-medium no-underline transition-colors duration-300 hover:bg-brand-purple hover:text-white xl:text-base"'
);
content = content.replace(
  'className="flex gap-6 pl-[60px] max-lg:flex-col max-lg:p-0 xl:gap-[30px]"',
  'className="grid grid-cols-2 gap-4 p-0 xl:flex xl:flex-row xl:gap-[30px] xl:pl-[60px]"'
);


fs.writeFileSync('src/app/page.tsx', content);
