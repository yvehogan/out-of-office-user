const fs = require('fs');
let text = fs.readFileSync('src/components/pages/home/beyond-card.tsx', 'utf8');
text = text.replace(
  'className="relative w-[240px] h-[200px] xl:w-[404px] xl:h-[361px]"',
  'className="relative w-[240px] h-[200px] xl:w-[404px] xl:h-[361px]"' // Just leave it if it works, wait..
);
text = text.replace(
  'className="relative w-full h-auto max-w-[240px] xl:max-w-none xl:w-[404px] xl:h-[361px]"',
  'className="relative w-full aspect-[240/200] max-w-[280px] xl:max-w-none xl:w-[404px] xl:h-[361px]"'
);
fs.writeFileSync('src/components/pages/home/beyond-card.tsx', text);
