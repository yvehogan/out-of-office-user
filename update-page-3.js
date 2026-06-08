const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 6. author
content = content.replace(
  'className="h-full shrink-0 inline-flex align-top whitespace-normal min-w-[100vw] w-max pr-[60px] pb-[15px] relative max-lg:flex-col max-lg:w-full max-lg:p-[60px_24px] max-lg:h-auto max-lg:border-r-0 max-lg:border-b max-lg:border-[#e9ecef] max-lg:flex max-lg:gap-[40px]" id="author"',
  'className="flex flex-col w-full h-auto p-[60px_24px] border-b border-[#e9ecef] gap-[40px] relative xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:min-w-[100vw] xl:w-max xl:pr-[60px] xl:pb-[15px] xl:border-r-0 xl:border-b-0" id="author"'
);
content = content.replace(
  'className="w-[450px] p-[16px_0_64px_60px] flex flex-col justify-center h-full z-[1] shrink-0 max-lg:w-full max-lg:p-0 max-lg:h-auto"',
  'className="w-full p-0 h-auto flex flex-col justify-center text-center items-center z-[1] shrink-0 xl:text-left xl:items-start xl:w-[450px] xl:p-[16px_0_64px_60px] xl:h-full"'
);
content = content.replace(
  'className="flex items-center gap-[10px] mb-[12px] max-lg:mb-[16px] max-lg:gap-[12px]"',
  'className="flex items-center gap-[12px] mb-[16px] xl:gap-[10px] xl:mb-[12px]"'
);
content = content.replace(
  'className="font-serif text-[56px] font-bold leading-[1.08] text-brand-purple2 mb-[16px] max-lg:text-[48px] max-lg:mb-[20px]"',
  'className="font-serif text-[48px] font-bold leading-[1.08] text-brand-purple2 mb-[20px] xl:text-[56px] xl:mb-[16px]"'
);
content = content.replace( // First Author description paragraph
  'className="font-sans text-[16px] font-light leading-[1.68] text-brand-purple2 max-lg:text-[18px]"',
  'className="font-sans text-[18px] font-light leading-[1.68] text-brand-purple2 text-center xl:text-left xl:text-[16px]"'
);
content = content.replace( // Second Author description paragraph
  'className="font-sans text-[16px] font-light leading-[1.68] text-justify text-brand-purple2 max-lg:text-[18px]"',
  'className="font-sans text-[18px] font-light leading-[1.68] text-center xl:text-justify text-brand-purple2 xl:text-[16px]"'
);
content = content.replace( 
  'className="font-sans text-[16px] font-light leading-[1.68] text-justify text-brand-purple2 max-lg:text-[18px]" style={{ paddingTop: \'10px\' }}',
  'className="font-sans text-[18px] font-light leading-[1.68] text-center xl:text-justify text-brand-purple2 xl:text-[16px]" style={{ paddingTop: \'10px\' }}'
);
content = content.replace( 
  'className="w-[380px] flex flex-col max-lg:w-full"',
  'className="w-full flex items-center xl:items-start flex-col xl:w-[380px]"'
);
content = content.replace( 
  'className="font-sans text-[16px] font-light leading-[1.68] text-justify text-brand-purple2 max-lg:text-[18px]"',
  'className="font-sans text-[18px] font-light leading-[1.68] text-center xl:text-justify text-brand-purple2 xl:text-[16px]"'
);
content = content.replace( 
  'className="font-sans text-[16px] font-light leading-[1.68] text-justify text-brand-purple2 max-lg:text-[18px]" style={{ paddingTop: \'10px\' }}',
  'className="font-sans text-[18px] font-light leading-[1.68] text-center xl:text-justify text-brand-purple2 xl:text-[16px]" style={{ paddingTop: \'10px\' }}'
);
content = content.replace(
  'className="w-[400px] h-[480px] relative -top-[4px] -ml-[35px] z-[2] shrink-0 flex items-center justify-center max-lg:w-full max-lg:py-[20px] max-lg:h-auto max-lg:ml-0 max-lg:top-0"',
  'className="w-full py-[20px] h-auto ml-0 top-0 relative z-[2] shrink-0 flex items-center justify-center xl:w-[400px] xl:h-[480px] xl:-top-[4px] xl:-ml-[35px]"'
);
content = content.replace(
  'className="w-full h-full bg-transparent overflow-hidden flex items-center justify-center max-lg:max-w-[320px] max-lg:h-[420px] max-lg:mx-auto"',
  'className="w-full max-w-[320px] h-[420px] mx-auto bg-transparent overflow-hidden flex items-center justify-center xl:w-full xl:max-w-none xl:h-full xl:mx-0"'
);
content = content.replace(
  'className="mt-auto flex flex-col gap-[6px] max-lg:mt-0 max-lg:gap-[16px]"',
  'className="mt-0 flex flex-col items-center xl:items-start gap-[16px] xl:mt-auto xl:gap-[6px]"'
);
content = content.replace(
  'className="font-sans text-[16px] font-medium leading-[1.68] text-brand-purple2 max-lg:text-[20px]"',
  'className="font-sans text-[20px] font-medium leading-[1.68] text-brand-purple2 xl:text-[16px]"'
);

