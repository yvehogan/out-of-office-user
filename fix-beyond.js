const fs = require('fs');
let text = fs.readFileSync('src/components/pages/home/beyond-card.tsx', 'utf8');
text = text.replace(
  'className="group w-[240px] xl:w-[404px] h-auto no-underline text-brand-purple2 flex flex-col transition-transform duration-300 ease-[ease] max-lg:w-full max-lg:h-auto"',
  'className="group w-full h-auto no-underline text-brand-purple2 flex flex-col transition-transform duration-300 ease-[ease] xl:w-[404px]"'
);
// SVG clip w-[240px] needs w-full h-auto? No, SVG will scale with w-full because viewBox is fixed. 
text = text.replace(
  'className="relative w-[240px] h-[200px] xl:w-[404px] xl:h-[361px]"',
  'className="relative w-full h-auto max-w-[240px] xl:max-w-none xl:w-[404px] xl:h-[361px]"'
);
fs.writeFileSync('src/components/pages/home/beyond-card.tsx', text);
