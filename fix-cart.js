const fs = require('fs');

let card = fs.readFileSync('src/components/pages/home/shop-card.tsx', 'utf8');

// The `flex justify-between items-center w-full pt-[24px] xl:hidden` node contains the price and cart. We can simply remove it completely.
card = card.replace(/<div className="flex justify-between items-center w-full pt-\[24px\] xl:hidden">[\s\S]*?<\/div>/, '');

fs.writeFileSync('src/components/pages/home/shop-card.tsx', card);

