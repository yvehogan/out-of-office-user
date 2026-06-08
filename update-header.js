const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

content = content.replace(
  'shrink-0 w-full bg-white flex justify-between items-center px-[60px] py-2.5 z-[1000] border-b border-[#e9ecef] min-[1440px]:px-[100px] xl:py-5 max-lg:sticky max-lg:top-0 max-lg:h-[90px] max-lg:px-6 max-lg:py-0',
  'shrink-0 w-full bg-white flex justify-between items-center z-[1000] border-b border-[#e9ecef] sticky top-0 h-[90px] px-6 py-0 xl:static xl:h-auto xl:px-[60px] xl:py-5 min-[1440px]:px-[100px]'
);

content = content.replace(
  'font-serif text-[28px] font-bold text-brand-purple2 no-underline tracking-[-0.5px] [&_svg]:w-[100px] [&_svg]:h-[45px] min-[1440px]:[&_svg]:w-[139px] min-[1440px]:[&_svg]:h-[63px] max-lg:[&_svg]:w-[110px] max-lg:[&_svg]:h-[50px]',
  'font-serif text-[28px] font-bold text-brand-purple2 no-underline tracking-[-0.5px] [&_svg]:w-[110px] [&_svg]:h-[50px] xl:[&_svg]:w-[100px] xl:[&_svg]:h-[45px] min-[1440px]:[&_svg]:w-[139px] min-[1440px]:[&_svg]:h-[63px]'
);

content = content.replace(
  'bg-none border-none cursor-pointer w-8 h-8 flex justify-center items-center z-[1010] relative min-[1440px]:w-[50px] min-[1440px]:h-[50px] max-lg:w-9 max-lg:h-9 [&_svg]:w-7 [&_svg]:h-7 [&_svg]:transition-all [&_svg]:duration-300 [&_svg]:ease-[cubic-bezier(0.4,0,0.2,1)] min-[1440px]:[&_svg]:w-[50px] min-[1440px]:[&_svg]:h-[50px]',
  'bg-none border-none cursor-pointer w-9 h-9 xl:w-8 xl:h-8 min-[1440px]:w-[50px] min-[1440px]:h-[50px] flex justify-center items-center z-[1010] relative [&_svg]:w-7 [&_svg]:h-7 [&_svg]:transition-all [&_svg]:duration-300 [&_svg]:ease-[cubic-bezier(0.4,0,0.2,1)] min-[1440px]:[&_svg]:w-[50px] min-[1440px]:[&_svg]:h-[50px]'
);

content = content.replace(
  'fixed top-[84px] w-[400px] h-[calc(100vh-84px)] bg-white shadow-[-10px_0_30px_rgba(33,1,95,0.05)] transition-[right] duration-[0.4s] ease-[cubic-bezier(0.4,0,0.2,1)] z-[999] flex flex-col p-[60px_50px] border-l border-[#e9ecef] min-[1440px]:top-[103px] min-[1440px]:h-[calc(100vh-103px)] max-lg:top-[90px] max-lg:w-full max-lg:h-[calc(100vh-90px)] max-lg:p-[40px_24px] max-lg:border-l-0',
  'fixed top-[90px] w-full h-[calc(100vh-90px)] p-[40px_24px] bg-white shadow-[-10px_0_30px_rgba(33,1,95,0.05)] transition-[right] duration-[0.4s] ease-[cubic-bezier(0.4,0,0.2,1)] z-[999] flex flex-col xl:top-[84px] xl:w-[400px] xl:h-[calc(100vh-84px)] xl:p-[60px_50px] xl:border-l border-[#e9ecef] min-[1440px]:top-[103px] min-[1440px]:h-[calc(100vh-103px)]'
);

content = content.replace(
  'list-none flex flex-col gap-10 max-lg:gap-[30px]',
  'list-none flex flex-col gap-[30px] xl:gap-10'
);

for (let i = 0; i < 4; i++) {
  content = content.replace(
    'font-serif text-4xl font-bold text-brand-purple2 no-underline transition-all duration-300 flex items-center gap-4 hover:text-brand-purple hover:pl-2.5 max-lg:text-[28px]',
    'font-serif text-[28px] xl:text-4xl font-bold text-brand-purple2 no-underline transition-all duration-300 flex items-center gap-4 hover:text-brand-purple hover:pl-2.5'
  );
}

fs.writeFileSync('src/components/Header.tsx', content);
