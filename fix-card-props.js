const fs = require('fs');
let card = fs.readFileSync('src/components/pages/home/shop-card.tsx', 'utf8');

// remove price from interface
card = card.replace(/  price: string;\n/g, '');
// remove price from signature
card = card.replace(/, price/g, '');

fs.writeFileSync('src/components/pages/home/shop-card.tsx', card);

let page = fs.readFileSync('src/app/page.tsx', 'utf8');
// remove price from usages
page = page.replace(/\s+price="[^"]*"/g, '');
fs.writeFileSync('src/app/page.tsx', page);
