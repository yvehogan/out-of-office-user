const fs = require('fs');
let header = fs.readFileSync('src/components/Header.tsx', 'utf8');

// I notice the text strings inside the links were stacked incorrectly due to my replace script:
/*
  <li><Link href="/shop" className="..." onClick={closeMenu}>
            <span className="absolute -left-12 xl:-left-16 w-6 h-6 xl:w-8 xl:h-8 bg-red-600 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
            Books
          </Link></li>
*/
// Let's refine the red hover color to a pure, vibrant red like #FF0000 
header = header.replace(/bg-red-600/g, 'bg-[#FF0000]');

fs.writeFileSync('src/components/Header.tsx', header);
