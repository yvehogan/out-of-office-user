const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace(
  /className="flex items-center gap-\[10px\] gap-\[16px\] xl:gap-0"/g,
  'className="flex items-center gap-[16px] xl:gap-[16px]"'
);

fs.writeFileSync('src/app/page.tsx', page);
