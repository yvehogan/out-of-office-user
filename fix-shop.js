const fs = require('fs');

// 1. Fix page.tsx
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix Shop header alignment & Shop Now button width
page = page.replace(
  'className="flex flex-col items-center mb-[30px] xl:pl-[60px] xl:items-start"',
  'className="flex flex-col items-start w-full mb-[30px] xl:pl-[60px]"'
);

page = page.replace(
  'className="flex flex-col items-center gap-4 xl:flex-row"',
  'className="flex flex-col items-start gap-4 w-full xl:flex-row xl:items-center"'
);

page = page.replace(
  '<Button render={<Link href="/shop" />} className="!inline-flex items-center justify-center px-7 py-2 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-sm font-medium no-underline transition-colors duration-300 hover:bg-brand-purple hover:text-white xl:text-base">Shop Now</Button>',
  '<Button render={<Link href="/shop" />} className="!inline-flex items-center justify-center w-full px-7 py-4 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-base font-medium no-underline transition-colors duration-300 hover:bg-brand-purple hover:text-white xl:w-auto xl:py-2 xl:text-base">Shop Now</Button>'
);

// Fix Shop grid (switch to 1 column vertical stack on mobile!)
page = page.replace(
  'className="grid grid-cols-2 gap-4 p-0 xl:flex xl:flex-row xl:gap-[30px] xl:pl-[60px]"',
  'className="flex flex-col gap-6 p-0 w-full xl:flex-row xl:gap-[30px] xl:pl-[60px]"'
);

// We need to fix the props passed to ShopCard. The `imagePosition` passes non-responsive absolute positions!
// e.g., `imagePosition="left-[70px] top-[70px]"` applies to mobile too and ruins the layout because it conflicts with static.
// Let's replace the `imagePosition` values with `xl:` equivalents!
page = page.replace(/imagePosition="left-\[70px\] top-\[70px\]"/g, 'imagePosition="xl:left-[70px] xl:top-[70px]"');
page = page.replace(/imagePosition="left-\[65px\] top-\[79px\]"/g, 'imagePosition="xl:left-[65px] xl:top-[79px]"');
page = page.replace(/imagePosition="-left-\[15px\] -top-\[14px\]"/g, 'imagePosition="xl:-left-[15px] xl:-top-[14px]"');
page = page.replace(/imagePosition="left-\[35px\] top-\[55px\]"/g, 'imagePosition="xl:left-[35px] xl:top-[55px]"');

fs.writeFileSync('src/app/page.tsx', page);

// 2. Fix ShopCard component
let card = fs.readFileSync('src/components/pages/home/shop-card.tsx', 'utf8');

// The image container
card = card.replace(
  /className=\{`static left-auto top-auto pointer-events-auto \$\{imagePosition\} \$\{xlImagePosition \?\? ''\} xl:absolute xl:pointer-events-none`\}/g,
  'className={`relative w-full h-[220px] flex items-center justify-center pointer-events-auto xl:absolute xl:w-auto xl:h-auto xl:block xl:pointer-events-none ${imagePosition} ${xlImagePosition ?? \'\'}`}'
);

// Make the button on mobile look good (make sure it shows)
// It currently has `flex justify-between items-center w-full pt-[24px] xl:hidden`
// Ensure the image inside scales nicely
card = card.replace(
  'className="w-full h-full object-contain block transition-transform duration-300 ease group-hover:scale-110"',
  'className="max-w-full max-h-full object-contain block transition-transform duration-300 ease group-hover:scale-110 xl:w-full xl:h-full"'
);

fs.writeFileSync('src/components/pages/home/shop-card.tsx', card);

