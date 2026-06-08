const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(
  '<a href="mailto:me@solomonayodele.com" className="font-serif text-[16px] font-medium text-brand-purple no-underline transition-colors duration-300 ease hover:text-brand-purple2 text-[16px] xl:text-inherit">me@solomonayodele.com</a>',
  ''
);

fs.writeFileSync('src/app/page.tsx', page);
