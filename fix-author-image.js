const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// The image container in Author section is mostly centered. Let's make it left-aligned on mobile just like text.
page = page.replace(
  'className="w-full py-[20px] h-auto ml-0 top-0 relative z-[2] shrink-0 flex items-center justify-center xl:w-[400px] xl:h-[480px] xl:-top-[4px] xl:-ml-[35px]"',
  'className="w-full py-[20px] h-auto ml-0 top-0 relative z-[2] shrink-0 flex items-start justify-start xl:items-center xl:justify-center xl:w-[400px] xl:h-[480px] xl:-top-[4px] xl:-ml-[35px]"'
);

page = page.replace(
  'className="w-full max-w-[320px] h-[420px] mx-auto bg-transparent overflow-hidden flex items-center justify-center xl:w-full xl:max-w-none xl:h-full xl:mx-0"',
  'className="w-full max-w-[320px] h-[420px] mx-0 bg-transparent overflow-hidden flex items-start justify-start xl:items-center xl:justify-center xl:w-full xl:max-w-none xl:h-full"'
);

fs.writeFileSync('src/app/page.tsx', page);