// 6. newsletter
content = content.replace(
  'className="inline-flex min-w-[100vw] w-max h-full max-lg:p-[60px_24px] max-lg:h-auto" id="newsletter"',
  'className="p-[60px_24px] h-auto inline-flex min-w-[100vw] w-max xl:h-full" id="newsletter"' // actually we need it to just behave well on mobile
);
content = content.replace( // Let's refine newsletter section
  'className="p-[60px_24px] h-auto inline-flex min-w-[100vw] w-max xl:h-full" id="newsletter"',
  'className="w-full h-auto p-[60px_24px] border-b border-[#e9ecef] xl:border-none inline-flex flex-col xl:min-w-[100vw] xl:w-max xl:h-full xl:p-0" id="newsletter"'
);
content = content.replace(
  'className="w-full px-[60px] flex flex-col h-full max-lg:p-0"',
  'className="w-full p-0 flex flex-col h-full xl:px-[60px]"'
);
content = content.replace(
  'className="flex items-center gap-[10px] mb-[12px] max-lg:mb-[16px] max-lg:gap-[12px]"',
  'className="flex items-center gap-[12px] mb-[16px] xl:gap-[10px] xl:mb-[12px]"'
);
content = content.replace(
  'className="font-serif text-[64px] font-bold leading-[1.08] text-brand-purple2 mb-[16px] max-lg:text-[48px] max-lg:leading-[1.1]"',
  'className="font-serif text-[48px] font-bold leading-[1.1] text-brand-purple2 mb-[16px] xl:text-[64px] xl:leading-[1.08]"'
);
content = content.replace(
  'className="font-sans text-[16px] font-light leading-[1.68] text-brand-purple2 mb-[24px] max-lg:text-[18px]"',
  'className="font-sans text-[18px] font-light leading-[1.68] text-brand-purple2 mb-[24px] xl:text-[16px]"'
);
content = content.replace(
  'className="flex flex-col gap-[24px] items-start max-lg:w-full"',
  'className="flex flex-col gap-[24px] w-full items-start xl:w-auto"'
);
content = content.replace(
  'className="w-[400px] h-[50px] rounded-[40px] max-lg:w-full border border-brand-purple2 px-[24px] font-sans text-[14px] text-brand-purple2 bg-transparent outline-none transition-all duration-300 ease focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]"',
  'className="w-full xl:w-[400px] h-[50px] rounded-[40px] border border-brand-purple2 px-[24px] font-sans text-[14px] text-brand-purple2 bg-transparent outline-none transition-all duration-300 ease focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]"'
);
content = content.replace( // Make subscribe button width full, but we'll do it by replacing the 150px
  'className="inline-flex items-center justify-center w-[150px] h-[50px] py-[15px] rounded-[47px] bg-[#00CC8D] text-brand-purple2 font-ui text-[16px] font-medium tracking-[-0.02em] no-underline cursor-pointer overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:bg-brand-purple hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)]"',
  'className="inline-flex items-center justify-center w-full xl:w-[150px] h-[50px] py-[15px] rounded-[47px] bg-[#00CC8D] text-brand-purple2 font-ui text-[16px] font-medium tracking-[-0.02em] no-underline cursor-pointer overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:bg-brand-purple hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)]"'
);

// 7. contact
content = content.replace(
  'className="inline-flex min-w-[100vw] w-max relative pr-[6rem] items-start h-full max-lg:flex-col max-lg:p-[60px_24px] max-lg:h-auto max-lg:w-full" id="contact"',
  'className="flex flex-col w-full h-auto p-[60px_24px] relative items-start xl:inline-flex xl:flex-row xl:h-full xl:p-0 xl:min-w-[100vw] xl:w-max xl:pr-[6rem]" id="contact"'
);
content = content.replace(
  'className="w-[460px] pl-[60px] flex flex-col shrink-0 max-lg:w-full max-lg:p-0 max-lg:h-auto"',
  'className="w-full p-0 h-auto flex flex-col shrink-0 xl:w-[460px] xl:pl-[60px] xl:h-full"'
);
content = content.replace(
  'className="flex items-center gap-[10px] mb-[12px] max-lg:mb-[16px] max-lg:gap-[12px]"',
  'className="flex items-center gap-[12px] mb-[16px] xl:gap-[10px] xl:mb-[12px]"'
);
content = content.replace(
  'className="font-serif text-[64px] font-bold leading-[1.08] text-brand-purple2 mb-[24px] max-lg:text-[48px]"',
  'className="font-serif text-[48px] font-bold leading-[1.08] text-brand-purple2 mb-[24px] xl:text-[64px]"'
);
content = content.replace(
  'className="flex flex-col gap-0 items-start max-lg:w-full"',
  'className="flex flex-col gap-0 items-start w-full"'
);
// replace multiple occurrences of the inputs
content = content.replace(
  /className="w-\[380px\] h-\[50px\] mb-\[16px\] rounded-\[40px\] max-lg:w-full border border-brand-purple2/g,
  'className="w-full xl:w-[380px] h-[50px] mb-[16px] rounded-[40px] border border-brand-purple2'
);
content = content.replace(
  'className="w-[380px] h-[100px] mb-[24px] rounded-[20px] max-lg:w-full border border-brand-purple2 p-[20px_24px] font-sans text-[14px] text-brand-purple2 bg-transparent outline-none resize-none transition-all duration-300 ease focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]"',
  'className="w-full xl:w-[380px] h-[100px] mb-[24px] rounded-[20px] border border-brand-purple2 p-[20px_24px] font-sans text-[14px] text-brand-purple2 bg-transparent outline-none resize-none transition-all duration-300 ease focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]"'
);
content = content.replace(
  'className="inline-flex items-center justify-center w-[150px] py-[15px] rounded-[47px] bg-[#00CC8D] text-brand-purple2 font-ui text-[14px] font-medium no-underline cursor-pointer overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:bg-brand-purple hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)]"',
  'className="inline-flex items-center justify-center w-full xl:w-[150px] py-[15px] rounded-[47px] bg-[#00CC8D] text-brand-purple2 font-ui text-[14px] font-medium no-underline cursor-pointer overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:bg-brand-purple hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)]"'
);
content = content.replace(
  'className="mt-[24px] font-sans text-[13px] text-brand-purple2 opacity-60 max-lg:relative max-lg:bottom-auto max-lg:left-auto max-lg:mt-[40px] max-lg:pt-[20px] max-lg:border-t max-lg:border-[#e9ecef]"',
  'className="relative bottom-auto left-auto mt-[40px] pt-[20px] border-t border-[#e9ecef] font-sans text-[13px] text-brand-purple2 opacity-60 xl:static xl:mt-[24px] xl:pt-0 xl:border-none"'
);


fs.writeFileSync('src/app/page.tsx', content);
